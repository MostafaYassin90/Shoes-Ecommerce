import UserModel from "../models/userModel.js";


/* --------- Add To Cart ---------- */
const addToCart = async (req, res) => {

  try {
    const { productId, size } = req.body;
    const { id, isAdmin } = req.user;

    // Find User
    const user = await UserModel.findById(id);
    let cartItems = await user.cartItems; // { a:{ 41: 1 } }

    if (cartItems[productId]) {
      if (cartItems[productId][size]) {
        cartItems[productId][size] += 1;
      } else {
        cartItems[productId][size] = 1;
      }
    } else {
      cartItems[productId] = {};
      cartItems[productId][size] = 1;
    }

    await UserModel.findByIdAndUpdate(id, {
      $set: {
        cartItems: cartItems
      }
    });

    return res.status(201).json({ success: true, message: "Added To Cart" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }


};


/* --------- Remove From Cart ---------- */
const removeFomCart = async (req, res) => {
  try {
    // { a:{ 41: 1, 42:1 }, { b: { 43: 1, 44:1 } }}
    const { productId, size } = req.body;
    const { id } = req.user;

    // Find User Then Extract CartItems
    const user = await UserModel.findById(id);
    let cartItems = await user.cartItems;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (productId === items && size === item) {
          delete cartItems[items][item];
        }
      }
    }

    await UserModel.findByIdAndUpdate(id, {
      $set: {
        cartItems: cartItems
      }
    });

    return res.status(200).json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }


};


/* --------- Update Cart Items ---------- */
const updateCartItems = async (req, res) => {

  try {
    // { a:{ 41: 1, 42:1 }, { b: { 43: 1, 44:1 } }}

    const { productId, size, value } = req.body;
    const { id, isAdmin } = req.user;

    // Find User
    const user = await UserModel.findById(id);
    const cartItems = await user.cartItems;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (productId === items && size === item) {
          cartItems[items][item] = value;
        }
      }
    }

    await UserModel.findByIdAndUpdate(id, {
      $set: {
        cartItems: cartItems
      }
    });

    return res.status(200).json({ success: true, message: "Cart Updated Successfully" });

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

};


/* --------- Get Cart Items ---------- */
const getCartItems = async (req, res) => {
  try {
    const { id } = req.user;
    // Find User
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found" });
    }
    const cartItems = await user.cartItems;

    return res.status(200).json({ success: true, cartItems: cartItems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export { addToCart, removeFomCart, updateCartItems, getCartItems };