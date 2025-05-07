import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use((req,res,next)=>{
    let token = req.header("Authorization");
    //console.log(token)
    
    if(token!=null){
        token=token.replace("Bearer ","")
        jwt.verify(token,"kv secret 89",(err,decoded)=>{
            if(!err){
                req.user=decoded;
                
            }
        })
    }
    next();
})

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);
let connection = mongoose.connection
connection.once("open",()=>{
    console.log("Mongodb connection successfully...")
})

app.use("/user",userRouter);
app.use("/product",productRouter)



app.listen(3000,()=>{
    console.log("sever is running....")
})