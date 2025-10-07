import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export interface UserPayload{
    id:string,
    role:string;
}

export interface AuthenticatedRequest extends Request{
    user?:UserPayload
}

export const authenticate=(req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"Token missing",info:null})
    }

    try{
        const decoded= jwt.verify(token,process.env.ACCESS_KEY!) as unknown as UserPayload
        req.user=decoded
        next();
    }
    catch(error : any){
        if(error?.name==="TokenExpiredError"){
            res.sendStatus(401)
        }
        return res.sendStatus(403)
    }

}
