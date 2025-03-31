import supportService from "../services/support.service";
import { Request,Response } from "express";

class supportController{

    /**
     * This controller is used to create a new support query
     * @param req 
     * @param res 
     * @returns 
     */

    async createSupport(req:Request,res:Response){
        try {
            const data = req.body;
            const result:any = await supportService.createSupport(data);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }


    /**
     * This controller is used to get the All queries of the user
     * @param req 
     * @param res 
     */

    async getAllSupport(req:Request,res:Response){
        try {
            const data = req.body;
            const result:any = await supportService.getAllSupport(data);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }


    /**
     * This controller is used to get the query by id
     * @param req 
     * @param res 
     */

    async getSupportById(req:Request,res:Response){
        try {
            const id = parseInt(req.params.id);
            const result:any = await supportService.getSupportById(id);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    } 


    /**
     * This controller is used to Delete the query by id
     * @param req 
     * @param res 
     */
    
    async deleteSupport(req:Request,res:Response){
        try {
            const id = parseInt(req.params.id);
            const result:any = await supportService.deleteSupport(id);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }

}

export default new supportController();