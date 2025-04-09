import { AppDataSource } from "../config/db";
import {User} from '../entitiy/user.entity'
import { Account } from "../entitiy/account.entity";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mailerSender } from "../utils/mailerSender";
import queryResolverTemplate from "../utils/queryresolveTemplate";
import { Support } from "../entitiy/support_query.entity";
import { ResolveQueryType } from "../types/schema/admin.schema";
import { Transaction } from "../entitiy/transaction.entity";


const userRepo= AppDataSource.getRepository(User);
const accountRepo= AppDataSource.getRepository(Account);
const supportRepo= AppDataSource.getRepository(Support);
const transactionRepository = AppDataSource.getRepository(Transaction);


export class adminDAL{


    static async getAllUsersDAL(){
        const users = await userRepo.find({where:{role:"user"},relations:["accounts"]});
            return {msg:users,status:200};
    }

    static async verifyAccountDAL(id:number){
        const account = await accountRepo.findOne({where:{id:id},relations:["user"]});
                    if(!account){
                        throw new Error("Account not found");
                    }
                    account.isVerified=true;
                    await mailerSender({email:account.user.email,title:"Account Verified",body:`Your account with account number ${account.account_number} has been verified successfully`});
                    await accountRepo.save(account);
                    return {msg:"Account verified successfully",status:200};
                }


    static async getALLAccountsDAL(){
        const accounts = await accountRepo.find({relations:["user"]});
        return {msg:accounts,status:200};
    }

    static async getAllQueryDAL(){
        const queries = await userRepo.find({relations:["support"]});
        return {msg:queries,status:200};
    }

    static async resolveQueryDAL(data:ResolveQueryType){
        const {queryId,reply} =data;
        const support = await supportRepo.findOne({where:{id:data.queryId},relations:["user"]}); 
        // console.log(support);
        if(!support){
            throw new Error("Query not found");
        }
        const user = await userRepo.findOne({where:{id:support.user.id}});
        // console.log(user);
        if(!user){
           throw new Error("User not found");
        }
        support.resolve=reply;
        support.status='Completed';
        await supportRepo.save(support);
        await mailerSender({email:user.email,title:"Query Resolved",body:queryResolverTemplate(user.name,support.subject,reply)});
        return {msg:"Query resolved successfully",status:200};
    }

    static async getAllAccountsDAL(id:number){
        const user = await userRepo.findOne({ where: { id: id } });
        if (!user) {
           throw new Error("User not found")
        }
        const accounts = await accountRepo.find({ where: { user: user } });
        if (!accounts || accounts.length === 0) {
            throw new Error("No accounts found for this user")
        }

        return { msg: accounts, status: 200 };
    }

    static async getAllSupportDAL(id:number){
        const user= await userRepo.findOne({where:{id:id}});
        console.log(user);
        if(!user){
           throw new Error("User not found")
        }
        const support = await supportRepo.find({where:{user:user},});
        return {msg:support,status:200};
    }

    static async getSupportDAL(){
        const support = await supportRepo.find({relations:["user"]});
        return {msg:support,status:200};
    }


    static async getAllExpenseDAL(){
 

            const transaction = await transactionRepository.createQueryBuilder("transaction")
            .select([
                "MONTH(transaction.createdAt) AS month",
                "YEAR(transaction.createdAt) AS year",
                "transaction.transactionType AS transactionType",
                "SUM(transaction.amount) AS totalAmount",
                "COUNT(transaction.id) AS transactionCount"
            ])
            .groupBy("YEAR(transaction.createdAt), MONTH(transaction.createdAt), transaction.transactionType")
            .orderBy("YEAR(transaction.createdAt)", "DESC")
            .addOrderBy("MONTH(transaction.createdAt)", "DESC")
            .getRawMany();

            const groupedTransactions = transaction.reduce((acc, transaction) => {
                const key = `${transaction.year}-${transaction.month}`;
                // console.log(key);

                if (!acc[key]) {
                    acc[key] = {
                        // year: transaction.year,
                        month: transaction.month,
                        // deposits: 0,
                        // withdrawals: 0,
                        // billPayments: 0,
                        // totalTransactions: 0,
                        totalAmount: 0,
                    };
                }
                // console.log();
                // console.log(transaction);

                if (transaction.transactionType === "Deposit") {
                    // acc[key].deposits += parseFloat(transaction.totalAmount);
                    acc[key].totalAmount += parseFloat(transaction.totalAmount);

                } else if (transaction.transactionType === "withDraw") {
                    // acc[key].withdrawals += parseFloat(transaction.totalAmount);
                    acc[key].totalAmount += parseFloat(transaction.totalAmount);                    
                } else if (transaction.transactionType.trim().startsWith("Bill Payment")) {
                    // acc[key].billPayments += parseFloat(transaction.totalAmount);
                    acc[key].totalAmount += parseFloat(transaction.totalAmount);

                }
                else {
                    // console.log(transaction);
                    // acc[key].transferAmount += parseFloat(transaction.totalAmount);
                    acc[key].totalAmount += parseFloat(transaction.totalAmount);

                }
                // acc[key].totalTransactions += parseInt(transaction.transactionCount, 10);
                return acc;
            }, {});
                // console.log(groupedTransactions);

            return { status: 200, msg: Object.values(groupedTransactions) };

        

    }
   

}