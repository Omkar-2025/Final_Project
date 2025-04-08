import { NextFunction , Request,Response } from "express";


export const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction)=>{

    res.status(err.statusCode || 500).json({
        status:err.status || "error",
        message:err.message || "Internal server error",
        stack:err.stack || "No stack trace available"
    });


}