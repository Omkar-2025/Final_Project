"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amountAccountSchema = exports.depositWithDrawSchema = exports.transactionSchema = exports.accountSchema = void 0;
const account_1 = require("../enums/account");
const zod_1 = require("zod");
/**
 * This schema is used to validate the account data
 * @param name name of the account holder
 * @param balance balance of the account
 * @param account_type type of the account (savings, current, salary)
 * @param id id of the account holder
 */
exports.accountSchema = zod_1.z.object({
    name: zod_1.z.string().min(3).max(20),
    balance: zod_1.z.number().min(500),
    account_type: zod_1.z.enum([account_1.accountType.SAVINGS, account_1.accountType.CURRENT, account_1.accountType.SALARY]),
    id: zod_1.z.number()
});
/**
 * This schema is used to validate the transaction data
 * @param amount amount of the transaction
 * @param toAccount id of the account to which the money is transferred
 * @param fromAccount id of the account from which the money is transferred
 * @param transcationType type of the transaction (credit, debit)
 */
exports.transactionSchema = zod_1.z.object({
    amount: zod_1.z.number().min(1),
    toAccount: zod_1.z.string(),
    fromAccount: zod_1.z.string(),
    transcationType: zod_1.z.string()
});
/**
 * This schema is used to validate the deposit and withdraw data
 * @param amount amount of the transaction
 * @param accountId id of the account to which the money is transferred
 */
exports.depositWithDrawSchema = zod_1.z.object({
    amount: zod_1.z.number().min(1),
    accountId: zod_1.z.string()
});
exports.amountAccountSchema = zod_1.z.object({
    amount: zod_1.z.number().positive("Amount must be a positive number"),
    accountId: zod_1.z.number().int("Account ID must be an integer").positive("Account ID must be a positive number"),
});
