import { getUser,registerUser,loginUser, getAllUsers, blockOrUnblockUser, getUser_2} from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();
userRouter.post("/",registerUser);
userRouter.post("/login",loginUser)
userRouter.get("/",getUser);
userRouter.get("/all",getAllUsers);
userRouter.get("/validate",getUser_2)
userRouter.put("/block/:email",blockOrUnblockUser);


export default userRouter;
//comments