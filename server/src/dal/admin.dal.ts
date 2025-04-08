import { AppDataSource } from "../config/db";
import {User} from '../entitiy/user.entity'
import { Account } from "../entitiy/account.entity";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mailerSender } from "../utils/mailerSender";
import queryResolverTemplate from "../utils/queryresolveTemplate";
import { Support } from "../entitiy/support_query.entity";
import { ResolveQueryType } from "../types/schema/admin.schema";


const userRepo= AppDataSource.getRepository(User);
const accountRepo= AppDataSource.getRepository(Account);
const supportRepo= AppDataSource.getRepository(Support);


export class adminDAL{


    static async getAllUsersDAL(){
        const users = await userRepo.find({where:{role:"user"},relations:["accounts"]});
            return {msg:users,status:200};
    }

    static async verifyAccountDAL(id:number){
        const account = await accountRepo.findOne({where:{id:id},relations:["user"]});
                    if(!account){
                        return {msg:"Account not found",status:404};
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
            return {msg:"Query not found",status:404};
        }
        const user = await userRepo.findOne({where:{id:support.user.id}});
        // console.log(user);
        if(!user){
            return {msg:"User not found",status:404};
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
            return { msg: "User not found", status: 404 };
        }
        const accounts = await accountRepo.find({ where: { user: user } });
        if (!accounts || accounts.length === 0) {
            return { msg: "No accounts found for this user", status: 404 };
        }

        return { msg: accounts, status: 200 };
    }

    static async getAllSupportDAL(id:number){
        const user= await userRepo.findOne({where:{id:id}});
        console.log(user);
        if(!user){
            return {msg:"User not found",status:404};
        }
        const support = await supportRepo.find({where:{user:user},});
        return {msg:support,status:200};
    }

    static async getSupportDAL(){
        const support = await supportRepo.find({relations:["user"]});
        return {msg:support,status:200};
    }


   

}