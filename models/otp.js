import mongoose from "mongoose";


const OTPschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
        
    }
});

const OTP =mongoose.model("OTP",OTPschema);

export default OTP;