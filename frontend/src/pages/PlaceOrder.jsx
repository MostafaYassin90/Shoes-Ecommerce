import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const { products, currency, cartItems, userData, backend_url, token } = useContext(AppContext);
  const [productsCart, setProductsCart] = useState([]);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    street: "",
    phone: "",
    state: "",
    zipcode: ""
  });
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/cart");
      toast.error("Please Login First");
    }
  }, [userData]);

  // onChange Handler
  const onChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Get Products Cart
  const collectProductsCart = () => {
    let cartData = [];
    [...products].map((product) => { // { a: { 41 : 1, 42 : 1 } }
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (product._id === items) {
            cartData.push({
              ...product,
              size: item,
              quantity: cartItems[items][item]
            });
          }
        }
      }
    });
    setProductsCart(cartData);
  };

  // Get Products Cart Amout 
  const calculateProductCartAmount = () => {
    let productsCartAmount = 0;
    productsCart.map((product) => {
      productsCartAmount +=
        ((product.price - (product.price * product.discount / 100)) * product.quantity);
    });
    return productsCartAmount;
  };

  // OnSubmit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!method) {
      toast.error("Please Select Your Payment Method");
      return null;
    }
    // Collect Order Details
    const orderDetails = {
      items: productsCart,
      address: address,
      amount: calculateProductCartAmount() + 5,
      method: method
    };
    if (method === "COD") {
      try {
        const response = await axios.post(backend_url + "/api/order/place-order", orderDetails, {
          headers: { authorization: "Bearer " + token }
        });
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/my-orders");
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }

    } else {
      try {
        const response = await axios.post(backend_url + "/api/order/pay-online", orderDetails, {
          headers: { authorization: "Bearer " + token }
        });
        console.log(response);
        if (response.data.success) {
          window.location.replace(response.data.session_url);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || error.message);
      }
    }

  };

  useEffect(() => {
    collectProductsCart();
  }, [products, cartItems]);

  return (
    <form onSubmit={onSubmitHandler} className="py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw] flex flex-col md:flex-row items-start gap-10 md:gap-20 lg:gap-60">

      {/* Left Side */}
      <div className="w-full md:flex-1">
        <h2 className="text-2xl font-semibold text-gray-700 mb-5">Delivery Information</h2>
        <div className="flex-1 flex flex-col gap-4">
          {/* FirstName & LastName */}
          <div className="flex items-center gap-4">
            <input value={address.firstName} onChange={onChangeHandler}
              type="text" placeholder="FirstName" name="firstName" required
              className="block w-full py-1.5 px-3 rounded-md border border-gray-400" />
            <input value={address.lastName} onChange={onChangeHandler}
              type="text" placeholder="LastName" name="lastName" required
              className="block w-full py-1.5 px-3 rounded-md border border-gray-400" />
          </div>
          {/* Email */}
          <input value={address.email} onChange={onChangeHandler}
            type="email" placeholder="Email Address" name="email" required
            className="block w-full py-1.5 px-3 rounded-md border border-gray-400" />
          {/* Country */}
          <input value={address.country} onChange={onChangeHandler}
            type="text" placeholder="Country" name="country" required
            className="block w-full py-1.5 px-3 rounded-md border border-gray-400" />
          {/* City */}
          <input value={address.city} onChange={onChangeHandler}
            ype="text" placeholder="City" name="city" required
            className="block w-full py-1.5 px-3 rounded-md border border-gray-400" />
          {/* Street */}
          <input value={address.street} onChange={onChangeHandler}
            type="text" placeholder="Street" name="street" required
            className="block w-full py-1.5 px-3 rounded-md border border-gray-400" />
          {/* Phone */}
          <input value={address.phone} onChange={onChangeHandler}
            type="number" placeholder="Phone" name="phone" required
            className="block w-full py-1.5 px-3 rounded-md border border-gray-400" />
          {/* State & Zipcode */}
          <div className="flex items-center gap-4">
            <input value={address.state} onChange={onChangeHandler}
              type="text" placeholder="State" name="state" required
              className="block w-full py-1.5 px-3 rounded-md border border-gray-400" />
            <input value={address.zipcode} onChange={onChangeHandler}
              type="text" placeholder="Zipcode" name="zipcode" required
              className="block w-full py-1.5 px-3 rounded-md border border-gray-400" />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:flex-1 flex flex-col gap-8">

        {/* Start Cart Total */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-5">Cart Total</h2>
          <div className="flex flex-col gap-3">
            <div className="flex flex-items-center justify-between text-gray-700 font-medium">
              <p>Subtotal</p>
              <p>{currency}{calculateProductCartAmount()}</p>
            </div>
            <div className="flex flex-items-center justify-between text-gray-700 font-medium">
              <p>Delivery Fee</p>
              <p>{currency}{calculateProductCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <div className="flex flex-items-center justify-between text-gray-700 font-medium">
              <p className="font-bold">Total</p>
              <p className="font-bold">{currency}{calculateProductCartAmount() === 0 ? 0 : (calculateProductCartAmount() + 5)}</p>
            </div>
          </div>
        </div>
        {/* End Cart Total*/}

        <hr className="border-none h-[1px] w-[100%] bg-gray-300" />

        {/* Start Payment Method */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-5">Payment Method</h2>
          <div className="flex flex-col gap-4">

            <div onClick={() => { setMethod("COD"); }} className="w-[220px] border border-gray-600 rounded-md py-2 px-3 flex items-center gap-3 cursor-pointer text-[17px] font-medium hover:bg-blue-100">
              <span className={`block h-3 w-3 rounded-full ${method === "COD" ? "bg-green-600" : "bg-gray-600"}`}></span>
              <span>Cash On Delivery</span>
            </div>

            <div onClick={() => { setMethod("Online"); }} className="w-[220px] border border-gray-600 rounded-md py-2 px-3 flex items-center gap-3 cursor-pointer text-[17px] font-medium hover:bg-blue-100">
              <span className={`block h-3 w-3 rounded-full ${method === "Online" ? "bg-green-600" : "bg-gray-600"}`}></span>
              <span>Online</span>
            </div>

          </div>
        </div>
        {/* End Payment Method */}

        {/* Place Order */}
        <button type="submit" className="block w-[200px] border border-primary bg-primary text-white py-2 px-[3] rounded-md cursor-pointer transition-all duration-300 hover:bg-blue-700">Place Order</button>

      </div>

    </form>
  );
};

export default PlaceOrder;


/* 
 {
  orderId: aaa,
  items: [],
  address: {},
  amount: 55,
  status: "order Placed",
  Method: "cod / online",
  paid: "true / false" ,
  createdAt: 1/2/3,
  updatedAt: 1/2/3
 }
*/