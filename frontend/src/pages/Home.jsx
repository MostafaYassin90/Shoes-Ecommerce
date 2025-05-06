import Hero from "../components/Hero";
import KidsSection from "../components/KidsSection";
import MenSection from "../components/MenSection";
import NewArrivals from "../components/NewArrivals";
import SubscribeSection from "../components/SubscribeSection";
import WomenSection from "../components/WomenSection";

const Home = () => {

  return (
    <div className="py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      <Hero />
      <NewArrivals />
      <MenSection />
      <WomenSection />
      <KidsSection />
      <SubscribeSection />
    </div>
  );
};

export default Home;
