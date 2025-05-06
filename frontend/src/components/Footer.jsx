import { IoWater } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 pt-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      <div className="pb-10 flex flex-row-items-start gap-5">

        {/* One */}
        <div className="w-2/5 flex flex-col gap-5">
          <Link to={"/"} onClick={() => { scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="flex items-center">
            <IoWater className="text-3xl text-primary" />
            <p className="text-3xl text-gray-700 font-medium">In<span className="text-primary font-bold">F</span>inite</p>
          </Link>
          <p className="text-gray-600 font-medium text-sm w-full lg:w-[90%]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum beatae repudiandae corporis dolor! In reiciendis debitis commodi illum repudiandae blanditiis, reprehenderit eum tempora eius quidem corrupti explicabo inventore labore itaque.</p>
        </div>
        {/* Two */}
        <div className="w-1/5">
          <p className="text-gray-900 font-medium text-xl mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-sm text-gray-600  font-medium">
            <li onClick={() => { navigate("/"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Home</li>
            <li onClick={() => { navigate("/new"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">New Arrivals</li>
            <li onClick={() => { navigate("/men"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Men</li>
            <li onClick={() => { navigate("/women"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Women</li>
            <li onClick={() => { navigate("/kids"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Kids</li>
          </ul>
        </div>

        {/* Three */}
        <div className="w-1/5">
          <p className="text-gray-900 font-medium text-xl mb-5">Help</p>
          <ul className="flex flex-col gap-1 text-sm text-gray-600  font-medium">
            <li onClick={() => { navigate("/"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Delivery Information</li>
            <li onClick={() => { navigate("/"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Return & Refund Policy</li>
            <li onClick={() => { navigate("/"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Payment Methods</li>
            <li onClick={() => { navigate("/"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Track your Order</li>
            <li onClick={() => { navigate("/"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Four */}
        <div className="w-1/5">
          <p className="text-gray-900 font-medium text-xl mb-5">Follow Us</p>
          <ul className="flex flex-col gap-1 text-sm text-gray-600  font-medium">
            <li onClick={() => { navigate("/"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Instagram</li>
            <li onClick={() => { navigate("/"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Twitter</li>
            <li onClick={() => { navigate("/"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">Twitter</li>
            <li onClick={() => { navigate("/"); scrollTo({ top: 0, left: 0, behavior: "smooth" }); }} className="underline-primary hover:underline hover:text-primary cursor-pointer">YouTube</li>
          </ul>
        </div>

      </div>

      {/* Copy Right */}
      <div className="py-2 text-center border-t border-gray-400">
        <p className="text-gray-700 text-sm font-medium"
        >Copy Right {new Date().getFullYear()} &copy; Mostafayassin292@gmail.com All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
