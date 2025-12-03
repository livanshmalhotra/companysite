import express, { response } from "express";
import { ENV } from "./lib/env.js";
import path from "path"
import { request } from "http";
import { connect } from "http2";
import { connectDB } from "./lib/db.js";
import { start } from "repl";
const app = express()


const __dirname= path.resolve()


if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/", (request, response) => {
        response.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });

}
app.get("/api/test",(request,response)=>{
    response.json({ message:"backend is working!"});
});


const startserver = async()=>{
    try{
        if(!ENV.DB_URL){
            throw new Error("DB URL is not defined in .env in backend variables");
        }
        await connectDB();
        app.listen(ENV.PORT,()=>{
        console.log("server is running on port:",ENV.PORT)
    });
    }catch(error){
        console.error("Error in connecting to DB");

    }
}
startserver();