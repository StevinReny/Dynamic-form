import { Server } from "socket.io";

export const onLineUsers=new Map<string,string>();
export const registerSocket=(io:Server)=>{
    io.on("connection",(socket)=>{
        console.log("One user connected")
        socket.on("sendNotification",({message})=>{
            io.emit("sendNotification",message)
        })

    })


}