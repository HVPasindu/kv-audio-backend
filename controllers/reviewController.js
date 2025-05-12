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
                res.status(500).json({
                    message:"review addtion failed"
                })
            }
        }
    }

export async function getReview(req,res){
    //const data =req.body;data mokuth evanne naha
    if(req.user==null||req.user.role!="admin"){
        try{
            const review = await Reviewmodel.find({
            isApproved:true,
           
        })  
            
            res.json(review);
               
        }catch(error){
            res.status(500).json({
                message:"no reviews in the sitee..."
            })
        }
       /*Reviewmodel.find({
        isApproved:true
       }).then((reviews)=>{
        res.json(reviews);
       }).catch((error)=>{
            res.status(500).json({
                message:"no reviews in the sitee..."
            })
       })
            */
        
        
    }else{
        try{
            const review = await Reviewmodel.find()
            res.json(review);
            return;        
        }catch(error){
            res.status(500).json({
                message:"no reviews in the sitea..."
            })
        }
    }
}

export async function deleteReview(req,res){
    const email = req.params.email;
    console.log(email);
    if(req.user==null){
        res.status(404).json({message:"please login...."});
        return;
    }if(req.user.role!="admin"){
        if(req.user.email==email){
            
            Reviewmodel.deleteOne({
            email:email
        }).then(()=>{
            res.json({
                 message:"review is deleted"
            })
           
        }).catch((error)=>{
            res.json({
                error:error
            })
        })
        }else{
            res.status(404).json({
                message:"you are not authorized to perfrom this action..."
            })
        }

        
    }else{
        try{
            Reviewmodel.findOne({ email: email })
            .then((review) => {
                if (!review) {
                     res.status(404).json({ message: "Review not foundss" });
                     return
                }})

           await Reviewmodel.deleteOne({
            email:email
        })
            res.json({
                message:"review is deleteds..."
            })
           //console.log(res)
        }catch(error){
            res.status(500).json({
                message:"review deletion failed"
            })
        }
    }

}

export function approveReview(req,res){
    const email = req.params.email;
    console.log(email)
    if(req.user==null){
        res.status(404).json({
            message:"please login and try again..."
        })
        return;
    }if(req.user.role=="admin"){
        //console.log(email)
        Reviewmodel.findOne({ email: email })
            .then((review) => {
                if (!review) {
                    res.status(404).json({ message: "Review not founds" });
                    return
                }})

        Reviewmodel.updateOne(
            {email:email},
            {isApproved:true}
    ).then((r)=>{
        //console.log(r)
        res.json({
            message:"review approved..."
        })
    }).catch((error)=>{
        res.status(500).json({
            message:"review update failed"
        })
    })
    }else{
        res.status(404).json({
            message:"you are not admin .Only admin can approve the reviews"
        })
    }
}