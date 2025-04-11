import { adminDAL } from "../dal/admin.dal";
import { ResolveQueryType } from "../types/schema/admin.schema";



export class AdminService{


    static async getAllUsersBLL(){
     
           const dalResult = await adminDAL.getAllUsersDAL();
           return {msg:dalResult.msg,status:dalResult.status};
      
    }

    static async verifyAccountBLL(id:number){
       
            const dalResult = await adminDAL.verifyAccountDAL(id);
            return {msg:dalResult.msg,status:dalResult.status};
          
    } 
    
   static async getAllAccountsBLL(){
       
            const dalResult = await adminDAL.getALLAccountsDAL();
            return {msg:dalResult.msg,status:dalResult.status};
       
    }

   static async getAllQueryBLL(){
      
            const dalResult = await adminDAL.getAllQueryDAL();
            return {msg:dalResult.msg,status:dalResult.status};
       
    }



    static  async resolveQueryBLL(data:ResolveQueryType){
        
            const dalResult = await adminDAL.resolveQueryDAL(data);
            return {msg:dalResult.msg,status:dalResult.status};
       
    }


    static async getAccountsBLL(id: number) {
        
            const dalResult = await adminDAL.getAllAccountsDAL(id);
            return { msg: dalResult.msg, status: dalResult.status };

    }

    static async getAllSupportBLL(id:number){
         
                const dalResult = await adminDAL.getAllSupportDAL(id);
                return {msg:dalResult.msg,status:dalResult.status};
           
        }

     static async getSupportBLL(){
       
           const dalResult = await adminDAL.getSupportDAL();
           return {msg:dalResult.msg,status:dalResult.status};
       
    }

    static async getAllExpenseBLL(){

            const dalResult = await adminDAL.getAllExpenseDAL();
            return {msg:dalResult.msg,status:dalResult.status};

    }
    
}

