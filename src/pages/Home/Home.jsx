import ContactUs from "../../Components/ContactUs";
import FeaturedSection from "../../Components/FeaturedSection";
import Hero from "../../Components/Hero";

const Home = () => {
  return (
    <div className="h-full">
      <Hero></Hero>
      <FeaturedSection></FeaturedSection>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
