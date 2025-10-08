import { Request, Response } from "express";
import { stripe } from "../server";

export const addSubscriptionController=async(req:Request,res:Response)=>{
    try {
        const {product}=req.body
          if (!product?.name || !product?.price) {
      return res.status(400).json({ message: "Product name and price are required" });
    }
        const session =await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:[{
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:product.name,
                        // images:product.image?[product.image]:[],

                    },
                    unit_amount:product.price*100
                },
                quantity:1,
                // metadata:{userId:}
            }],
            mode:"payment",
            shipping_address_collection:{
                allowed_countries:['US',"IN","BR"]
            },
            success_url:`http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`http://localhost:5173/cancel`,
        })
        console.log(session)
        res.json({url:session.url})
    } catch (error) {
        res.status(500).json({message:"Internal Server error ",info:null})
    }
}