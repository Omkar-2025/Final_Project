import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Account } from "./Account.entity";
import { Support } from "./support_query.entity";
import { Bills } from "./Bills.entity";

@Entity({ name: 'Online_Bank_User_1997' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    phone: string;

    @Column({
        enum:['admin','user'],
        default:'user'
    })
    role:string;

    @Column({default:false})
    isVerified:boolean;

    @Column({default:0})
    otp:string

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Account, (account) => account.user,{cascade:true})
    accounts: Account[];

    @OneToMany(() => Support,(Support)=>Support.user,{cascade:true})
    support:Support[];

    @OneToMany(()=>Bills,(bills)=>bills.user,{cascade:true})
    bills:Bills[];
}