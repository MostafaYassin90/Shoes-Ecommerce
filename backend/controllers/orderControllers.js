import OrderModel from '../models/orderModel.js';
import UserModel from '../models/userModel.js';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* -------- Place Order ----------- */

const placeOrder = async (req, res) => {
  try {
    const { items, address, method, amount } = req.body;
    const { id: userId } = req.user;
    if (!items || !address || !method) {
      return res.status(400).json({ success: false, message: "The required data is missing" });
    }
    // Collect Order Details
    const orderDetails = {
      userId: userId,
      items: items,
      address: address,
      amount: amount,
      method: method,
      isPaid: false
    };
    // Create A New Order
    const newOrder = new OrderModel(orderDetails);
    const order = await newOrder.save();
    // Find User And Extract CartItems And Delete It
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found" });
    }
    await UserModel.findByIdAndUpdate(userId, {
      cartItems: {}
    });
    return res.status(201).json({ success: true, order: order, message: "Order Added Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};

/* -------- pay-online ----------- */
const payOrderOnline = async (req, res) => {

  const frontend_url = "http://localhost:5173";

  const { items, address, amount, method } = req.body;
  const { id: userId } = req.user;

  // Validation
  if (!items || !address || !amount || !method) {
    return res.status(400).json({ success: false, message: "The Requireds Data Is Missing" });
  }

  const orderDetails = {
    userId: userId,
    items: items,
    address: address,
    amount: amount,
    method: method,
  };

  // Create New Order
  const newOrder = new OrderModel(orderDetails);
  const order = await newOrder.save();

  // Stripe 
  let line_items = items.map((item) => ({
    price_data: {
      currency: "USD",
      product_data: {
        name: item.name
      },
      unit_amount: ((item.price - (item.price * (item.discount / 100))) * 100)
    },
    quantity: item.quantity
  }));

  // Delivery Charges
  line_items.push({
    price_data: {
      currency: "USD",
      product_data: {
        name: "Delivery Charges"
      },
      unit_amount: 5 * 100
    },
    quantity: 1
  });

  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: "payment",
    success_url: `${frontend_url}/verify?success=true&orderId=${order._id}`,
    cancel_url: `${frontend_url}/verify?success=false&orderId=${order._id}`
  });

  return res.status(201).json({ success: true, session_url: session.url });

};

/* -------- VerifyPayment ----------- */
const verifyPayment = async (req, res) => {
  const { success, orderId } = req.body;
  const { id: userId } = req.user;

  if (!success || !orderId) {
    return res.status(400).json({ success: fasle, message: "The Requireds Data Is Missing" });
  }

  if (success === "true") {

    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order Not Found" });
    }

    await OrderModel.findByIdAndUpdate(orderId, {
      $set: {
        isPaid: true
      }
    });

    // Find User And Delete His CartItems
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        cartItems: {}
      }
    });

    return res.status(200).json({ success: true, order: "paid", message: "Order paid successfully" });
  } else {
    // Delete Order From DB
    await OrderModel.findByIdAndDelete(orderId);
    return res.status(200).json({ success: true, order: "notPaid", message: "Payment cancelled" });
  }

};


/* -------- Get Orders Based On UserId ----------- */
const getOrders = async (req, res) => {
  try {

    const { id: userId } = req.user;

    const orders = await OrderModel.find({ userId: userId });

    return res.status(200).json({ success: true, orders: orders });

  } catch (error) {
    return res.status(500).json({ success: fasle, message: error.message });
  }
};


/* -------- Get All Order For Admin ----------- */
const getOrderForAdmin = async (req, res) => {
  try {
    const orders = await OrderModel.find({});

    return res.status(200).json({ success: true, orders: orders });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


/* -------- Get All Order For Admin ----------- */
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, value } = req.body;

    // Find Order
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order Not Found" });
    }

    if (value === "Delivered") {
      // Update Order Status
      await OrderModel.findByIdAndUpdate(orderId, {
        $set: {
          status: value
        }
      });

      // Then Is Status Is Deliver Thats Mean Order Is Paid
      await OrderModel.findByIdAndUpdate(orderId, {
        $set: {
          isPaid: true
        }
      });

    } else {
      // Update Order Status
      await OrderModel.findByIdAndUpdate(orderId, {
        $set: {
          status: value
        }
      });
    }

    return res.status(200).json({ success: true, message: "Order Status Updated." });


  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};





export {
  placeOrder,
  payOrderOnline,
  verifyPayment,
  getOrders,
  getOrderForAdmin,
  updateOrderStatus,
};