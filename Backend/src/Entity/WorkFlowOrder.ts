import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FormTemplate } from "./FormTemplate";
import { Workflow } from "./Workflow";

@Entity()
export class WorkflowOrder{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    
    @ManyToOne(()=>Workflow,(workflow)=>workflow.orders,{onDelete:"CASCADE"})
    workflow!:Workflow

    @ManyToOne(()=>FormTemplate,(template)=>template.workflowOrders,{onDelete:"CASCADE"})
    template!:FormTemplate  

    @Column()
    stepOrder!:number



}