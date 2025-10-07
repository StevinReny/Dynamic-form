import { DataSource } from "typeorm";
import { FormTemplate } from "../Entity/FormTemplate";
import { FormResponse } from "../Entity/FormResponse";
import { Workflow } from "../Entity/Workflow";
import { WorkflowOrder } from "../Entity/WorkFlowOrder";
import { Ticket } from "../Entity/Ticket";
import { User } from "../Entity/User";
import { Customer } from "../Entity/Customer";

const AppDataSource=new DataSource({
    type:"postgres",
    port:Number(process.env.DB_PORT)!,
    host:process.env.DB_HOST!,
    username:process.env.DB_USERNAME!,
    password:String(process.env.DB_PASSWORD)!,
    database:process.env.DB_NAME!,
    synchronize:true,
    // logging:true,
    entities:[FormTemplate,FormResponse,Workflow,WorkflowOrder,Ticket,User,Customer],
});

export const FormTemplateRepo=AppDataSource.getRepository(FormTemplate)
export const FormResponseRepo=AppDataSource.getRepository(FormResponse)
export const WorkFlowRepo=AppDataSource.getRepository(Workflow)
export const WorkflowOrderRepo=AppDataSource.getRepository(WorkflowOrder)
export const UserRepo=AppDataSource.getRepository(User)
export const CustomerRepo=AppDataSource.getRepository(Customer)
export const TicketRepo=AppDataSource.getRepository(Ticket)

export default AppDataSource