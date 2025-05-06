import express from "express";
import { getUser, userLogin, userSignup } from "../controllers/userControllers.js";
import upload from './../middlewares/upload.js';
import userAuth from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.post("/signup", upload.single("image"), userSignup);


userRouter.post("/login", userLogin);

userRouter.get("/user", userAuth, getUser);


export default userRouter;