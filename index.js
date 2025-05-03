import express from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
app.use(bodyParser.json());

const mongoUrl = "mongodb+srv://admin:123@cluster0.pwerylk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoUrl);
let connection = mongoose.connection
connection.once("open",()=>{
    console.log("Mongodb connection successfully...")
})








app.listen(3000,()=>{
    console.log("sever is running....")
})