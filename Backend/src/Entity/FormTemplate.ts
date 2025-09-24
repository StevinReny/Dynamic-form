import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { FormResponse } from "./FormResponse";
import { WorkflowOrder } from "./WorkFlowOrder";


@Entity()
export class FormTemplate{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column()
    name!:string

    @Column()
    formfields!:string

    @OneToMany(()=>WorkflowOrder,(workflowOrder)=>workflowOrder.template,{cascade:true})
    workflowOrders!:WorkflowOrder[]   
    
    @OneToMany(()=>FormResponse,(formResponse)=>formResponse.template,{cascade:true})
    formResponses!:FormResponse[]

}