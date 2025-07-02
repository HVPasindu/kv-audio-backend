import express from 'express';
import { approveOrRejectOrder, createOrder, deleteOrder, getOrders, getQuote } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/",createOrder);
orderRouter.post("/quote",getQuote);
orderRouter.get("/",getOrders);
orderRouter.put("/status/:orderId",approveOrRejectOrder)
orderRouter.delete("/:orderId", deleteOrder);

export default orderRouter;