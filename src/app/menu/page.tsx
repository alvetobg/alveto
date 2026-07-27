import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MenuHero from "@/components/menu/MenuHero";
import MenuSection from "@/components/menu/MenuSection";

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <MenuHero />
        <MenuSection />
      </main>
      <Footer />
    </>
  );
}
