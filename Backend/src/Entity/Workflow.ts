import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkflowOrder } from "./WorkFlowOrder";


@Entity()
export class Workflow{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column()
    name!:string

    @OneToMany(()=>WorkflowOrder,(order)=>order.workflow,{cascade:true})
    orders!:WorkflowOrder[]


}