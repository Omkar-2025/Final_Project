import { AppDataSource } from "../config/db";
import { Account } from "../entitiy/Account.entity";
import { Transaction } from "../entitiy/Transaction.entity";
import { User } from "../entitiy/User.entity";
import { mailerSender } from "../utils/mailerSender";
import accountCreationTemplate from "../utils/accountTemplate";
import transcationVerfication from "../utils/transcationVerfication";
import { accountSchema, depositWithDrawSchema, transactionSchema } from "../types/schema/account.scehma";
import { getRepository } from "typeorm";
import { object } from "zod";
// import { html } from "./expense";
const pdf = require('pdf-creator-node')
import fs from 'fs';
const html = fs.readFileSync('src/services/expense.html','utf-8')


const userRepository = AppDataSource.getRepository(User);
const accountRepository = AppDataSource.getRepository(Account);
const transactionRepository = AppDataSource.getRepository(Transaction);


export class AccountService{

    async createAccount(data:any){
        try {
            const {name,balance,account_type,id}=data;
            if(!name || !balance || !account_type || !id){
                return {msg:"Please provide all the fields",status:400};
            }
            const isValiddata = accountSchema.safeParse(data);
            if(!isValiddata.success){
                return {msg:isValiddata.error.issues[0].message,status:400};
            }
           const accountInstance = new Account(name, balance, account_type, id);
           const user = await userRepository.findOne({where:{id:id}});
              if(!user){
                return {msg:"User not found",status:404};
            }
            const result:any = await accountRepository.insert(accountInstance); //`Account created successfully with account number ${result.generatedMaps[0].account_number}`
            console.log(result);
             await mailerSender({email:user.email,title:"Account created",body:accountCreationTemplate(result.generatedMaps[0].account_number,user.name)});
            return {msg:"Account created successfully",status:201};
        } catch (error) {
            console.log(error);
            return {msg:"Error creating account",status:500};
        }
    }

    async getAccount(id:number){
        try {
            const account = await accountRepository.find({where:{id:id},relations:['transactionsFrom','transactionsTo']});
            if(account){
                return {msg:account,status:200};
            }
            return {msg:"Account not found",status:404};
        } catch (error) {
            console.log(error)
            return {msg:"Internal server error",status:500};
        }
    }

    async createTranscation(data: any) {
        const queryRunner = AppDataSource.createQueryRunner(); // Create a QueryRunner
        await queryRunner.connect(); // Establish a connection
        await queryRunner.startTransaction(); // Start a transaction
    
        try {
            let { fromAccount, toAccount, amount, transcationType } = data;
    
            if (!fromAccount || !toAccount || !amount || !transcationType) {
                return { msg: "Please provide all the fields", status: 400 };
            }
    
            const isValiddata = transactionSchema.safeParse(data);
            // if (!isValiddata.success) {
            //     return { msg: isValiddata.error.issues[0].message, status: 400 };
            // }
    
            // Fetch accounts using the QueryRunner
            const fromAccountInstance = await queryRunner.manager.findOne(Account, {
                where: { id: fromAccount },
                relations: ["user"],
            });
            const toAccountInstance = await queryRunner.manager.findOne(Account, {
                where: { account_number: toAccount },
            });
    
            if (!fromAccountInstance || !toAccountInstance) {
                return { msg: "Account not found", status: 404 };
            }
    
            amount = parseInt(amount);
            if (fromAccountInstance.balance >= amount) {
                // Update balances
                fromAccountInstance.balance -= amount;
                toAccountInstance.balance += amount;
    
                // Save updated accounts using the QueryRunner
                await queryRunner.manager.save(fromAccountInstance);
                await queryRunner.manager.save(toAccountInstance);
    
                // Create and save the transaction
                const transactionInstance = new Transaction(
                    amount,
                    transcationType,
                    fromAccountInstance,
                    toAccountInstance
                );
                const result = await queryRunner.manager.save(transactionInstance);
    
                // Commit the transaction
                await queryRunner.commitTransaction();
    
                // Send email notification
                await mailerSender({
                    email: fromAccountInstance.user.email,
                    title: "Transaction successful",
                    body: transcationVerfication(
                        result.id,
                        amount,
                        result.createdAt,
                        result.transactionType
                    ),
                });
                return { msg: "Transaction successful", status: 200 };
            } else {
                return { msg: "Insufficient balance", status: 400 };
            }
        } catch (error) {
            console.error("Error during transaction:", error);
    
            // Rollback the transaction in case of an error
            await queryRunner.rollbackTransaction();
            return { msg: "Internal server error", status: 500 };
        } finally {
            // Release the QueryRunner connection
            await queryRunner.release();
        }
    }
    
    async getTranscations(id:number){
        try {
            const transactions = await transactionRepository.find({
                where: [
                    { fromAccount: { id: id } },
                    { toAccount: { id: id } }   
                ],
                order:{
                    id:'DESC'
               },
                relations: ['fromAccount', 'toAccount'], 
            });
            return {msg:transactions,status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    async getTransactionsById(id:number){
        try {
            const result = await transactionRepository.findOne({where:{id:id},relations:['fromAccount','toAccount']});
            if(result){
                return {msg:result,status:200};
            }
            return {msg:"Transaction not found",status:404};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    async Withdraw(data:any){
        try {
            let {amount,accountId}=data;
            if(!amount || !accountId){
                return {msg:"Please provide all the fields",status:400};
            }
            amount = parseInt(amount);
            data.amount = amount;
            const isValiddata = depositWithDrawSchema.safeParse(data);
            if(!isValiddata.success){ 
                return {msg:isValiddata.error.issues[0].message,status:400};
            }
            const account = await accountRepository.findOne({where:{id:accountId}});
            if(!account){
                return {msg:"Account not found",status:404}
            }
            const transactionInstance = new Transaction(amount, "withDraw", account, account);
            if(account){
                if(account.balance>=amount){
                    account.balance-=amount;
                    await accountRepository.save(account);
                    const result = await transactionRepository.save(transactionInstance);
                    await mailerSender({email:data.user.email,title:"Transaction successfull",body:transcationVerfication(result.id,amount,result.createdAt,result.transactionType)});
                    return {msg:"Withdraw successfull",status:200};
                }
                return {msg:"Insufficient balance",status:400};
            }
            return {msg:"Account not found",status:404};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    async Deposit(data:any){   
        try {
            let {amount,accountId}=data;

            amount = parseInt(amount);

            if(!amount || !accountId){
                return {msg:"Please provide all the fields",status:400};
            }

            const isValiddata = transactionSchema.safeParse(data);

            // if(!isValiddata.success){
            //     return {msg:isValiddata.error.issues[0].message,status:400};
            // }

            const account = await accountRepository.findOne({where:{id:accountId}});


            if(!account){
                return {msg:"Account not found",status:404}
            }

            const transactionInstance = new Transaction(amount, "Deposit", account, account);
            if(account){
                amount=parseInt(amount);
                account.balance+=amount;
                await accountRepository.save(account);
                const result = await transactionRepository.save(transactionInstance);
                await mailerSender({email:data.user.email,title:"Transaction successfull",body:transcationVerfication(result.id,amount,result.createdAt,result.transactionType)});
                return {msg:"Deposit successfull",status:200};
              }
            return {msg:"Account not found",status:404};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }


    async getAllAccounts(){
        try {
            const accounts = await accountRepository.find({relations:['user']});
            return {msg:accounts,status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    async getMonthlyExpenseBLL({ currentMonth, currentYear ,id}: { currentMonth: number; currentYear: number;id:number }) {
        try {
        const transactions = await transactionRepository
            .createQueryBuilder("transaction")
            .select("SUM(transaction.amount)", "totalExpenses")
            .where("transaction.fromAccountId = :id", { id })
            .andWhere("MONTH(transaction.createdAt) = :month", { month: currentMonth })
            .andWhere("YEAR(transaction.createdAt) = :year", { year: currentYear })
            .getRawOne();

        console.log(transactions);
        
           return { status: 200, msg: transactions };
        } catch (error) {
          console.error("Error fetching monthly transactions", error);
          return { status: 500, msg: "Internal server error" };
        }
      }

     async getMonthlyTransactionsBLL({ currentMonth, currentYear ,id}: { currentMonth: number; currentYear: number;id:number }) {
        try {
            const transactions = await transactionRepository
                .createQueryBuilder("transaction")
                .where("transaction.fromAccountId = :id", { id })
                .andWhere("MONTH(transaction.createdAt) = :month", { month: currentMonth })
                .andWhere("YEAR(transaction.createdAt) = :year", { year: currentYear })
                .getMany();
    
            return { status: 200, msg: transactions };
        } catch (error) {
            console.error("Error fetching monthly transactions", error);
            return { status: 500, msg: "Internal server error" };
        }
    } 

    async getAllMonthlyExpenses({currentDate,currentYear,id}:{currentDate:number,currentYear:number,id:number}){
        try {
            const transactions = await transactionRepository
            .createQueryBuilder("transaction")
            .select([
                "MONTH(transaction.createdAt) AS month",
                "YEAR(transaction.createdAt) AS year",
                "transaction.transactionType AS transactionType",
                "SUM(transaction.amount) AS totalAmount",
                "COUNT(transaction.id) AS transactionCount"
            ])
            .where("transaction.fromAccountId = :id OR transaction.toAccountId = :id", { id })
            .groupBy("YEAR(transaction.createdAt), MONTH(transaction.createdAt), transaction.transactionType")
            .orderBy("YEAR(transaction.createdAt)", "DESC")
            .addOrderBy("MONTH(transaction.createdAt)", "DESC")
            .getRawMany();

            // console.log(transactions);
            

        // Group transactions by month and categorize them by transactionType
        const groupedTransactions = transactions.reduce((acc, transaction) => {
            const key = `${transaction.year}-${transaction.month}`;
            // console.log(key);
            
            if (!acc[key]) {
                acc[key] = {
                    year: transaction.year,
                    month: transaction.month,
                    deposits: 0,
                    withdrawals: 0,
                    billPayments: 0,
                    totalTransactions: 0,
                    transferAmount: 0,
                };
            }
            // console.log();
                // console.log(transaction.transactionType);
            
            if (transaction.transactionType === "Deposit") {
                acc[key].deposits += parseFloat(transaction.totalAmount);
            } else if (transaction.transactionType === "withDraw") {
                acc[key].withdrawals += parseFloat(transaction.totalAmount);
            } else if (transaction.transactionType.trim().startsWith("Bill Payment")) {
                acc[key].billPayments += parseFloat(transaction.totalAmount);
            }
            else{
                // console.log(transaction);
                acc[key].transferAmount += parseFloat(transaction.totalAmount);
            }
            acc[key].totalTransactions += parseInt(transaction.transactionCount, 10);
            return acc;
        }, {});
        // console.log(groupedTransactions);

        

        let options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                contents: '<div style="text-align: center;">Author: Easy Bank</div>'
            },
            footer: {
                height: "28mm",
                contents: {
                    first: 'Cover page',
                    // 2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
        };

        let document = {
            html:html , 
            data: {
              users: groupedTransactions,
            },
            path: "./output.pdf",
            type: " ",
          };

          pdf.create(document,options).then((res:any)=>{
                console.log(res);
          })
          .catch((error:any)=>{
            console.error(error);
          })

        return { status: 200, msg: Object.values(groupedTransactions)  };
        } catch (error) {
            console.error("Error fetching monthly expenses and transactions:", error);
            return { status: 500, msg: "Internal server error" };
        }
    }


    async deactiveAccountBLL(id:number){
        try {
            
            const account = await accountRepository.findOne({where:{id:id}});
            if(!account){
                return {msg:"Account not found",status:404};
            }
            account.status = false;
            await accountRepository.save(account);
            return {msg:"Account deactivated successfully",status:200};

        } catch (error) {
            console.log(error)
            return {msg:"Internal server error",status:500};
        }
    }

    async activateAccountBLL(id:number){
        try {

            const account = await accountRepository.findOne({where:{id:id}});

            if(!account){
                return {msg:"Account not found",status:404};
            }

            account.status = true;

            await accountRepository.save(account);

            return {msg:"Account activated successfully",status:200};

        } catch (error) {
            console.log(error)
            return {msg:"Internal server error",status:500};   
        }
    }

   
}

export default new AccountService();


// 83504A2F-62EC-4AAE-BB02-3E61D75A4439

