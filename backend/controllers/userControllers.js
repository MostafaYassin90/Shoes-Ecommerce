import { z } from "zod";
import UserModel from './../models/userModel.js';
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


/* ------- User Signup ------- */
const userSignup = async (req, res) => {

  try {
    const data = req.body;
    const fileImage = req.file;

    // Validtion
    const schema = z.object({
      username: z.string({ required_error: "Username Is Requried." }).min(2, { message: "Username Must Be At Least 2 CHaracters." }).max(100),
      email: z.string({ required_error: "Email Is Requried" }).email({ email: "Please Enter a Valid Email." }),
      password: z.string({ required_error: "Password Is Requried" }).min(6, { message: "Password Must Be Al Least 6 Characters." }).max(200)
    });

    const validation = schema.safeParse(data);
    if (!validation.success) {
      return res.status(400).json({ success: false, message: validation.error.errors[0].message });
    }
    // Check username is Exists
    const findUsername = await UserModel.findOne({ username: data.username });
    if (findUsername) {
      return res.status(400).json({ success: false, message: "Username already exists please use a different username" });
    }
    // Check Email Is Exists
    const findEmail = await UserModel.findOne({ email: data.email });
    if (findEmail) {
      return res.status(400).json({ success: false, message: `Email has already been taken.` });
    }
    // Upload Image If Exists
    const result = fileImage && await cloudinary.uploader.upload(fileImage.path, { resource_type: "image" });
    const image_url = result && await result.secure_url;

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // UserDetails 
    const userDetails = {
      username: data.username.trim().replace(" ", "") + Math.random().toString().slice(-2),
      email: data.email,
      password: hashedPassword,
      image: image_url && image_url,
      isAdmin: process.env.ADMIN_EMAIL === data.email && process.env.ADMIN_PASSWORD === data.password ? true : false
    };

    // Create New User
    const newUser = new UserModel(userDetails);

    // Save User
    const user = await newUser.save();

    // Generate Token
    const userJwtPayload = {
      id: user._id,
      isAdmin: user.isAdmin
    };
    const token = jwt.sign(userJwtPayload, process.env.JWT_SECRET_KEY);

    // Destructured User To Send Response 
    const { password, ...other } = user._doc;

    return res.status(201).json({ success: true, user: { ...other, token: token }, message: `Wlecome, ${user.username}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};

/* ------- User Login ------- */
const userLogin = async (req, res) => {

  try {
    const data = req.body;

    // Validation
    const schema = z.object({
      email: z.string({ required_error: "Email Is Required." }).email({ message: "Please Enter a valid email" }),
      password: z.string({ required_error: "Password Is Required" }).min(6, { message: "Password Must Be At Least 6 Characters." }).max(200)
    });

    const validation = schema.safeParse(data);

    if (!validation.success) {
      return res.status(400).json({ success: false, message: validation.error.errors[0].message });
    }

    // Check Email Is Exists
    const user = await UserModel.findOne({ email: data.email });

    if (!user) {
      return res.status(400).json({ success: false, message: "Email Or Password Is Wrong" });
    }

    // Is Mtched Password
    const matchPassword = await bcrypt.compare(data.password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ success: false, message: "Email Or Password Is Wrong" });
    }

    // Generate Token
    const userJwtPayload = {
      id: user._id,
      isAdmin: user.isAdmin
    };

    const token = jwt.sign(userJwtPayload, process.env.JWT_SECRET_KEY);

    // Destructured User To Send Response WithOut Password
    const { password, ...other } = user._doc;

    return res.status(200).json({ success: true, user: { ...other, token: token }, message: `Welcome, ${user.username}` });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};

/* ------- get User ------- */
const getUser = async (req, res) => {
  const { id, isAdmin } = req.user;
  try {

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found" });
    }

    return res.status(200).json({ success: true, user: user });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



export { userSignup, userLogin, getUser };