import nodemailer from 'nodemailer';

interface mailData{
    email:string,
    title:string,
    body:string,
}

export const mailerSender= async(mail:any)=>{

    try {
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: 587,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        let info = await transporter.sendMail({
            from: `"Easy Bank" <${process.env.MAIL_USER}>`,
            to:`${mail.email}`,
            subject: `${mail.title}`,
            html: `${mail.body}`,
        })

        return info;

    } catch (error) {
            // console.log(error);
            return error;
    }

}