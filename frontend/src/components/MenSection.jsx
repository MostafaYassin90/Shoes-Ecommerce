import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import SectionTitle from "./SectionTitle";
import Carousel from "react-multi-carousel";
import { responseForHomeSections } from "../assets/assete";
import ProductItem from "./ProductItem";

const MenSection = () => {
  const { products } = useContext(AppContext);
  const [menProducts, setMenProducts] = useState([]);

  // Get Men Products
  const getMenProducts = () => {
    const findMenProducts = [...products].filter((product) => {
      return product.category === "Men";
    });
    setMenProducts(findMenProducts);
  };

  useEffect(() => {
    getMenProducts();
  }, [products]);

  return (
    <div className="py-16">
      {/* Header */}
      <SectionTitle title={"Men Shoes"} />

      {/* Show Men Products */}
      <Carousel responsive={responseForHomeSections} infinite={true} autoPlay={false}>
        {
          menProducts.map((product, index) => (
            <div className="mx-2">
              <ProductItem key={index} product={product} />
            </div>
          ))
        }
      </Carousel>
    </div>
  );
};

export default MenSection;
