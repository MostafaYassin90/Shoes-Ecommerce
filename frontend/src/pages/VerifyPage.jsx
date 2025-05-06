import React, { useContext, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Loading from '../components/Loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const VerifyPage = () => {
  const { backend_url, token } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");


  // Verify Order Payment
  const verifyOrder = async () => {
    try {
      const response = await axios.post(backend_url + "/api/order/verify", { success: success, orderId: orderId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        if (response.data.order === "paid") {
          toast.success(response.data.message);
          window.location.replace("/my-orders");
        } else {
          toast.success(response.data.message);
          window.location.replace("/cart");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    verifyOrder();
  }, []);


  return (
    <div className='min-h-[85vh] relative'>
      <Loading />
    </div>
  );
};

export default VerifyPage;
