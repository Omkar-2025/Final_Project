import { Request, Response } from 'express';
import AccountService from '../services/Account.service';

class UserController{

    async createBankAccount(req:Request,res:Response){
        try {
            const data = req.body;
            data.id = req.body.user.id;
            const result = await AccountService.createAccount(data);
            if(result.status==404){
                res.status(404).json({msg:"User not found"});
            }
            res.status(201).json({msg:result.msg});
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }

    async getAccount(req:Request,res:Response){
        try {
            const id = req.params.id;
            const result = await AccountService.getAccount(parseInt(id));
            res.status(result.status).json(result.msg);
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }

    async createTransaction(req:Request,res:Response){
        try {
            const data = req.body;     
          //  data.fromAccount=req.body.user.id;
            const result = await AccountService.createTranscation(data);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }

    async getTransactions(req:Request,res:Response){
        try {
            const id = req.params.id;
            const result = await AccountService.getTranscations(parseInt(id));
            res.status(result.status).json(result.msg);
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }

    async getTransactionsById(req:Request,res:Response){
        try {
            const id = req.params.id;
            const result = await AccountService.getTransactionsById(parseInt(id));
            res.status(result.status).json(result.msg);
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }

    async withdraw(req:Request,res:Response){
        try {
            const data = req.body;
            const result = await AccountService.Withdraw(data);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }

    async deposit(req:Request,res:Response){
        try {  
            const data = req.body;
            const result = await AccountService.Deposit(data);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});
        }
    }

}

export default new  UserController();