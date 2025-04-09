import { Response,Request,NextFunction } from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';


/**
 * This middleware is used to verify the jwt token and check if the user is admin or not
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */

export const verifyAdmin = (req:Request,res:Response,next:NextFunction)=>{
    try {
            const token = req.cookies?.token;
            if(!token)  res.status(401).json({message:"Unauthorized"});
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            req.body.user = decoded;
            if(req.body.user.role !== "Admin"){
                 res.status(403).json({message:"Forbidden"});
                 return
            }
            next();
        } catch (error) {
            console.log(error);
             res.status(401).json({message:"Unauthorized"});    
        }
}
