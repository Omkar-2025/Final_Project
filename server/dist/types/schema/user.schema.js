"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.updateUserSchema = exports.loginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(255),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(12),
    phone: zod_1.z.string().min(10).max(10),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(12)
});
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(50).optional(),
    email: zod_1.z.string().email().optional(),
    phone: zod_1.z.string().min(10).max(10).optional(),
    address: zod_1.z.string().optional()
});
exports.updatePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string().min(6).max(12),
    newPassword: zod_1.z.string().min(6).max(12)
});
