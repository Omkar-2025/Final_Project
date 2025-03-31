import { Request, Response } from "express";

import { AdminService } from "../services/admin.service";

export class AdminController{

    static async login(req:Request,res:Response){
        try {
            const data = req.body;
            const result = await AdminService.loginAdminBLL(data);
            res.status(result.status).json({msg:result.msg,token:result.token});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }

    static async verifyAccount(req:Request,res:Response){
        try {
            const id = parseInt(req.params.id);
            const result = await AdminService.verifyAccountBLL(id);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }


    static async resolveSupport(req:Request,res:Response){
        try {
            // const id = parseInt(req.params.id);
            const data = req.body;
            data.queryId = parseInt(req.params.id);
            data.id = req.body.user.id;
            const result = await AdminService.resolveQueryBLL(data);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }

    static async getAllSupport(req:Request,res:Response){
        try {
            const result = await AdminService.getAllSupportBLL();
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }

    

}