import jwt  from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import 'dotenv/config';

export const verifyJwt = (req:Request, res:Response, next:NextFunction) => {

    try {
        const token = req.cookies?.token;
        if(!token)  res.status(401).json({message:"Unauthorized"});
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.body.user = decoded;
        next();
    } catch (error) {
        console.log(error);
         res.status(401).json({message:"Unauthorized"});    
    }

}