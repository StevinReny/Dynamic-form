import { connectDB } from "./config/connectDB";
import app, { httpServer } from "./server";

const PORT=8080
try{
    connectDB();
    httpServer.listen(PORT,()=>{
        console.log(`The server running at http://localhost/${PORT}`)
    });
    

}
catch(error){
    console.log(`Some error occurred ${error}`)
};
