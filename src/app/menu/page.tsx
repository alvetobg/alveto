import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MenuSection from "@/components/menu/MenuSection";

import MenuHero from "@/components/menu/MenuHero";
import MenuCategories from "@/components/menu/MenuCategories";
export default function MenuPage() {
  return (
    <>
      <Navbar />

      <MenuHero />

      <MenuCategories />

      <MenuSection />

      <Footer />
    </>
  );
}