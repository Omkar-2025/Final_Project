
import { BillsDAL } from "../dal/bills.dal";
import { billSchema } from "../types/schema/bill.schema";
import { billPaymentSchema, BillsData, PayBillData } from "../types/interfaces/billsTypes";
import { GlobalErrorHandler } from "../types/globalErrorHandler";



export class BillsService {

    

    /**
     * This method is used to create a new bill
     * @param data 
     * @returns 
     */
    static async createBill(data: BillsData) {


            const { billName, amount, dueDate, accountId, frequency } = data;

            if (!billName || !amount || !accountId || !frequency) {
                throw new GlobalErrorHandler( "All fields are required",  400 );
            }



            if(!billSchema.safeParse(data)){
                throw new GlobalErrorHandler("Invalid data", 400 );
            }

            const dalResult = await BillsDAL.createBillDAL(data);
            
            return { msg: dalResult.msg, status: dalResult.status };
          
       
    }

    static async processRecurringBills() {
 

            const dalResult = await BillsDAL.processBillDAL();
            return { msg: dalResult.msg, status: dalResult.status };            
       
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


                const dalResult = await BillsDAL.getBillByIdDAL(id);

                return { msg: dalResult.msg, status: dalResult.status };

    }

    
    /**
     * 
     * @param id 
     * @returns 
     */

    static async getBillById(id: number) {
  
            const dalResult  = await BillsDAL.getBillByIdDAL(id);
            return { msg: dalResult.msg, status: dalResult.status };
       
    }

    /**
     * This method is used to pay the bill
     * @param data 
     * @returns 
     */

    static async payBills(data: PayBillData) {

            let payBillData:PayBillData = data;
            const isValiddata = billPaymentSchema.safeParse(payBillData);
            if(!isValiddata.success){
                throw new GlobalErrorHandler("Data is not valid",403);
            }
            const dalResult = await BillsDAL.payBillDAL(data);
            return { msg: dalResult.msg, status: dalResult.status };
        
    }


    /**
     * This method is used to get the bill history of the user
     * @param data 
     * @returns 
     */

    static async getBillshistoy(data:any,page:number) {


            // console.log(data);
            let limit = 5;
            const id:number = data.user.id
            // const page = 
            const dalResult = await BillsDAL.getBillHistoryDAL(id,page,limit);
            return dalResult;
           
       
    }


    /**
     * This method is used to update the bill
     * @param id 
     * @param data 
     * @returns 
     */

    static async updateBillBLL(id: number, data: BillsData) {
     
            const dalResult = await BillsDAL.updateBillDAL(id, data);
            return { msg: dalResult.msg, status: dalResult.status };
           
       
    }


    /**
     * This method is used to delete the bill
     * @param id 
     * @returns 
     */

    static async deleteBillBLL(id: number) {
    
            const dalResult = await BillsDAL.deleteBillDAL(id);
            return { msg: dalResult.msg, status: dalResult.status };
       
    }

}