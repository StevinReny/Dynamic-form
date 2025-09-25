import { Request, Response } from "express";
import { Workflow } from "../Entity/Workflow";

import { FormTemplateRepo, WorkflowOrderRepo, WorkFlowRepo } from "../config/datasource";
import { WorkflowOrder } from "../Entity/WorkFlowOrder";

export const addWorkFlowController=async(req:Request,res:Response)=>{
    try{
        const {name,forms}=req.body
        for(const element of forms){
            const currentForm=await FormTemplateRepo.findOneBy({id:element})
            if(!currentForm){
                return res.status(400).json({message:"Incorrect FormTemplate"})
            }
        }

        const workFlow=new Workflow()
        workFlow.name=name

        await WorkFlowRepo.save(workFlow);
        for(const [index,element] of forms.entries()) {
            const currentForm=await FormTemplateRepo.findOneBy({id:element})
            const workflowOrder=new WorkflowOrder()
            workflowOrder.template=currentForm!;
            workflowOrder.workflow=workFlow
            workflowOrder.stepOrder=index
            await WorkflowOrderRepo.save(workflowOrder)
           
        };
        return res.status(200).json({message:"Successfully saved"})   
    }

    catch(error){
        console.log(error)
        return res.status(500).json({message:error})
    }

}