import { z } from "zod";
import { amountAccountSchema } from "../schema/account.scehma";

export interface AccountType {
    id:number,
    name: string;
    balance: number;
    account_type:string,
    userId:number
    aadhar_card_number:string,
    pan_card_number:string  
}

// fromAccount, toAccount, amount, transcationType

export interface TransactionType {

    fromAccount:string;
    toAccount:string;
    amount:number,
    transcationType:string,
}


// amount : number  accountId : number

export interface AmountAccount {
    amount: number; // The amount involved in the transaction
    accountId: number; // The ID of the account associated with the transaction
    user:{
        id:number;
        email:string;
    }
}

