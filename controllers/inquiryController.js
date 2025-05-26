import Inquiry from "../models/inquiry.js";
import { isCustomer } from "./userController.js";

export async function addInquiry(req,res){
    let iscustomer= isCustomer(req);
    try{
        if(iscustomer){
            const data = req.body;
            data.email = req.body.email;
            data.phone = req.body.phone;
            let id=0;
            const inquirys= await Inquiry.find().sort({id:-1}).limit(1);
            if(inquirys.length==0){
                id =1;
            }else{
                id = inquirys[0].id+1;
            }
            data.id=id;
            const newInqury = new Inquiry(data);
            const respons = await newInqury.save();
            res.json({
                message:"Inquiry added successfully...",
                id:respons.id 
            })
        }
    }catch(e){
        res.status(404).json({
            message:"Failed to add inquiry.."
        })
    }
}