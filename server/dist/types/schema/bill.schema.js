"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billUpdateSchema = exports.billSchema = void 0;
const zod_1 = require("zod");
exports.billSchema = zod_1.z.object({
    billName: zod_1.z.string().min(3).max(50),
    amount: zod_1.z.number().min(1),
    frequency: zod_1.z.string(),
    accountId: zod_1.z.string()
});
exports.billUpdateSchema = zod_1.z.object({
    billName: zod_1.z.string().min(3).max(255),
    amount: zod_1.z.number().min(1),
    frequency: zod_1.z.enum(["weekly", "Daily", "monthly"]),
    accountId: zod_1.z.string(),
    id: zod_1.z.number()
});
