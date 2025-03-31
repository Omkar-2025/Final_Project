import { Request,Response } from "express";
import { UserService } from "../services/User.service";
import { loginSchema, userSchema } from "../types/schema/user.schema";
import { ZodError } from "zod";
import {z} from 'zod';

class UserController{

    /**
     * This controller is used to create a new User
     * @param req 
     * @param res 
     * @returns
     */

    async createUser(req:Request,res:Response){
        try {
            const data = req.body;
            // const isvalidUser = userSchema.parse(data);
            // if(isvalidUser){
            //    res.status(400).json({msg:"please enter valid data"});
            //    return;
            // }
            const result = await UserService.createUserBLL(data);
            if(result.status==400){
                res.status(400).json({msg:result.msg});
                return
            }
            res.status(201).json({msg:result.msg});
        } catch (error) {
            // console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }

    /**
     * This controller is used to login a user
     * @param req 
     * @param res 
     * @returns jwt token and message
     */

    async Login(req:Request,res:Response){
            try {
                const data = req.body;
                // const isvalidUser = loginSchema.parse(data);
                // if(isvalidUser){
                //     res.status(400).json({msg:"please enter valid data"});
                //     return;
                // }
               const result = await UserService.loginBLL(data);
                if(result.status==404){
                    res.status(404).json({msg:result.msg});
                    return;
                }
                res.status(200).cookie('token',result.token,{httpOnly:true,secure:true}).json({msg:result.msg});
            } catch (error) {
                
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
            const result:any = await UserService.getAccountsBLL(parseInt(id));
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

    async verifyUser(req:Request,res:Response){
        try {
            const data = req.body;
            const result:any = await UserService.verifyUserBLL(data);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }

}

export default new UserController();