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
    //console.log("ggjj");
    const data=req.body;
    try{
       const user=await User.findOne({
            email:data.email,
        })
        if(user==null){
            res.status(404).json({
                message:"user is not found..."
                
            })
            return;
            
        }else{
            if(user.isBlocked){
                res.status(403).json({
                    error:"Your account is blocked please contact the admin",
                    
                })
                return
            }
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
                    token:token,
                    user:user

                })
                console.log(token)
            }else{
                res.status(404).json({
                    error:"Login faild..."
                })
                return;
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

export function isAdmin(req){
    let isAdmin=false;
    if(req.user!=null){
        if(req.user.role=="admin"){
            isAdmin=true;
        }

    }
    return isAdmin;
}

export function isCustomer(req){
    //console.log("kjk")
   //console.log(req.user.role)
    let isCustomers=false;
    if(req.user!=null){
        if(req.user.role=="customer"){
            isCustomers=true;
        }
    }

    return isCustomers;
}

export async function getAllUsers(req,res){
    if(isAdmin(req)){
        try{
            const users = await User.find();
            res.json(users);
        }catch(e){
            res.status(500).jsom({error:"Failed to get users"})
        }
    }else{
        res.status(403).json({
            error:"Unauthorized"
        })
    }
}

export async function blockOrUnblockUser(req,res){
    const email=req.params.email;
    if(isAdmin(req)){
        try{
            const user=await User.findOne(
                {email:email}  )

            if(user==null){
                res.status(404).json({error:"User not found"});
                return;
            }
            const isBlocked=!user.isBlocked
            await User.updateOne(
                {email:email},
                {isBlocked:isBlocked}
            )
            res.json({
                message:"User blocked/unblocked successfully"
            })
        }catch(e){
            res.status(500).json({error:"Failed to get user"})
        }
    }
}

export function getUser_2(req,res){
    if(req.user!=null){
        res.json(req.user);

    }else{
        res.status(404).json({
            error:"Unauthorized"
        })
    }
}