import { AppDataSource } from "../config/db";
import { User } from "../entitiy/user.entity";
import bcryptjs from 'bcryptjs';
import otpGenerator from 'otp-generator';
import { mailerSender } from "../utils/mailerSender";
import { otpTemplate } from "../utils/authTemplate";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { UserType } from "../types/interfaces/userType";

const userRepository = AppDataSource.getRepository(User);

class UserDAL {

    static async createUserDAl({name, email, password, phone, role}:{name:string, email:string, password:string, phone:string, role:string}) {

        
        const userexist = await userRepository.find({ where: { email: email } });

            if (userexist.length > 0) {
                return { msg: "User already exist", status: 400 };
            }

            const hashpassowrd = await bcryptjs.hash(password, 10);

            let opt = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false, digits: true });

            const user = userRepository.create({ name, email, password: hashpassowrd, phone, role, isVerified: false, otp: opt });

            await mailerSender({ email: email, title: "verfication", body: otpTemplate(opt) });

            user.accounts = [];

            await userRepository.save(user);

    }


    static async loginDAL({email, password}:{email:string, password:string}) {

         const user = await userRepository.findOne({ where: { email: email } });
        
                    if (user) {
        
                        if (await bcryptjs.compare(password, user.password)) {
        
                            const token = jwt.sign({ id: user.id, email: email, role: user.role }, process.env.JWT_SECRET!);
        
                            return ({ msg: "Login successfull", role: user.role, token: token, status: 200 });
        
                        }
        
                        else {
        
                            return ({ msg: "Invalid password", status: 400 });
        
                        }
                    }
    }

    static async verifyOtpDAL({email, otp}:{email:string, otp:string}) {

        const user = await userRepository.findOne({ where: { email: email } });

        if (!user) {

            return { msg: "User not found", status: 404 };

        }
        if (user) {

            if (otp == user.otp) {

                user.isVerified = true;

                await userRepository.save(user);

                return { msg: "User verified successfully", status: 200 };

            }

            return { msg: "Invalid OTP", status: 400 };
        }
    }

    static async getUsersDAL(id:number) {
        const user = await userRepository.findOne({ where: { id: id } });

            if (!user) {

                return { msg: "User not found", status: 404 };

            }

            user.password = "";

            user.otp = "";

            return { msg: user, status: 200 };

    }

    static async updateUserDAL(id:number,data:UserType){
        const user = await userRepository.findOne({ where: { id: id } });

        if (!user) {

            return { msg: "User not found", status: 404 };

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

            return { msg: "User not found", status: 404 };

        }

        const { oldPassword, newPassword } = data;
        // console.log(oldPassword,newPassword);
        if (await bcryptjs.compare(oldPassword, user.password)) {

            const hashpassowrd = await bcryptjs.hash(newPassword, 10);

            user.password = hashpassowrd;

            await userRepository.save(user);

            return { msg: "Password updated successfully", status: 200 };
        }
        return {msg:"Invalid password",status:400};
    }

    static async sendforgetPasswordOtpDAL(email:string){
        const user = await userRepository.findOne({ where: { email: email } });

            if (!user) {

                return { msg: "User not found", status: 404 };

            }

            let opt =  otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false, digits: true });

            await mailerSender({ email: email, title: "Forget Password", body: otpTemplate(opt) });

            user.otp = opt;

            await userRepository.save(user);
            return { msg: "OTP sent successfully", status: 200 };

    }

    static async verifyForgetPasswordOtpDAL(email:string,otp:string,password:string){
        
        const user = await userRepository.findOne({ where: { email: email } });

            if (!user) {

                return { msg: "User not found", status: 404 };

            }

            if (otp !== user.otp) {

                console.log(otp,user.otp);
                

                return { msg: "Invalid OTP", status: 400 };
                
            }
            
            const hashpassowrd = await bcryptjs.hash(password, 10);

            user.password = hashpassowrd;
            
            await userRepository.save(user);

            return  { msg: "Password updated successfully", status: 200 };
    }



}

export default UserDAL;