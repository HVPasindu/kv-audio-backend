import Product from "../models/product.js";

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

