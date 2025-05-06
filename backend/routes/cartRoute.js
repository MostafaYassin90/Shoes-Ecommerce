import express from "express";
import { addToCart, getCartItems, removeFomCart, updateCartItems } from "../controllers/cartControllers.js";
import userAuth from './../middlewares/userAuth.js';

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);

cartRouter.post("/remove", userAuth, removeFomCart);

cartRouter.post("/update", userAuth, updateCartItems);

cartRouter.get("/cartitems", userAuth, getCartItems);

export default cartRouter;