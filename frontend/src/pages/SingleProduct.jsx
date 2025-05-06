import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { IoIosStar } from "react-icons/io";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import RelatedProducts from '../components/RelatedProducts';
import toast from 'react-hot-toast';
import { FaRegHeart } from "react-icons/fa";

const SingleProduct = () => {
  const { products, addToCart, favoriteItems, toggleProuductFavorite } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const [mainImage, setMainImage] = useState("");
  const { currency, calculateProductDisount } = useContext(AppContext);
  const [size, setSize] = useState("");


  // Get Single Product
  const getSingleProduct = async () => {
    const findProduct = [...products].find((item) => item._id === productId);
    setProduct(findProduct);
    if (findProduct) {
      setMainImage(findProduct.images[0]);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [productId, products]);

  return (
    <div className='relative min-h-screen py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]'>
      {
        product
          ?
          <div>
            <div className='flex flex-col md:flex-row items-start gap-10'>

              {/* left Side */}
              <div className='w-full md:flex-1 flex-col gap-5'>
                {/* Main Images */}
                <div className='w-full border border-gray-400 p-10 rounded-md flex items-center justify-center cursor-pointer'>
                  <img src={mainImage} alt='main-image' className='max-w-[100%]' />
                </div>
                {/* MultiImages */}
                <div className='w-full flex itmes-center gap-4 mt-10'>
                  {
                    product.images.map((image, index) => (
                      <div onClick={() => { setMainImage(image); }} key={index} className='w-1/4 border border-gray-400 p-1 rounded-md flex items-center justify-center cursor-pointer'>
                        <img src={image} alt='product-image' className='w-[100px] h-[100px]' />
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Right Side */}
              <div className='w-full md:flex-1'>
                <p className='text-gray-800 font-semibold text-2xl'>{product.name}</p>
                <p className='mt-3 text-gray-700 font-medium w-[100%] lg:w-[90%]'>{product.description}</p>
                {/* Star And Reviews */}
                <div className='flex items-cetner gap-10 mt-5'>
                  <div className='flex items-center'>
                    {
                      Array.from({ length: 5 }, (_, index) => index + 1).map((star, index) => {
                        if (star <= 4) {
                          return <IoIosStar className='text-green-400 text-xl' key={index} />;
                        } else {
                          return <FaRegStarHalfStroke className='text-green-400 text-xl' key={index} />;
                        }
                      }
                      )
                    }
                  </div>
                  <div className='flex items-center gap-2'>
                    <p>4.7</p>
                    <p>(40)</p>
                  </div>
                </div>
                {/* Price */}
                <div className='mt-6'>
                  <p className=' text-2xl font-semibold'>Price: <span className='text-primary'>{currency}{calculateProductDisount(product.price, product.discount)}</span></p>
                  <div className='flex items-center gap-4 text-xl text-gray-600'>
                    <p>Original Price: <span className='line-through'>{currency}{product.price}</span></p>
                    <p className='text-red-400 font-medium'>-{product.discount} Off</p>
                  </div>
                </div>
                {/* Details Like color & brank & category */}
                <div className='mt-6'>
                  <h2 className='text-xl mb-3 text-gray-800 flex flex-col w-fit items-end'>
                    <span>Product Details</span>
                    <hr className='border-none h-[2px] w-[100%] bg-gray-200' />
                  </h2>
                  <div className='flex flex-col gap-1 text-gray-700 font-medium'>
                    <p>Category: {product.category} Shoes</p>
                    <p>Color: {product.color}</p>
                    <p>Brand: {product.brand}</p>
                  </div>
                </div>

                {/* Sizes */}
                <div className='my-5'>
                  <h2 className='mb-3 text-gray-800 font-medium text-xl'>Select Your Size</h2>
                  <div className='flex items-center gap-4'>
                    {
                      product.sizes.map((item, index) => (
                        <button key={index} onClick={() => { setSize(item); }}
                          className={`border border-gray-400 rounded-md py-1 px-4 cursor-pointer ${item === size ? "bg-black text-white" : ""}`}
                        >{item}</button>
                      ))
                    }
                  </div>
                </div>
                {/* Button cart & WishList */}
                <div className='flex flex-col gap-4 mt-5'>
                  <button
                    onClick={() => {
                      if (!size) {
                        toast.error("Plesse Select a Size");
                      } else {
                        addToCart(product._id, size);
                      }
                    }}
                    className='py-1.5 px-3 block w-[200px] bg-black text-white rounded-full transition-all duration-300 hover:bg-gray-700 cursor-pointer'>Add To Cart</button>

                  <div className='py-1.5 px-3 block w-[200px] bg-white border rounded-full border-gray-400 transition-all duration-300 hover:border-gray-800 cursor-pointer'
                    onClick={() => { toggleProuductFavorite(product._id); }} >
                    {
                      favoriteItems.includes(product._id)
                        ? <button className={`flex w-full items-center justify-center gap-3 font-medium cursor-pointer ${favoriteItems.includes(product._id) ? "text-red-700" : ""}`}>Remove <FaRegHeart /></button>
                        : <button className='flex w-full items-center justify-center gap-3 font-medium cursor-pointer'>Add <FaRegHeart /></button>
                    }
                  </div>

                </div>

              </div>

            </div>
            {/* Related Products */}
            <RelatedProducts category={product.category} />
          </div>
          :
          <Loading />
      }

    </div>
  );
};

export default SingleProduct;


