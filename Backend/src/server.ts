import express from "express"
import cors from"cors"
import { addFormTemplateController } from "./controller/addFormTemplateController"
import { getFormByIdController } from "./controller/getForm"
import { getAllForms } from "./controller/getAllForms"
import { addResponseFromTemplateController } from "./controller/addResponseFromTemplate"
import { uploadMultiple } from "./middleware/imageUpload"
import { createServer } from "http"
import { Server } from "socket.io"
import { registerSocket } from "./socket/socket"
import { addWorkFlowController } from "./controller/addWorkFlowController"
import { getWorkFlowByIdController } from "./controller/getWorkFlowByIdController"
import {  getAllWorkFlowController } from "./controller/getAllWorkFlow"
import { getFormResponse } from "./controller/getFormResponse"
import { getAllReponseOfWorkFlow } from "./controller/getAllResponseOfWorkFlow"
import { getResponseFromWorkFlowRunId } from "./controller/getResponseFromWorkFlowRunId"
import { getAllTicket } from "./controller/getAllTicket"
import { RegisterController } from "./controller/Register"
import {  LoginController } from "./controller/Login"
import { authenticate } from "./middleware/authenticate"
import Stripe from "stripe"
import { addSubscriptionController } from "./controller/addSubcription"
import { verifyPaymentController } from "./controller/verifyPaymentController"


const app=express()
export const httpServer=createServer(app);
const io=new Server(httpServer,{cors:{origin:"http://localhost:5173",credentials:true}});
registerSocket(io)
app.use(express.json())


app.use(cors({

    origin:"http://localhost:5173",
    credentials:true,
}))
export const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!)


app.post("/login",LoginController)
app.post("/register",RegisterController)
app.use(authenticate)
app.post("/insert",addFormTemplateController)
app.get("/getAll",getAllForms)
app.post("/getbyId",getFormByIdController)
app.post("/responseFromTemplate",uploadMultiple,addResponseFromTemplateController)
app.post("/addWorkFlow",addWorkFlowController);
app.get("/getWorkFlowById/:id",getWorkFlowByIdController);
app.get("/getAllWorkFlow",getAllWorkFlowController)
app.get("/getFormResponse/:workFlowId/:templateId/:workFlowRunId",getFormResponse)
app.get("/getAllResponseOfWorkFlow/:workFlowId",getAllReponseOfWorkFlow)
app.get("/getResponseFromWorkFlowRunId/:wfrid",getResponseFromWorkFlowRunId)
app.get("/getAllTicket",getAllTicket)
app.post("/subscribe",addSubscriptionController)
app.post("/verify-payment",verifyPaymentController)
// app.post("/insert", (req, res) => {
//   console.log("POST /insert body:", req.body);
//   res.status(200).json({ message: "Success", received: req.body });
// });


export default app