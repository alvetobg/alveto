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
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <Experience />
        <Signature />
        <About />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
