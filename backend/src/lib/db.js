import mongoose, { mongo } from "mongoose"
import {ENV} from "./env.js"

export const connectDB = async()=>{
    try{
        if(!ENV.DB_URL){
            throw new Error("DB URL is not defined in enviorenment in backend variables");
        }
        const conn= await mongoose.connect(ENV.DB_URL)
        console.log("connected to monogDB:",conn.connection.host)
    }catch(error){
        console.error("error connecting to DB",error)
        process.exit(1)
    }
}