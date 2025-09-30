import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormTemplate } from "./FormTemplate";
import { Workflow } from "./Workflow";

@Entity()
export class FormResponse{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column({type:"jsonb"})
    response!:Record<string,any>

    @ManyToOne(()=>FormTemplate,(template)=>template.formResponses, { onDelete: "CASCADE" })
    template!:FormTemplate

    @ManyToOne(()=>Workflow,(workFlow)=>workFlow.responses)
    workFlow!:Workflow

    @Column({nullable:true})
    submittedBy!:string

    @CreateDateColumn()
    createdAt!:Date

    @Column({nullable:true})
    workFlowRunId!:string

    @Column({default:false})
    isCompleted!:boolean

}