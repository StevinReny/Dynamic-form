import { NextFunction, Request, Response } from "express";
import { FormTemplate } from "../Entity/FormTemplate";
import { FormTemplateRepo } from "../config/datasource";


export const addFormTemplateController=async(req:Request,res:Response,next:NextFunction)=>{
   try{ const {name,fields}=req.body

    const formTemplate=new FormTemplate()

    formTemplate.name=name;
    formTemplate.formfields=JSON.stringify(fields)

    const response=await FormTemplateRepo.save(formTemplate)

    return res.status(200).json({message:"Successfully inserted",info:response})
}
catch(error:any){
    console.log(error)
    return res.status(500).json({message:"Some internal error",info:error.response.message})
}

}