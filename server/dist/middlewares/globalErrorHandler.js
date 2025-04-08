"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message || "Internal server error",
        stack: err.stack || "No stack trace available"
    });
};
exports.globalErrorHandler = globalErrorHandler;
