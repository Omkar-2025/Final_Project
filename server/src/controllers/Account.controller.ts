import { Request, Response } from 'express';
import AccountService from '../services/Account.service';
import { UserResponseType } from '../types/interfaces/userType';


class UserController{


    /**
     * This method is used to create the Bank account of the User
     * @param req 
     * @param res 
     * @returns 
     */

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

    /**
     * This method is used to get the bank account of the user
     * @param req 
     * @param res 
     * @returns 
     */


    async getAccount(req:Request,res:Response){
        try {
            const id = req.params.id;
            const result = await AccountService.getAccount(parseInt(id));
            res.status(result.status).json(result.msg);
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }

    /**
     * This method is used to create a transaction
     * @param req 
     * @param res 
     * @returns 
     */

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

    /**
     * This method is used to get the transactions of the user
     * @param req 
     * @param res 
     */

    async getTransactions(req:Request,res:Response){
        try {
            const id = req.params.id;
            const result = await AccountService.getTranscations(parseInt(id));
            res.status(result.status).json(result.msg);
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }

    /**
     * This method is used to get the transactions of the user by id
     * @param req 
     * @param res 
     */


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



    /**
     * This method is used to withdraw the amount from the account
     * @param req 
     * @param res 
     * @returns 
     */


    async withdraw(req:Request,res:Response){
        try {
            const data = req.body;
            const result = await AccountService.Withdraw(data);
            res.status(result.status).json({msg:result.msg});
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }


    /**
     * This method is used to deposit the amount in the account
     * @param req 
     * @param res 
     */


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

    /**
     * This method is used to get all the accounts of the user
     * @param req 
     * @param res 
     */

    async getAllAccounts(req:Request,res:Response){
        try {
            // const id = req.body.user.id;
            const result:UserResponseType = await AccountService.getAllAccounts();
            res.status(result.status).json(result.msg);
        } catch (error) {
            res.status(500).json({msg:"Internal server error"});
        }
    }    


    /**
     * This method is used to get all the bank accounts of the user
     * @param req 
     * @param res 
     */


    async getMonthlyExpenses(req:Request,res:Response){
        try {
            const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
            const currentYear = new Date().getFullYear();
            const id = parseInt(req.params.id);
            const result = await AccountService.getMonthlyTransactionsBLL({currentMonth,currentYear,id});

            res.status(result.status).json(result.msg);

        } catch (error) {
            console.log(error);
            res.status(500).json({msg:"Internal server error"});   
        }
    }

   async getMonthlyTranscations(req:Request,res:Response){
    try {
        
        const id = parseInt(req.params.id);
        const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
        const currentYear = new Date().getFullYear();
        const result = await AccountService.getMonthlyTransactionsBLL({currentMonth,currentYear,id});
        res.status(result.status).json(result.msg);

    } catch (error) {
        console.log(error);
         res.status(500).json({msg:"Internal server error"});
    }
   } 

   async getMonthlyAllExpenses(req:Request,res:Response){
    try {
        // const id = parseInt(req.params.id);
        const id = parseInt(req.body.id);
        // const currentMonth = new Date().getMonth() + 1; // Months are 0-indexed
        const currentYear = new Date().getFullYear();
        const currentDate = new Date().getDate(); // Assuming currentDate refers to the day of the month
        const result = await AccountService.getAllMonthlyExpenses({currentDate, currentYear, id});
        res.status(result.status).json(result.msg);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error"});
    }
   }



     async getExpensePdf(req:Request,res:Response){
    try {
    
        // const pdf = fs.readFileSync('output.pdf');
        // if(!pdf) {
        //      res.status(404).json({msg:"Pdf not found"});
        //      return;
        // }
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename=expense.pdf');
        const pdf = 'C:/Users/OmkarBagalINDev/Desktop/Final_Project/server\output.pdf'
        res.download(pdf);

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error"});
    }
   }

   async deactiveAccount(req:Request,res:Response){
    try {
        const id = req.body.id;
        const result = await AccountService.deactiveAccountBLL(parseInt(id));
        res.status(result.status).json({msg:result.msg});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error"});
    }
   }

   async activateAccount(req:Request,res:Response){
    try {
        const id = req.body.id;
        const result = await AccountService.activateAccountBLL(parseInt(id));
        res.status(result.status).json({msg:result.msg});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"Internal server error"});
    }
   }


}

export default new  UserController();