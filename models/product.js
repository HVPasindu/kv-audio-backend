import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    key:{
        type:String,
        required:true,
        unique:true
    },
    category:{
        type:String,
        required:true,
        default:"uncategorized"
    },
    availability:{
        type:Boolean,
        required:true,
        default:true
    },
    dimensions:{
        type:String,
        required:true
    }
})

const Product = mongoose.model("products",productSchema);

export default Product;