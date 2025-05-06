import express from "express";
import adminAuth from './../middlewares/adminAuth.js';
import { addProduct, deleteProduct, getAllProducts, updateInStock, updateNewArrivals } from "../controllers/productControllers.js";
import upload from "../middlewares/upload.js";


const productRouter = express.Router();

productRouter.post("/add", adminAuth, upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 }]), addProduct);

productRouter.get("/list", getAllProducts);

productRouter.post("/instock", adminAuth, updateInStock);

productRouter.post("/newarrivals", adminAuth, updateNewArrivals);

productRouter.post("/delete", adminAuth, deleteProduct);

export default productRouter;