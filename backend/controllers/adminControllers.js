import UserModel from './../models/userModel.js';
import ProductModel from './../models/productModel.js';
import OrderModel from './../models/orderModel.js';
import jwt from 'jsonwebtoken';
import "dotenv/config";


/* --------- Admin Login --------- */

const adminLogin = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      // Find admin
      const admin = await UserModel.findOne({ email: email });

      // Generate Token
      const adminJwtPayload = {
        id: admin._id,
        isAdmin: admin.isAdmin
      };

      const token = jwt.sign(adminJwtPayload, process.env.JWT_SECRET_KEY);

      const { password, ...other } = admin._doc;

      return res.status(200).json({ success: true, admin: { ...other, token: token }, message: `Welcome, ${admin.username}` });


    } else {
      return res.status(400).json({ success: false, message: "Invalid Credientails" });
    }

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};

/* --------- Get Admin Data --------- */
const getAdminData = async (req, res) => {

  try {
    const { id: adminId } = req.admin;

    const admin = await UserModel.findById(adminId).select("-password");

    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin Not Token." });
    }

    return res.status(200).json({ success: true, admin: admin });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};


/* -------- Get All Users -------- */
const getAllUsers = async (req, res) => {
  try {

    const users = await UserModel.find({ isAdmin: false });

    return res.status(200).json({ success: true, users: users });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* -------- Get Dashboard Details -------- */
const getDashboardDetails = async (req, res) => {
  try {

    const products = await ProductModel.find({});
    const orders = await OrderModel.find({});
    const users = await UserModel.find({});

    // Get Orders Profit
    const getOrderProfit = () => {
      let ordersAmount = 0;
      orders.map((order) => (
        ordersAmount += order.amount
      ));
      return ordersAmount;
    };

    // Return Length Of This Data Like products, users,orders
    const dashboardData = [
      { name: "Products", count: products.length, icon: "product" },
      { name: "Orders", count: orders.length, icon: "order" },
      { name: "Users", count: users.length, icon: "user" },
      { name: "Order Total", count: getOrderProfit(), icon: "ordertotal" },
    ];

    return res.status(200).json({ success: true, dashboardDetails: dashboardData });


  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  adminLogin,
  getAdminData,
  getAllUsers,
  getDashboardDetails
};