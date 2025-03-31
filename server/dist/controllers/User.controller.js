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
const User_service_1 = require("../services/User.service");
class UserController {
    /**
     * This controller is used to create a new User
     * @param req
     * @param res
     * @returns
     */
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                // const isvalidUser = userSchema.parse(data);
                // if(isvalidUser){
                //    res.status(400).json({msg:"please enter valid data"});
                //    return;
                // }
                const result = yield User_service_1.UserService.createUserBLL(data);
                if (result.status == 400) {
                    res.status(400).json({ msg: result.msg });
                    return;
                }
                res.status(201).json({ msg: result.msg });
            }
            catch (error) {
                // console.log(error);
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This controller is used to login a user
     * @param req
     * @param res
     * @returns jwt token and message
     */
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                // const isvalidUser = loginSchema.parse(data);
                // if(isvalidUser){
                //     res.status(400).json({msg:"please enter valid data"});
                //     return;
                // }
                const result = yield User_service_1.UserService.loginBLL(data);
                if (result.status == 404) {
                    res.status(404).json({ msg: result.msg });
                    return;
                }
                res.status(200).cookie('token', result.token, { httpOnly: true, secure: true }).json({ msg: result.msg });
            }
            catch (error) {
            }
        });
    }
    /**
     * This controller is used to get all accounts of a user
     * @param req
     * @param res
     * @returns all accounts of a user
     */
    getAllAccounts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.body.user.id;
                const result = yield User_service_1.UserService.getAccountsBLL(parseInt(id));
                res.status(result.status).json(result.msg);
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
    /**
     * This controller is used to verify a user using otp
     * @param req
     * @param res
     * @returns message and status
     */
    verifyUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const result = yield User_service_1.UserService.verifyUserBLL(data);
                res.status(result.status).json({ msg: result.msg });
            }
            catch (error) {
                res.status(500).json({ msg: "Internal server error" });
            }
        });
    }
}
exports.default = new UserController();
