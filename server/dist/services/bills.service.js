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
exports.BillsService = void 0;
const db_1 = require("../config/db");
const Bills_entity_1 = require("../entitiy/Bills.entity");
const Account_entity_1 = require("../entitiy/Account.entity");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../entitiy/User.entity");
const mailerSender_1 = require("../utils/mailerSender");
const billPaymentTemplate_1 = __importDefault(require("../utils/billPaymentTemplate"));
const Transaction_entity_1 = require("../entitiy/Transaction.entity");
const billsRepository = db_1.AppDataSource.getRepository(Bills_entity_1.Bills);
const accountRepository = db_1.AppDataSource.getRepository(Account_entity_1.Account);
const userRepository = db_1.AppDataSource.getRepository(User_entity_1.User);
const transactionRepository = db_1.AppDataSource.getRepository(Transaction_entity_1.Transaction);
class BillsService {
    /**
     * This method is used to create a new bill
     * @param data
     * @returns
     */
    static createBill(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { billName, amount, dueDate, accountId, frequency } = data;
                //    console.log(billName, amount, dueDate, accountId, frequency.name);
                const validFrequencies = ["daily", "weekly", "monthly"];
                if (!validFrequencies.includes(frequency)) {
                    return { msg: "Invalid frequency value", status: 400 };
                }
                const account = yield accountRepository.findOne({ where: { id: accountId }, lock: { mode: 'dirty_read' } });
                if (!account) {
                    return { msg: "Account not found", status: 404 };
                }
                const user = yield userRepository.findOne({ where: { id: data.user.id } });
                if (!user) {
                    return { msg: "User not found", status: 404 };
                }
                frequency = frequency.name;
                const date = new Date();
                const nextPaymentDate = this.calculateNextPaymentDate(date, frequency);
                const bill = billsRepository.create({
                    billName,
                    amount,
                    dueDate,
                    account,
                    frequency,
                    nextPaymentDate,
                });
                bill.user = user;
                bill.account = account;
                yield billsRepository.save(bill);
                yield userRepository.save(user);
                yield accountRepository.save(account);
                return { msg: "Bill created successfully", status: 201 };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static processRecurringBills() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const now = new Date();
                const bills = yield billsRepository.find({
                    where: { nextPaymentDate: (0, typeorm_1.LessThanOrEqual)(now), isActive: true },
                    relations: ["account"],
                });
                if (bills.length === 0) {
                    console.log("No bills to process");
                    return { msg: "No bills to process", status: 200 };
                }
                for (const bill of bills) {
                    const account = bill.account;
                    if (account.balance >= bill.amount) {
                        account.balance -= bill.amount;
                        // Update bill status and next payment date
                        bill.status = "Paid";
                        bill.nextPaymentDate = this.calculateNextPaymentDate(bill.nextPaymentDate, bill.frequency);
                        yield accountRepository.save(account);
                        yield billsRepository.save(bill);
                        return { msg: "Bill process successfully", status: 201 };
                    }
                    else {
                        console.log(`Insufficient balance for bill ID ${bill.id}`);
                        return { msg: "Insufficient balance", status: 400 };
                    }
                }
                return { msg: "Bills processed successfully", status: 201 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static calculateNextPaymentDate(currentDate, frequency) {
        const nextDate = new Date(currentDate);
        switch (frequency) {
            case "daily":
                nextDate.setDate(nextDate.getDate() + 1);
                break;
            case "weekly":
                nextDate.setDate(nextDate.getDate() + 7);
                break;
            case "monthly":
                nextDate.setMonth(nextDate.getMonth() + 1);
                break;
        }
        return nextDate;
    }
    static getBill(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findOne({ where: { id: data.user.id } });
            //console.log(user);        
            if (!user) {
                return { msg: "User not found", status: 404 };
            }
            const bill = yield billsRepository.find({ where: { user: user }, relations: ["account"] });
            if (bill) {
                return { msg: bill, status: 200 };
            }
            return { msg: "Bill not found", status: 404 };
        });
    }
    static getBillById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const bill = yield billsRepository.findOne({ where: { id }, relations: ["account"] });
            if (bill) {
                return { msg: bill, status: 200 };
            }
            return { msg: "Bill not found", status: 404 };
        });
    }
    static payBills(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { billId, accountId } = data;
                accountId = parseInt(accountId);
                billId = parseInt(billId);
                const bill = yield billsRepository.findOne({ where: { id: billId }, relations: ['account'] });
                if (!bill) {
                    return { msg: "Bill not found", status: 404 };
                }
                const account = yield accountRepository.findOne({ where: { id: accountId } });
                if (!account) {
                    return { msg: "Account not found", status: 404 };
                }
                if (account.balance >= bill.amount) {
                    account.balance -= bill.amount;
                    bill.status = "Paid";
                    bill.nextPaymentDate = this.calculateNextPaymentDate(bill.nextPaymentDate, bill.frequency);
                    const transaction = new Transaction_entity_1.Transaction(bill.amount, ` Bill Payment  ${bill.billName}`, account, account);
                    yield accountRepository.save(account);
                    const result = yield billsRepository.save(bill);
                    yield transactionRepository.save(transaction);
                    yield (0, mailerSender_1.mailerSender)({ email: data.user.email, title: "Bill paid successfully", body: (0, billPaymentTemplate_1.default)(bill.billName, account.name, bill.amount, result.dueDate) });
                    return { msg: "Bill paid successfully", status: 200 };
                }
                return { msg: "Insufficient balance", status: 400 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getBillshistoy(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository.find({ where: { id: data.user.id } });
                if (!user) {
                    return { msg: "User not found", status: 404 };
                }
                const account = yield accountRepository.findOne({ where: { user: user[0] } });
                if (!account) {
                    return { msg: "Account not found", status: 404 };
                }
                const transactions = yield transactionRepository.find({ where: { toAccount: account, transactionType: (0, typeorm_1.Like)("%Bill Payment%") }, order: { createdAt: "DESC" } });
                if (transactions) {
                    // transactions.accountNumber = account.account_number;
                    return { msg: transactions, status: 200 };
                }
                return { msg: "no post found", status: 404 };
            }
            catch (error) {
            }
        });
    }
    static updateBillBLL(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bill = yield billsRepository.findOne({ where: { id: id } });
                if (!bill) {
                    return { msg: "Bill not found", status: 404 };
                }
                const updatedBill = yield billsRepository.save(Object.assign(Object.assign({}, bill), data));
                return { msg: updatedBill, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static deleteBillBLL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bill = yield billsRepository.findOne({ where: { id: id } });
                if (!bill) {
                    return { msg: "Bill not found", status: 404 };
                }
                yield billsRepository.delete({ id: id });
                return { msg: "Bill deleted successfully", status: 200 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
}
exports.BillsService = BillsService;
