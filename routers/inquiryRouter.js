import express from "express";
import { addInquiry,getInquiry,deleteInquiry,inquiriesUpdate } from "../controllers/inquiryController.js";

const InquiryRouter =express.Router();
InquiryRouter.post("/",addInquiry);
InquiryRouter.get("/get",getInquiry);
InquiryRouter.delete("/delete/:id",deleteInquiry);
InquiryRouter.put("/update/:id",inquiriesUpdate);

export default InquiryRouter;