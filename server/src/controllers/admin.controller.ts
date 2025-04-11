import { NextFunction, Request, Response } from "express";

import { AdminService } from "../services/admin.service";

export class AdminController{

    /**
     * This controller is used to login the admin
     * @param req 
     * @param res 
     * @returns 
     */

    static async login(req:Request,res:Response){
       
    }

    /**
     * This controller is used to verify the account of the user
     * @param req 
     * @param res 
     */

    static async verifyAccount(req:Request,res:Response,next:NextFunction){
        try {
            const id = parseInt(req.params.id);
            const result = await AdminService.verifyAccountBLL(id);
            if (result) {
                res.status(200).json({msg:result.msg});
            } else {
                res.status(500).json({msg: "Unexpected error occurred"});
            }
        } catch (error) {
           next(error)
        }
    }

    /**
     * This controller is used to Resolve the Query
     * @param req 
     * @param res 
     */

    static async resolveSupport(req:Request,res:Response,next:NextFunction){
        try {
            // const id = parseInt(req.params.id);
            const data = req.body;
            data.queryId = parseInt(req.params.id);
            data.id = req.body.user.id;
            const result  = await AdminService.resolveQueryBLL(data);
            
                res.status(200).json({msg:result.msg});
           
            // res.status(200).json({msg:result.msg});
        } catch (error) {
            next(error)
        }
    }

    /**
     * This controller is used to get the All queries of the user
     * @param req 
     * @param res 
     */

    static async getAllSupport(req:Request,res:Response,next:NextFunction){
        try {
            const result = await AdminService.getSupportBLL();
            res.status(200).json({msg:result.msg});
        } catch (error) {
           next(error)
        }
    }

    /**
     * This controller is used to get the All Accounts of the user
     * @param req 
     * @param res 
     */
    static async getAllAccounts(req:Request,res:Response,next:NextFunction){
        try {
            const result = await AdminService.getAllAccountsBLL();
            res.status(200).json({msg:result.msg});
        } catch (error) {
           next(error)
        }
    }


    /**
     * This controller is used to get the All Users of the user
     * @param req 
     * @param res 
     */
    static async getAllUsers(req:Request,res:Response,next:NextFunction){
        try {
            const result = await AdminService.getAllUsersBLL();
            res.status(200).json({msg:result.msg});
        } catch (error) {
            next(error)
        }
    }

    /**
     * This controller is used to get the All Accounts of the user by user id
     * @param req 
     * @param res 
     */


    static async getAccountByUserId(req:Request,res:Response,next:NextFunction){
        try {
            const id = parseInt(req.params.id);
            const result = await AdminService.getAccountsBLL(id);
            res.status(200).json({msg:result.msg});
        } catch (error) {
           next(error)
        }
    }

    /**
     * This controller is used to get the All Queries of the user by user id
     * @param req 
     * @param res 
     */


    static async getQueryById(req:Request,res:Response,next:NextFunction){
        try {
            const id = parseInt(req.params.id);
            const result = await AdminService.getAllSupportBLL(id);
            res.status(200).json({msg:result.msg});
        } catch (error) {
          next(error)
        }
    }

  static async getAllExpenses(req:Request,res:Response,next:NextFunction){

    try {
        const result = await AdminService.getAllExpenseBLL();
        res.status(200).json({msg:result.msg});
    } catch (error) {
       next(error)
    }

  }
    

}