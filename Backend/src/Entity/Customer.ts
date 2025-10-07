import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Customer{

    @PrimaryGeneratedColumn()
    id!:string

    @OneToOne(()=>User,(user)=>user.customer,{cascade:true})
    @JoinColumn()
    user!:User

    @Column({default:false})
    isSubscribed!:boolean

    @Column({nullable:true})
    phone_number!:string

    @CreateDateColumn()
    createdAt!:Date
}