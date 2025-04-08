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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const admin_dal_1 = require("../dal/admin.dal");
class AdminService {
    static getAllUsersBLL() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield admin_dal_1.adminDAL.getAllUsersDAL();
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static verifyAccountBLL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield admin_dal_1.adminDAL.verifyAccountDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
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
                const dalResult = yield admin_dal_1.adminDAL.getALLAccountsDAL();
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getAllQueryBLL() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield admin_dal_1.adminDAL.getAllQueryDAL();
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static resolveQueryBLL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield admin_dal_1.adminDAL.resolveQueryDAL(data);
                return { msg: dalResult.msg, status: dalResult.status };
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
                const dalResult = yield admin_dal_1.adminDAL.getAllAccountsDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
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
                const dalResult = yield admin_dal_1.adminDAL.getAllSupportDAL(id);
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getSupportBLL() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield admin_dal_1.adminDAL.getSupportDAL();
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
}
exports.AdminService = AdminService;
