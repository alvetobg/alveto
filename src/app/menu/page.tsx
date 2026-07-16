import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MenuHero from "@/components/menu/MenuHero";
import MenuSection from "@/components/menu/MenuSection";

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <MenuHero />
      <MenuSection />
      <Footer />
    </>
  );
}