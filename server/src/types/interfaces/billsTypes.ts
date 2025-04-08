import { z } from "zod";

export interface BillsData {
    billName: string;
    amount: number;
    dueDate: string; // Use `Date` if the dueDate is a Date object instead of a string
    accountId: number;
    frequency: string; // Example values: "daily", "weekly", "monthly"
    user?: {
        id: number;
        email: string;
    }; // Optional user object for additional context
}

export const billPaymentSchema = z.object({
    billId: z.number().int("Bill ID must be an integer").positive("Bill ID must be a positive number"),
    accountId: z.number().int("Account ID must be an integer").positive("Account ID must be a positive number"),
});


export interface PayBillData {
    billId: number; // The ID of the bill to be paid
    accountId: number; // The ID of the account from which the payment will be made
    user: {
        id: number; // The ID of the user making the payment
        email: string; // The email of the user making the payment
    };
}