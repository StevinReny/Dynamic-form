import { Request, Response } from "express";
import { TicketRepo } from "../config/datasource";

export const getAllTicket=async(req:Request,res:Response)=>{
    try{const data= await TicketRepo.find()

    return res.status(200).json({message:"Successfully fetched",info:data})
}catch(err){
    return res.status(500).json({message:"Internal Server error",info:null})
}
}