import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoWater } from "react-icons/io5";
import toast from 'react-hot-toast';
import axios from 'axios';
import { backend_url } from '../App';

const Navbar = ({ aToken, setAToken }) => {
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  // Get Admin
  const getAdminData = async () => {
    try {
      const response = await axios.get(backend_url + "/api/admin/details", {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        setAdminData(response.data.admin);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };
  // Logout Handler
  const logoutHandler = () => {
    window.localStorage.removeItem("aToken");
    setAToken("");
    setAdminData(null);
    navigate("/");
  };

  useEffect(() => {
    if (aToken) {
      getAdminData();
    }
  }, [aToken]);


  return (
    <div className='h-[70px] py-4 px-[3vw] flex flex-items justify-between border-b border-gray-400'>
      {/* Logo */}
      <Link to={"/"} className="flex items-center">
        <IoWater className="text-3xl text-primary" />
        <p className="text-3xl text-gray-700 font-medium">In<span className="text-primary font-bold">F</span>inite</p>
      </Link>

      {/* Swithc Between Logout & Admin Data */}
      {
        adminData
        &&
        <div className='cursor-pointer relative group'>
          <div className='flex items-center gap-3'>
            <p className='text-gray-700 text-sm font-medium'>Welcome, {adminData.username}</p>
            <img src={adminData.image} alt='admin-image' className='w-10 h-10 rounded-full p-[2px] bg-gray-400 border border-primary' />
          </div>
          <div className='absolute hidden group-hover:block right-0 top-[100%] bg-transparent w-[200px] transition-all durtion-300'>
            <div className='bg-black text-white mt-4'>
              <button onClick={logoutHandler} className='py-3 px-3 transition-all duration-300 hover:bg-gray-700 block w-full cursor-pointer text-left font-medium'>Logout</button>
            </div>
          </div>
        </div>
      }

    </div>
  );
};

export default Navbar;
