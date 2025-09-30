import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WorkflowOrder } from "./WorkFlowOrder";
import { FormResponse } from "./FormResponse";


@Entity()
export class Workflow{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column()
    name!:string

    @OneToMany(()=>WorkflowOrder,(order)=>order.workflow,{cascade:true})
    orders!:WorkflowOrder[]

    @OneToMany(()=>FormResponse,(response)=>response.workFlow)
    responses!:FormResponse[]


}