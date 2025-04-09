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
               throw new Error("Please provide all the fields");
            }

            const isValiddata = userSchema.safeParse(data);

            
            if(!isValiddata.success){
              throw new GlobalErrorHandler(isValiddata.error.issues[0].message, 400);
            }

            const dalResult = await UserDAL.createUserDAl({ name, email, password, phone, role: role || "user" });
            if(dalResult?.msg == false) {
                throw new Error("Error while Creating the Account")
            }
            return { msg: "User created successfully", status: 201 };

        
    }


    /**
     * This method is used to login a user
     * @param data This is the data that is used to login a user
     * @returns 
     */


    static async loginBLL(data: LoginType) {
        try {

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

            if(dalResult?.status == 400) {
               throw new Error(dalResult.msg);
            }
            else if(dalResult?.status == 200) {
                return { msg: "Login successfull", role: dalResult.role, token: dalResult.token, status: 200 };
            }
            else{
                throw new GlobalErrorHandler("Invalid password",404);
            }
            
        } catch (error:any) {
           throw new GlobalErrorHandler(error.message,404)
        }
    }

    static async getAccountsBLL(id: number) {
        try {

            const users = await userRepository.find({ where: { id: id }, relations: ['accounts'] });

            return ({ msg: users, status: 200 });

        } catch (error) {

            return { message: "Internal server error", status: 500 };

        }
    }

    /**
     * This method is used to verify a user
     * @param data 
     * @returns 
     */


    static async verifyUserBLL(data: VerifyType) {
        try {

            const { email, otp } = data;

            if(!email || !otp) {
                throw new GlobalErrorHandler("Please provide all the fields", 400);
            }

            const dalResult = await UserDAL.verifyOtpDAL({ email, otp });

            if(dalResult?.status == 400) {
                return { msg: dalResult.msg, status: 400 };
            }
            else if(dalResult?.status == 404){
                return { msg: dalResult.msg, status: 404 };
            } 
            return { msg: dalResult?.msg, status: 200 };

        } catch (error:any) {

            throw new GlobalErrorHandler(error,400);

        }
    }

    /**
     * This method is used to get the user by id
     * @param id This is the id of the user
     * @returns 
     */


    static async getUsers(id: number) {
        try {

            const dalResult = await UserDAL.getUsersDAL(id);

            if (typeof dalResult === 'object' && dalResult?.status == 404) {
                return { msg: dalResult.msg, status: 404 };
            }
           
                if (typeof dalResult === 'string') {
                    return { msg: dalResult, status: 200 };
                }
                return { msg: dalResult.msg, status: 200 };


        } catch (error) {

            return { msg: "Internal server error", status: 500 };

        }
    }

    /**
     * This method is used to update the user details
     * @param id This is the id of the user
     * @param data user data to be updated
     * @returns 
     */


    static async updateUser(id: number, data: UserType) {

        try {

            const {name, email, phone, address} = data;

            if(!name || !email || !phone){
                return { msg: "Please provide all the fields", status: 400 };
            }

            const isValiddata = updateUserSchema.safeParse(data);


            if(!isValiddata.success){
                return { msg: isValiddata.error.issues[0].message, status: 400 };
            }

           const dalResult = await UserDAL.updateUserDAL(id, data);

           if(dalResult?.status == 404) {
                return { msg: dalResult.msg, status: 404 };
           }

            return { msg: dalResult.msg, status: 200 };

        } catch (error) {

            return { msg: "Internal server error", status: 500 };

        }
    }

    /**
     * This method is used to update the user password
     * @param id This is the id of the user
     * @param data password data to be updated
     * @returns 
     */

    static async updatePassword(id: any, data: {oldPassword: string, newPassword: string }) {
        try {


            const { oldPassword, newPassword } = data;
            if(!oldPassword || !newPassword) {
                return { msg: "Please provide all the fields", status: 400 };
            }

            const isValidPassword = updateUserSchema.safeParse(data);
            if(!isValidPassword.success){
                return { msg: isValidPassword.error.issues[0].message, status: 400 };
            }


            const dalResult = await UserDAL.updatePasswordDAL(id, data);



            if(dalResult?.status == 404) {
                return { msg: dalResult.msg, status: 404 };
            }
            if(dalResult?.status == 400) {
                return { msg: dalResult.msg, status: 400 };
            }

            return { msg: dalResult.msg, status: dalResult.status };

        } catch (error) {

            console.log(error);

            return { msg: "Internal server error", status: 500 };

        }
    }


    static async sendforgetPasswordOtp(email:string,otp:string){
        try {


            const dalResult = await UserDAL.sendforgetPasswordOtpDAL(email,otp);

            if(dalResult?.status == 404) {
                return { msg: dalResult.msg, status: 404 };
            }

        
            return { msg: dalResult?.msg, status: 200 };

        } catch (error) {
            console.log(error);
            return { msg: "Internal server error", status: 500 };
        }
    }

    static async verifyForgetPasswordOtp(email:string,otp:string,password:string){
        try {

            const dalResult = await UserDAL.verifyForgetPasswordOtpDAL(email, otp, password);

            if(dalResult?.status == 404) {
                return { msg: dalResult.msg, status: 404 };
            }
            
            return { msg: dalResult.msg, status: 200 };
            
        } catch (error:Error|any) {
           throw new Error(error.message);
        }
    }

    static async resendOtp(email:string){
        try {

            const dalResult = await UserDAL.generateOtpDAL(email);

            return {msg:dalResult.msg,status:200};

        } catch (error:any) {
            // console.log(error);
           throw new GlobalErrorHandler(error,404)
        }
    }



}