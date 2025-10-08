import { Request, Response } from "express";

export const webHookController=async(req:Request,res:Response)=>{
    const sig=req.headers["stripe-signature"]
}