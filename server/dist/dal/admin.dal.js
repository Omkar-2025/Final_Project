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
const userRepo = db_1.AppDataSource.getRepository(user_entity_1.User);
const accountRepo = db_1.AppDataSource.getRepository(account_entity_1.Account);
const supportRepo = db_1.AppDataSource.getRepository(support_query_entity_1.Support);
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
                return { msg: "Account not found", status: 404 };
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
                return { msg: "Query not found", status: 404 };
            }
            const user = yield userRepo.findOne({ where: { id: support.user.id } });
            // console.log(user);
            if (!user) {
                return { msg: "User not found", status: 404 };
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
                return { msg: "User not found", status: 404 };
            }
            const accounts = yield accountRepo.find({ where: { user: user } });
            if (!accounts || accounts.length === 0) {
                return { msg: "No accounts found for this user", status: 404 };
            }
            return { msg: accounts, status: 200 };
        });
    }
    static getAllSupportDAL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepo.findOne({ where: { id: id } });
            console.log(user);
            if (!user) {
                return { msg: "User not found", status: 404 };
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
}
exports.adminDAL = adminDAL;
