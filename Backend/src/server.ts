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


const app=express()
export const httpServer=createServer(app);
export const io=new Server(httpServer,{cors:{origin:"http://localhost:5173",credentials:true}});
registerSocket(io)
app.use(express.json())


app.use(cors({

    origin:"http://localhost:5173",
    credentials:true,
}))

app.post("/insert",addFormTemplateController)
app.get("/getAll",getAllForms)
app.post("/getbyId",getFormByIdController)
app.post("/responseFromTemplate",uploadMultiple,addResponseFromTemplateController)
// app.post("/insert", (req, res) => {
//   console.log("POST /insert body:", req.body);
//   res.status(200).json({ message: "Success", received: req.body });
// });


export default app