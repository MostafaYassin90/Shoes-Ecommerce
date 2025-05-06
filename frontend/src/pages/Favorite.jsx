import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductItem from "../components/ProductItem";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const { products, favoriteItems, toggleProuductFavorite } = useContext(AppContext);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const navigate = useNavigate();


  // Get Favorite Products
  const getFavoriteProducts = () => {
    const productsData = [];

    [...products].map((product) => {
      [...favoriteItems].map((item) => {
        if (product._id === item) {
          productsData.push(product);
        }
      });
    });

    setFavoriteProducts(productsData);

  };

  useEffect(() => {
    getFavoriteProducts();
  }, [products, favoriteItems]);



  return (
    <div className="min-h-[70vh] py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      <h2 className="text-3xl font-semibold text-gray-700 mb-10">Favorite Products</h2>

      {/* Show Favorite Products */}
      {
        favoriteProducts.length > 0
          ?
          <div className="grid grid-cols-auto gap-10">
            {
              favoriteProducts.map((product, index) => (
                <div className="relative" key={index}>
                  <ProductItem key={index} product={product} fav={"fav"} />
                  <button
                    onClick={() => { toggleProuductFavorite(product._id); }}
                    className="absolute top-0 right-0 w-[28px] h-[28px] flex items-center justify-center border-l border-b border-gray-400 rounded-bl-md text-red-600 cursor-pointer">X</button>
                </div>
              ))
            }
          </div>
          :
          <div className="flex flex-col items-center mt-20">
            <h1 className="text-4xl font-semibold text-gray-700 mb-8">Your favorites are currently empty.</h1>
            <button
              onClick={() => { navigate("/shop"); }}
              className="bg-black text-white py-2 px-5 rounded-md font-medium transition-all duration-300 hover:bg-gray-700">Go To Shopping</button>
          </div>
      }


    </div>
  );
};

export default Favorite;
