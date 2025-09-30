import { Request, Response } from "express";
import { FormResponseRepo } from "../config/datasource";

export const getFormResponse=async(req:Request,res:Response)=>{
    try{
        const {workFlowId,workFlowRunId,templateId}=req.params
        const invalid=[workFlowId,workFlowRunId,templateId].some(s=>!s)
        if(invalid){
            return res.status(400).json({message:"Invalid Inputs",info:null})
        }
        const resp=await FormResponseRepo.findOne({where:{workFlow:{id:workFlowId!},workFlowRunId:workFlowRunId!,template:{id:templateId!}}})
        console.log(resp)
        return res.status(200).json({message:"Successfully fetched",info:resp})
    }
    catch(error){
        return res.status(500).json({message:"Internal Server error",info:null})
    }
        
}