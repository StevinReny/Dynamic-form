import { Request, Response } from "express";
import { WorkFlowRepo } from "../config/datasource";

export const getAllWorkFlowController=async(req:Request,res:Response)=>{
    try{
        const response=await WorkFlowRepo.find()
        if(!response){
            return res.status(404).json({message:"No WorkFlow found"})
        }
        return res.status(200).json({message:"Successful",info:response})
    }

    catch(error){
        return res.status(500).json({message:"Internal Server error",info:error})
    }
}