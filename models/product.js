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
        default:"https://www.google.com/imgres?q=%20404%20image%20not%20found&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D61553244814613&imgrefurl=https%3A%2F%2Fwww.facebook.com%2F404clubnotfound.kl%2F&docid=IEdBGhblWoIsOM&tbnid=YouMZO3PMtkw-M&vet=12ahUKEwj-vKWb74qOAxWOR2wGHWB3M2g4HhAzegQIbxAA..i&w=1354&h=1354&hcb=2&ved=2ahUKEwj-vKWb74qOAxWOR2wGHWB3M2g4HhAzegQIbxAA"
    }
})

const Product = mongoose.model("products",productSchema);

export default Product;