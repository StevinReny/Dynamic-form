import * as dotenv from "dotenv";

dotenv.config();
import AppDataSource from "./datasource"

export const connectDB=()=>{
    AppDataSource.initialize().then(()=>console.log("Database is defined")).catch((error)=>console.log(`Some error occured ${error}`))
}