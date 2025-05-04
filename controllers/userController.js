import User from "../models/user.js";

export async function postUser(req,res){
    let newUser = req.body;
    let user =new User(newUser);

    try{
        await user.save();
        res.json({
            message:"user saved success",
        })
    }catch(error){
        res.status(401).json({
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