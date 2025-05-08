import Reviewmodel from "../models/review.js";

export async function addReview(req,res){
    const data =req.body;
    
    if(req.user==null){
        res.json({
            message:"please login..."
        })
        return;
    }else{
            data.email=req.user.email;
            data.name = req.user.firstName+" "+req.user.lastName;
            data.profilePicture = req.user.profilePicture;
            const newReview = new Reviewmodel(data);

            try{
                await newReview.save();
                res.json({
                    message:"Review added successfully"
                })
            }catch(error){
                res.stastus(500).josn({
                    message:"review addtion failed"
                })
            }
        }
    }
