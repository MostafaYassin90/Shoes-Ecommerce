import mongoose from "mongoose";

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  address: { type: Object, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: "Order Placed" },
  method: { type: String, required: true },
  isPaid: { type: Boolean, default: false }
}, { timestamps: true, minimize: false });

// Order Model
const OrderModel = mongoose.models.order || mongoose.model("Order", orderSchema);

export default OrderModel;