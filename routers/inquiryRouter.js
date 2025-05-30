import express from "express";
import { addInquiry,getInquiry } from "../controllers/inquiryController.js";

const InquiryRouter =express.Router();
InquiryRouter.post("/",addInquiry);
InquiryRouter.get("/get",getInquiry);

export default InquiryRouter;