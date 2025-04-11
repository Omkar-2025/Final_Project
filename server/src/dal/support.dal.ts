import { AppDataSource } from "../config/db";
import { Support } from "../entitiy/support_query.entity";
import { User } from "../entitiy/user.entity";
import { GlobalErrorHandler } from "../types/globalErrorHandler";
import { SupportType } from "../types/interfaces/supportTypes";

const supportRepo = AppDataSource.getRepository(Support);
const userRepo = AppDataSource.getRepository(User);


export class SupportDAL{

    static async crateSupportDAL(data:SupportType){

        const {subject,description}=data;

        const id:number = data.user.id;

        const user:User|null = await userRepo.findOneBy({id:id});
        if(!user){
           throw new GlobalErrorHandler("User not found",404);
        }

        const support = new Support(subject,description,user);

        support.user=user;

        await supportRepo.save(support);

        return {msg:"Support created",status:201};

    }

    static async getAllSupportDAL(id:number){

        const user:User|null = await userRepo.findOneBy({id:id});

        if(!user){
           throw new GlobalErrorHandler("User not found",404);
        }

        const support = await supportRepo.find({where:{user:user}});

        return {msg:support,status:200};

    }


    static async getSupportByIdDAL(id:number){
        const support = await supportRepo.findOne({where:{id:id}});

            if(!support){
               throw new GlobalErrorHandler("Support not found",404);
            }

            return {msg:support,status:200};
    }

    static async deleteSupportByIdDAL(id:number){
        const support = await supportRepo.findOne({where:{id:id}});
            if(!support){
               throw new GlobalErrorHandler("Support not found",404);
            }
            await supportRepo.remove(support);
            return {msg:"Support deleted",status:200};
    }


}