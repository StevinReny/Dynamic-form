import { Request, Response } from "express";
import { UserRepo } from "../config/datasource";
import bcrypt from "bcryptjs"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const LoginController=async(req:Request,res:Response)=>{
try{    const {email,password}=req.body
const user=await UserRepo.findOneBy({email})
if(!user){
    return res.status(404).json({message:"Invalid credentials",info:null})
}


console.log("Entered")
    const passwordValid=await bcrypt.compare(password,user.password)
    if(!passwordValid){
        return res.status(400).json({message:"Invalid credentials",info:null})
    }

console.log("Entered")
    const accessToken=generateAccessToken(user.id,user.role)
    const refreshToken=generateRefreshToken(user.id)
    res.cookie("refreshToken",refreshToken,{httpOnly:true,secure:false,sameSite:"strict"})
    return res.status(200).json({message:"Successfully logged in ",info:{accessToken,user:{id:user.id,role:user.role,first_name:user.first_name,last_name:user.last_name,email:user.email}}})
}
catch(err){
    return res.status(500).json({message:"Internal Server error",info:null})
}
}