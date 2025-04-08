"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveQuerySchema = void 0;
const zod_1 = require("zod");
exports.resolveQuerySchema = zod_1.z.object({
    queryId: zod_1.z.number().int("ID must be an integer").positive("ID must be a positive number"),
    reply: zod_1.z.string().min(1, "Reply cannot be empty").max(1000, "Reply cannot exceed 1000 characters"),
});
