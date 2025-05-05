import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"customer"
    },
    phoneNumber:{
        type:String,
        required:true
    }
})
let User = mongoose.model("user",userSchema);

export default User;