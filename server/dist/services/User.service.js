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
const User_entity_1 = require("../entitiy/User.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const otp_generator_1 = __importDefault(require("otp-generator"));
const mailerSender_1 = require("../utils/mailerSender");
const authTemplate_1 = require("../utils/authTemplate");
const userRepository = db_1.AppDataSource.getRepository(User_entity_1.User);
class UserService {
    static createUserBLL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, phone, role } = data;
                const userexist = yield userRepository.find({ where: { email: email } });
                if (userexist.length > 0) {
                    return { msg: "User already exist", status: 400 };
                }
                const hashpassowrd = yield bcryptjs_1.default.hash(password, 10);
                let opt = otp_generator_1.default.generate(6, { upperCaseAlphabets: false, specialChars: false, });
                const user = userRepository.create({ name, email, password: hashpassowrd, phone, role, isVerified: false, otp: opt });
                yield (0, mailerSender_1.mailerSender)({ email: email, title: "verfication", body: (0, authTemplate_1.otpTemplate)(opt) });
                user.accounts = [];
                yield userRepository.save(user);
                return { msg: "User created successfully", status: 201 };
            }
            catch (error) {
                console.log(error);
                return ({ message: "Error creating user", status: 500 });
            }
        });
    }
    static loginBLL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = data;
                const user = yield userRepository.findOne({ where: { email: email } });
                if (user) {
                    if (yield bcryptjs_1.default.compare(password, user.password)) {
                        const token = jsonwebtoken_1.default.sign({ id: user.id, email: email, role: user.role }, process.env.JWT_SECRET);
                        return ({ msg: "Login successfull", role: user.role, token: token, status: 200 });
                    }
                    else {
                        return ({ msg: "Invalid password", status: 400 });
                    }
                }
                return ({ message: "User not found", status: 404 });
            }
            catch (error) {
                console.log(error);
                return ({ msg: "Internal server error", status: 500 });
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
    static verifyUserBLL(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = data;
                const user = yield userRepository.findOne({ where: { email: email } });
                if (!user) {
                    return { msg: "User not found", status: 404 };
                }
                if (user) {
                    if (otp == user.otp) {
                        user.isVerified = true;
                        yield userRepository.save(user);
                        return { msg: "User verified successfully", status: 200 };
                    }
                    return { msg: "Invalid OTP", status: 400 };
                }
                return { msg: "User not found", status: 404 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static getUsers(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository.findOne({ where: { id: id } });
                if (!user) {
                    return { msg: "User not found", status: 404 };
                }
                user.password = "";
                user.otp = "";
                return { msg: user, status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository.findOne({ where: { id: id } });
                if (!user) {
                    return { msg: "User not found", status: 404 };
                }
                const { name, email, phone } = data;
                user.name = name;
                user.email = email;
                user.phone = phone;
                yield userRepository.save(user);
                return { msg: "User updated successfully", status: 200 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
    static updatePassword(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userRepository.findOne({ where: { id: id } });
                if (!user) {
                    return { msg: "User not found", status: 404 };
                }
                const { oldPassword, newPassword } = data;
                if (yield bcryptjs_1.default.compare(oldPassword, user.password)) {
                    const hashpassowrd = yield bcryptjs_1.default.hash(newPassword, 10);
                    user.password = hashpassowrd;
                    yield userRepository.save(user);
                    return { msg: "Password updated successfully", status: 200 };
                }
                return { msg: "Invalid password", status: 400 };
            }
            catch (error) {
                return { msg: "Internal server error", status: 500 };
            }
        });
    }
}
exports.UserService = UserService;
