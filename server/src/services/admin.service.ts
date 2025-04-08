import { adminDAL } from "../dal/admin.dal";
import { ResolveQueryType } from "../types/schema/admin.schema";



export class AdminService{


    static async getAllUsersBLL(){
        try {
           const dalResult = await adminDAL.getAllUsersDAL();
           return {msg:dalResult.msg,status:dalResult.status};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

    static async verifyAccountBLL(id:number){
        try {
            const dalResult = await adminDAL.verifyAccountDAL(id);
            return {msg:dalResult.msg,status:dalResult.status};
        } catch (error) {
            console.log(error);
            return {msg:"Internal server error",status:500};
        }   
    } 
    
   static async getAllAccountsBLL(){
        try {
            const dalResult = await adminDAL.getALLAccountsDAL();
            return {msg:dalResult.msg,status:dalResult.status};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }

   static async getAllQueryBLL(){
        try {
            const dalResult = await adminDAL.getAllQueryDAL();
            return {msg:dalResult.msg,status:dalResult.status};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }



    static  async resolveQueryBLL(data:ResolveQueryType){
        try{
            const dalResult = await adminDAL.resolveQueryDAL(data);
            return {msg:dalResult.msg,status:dalResult.status};
        }
        catch(error){
            console.log(error);
            return {msg:"Internal server error",status:500};
        }
    }


    static async getAccountsBLL(id: number) {
        try {
            // Fetch the user by ID
            const dalResult = await adminDAL.getAllAccountsDAL(id);
            return { msg: dalResult.msg, status: dalResult.status };
        } catch (error) {
            console.log(error);
            return { msg: "Internal server error", status: 500 };
        }
    }

    static async getAllSupportBLL(id:number){
            try {
                const dalResult = await adminDAL.getAllSupportDAL(id);
                return {msg:dalResult.msg,status:dalResult.status};
            } catch (error) {
                return {msg:"Internal server error",status:500};
            }
        }

     static async getSupportBLL(){
        try {
           const dalResult = await adminDAL.getSupportDAL();
           return {msg:dalResult.msg,status:dalResult.status};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }   
}

