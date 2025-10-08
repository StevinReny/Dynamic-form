import { Request, Response } from "express";
import { stripe } from "../server";
import { UserRepo } from "../config/datasource";

export const verifyPaymentController=async(req:Request,res:Response)=>{
    try {
        const {sessionId}=req.body

        if(!sessionId){
            return res.status(400).json({message:"Session id is required",info:null})
        }
        const session=await stripe.checkout.sessions.retrieve(sessionId)

        if(session.payment_status==='paid'){
            // const user=UserRepo.findOneBy({email:sessionId.})
            return res.status(200).json({message:"Payment verfied successfully",info:true})
        }
        else{
            return res.status(402).json({message:"Payment verification failed",info:false})
        }
        
    } catch (error) {
        console.log(error)
          return res.status(500).json({message:"Payment verification failed",info:false})
    }


}