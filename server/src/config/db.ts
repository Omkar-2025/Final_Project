import { DataSource } from "typeorm";
import 'dotenv/config' 
import { User } from "../entitiy/User.entity";
import { Transaction } from "../entitiy/Transaction.entity";
import { Support } from "../entitiy/support_query.entity";
import { Account } from "../entitiy/Account.entity";
import { Bills } from "../entitiy/Bills.entity";

 
export const AppDataSource = new DataSource({
    type:'mssql',
    host:'dev.c5owyuw64shd.ap-south-1.rds.amazonaws.com',
    port:1982,
    username:'j2',
    password:'123456',
    database:'JIBE_Main_Training',
    synchronize:true,
    entities:[
        User,
       Account,
       Transaction,
       Bills,
       Support
    ],
    options:{
        encrypt:true,
        trustServerCertificate:true
    }
})
 
 
export const dbconnect = async()=>{
    await AppDataSource.initialize()
    console.log("Database connected");
}
 