import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import AddProduct from './pages/AddProduct';
import Login from './pages/auth/login';
import ProductsList from './pages/ProductsList';
import Orders from './pages/Orders';
import Users from './pages/Users';

export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");

  return !aToken ? <Login setAToken={setAToken} /> : (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar setAToken={setAToken} aToken={aToken} />
      <div className='flex item-start h-[calc(100vh-70px)]'>
        <SideBar />
        <Routes>
          <Route path='/' element={<Dashboard aToken={aToken} />} />
          <Route path='/add-product' element={<AddProduct aToken={aToken} />} />
          <Route path='/products-list' element={<ProductsList aToken={aToken} />} />
          <Route path='/orders' element={<Orders aToken={aToken} />} />
          <Route path='/users' element={<Users aToken={aToken} />} />
        </Routes>
      </div>
    </div>
  );

};

export default App;
