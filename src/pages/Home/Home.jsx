import ContactUs from "../../pages/Public/ContactUs";
import FeaturedSection from "../../Components/shared/FeaturedSection";
import Hero from "../../Components/shared/Hero"
import BloodGroups from "../../HomeLayoutComponent/BloodGroups";
import CTASection from "../../HomeLayoutComponent/CTASection";
import FAQSection from "../../HomeLayoutComponent/FAQSection";
import HowItWorks from "../../HomeLayoutComponent/HowItWorks";
import Testimonials from "../../HomeLayoutComponent/Testimonials";

const Home = () => {
  return (
    <div className="h-full space-y-24">
      <Hero></Hero>
      <FeaturedSection></FeaturedSection>
      <BloodGroups></BloodGroups>
      <CTASection></CTASection>
      <FAQSection></FAQSection>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
