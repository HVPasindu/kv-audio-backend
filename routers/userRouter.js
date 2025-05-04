import { getUser,postUser } from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();
userRouter.post("/",postUser);
userRouter.get("/",getUser);

export default userRouter;