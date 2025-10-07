import { Request, Response } from "express";
import { FormResponse } from "../Entity/FormResponse";
import { FormResponseRepo, FormTemplateRepo, TicketRepo, WorkFlowRepo } from "../config/datasource";
import { Ticket } from "../Entity/Ticket";

export const addResponseFromTemplateController=async(req:Request,res:Response)=>{
   try{
       const {templateId,submittedBy,workFlowId,workFlowRunId,isCompleted,...formfield}=req.body
    // const templateId1=req.body.templateId
    console.log(req.body)

   

    const workFlow=await WorkFlowRepo.findOne({where:{id:workFlowId},relations:{orders:{template:true}}})
    if(!workFlow){
        return res.status(404).json({message:"Invalid Workflow",info:null})
    }
    const template=workFlow.orders.find((f)=>f.template.id===templateId)?.template
    
    if(!template){
        return res.status(400).json({message:"Invalid template",info:null})
    }


    const duplicateResponse=await FormResponseRepo.findOne({where:{submittedBy:submittedBy,workFlowRunId:workFlowRunId,workFlow:{id:workFlowId},template:{id:templateId}}})
   


    const files=req.files as Express.Multer.File[]
    console.log(files)


    const responseData:Record<string,any>={...formfield}
    if(files && files.length>0){
        files.forEach((file)=>{
            responseData[file.fieldname]=file.path
        })
    }


    if(duplicateResponse){
        const resp=duplicateResponse.response=responseData
        if(isCompleted==='true'){
            duplicateResponse.isCompleted=true
        }
        await FormResponseRepo.save(duplicateResponse)
        return res.status(200).json({message:"Successfully updated",info:resp})
        
    }
    const formResponse=new FormResponse()
    let ticket_response;
    if(isCompleted==='true'){
        formResponse.isCompleted=true

        const ticket=new Ticket()
        ticket.ticket_number=`TICKET_${crypto.randomUUID()}`
        ticket.workFlowRunId=workFlowRunId
        ticket.subject=`${workFlow.name}_${ticket.ticket_number}`

        ticket_response=await TicketRepo.save(ticket)

    }
    formResponse.template=template;
    formResponse.response=responseData;
    formResponse.submittedBy=submittedBy
    formResponse.workFlow=workFlow
    formResponse.workFlowRunId=workFlowRunId



    let resp=await FormResponseRepo.save(formResponse);
    
    if(ticket_response){
        resp={...resp,...ticket_response}
    }


  return res.status(200).json({ message: "Form saved successfully", info: resp });
   }
   catch(error){
    res.status(500).json({message:"Internal server error"})
   }
}