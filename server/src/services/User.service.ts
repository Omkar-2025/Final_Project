import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entitiy/User.entity";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import otpGenerator from 'otp-generator';
import { mailerSender } from "../utils/mailerSender";
import { otpTemplate } from "../utils/authTemplate";
import { LoginType, UserType, VerifyType } from "../types/interfaces/userType";

const userRepository = AppDataSource.getRepository(User);

export class UserService {


    static async createUserBLL(data:UserType) {
        try {
            const { name, email, password, phone,role} = data;
           const userexist = await userRepository.find({where:{email:email}});
            if(userexist.length>0){
               return {msg:"User already exist",status:400};
            }
            const hashpassowrd = await bcryptjs.hash(password,10);
            let opt = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, });
            const user = userRepository.create({ name, email, password:hashpassowrd, phone ,role,isVerified:false,otp:opt});
            await mailerSender({email:email,title:"verfication",body:otpTemplate(opt)});
            user.accounts=[];
            await userRepository.save(user);
            return {msg:"User created successfully",status:201};
        } catch (error) {
            console.log(error);
           return ({ message: "Error creating user", status: 500 });
        }
    }

    static async loginBLL(data:LoginType) {
        try {
            const { email, password } = data;
            const user = await userRepository.findOne({ where:{email:email}});
            if (user) {
                if(await bcryptjs.compare(password,user.password)){  
                    const token = jwt.sign({id:user.id,email:email,role:user.role},process.env.JWT_SECRET!);
                    return ({msg:"Login successfull",role:user.role,token:token,status:200});
                }
                else{
                return({msg:"Invalid password",status:400});
                }
            }
               return({ message: "User not found",status:404 });
        } catch (error) {
            console.log(error)
            return ({msg:"Internal server error",status:500});
        }
    }

    static async getAccountsBLL(id:number) {
        try {
            const users = await userRepository.find({where:{id:id},relations:['accounts']});
            return({msg:users,status:200});
        } catch (error) {
            return { message: "Internal server error", status: 500 };
        }
    }

    static async verifyUserBLL(data:VerifyType){
        try {
            const {email,otp} = data;
            const user = await userRepository.findOne({where:{email:email}});
            if(!user){
                return {msg:"User not found",status:404};
            }
            if(user){
                if(otp==user.otp){
                    user.isVerified=true;
                    await userRepository.save(user);
                    return {msg:"User verified successfully",status:200};
                }
                return {msg:"Invalid OTP",status:400};
            }
            return {msg:"User not found",status:404};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    static async getUsers(id:number){
        try {
            const user = await userRepository.findOne({where:{id:id}});
            if(!user){
                return {msg:"User not found",status:404};
            }
            user.password="";
            user.otp="";
            return {msg:user,status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    static async updateUser(id:number,data:UserType){
        try {
            const user = await userRepository.findOne({where:{id:id}});
            if(!user){
                return {msg:"User not found",status:404};
            }
            const {name,email,phone,address} = data;
            user.name=name;
            user.email=email;
            user.phone=phone;
            user.address = address || " ";
       
            await userRepository.save(user);
            return {msg:"User updated successfully",status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }
   
    static async updatePassword(id:any,data:any){
        try {
            const user = await userRepository.findOne({where:{id:id}});
            if(!user){
                return {msg:"User not found",status:404};
            }
            const {oldPassword,newPassword} = data;
            // console.log(oldPassword,newPassword);
            if(await bcryptjs.compare(oldPassword,user.password)){
                const hashpassowrd = await bcryptjs.hash(newPassword,10);
                user.password=hashpassowrd;
                await userRepository.save(user);
                return {msg:"Password updated successfully",status:200};
            }
            return {msg:"Invalid password",status:400};
        } catch (error) {
            console.log(error); 
            return {msg:"Internal server error",status:500};
        }
    }

   

}