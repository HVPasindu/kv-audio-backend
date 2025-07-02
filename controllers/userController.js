import axios from "axios";
import User from "../models/user.js";
import bcrpt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";
import OTP from "../models/otp.js";




 const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "hvpmjayarathna2001@gmail.com",
    pass: "eaaqleczyjxmutfx",
  }
})





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
                    profilePicture:user.profilePicture,
                    emailVerified:user.emailVerified
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
export function getUser_3(req, res) {
    if (req.user != null) {
        // Assuming `req.user` contains user details, including role information
        // console.log(req.user.role)
        if (req.user.role === 'admin') {
            res.json({ isAdmin: true, user: req.user });
        } else {
            res.json({ isAdmin: false, user: req.user });
        }
    } else {
        //console.log(req.user.role)
        res.status(404).json({
            
            error: "Unauthorizedss"
        });
    }
}


export async function loginWithGoogle(req,res){
    //https://www.googleapis.com/oauth2/v3/userinfo

    const accesToken = req.body.accessToken;
	console.log(accesToken);
	try {
		const response = await axios.get(
			"https://www.googleapis.com/oauth2/v3/userinfo",
			{
				headers: {
					Authorization: `Bearer ${accesToken}`,
				},
			}
		);
		console.log(response.data);
	 	const user = await User.findOne({
	 		email: response.data.email,
	 	});
	 	if (user != null) {
	 		const token = jwt.sign(
	 			{
	 				firstName:user.firstName,
                    lastName:user.lastName,
                    email:user.email,
                    role:user.role,
                    phoneNumber:user.phoneNumber,
                    profilePicture:user.profilePicture,
                    emailVerified: true
	 			},
 			process.env.JWT_SECRET
			);

			res.json({ message: "Login successful", token: token, user: user });
		} else {
      const newUser = new User({
        email: response.data.email,
        password: "123",
        firstName: response.data.given_name,
        lastName: response.data.family_name,
        address: "Not Given",
        phoneNumber: "Not given",
        profilePicture: response.data.picture,
        emailVerified: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign(
        {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          email: savedUser.email,
          role: savedUser.role,
          profilePicture: savedUser.profilePicture,
          phoneNumber: savedUser.phone,
        },
        process.env.JWT_SECRET
      );
      res.json({ message: "Login successful", token: token, user: savedUser });
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ error: "Failed to login with google" });
	}
}


export async function sendOTP(req,res){
    
    
  if(req.user == null){
    res.status(403).json({error : "Unauthorized"})
    return;
  }

    //generate number between 1000 and 9999
    const otp = Math.floor(Math.random()*9000) + 1000;
    //save otp in database
    console.log("otp=1")
    console.log(otp)
    const newOTP = new OTP({
        email : req.user.email,
        otp : otp
    })
  await newOTP.save();

  const message = {
    from : "hvpmjayarathna2001@gmail.com",
    to : req.user.email,
    subject : "Validating OTP",
    text : "Your otp code is "+otp
  }
  

  transport.sendMail(message, (err, info) => {
    if(err){
      console.log(err); 
      res.status(500).json({error : "Failed to send OTP"})    
    }else{
      console.log(info)
      res.json({message : "OTP sent successfully"})
    }
  });

 

}

export async function verifyOTP(req,res){
  if(req.user == null){
    res.status(403).json({error : "Unauthorized"})
    return;
  }
  const code = req.body.code;

  const otp = await OTP.findOne({
    email : req.user.email,
    otp : code
  })

  if(otp == null){
    res.status(404).json({error : "Invalid OTP"})
    return;
  }else{
    await OTP.deleteOne({
      email : req.user.email,
      otp : code
    })

    await User.updateOne({
      email : req.user.email
    },{
      emailVerified : true
    })

    res.status(200).json({message : "Email verified successfully"})
  }
  
}

export async function registerAdmin(req, res) {
  let newUser = req.body;
  newUser.password = bcrpt.hashSync(newUser.password, 10);
  let user = new User(newUser);

  // Check if the user is trying to register an admin and if they are authorized
  if (newUser.role === "admin" && !isAdmin(req)) {
    return res.status(403).json({
      error: "Only admins can register new admins.",
    });
  }

  try {
    await user.save();
    res.json({
      message: "Admin registered successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to register the admin.",
    });
  }
}
