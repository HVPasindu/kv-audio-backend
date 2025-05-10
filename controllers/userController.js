import User from "../models/user.js";
import bcrpt from "bcrypt"
import jwt from "jsonwebtoken"

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

export async function loginUser(req,res){
    const data=req.body;
    try{
       const user=await User.findOne({
            email:data.email,
        })
        if(user==null){
            res.status(404).json({
                message:"user is not found..."
                
            })
            
        }else{
           
            const isPassword = bcrpt.compareSync(data.password,user.password);
            if(isPassword){
                const token = jwt.sign({
                    firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    role:user.role,
                    phoneNumber:user.phoneNumber,
                    profilePicture:user.profilePicture
                },process.env.JWT_SECRET)

                res.json({
                    message:"Login successfull",
                    token:token
                })
            }else{
                res.status(404).json({
                    error:"Login faild..."
                })
            }
        }
    }catch(error){
        res.status(500).json({
            message: "Error logging in user",
            error: error.message,
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