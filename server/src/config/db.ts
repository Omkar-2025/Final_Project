import { DataSource } from "typeorm";
import 'dotenv/config' 
import { User } from "../entitiy/user.entity";
// import { Transaction } from "../entitiy/transaction.entity";
import { Transaction } from "../entitiy/transaction.entity";
import { Support } from "../entitiy/support_query.entity";
import { Account } from "../entitiy/account.entity";
import { Bills } from "../entitiy/bills.entity";


/**
 * * This is the database connection file
 */

 
export const AppDataSource = new DataSource({
    type:process.env.DB_TYPE as any ,
    host:process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT!) ,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    synchronize:false,
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
 