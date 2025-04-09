"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
/**
 * This middleware is used to handle the global error
 * @param err
 * @param req
 * @param res
 * @param next
 */
const globalErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message || "Internal server error",
    });
};
exports.globalErrorHandler = globalErrorHandler;
