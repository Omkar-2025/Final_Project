"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
/**
 * This middleware is used to limit the number of requests from a single IP address
 */
const rateLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 1000,
    max: 5,
    message: "Too many requests from this IP, please try again later",
});
exports.default = rateLimiter;
