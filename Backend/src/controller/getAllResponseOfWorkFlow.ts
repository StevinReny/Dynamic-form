import { Request, Response } from "express";
import { FormResponse } from "../Entity/FormResponse";
import { FormResponseRepo } from "../config/datasource";

export const getAllReponseOfWorkFlow=async(req:Request,res:Response)=>{
    try{
    const workFlowId=req.params.workFlowId
    if(!workFlowId){
        return res.status(400).json({message:"Invalid WorkFlowId"})
    }
    const result=await FormResponseRepo.find({where:{workFlow:{id:workFlowId},isCompleted:true}})

    return res.status(200).json({message:"Successfully fetched",info:result})
}
catch(error){
    return res.status(500).json({message:"Internal Server error",info:error})
}
}