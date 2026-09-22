import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Challenges from "@/components/Challenges";
import Generation from "@/components/Generation";
import Advantages from "@/components/Advantages";
import WoundTypes from "@/components/WoundTypes";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SiteEffects from "@/components/SiteEffects";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Challenges />
        <Generation />
        <Advantages />
        <WoundTypes />
        <Comparison />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <SiteEffects />
    </>
  );
}