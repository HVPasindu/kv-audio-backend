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
    dimentions:{
        type:String,
        required:true
    },
    image:{
        type:[String],
        required:true,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fsign-up-member-icon-elegant-cyan-blue-round-button-sign-up-member-icon-isolated-elegant-cyan-blue-round-button-abstract-image99714643&psig=AOvVaw0n5DFPgY_-fyUCeNEGpoKG&ust=1746817765400000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOCbhrbJlI0DFQAAAAAdAAAAABAE"
    }
})

const Product = mongoose.model("products",productSchema);

export default Product;