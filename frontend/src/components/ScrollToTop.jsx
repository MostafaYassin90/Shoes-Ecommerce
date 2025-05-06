import { useEffect, useState } from "react";
import { HiMiniArrowSmallUp } from "react-icons/hi2";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 2000);
    };

    window.addEventListener("scroll", toggleVisible);
    return window.removeEventListener("Scroll", toggleVisible);

  }, []);

  return (
    <div style={{ opacity: visible ? "1" : "0" }}
      className="fixed z-50 bottom-[20px] right-[20px] w-[40px] h-[40px] bg-gray-700 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gray-900"
      onClick={() => { scrollTo({ top: 0, left: 0, behavior: "smooth" }); }}
    >
      <HiMiniArrowSmallUp className="text-3xl text-white" />
    </div>
  );
};

export default ScrollToTop;
