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
const db_1 = require("../config/db");
const user_entity_1 = require("../entitiy/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const mailerSender_1 = require("../utils/mailerSender");
const authTemplate_1 = require("../utils/authTemplate");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const globalErrorHandler_1 = require("../types/globalErrorHandler");
const user_1 = require("../dto/user");
const class_validator_1 = require("class-validator");
const userRepository = db_1.AppDataSource.getRepository(user_entity_1.User);
class UserDAL {
    static createUserDAl(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password, phone, role }) {
            const userexist = yield userRepository.find({ where: { email: email } });
            if (userexist.length > 0) {
                throw new globalErrorHandler_1.GlobalErrorHandler("User already exist", 400);
            }
            const userDTO = new user_1.UserDTO();
            Object.assign(userDTO, { name, email, password, phone, role });
            // const isValiddata = userDTO.();
            const errors = yield (0, class_validator_1.validate)(userDTO);
            // console.log(errors);
            if (errors.length > 0) {
                const errorMessages = errors.map((err) => Object.values(err.constraints || {}).join(", ")).join("; ");
                throw new globalErrorHandler_1.GlobalErrorHandler(errorMessages, 400);
            }
            const hashpassowrd = yield bcryptjs_1.default.hash(password, 10);
            let opt = otp_generator_1.default.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
            const user = userRepository.create({ name, email, password: hashpassowrd, phone, role, isVerified: false, otp: opt });
            yield (0, mailerSender_1.mailerSender)({ email: email, title: "verfication", body: (0, authTemplate_1.otpTemplate)(opt) });
            user.accounts = [];
            // console.log(user);
            yield userRepository.save(user);
            return { msg: true };
        });
    }
    static loginDAL(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const user = yield userRepository.findOne({ where: { email: email } });
            if (user) {
                if (yield bcryptjs_1.default.compare(password, user.password)) {
                    const token = jsonwebtoken_1.default.sign({ id: user.id, email: email, role: user.role }, process.env.JWT_SECRET);
                    return ({ msg: "Login successfull", role: user.role, token: token, status: 200 });
                }
                else {
                    throw new globalErrorHandler_1.GlobalErrorHandler("Invalid password", 401);
                }
            }
            throw new globalErrorHandler_1.GlobalErrorHandler("User not found", 404);
        });
    }
    static verifyOtpDAL(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, otp }) {
            const user = yield userRepository.findOne({ where: { email: email } });
            if (!user) {
                throw new Error("User not found");
            }
            if (user) {
                const time = Date.now() - user.createdAt.getTime();
                if (time / 1000 < 180) {
                    if (otp == user.otp) {
                        user.isVerified = true;
                        yield userRepository.save(user);
                        return { msg: "User verified successfully", status: 200 };
                    }
                    else {
                        throw new globalErrorHandler_1.GlobalErrorHandler("Invalid OTP", 401);
                    }
                }
            }
        });
    }
    static getUsersDAL(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findOne({ where: { id: id } });
            if (!user) {
                throw new Error("User not found");
            }
            user.password = "";
            user.otp = "";
            return { msg: user, status: 200 };
        });
    }
    static updateUserDAL(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findOne({ where: { id: id } });
            if (!user) {
                throw new Error("User not found");
            }
            const { name, email, phone, address } = data;
            user.name = name;
            user.email = email;
            user.phone = phone;
            user.address = address || " ";
            yield userRepository.save(user);
            return { msg: "User updated successfully", status: 200 };
        });
    }
    static updatePasswordDAL(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findOne({ where: { id: id } });
            if (!user) {
                throw new Error("User not found");
            }
            const { oldPassword, newPassword } = data;
            // console.log(oldPassword,newPassword);
            if (yield bcryptjs_1.default.compare(oldPassword, user.password)) {
                const hashpassowrd = yield bcryptjs_1.default.hash(newPassword, 10);
                user.password = hashpassowrd;
                yield userRepository.save(user);
                return { msg: "Password updated successfully", status: 200 };
            }
            throw new Error("Invalid password");
        });
    }
    static sendforgetPasswordOtpDAL(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findOne({ where: { email: email } });
            if (!user) {
                throw new Error("User not found");
            }
            if (user.otp == otp) {
                yield userRepository.save(user);
                return { msg: "OTP verfied successfully", status: 200 };
            }
            throw new globalErrorHandler_1.GlobalErrorHandler("Otp is not match", 400);
        });
    }
    static verifyForgetPasswordOtpDAL(email, otp, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findOne({ where: { email: email } });
            if (!user) {
                throw new Error("User not found");
            }
            if (otp !== user.otp) {
                throw new Error("Invalid OTP");
            }
            const hashpassowrd = yield bcryptjs_1.default.hash(password, 10);
            user.password = hashpassowrd;
            yield userRepository.save(user);
            return { msg: "Password updated successfully", status: 200 };
        });
    }
    static generateOtpDAL(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let opt = otp_generator_1.default.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
            const user = yield userRepository.findOne({ where: { email: email } });
            if (!user) {
                throw new globalErrorHandler_1.GlobalErrorHandler("User not found", 404);
            }
            user.otp = opt;
            yield userRepository.save(user);
            yield (0, mailerSender_1.mailerSender)({ email: email, title: "Verification", body: (0, authTemplate_1.otpTemplate)(opt) });
            return { msg: "OTP sent successfully", status: 200 };
        });
    }
}
exports.default = UserDAL;
