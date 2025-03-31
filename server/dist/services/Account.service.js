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
const userRepository = db_1.AppDataSource.getRepository(User_entity_1.User);
const accountRepository = db_1.AppDataSource.getRepository(Account_entity_1.Account);
const transactionRepository = db_1.AppDataSource.getRepository(Transaction_entity_1.Transaction);
class AccountService {
    createAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, balance, account_type, id } = data;
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
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    createTranscation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { fromAccount, toAccount, amount, transcationType } = data;
                // Fetch the Account entities for fromAccount and toAccount
                const fromAccountInstance = yield accountRepository.findOne({ where: { id: fromAccount }, relations: ['user'] });
                const toAccountInstance = yield accountRepository.findOne({ where: { account_number: toAccount } });
                amount = parseInt(amount);
                if (fromAccountInstance && toAccountInstance) {
                    if (fromAccountInstance.balance >= amount) {
                        // Update balances
                        fromAccountInstance.balance -= amount;
                        toAccountInstance.balance += amount;
                        // Save updated accounts
                        yield accountRepository.save(fromAccountInstance);
                        yield accountRepository.save(toAccountInstance);
                        // Create and save the transaction
                        const transactionInstance = new Transaction_entity_1.Transaction(amount, transcationType, fromAccountInstance, toAccountInstance);
                        const result = yield transactionRepository.save(transactionInstance);
                        console.log(fromAccountInstance);
                        yield (0, mailerSender_1.mailerSender)({ email: fromAccountInstance.user.email, title: "Transaction successfull", body: (0, transcationVerfication_1.default)(result.id, amount, result.createdAt, result.transactionType) });
                        return { msg: "Transaction successful", status: 200 };
                    }
                    return { msg: "Insufficient balance", status: 400 };
                }
                return { msg: "Account not found", status: 404 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    getTranscations(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transactionRepository.find({
                    where: [
                        { fromAccount: { id: id } }, // Transactions sent from the account
                        { toAccount: { id: id } } // Transactions received by the id
                    ],
                    order: {
                        id: 'DESC'
                    },
                    relations: ['fromAccount', 'toAccount'], // Include related accounts
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
                const { amount, accountId } = data;
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
}
exports.AccountService = AccountService;
exports.default = new AccountService();
// 83504A2F-62EC-4AAE-BB02-3E61D75A4439
