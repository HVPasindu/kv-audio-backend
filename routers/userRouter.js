import { getUser,registerUser,loginUser, getAllUsers, blockOrUnblockUser} from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();
userRouter.post("/",registerUser);
userRouter.post("/login",loginUser)
userRouter.get("/",getUser);
userRouter.get("/all",getAllUsers);
userRouter.put("/block/:email",blockOrUnblockUser);


export default userRouter;