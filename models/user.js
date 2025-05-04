import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:String,
    number:String,
    age:Number
})
let User = mongoose.model("model",userSchema);

export default User;