
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
            message:"product addition failed...",
            error: error.message
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

export async function updateProduct(req, res) {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({
        message: "You are not authorized to perform this action.",
      });
    }

    const key = req.params.key;
    const data = req.body;

    const product = await Product.findOne({ key: key });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    await Product.updateOne({ key: key }, data);

    return res.json({ message: "Product updated successfully." });

  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server error while updating the product.",
    });
  }
}



export async function deleteProduct(req, res) {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({ message: "You are not authorized to perform this action." });
    }

    const key = req.params.key;

    const product = await Product.findOne({ key: key });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.deleteOne({ key: key });

    return res.json({ message: "Product deleted..." });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function overViews(req,res){
 
  try{
     const key=req.params.key;
    //console.log(key)
    const product=await Product.findOne({
      key:key
    })
    if(product==null){
      res.status(404).json({
        message:"product not found"
      })
      return;
    }
    res.json(product);
    return

  }catch(e){
    res.status(500).json({
      message:"Failed to get product"
    })
  }
}
