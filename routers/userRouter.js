import { getUser,registerUser,loginUser} from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();
userRouter.post("/",registerUser);
userRouter.post("/login",loginUser)
userRouter.get("/",getUser);


export default userRouter;