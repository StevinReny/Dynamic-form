import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TICKET_STATUS{
    OPEN="open",
    CLOSED="closed",
    WAITING_CUSTOMER='waiting_customer',
    ESCALATED= 'escalated',
    RESOLVED= 'resolved'
}

export enum PRIORITY_STATUS{
    LOW='low',
    MEDIUM= 'medium',
    HIGH= 'high',
    CRITICAL= 'critical'
}

@Entity()
export class Ticket{


    @PrimaryGeneratedColumn("uuid")
    id!:string

    @Column({unique:true})
    ticket_number!:string


    @Column()
    workFlowRunId!:string

    @Column()
    subject!:string

    @Column({type:"enum",enum:TICKET_STATUS,default:TICKET_STATUS.OPEN})
    status!:TICKET_STATUS

    @Column({type:"enum",enum:PRIORITY_STATUS,default:PRIORITY_STATUS.MEDIUM})
    priority!:PRIORITY_STATUS
} 