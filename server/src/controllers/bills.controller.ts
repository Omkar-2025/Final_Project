import cron from "node-cron";
import { BillsService } from "../services/bills.service";
import { Request, Response } from "express";


cron.schedule("* * * * * *", async () => {
    console.log("Processing recurring bills ");
    await BillsService.processRecurringBills();
});

class billsController{

    /**
     * This controller is used to create a new bill
     * @param req 
     * @param res 
     * @returns 
     */

    async createBill(req:Request,res:Response){
        try {
            const data = req.body;
            data.amount = parseInt(data.amount);
            data.frequency  = data.frequency.name;
            const result:any = await BillsService.createBill(data);
            if(result){
                res.status(result.status).json({msg:result.msg});
            }
            else{
                res.status(404).json({msg:"No Dose not  create bill"});
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }


    /**
     * This controller is used to get the All bills of the user
     * @param req 
     * @param res 
     */

    async getBill(req:Request,res:Response){
        try {
           // const id = req.params.id;
         
            const id:number = req.body.user.id;
            const result = await BillsService.getBill(id);
            // console.log(result);
            
            if(result){
                res.status(result.status).json(result.msg);
                return ;
            }
            else{
                res.status(404).json({msg:"No bills found"});
                return ;
            }
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
            return ;
        }
    }


    /**
     * This controller is used to get the All bills of the user
     * @param req 
     * @param res 
     */

    async ProcessBills(req:Request,res:Response){
        try {
            const result = await BillsService.processRecurringBills();
            res.status(result.status).json(result.msg);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }


    /**
     * This controller is used to get the bill by id
     * @param req 
     * @param res 
     */

    async getBillById(req:Request,res:Response){
        try {
            const id = req.params.id;
            const result = await BillsService.getBillById(parseInt(id));
            if(result){
                res.status(result.status).json(result.msg);
            }
            else{
                res.status(404).json({msg:"Bill not found"});
            }
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }


    /**
     * This controller is used to pay the bill
     * @param req 
     * @param res 
     */

    async payBills(req:Request,res:Response){
        try {
            const data = req.body;
            // console.log(data);
            data.amount = parseInt(data.amount);
            data.billId = parseInt(data.billId);
            const result:any = await BillsService.payBills(data);
            if(result.status==404){
                res.status(404).json({msg:"Bill not found"});
            }
            else if(result.status==400){
                res.status(400).json({msg:"Insufficient balance"});
            }
            else{
            console.log("Bill paid successfully");
              res.status(200).json({msg:result.msg})
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }

    /**
     * This controller is used to get the All bills Transactions of the user
     * @param req 
     * @param res 
     */

    async getBillshistoy(req:Request,res:Response){
        try {
            const data = req.body;
            const page = req.body.page;
        
            const result:any = await BillsService.getBillshistoy(data,page);
            res.status(result.status).json(result.msg);
        } catch (error) {
            console.log(error)
             res.status(500).json({msg:"Internal server error"});
        }
    }


    /**
     * This is used to update the bill
     * @param req 
     * @param res 
     */

    async updateBill(req:Request,res:Response){
        try {
            const id = req.body.billId;
            const data = req.body;
            data.amount = parseInt(data.amount);
            data.frequency  = data.frequency.name;
            const result:any = await BillsService.updateBillBLL(parseInt(id),data);
            res.status(result.status).json(result.msg);
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }


    /**
     * This is used to delete the bill
     * @param req 
     * @param res 
     */

    async deleteBill(req:Request,res:Response){
        try {
            const id = req.body.billId;
            const result:any = await BillsService.deleteBillBLL(parseInt(id));
            res.status(result.status).json(result.msg);
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }

}

export default new billsController();