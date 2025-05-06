import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { products, cartItems, calculateProductDisount, currency,
    removeFromCart, updateCartItems } = useContext(AppContext);
  const [ProductsCart, setProductsCart] = useState([]);
  const navigate = useNavigate();
  // { a:{ 41:1, 42,1 }, b:{ 43:1, 44:1 } }

  // Get Products Cart
  const getProductsCart = () => {
    let productsData = [];
    [...products].map((product) => {
      for (const itmes in cartItems) {
        for (const item in cartItems[itmes]) {
          if (product._id === itmes) {
            productsData.push({
              ...product,
              size: item,
              quantity: cartItems[itmes][item]
            });
          }
        }
      }
    });
    setProductsCart(productsData);
  };

  // Get Products Cart Amount 
  const getProductsCartAmount = () => {
    let productsAmount = 0;
    ProductsCart.map((product) => {
      productsAmount += (product.price - (product.price * (product.discount / 100))) * product.quantity;
    });
    return productsAmount;
  };

  useEffect(() => {
    getProductsCart();
  }, [cartItems, products]);

  return (
    <div className="min-h-screen my-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      <h2 className="mb-10 text-3xl font-semibold text-rgray-700">Your Cart</h2>

      <div className="flex flex-col lg:flex-row item-start justify-start gap-x-10 gap-y-10">

        {/* Left Side */}
        <div className="flex-1 flex flex-col gap-5 mb-10">
          {/* Head */}
          <div className="hidden sm:grid border border-gray-400 py-2 px-3 rounded-md grid-cols-[3fr_1fr_1fr_1fr_0.5fr] text-gray-800 font-medium">
            <p>Product</p>
            <p>Quantity</p>
            <p>Size</p>
            <p>Price</p>
            <p>Action</p>
          </div>
          {/* Body */}
          {
            ProductsCart.map((product, index) => (
              <div key={index} className="border p-5 border-gray-400 rounded-md grid grid-cols-1 gap-4 sm:grid-cols-[3fr_1fr_1fr_1fr_0.5fr] items-center text-base md:text-sm lg:text-base text-gray-700 font-medium">
                {/* Product Details */}
                <div className="flex items-center gap-4">
                  <img src={product.images[0]} className="w-[50px] lg:w-[60px] h-[50px] lg:h-[60px]" />
                  <div className="text-sm font-medium text-gray-700">
                    <p>Title: {product.name}</p>
                    <p>Category: {product.category}</p>
                    <p>Size: {product.size}</p>
                  </div>
                </div>
                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <p className="py-1 px-2  bg-gray-100 border-gray-200 rounded-sm">  {product.quantity}</p>
                  <select value={product.quantity} onChange={(event) => { updateCartItems(product._id, product.size, Number(event.target.value)); }}
                    className="border border-gray-400 rounded-sm p1-0.5 px-0.5 cursor-pointer">
                    {
                      Array.from({ length: 10 }, (_, index) => index + 1).map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))
                    }
                  </select>
                </div>
                {/* Size */}
                <p>{product.size}</p>
                {/* Price */}
                <p>{currency}{(calculateProductDisount(product.price, product.discount)) * product.quantity}</p>
                {/* Delete  */}
                <p
                  onClick={() => { removeFromCart(product._id, product.size); }}
                  className="flex justify-center text-xl text-red-700 cursor-pointer"><IoClose /></p>

              </div>
            ))
          }
        </div>


        {/* Right Side */}
        <div className="w-[450px] lg:w-[300px] h-fit bg-gray-50 p-5 border border-gray-300 rounded-md">

          <div className="mb-5 flex flex-col gap-2">
            <p className="text-2xl font-semibold  text-gray-700">Summary</p>
            <hr className="border-none h-[1px] w-[100%] bg-gray-400" />
          </div>
          {/* Price & shipping */}
          <div className="flex flex-col gap-2 text-gray-600 font-medium">

            <div className="flex flex-row items-center justify-between">
              <p>Price</p>
              <p className="text-[18px]">{currency}{getProductsCartAmount()}</p>
            </div>

            <div className="flex flex-row items-center justify-between">
              <p>Shipping Fee</p>
              <p className="text-[18px]">{currency}{getProductsCartAmount() === 0 ? 0 : 5}</p>
            </div>

            <div className="flex flex-row items-center justify-between">
              <p>Total Amount</p>
              <p className="text-[18px]">{currency}{getProductsCartAmount() === 0 ? 0 : (getProductsCartAmount() + 5)}</p>
            </div>

            <button onClick={() => { navigate("/place-order"); }} className="mt-4 bg-black block w-full text-white py-2 px-4 transition-all duration-300 hover:bg-gray-700 cursor-pointer">Proceed To Checkout</button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
