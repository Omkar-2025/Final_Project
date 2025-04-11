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
exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
class AdminController {
    /**
     * This controller is used to login the admin
     * @param req
     * @param res
     * @returns
     */
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    /**
     * This controller is used to verify the account of the user
     * @param req
     * @param res
     */
    static verifyAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield admin_service_1.AdminService.verifyAccountBLL(id);
                if (result) {
                    res.status(200).json({ msg: result.msg });
                }
                else {
                    res.status(500).json({ msg: "Unexpected error occurred" });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This controller is used to Resolve the Query
     * @param req
     * @param res
     */
    static resolveSupport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const id = parseInt(req.params.id);
                const data = req.body;
                data.queryId = parseInt(req.params.id);
                data.id = req.body.user.id;
                const result = yield admin_service_1.AdminService.resolveQueryBLL(data);
                res.status(200).json({ msg: result.msg });
                // res.status(200).json({msg:result.msg});
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This controller is used to get the All queries of the user
     * @param req
     * @param res
     */
    static getAllSupport(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield admin_service_1.AdminService.getSupportBLL();
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This controller is used to get the All Accounts of the user
     * @param req
     * @param res
     */
    static getAllAccounts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield admin_service_1.AdminService.getAllAccountsBLL();
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This controller is used to get the All Users of the user
     * @param req
     * @param res
     */
    static getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield admin_service_1.AdminService.getAllUsersBLL();
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This controller is used to get the All Accounts of the user by user id
     * @param req
     * @param res
     */
    static getAccountByUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield admin_service_1.AdminService.getAccountsBLL(id);
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This controller is used to get the All Queries of the user by user id
     * @param req
     * @param res
     */
    static getQueryById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const result = yield admin_service_1.AdminService.getAllSupportBLL(id);
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllExpenses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield admin_service_1.AdminService.getAllExpenseBLL();
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AdminController = AdminController;
