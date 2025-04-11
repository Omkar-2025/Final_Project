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
exports.adminDAL = void 0;
const db_1 = require("../config/db");
const user_entity_1 = require("../entitiy/user.entity");
const account_entity_1 = require("../entitiy/account.entity");
const mailerSender_1 = require("../utils/mailerSender");
const queryresolveTemplate_1 = __importDefault(require("../utils/queryresolveTemplate"));
const support_query_entity_1 = require("../entitiy/support_query.entity");
const transaction_entity_1 = require("../entitiy/transaction.entity");
const globalErrorHandler_1 = require("../types/globalErrorHandler");
const userRepo = db_1.AppDataSource.getRepository(user_entity_1.User);
const accountRepo = db_1.AppDataSource.getRepository(account_entity_1.Account);
const supportRepo = db_1.AppDataSource.getRepository(support_query_entity_1.Support);
const transactionRepository = db_1.AppDataSource.getRepository(transaction_entity_1.Transaction);
class adminDAL {
    static getAllUsersDAL() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userRepo.find({ where: { role: "user" }, relations: ["accounts"] });
            return { msg: users, status: 200 };
        });
    }
    static verifyAccountDAL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield accountRepo.findOne({ where: { id: id }, relations: ["user"] });
            if (!account) {
                throw new globalErrorHandler_1.GlobalErrorHandler("Account not found", 404);
            }
            account.isVerified = true;
            yield (0, mailerSender_1.mailerSender)({ email: account.user.email, title: "Account Verified", body: `Your account with account number ${account.account_number} has been verified successfully` });
            yield accountRepo.save(account);
            return { msg: "Account verified successfully", status: 200 };
        });
    }
    static getALLAccountsDAL() {
        return __awaiter(this, void 0, void 0, function* () {
            const accounts = yield accountRepo.find({ relations: ["user"] });
            return { msg: accounts, status: 200 };
        });
    }
    static getAllQueryDAL() {
        return __awaiter(this, void 0, void 0, function* () {
            const queries = yield userRepo.find({ relations: ["support"] });
            return { msg: queries, status: 200 };
        });
    }
    static resolveQueryDAL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { queryId, reply } = data;
            const support = yield supportRepo.findOne({ where: { id: data.queryId }, relations: ["user"] });
            // console.log(support);
            if (!support) {
                throw new globalErrorHandler_1.GlobalErrorHandler("Support not found", 404);
            }
            const user = yield userRepo.findOne({ where: { id: support.user.id } });
            // console.log(user);
            if (!user) {
                throw new globalErrorHandler_1.GlobalErrorHandler("User not found", 404);
            }
            support.resolve = reply;
            support.status = 'Completed';
            yield supportRepo.save(support);
            yield (0, mailerSender_1.mailerSender)({ email: user.email, title: "Query Resolved", body: (0, queryresolveTemplate_1.default)(user.name, support.subject, reply) });
            return { msg: "Query resolved successfully", status: 200 };
        });
    }
    static getAllAccountsDAL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepo.findOne({ where: { id: id } });
            if (!user) {
                throw new globalErrorHandler_1.GlobalErrorHandler("User not found", 404);
            }
            const accounts = yield accountRepo.find({ where: { user: user } });
            if (!accounts || accounts.length === 0) {
                throw new globalErrorHandler_1.GlobalErrorHandler(" no Account found for this user ", 404);
            }
            return { msg: accounts, status: 200 };
        });
    }
    static getAllSupportDAL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepo.findOne({ where: { id: id } });
            console.log(user);
            if (!user) {
                throw new globalErrorHandler_1.GlobalErrorHandler("User not found", 404);
            }
            const support = yield supportRepo.find({ where: { user: user }, });
            return { msg: support, status: 200 };
        });
    }
    static getSupportDAL() {
        return __awaiter(this, void 0, void 0, function* () {
            const support = yield supportRepo.find({ relations: ["user"] });
            return { msg: support, status: 200 };
        });
    }
    static getAllExpenseDAL() {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield transactionRepository.createQueryBuilder("transaction")
                .select([
                "MONTH(transaction.createdAt) AS month",
                "YEAR(transaction.createdAt) AS year",
                "transaction.transactionType AS transactionType",
                "SUM(transaction.amount) AS totalAmount",
                "COUNT(transaction.id) AS transactionCount"
            ])
                .groupBy("YEAR(transaction.createdAt), MONTH(transaction.createdAt), transaction.transactionType")
                .orderBy("YEAR(transaction.createdAt)", "DESC")
                .addOrderBy("MONTH(transaction.createdAt)", "DESC")
                .getRawMany();
            console.log(transaction);
            const groupedTransactions = transaction.reduce((acc, transaction) => {
                const key = `${transaction.year}-${transaction.month}`;
                // console.log(key);
                if (!acc[key]) {
                    acc[key] = {
                        // year: transaction.year,
                        month: transaction.month,
                        // deposits: 0,
                        // withdrawals: 0,
                        // billPayments: 0,
                        // totalTransactions: 0,
                        totalAmount: 0,
                    };
                }
                // console.log();
                // console.log(transaction);
                if (transaction.transactionType === "Deposit") {
                    // acc[key].deposits += parseFloat(transaction.totalAmount);
                    acc[key].totalAmount += parseFloat(transaction.totalAmount);
                }
                else if (transaction.transactionType === "withDraw") {
                    // acc[key].withdrawals += parseFloat(transaction.totalAmount);
                    acc[key].totalAmount += parseFloat(transaction.totalAmount);
                }
                else if (transaction.transactionType.trim().startsWith("Bill Payment")) {
                    // acc[key].billPayments += parseFloat(transaction.totalAmount);
                    acc[key].totalAmount += parseFloat(transaction.totalAmount);
                }
                else {
                    // console.log(transaction);
                    // acc[key].transferAmount += parseFloat(transaction.totalAmount);
                    acc[key].totalAmount += parseFloat(transaction.totalAmount);
                }
                // acc[key].totalTransactions += parseInt(transaction.transactionCount, 10);
                return acc;
            }, {});
            // console.log(groupedTransactions);
            return { status: 200, msg: Object.values(groupedTransactions) };
        });
    }
}
exports.adminDAL = adminDAL;
