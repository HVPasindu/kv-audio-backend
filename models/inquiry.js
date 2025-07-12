import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        //unique:true
    },
    message:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    id:{
        type:Number,
        required:true,
        unique:true
    },
    response:{
        type:String,
        //required:true,
        default:""
    },
    issolved:{
        type:Boolean,
        required:true,
        default:false
    }

})

const Inquiry = mongoose.model("Inquiry",inquirySchema);

export default Inquiry;

//update