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
exports.BillsDAL = void 0;
const db_1 = require("../config/db");
const bills_entity_1 = require("../entitiy/bills.entity");
const account_entity_1 = require("../entitiy/account.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entitiy/user.entity");
const mailerSender_1 = require("../utils/mailerSender");
const billPaymentTemplate_1 = __importDefault(require("../utils/billPaymentTemplate"));
const transaction_entity_1 = require("../entitiy/transaction.entity");
const billsRepository = db_1.AppDataSource.getRepository(bills_entity_1.Bills);
const accountRepository = db_1.AppDataSource.getRepository(account_entity_1.Account);
const userRepository = db_1.AppDataSource.getRepository(user_entity_1.User);
const transactionRepository = db_1.AppDataSource.getRepository(transaction_entity_1.Transaction);
class BillsDAL {
    static createBillDAL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { billName, amount, dueDate, accountId, frequency } = data;
            const account = yield accountRepository.findOne({ where: { id: accountId }, lock: { mode: 'dirty_read' } });
            if (!account) {
                return { msg: "Account not found", status: 404 };
            }
            if (!data.user) {
                return { msg: "User data is missing", status: 400 };
            }
            const user = yield userRepository.findOne({ where: { id: data.user.id } });
            if (!user) {
                return { msg: "User not found", status: 404 };
            }
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
        });
    }
    static processBillDAL() {
        return __awaiter(this, void 0, void 0, function* () {
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
    static getAllBillsDAL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findOne({ where: { id: id } });
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
    static getBillByIdDAL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findOne({ where: { id: id } });
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
    static payBillDAL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { billId, accountId } = data;
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
                const transaction = new transaction_entity_1.Transaction(bill.amount, ` Bill Payment  ${bill.billName}`, account, account);
                yield accountRepository.save(account);
                const result = yield billsRepository.save(bill);
                yield transactionRepository.save(transaction);
                yield (0, mailerSender_1.mailerSender)({ email: data.user.email, title: "Bill paid successfully", body: (0, billPaymentTemplate_1.default)(bill.billName, account.name, bill.amount, result.dueDate) });
                return { msg: "Bill paid successfully", status: 200 };
            }
            return { msg: "Insufficient balance", status: 400 };
        });
    }
    static getBillHistoryDAL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.find({ where: { id: id } });
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
        });
    }
    static updateBillDAL(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(data);
            const bill = yield billsRepository.findOne({ where: { id: id } });
            // console.log(bill);
            if (!bill) {
                return { msg: "Bill not found", status: 404 };
            }
            bill.account = data.accountId.id;
            if (typeof data.frequency === 'object' && data.frequency.name) {
                data.frequency = data.frequency.name;
            }
            const updatedBill = yield billsRepository.save(Object.assign(Object.assign({}, bill), data));
            yield billsRepository.save(updatedBill);
            return { msg: updatedBill, status: 200 };
        });
    }
    static deleteBillDAL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const bill = yield billsRepository.findOne({ where: { id: id } });
            if (!bill) {
                return { msg: "Bill not found", status: 404 };
            }
            yield billsRepository.delete({ id: id });
            return { msg: "Bill deleted successfully", status: 200 };
        });
    }
}
exports.BillsDAL = BillsDAL;
