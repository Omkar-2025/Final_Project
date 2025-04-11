import { AppDataSource } from "../config/db";
import { User } from "../entitiy/user.entity";
import bcryptjs from 'bcryptjs';
import otpGenerator from 'otp-generator';
import { mailerSender } from "../utils/mailerSender";
import { otpTemplate } from "../utils/authTemplate";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UserType } from "../types/interfaces/userType";
import { GlobalErrorHandler } from "../types/globalErrorHandler";
import { UserDTO } from "../dto/user";
import { validate } from "class-validator";



const userRepository = AppDataSource.getRepository(User);

class UserDAL {

    static async createUserDAl({name, email, password, phone, role}:{name:string, email:string, password:string, phone:string, role:string}) {


        
        const userexist = await userRepository.find({ where: { email: email } });

            if (userexist.length > 0) {
                throw new GlobalErrorHandler("User already exist",400);
            }

            const userDTO = new UserDTO();
            Object.assign(userDTO,{name,email,password,phone,role});

            // const isValiddata = userDTO.();
            const errors = await validate(userDTO);

            // console.log(errors);
            

            if(errors.length>0){
                const errorMessages = errors.map((err) => Object.values(err.constraints || {}).join(", ")).join("; ");
                throw new GlobalErrorHandler(errorMessages ,400);
            }


            const hashpassowrd = await bcryptjs.hash(password, 10);

            let opt = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false, digits: true });

            const user = userRepository.create({ name, email, password: hashpassowrd, phone, role, isVerified: false, otp: opt });

            await mailerSender({ email: email, title: "verfication", body: otpTemplate(opt) });

            user.accounts = [];

            // console.log(user);
            

            await userRepository.save(user);

            return {msg:true};

    }


    static async loginDAL({email, password}:{email:string, password:string}) {

         const user = await userRepository.findOne({ where: { email: email } });

                    if (user) {
        
                        if (await bcryptjs.compare(password, user.password)) {
        
                            const token = jwt.sign({ id: user.id, email: email, role: user.role }, process.env.JWT_SECRET!);
                            
                            return ({ msg: "Login successfull", role: user.role, token: token, status: 200 });
                        }
                        else {

                            throw new GlobalErrorHandler("Invalid password",401);
                        }
                    }

        throw new GlobalErrorHandler("User not found",404);
    }

    static async verifyOtpDAL({email, otp}:{email:string, otp:string}) {

        const user = await userRepository.findOne({ where: { email: email } });


        if (!user) {

           throw new Error("User not found")
        }
        if (user) {
            const time = Date.now()-user.createdAt.getTime();
           if(time/1000 < 180){
            if (otp == user.otp) {

                user.isVerified = true;

                await userRepository.save(user);

                return { msg: "User verified successfully", status: 200 };

            }
            else{
                throw new GlobalErrorHandler("Invalid OTP",401);
            }
           }
        }
    }

    static async getUsersDAL(id:number) {
        const user = await userRepository.findOne({ where: { id: id } });

            if (!user) {
               throw new Error("User not found")
            }

            user.password = "";

            user.otp = "";

            return { msg: user, status: 200 };

    }

    static async updateUserDAL(id:number,data:UserType){
        const user = await userRepository.findOne({ where: { id: id } });

        if (!user) {

           throw new Error("User not found")
        }

        const { name, email, phone, address } = data;

        user.name = name;

        user.email = email;

        user.phone = phone;

        user.address = address || " ";
    
        await userRepository.save(user);

        return { msg: "User updated successfully", status: 200 };
    }


    static async updatePasswordDAL(id:number,data:any){
        const user = await userRepository.findOne({ where: { id: id } });

        if (!user) {

            throw new Error("User not found")

        }

        const { oldPassword, newPassword } = data;
        // console.log(oldPassword,newPassword);
        if (await bcryptjs.compare(oldPassword, user.password)) {

            const hashpassowrd = await bcryptjs.hash(newPassword, 10);

            user.password = hashpassowrd;

            await userRepository.save(user);

            return { msg: "Password updated successfully", status: 200 };
        }
        throw new Error("Invalid password");
    }

    static async sendforgetPasswordOtpDAL(email:string,otp:string){
        const user = await userRepository.findOne({ where: { email: email } });

            if (!user) {

              throw new Error("User not found")

            }

         if(user.otp ==  otp){
             await userRepository.save(user);

             return { msg: "OTP verfied successfully", status: 200 };
         }
         throw new GlobalErrorHandler("Otp is not match",400)

    }

    static async verifyForgetPasswordOtpDAL(email:string,otp:string,password:string){
        
        const user = await userRepository.findOne({ where: { email: email } });

            if (!user) {

               throw new Error("User not found")

            }

            if (otp !== user.otp) {

                throw new Error("Invalid OTP")  
            }
            
            const hashpassowrd = await bcryptjs.hash(password, 10);

            user.password = hashpassowrd;
            
            await userRepository.save(user);

            return  { msg: "Password updated successfully", status: 200 };
    }

    static async generateOtpDAL(email:string){

            let opt = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false, digits: true });
            const user = await userRepository.findOne({ where: { email: email } });

            if (!user) {
                throw new GlobalErrorHandler("User not found",404)
            }

            user.otp = opt

            await userRepository.save(user);

            await mailerSender({ email: email, title: "Verification", body: otpTemplate(opt) });
            return { msg: "OTP sent successfully", status: 200 };

       
    }



}

export default UserDAL;