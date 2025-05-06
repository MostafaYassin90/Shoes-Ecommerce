import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import SectionTitle from "./SectionTitle";
import Carousel from "react-multi-carousel";
import { responseForHomeSections } from "../assets/assete";
import ProductItem from "./ProductItem";

const KidsSection = () => {
  const { products } = useContext(AppContext);
  const [kidsProducts, setKidsProducts] = useState([]);


  // Get Kids Products
  const getKidsProducts = () => {
    const findKidsProducts = [...products].filter((product) => {
      return product.category === "Kids";
    });
    setKidsProducts(findKidsProducts);
  };

  useEffect(() => {
    getKidsProducts();
  }, [products]);


  return (
    <div className="py-16">
      {/* Header */}
      <SectionTitle title={"Kids Shoes"} />
      {/* Show Kids Products */}
      <Carousel responsive={responseForHomeSections} infinite={true} autoPlay={false}>
        {
          kidsProducts.map((product, index) => (
            <div className="mx-2">
              <ProductItem key={index} product={product} />
            </div>
          ))
        }
      </Carousel>
    </div>
  );
};

export default KidsSection;
