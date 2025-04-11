"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandler = void 0;
class GlobalErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = 400;
        this.statusCode = statusCode;
    }
}
exports.GlobalErrorHandler = GlobalErrorHandler;
