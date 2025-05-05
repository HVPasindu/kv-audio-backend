import Product from "../models/product.js";

export async function addProduct(req,res){
    
    const data = req.body;
    const newProduct = new Product(data);
   
    try{ 
        
        await newProduct.save();
        res.json({
            message:"product add successfuly...."
        })

    }catch(error){
        res.status(500).json({
            message:"product addition failed..."
        })
    }
}

