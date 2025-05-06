import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import axios from "axios";
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAToken }) => {
  const { backend_url } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  // OnSubmit Handerl
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email) {
      toast.error("Please Enter Your Email Address");
      return null;
    }
    if (!password || password.length < 6) {
      toast.error("Password Must Be At Least 6 Character");
      return null;
    }
    try {
      const adminDetails = {
        email: email,
        password: password
      };
      const response = await axios.post(backend_url + "/api/admin/login", adminDetails);
      if (response.data.success) {
        console.log(response);
        window.localStorage.setItem("aToken", response.data.admin.token);
        setAToken(response.data.admin.token);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };



  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className='w-full md:w-[450px] border border-gray-400 rounded-md p-5 shadow-sm bg-white'>
        <h2 className='mb-8 text-center text-gray-800 font-semibold text-xl'><span className='text-primary'>Admin</span> Login</h2>
        <form onSubmit={onSubmitHandler} className='flex flex-col gap-3'>
          {/* Email */}
          <div>
            <label htmlFor='email' className='block ml-1 mb-1 font-medium text-gray-700'>Email</label>
            <input onChange={(event) => { setEmail(event.target.value); }} value={email}
              type="email" id='email' placeholder='Email Address'
              className='block w-full py-2 px-3 border border-gray-400 rounded-md outline-primary' />
          </div>
          {/* Password */}
          <div>
            <label htmlFor='password' className='block ml-1 mb-1 font-medium text-gray-700'>Email</label>
            <input onChange={(event) => { setPassword(event.target.value); }} value={password}
              type="password" id='password' placeholder='Type Here ...'
              className='block w-full py-2 px-3 border border-gray-400 rounded-md outline-primary' />
          </div>

          <button type='submit' className='block w-full py-2 px-4 bg-primary text-white font-medium transition-all duration-300 hover:bg-blue-700 rounded-md mt-5 cursor-pointer'>Login</button>

        </form>
      </div>
    </div>
  );
};

export default Login;
