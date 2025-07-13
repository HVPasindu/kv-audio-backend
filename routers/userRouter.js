import { getUser,registerUser,loginUser, getAllUsers, blockOrUnblockUser, getUser_2, loginWithGoogle, sendOTP, verifyOTP, getUser_3, registerAdmin, isAdmin} from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();
userRouter.post("/",registerUser);
userRouter.post("/login",loginUser)
userRouter.get("/",getUser);
userRouter.get("/all",getAllUsers);
userRouter.get("/validate",getUser_2)
userRouter.put("/block/:email",blockOrUnblockUser);
userRouter.get("/sendOTP",sendOTP)
userRouter.post("/verifyEmail",verifyOTP)
userRouter.post("/admincheck",getUser_3)
userRouter.post("/admin/register",  registerAdmin,isAdmin)
userRouter.post("/google",loginWithGoogle)




export default userRouter;
//comments - 3