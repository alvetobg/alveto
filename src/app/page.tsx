import Reservation from "@/components/home/Reservation";
import Footer from "@/components/layout/Footer";
import About from "@/components/home/About";
import Signature from "@/components/home/Signature";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Experience from "@/components/home/Experience";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Experience />
      <Signature />
      <About />
      <Reservation />
      <Footer />
    </>
  );
}