import { assets, responsiveOfHero } from "../assets/assete";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Hero = () => {
  return (
    <div className="bg-gray-100 rounded-md p-5 shadow-2xl">

      <Carousel
        className="hero-carouser"
        responsive={responsiveOfHero}
        showDots={true}
        infinite={true}
      // autoPlay={true}
      // autoPlaySpeed={1000}
      // transitionDuration={500}
      >


        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Left Side */}
          <div className="flex-1">
            <div className="mx-auto text-center">
              <p className="text-xl font-semibold text-primary mb-3">Limited Time Offer 30% Off</p>
              <p className="mx-auto leading-tight text-2xl md:tetx-3xl lg:text-4xl text-gray-700 font-semibold w-full md:w-[90%] lg:w-[75%]">Step into every adventure with unmatched comfort and cutting-edge style</p>
              <div className="flex mx-auto items-center justify-center gap-7 mt-8">
                <Link to={"/shop"} className="bg-black text-white py-1 px-5 rounded-md font-medium transition-all duration-300 hover:bg-gray-700">Shop Now</Link>
                <Link to={"/shop"} className="group flex items-center gap-2 font-medium tetx-grau-800 transition-all duration-300">
                  <span>Explore More</span>
                  <FaArrowRightLong className="block transition-all duration-500 top-2 group-hover:ml-2" />
                </Link>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="flex-1 fle items-center justify-content-center">
            <img src={assets.hero_2} alt="hero-image" className="max-w-[100%] mx-auto h-[500px]" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Left Side */}
          <div className="flex-1">
            <div className="mx-auto text-center">
              <p className="text-xl font-semibold text-primary b-3">Limited Time Offer 30% Off</p>
              <p className="mx-auto leading-tight text-2xl md:tetx-3xl lg:text-4xl text-gray-700 font-semibold w-full md:w-[90%] lg:w-[75%]">Step into every adventure with unmatched comfort and cutting-edge style</p>
              <div className="flex mx-auto items-center justify-center gap-7 mt-8">
                <Link to={"/shop"} className="bg-black text-white py-1 px-5 rounded-md font-medium transition-all duration-300 hover:bg-gray-700">Shop Now</Link>
                <Link to={"/shop"} className="group flex items-center gap-2 font-medium tetx-grau-800 transition-all duration-300">
                  <span>Explore More</span>
                  <FaArrowRightLong className="block transition-all duration-500 top-2 group-hover:ml-2" />
                </Link>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="flex-1 fle items-center justify-content-center">
            <img src={assets.hero_3} alt="hero-image" className="max-w-[100%] mx-auto h-[500px]" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Left Side */}
          <div className="flex-1">
            <div className="mx-auto text-center">
              <p className="text-xl font-semibold text-primary mb-3">Limited Time Offer 30% Off</p>
              <p className="mx-auto leading-tight text-2xl md:tetx-3xl lg:text-4xl text-gray-700 font-semibold w-full md:w-[90%] lg:w-[75%]">Step into every adventure with unmatched comfort and cutting-edge style</p>
              <div className="flex mx-auto items-center justify-center gap-7 mt-8">
                <Link to={"/shop"} className="bg-black text-white py-1 px-5 rounded-md font-medium transition-all duration-300 hover:bg-gray-700">Shop Now</Link>
                <Link to={"/shop"} className="group flex items-center gap-2 font-medium tetx-grau-800 transition-all duration-300">
                  <span>Explore More</span>
                  <FaArrowRightLong className="block transition-all duration-500 top-2 group-hover:ml-2" />
                </Link>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="flex-1 fle items-center justify-content-center">
            <img src={assets.hero_1} alt="hero-image" className="max-w-[100%] mx-auto h-[500px]" />
          </div>
        </div>

      </Carousel>

    </div>
  );
};

export default Hero;
