import { NextFunction, Request,Response } from "express";
import { UserService } from "../services/user.service"
import { loginSchema, userSchema } from "../types/schema/user.schema";
import { ZodError } from "zod";
import {z} from 'zod';
import { UserResponseType } from "../types/interfaces/userType";

class UserController{

    /**
     * This controller is used to create a new User
     * @param req 
     * @param res 
     * @returns
     */

    async createUser(req:Request,res:Response,next:NextFunction){
        try {
            const data = req.body;
          
            const result:UserResponseType = await UserService.createUserBLL(data);

            if(result.status==400){
                res.status(400).json({msg:result.msg});
                return
            }
            res.status(201).json({msg:result.msg});
        } catch (error) {  
            next(error)
           
        }
    }

    /**
     * This controller is used to login a user
     * @param req 
     * @param res 
     * @returns jwt token and message
     */

    async Login(req:Request,res:Response,next:NextFunction){
            try {
                const data = req.body;
               const result:UserResponseType = await UserService.loginBLL(data);
                if(result.status==404){
                    res.status(404).json({msg:result.msg});
                    return;
                }
                res.status(200).cookie('token',result.token,{httpOnly:true,secure:true}).json({msg:result.msg,role:result.role});
            } catch (error:Error | any) {
                next(error)
            }
    }


    /**
     * This controller is used to get all accounts of a user
     * @param req
     * @param res
     * @returns all accounts of a user
     */ 

    async getAllAccounts(req:Request,res:Response){
        try {
            const id = req.body.user.id;
            const result:UserResponseType = await UserService.getAccountsBLL(parseInt(id));
            res.status(result.status).json(result.msg);
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }

    /**
     * This controller is used to verify a user using otp
     * @param req
     * @param res
     * @returns message and status
     */

    async verifyUser(req:Request,res:Response,next:NextFunction){
        try {
            const data = req.body;
            const result:UserResponseType = await UserService.verifyUserBLL(data);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            next(error)
        }
    }

    /**
     * 
     */

    async logout(req:Request,res:Response){
        try {
            res.clearCookie('token').status(200).json({msg:"Logout successfull"});

        } catch (error) {
            console.log(error);
        }
    }

    async getUser(req:Request,res:Response){
        try {

            const id = req.body.user.id;
            const result = await UserService.getUsers(id);
            if(result.status==404){
                res.status(404).json({msg:result.msg});
                return;
            }
            res.status(200).json({msg:result.msg});
        } catch (error) {
             res.status(500).json({msg:"Internal server error"});
             return;
        }
    }

    async updateUser(req:Request,res:Response){
        try {

            const id = req.body.user.id;
            const data = req.body;
            const isvalidUser = userSchema.safeParse(data);
            // if(!isvalidUser.success){
            //     res.status(400).json({msg:"please enter valid data"});
            //     return;
            // }
            const result = await UserService.updateUser(id,data);
            if(result.status==404){
                res.status(404).json({msg:result.msg});
                return;
            }
            res.status(200).json({msg:result.msg});
            return;
        } catch (error) {
             res.status(500).json({msg:"Internal server error"});
             return;
        }
    }

    async updatePassword(req:Request,res:Response){
        try {
            const id = req.body.user.id;
            const data = req.body;
            console.log(id);
            
            const isvalidUser = userSchema.safeParse(data);
            // if(!isvalidUser.success){
            //     res.status(400).json({msg:"please enter valid data"});
            //     return;
            // }
            const result = await UserService.updatePassword(id,data);
            if(result.status==404){
                res.status(404).json({msg:result.msg});
                return;
            }
            res.status(200).json({msg:result.msg});
            return;
        } catch (error) {
             res.status(500).json({msg:"Internal server error"});
             return;
        }
    }

    async sendForgetPasswordOtp(req:Request,res:Response){
        try {

            const data = req.body.email;
            const otp = req.body.otp;
            const result = await UserService.sendforgetPasswordOtp(data,otp);
            if(result.status==404){
                res.status(404).json({msg:result.msg});
            }

            res.status(200).json({msg:result.msg});
            return ;
        }
        catch (error) {
            console.log(error);
        }
    }

    async verifyForgetPasswordOtp(req:Request,res:Response){
        try {

            const data = req.body;
            const result = await UserService.verifyForgetPasswordOtp(data.email,data.otp,data.password);
            if(result.status==404){
                res.status(404).json({msg:result.msg});
            }
            res.status(200).json({msg:result.msg});
            return ;

        } catch (error) {
            
        }
    }

    async generateOtp(req:Request,res:Response,next:NextFunction){
        // console.log("hii");
        try {
            const email = req.body.email;
            // console.log(req.body);
            
            const result = await UserService.resendOtp(email);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }


}

export default new UserController();