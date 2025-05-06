import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AppContext } from './../context/AppContext';
import SectionTitle from './SectionTitle';
import Carousel from 'react-multi-carousel';
import ProductItem from './ProductItem';
import { responseForHomeSections } from '../assets/assete';

const NewArrivals = () => {
  const { products } = useContext(AppContext);
  const [newProducts, setNewProducts] = useState([]);

  const getNewProducts = () => {
    const newArrivalsProducts = [...products].filter((product) => product.newArrivals === true);
    setNewProducts(newArrivalsProducts);
  };

  useEffect(() => {
    getNewProducts();
  }, [products]);


  return (
    <div className='py-16'>
      {/* Header */}
      <SectionTitle title={"New Arrivals"} />

      {/* Show New Arrivals */}
      <Carousel
        responsive={responseForHomeSections}
        infinite={true}
        autoPlay={false}
      >
        {
          newProducts.map((product, index) => (
            <div className='mx-2'>
              <ProductItem key={index} product={product} />
            </div>
          ))
        }

      </Carousel>

    </div>
  );
};

export default NewArrivals;
