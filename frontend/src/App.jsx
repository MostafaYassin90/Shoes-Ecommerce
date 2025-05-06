import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import New from './pages/New';
import About from './pages/About';
import BlowNavbar from "./components/BlowNavbar";
import SingleProduct from "./pages/SingleProduct";
import { Toaster } from 'react-hot-toast';
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import PlaceOrder from "./pages/PlaceOrder";
import MyOrders from "./pages/MyOrders";
import VerifyPage from "./pages/VerifyPage";

const App = () => {

  return (
    <div className="app">
      <Toaster position="top-center" />
      <ScrollToTop />

      <div>
        <Navbar />
        <BlowNavbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/new" element={<New />} />
        <Route path="/about" element={<About />} />
        <Route path="/single-product/:productId" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>

      <Footer />

    </div>
  );

};

export default App;
