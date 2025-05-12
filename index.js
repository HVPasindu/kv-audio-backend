import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import reviewRouter from "./routers/reviewRouter.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use((req,res,next)=>{
    let token = req.header("Authorization");
    //console.log(token)
    
    if(token!=null){
        token=token.replace("Bearer ","")
        jwt.verify(token,process.env.JWT_SECRET ,(err,decoded)=>{
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
app.use("/api/review",reviewRouter);



app.listen(process.env.PORT_NUMBER,()=>{
    console.log("sever is running....")
})