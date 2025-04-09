
import { BillsDAL } from "../dal/bills.dal";
import { billSchema } from "../types/schema/bill.schema";
import { billPaymentSchema, BillsData, PayBillData } from "../types/interfaces/billsTypes";



export class BillsService {

    

    /**
     * This method is used to create a new bill
     * @param data 
     * @returns 
     */
    static async createBill(data: BillsData) {
        try {

            const { billName, amount, dueDate, accountId, frequency } = data;

            if (!billName || !amount || !accountId || !frequency) {
                return { msg: "All fields are required", status: 400 };
            }



            if(!billSchema.safeParse(data)){
                return { msg: "Invalid data", status: 400 };
            }

            const dalResult = await BillsDAL.createBillDAL(data);
            
            return { msg: dalResult.msg, status: dalResult.status };
          
        } catch (error) {
            console.log(error);
        }
    }

    static async processRecurringBills() {
        try {

            const dalResult = await BillsDAL.processBillDAL();
            return { msg: dalResult.msg, status: dalResult.status };            
        } catch (error) {
            console.log(error);
            return { msg: "Internal server error", status: 500 };

        }
    }

    /**
     * This method is used to calculate the next payment date based on the frequency
     * @param currentDate 
     * @param frequency 
     * @returns 
     */


    /**
     * This method is used to get the bill by user id
     * @param data 
     * @returns 
     */

    static async getBill(id: number) {
            try {

                const dalResult = await BillsDAL.getBillByIdDAL(id);

                return { msg: dalResult.msg, status: dalResult.status };

            } catch (error) {
                
            }
    }

    
    /**
     * 
     * @param id 
     * @returns 
     */

    static async getBillById(id: number) {
        try {
            const dalResult  = await BillsDAL.getBillByIdDAL(id);
            return { msg: dalResult.msg, status: dalResult.status };
        } catch (error) {
            
        }
    }

    /**
     * This method is used to pay the bill
     * @param data 
     * @returns 
     */

    static async payBills(data: PayBillData) {
        try {
            let payBillData:PayBillData = data;
            const isValiddata = billPaymentSchema.safeParse(payBillData);
            if(!isValiddata.success){
                return { msg: "Invalid data", status: 400 };
            }
            const dalResult = await BillsDAL.payBillDAL(data);
            return { msg: dalResult.msg, status: dalResult.status };
        } catch (error) {
            console.log(error);
            return { msg: "Internal server error", status: 500 };
        }
    }


    /**
     * This method is used to get the bill history of the user
     * @param data 
     * @returns 
     */

    static async getBillshistoy(data:any,page:number) {
        try {

            // console.log(data);
            let limit = 5;
            const id:number = data.user.id
            // const page = 
            const dalResult = await BillsDAL.getBillHistoryDAL(id,page,limit);
            return { msg: dalResult.msg, status: dalResult.status };
           
        } catch (error) {

        }
    }


    /**
     * This method is used to update the bill
     * @param id 
     * @param data 
     * @returns 
     */

    static async updateBillBLL(id: number, data: BillsData) {
        try {
            const dalResult = await BillsDAL.updateBillDAL(id, data);
            return { msg: dalResult.msg, status: dalResult.status };
           
        } catch (error) {
            console.log(error);
            return { msg: "Internal server error", status: 500 };
        }
    }


    /**
     * This method is used to delete the bill
     * @param id 
     * @returns 
     */

    static async deleteBillBLL(id: number) {
        try {
            const dalResult = await BillsDAL.deleteBillDAL(id);
            return { msg: dalResult.msg, status: dalResult.status };
        } catch (error) {
            console.log(error);
            return { msg: "Internal server error", status: 500 };
        }
    }

}