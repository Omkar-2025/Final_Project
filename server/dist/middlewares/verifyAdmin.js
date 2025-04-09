"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
/**
 * This middleware is used to verify the jwt token and check if the user is admin or not
 * @param req
 * @param res
 * @param next
 * @returns
 */
const verifyAdmin = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token)
            res.status(401).json({ message: "Unauthorized" });
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.body.user = decoded;
        if (req.body.user.role !== "Admin") {
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
    }
};
exports.verifyAdmin = verifyAdmin;
