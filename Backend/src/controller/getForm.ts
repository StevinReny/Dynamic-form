import { Request, Response } from "express";
import { FormTemplateRepo } from "../config/datasource";
import { error } from "console";

export const getFormByIdController=async(req:Request,res:Response)=>{
    try{
    const {id}=req.body
    const data=await FormTemplateRepo.findOneBy({id})
    return res.status(200).json({message:"Success",info:data})
    }
    catch(err){
        res.status(500).json({message:"Internal server error",info:err})
    }
}