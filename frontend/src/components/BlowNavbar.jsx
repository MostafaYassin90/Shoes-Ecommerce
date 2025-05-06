import { IoSearch } from "react-icons/io5";
import { IoBagOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const BlowNavbar = () => {
  const { collectCountOfCartItems, searchValue, setSearchValue, collectCountOfFavoriteItems } = useContext(AppContext);
  const navigate = useNavigate();



  return (
    <div className='h-[48px] bg-black py-2 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw] flex items-center'>

      <div className="bg-gray-100 border border-gray-400 mx-auto rounded-full overflow-hidden flex items-center w-[300px] sm:w-[400px] md:w-[600px] h-[32px]">
        <input value={searchValue} onChange={(event) => { setSearchValue(event.target.value); }}
          type="text" placeholder="Search ..."
          className="px-3 py-2 outline-none flex-1 border-r border-gray-400" />
        <IoSearch className="text-xl w-10 h-[32px] p-1" />
      </div>

      {/* Cart And Favorite */}
      <div className="flex items-center gap-4">

        {/* Cart */}
        <div onClick={() => { navigate("/cart"); }} className="relative cursor-pointer">
          <IoBagOutline className="text-2xl text-white" />
          <p className="absolute top-[-6px] right-[-5px] w-4 h-4 rounded-full bg-red-600 text-white font-medium text-sm flex items-center justify-center">{collectCountOfCartItems()}</p>
        </div>

        {/* Favorite */}
        <div onClick={() => { navigate("/favorite"); }} className="relative cursor-pointer">
          <FaRegHeart className="text-2xl text-white" />
          <p className="absolute top-[-6px] right-[-5px] w-4 h-4 rounded-full bg-red-600 text-white font-medium text-sm flex items-center justify-center">{collectCountOfFavoriteItems()}</p>
        </div>

      </div>

    </div>
  );
};

export default BlowNavbar;
