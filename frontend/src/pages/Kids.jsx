import { useContext, useEffect, useState } from "react";
import { AppContext } from './../context/AppContext';
import ProductItem from "../components/ProductItem";

const Kids = () => {
  const { products } = useContext(AppContext);
  const [sortedpRroducts, setSortedProducts] = useState([]);
  const [sortType, setSortType] = useState("default");



  // Sort Product By price
  const sortProductByPrice = () => {
    let productsClone = [...products].filter((product) => {
      return product.category === "Kids";
    });
    if (sortType === "low_to_high") {
      setSortedProducts(productsClone.sort((a, b) => a.price - b.price));
    } else if (sortType === "high_to_low") {
      setSortedProducts(productsClone.sort((a, b) => b.price - a.price));
    } else {
      setSortedProducts(productsClone);
    }

  };



  useEffect(() => {
    sortProductByPrice();
  }, [sortType, products]);


  return (
    <div className="min-h-screen py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw] flex flex-row items-start gap-5">

      {/* LeftSide */}
      <div className="w-[220px]">
        <p className="mb-7 font-medium text-gray-800 text-xl">Sort By Price</p>
        <select value={sortType} onChange={(event) => setSortType(event.target.value)}
          className="border border-gray-400 rounded-md py-1 px-2 w-full cursor-pointer"
        >
          <option value={"default"}>Default</option>
          <option value={"low_to_high"}>Low To High</option>
          <option value={"high_to_low"}>High To Low</option>
        </select>
      </div>

      {/* Right Side */}
      <div className="flex-1 h-[calc(100vh-171px)] overflow-x-scroll">
        {/* Head */}
        <div className="mb-5">
          <p className="text-3xl font-medium text-gray-700">Kids Shoes</p>
        </div>

        <div className="grid grid-cols-auto gap-x-5 gap-y-10 ">
          {
            sortedpRroducts.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))
          }
        </div>
      </div>

    </div>
  );
};

export default Kids;
