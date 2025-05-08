import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true //eka email ekakin danna puluvan eka review ekayi
    },
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    isApproved:{
        type:Boolean,
        required:true,
        default:false
    },
    profilePicture:{
        type:String,
        required:true,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fsign-up-member-icon-elegant-cyan-blue-round-button-sign-up-member-icon-isolated-elegant-cyan-blue-round-button-abstract-image99714643&psig=AOvVaw0n5DFPgY_-fyUCeNEGpoKG&ust=1746817765400000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOCbhrbJlI0DFQAAAAAdAAAAABAE"
    }


})

const Reviewmodel = mongoose.model("Review",reviewSchema);
export default Reviewmodel;