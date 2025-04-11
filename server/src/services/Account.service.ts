import { AppDataSource } from "../config/db";
import { Account } from "../entitiy/account.entity";
import { accountSchema } from "../types/schema/account.scehma";
const pdf = require('pdf-creator-node')
import fs from 'fs';
import { AccountType, AmountAccount, TransactionType } from "../types/interfaces/accountType";
import { AccountDAL } from "../dal/account.dal";
import { GlobalErrorHandler } from "../types/globalErrorHandler";


const accountRepository = AppDataSource.getRepository(Account);


export class AccountService {


    /**
     * This method is used to create the Bank account of the User
     * @param data 
     * @returns 
     */


    static async createAccount(data: AccountType) {
    

            const { name, balance, account_type, id, aadhar_card_number, pan_card_number } = data;

            if (!name || !balance || !account_type || !id || !aadhar_card_number || !pan_card_number) {
                return { msg: "Please provide all the fields", status: 400 };
            }

            const isValiddata = accountSchema.safeParse(data);

            if (!isValiddata.success) {
                return { msg: isValiddata.error.issues[0].message, status: 400 };
            }

            const dalResult = await AccountDAL.createAccountDAL(data);

            return { msg: dalResult.msg, status: dalResult.status };

    }

    static async getAccount(id: number) {
     

            const dalResult = await AccountDAL.getAccountDAL(id);

            return { msg: dalResult.msg, status: dalResult.status };

       
    }

    static async createTranscation(data: TransactionType) {
  

      

            const dalResult = await AccountDAL.createTranscationDAL(data)

            return { msg: dalResult.msg, status: dalResult.status };

    }

    static async getTranscations(id: number, page: number, limit: number) {
 
            const dalResult = await AccountDAL.getTranscationsDAL(id, page, limit);

            return { msg: dalResult.msg, status: dalResult.status };

       
    }

    static async getTransactionsById(id: number) {
        
            const dalResult = await AccountDAL.getTransactionsByIdDAL(id);

            return { msg: dalResult.msg, status: dalResult.status };

       
    }

    static async Withdraw(data:AmountAccount) {
 

            const dalResult = await AccountDAL.WithdrawDAL(data);

            return { msg: dalResult?.msg, status: dalResult?.status };

        
    }

    static async Deposit(data: AmountAccount) {
     
            const dalResult = await AccountDAL.DepositDAL(data);

            return { msg: dalResult?.msg, status: dalResult?.status };

       
    }


    static async getAllAccounts() {
      

            const accounts = await accountRepository.find({ relations: ['user'] });

            return { msg: accounts, status: 200 };

       
    }

    static async getMonthlyExpenseBLL({ currentMonth, currentYear, id }: { currentMonth: number; currentYear: number; id: number }) {
     

            if(!currentMonth || !currentYear || !id) {
                return { msg: "Please provide all the fields", status: 400 };
            }

          const dalResult = await AccountDAL.getMonthlyExpenseBLLDAL({ currentMonth, currentYear, id });

          return { msg: dalResult.msg, status: dalResult.status };

       
    }

    static async getMonthlyTransactionsBLL({ currentMonth, currentYear, id }: { currentMonth: number; currentYear: number; id: number }) {
      

            if(!currentMonth || !currentYear || !id) {
                return { msg: "Please provide all the fields", status: 400 };
            }

            const dalResult = await AccountDAL.getMonthlyTransactionsBLLDAL({ currentMonth, currentYear, id });
            return { msg: dalResult.msg, status: dalResult.status };
        
    }

    static async getAllMonthlyExpenses({ currentDate, currentYear, id }: { currentDate: number, currentYear: number, id: number }) {


            if(!currentDate || !currentYear || !id) {
                throw new GlobalErrorHandler("Please provide all the fields",  400 );
            }

            const dalResult = await AccountDAL.getAllMonthlyExpensesDAL({ currentDate, currentYear, id });
            return { msg: dalResult.msg, status: dalResult.status };

       
    }
 

    static async deactiveAccountBLL(id: number) {
     

            if(!id){
                throw new GlobalErrorHandler("Please provide all the fields", 400 );
            }

            const dalResult = await AccountDAL.deactiveAccountBLLDAL(id);
            return { msg: dalResult.msg, status: dalResult.status };
      
    }

    static async activateAccountBLL(id: number) {
   

            if(!id){
                throw new GlobalErrorHandler("Please provide all the fields",  400 );
            }

           const dalResult = await AccountDAL.activateAccountBLLDAL(id);

            return { msg: dalResult.msg, status: dalResult.status };

       
    }


    static async searchTranscationBLL(id:number,search:string) {
    

            const dalResult = await AccountDAL.searchTransactionDAL(id,search);

            return { msg: dalResult?.msg, status: dalResult?.status };

       
    }

    

    


}



// 83504A2F-62EC-4AAE-BB02-3E61D75A4439

