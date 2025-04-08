import { AppDataSource } from "../config/db";
import { User } from "../entitiy/user.entity";
import 'dotenv/config';
import { LoginType, UserType, VerifyType } from "../types/interfaces/userType";
import UserDAL from "../dal/user.dal";
import { loginSchema, updateUserSchema, userSchema } from "../types/schema/user.schema";


const userRepository = AppDataSource.getRepository(User);



export class UserService {


    /**
     * This method is used to create a new user 
     * @param data This is the data that is used to create a new user
     * @returns 
     */


    static async createUserBLL(data: UserType) {
        try {

            const { name, email, password, phone, role } = data;

            if(!name || !email || !password || !phone) {
                return { msg: "Please provide all the fields", status: 400 };
            }

            const isValiddata = userSchema.safeParse(data);

            if(!isValiddata.success){
                return { msg: isValiddata.error.issues[0].message, status: 400 };
            }

            const dalResult = await UserDAL.createUserDAl({ name, email, password, phone, role: role || "user" });

            if(dalResult?.status == 400) {
                return { msg: "User already exist", status: 400 };
            }
            
            return { msg: "User created successfully", status: 201 };

        } catch (error) {

            console.log(error);

            return ({ message: "Error creating user", status: 500 });
        }
    }


    /**
     * This method is used to login a user
     * @param data This is the data that is used to login a user
     * @returns 
     */


    static async loginBLL(data: LoginType) {
        try {

            const { email, password } = data;

            if(!email || !password) {
                return { msg: "Please provide all the fields", status: 400 };
            }

            const isvalidUser = loginSchema.safeParse(data);

            if(!isvalidUser.success){
                return { msg: isvalidUser.error.issues[0].message, status: 400 };
            }


       
            const dalResult = await UserDAL.loginDAL({ email, password });

            if(dalResult?.status == 400) {
                return { msg: "Invalid password", status: 400 };
            }
            else if(dalResult?.status == 200) {
                return { msg: "Login successfull", role: dalResult.role, token: dalResult.token, status: 200 };
            }

            return ({ message: "User not found", status: 404 });
        } catch (error) {

            console.log(error)

            return ({ msg: "Internal server error", status: 500 });

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
                return { msg: "Please provide all the fields", status: 400 };
            }



            const dalResult = await UserDAL.verifyOtpDAL({ email, otp });

            if(dalResult?.status == 400) {
                return { msg: dalResult.msg, status: 400 };
            }
            else if(dalResult?.status == 404){
                return { msg: dalResult.msg, status: 404 };
            } 
            return { msg: dalResult?.msg, status: 404 };

        } catch (error) {

            return { msg: "Internal server error", status: 500 };

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

            if(dalResult?.status == 404) {
                return { msg: dalResult.msg, status: 404 };
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


    static async sendforgetPasswordOtp(email:string){
        try {


            const dalResult = await UserDAL.sendforgetPasswordOtpDAL(email);

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
            
        } catch (error) {
            console.log(error);
            return { msg: "Internal server error", status: 500 };
            
        }

    }



}