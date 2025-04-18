import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import 'dotenv/config';


/**
 * This middleware is used to verify the jwt token
 * @param req 
 * @param res 
 * @param next 
 */

export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {

    try {
        // console.log(process.env.JWT_SECRET);

        const token = req.cookies?.token;
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.body.user = decoded;
        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({ message: "Unauthorized" });
    }

}