import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from "axios";
import { backend_url, currency } from './../App';

const ProductsList = ({ aToken }) => {
  const [products, setProducts] = useState([]);

  // Get All Products
  const getAllProducts = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // Get Product Offer After Discount
  const getProductOffer = (price, discount) => {
    const productOfffer = (price - (price * (discount / 100)));
    return productOfffer;
  };

  // Update InStock
  const updateInStock = async (productId) => {
    try {
      const response = await axios.post(backend_url + "/api/product/instock", { productId: productId }, {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        getAllProducts();
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // Update NewArrivals
  const showNewArivals = async (productId) => {
    try {
      const response = await axios.post(backend_url + "/api/product/newarrivals", { productId: productId }, {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        getAllProducts();
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // Delete Product
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.post(backend_url + "/api/product/delete", { productId: productId }, {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        getAllProducts();
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };


  useEffect(() => {
    getAllProducts();
  }, []);


  return (
    <div className='py-8 px-[3vw] w-full h-[calc(100vh-[70px])] overflow-y-scroll'>

      {/* Head */}
      <div className='hidden md:grid grid-cols-[4fr_1fr_1fr_0.5fr] items-center border border-gray-400 rounded-md mb-5 py-2 px-3 font-medium text-gray-700'>
        <p>Product Details</p>
        <p>InStock</p>
        <p>NewArrivals</p>
        <p className='text-center'>Remove</p>
      </div>

      {/* Body */}
      <div className='flex flex-col gap-5'>
        {
          products.map((product, index) => (
            <div key={index} className='border border-gray-400 rounded-md text-gray-600 font-medium p-5 grid grid-cols-[2fr_1fr] md:grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] items-center gap-5'>

              {/* Proudct Deails */}
              <div className='flex items-center text-sm  gap-4'>
                <img src={product.images[0]} alt='product-image' className='w-16 h-16' />
                <div>
                  <p>Title: {product.title}</p>
                  <p>Category: {product.category}</p>
                  <p>Color: {product.color}</p>
                  <p>Brand: {product.brand}</p>
                </div>
              </div>
              {/* Color & Brand */}
              <div>
                <p>Color: {product.color}</p>
                <p>Brand: {product.brand}</p>
              </div>
              {/* Price & discount*/}
              <div>
                <p>OldPrice: {currency}{product.price}</p>
                <p>Discount: {currency}{product.discount}</p>
                <p>NewPrice: {currency}{getProductOffer(product.price, product.discount)}</p>
              </div>
              {/* InSock */}
              <div>
                <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                  <input type="checkbox" className="sr-only peer" defaultChecked={product.inStock} onChange={() => { updateInStock(product._id); }} />
                  <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200"></div>
                  <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                </label>
              </div>
              {/* New Arrivals */}
              <div>
                <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                  <input type="checkbox" className="sr-only peer" defaultChecked={product.newArrivals} onChange={() => { showNewArivals(product._id); }} />
                  <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-200"></div>
                  <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                </label>
              </div>
              {/* Remove */}
              <div className='flex items-cetner jsutify-start md:justify-center'>
                <p onClick={() => { deleteProduct(product._id); }} className='w-6 h-6 flex items-center justify-center cursor-pointer p-[1px] text-red-600 rounded-full border border-red-700 transition-all duration-300 hover:bg-red-700 hover:text-white'>X</p>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  );
};

export default ProductsList;
