import express from "express"
import { addReview,getReview,deleteReview,approveReview } from "../controllers/reviewController.js"
import { overViews } from "../controllers/productController.js";

const reviewRouter = express.Router();

reviewRouter.post("/",addReview);
reviewRouter.get("/",getReview);
reviewRouter.delete("/:email",deleteReview)
reviewRouter.put("/approve/:email",approveReview)
reviewRouter.get("/:key",overViews)

export default reviewRouter;

