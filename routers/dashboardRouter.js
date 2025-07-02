// backend/routers/dashboardRouter.js
import express from "express";
import { getDashboardData } from "../controllers/dashboardController.js";
import { isAdmin } from "../controllers/userController.js"; // Middleware to check if the user is an admin

const dashboardRouter = express.Router();

// Define the route to fetch dashboard data
dashboardRouter.get("/dashboard", isAdmin, getDashboardData);

export default dashboardRouter;
