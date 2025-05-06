import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

const ProductItem = ({ product, fav }) => {
  const { currency, calculateProductDisount, toggleProuductFavorite, favoriteItems } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div onClick={() => { navigate(`/single-product/${product._id}`); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className='group relative border border-gray-400 rounded-md overflow-hidden cursor-pointer'>

      {/* Add To Favorite */}
      {fav !== "fav" &&
        <div onClick={(e) => { e.stopPropagation(); toggleProuductFavorite(product._id); }}
          className='absolute z-10 right-0 top-0 group-hover:w-8 w-0 h-8 flex items-center justify-center bg-gray-200 rounded-bl-md transition-all duration-300'>
          <FaHeart className={`${favoriteItems.includes(product._id) ? "text-red-700" : "text-gray-800"}`} />
        </div>
      }

      {/* Image */}
      <div className="w-[100%] h-[250px] flex items-center justify-center p-4">
        <img src={product.images[0]} alt="product-image"
          className="max-w-[100%] max-h-[100%]" />
      </div>
      {/* Details */}
      <div className='py-3 px-4 bg-gray-100'>

        {/* Title */}
        <p className='text-xl font-semibold text-gray-800 whitespace-nowrap text-ellipsis overflow-hidden'>{product.name}</p>

        {/* Price */}
        <div className='flex items-center gap-3'>
          <p className='text-primary font-semibold text-xl'>{currency}{calculateProductDisount(product.price, product.discount)}</p>
          <div className='text-xl font-medium flex items-center gap-2'>
            <span className='text-gray-600 line-through'>{currency}{product.price}</span>
            <span className='text-red-700 tetx-sm'>-{product.discount} Off</span>
          </div>
        </div>

        {/* Category */}
        <p className='text-gray-600 font-medium'>{product.category} Shoes</p>

        {/* Add To Cart And Quick View */}
        <div className='mt-5'>
          <Link to={`/single-product/${product._id}`} className='text-center py-1 px-3 block w-full bg-white border rounded-full border-gray-400 transition-all duration-300 hover:border-gray-800 cursor-pointer'>Quick View</Link>
        </div>


      </div>

    </div>
  );
};

export default ProductItem;
