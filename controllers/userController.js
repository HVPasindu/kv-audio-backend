import User from "../models/user.js";
import bcrpt from "bcrypt"

export async function registerUser(req,res){
    let newUser = req.body;
    newUser.password = bcrpt.hashSync(newUser.password,10);
    let user =new User(newUser);

    try{
        await user.save();
        res.json({
            message:"user saved success",
        })
    }catch(error){
        res.status(500).json({
            error:"user not add to the database..."
        })
    }
}

export function getUser(req,res){
    User.find().then((result)=>{
        res.json(result)
    }).catch(()=>{
        res.json({
            message:"error occured..."
        })
    })
}