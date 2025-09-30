import { Request, Response } from "express";
import { FormResponse } from "../Entity/FormResponse";
import { FormResponseRepo } from "../config/datasource";


export const getResponseFromWorkFlowRunId=async(req:Request,res:Response)=>{

    try{

    
    const {wfrid}=req.params
    if(!wfrid){
        return res.status(400).json({message:"Invalid workFlowRunId",info:null})
    }

    const result=await FormResponseRepo.find({where:{workFlowRunId:wfrid},relations:{template:true}})

    return res.status(200).json({message:"Successfully fetched ",info:result})
}
catch(error){
    return res.status(500).json({message:"Internal Server error",info:null})
}
}