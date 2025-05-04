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

app.post("/",(req,res)=>{
    const userSchema = mongoose.Schema({
        name:String,
        number:String,
        age:Number
    })
    let User = mongoose.model("model",userSchema);
    let newUser = req.body;
    let user =new User(newUser);

    user.save().then(()=>{
        res.json({
            message:"user saved success",
        })
    }).catch((error)=>{
        res.status(401).json({
            error:"user not add in database...."
        })
    })

})

app.get("/",(req,res)=>{
    const userSchema = mongoose.Schema({
        name:String,
        number:String,
        age:Number
    })
    let User = mongoose.model("model",userSchema);
    User.find().then((result)=>{
        res.json(result)
    }).catch(()=>{
        res.json({
            message:"error occured..."
        })
    })
})






app.listen(3000,()=>{
    console.log("sever is running....")
})