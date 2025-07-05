import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import reviewRouter from "./routers/reviewRouter.js";
import InquiryRouter from "./routers/inquiryRouter.js";
import cors from "cors";
import orderRouter from "./routers/orderRouter.js";
import dashboardRouter from "./routers/dashboardRouter.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    let token = req.header("Authorization");
    // console.log(req)
    
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

app.use("/api/user",userRouter);
app.use("/api/product",productRouter)
app.use("/api/review",reviewRouter);
app.use("/api/inquiry",InquiryRouter);
app.use("/api/orders",orderRouter);
app.use("/api", dashboardRouter);




app.listen(process.env.PORT_NUMBER,()=>{
    console.log("sever is running....")
})