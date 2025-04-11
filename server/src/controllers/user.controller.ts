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
               
                res.status(200).cookie('token',result.token,{httpOnly:true,secure:true}).json({msg:result.msg,role:result.role});
            } catch (error) {
                next(error)
            }
    }


    /**
     * This controller is used to get all accounts of a user
     * @param req
     * @param res
     * @returns all accounts of a user
     */ 

    async getAllAccounts(req:Request,res:Response,next:NextFunction){
        try {
            const id = req.body.user.id;
            const result:UserResponseType = await UserService.getAccountsBLL(parseInt(id));
            res.status(result.status).json(result.msg);
        } catch (error) {
            // console.log(error);
            next(error)
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

    async logout(req:Request,res:Response,next:NextFunction){
        try {
            res.clearCookie('token').status(200).json({msg:"Logout successfull"});

        } catch (error) {
            // console.log(error);
            next(error)
        }
    }


    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */

    async getUser(req:Request,res:Response,next:NextFunction){
        try {

            const id = req.body.user.id;
            const result = await UserService.getUsers(id);
            res.status(200).json({msg:result.msg});
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    async updateUser(req:Request,res:Response,next:NextFunction){
        try {

            const id = req.body.user.id;
            const data = req.body;
            const result = await UserService.updateUser(id,data);
            res.status(200).json({msg:result.msg});
            return;
        } catch (error) {
            // console.log(error);
             next(error);
        }
    }

    async updatePassword(req:Request,res:Response,next:NextFunction){
        try {
            const id = req.body.user.id;
            const data = req.body;
            console.log(id);
            
            
            const result = await UserService.updatePassword(id,data);
            res.status(200).json({msg:result.msg});
            return;
        } catch (error) {
            // console.log(error);
            next(error)

        }
    }

    async sendForgetPasswordOtp(req:Request,res:Response , next:NextFunction){
        try {

            const data = req.body.email;
            const otp = req.body.otp;
            const result = await UserService.sendforgetPasswordOtp(data,otp);
            res.status(200).json({msg:result.msg});
            return ;
        }
        catch (error) {
            // console.log(error);
            next(error)
        }
    }

    async verifyForgetPasswordOtp(req:Request,res:Response,next:NextFunction){
        try {

            const data = req.body;
            const result = await UserService.verifyForgetPasswordOtp(data.email,data.otp,data.password);
            res.status(200).json({msg:result.message});
            return ;

        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    async generateOtp(req:Request,res:Response,next:NextFunction){
        
        try {
            const email = req.body.email;
            const result = await UserService.resendOtp(email);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            next(error)
        }
    }


}

export default new UserController();