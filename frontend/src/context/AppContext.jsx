import { createContext, useEffect, useState } from "react";
import { dummyProducts } from "../assets/assete";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  const [userData, setUserData] = useState(null);
  const currency = "$";
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  // Get All Products
  const getAllProducts = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch {
      toast.error(error.response.data.message || error.message);
    }
  };


  // calculate Product Disount
  const calculateProductDisount = (price, discount) => {
    const finallyPrice = Number(price - (price * (discount / 100)));
    return finallyPrice;
  };


  // Add To Cart // { a: {41: 1, 42: 2}, }
  const addToCart = async (productId, size) => {
    let cartData = structuredClone(cartItems);
    if (cartData[productId]) {
      if (cartData[productId][size]) {
        cartData[productId][size] += 1;
      } else {
        cartData[productId][size] = 1;
      }
    } else {
      cartData[productId] = {};
      cartData[productId][size] = 1;
    }
    setCartItems(cartData);

    // Add To CartItems At Backend
    if (token) {

      try {
        const response = await axios.post(backend_url + "/api/cart/add", { productId: productId, size: size }, {
          headers: { authorization: "Bearer " + token }
        });
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }

    }

    toast.success("Added To Cart");
  };

  // Remove From Cart
  const removeFromCart = async (productId, size) => {
    let cartItemsData = structuredClone(cartItems);
    // {a: {41: 1, 42: 1}}
    for (const items in cartItemsData) {
      for (const item in cartItemsData[items]) {
        if (productId === items) {
          if (item === size) {
            delete cartItemsData[items][item];
          }
        }
      }
    }

    if (token) {
      try {
        const response = await axios.post(backend_url + "/api/cart/remove", { productId: productId, size: size }, {
          headers: { authorization: "Bearer " + token }
        });
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    }
    setCartItems(cartItemsData);
    toast.success("Removed From Cart");
  };

  // Update Cart Items
  const updateCartItems = async (productId, size, value) => {
    let cartData = structuredClone(cartItems);
    for (const items in cartData) {
      for (const item in cartData[items]) {
        if (productId === items && size === item) {
          cartData[items][item] = value;
        }
      }
    }
    setCartItems(cartData);
    if (token) {
      try {
        const response = await axios.post(backend_url + "/api/cart/update", { productId: productId, size: size, value: value }, {
          headers: { authorization: "Bearer " + token }
        });
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    }
    toast.success("Cart Updated Successfully");
  };

  // Collect Count Of Items for cart
  const collectCountOfCartItems = () => {
    let cartCount = 0; // { a: {41: 1, 42:1}, b: {43: 2, 44: 1} }
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        cartCount += cartItems[items][item];
      }
    }
    return cartCount;
  };

  // Add And Remove From Favorite 
  const toggleProuductFavorite = async (productId) => {
    let favoriteItemsClone = favoriteItems.slice(); // []
    if (favoriteItemsClone.includes(productId)) {
      favoriteItemsClone = favoriteItemsClone.filter((item) => item !== productId);
      toast.success("Removed From Favorite");
    } else {
      favoriteItemsClone.push(productId);
      toast.success("Added To Favorite");
    }
    setFavoriteItems(favoriteItemsClone);

    if (token) {
      try {
        await axios.post(backend_url + "/api/favorite/add", { productId: productId }, {
          headers: { authorization: "Bearer " + token }
        });
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    }
  };

  // Get FavoriteItems 
  const getFavoriteItems = async () => {
    try {
      const response = await axios.get(backend_url + "/api/favorite/favoriteitems", {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setFavoriteItems(response.data.favoriteItems);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // Collect Count Of Items For Favorite
  const collectCountOfFavoriteItems = () => {
    let favoriteCount = 0;
    if (favoriteItems.length > 0) {
      favoriteCount = favoriteItems.length;
    }
    return favoriteCount;
  };

  // Get User Data
  const getUserData = async () => {
    try {
      const response = await axios.get(backend_url + "/api/user/user", {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // Get Cart Items
  const getCartItems = async () => {
    try {
      const response = await axios.get(backend_url + "/api/cart/cartitems", {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setCartItems(response.data.cartItems);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (token) {
      getUserData();
      getCartItems();
      getFavoriteItems();
    }
  }, [token]);


  useEffect(() => {
    if (searchValue.length > 0) {
      navigate("/shop");
    }
  }, [searchValue]);



  const value = {
    products: products,
    currency: currency,
    calculateProductDisount: calculateProductDisount,
    cartItems: cartItems,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateCartItems: updateCartItems,
    collectCountOfCartItems: collectCountOfCartItems,
    searchValue: searchValue,
    setSearchValue: setSearchValue,
    favoriteItems: favoriteItems,
    toggleProuductFavorite: toggleProuductFavorite,
    collectCountOfFavoriteItems: collectCountOfFavoriteItems,
    backend_url: backend_url,
    token: token,
    setToken: setToken,
    userData: userData,
    setUserData: setUserData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );

};

export default AppContextProvider;