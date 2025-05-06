import { useContext, useEffect, useState } from "react";
import { AppContext } from './../context/AppContext';
import toast from "react-hot-toast";
import axios from "axios";
import { BsFillBoxSeamFill } from "react-icons/bs";

const MyOrders = () => {
  const { backend_url, token, currency } = useContext(AppContext);
  const [orders, setOrders] = useState([]);


  // Get Order
  const getOrders = async () => {
    try {
      const response = await axios.get(backend_url + "/api/order/orders", {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);


  return (
    <div className="min-h-screen py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">

      <div className="flex flex-col gap-8">

        {
          orders.map((order, index) => (
            <div key={index} className="grid grid-cols-[1fr_1fr] md:grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] gap-4 text-gray-700 font-medium text-sm lg:text-base items-center py-5 px-3 border border-gray-300 rounded-md shadow-sm">
              {/* image */}
              <div> <BsFillBoxSeamFill className="text-5xl text-yellow-800 mx-auto" /> </div>
              {/* Product Details */}
              <div className="flex flex-col gap-1">
                {order.items.map((item, index) => (
                  <p key={index} className="max-md:mx-auto">{item.name + "x" + item.quantity}</p>
                ))}
              </div>
              {/* Address */}
              <div className="flex flex-col gap-1 max-md:items-center">
                <p>name: {order.address.firstName + order.address.lastName}</p>
                <p>Country: {order.address.country + ", city: " + order.address.city}</p>
                <p>street: {order.address.street}</p>
                <p>Phone: {order.address.phone}</p>
              </div>
              {/* Amount & items length & method */}
              <div className="flex flex-col gap-1">
                <p className="max-md:mx-auto">Amount: {currency}{order.amount}</p>
                <p className="max-md:mx-auto">Items: {order.items.length}</p>
                <p className="max-md:mx-auto">Method: {order.method}</p>
              </div>
              {/* paid or Notpaid */}
              <div className="flex flex-row gap-1 max-md:justify-center">
                <p>Order Paid: </p>
                <p>{order.isPaid ? "Paid" : "Not Paid"}</p>
              </div>
              {/* Status */}
              <div className="max-md:flex max-md:justify-center">
                <p>{order.status}</p>
              </div>
            </div>
          ))
        }

      </div>

    </div>
  );
};

export default MyOrders;
