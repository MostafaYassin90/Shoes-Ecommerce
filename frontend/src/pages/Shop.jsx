import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductItem from "../components/ProductItem";
import SectionTitle from "../components/SectionTitle";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const { products, searchValue, setSearchValue } = useContext(AppContext);
  const [filteringProducts, setFilteringProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showFilter, setShowFilter] = useState(false);



  // Add Category
  const CollectCategoryHandler = (item) => {
    if (categories.includes(item)) {
      setCategories(categories.filter((cat) => cat !== item));
    } else {
      setCategories((prev) => ([...prev, item]));
    }
  };

  // Apply Prducts Filtering
  const applyProductsFiltering = () => {
    let productsClone = [...products];
    if (categories.length > 0) {
      setFilteringProducts(productsClone.filter((product) => {
        return categories.includes(product.category);
      }));
    } else if (searchValue.length > 0) {
      setFilteringProducts(productsClone.filter((product) => {
        return product.name.toLowerCase().includes(searchValue.toLowerCase());
      }));
    }
    else {
      setFilteringProducts(productsClone);
    }
  };

  useEffect(() => {
    applyProductsFiltering();
  }, [categories, products]);

  return (
    <div className="py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw] flex flex-col md:flex-row gap-5">

      {/* Left Side */}
      <div className="w-[220px]">
        <div className="mb-10 flex items-center gap-2 cursor-pointer"
          onClick={() => { setShowFilter((prev) => (!prev)); }}
        >
          <h2 className="font-semibold text-xl ">Filters</h2>
          <IoIosArrowForward className={`${showFilter && "rotate-90"}`} />
        </div>

        {/* Category */}
        <div className={`${showFilter ? "flex" : "hidden"} md:flex flex-col gap-3 border border-gray-400 rounded-md p-5`}>
          <div className="flex items-center gap-4">
            <input type="checkbox" id="Men" className="w-3.5 h-3.5 cursor-pointer" />
            <label htmlFor="Men" className="cursor-pointer text-gray-700 font-medium"
              onClick={() => { CollectCategoryHandler("Men"); }}
            >Men</label>
          </div>
          <div className="flex items-center gap-4">
            <input type="checkbox" id="Women" className="w-3.5 h-3.5 cursor-pointer" />
            <label htmlFor="Women" className="cursor-pointer text-gray-700 font-medium"
              onClick={() => { CollectCategoryHandler("Women"); }}
            >Women</label>
          </div>
          <div className="flex items-center gap-4">
            <input type="checkbox" id="Kids" className="w-3.5 h-3.5 cursor-pointer" />
            <label htmlFor="Kids" className="cursor-pointer text-gray-700 font-medium"
              onClick={() => { CollectCategoryHandler("Kids"); }}
            >Kids</label>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="shop-right-side flex-1 h-[calc(100vh-171px)] overflow-x-scroll">
        {/* Head */}
        <div>
          <SectionTitle title={"All Products"} />
        </div>
        {/* Show Products */}
        <div className="grid grid-cols-auto gap-x-5 gap-y-10">
          {
            filteringProducts.map((product, index) => (
              <ProductItem key={index} product={product} />
            ))
          }
        </div>
      </div>

    </div>
  );
};

export default Shop;
