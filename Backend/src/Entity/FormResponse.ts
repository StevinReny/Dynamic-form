import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormTemplate } from "./FormTemplate";

@Entity()
export class FormResponse{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column({type:"jsonb"})
    response!:Record<string,any>

    @ManyToOne(()=>FormTemplate,(template)=>template.formResponses, { onDelete: "CASCADE" })
    template!:FormTemplate


    @CreateDateColumn()
    createdAt!:Date

}