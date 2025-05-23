"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
/**
 * This middleware is used to verify the jwt token
 * @param req
 * @param res
 * @param next
 */
const verifyJwt = (req, res, next) => {
    var _a;
    try {
        // console.log(process.env.JWT_SECRET);
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        // console.log(error);
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.verifyJwt = verifyJwt;
