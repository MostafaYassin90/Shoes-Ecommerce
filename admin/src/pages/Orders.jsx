import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { backend_url, currency } from './../App';
import { BsFillBoxSeamFill } from "react-icons/bs";

const Orders = ({ aToken }) => {
  const [orders, setOrders] = useState([]);

  // Get All Orders
  const getAllOrders = async () => {
    try {
      const response = await axios.get(backend_url + "/api/order/admin-orders", {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      return toast.error(error.response.data.message || error.message);
    }
  };

  // update Order Status
  const updateOrderStatus = async (orderId, value) => {
    try {
      const response = await axios.post(backend_url + "/api/order/status", { orderId: orderId, value: value }, {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        getAllOrders();
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  console.log(orders);

  return (
    <div className='py-8 px-[3vw] w-full h-[calc(100vh-70px)] overflow-y-scroll'>

      <div className='flex flex-col gap-5'>
        {
          orders.map((order, index) => (
            <div key={index} className='p-5 border border-gray-400 rounded-md grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr] items-center'>
              {/* Box Image */}
              <div>
                <BsFillBoxSeamFill className='text-5xl text-yellow-700' />
              </div>
              {/* Items */}
              <div className='flex flex-col gap-1 text-sm text-gray-700 font-medium'>
                {
                  order.items.map((item, index) => (
                    <p>{item.name + "x " + item.quantity}</p>
                  ))
                }
              </div>
              {/* Address */}
              <div className='flex flex-col text-sm text-gray-700 font-medium'>
                <p>Name: {order.address.firstName + " " + order.address.lastName}</p>
                <p>country: {order.address.country}, city: {order.address.city}</p>
                <p>Street: {order.address.street}</p>
                <p>phone: {order.address.phone}</p>
              </div>
              {/* Cart Items Count & Amount & payment & ispaid */}
              <div className='flex flex-col text-sm text-gray-700 font-medium'>
                <p>Count: {order.items.length}</p>
                <p>Payment: {order.method}</p>
                <p>Amount:  <span className='text-primary'>{currency}{order.amount}</span></p>
                <div>
                  <span>isPaid: </span>
                  <span className={`${order.isPaid ? "text-green-700" : "text-red-600"}`}>{order.isPaid ? "Paid" : "Not Paid"}</span>
                </div>
              </div>
              {/* Order Status */}
              <div>
                <select onChange={(event) => { updateOrderStatus(order._id, event.target.value); }} value={order.status}
                  className='border border-gray-400 outline-primary cursor-pointer py-1 px-2'>
                  <option value={"Order Placed"}>Order Placed</option>
                  <option value={"Order Shipped"}>Order Shipped</option>
                  <option value={"Out for Delivery"}>Out for Delivery</option>
                  <option value={"Delivered"}>Delivered</option>
                </select>
              </div>


            </div>
          ))
        }
      </div>


    </div>
  );

};

export default Orders;
