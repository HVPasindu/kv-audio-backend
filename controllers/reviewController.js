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
    if(req.user==null){
        res.status(404).josn({message:"please login...."});
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
           await Reviewmodel.deleteOne({
            email:email
        })
            res.json({
                message:"review is deleted..."
            })
        }catch(error){
            res.status(500).json({
                message:"review deletion failed"
            })
        }
    }

}