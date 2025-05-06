import mongoose from "mongoose";


// Product Schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: Array, requried: true },
  price: { type: Number, requried: true },
  discount: { type: Number, required: true },
  color: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  sizes: { type: Array, required: true },
  inStock: { type: Boolean, default: true },
  newArrivals: { type: Boolean, default: true }
}, { timestamps: true, minimize: false });


// Product Model
const ProductModel = mongoose.models.product || mongoose.model("Product", productSchema);

export default ProductModel;