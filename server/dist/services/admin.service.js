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
exports.AdminService = void 0;
const db_1 = require("../config/db");
const Account_entity_1 = require("../entitiy/Account.entity");
const User_entity_1 = require("../entitiy/User.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailerSender_1 = require("../utils/mailerSender");
const queryresolveTemplate_1 = __importDefault(require("../utils/queryresolveTemplate"));
const support_query_entity_1 = require("../entitiy/support_query.entity");
const userRepo = db_1.AppDataSource.getRepository(User_entity_1.User);
const accountRepo = db_1.AppDataSource.getRepository(Account_entity_1.Account);
const supportRepo = db_1.AppDataSource.getRepository(support_query_entity_1.Support);
class AdminService {
    static loginAdminBLL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = data;
                const admin = yield userRepo.findOne({ where: { email: email } });
                console.log(admin);
                if (!admin) {
                    return { msg: "Admin not found", status: 404 };
                }
                if (yield bcryptjs_1.default.compare(password, admin.password)) {
                    const token = jsonwebtoken_1.default.sign({ id: admin.id, email: email, role: admin.role }, process.env.JWT_SECRET);
                    return { msg: "Login successfull", token: token, status: 200 };
                }
                else {
                    return { msg: "Invalid password", status: 400 };
                }
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getAllUsersBLL() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userRepo.find({ where: { role: "user" }, relations: ["accounts"] });
                return { msg: users, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static verifyAccountBLL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = yield accountRepo.findOne({ where: { id: id }, relations: ["user"] });
                if (!account) {
                    return { msg: "Account not found", status: 404 };
                }
                account.isVerified = true;
                yield (0, mailerSender_1.mailerSender)({ email: account.user.email, title: "Account Verified", body: `Your account with account number ${account.account_number} has been verified successfully` });
                yield accountRepo.save(account);
                return { msg: "Account verified successfully", status: 200 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getAllAccountsBLL() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accounts = yield accountRepo.find({ relations: ["user"] });
                return { msg: accounts, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getAllQueryBLL() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queries = yield userRepo.find({ relations: ["support"] });
                return { msg: queries, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static resolveQueryBLL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, reply } = data;
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
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getAccountsBLL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch the user by ID
                const user = yield userRepo.findOne({ where: { id: id } });
                if (!user) {
                    return { msg: "User not found", status: 404 };
                }
                const accounts = yield accountRepo.find({ where: { user: user } });
                if (!accounts || accounts.length === 0) {
                    return { msg: "No accounts found for this user", status: 404 };
                }
                return { msg: accounts, status: 200 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getAllSupportBLL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepo.findOne({ where: { id: id } });
                console.log(user);
                if (!user) {
                    return { msg: "User not found", status: 404 };
                }
                const support = yield supportRepo.find({ where: { user: user }, });
                return { msg: support, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getSupportBLL() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const support = yield supportRepo.find({ relations: ["user"] });
                return { msg: support, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
}
exports.AdminService = AdminService;
