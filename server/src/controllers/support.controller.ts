import supportService from "../services/support.service";
import { NextFunction, Request,Response } from "express";
import { GlobalErrorHandler } from "../types/globalErrorHandler";

class supportController{

    /**
     * This controller is used to create a new support query
     * @param req 
     * @param res 
     * @returns 
     */

    async createSupport(req:Request,res:Response,next:NextFunction){
        try {
            const data = req.body;
            const result:any = await supportService.createSupport(data);

                res.status(200).json({msg:result.msg});
        } catch (error) {
            console.log(error);
           next(error)
        }
    }


    /**
     * This controller is used to get the All queries of the user
     * @param req 
     * @param res 
     */

    async getAllSupport(req:Request,res:Response,next:NextFunction){
        try {
            const id = +req.body.user.id;
            const result:any = await supportService.getAllSupport(id);
            res.status(200).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    /**
     * This controller is used to get the query by id
     * @param req 
     * @param res 
     */

    async getSupportById(req:Request,res:Response,next:NextFunction){
        try {
            const id = parseInt(req.params.id);
            const result:any = await supportService.getSupportById(id);
            res.status(200).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            next(error)
        }
    } 


    /**
     * This controller is used to Delete the query by id
     * @param req 
     * @param res 
     */
    
    async deleteSupport(req:Request,res:Response,next:NextFunction){
        try {
            const id = parseInt(req.params.id);
            const result:any = await supportService.deleteSupport(id);
            res.status(200).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

}

export default new supportController();