//import { json } from "body-parser";
import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function addProduct(req,res){
    
    const data = req.body;
    const newProduct = new Product(data);
   
    try{ 
        if(req.user==null){
                res.status(404).json({
                    message:"please login..."
                })
               return;
            }else if(req.user.role!="admin"){
                    res.status(404).json({
                        message:"your cant do this .beacuse your are'not a admin..."
                    })
                    return;
            }else{
                await newProduct.save();
                res.json({
                message:"product add successfuly...."
                })
            }
        

    }catch(error){
        res.status(500).json({
            message:"product addition failed..."
        })
    }
}

export async function getProduct(req,res){
    let isAdmins = isAdmin(req)
    try{
        if(isAdmins){
            const products=await Product.find();
            res.json(products);
            return;
        }else{
            const productss=await Product.find({
                availability:true
                
            })
            res.json(productss);
            return;
        }
        
    }catch(e){
        res.status(500).json({
            message:"Faild to get product...",
            e:e.toString()
        })
    }
}

export async function updateProduct(req,res){
    const key=req.params.key
    try{
        if(isAdmin(req)){
            await Product.updateOne({
                key:key
            },data)
            res.json({
                message:"product updated..."
            })
        }

    }catch(e){
        res.status(500).json({
            message:"can' fintd that product"
        })
    }

}