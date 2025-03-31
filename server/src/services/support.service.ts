import { AppDataSource } from "../config/db";
import { Support } from "../entitiy/support_query.entity";
import { User } from "../entitiy/User.entity";

const supportRepo = AppDataSource.getRepository(Support);
const userRepo = AppDataSource.getRepository(User);

class supportService{

    async createSupport(data:any){
        try {
            const {subject,description}=data;
            const id = data.user.id;
            const support = new Support(subject,description,id);
            const user =await userRepo.findOneBy({id:id});
            if(!user){
                return {msg:"User not found",status:404};
            }
            support.user=user;
            await supportRepo.save(support);
            return {msg:"Support created",status:201};
        } catch (error) {
            console.log(error);
            return {msg:"Internal server error",status:500};
        }
    }


    async getAllSupport(data:any){
        try {
            const user= await userRepo.findOne({where:{id:data.user.id}});
            console.log(user);
            if(!user){
                return {msg:"User not found",status:404};
            }
            const support = await supportRepo.find({where:{user:user},});
            return {msg:support,status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }


    async getSupportById(id:number){
        try {
            const support = await supportRepo.findOne({where:{id:id}});
            if(!support){
                return {msg:"Support not found",status:404};
            }
            return {msg:support,status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }


    async deleteSupport(id:number){
        try {
            const support = await supportRepo.findOne({where:{id:id}});
            if(!support){
                return {msg:"Support not found",status:404};
            }
            await supportRepo.remove(support);
            return {msg:"Support deleted",status:200};
        } catch (error) {
            return {msg:"Internal server error",status:500};
        }
    }



}

export default new supportService();