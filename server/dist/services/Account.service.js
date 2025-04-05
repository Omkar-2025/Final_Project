"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const db_1 = require("../config/db");
const Account_entity_1 = require("../entitiy/Account.entity");
const Transaction_entity_1 = require("../entitiy/Transaction.entity");
const User_entity_1 = require("../entitiy/User.entity");
const mailerSender_1 = require("../utils/mailerSender");
const accountTemplate_1 = __importDefault(require("../utils/accountTemplate"));
const transcationVerfication_1 = __importDefault(require("../utils/transcationVerfication"));
const account_scehma_1 = require("../types/schema/account.scehma");
// import { html } from "./expense";
const pdf = require('pdf-creator-node');
const fs_1 = __importDefault(require("fs"));
const html = fs_1.default.readFileSync('src/services/expense.html', 'utf-8');
const userRepository = db_1.AppDataSource.getRepository(User_entity_1.User);
const accountRepository = db_1.AppDataSource.getRepository(Account_entity_1.Account);
const transactionRepository = db_1.AppDataSource.getRepository(Transaction_entity_1.Transaction);
class AccountService {
    createAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, balance, account_type, id } = data;
                if (!name || !balance || !account_type || !id) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const isValiddata = account_scehma_1.accountSchema.safeParse(data);
                if (!isValiddata.success) {
                    return { msg: isValiddata.error.issues[0].message, status: 400 };
                }
                const accountInstance = new Account_entity_1.Account(name, balance, account_type, id);
                const user = yield userRepository.findOne({ where: { id: id } });
                if (!user) {
                    return { msg: "User not found", status: 404 };
                }
                const result = yield accountRepository.insert(accountInstance); //`Account created successfully with account number ${result.generatedMaps[0].account_number}`
                console.log(result);
                yield (0, mailerSender_1.mailerSender)({ email: user.email, title: "Account created", body: (0, accountTemplate_1.default)(result.generatedMaps[0].account_number, user.name) });
                return { msg: "Account created successfully", status: 201 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Error creating account", status: 500 };
            }
        });
    }
    getAccount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield accountRepository.find({ where: { id: id }, relations: ['transactionsFrom', 'transactionsTo'] });
                if (account) {
                    return { msg: account, status: 200 };
                }
                return { msg: "Account not found", status: 404 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    createTranscation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = db_1.AppDataSource.createQueryRunner(); // Create a QueryRunner
            yield queryRunner.connect(); // Establish a connection
            yield queryRunner.startTransaction(); // Start a transaction
            try {
                let { fromAccount, toAccount, amount, transcationType } = data;
                if (!fromAccount || !toAccount || !amount || !transcationType) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const isValiddata = account_scehma_1.transactionSchema.safeParse(data);
                // if (!isValiddata.success) {
                //     return { msg: isValiddata.error.issues[0].message, status: 400 };
                // }
                // Fetch accounts using the QueryRunner
                const fromAccountInstance = yield queryRunner.manager.findOne(Account_entity_1.Account, {
                    where: { id: fromAccount },
                    relations: ["user"],
                });
                const toAccountInstance = yield queryRunner.manager.findOne(Account_entity_1.Account, {
                    where: { account_number: toAccount },
                });
                if (!fromAccountInstance || !toAccountInstance) {
                    return { msg: "Account not found", status: 404 };
                }
                amount = parseInt(amount);
                if (fromAccountInstance.balance >= amount) {
                    // Update balances
                    fromAccountInstance.balance -= amount;
                    toAccountInstance.balance += amount;
                    // Save updated accounts using the QueryRunner
                    yield queryRunner.manager.save(fromAccountInstance);
                    yield queryRunner.manager.save(toAccountInstance);
                    // Create and save the transaction
                    const transactionInstance = new Transaction_entity_1.Transaction(amount, transcationType, fromAccountInstance, toAccountInstance);
                    const result = yield queryRunner.manager.save(transactionInstance);
                    // Commit the transaction
                    yield queryRunner.commitTransaction();
                    // Send email notification
                    yield (0, mailerSender_1.mailerSender)({
                        email: fromAccountInstance.user.email,
                        title: "Transaction successful",
                        body: (0, transcationVerfication_1.default)(result.id, amount, result.createdAt, result.transactionType),
                    });
                    return { msg: "Transaction successful", status: 200 };
                }
                else {
                    return { msg: "Insufficient balance", status: 400 };
                }
            }
            catch (error) {
                console.error("Error during transaction:", error);
                // Rollback the transaction in case of an error
                yield queryRunner.rollbackTransaction();
                return { msg: "Internal server error", status: 500 };
            }
            finally {
                // Release the QueryRunner connection
                yield queryRunner.release();
            }
        });
    }
    getTranscations(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transactionRepository.find({
                    where: [
                        { fromAccount: { id: id } },
                        { toAccount: { id: id } }
                    ],
                    order: {
                        id: 'DESC'
                    },
                    relations: ['fromAccount', 'toAccount'],
                });
                return { msg: transactions, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    getTransactionsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield transactionRepository.findOne({ where: { id: id }, relations: ['fromAccount', 'toAccount'] });
                if (result) {
                    return { msg: result, status: 200 };
                }
                return { msg: "Transaction not found", status: 404 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    Withdraw(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { amount, accountId } = data;
                if (!amount || !accountId) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                amount = parseInt(amount);
                data.amount = amount;
                const isValiddata = account_scehma_1.depositWithDrawSchema.safeParse(data);
                if (!isValiddata.success) {
                    return { msg: isValiddata.error.issues[0].message, status: 400 };
                }
                const account = yield accountRepository.findOne({ where: { id: accountId } });
                if (!account) {
                    return { msg: "Account not found", status: 404 };
                }
                const transactionInstance = new Transaction_entity_1.Transaction(amount, "withDraw", account, account);
                if (account) {
                    if (account.balance >= amount) {
                        account.balance -= amount;
                        yield accountRepository.save(account);
                        const result = yield transactionRepository.save(transactionInstance);
                        yield (0, mailerSender_1.mailerSender)({ email: data.user.email, title: "Transaction successfull", body: (0, transcationVerfication_1.default)(result.id, amount, result.createdAt, result.transactionType) });
                        return { msg: "Withdraw successfull", status: 200 };
                    }
                    return { msg: "Insufficient balance", status: 400 };
                }
                return { msg: "Account not found", status: 404 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    Deposit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { amount, accountId } = data;
                amount = parseInt(amount);
                if (!amount || !accountId) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const isValiddata = account_scehma_1.transactionSchema.safeParse(data);
                // if(!isValiddata.success){
                //     return {msg:isValiddata.error.issues[0].message,status:400};
                // }
                const account = yield accountRepository.findOne({ where: { id: accountId } });
                if (!account) {
                    return { msg: "Account not found", status: 404 };
                }
                const transactionInstance = new Transaction_entity_1.Transaction(amount, "Deposit", account, account);
                if (account) {
                    amount = parseInt(amount);
                    account.balance += amount;
                    yield accountRepository.save(account);
                    const result = yield transactionRepository.save(transactionInstance);
                    yield (0, mailerSender_1.mailerSender)({ email: data.user.email, title: "Transaction successfull", body: (0, transcationVerfication_1.default)(result.id, amount, result.createdAt, result.transactionType) });
                    return { msg: "Deposit successfull", status: 200 };
                }
                return { msg: "Account not found", status: 404 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    getAllAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield accountRepository.find({ relations: ['user'] });
                return { msg: accounts, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    getMonthlyExpenseBLL(_a) {
        return __awaiter(this, arguments, void 0, function* ({ currentMonth, currentYear, id }) {
            try {
                const transactions = yield transactionRepository
                    .createQueryBuilder("transaction")
                    .select("SUM(transaction.amount)", "totalExpenses")
                    .where("transaction.fromAccountId = :id", { id })
                    .andWhere("MONTH(transaction.createdAt) = :month", { month: currentMonth })
                    .andWhere("YEAR(transaction.createdAt) = :year", { year: currentYear })
                    .getRawOne();
                console.log(transactions);
                return { status: 200, msg: transactions };
            }
            catch (error) {
                console.error("Error fetching monthly transactions", error);
                return { status: 500, msg: "Internal server error" };
            }
        });
    }
    getMonthlyTransactionsBLL(_a) {
        return __awaiter(this, arguments, void 0, function* ({ currentMonth, currentYear, id }) {
            try {
                const transactions = yield transactionRepository
                    .createQueryBuilder("transaction")
                    .where("transaction.fromAccountId = :id", { id })
                    .andWhere("MONTH(transaction.createdAt) = :month", { month: currentMonth })
                    .andWhere("YEAR(transaction.createdAt) = :year", { year: currentYear })
                    .getMany();
                return { status: 200, msg: transactions };
            }
            catch (error) {
                console.error("Error fetching monthly transactions", error);
                return { status: 500, msg: "Internal server error" };
            }
        });
    }
    getAllMonthlyExpenses(_a) {
        return __awaiter(this, arguments, void 0, function* ({ currentDate, currentYear, id }) {
            try {
                const transactions = yield transactionRepository
                    .createQueryBuilder("transaction")
                    .select([
                    "MONTH(transaction.createdAt) AS month",
                    "YEAR(transaction.createdAt) AS year",
                    "transaction.transactionType AS transactionType",
                    "SUM(transaction.amount) AS totalAmount",
                    "COUNT(transaction.id) AS transactionCount"
                ])
                    .where("transaction.fromAccountId = :id OR transaction.toAccountId = :id", { id })
                    .groupBy("YEAR(transaction.createdAt), MONTH(transaction.createdAt), transaction.transactionType")
                    .orderBy("YEAR(transaction.createdAt)", "DESC")
                    .addOrderBy("MONTH(transaction.createdAt)", "DESC")
                    .getRawMany();
                // console.log(transactions);
                // Group transactions by month and categorize them by transactionType
                const groupedTransactions = transactions.reduce((acc, transaction) => {
                    const key = `${transaction.year}-${transaction.month}`;
                    // console.log(key);
                    if (!acc[key]) {
                        acc[key] = {
                            year: transaction.year,
                            month: transaction.month,
                            deposits: 0,
                            withdrawals: 0,
                            billPayments: 0,
                            totalTransactions: 0,
                            transferAmount: 0,
                        };
                    }
                    // console.log();
                    // console.log(transaction.transactionType);
                    if (transaction.transactionType === "Deposit") {
                        acc[key].deposits += parseFloat(transaction.totalAmount);
                    }
                    else if (transaction.transactionType === "withDraw") {
                        acc[key].withdrawals += parseFloat(transaction.totalAmount);
                    }
                    else if (transaction.transactionType.trim().startsWith("Bill Payment")) {
                        acc[key].billPayments += parseFloat(transaction.totalAmount);
                    }
                    else {
                        // console.log(transaction);
                        acc[key].transferAmount += parseFloat(transaction.totalAmount);
                    }
                    acc[key].totalTransactions += parseInt(transaction.transactionCount, 10);
                    return acc;
                }, {});
                // console.log(groupedTransactions);
                let options = {
                    format: "A3",
                    orientation: "portrait",
                    border: "10mm",
                    header: {
                        height: "45mm",
                        contents: '<div style="text-align: center;">Author: Easy Bank</div>'
                    },
                    footer: {
                        height: "28mm",
                        contents: {
                            first: 'Cover page',
                            // 2: 'Second page', // Any page number is working. 1-based index
                            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                            last: 'Last Page'
                        }
                    }
                };
                let document = {
                    html: html,
                    data: {
                        users: groupedTransactions,
                    },
                    path: "./output.pdf",
                    type: " ",
                };
                pdf.create(document, options).then((res) => {
                    console.log(res);
                })
                    .catch((error) => {
                    console.error(error);
                });
                return { status: 200, msg: Object.values(groupedTransactions) };
            }
            catch (error) {
                console.error("Error fetching monthly expenses and transactions:", error);
                return { status: 500, msg: "Internal server error" };
            }
        });
    }
    deactiveAccountBLL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield accountRepository.findOne({ where: { id: id } });
                if (!account) {
                    return { msg: "Account not found", status: 404 };
                }
                account.status = false;
                yield accountRepository.save(account);
                return { msg: "Account deactivated successfully", status: 200 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    activateAccountBLL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield accountRepository.findOne({ where: { id: id } });
                if (!account) {
                    return { msg: "Account not found", status: 404 };
                }
                account.status = true;
                yield accountRepository.save(account);
                return { msg: "Account activated successfully", status: 200 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
}
exports.AccountService = AccountService;
exports.default = new AccountService();
// 83504A2F-62EC-4AAE-BB02-3E61D75A4439
