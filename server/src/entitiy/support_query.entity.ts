import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'Online_Banking_support_1997' })
export class Support{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subject: string;

    @Column()
    description: string;

    @Column({default:'pending'})
    status: string;

    @CreateDateColumn()
    createdAt: Date; 

    @Column({default:''})
    resolve:string;

    @ManyToOne(()=>User,(user)=>user.support)
    user:User;

    constructor(subject:string,description:string,user:User){
        this.subject=subject;
        this.description=description;
        this.user=user;
    }

}
