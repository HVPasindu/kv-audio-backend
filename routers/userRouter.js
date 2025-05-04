import { getUser,registerUser } from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();
userRouter.post("/",registerUser);
userRouter.get("/",getUser);

export default userRouter;