
import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { isAdmin } from "../controllers/userController.js"; 

const dashboardRouter = express.Router();


dashboardRouter.get("/dashboard", isAdmin, getDashboardData);

export default dashboardRouter;
