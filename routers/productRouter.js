import express from "express"
import { addProduct,getProduct, updateProduct,deleteProduct, overViews } from "../controllers/productController.js"


const productRouter = express.Router();
productRouter.post("/",addProduct);
productRouter.get("/",getProduct);
productRouter.put("/:key",updateProduct);
productRouter.delete("/:key",deleteProduct);
productRouter.get("/:key",overViews);

export default productRouter;