import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import SectionTitle from "./SectionTitle";
import Carousel from "react-multi-carousel";
import ProductItem from "./ProductItem";
import { responseForHomeSections } from "../assets/assete";

const WomenSection = () => {
  const { products } = useContext(AppContext);
  const [womenProducts, setWomenProducts] = useState([]);


  // Get Women Products
  const getWomenProducts = () => {
    const findWomenProducts = [...products].filter((product) => {
      return product.category === "Women";
    });
    setWomenProducts(findWomenProducts);
  };

  useEffect(() => {
    getWomenProducts();
  }, [products]);

  return (
    <div className="py-16">
      {/* Header */}
      <SectionTitle title={"Women Shoes"} />

      {/* Show Women Shoes */}
      <Carousel responsive={responseForHomeSections} infinite={true} autoPlay={false}>
        {
          womenProducts.map((product, index) => (
            <div className="mx-2">
              <ProductItem key={index} product={product} />
            </div>
          ))
        }
      </Carousel>


    </div>
  );
};

export default WomenSection;
