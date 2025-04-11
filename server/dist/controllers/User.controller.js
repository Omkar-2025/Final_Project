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
const user_service_1 = require("../services/user.service");
class UserController {
    /**
     * This controller is used to create a new User
     * @param req
     * @param res
     * @returns
     */
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield user_service_1.UserService.createUserBLL(data);
                res.status(201).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This controller is used to login a user
     * @param req
     * @param res
     * @returns jwt token and message
     */
    Login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield user_service_1.UserService.loginBLL(data);
                res.status(200).cookie('token', result.token, { httpOnly: true, secure: true }).json({ msg: result.msg, role: result.role });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     * This controller is used to get all accounts of a user
     * @param req
     * @param res
     * @returns all accounts of a user
     */
    getAllAccounts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.user.id;
                const result = yield user_service_1.UserService.getAccountsBLL(parseInt(id));
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                // console.log(error);
                next(error);
            }
        });
    }
    /**
     * This controller is used to verify a user using otp
     * @param req
     * @param res
     * @returns message and status
     */
    verifyUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield user_service_1.UserService.verifyUserBLL(data);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
    /**
     *
     */
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie('token').status(200).json({ msg: "Logout successfull" });
            }
            catch (error) {
                // console.log(error);
                next(error);
            }
        });
    }
    /**
     *
     * @param req
     * @param res
     * @param next
     */
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.user.id;
                const result = yield user_service_1.UserService.getUsers(id);
                res.status(200).json({ msg: result.msg });
            }
            catch (error) {
                // console.log(error);
                next(error);
            }
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.user.id;
                const data = req.body;
                const result = yield user_service_1.UserService.updateUser(id, data);
                res.status(200).json({ msg: result.msg });
                return;
            }
            catch (error) {
                // console.log(error);
                next(error);
            }
        });
    }
    updatePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.user.id;
                const data = req.body;
                console.log(id);
                const result = yield user_service_1.UserService.updatePassword(id, data);
                res.status(200).json({ msg: result.msg });
                return;
            }
            catch (error) {
                // console.log(error);
                next(error);
            }
        });
    }
    sendForgetPasswordOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body.email;
                const otp = req.body.otp;
                const result = yield user_service_1.UserService.sendforgetPasswordOtp(data, otp);
                res.status(200).json({ msg: result.msg });
                return;
            }
            catch (error) {
                // console.log(error);
                next(error);
            }
        });
    }
    verifyForgetPasswordOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield user_service_1.UserService.verifyForgetPasswordOtp(data.email, data.otp, data.password);
                res.status(200).json({ msg: result.message });
                return;
            }
            catch (error) {
                // console.log(error);
                next(error);
            }
        });
    }
    generateOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const result = yield user_service_1.UserService.resendOtp(email);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = new UserController();
