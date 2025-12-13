import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import {serve} from "inngest/express"
import { inngest } from "./lib/inngest.js";

const app = express()

const __dirname= path.resolve()

app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use("/api/inngest",serve({client:inngest, functions}));

// Enable CORS in development mode
if(ENV.NODE_ENV !== "production"){
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method === 'OPTIONS') {
            res.sendStatus(200);
        } else {
            next();
        }
    });
}

// Parse JSON bodies
app.use(express.json());

// Serve frontend in production
if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("/", (request, response) => {
        response.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

// API routes
app.get("/api/test",(request,response)=>{
    response.json({ message:"backend is working!"});
});


const startserver = async()=>{
    try{
        await connectDB();
        const PORT = ENV.PORT || 3000;
        app.listen(PORT,()=>{
            console.log(`Backend server is running on port: ${PORT}`);
            if(ENV.NODE_ENV !== "production"){
                console.log(`Frontend dev server is running on Vite's default port (usually 5173)`);
            }
        });
    }catch(error){
        console.error("Error in connecting to DB:", error);
    }
}
startserver();