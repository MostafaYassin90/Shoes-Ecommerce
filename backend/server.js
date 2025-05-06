import express from "express";
import cors from 'cors';
import connectDB from "./config/connectDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from './routes/userRoute.js';
import cartRouter from "./routes/cartRoute.js";
import favoriteRouter from "./routes/favoriteRoute.js";
import orderRouter from "./routes/orderRoute.js";
import adminRouter from "./routes/adminRoute.js";
import productRouter from './routes/productRoute.js';
import "dotenv/config";


// App
const app = express();
const port = process.env.PORT || "4000";

// Config
await connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());


// Endpoints
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/favorite", favoriteRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);

app.get("/", async (req, res) => {
  res.send("API Working!");
});


// App Listen
app.listen(port, () => {
  console.log(`Server Is Running On Port ${port}`);
});
