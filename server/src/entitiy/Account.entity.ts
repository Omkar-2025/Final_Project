import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Transaction } from "./Transaction.entity";
import { User } from "./User.entity";
import { Bills } from "./Bills.entity";



@Entity({ name: 'Online_Banking_Account_1997' })
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    balance: number;

    @Column({ type: `uuid`,unique:true,default:()=>`NewID()` })
    account_number: string;

    @Column({
        enum:['Savings Account','Current Account','Salary Account'] ,
        default:'Savings Account'
    })
    account_type: string;


    @Column({default:false})
    isVerified: boolean;


    @ManyToOne(() => User, (user) => user.accounts,{onDelete:'CASCADE'})
    @JoinColumn({"name":"user_id"})
    user: User;


    @OneToMany(() => Transaction, (transaction) => transaction.fromAccount,{cascade:true})
    transactionsFrom: Transaction[];

    @OneToMany(() => Transaction, (transaction) => transaction.toAccount,{cascade:true})
    transactionsTo: Transaction[];

    @OneToMany(() => Bills, (bills) => bills.account, { cascade: true })
bills: Bills[];

    constructor(name: string, balance: number, account_type: string, user: User) {
        this.name = name;
        this.balance = balance;
        this.account_type = account_type;
        this.user = user;
    }

}