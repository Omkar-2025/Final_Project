import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Transaction } from "./transaction.entity";
import { User } from "./user.entity";
import { Bills } from "./bills.entity";



@Entity({ name: 'Online_Banking_Account_1997' })
export class Account {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    balance: number;

    @Column({ type: `uuid`, unique: true, default: () => `NewID()` })
    account_number: string;

    @Column({
        enum: ['Savings Account', 'Current Account', 'Salary Account'],
        default: 'Savings Account'
    })
    account_type: string;


    @Column({ default: false })
    isVerified: boolean;

    @Column({default:0})
    status:boolean


    @Column({type: "varchar", nullable: true})
    pan_card_number:string;


    @Column({type:"varchar", nullable: true})
    aadhar_card_number:string;

    @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' })
    @JoinColumn({ "name": "user_id" })
    user: User;


    @OneToMany(() => Transaction, (transaction) => transaction.fromAccount, { cascade: true })
    transactionsFrom: Transaction[];

    @OneToMany(() => Transaction, (transaction) => transaction.toAccount, { cascade: true })
    transactionsTo: Transaction[];

    @OneToMany(() => Bills, (bills) => bills.account, { cascade: true })
    bills: Bills[];




    constructor(name: string, balance: number, account_type: string, user: User,aadhar_card_number:string,pan_card_number:string) {
        this.name = name;
        this.balance = balance;
        this.account_type = account_type;
        this.user = user;
        this.status=false;
        this.aadhar_card_number=aadhar_card_number;
        this.pan_card_number=pan_card_number;
    }

}