import { IoWater } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";


const Navbar = () => {
  const { userData, setToken, setUserData } = useContext(AppContext);
  const [showLinks, setShowLinks] = useState(false);
  const navigate = useNavigate();


  // Logout Handler
  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    setToken("");
    setUserData(null);
    toast.success("logged out");
    navigate("/");
  };

  return (
    <div className="relative h-[69px] py-4 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw] 
    flex items-center justify-between gap-4 border-b border-gray-200">

      {/* Logo */}
      <Link to={"/"} className="flex items-center">
        <IoWater className="text-3xl text-primary" />
        <p className="text-3xl text-gray-700 font-medium">In<span className="text-primary font-bold">F</span>inite</p>
      </Link>

      {/* Links*/}
      <ul className="hidden md:flex items-center gap-2 navbar-links">
        <NavLink to={"/shop"} className="py-1 px-3 font-medium text-gray-700 text-[15px] lg:text-base ">Shop</NavLink>
        <NavLink to={"/men"} className="py-1 px-3 font-medium text-gray-700 text-[15px] lg:text-base ">Men</NavLink>
        <NavLink to={"/women"} className="py-1 px-3 font-medium text-gray-700 text-[15px] lg:text-base ">Women</NavLink>
        <NavLink to={"/kids"} className="py-1 px-3 font-medium text-gray-700 text-[15px] lg:text-base ">Kids</NavLink>
        <NavLink to={"/new"} className="py-1 px-3 font-medium text-gray-700 text-[15px] lg:text-base ">New</NavLink>
        <NavLink to={"/about"} className="py-1 px-3 font-medium text-gray-700 text-[15px] lg:text-base ">About Us</NavLink>
      </ul>

      {/* Login Btn & Toggle Menu */}
      <div className="flex items-center gap-5">


        {/* Switch Between Login And UserData */}
        {
          userData
            ?
            <div className="relative group">
              <img src={userData.image} alt="user-image" className="w-10 h-10 p-[2px] bg-gray-200 border border-primary rounded-full cursor-pointer" />
              <div className="absolute hidden top-[100%] group-hover:block right-[-5px] bg-transparent w-[220px] z-50">
                <div className="bg-black text-white mt-4 py-1.5 border border-gray-400 shadow-lg rounded-md flex flex-col gap-1">
                  <Link to={"/profile"} className="block w-full py-1.5 px-3 text-left text-gray-100 font-medium transition-all duration-300 hover:bg-gray-600 cursor-pointer">Profile</Link>
                  <Link to={"/my-orders"} className="block w-full py-1.5 px-3 text-left text-gray-100 font-medium transition-all duration-300 hover:bg-gray-600 cursor-pointer">My Orders</Link>
                  {userData.isAdmin &&
                    <Link to={"http://localhost:5174"} target="_blank" className="block w-full py-1.5 px-3 text-left text-gray-100 font-medium transition-all duration-300 hover:bg-gray-600 cursor-pointer">Dashboard</Link>
                  }
                  <button onClick={logoutHandler} className="block w-full py-1.5 px-3 text-left text-gray-100 font-medium transition-all duration-300 hover:bg-gray-600 cursor-pointer">Logout</button>
                </div>
              </div>
            </div>
            :
            <button onClick={() => { navigate("/login"); }} className="block w-fit py-1 px-5 rounded-md bg-primary text-white cursor-pointer transition-all duration-300 hover:bg-blue-700">
              Login
            </button>
        }


        {/* Show Menu in md screen */}
        <div className="inline-block md:hidden">
          <IoMdMenu className="text-4xl cursor-pointer"
            onClick={() => { setShowLinks((prev) => !prev); }}
          />
        </div>
      </div>

      {/* Show Links For sm Screen Only */}
      <div className={`responsive-links absolute bg-black z-50 top-[100%] right-0 transition-all duration-500  ${showLinks ? "w-full" : "w-0"} overflow-hidden md:hidden`}>
        <ul className="flex flex-col gap-1 py-5 link-secondary">
          <NavLink to={"/shop"} className="py-2 px-5 font-medium text-gray-100 transition-all duration-300 hover:bg-[#454545]" onClick={() => { setShowLinks(false); }}>Shop</NavLink>
          <NavLink to={"/men"} className="py-2 px-5 font-medium text-gray-100 transition-all duration-300 hover:bg-[#454545]" onClick={() => { setShowLinks(false); }}>Men</NavLink>
          <NavLink to={"/women"} className="py-2 px-5 font-medium text-gray-100 transition-all duration-300 hover:bg-[#454545]" onClick={() => { setShowLinks(false); }}>Women</NavLink>
          <NavLink to={"/kids"} className="py-2 px-5 font-medium text-gray-100 transition-all duration-300 hover:bg-[#454545]" onClick={() => { setShowLinks(false); }}>Kids</NavLink>
          <NavLink to={"/new"} className="py-2 px-5 font-medium text-gray-100 transition-all duration-300 hover:bg-[#454545]" onClick={() => { setShowLinks(false); }}>New</NavLink>
          <NavLink to={"/about"} className="py-2 px-5 font-medium text-gray-100 transition-all duration-300 hover:bg-[#454545]" onClick={() => { setShowLinks(false); }}>About Us</NavLink>
        </ul>
      </div>

    </div>
  );
};

export default Navbar;


/*
   <div>
   <input className="text" placeholder="Search ..." />
   <IoSearch />
 </div>
*/ 