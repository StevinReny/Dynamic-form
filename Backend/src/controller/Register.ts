import { Request, Response } from "express";
import { CustomerRepo, UserRepo } from "../config/datasource";
import bcrypt from "bcryptjs"
import { ROLE, User } from "../Entity/User";
import { Customer } from "../Entity/Customer";


interface userInput{
    role:ROLE;
    email:string;
    password:string;
    first_name:string;
    last_name:string;
}


export const RegisterController=async(req:Request,res:Response)=>{
   try{ 
    const {email,password,first_name,last_name,role}=req.body as userInput

    const existingEmail=await UserRepo.findOneBy({email})
    if(existingEmail){
        return res.status(400).json({message:"Email already exists",info:null})
    }

    const hashed_password=await bcrypt.hash(password,5)

    const user=new User()
    user.first_name=first_name;
    user.last_name=last_name;
    user.email=email;
    user.password=hashed_password;
    user.role=role.toLowerCase() as ROLE
    let newUser;
    if(user.role==="customer"){
        const customer=new Customer()
        customer.isSubscribed=false
        customer.user=user
        newUser=await CustomerRepo.save(customer)
    }

    else{
       newUser= await UserRepo.save(user)
    } 
    return res.status(200).json({message:"Successfully saved",info:newUser})
}
catch(error){
    res.status(500).json({message:"Internal Server error",info:null})
}
}