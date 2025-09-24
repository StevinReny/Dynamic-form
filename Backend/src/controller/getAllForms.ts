import { Request, Response } from "express";

import { FormTemplateRepo } from "../config/datasource";

export const getAllForms=async(req:Request,res:Response)=>{
    try{
        const data=await FormTemplateRepo.find()
        
        return res.status(200).json({message:"Successfully fetched",info:data})

    }
    catch(err:any){
        return res.status(500).json({message:"Some internal error",info:err.message})
    }
}