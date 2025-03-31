import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Account } from "./Account.entity";
import { User } from "./User.entity";

@Entity({ name: "Online_Banking_Bills_1997" })
export class Bills {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    billName: string;

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number;

    @Column({ type: "datetime" ,nullable:true})
    dueDate: Date;

    @Column({ default: "Pending" ,nullable:true})
    status: string; 

    @Column({type: "varchar", nullable: true}) 
    frequency: string | null;

    @Column({type: "datetime", nullable: true})
    nextPaymentDate: Date | null;

    @Column({ default: true ,nullable:true})
    isActive: boolean;

    @ManyToOne(() => Account, (account) => account.bills, { onDelete: "CASCADE" })
    @JoinColumn({ name: "account_id" })
    account: Account;

    @ManyToOne(()=>User,(User)=>User.bills)
    user:User;    

    constructor(
        billName: string,
        amount: number,
        dueDate: Date,
        account: Account,
        frequency?: string,
        nextPaymentDate?: Date
    ) {
        this.billName = billName;
        this.amount = amount;
        this.dueDate = dueDate;
        this.account = account;
        this.frequency = frequency || null;
        this.nextPaymentDate = nextPaymentDate || null;
        this.isActive = true;
    }
}