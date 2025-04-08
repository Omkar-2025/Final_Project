"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billPaymentSchema = void 0;
const zod_1 = require("zod");
exports.billPaymentSchema = zod_1.z.object({
    billId: zod_1.z.number().int("Bill ID must be an integer").positive("Bill ID must be a positive number"),
    accountId: zod_1.z.number().int("Account ID must be an integer").positive("Account ID must be a positive number"),
});
