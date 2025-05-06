import express from "express";
import { adminLogin, getAdminData, getAllUsers, getDashboardDetails } from "../controllers/adminControllers.js";
import adminAuth from './../middlewares/adminAuth.js';

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/details", adminAuth, getAdminData);

adminRouter.get("/users", adminAuth, getAllUsers);

adminRouter.get("/dashboard", adminAuth, getDashboardDetails);

export default adminRouter;