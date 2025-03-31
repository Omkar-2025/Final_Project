import { AppDataSource } from "../config/db";
import { Account } from "../entitiy/Account.entity";
import { Transaction } from "../entitiy/Transaction.entity";
import { User } from "../entitiy/User.entity";
import { mailerSender } from "../utils/mailerSender";
import accountCreationTemplate from "../utils/accountTemplate";
import transcationVerfication from "../utils/transcationVerfication";

const userRepository = AppDataSource.getRepository(User);
const accountRepository = AppDataSource.getRepository(Account);
const transactionRepository = AppDataSource.getRepository(Transaction);


export class AccountService{

    async createAccount(data:any){
        try {
            const {name,balance,account_type,id}=data;
           const accountInstance = new Account(name, balance, account_type, id);
           const user = await userRepository.findOne({where:{id:id}});
              if(!user){
                return {msg:"User not found",status:404};
            }
            const result:any = await accountRepository.insert(accountInstance); //`Account created successfully with account number ${result.generatedMaps[0].account_number}`
            console.log(result);
             await mailerSender({email:user.email,title:"Account created",body:accountCreationTemplate(result.generatedMaps[0].account_number,user.name)});
            return {msg:"Account created successfully",status:201};
        } catch (error) {
            console.log(error);
            return {msg:"Error creating account",status:500};
        }
    }

    async getAccount(id:number){
        try {
            const account = await accountRepository.find({where:{id:id},relations:['transactionsFrom','transactionsTo']});
            if(account){
                return {msg:account,status:200};
            }
            return {msg:"Account not found",status:404};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    async createTranscation(data: any) {
        try {
            let { fromAccount, toAccount, amount, transcationType } = data;
            // Fetch the Account entities for fromAccount and toAccount
            const fromAccountInstance = await accountRepository.findOne({ where: { id: fromAccount }, relations: ['user'] });
            const toAccountInstance = await accountRepository.findOne({ where: { account_number:toAccount  } });
            amount = parseInt(amount);
            if (fromAccountInstance && toAccountInstance) {
                    if (fromAccountInstance.balance >= amount) {
                    // Update balances
                    fromAccountInstance.balance -= amount;
                    toAccountInstance.balance += amount;
    
                    // Save updated accounts
                    await accountRepository.save(fromAccountInstance);
                    await accountRepository.save(toAccountInstance);
    
                    // Create and save the transaction
                    const transactionInstance = new Transaction(amount, transcationType, fromAccountInstance, toAccountInstance);
                    const result = await transactionRepository.save(transactionInstance);
                    console.log(fromAccountInstance);
                    
                    await mailerSender({email:fromAccountInstance.user.email,title:"Transaction successfull",body:transcationVerfication(result.id,amount,result.createdAt,result.transactionType)});
                    return { msg: "Transaction successful", status: 200 };
                }
                return { msg: "Insufficient balance", status: 400 };
            }
            return { msg: "Account not found", status: 404 };
        } catch (error) {
            console.log(error);
            return { msg: "Internal server error", status: 500 };
        }
    }
    async getTranscations(id:number){
        try {
            const transactions = await transactionRepository.find({
                where: [
                    { fromAccount: { id: id } }, // Transactions sent from the account
                    { toAccount: { id: id } }   // Transactions received by the id
                ],
                order:{
                    id:'DESC'
               },
                relations: ['fromAccount', 'toAccount'], // Include related accounts
            });
            return {msg:transactions,status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    async getTransactionsById(id:number){
        try {
            const result = await transactionRepository.findOne({where:{id:id},relations:['fromAccount','toAccount']});
            if(result){
                return {msg:result,status:200};
            }
            return {msg:"Transaction not found",status:404};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    async Withdraw(data:any){
        try {
            const {amount,accountId}=data;
            const account = await accountRepository.findOne({where:{id:accountId}});
            if(!account){
                return {msg:"Account not found",status:404}
            }
            const transactionInstance = new Transaction(amount, "withDraw", account, account);
            if(account){
                if(account.balance>=amount){
                    account.balance-=amount;
                    await accountRepository.save(account);
                    const result = await transactionRepository.save(transactionInstance);
                    await mailerSender({email:data.user.email,title:"Transaction successfull",body:transcationVerfication(result.id,amount,result.createdAt,result.transactionType)});
                    return {msg:"Withdraw successfull",status:200};
                }
                return {msg:"Insufficient balance",status:400};
            }
            return {msg:"Account not found",status:404};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    async Deposit(data:any){   
        try {
            let {amount,accountId}=data;
            const account = await accountRepository.findOne({where:{id:accountId}});
            if(!account){
                return {msg:"Account not found",status:404}
            }
            const transactionInstance = new Transaction(amount, "Deposit", account, account);
            if(account){
                amount=parseInt(amount);
                account.balance+=amount;
                await accountRepository.save(account);
                const result = await transactionRepository.save(transactionInstance);
                await mailerSender({email:data.user.email,title:"Transaction successfull",body:transcationVerfication(result.id,amount,result.createdAt,result.transactionType)});
                return {msg:"Deposit successfull",status:200};
              }
            return {msg:"Account not found",status:404};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }


    async getAllAccounts(){
        try {
            const accounts = await accountRepository.find({relations:['user']});
            return {msg:accounts,status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }
    
}

export default new AccountService();


// 83504A2F-62EC-4AAE-BB02-3E61D75A4439