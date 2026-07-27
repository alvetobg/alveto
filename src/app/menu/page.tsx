import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MenuHero from "@/components/menu/MenuHero";
import MenuSection from "@/components/menu/MenuSection";
import { site } from "@/lib/site";

const menuTitle = "ALVETO Menu | Coffee, Brunch & Desserts";
const menuDescription =
  "Explore the ALVETO menu of specialty coffee, breakfast, brunch, sweet and savory creations, desserts and cocktails.";
const menuImage = {
  url: "/images/menu-hero.webp",
  width: 2400,
  height: 1350,
  alt: "ALVETO menu",
  type: "image/webp",
};

export const metadata: Metadata = {
  title: {
    absolute: menuTitle,
  },
  description: menuDescription,
  alternates: {
    canonical: "/menu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    url: "/menu",
    title: menuTitle,
    description: menuDescription,
    images: [menuImage],
  },
  twitter: {
    card: "summary_large_image",
    title: menuTitle,
    description: menuDescription,
    images: [menuImage],
  },
};

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
