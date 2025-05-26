import express from "express";
import { addInquiry } from "../controllers/inquiryController.js";

const InquiryRouter =express.Router();
InquiryRouter.post("/",addInquiry);

export default InquiryRouter;