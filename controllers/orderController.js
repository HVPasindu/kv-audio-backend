import Order from "../models/order.js";
import Product from "../models/product.js";
import { isAdmin, isCustomer } from "./userController.js";

export async function createOrder(req,res){
        console.log(req.body)
        const data=req.body;
        //console.log(data)
        const orderInfo ={
            orderedItems : []
        }
        if(req.user==null){
            res.status(401).json({
                message:"Please login and try again"
            })
            return
        }
        orderInfo.email=req.user.email;

        const lastOrder=await Order.find().sort({orderDate:-1}).limit(1);
        if(lastOrder.length==0){
            orderInfo.orderId="ORD0001";
        }else{
            const lastOrderId= lastOrder[0].orderId;
            const lastOrderNumberInString=lastOrderId.replace("ORD","");
            const lastOrderNumber = parseInt(lastOrderNumberInString);
            const currentOrderNumber = lastOrderNumber + 1;
            const formattedNumber = String(currentOrderNumber).padStart(4, '0');
            orderInfo.orderId="ORD" + formattedNumber
            //console.log(orderInfo.orderId)
        }
        let oneDayCost =0;
        for(let i=0;i<data.orderedItems.length;i++){
            try{
                const product = await Product.findOne({
                    key:data.orderedItems[i].key
                })
                if(product==null){
                    res.status(404).json({
                        message:"product with key"+data.orderedItems[i].key+"not found"
                    })
                    return
                }

                if(product.availability==false){
                    res.status(404).json({
                        message:"product with key"+data.orderedItems[i].key+"is not available"
                    })
                    return
                }
                orderInfo.orderedItems.push({
                    product:{
                        key:product.key,
                        name:product.name,
                        image:product.image[0],
                        price:product.price
                    },
                    quantity:data.orderedItems[i].qty
                })
                oneDayCost +=product.price*data.orderedItems[i].qty
            }catch(e){
                    console.error(e);
                    res.status(500).json({
                        message:"Failed to create order"
                    })
                    return
            }
        }

        orderInfo.days=data.days;   
        orderInfo.startingDate=data.startingDate;
        orderInfo.endingDate = data.endingDate;
        orderInfo.totalAmount=oneDayCost*data.days;

        try{
            const newOrder= new Order(orderInfo);
            const result=await newOrder.save();
            res.json({
                message:"Order created successfully",
                order:result
            })
        }catch(e){
            res.status(500).json({
                message:"Failed to create order",
                error: e.message 
            })
        }

}

export async function getQuote(req,res){
    const data=req.body;
        //console.log(data)
        const orderInfo ={
            orderedItems : []
        }
        
        let oneDayCost =0;
        for(let i=0;i<data.orderedItems.length;i++){
            try{
                const product = await Product.findOne({
                    key:data.orderedItems[i].key
                })
                if(product==null){
                    res.status(404).json({
                        message:"product with key"+data.orderedItems[i].key+"not found"
                    })
                    return
                }

                if(product.availability==false){
                    res.status(404).json({
                        message:"product with key"+data.orderedItems[i].key+"is not available"
                    })
                    return
                }
                orderInfo.orderedItems.push({
                    product:{
                        key:product.key,
                        name:product.name,
                        image:product.image[0],
                        price:product.price
                    },
                    quantity:data.orderedItems[i].qty
                })
                oneDayCost +=product.price*data.orderedItems[i].qty
            }catch(e){
                    console.error(e);
                    res.status(500).json({
                        message:"Failed to create order"
                    })
                    return
            }
        }

        orderInfo.days=data.days;   
        orderInfo.startingDate=data.startingDate;
        orderInfo.endingDate = data.endingDate;
        orderInfo.totalAmount=oneDayCost*data.days;

        try{
            
            
            res.json({
                message:"Order quatation",
                total:orderInfo.totalAmount,
            })
        }catch(e){
            res.status(500).json({
                message:"Failed to create order",
                error: e.message 
            })
        }
}

export async function getOrders(req,res){
    if(isCustomer(req)){
        try{
            const orders=await Order.find({email:req.user.email})
            res.json(orders);
        }catch(e){
            res.status(500).json({
                error:"Faild to get orders"
            });
        }
    }else if(isAdmin(req)){
        try{
            const orders=await Order.find();
            res.json(orders)
        }catch(e){
            res.status(500).json({error:"Failed to get orders"})
        }
    }else{
        res.status(404).json({
            error:"Unauthorized"
        })
    }
}

export async function approveOrRejectOrder(req, res) {
    const orderId = req.params.orderId;
    const status = req.body.status;  
    
    if (isAdmin(req)) {
        try {
            const order = await Order.findOne({ orderId });
            if (!order) {
                return res.status(404).json({ error: "Order not found" });
            }

           
            order.status = status;  
            await order.save();  

            res.json({ message: "Order approved/rejected successfully", order });
        } catch (e) {
            res.status(500).json({ error: "Failed to update order", message: e.message });
        }
    } else {
        res.status(400).json({ error: "Unauthorized" });
    }
}


export async function deleteOrder(req, res) {
  const orderId = req.params.orderId;
  if (isAdmin(req)) {
    try {
      const order = await Order.findOne({ orderId });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await Order.deleteOne({ orderId });
      res.json({ message: "Order deleted successfully" });
    } catch (e) {
      res.status(500).json({ message: "Failed to delete order", error: e.message });
    }
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
}