import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Account } from "./account.entity";

@Entity({ name: 'Online_Banking_Transcation_1997' })
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    transactionType: string;

    @ManyToOne(() => Account, (account) => account.transactionsFrom,{onDelete:'CASCADE'})
    fromAccount: Account;

    @ManyToOne(() => Account, (account) => account.transactionsTo,)
    toAccount: Account;

    @CreateDateColumn()
    createdAt: Date;

    constructor(amount: number, transactionType: string, fromAccount: Account, toAccount: Account) {
        this.amount = amount;
        this.transactionType = transactionType;
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
    }
}
