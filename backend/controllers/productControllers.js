import { v2 as cloudinary } from "cloudinary";
import ProductModel from './../models/productModel.js';

/* -------- Add Product -------- */
const addProduct = async (req, res) => {

  try {
    const { title, description, price, discount, color, brand, category, sizes }
      = req.body;
    const imageFiles = req.files; // {}
    const image1 = imageFiles.image1 && imageFiles.image1[0];
    const image2 = imageFiles.image2 && imageFiles.image2[0];
    const image3 = imageFiles.image3 && imageFiles.image3[0];
    const image4 = imageFiles.image4 && imageFiles.image4[0];

    // Validation
    if (!image1 && !image2 && !image3 && !image4) {
      return res.status(400).json({ success: false, message: "Please Select Your Product Image" });
    }
    if (category === "Select Category") {
      return res.status(400).json({ success: false, message: "Please Select Your Product Categroy" });
    }
    if (sizes.length === 0) {
      return res.status(400).json({ success: false, message: "Please Select Your Product Size" });
    }
    if (!title || !description || !price || !discount || !color || !brand || !category) {
      return res.status(400).json({ success: false, message: "The Requireds Data Is Missing" });
    }

    // Collect Images
    const images = [image1, image2, image3, image4].filter((img) => {
      return img !== undefined;
    });

    // Upload Images To Cloudinary
    const iamges_url = await Promise.all(images.map(async (img) => (
      (await cloudinary.uploader.upload(img.path, { resource_type: "image" })).secure_url
    )));

    // Product Details 
    const productDetails = {
      title: title,
      description: description,
      images: iamges_url,
      price: Number(price),
      discount: Number(discount),
      color: color,
      brand: brand,
      category: category,
      sizes: JSON.parse(sizes)
    };

    // Create a New Product
    const newProduct = new ProductModel(productDetails);

    const product = await newProduct.save();

    return res.status(201).json({ success: true, product, product, message: "Product Added Successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};

/* -------- Get All Products -------- */
const getAllProducts = async (req, res) => {
  try {
    const products = (await ProductModel.find({})).reverse();
    return res.status(200).json({ success: true, products: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* -------- Update InStock -------- */
const updateInStock = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product Not Found" });
    }

    // Change Product InStock
    await ProductModel.findByIdAndUpdate(productId, {
      $set: {
        inStock: !product.inStock
      }
    }, { new: true });

    return res.status(200).json({ success: true, message: "InStock Updated Successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.messages });
  }
};


/* -------- Update InStock -------- */
const updateNewArrivals = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product Not Found" });
    }

    // Change Product InStock
    await ProductModel.findByIdAndUpdate(productId, {
      $set: {
        newArrivals: !product.newArrivals
      }
    }, { new: true });

    return res.status(200).json({ success: true, message: "New Arrivals Updated Successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.messages });
  }
};

/* -------- Delete Product -------- */
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product Not Found" });
    }

    // Delete Product 
    await ProductModel.findByIdAndDelete(productId);

    return res.status(200).json({ success: true, message: "Product Delete Successfully" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  getAllProducts,
  updateInStock,
  updateNewArrivals,
  deleteProduct
};