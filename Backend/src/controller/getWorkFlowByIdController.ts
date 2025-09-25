import { Request, Response } from "express";
import { WorkFlowRepo } from "../config/datasource";
import { workerData } from "worker_threads";
import { error } from "console";

export const getWorkFlowByIdController=async(req:Request,res:Response)=>{
    try{
        const id=req.params.id;
        if(!id){
            return res.status(400).json({message:"No Id Provided"})
        }
        const workflow=await WorkFlowRepo.findOne({where:{id},relations:{orders:{template:true}}})
        if(!workflow){
            return res.status(404).json({message:"No WorkFlow Found"})
        }
        return res.status(200).json({message:"Successfull",info:workflow})
    }
    catch(err){
        return res.status(500).json({message:"Internal server error",error})
    }
}