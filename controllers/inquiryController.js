
import Inquiry from "../models/inquiry.js";
import { isAdmin, isCustomer, registerUser } from "./userController.js";

export async function addInquiry(req,res){
    let iscustomer= isCustomer(req);
    //console.log(iscustomer)
    try{
        if(iscustomer){
           //console.log(iscustomer);
            const data = req.body;
            data.email = req.user.email;
            data.phoneNumber = req.user.phoneNumber;
            let id=0;
            const inquirys= await Inquiry.find().sort({id:-1}).limit(1);
            if(inquirys.length==0){
                id =1;
            }else{
                id = inquirys[0].id+1;
            }
            data.id=id;
            //console.log("kiils")
            const newInqury = new Inquiry(data);
            //console.log("kiil")
            const respons = await newInqury.save();
           // console.log("kii")
            res.json({
                message:"Inquiry added successfully...",
                id:respons.id 
            })
        } else {
                res.status(401).json({message: "Unauthorized"});
    }
    }catch(e){
         console.error("Error saving inquiry:", e);
        res.status(404).json({

            message:"Failed to add inquiry.."
        })
    }
}

export function getInquiry(req,res){
    
    if(isCustomer(req)){
        Inquiry.findOne({
            email:req.user.email
        }).then((inqu)=>{
            res.json(inqu)
        }).catch((err)=>{
            res.status(500).res.json({
                message:"no inquiry from you..."
            })
        })
        return;
    }if(isAdmin(req)){
        Inquiry.find().then((inqu)=>{
            res.json(inqu)
        }).catch((err)=>{
            res.status(500).res.json({
                message:"no inquiries..."
            })
        })
        return;
    }else{
        res.status(404).json({
            message:"you are nopt authrized to prform this action..."
        })
        return;
    }
}

export async function deleteInquiry(req,res){
    
    try{if(isCustomer(req)){
        //console.log("hii");
            const id=req.params.id;
           //console.log(id);
            const inquiry=await Inquiry.findOne({id:id});
            //console.log(inquiry.email);
            //console.log("req.params.id:", req.params.id);
            if (!inquiry) {
                    return res.status(404).json({ message: "Inquiry not founds" });
            }
            else{
                if(inquiry.email==req.user.email){
                    await Inquiry.deleteOne({
                        id:id
                    })
                    res.json({
                        message:"inquiry is deleted..."
                    })
                    return;
                }else{
                    res.status(404).json({
                        message:"you are not authrized to prform this action...2"
                    })
                    return;
                }
            }
        }else if(isAdmin(req)){
            const id=req.params.id;
            const inquiry = await Inquiry.findOne({ id: id });
            if (!inquiry) {
                    return res.status(404).json({ message: "Inquiry not found" });
            }
           await Inquiry.deleteOne({
                id:id
            })
            res.json({
                message:"inquiry is deleted...1"
            })
            return;
        }else{
            console.log(req.user)
            res.status(404).json({
                        message:"you are nopt authrized to prform this action...3"
                    })
                    return;}
    }catch(e){
        res.status(404).json({
            message:"faild to delete inquityy..."
        })
    }
}