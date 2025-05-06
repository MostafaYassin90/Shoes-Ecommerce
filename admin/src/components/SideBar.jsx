import React from 'react';
import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";

const SideBar = () => {
  return (
    <div className='sidebar w-fit md:w-[230px] border-r border-gray-400 py-5'>
      <ul className='links flex flex-col gap-2'>

        {/* DashBoard */}
        <NavLink to={"/"} className="flex flex-row items-center gap-3 py-3 px-[2vw] transition-all duration-300 hover:bg-gray-200">
          <LuLayoutDashboard className='text-2xl' />
          <p className="hidden md:block">Dashboard</p>
        </NavLink>
        {/* Add Product */}
        <NavLink to={"/add-product"} className="flex flex-row items-center gap-3 py-3 px-[2vw] transition-all duration-300 hover:bg-gray-200">
          <IoIosAddCircleOutline className='text-2xl' />
          <p className="hidden md:block">Add Product</p>
        </NavLink>
        {/* Products List */}
        <NavLink to={"products-list"} className="flex flex-row items-center gap-3 py-3 px-[2vw] transition-all duration-300 hover:bg-gray-200">
          <FaListUl className='text-2xl' />
          <p className="hidden md:block">Products List</p>
        </NavLink>
        {/* Orders */}
        <NavLink to={"/orders"} className="flex flex-row items-center gap-3 py-3 px-[2vw] transition-all duration-300 hover:bg-gray-200">
          <FaRegCircleCheck className='text-2xl' />
          <p className="hidden md:block">Orders</p>
        </NavLink>
        {/* Users */}
        <NavLink to={"/users"} className="flex flex-row items-center gap-3 py-3 px-[2vw] transition-all duration-300 hover:bg-gray-200">
          <LuUsers className='text-2xl' />
          <p className="hidden md:block">Users</p>
        </NavLink>

      </ul>
    </div>
  );
};

export default SideBar;
