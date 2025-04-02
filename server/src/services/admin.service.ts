import { AppDataSource } from "../config/db";
import { Account } from "../entitiy/Account.entity";
import { User } from "../entitiy/User.entity";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { mailerSender } from "../utils/mailerSender";
import queryResolverTemplate from "../utils/queryresolveTemplate";
import { Support } from "../entitiy/support_query.entity";


const userRepo= AppDataSource.getRepository(User);
const accountRepo= AppDataSource.getRepository(Account);
const supportRepo= AppDataSource.getRepository(Support);

export class AdminService{

    static async loginAdminBLL(data:{email:string,password:string}){
        try {
            const {email,password} = data;
            const admin = await userRepo.findOne({where:{email:email}});
            console.log(admin);
            
            if(!admin){
                return {msg:"Admin not found",status:404};
            }
            if( await bcrypt.compare(password,admin.password)){
                const token = jwt.sign({id:admin.id,email:email,role:admin.role},process.env.JWT_SECRET!);
                return {msg:"Login successfull",token:token,status:200};
            }
            else{
                return {msg:"Invalid password",status:400};
            }
        } catch (error) {
                return {msg:"Internal server error",status:500};
        }
    }

    static async getAllUsersBLL(){
        try {
            const users = await userRepo.find({where:{role:"user"},relations:["accounts"]});
            return {msg:users,status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    static async verifyAccountBLL(id:number){
        try {
            const account = await accountRepo.findOne({where:{id:id},relations:["user"]});
            if(!account){
                return {msg:"Account not found",status:404};
            }
            account.isVerified=true;
            await mailerSender({email:account.user.email,title:"Account Verified",body:`Your account with account number ${account.account_number} has been verified successfully`});
            await accountRepo.save(account);
            return {msg:"Account verified successfully",status:200};
        } catch (error) {
            console.log(error);
            return {msg:"Internal server error",status:500};
        }   
    } 
    
   static async getAllAccountsBLL(){
        try {
            const accounts = await accountRepo.find({relations:["user"]});
            return {msg:accounts,status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

   static async getAllQueryBLL(){
        try {
            const queries = await userRepo.find({relations:["support"]});
            return {msg:queries,status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }



    static  async resolveQueryBLL(data:any){
        try{
            const {id,reply} =data;
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
        catch(error){
            console.log(error);
            return {msg:"Internal server error",status:500};
        }
    }


    static async getAccountsBLL(id: number) {
        try {
            // Fetch the user by ID
            const user = await userRepo.findOne({ where: { id: id } });
            if (!user) {
                return { msg: "User not found", status: 404 };
            }
            const accounts = await accountRepo.find({ where: { user: user } });
            if (!accounts || accounts.length === 0) {
                return { msg: "No accounts found for this user", status: 404 };
            }
    
            return { msg: accounts, status: 200 };
        } catch (error) {
            console.log(error);
            return { msg: "Internal server error", status: 500 };
        }
    }

    static async getAllSupportBLL(id:number){
            try {
                const user= await userRepo.findOne({where:{id:id}});
                console.log(user);
                if(!user){
                    return {msg:"User not found",status:404};
                }
                const support = await supportRepo.find({where:{user:user},});
                return {msg:support,status:200};
            } catch (error) {
                return {msg:"Internal server error",status:500};
            }
        }

     static async getSupportBLL(){
        try {
            const support = await supportRepo.find({relations:["user"]});
            return {msg:support,status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }   
}

