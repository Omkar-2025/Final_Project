"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billStatus = exports.accountType = void 0;
var accountType;
(function (accountType) {
    accountType["SAVINGS"] = "Savings Account";
    accountType["CURRENT"] = "Current Account";
    accountType["SALARY"] = "Salary Account";
})(accountType || (exports.accountType = accountType = {}));
var billStatus;
(function (billStatus) {
    billStatus["PENDING"] = "Pending";
    billStatus["PAID"] = "Paid";
})(billStatus || (exports.billStatus = billStatus = {}));
