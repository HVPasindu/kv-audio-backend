import express from "express";
import { addInquiry,getInquiry,deleteInquiry } from "../controllers/inquiryController.js";

const InquiryRouter =express.Router();
InquiryRouter.post("/",addInquiry);
InquiryRouter.get("/get",getInquiry);
InquiryRouter.delete("/delete/:id",deleteInquiry);

export default InquiryRouter;