import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { backend_url, currency } from './../App';
import axios from 'axios';
import { FaListUl } from "react-icons/fa"; // pro
import { GiCardboardBoxClosed } from "react-icons/gi"; // orders
import { PiUsersThreeLight } from "react-icons/pi"; //users
import { FcMoneyTransfer } from "react-icons/fc";


const Dashboard = ({ aToken }) => {
  const [details, setDetails] = useState([]);

  // Get Dashboard Details
  const getDashboardDetails = async () => {
    try {
      const response = await axios.get(backend_url + "/api/admin/dashboard", {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        setDetails(response.data.dashboardDetails);
      }
    } catch (error) {
      return toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getDashboardDetails();
  }, []);

  console.log(details);

  return (
    <div className='py-8 px-[3vw] w-full h-[calc(100vh-70px)] overflow-y-scroll'>
      <div className="grid grid-cols-auto gap-10">
        {
          details.map((item, index) => (
            <div key={index} className='border border-gray-400 rounded-md p-5 flex items-center justify-between text-gray-700 font-medium gap-2'>
              <div className='flex items-center gap-3'>
                <p className='text-gray-700 font-medium'>{item.name}:</p>
                <p className='text-primary font-medium'>{item.name === "Order Total" && currency}{item.count}</p>
              </div>
              <p>{
                item.icon === "product"
                  ? <FaListUl className='text-3xl text-primary' />
                  : item.icon === "order"
                    ? <GiCardboardBoxClosed className='text-3xl text-primary' />
                    : item.icon === "user"
                      ? <PiUsersThreeLight className='text-3xl text-primary' />
                      : <FcMoneyTransfer className='text-3xl text-primary' />
              }</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Dashboard;
