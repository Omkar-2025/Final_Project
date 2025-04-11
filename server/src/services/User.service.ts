import { AppDataSource } from "../config/db";
import { User } from "../entitiy/user.entity";
import 'dotenv/config';
import { LoginType, UserType, VerifyType } from "../types/interfaces/userType";
import UserDAL from "../dal/user.dal";
import { loginSchema, updateUserSchema, userSchema } from "../types/schema/user.schema";
import { GlobalErrorHandler } from "../types/globalErrorHandler";


const userRepository = AppDataSource.getRepository(User);



export class UserService {


    /**
     * This method is used to create a new user 
     * @param data This is the data that is used to create a new user
     * @returns 
     */


    static async createUserBLL(data: UserType) {
       

            const { name, email, password, phone, role } = data;

            if(!name || !email || !password || !phone) {
               throw  new GlobalErrorHandler("Please provide all the fields",401);
            }

            const isValiddata = userSchema.safeParse(data);

            
            if(!isValiddata.success){
              throw new GlobalErrorHandler(isValiddata.error.issues[0].message, 400);
            }

            const dalResult = await UserDAL.createUserDAl({ name, email, password, phone, role: role || "user" });
            if(dalResult?.msg == false) {
                throw new GlobalErrorHandler("Error while Creating the Account",400)
            }
            return { msg: "User created successfully", status: 201 };

        
    }


    /**
     * This method is used to login a user
     * @param data This is the data that is used to login a user
     * @returns 
     */


    static async loginBLL(data: LoginType) {
     
            const { email, password } = data;

            // console.log(email, password);
            

            if(!email || !password) {
                throw new GlobalErrorHandler("Please provide all the fields", 400);
            }

            const isvalidUser = loginSchema.safeParse(data);

            if(!isvalidUser.success){
               throw new Error(isvalidUser.error.issues[0].message);
            }


       
            const dalResult = await UserDAL.loginDAL({ email, password });

            
             
                return { msg: "Login successfull", role: dalResult.role, token: dalResult.token, status: 200 };
           
            
       
    }

    static async getAccountsBLL(id: number) {


            const users = await userRepository.find({ where: { id: id }, relations: ['accounts'] });

            return ({ msg: users, status: 200 });

       
    }

    /**
     * This method is used to verify a user
     * @param data 
     * @returns 
     */


    static async verifyUserBLL(data: VerifyType) {


            const { email, otp } = data;

            if(!email || !otp) {
                throw new GlobalErrorHandler("Please provide all the fields", 400);
            }

            const dalResult = await UserDAL.verifyOtpDAL({ email, otp });

            return { msg: dalResult?.msg, status: 200 };


    }

    /**
     * This method is used to get the user by id
     * @param id This is the id of the user
     * @returns 
     */


    static async getUsers(id: number) {
    

            const dalResult = await UserDAL.getUsersDAL(id);

                return { msg: dalResult.msg, status: dalResult.status };


    }

    /**
     * This method is used to update the user details
     * @param id This is the id of the user
     * @param data user data to be updated
     * @returns 
     */


    static async updateUser(id: number, data: UserType) {


            const {name, email, phone, address} = data;

            if(!name || !email || !phone){
                throw new GlobalErrorHandler ("Please provide all the fields",  400);
            }

            const isValiddata = updateUserSchema.safeParse(data);


            if(!isValiddata.success){
                throw new GlobalErrorHandler(isValiddata.error.issues[0].message, 400);
            }

           const dalResult = await UserDAL.updateUserDAL(id, data);

            return { msg: dalResult.msg, status: dalResult.status };

    }

    /**
     * This method is used to update the user password
     * @param id This is the id of the user
     * @param data password data to be updated
     * @returns 
     */

    static async updatePassword(id: any, data: {oldPassword: string, newPassword: string }) {
 

            const { oldPassword, newPassword } = data;
            if(!oldPassword || !newPassword) {
                throw new GlobalErrorHandler("All fields are required",402)
            }

            const isValidPassword = updateUserSchema.safeParse(data);
            if(!isValidPassword.success){
                throw new GlobalErrorHandler(isValidPassword.error.issues[0].message, 400);
            }


            const dalResult = await UserDAL.updatePasswordDAL(id, data);

            return { msg: dalResult.msg, status: dalResult.status };

    }


    static async sendforgetPasswordOtp(email:string,otp:string){

            const dalResult = await UserDAL.sendforgetPasswordOtpDAL(email,otp);
        
            return { msg: dalResult?.msg, status: dalResult?.status };

    }

    static async verifyForgetPasswordOtp(email:string,otp:string,password:string){
    
            const dalResult = await UserDAL.verifyForgetPasswordOtpDAL(email, otp, password);

            return {message:dalResult.msg , status:dalResult.status}
            
    }

    static async resendOtp(email:string){

            const dalResult = await UserDAL.generateOtpDAL(email);

            return {msg:dalResult.msg,status:200};
    }



}