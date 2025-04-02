import { accountType } from "../enums/account";
import { z } from "zod";

/**
 * This schema is used to validate the account data
 * @param name name of the account holder
 * @param balance balance of the account
 * @param account_type type of the account (savings, current, salary)
 * @param id id of the account holder
 */

export const accountSchema = z.object({
    name:z.string().min(3).max(255),
    balance:z.number().min(500),
    account_type:z.enum([accountType.SAVINGS, accountType.CURRENT, accountType.SALARY]),
    id:z.number()
})


/**
 * This schema is used to validate the transaction data
 * @param amount amount of the transaction
 * @param toAccount id of the account to which the money is transferred
 * @param fromAccount id of the account from which the money is transferred
 * @param transcationType type of the transaction (credit, debit)
 */

export const transactionSchema = z.object({
    amount:z.number().min(1),
    toAccount:z.string(),
    fromAccount:z.string(),
    // type:z.enum(["credit","debit"]),
    transcationType:z.string()
})


/**
 * This schema is used to validate the deposit and withdraw data
 * @param amount amount of the transaction
 * @param accountId id of the account to which the money is transferred
 */

export const depositWithDrawSchema = z.object({
    amount:z.number().min(1),
    accountId:z.string()
})



