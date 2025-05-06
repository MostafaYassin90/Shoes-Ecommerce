import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category }) => {
  const { products } = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);


  // Get Related Products 
  const getRelatedProducts = () => {
    const filteringRelatedProducts = [...products].filter((product) => product.category === category);
    setRelatedProducts(filteringRelatedProducts);
  };

  useEffect(() => {
    getRelatedProducts();
  }, [category]);

  return (
    <div className='mt-20'>
      <div className='flex flex-col gap-1 mb-6 items-center w-fit justify-center mx-auto'>
        <h2 className='font-semibold text-2xl text-gray-800'>Related Products</h2>
        <hr className='border-none h-[2px] w-[50%] bg-primary ms-auto' />
      </div>

      <div className='grid grid-cols-autoo gap-5'>
        {
          relatedProducts.slice(0, 5).map((product, index) => (
            <ProductItem key={index} product={product} />
          ))
        }
      </div>
    </div>
  );
};

export default RelatedProducts;
