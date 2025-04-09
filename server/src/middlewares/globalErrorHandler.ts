import { NextFunction , Request,Response } from "express";


/**
 * This middleware is used to handle the global error
 * @param err 
 * @param req 
 * @param res 
 * @param next 
 */


export const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{

    res.status(err.statusCode || 500).json({
        status:err.status || "error",
        message:err.message || "Internal server error",
    });


}