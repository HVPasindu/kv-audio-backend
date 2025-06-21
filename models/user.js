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
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
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
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        required:true,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fsign-up-member-icon-elegant-cyan-blue-round-button-sign-up-member-icon-isolated-elegant-cyan-blue-round-button-abstract-image99714643&psig=AOvVaw0n5DFPgY_-fyUCeNEGpoKG&ust=1746817765400000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOCbhrbJlI0DFQAAAAAdAAAAABAE"
    }
})
let User = mongoose.model("users",userSchema);

export default User;