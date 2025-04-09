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
exports.UserService = void 0;
const db_1 = require("../config/db");
const user_entity_1 = require("../entitiy/user.entity");
require("dotenv/config");
const user_dal_1 = __importDefault(require("../dal/user.dal"));
const user_schema_1 = require("../types/schema/user.schema");
const globalErrorHandler_1 = require("../types/globalErrorHandler");
const userRepository = db_1.AppDataSource.getRepository(user_entity_1.User);
class UserService {
    /**
     * This method is used to create a new user
     * @param data This is the data that is used to create a new user
     * @returns
     */
    static createUserBLL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, phone, role } = data;
            if (!name || !email || !password || !phone) {
                throw new Error("Please provide all the fields");
            }
            const isValiddata = user_schema_1.userSchema.safeParse(data);
            if (!isValiddata.success) {
                return { msg: isValiddata.error.issues[0].message, status: 400 };
            }
            const dalResult = yield user_dal_1.default.createUserDAl({ name, email, password, phone, role: role || "user" });
            if ((dalResult === null || dalResult === void 0 ? void 0 : dalResult.msg) == false) {
                throw new Error("Error while Creating the Account");
            }
            return { msg: "User created successfully", status: 201 };
        });
    }
    /**
     * This method is used to login a user
     * @param data This is the data that is used to login a user
     * @returns
     */
    static loginBLL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = data;
                // console.log(email, password);
                if (!email || !password) {
                    throw new globalErrorHandler_1.GlobalErrorHandler("Please provide all the fields", 400);
                }
                const isvalidUser = user_schema_1.loginSchema.safeParse(data);
                if (!isvalidUser.success) {
                    throw new Error(isvalidUser.error.issues[0].message);
                }
                const dalResult = yield user_dal_1.default.loginDAL({ email, password });
                if ((dalResult === null || dalResult === void 0 ? void 0 : dalResult.status) == 400) {
                    throw new Error(dalResult.msg);
                }
                else if ((dalResult === null || dalResult === void 0 ? void 0 : dalResult.status) == 200) {
                    return { msg: "Login successfull", role: dalResult.role, token: dalResult.token, status: 200 };
                }
                else {
                    throw new globalErrorHandler_1.GlobalErrorHandler("Invalid password", 404);
                }
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getAccountsBLL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userRepository.find({ where: { id: id }, relations: ['accounts'] });
                return ({ msg: users, status: 200 });
            }
            catch (error) {
                return { message: "Internal server error", status: 500 };
            }
        });
    }
    /**
     * This method is used to verify a user
     * @param data
     * @returns
     */
    static verifyUserBLL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = data;
                if (!email || !otp) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const dalResult = yield user_dal_1.default.verifyOtpDAL({ email, otp });
                if ((dalResult === null || dalResult === void 0 ? void 0 : dalResult.status) == 400) {
                    return { msg: dalResult.msg, status: 400 };
                }
                else if ((dalResult === null || dalResult === void 0 ? void 0 : dalResult.status) == 404) {
                    return { msg: dalResult.msg, status: 404 };
                }
                return { msg: dalResult === null || dalResult === void 0 ? void 0 : dalResult.msg, status: 404 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    /**
     * This method is used to get the user by id
     * @param id This is the id of the user
     * @returns
     */
    static getUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield user_dal_1.default.getUsersDAL(id);
                if ((dalResult === null || dalResult === void 0 ? void 0 : dalResult.status) == 404) {
                    return { msg: dalResult.msg, status: 404 };
                }
                return { msg: dalResult.msg, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    /**
     * This method is used to update the user details
     * @param id This is the id of the user
     * @param data user data to be updated
     * @returns
     */
    static updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone, address } = data;
                if (!name || !email || !phone) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const isValiddata = user_schema_1.updateUserSchema.safeParse(data);
                if (!isValiddata.success) {
                    return { msg: isValiddata.error.issues[0].message, status: 400 };
                }
                const dalResult = yield user_dal_1.default.updateUserDAL(id, data);
                if ((dalResult === null || dalResult === void 0 ? void 0 : dalResult.status) == 404) {
                    return { msg: dalResult.msg, status: 404 };
                }
                return { msg: dalResult.msg, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    /**
     * This method is used to update the user password
     * @param id This is the id of the user
     * @param data password data to be updated
     * @returns
     */
    static updatePassword(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { oldPassword, newPassword } = data;
                if (!oldPassword || !newPassword) {
                    return { msg: "Please provide all the fields", status: 400 };
                }
                const isValidPassword = user_schema_1.updateUserSchema.safeParse(data);
                if (!isValidPassword.success) {
                    return { msg: isValidPassword.error.issues[0].message, status: 400 };
                }
                const dalResult = yield user_dal_1.default.updatePasswordDAL(id, data);
                if ((dalResult === null || dalResult === void 0 ? void 0 : dalResult.status) == 404) {
                    return { msg: dalResult.msg, status: 404 };
                }
                if ((dalResult === null || dalResult === void 0 ? void 0 : dalResult.status) == 400) {
                    return { msg: dalResult.msg, status: 400 };
                }
                return { msg: dalResult.msg, status: dalResult.status };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static sendforgetPasswordOtp(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield user_dal_1.default.sendforgetPasswordOtpDAL(email);
                if ((dalResult === null || dalResult === void 0 ? void 0 : dalResult.status) == 404) {
                    return { msg: dalResult.msg, status: 404 };
                }
                return { msg: dalResult === null || dalResult === void 0 ? void 0 : dalResult.msg, status: 200 };
            }
            catch (error) {
                console.log(error);
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static verifyForgetPasswordOtp(email, otp, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dalResult = yield user_dal_1.default.verifyForgetPasswordOtpDAL(email, otp, password);
                if ((dalResult === null || dalResult === void 0 ? void 0 : dalResult.status) == 404) {
                    return { msg: dalResult.msg, status: 404 };
                }
                return { msg: dalResult.msg, status: 200 };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.UserService = UserService;
