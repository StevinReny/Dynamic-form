import { Request, Response } from "express";
import { FormResponse } from "../Entity/FormResponse";
import { FormResponseRepo, FormTemplateRepo } from "../config/datasource";

export const addResponseFromTemplateController=async(req:Request,res:Response)=>{
   try{
    const templateId=req.body.templateId
    
    const files=req.files as Express.Multer.File[]
    console.log(files)
    const template=await FormTemplateRepo.findOneBy({id:templateId})
    if(!template){
        return res.status(404).json({message:"Template not found"})
    }
    const responseData:Record<string,any>={...req.body}
    if(files && files.length>0){
        files.forEach((file)=>{
            responseData[file.fieldname]=file.path
        })
    }
    const formResponse=new FormResponse()
    formResponse.template=template;
    formResponse.response=responseData;


      await FormResponseRepo.save(formResponse);

  res.json({ message: "Form saved successfully", data: formResponse });
   }
   catch(error){
    res.status(500).json({message:"Internal server error"})
   }
}