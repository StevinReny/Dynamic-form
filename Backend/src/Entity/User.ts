
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";


export enum ROLE{
    CUSTOMER="customer",
    MANAGER="manager",
    AGENT="agent",
    ADMIN="admin"
}
@Entity()
export class User{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column()
    first_name!:string

    @Column()
    last_name!:string

    @Column()
    password!:string

    @Column({unique:true})
    email!:string

    @Column({type:"enum",enum:ROLE,default:ROLE.CUSTOMER})
    role!:ROLE

    @Column({default:true})
    isActive!:boolean

    @CreateDateColumn()
    createdAt!:Date

    @OneToOne(()=>Customer,(customer)=>customer.user)
    customer!:Customer
}