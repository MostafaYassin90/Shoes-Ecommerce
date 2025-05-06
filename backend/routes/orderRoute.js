import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { getOrderForAdmin, getOrders, payOrderOnline, placeOrder, updateOrderStatus, verifyPayment } from "../controllers/orderControllers.js";
import adminAuth from './../middlewares/adminAuth.js';

const orderRouter = express.Router();

orderRouter.post("/place-order", userAuth, placeOrder);

orderRouter.post("/pay-online", userAuth, payOrderOnline);

orderRouter.post("/verify", userAuth, verifyPayment);

orderRouter.get("/orders", userAuth, getOrders);

orderRouter.get("/admin-orders", adminAuth, getOrderForAdmin);

orderRouter.post("/status", adminAuth, updateOrderStatus);


export default orderRouter;


