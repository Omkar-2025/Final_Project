import { AppDataSource } from "../config/db";
import { Bills } from "../entitiy/bills.entity";
import { Account } from "../entitiy/account.entity";
import { LessThanOrEqual, Like } from "typeorm";
import { User } from "../entitiy/user.entity";
import { mailerSender } from "../utils/mailerSender";
import billPaymentTemplate from "../utils/billPaymentTemplate";
import { Transaction } from "../entitiy/transaction.entity";
import { BillsData } from "../types/interfaces/billsTypes";


const billsRepository = AppDataSource.getRepository(Bills);
const accountRepository = AppDataSource.getRepository(Account);
const userRepository = AppDataSource.getRepository(User);
const transactionRepository = AppDataSource.getRepository(Transaction);


export class BillsDAL {


    static async createBillDAL(data:BillsData) {
        let { billName, amount, dueDate, accountId, frequency } = data;
        
       
        const account = await accountRepository.findOne({ where: { id: accountId }, lock: { mode: 'dirty_read' } });

        if (!account) {
            return { msg: "Account not found", status: 404 };
        }

        if (!data.user) {
            return { msg: "User data is missing", status: 400 };
        }
        const user = await userRepository.findOne({ where: { id: data.user.id } });

        if (!user) {
            return { msg: "User not found", status: 404 };
        }


        const date = new Date();

        const nextPaymentDate = this.calculateNextPaymentDate(date, frequency);

        

        const bill = billsRepository.create({
            billName,
            amount,
            dueDate,
            account,
            frequency,
            nextPaymentDate,
        });

        bill.user = user
        bill.account = account;

        await billsRepository.save(bill);
        await userRepository.save(user);
        await accountRepository.save(account);
        return { msg: "Bill created successfully", status: 201 };
    }


    static async processBillDAL() {
        const now = new Date();
        const bills = await billsRepository.find({
            where: { nextPaymentDate: LessThanOrEqual(now), isActive: true },
            relations: ["account"],
        });

        if (bills.length === 0) {
            console.log("No bills to process");
            return { msg: "No bills to process", status: 200 };
        }

        for (const bill of bills) {
            const account = bill.account;
            if (account.balance >= bill.amount) {
                account.balance -= bill.amount;

                // Update bill status and next payment date
                bill.status = "Paid";
                bill.nextPaymentDate = this.calculateNextPaymentDate(bill.nextPaymentDate!, bill.frequency!);

                await accountRepository.save(account);
                await billsRepository.save(bill);
                return { msg: "Bill process successfully", status: 201 };
            } else {
                console.log(`Insufficient balance for bill ID ${bill.id}`);
                return { msg: "Insufficient balance", status: 400 };
            }
        }

        return { msg: "Bills processed successfully", status: 201 };
    }



    static calculateNextPaymentDate(currentDate: Date, frequency: string): Date {

        const nextDate = new Date(currentDate);

        switch (frequency) {
            case "daily":
                nextDate.setDate(nextDate.getDate() + 1);
                break;
            case "weekly":
                nextDate.setDate(nextDate.getDate() + 7);
                break;
            case "monthly":
                nextDate.setMonth(nextDate.getMonth() + 1);
                break;
        }

        return nextDate;
    }

    static async getAllBillsDAL(id: number) {

        const user = await userRepository.findOne({ where: { id: id } });

        if (!user) {
            return { msg: "User not found", status: 404 };
        }

        const bill = await billsRepository.find({ where: { user: user }, relations: ["account"] });

        

        if (bill) {
            return { msg: bill, status: 200 };
        }

        return { msg: "Bill not found", status: 404 };
    }


    static async getBillByIdDAL(id: number) {


        const user = await userRepository.findOne({ where: { id: id } });

        if (!user) {
            return { msg: "User not found", status: 404 };
        }

        const bill = await billsRepository.find({ where: { user: user }, relations: ["account"] });


        if (bill) {
            return { msg: bill, status: 200 };
        }
        return { msg: "Bill not found", status: 404 };
    }


    static async payBillDAL(data: any) {

        let { billId, accountId } = data;

       

        const bill = await billsRepository.findOne({ where: { id: billId }, relations: ['account'] });

        if (!bill) {
            return { msg: "Bill not found", status: 404 };
        }

        const account = await accountRepository.findOne({ where: { id: accountId } });

        if (!account) {
              return { msg: "Account not found", status: 404 };
        }

        if (account.balance >= bill.amount) {
            account.balance -= bill.amount;
            bill.status = "Paid";
            bill.nextPaymentDate = this.calculateNextPaymentDate(bill.nextPaymentDate!, bill.frequency!);
            const transaction = new Transaction(bill.amount, ` Bill Payment  ${bill.billName}`, account, account);
            await accountRepository.save(account);
            const result = await billsRepository.save(bill);
            await transactionRepository.save(transaction);
            await mailerSender({ email: data.user.email, title: "Bill paid successfully", body: billPaymentTemplate(bill.billName, account.name, bill.amount, result.dueDate) });
            return { msg: "Bill paid successfully", status: 200 };
        }

        return { msg: "Insufficient balance", status: 400 };
    }

    static async getBillHistoryDAL(id: number) {

        const user = await userRepository.find({ where: { id: id } });


        if (!user) {
            return { msg: "User not found", status: 404 };
        }
        const account = await accountRepository.findOne({ where: { user: user[0] } });
        if (!account) {
            return { msg: "Account not found", status: 404 };
        }

        const transactions = await transactionRepository.find({ where: { toAccount: account, transactionType: Like("%Bill Payment%") }, order: { createdAt: "DESC" } });

        if (transactions) {
            // transactions.accountNumber = account.account_number;
            return { msg: transactions, status: 200 };
        }
        return { msg: "no post found", status: 404 };
    }

    static async updateBillDAL(id: number, data: any) {

        // console.log(data);
        

        const bill = await billsRepository.findOne({ where: { id: id } });

        // console.log(bill);
        

        if (!bill) {
            return { msg: "Bill not found", status: 404 };
        }

        bill.account = data.accountId.id;

        if (typeof data.frequency === 'object' && data.frequency.name) {
            data.frequency = data.frequency.name;
        }

        const updatedBill = await billsRepository.save({ ...bill, ...data });


        await billsRepository.save(updatedBill);

        return { msg: updatedBill, status: 200 };
    }

    static async deleteBillDAL(id: number) {

        const bill = await billsRepository.findOne({ where: { id: id } });

        if (!bill) {
            return { msg: "Bill not found", status: 404 };
        }
        await billsRepository.delete({ id: id });

        return { msg: "Bill deleted successfully", status: 200 };
    }

}

