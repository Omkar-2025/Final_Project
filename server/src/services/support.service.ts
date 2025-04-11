import { AppDataSource } from "../config/db";
import { SupportDAL } from "../dal/support.dal";
import { Support } from "../entitiy/support_query.entity";
import { User } from "../entitiy/user.entity";
import { SupportType } from "../types/interfaces/supportTypes";

const supportRepo = AppDataSource.getRepository(Support);
const userRepo = AppDataSource.getRepository(User);

class supportService{

    /**
     * This method is used to create a new support query 
     * @param data This is the data that is used to create a new support query
     * @returns 
     */

    async createSupport(data:SupportType){

            const dalResult = await SupportDAL.crateSupportDAL(data);
            return {msg:dalResult.msg,status:dalResult.status};
      
    }


    /**
     * This method is used to get all support queries of a user
     * @param data This is the data that is used to get all support queries of a user
     * @returns 
     */


    async getAllSupport(id:number){


           const dalResult = await SupportDAL.getAllSupportDAL(id);
           return {msg:dalResult.msg,status:dalResult.status};

    }


    /**
     * This method is used to get a support query by id
     * @param id This is the id of the support query
     * @returns 
     */

    async getSupportById(id:number){
       

           const dalResult = await SupportDAL.getSupportByIdDAL(id);
           return {msg:dalResult.msg,status:dalResult.status};

      
    }

    /**
     * This method is used to delete a support query by id
     * @param id This is the id of the support query
     * @returns 
     */


    async deleteSupport(id:number){
    
            const dalResult = await SupportDAL.deleteSupportByIdDAL(id);
            return {msg:dalResult.msg,status:dalResult.status};
        
    }



}

export default new supportService();