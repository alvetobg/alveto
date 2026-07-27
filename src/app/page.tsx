import type { Metadata } from "next";

import Reservation from "@/components/home/Reservation";
import Footer from "@/components/layout/Footer";
import About from "@/components/home/About";
import Signature from "@/components/home/Signature";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Experience from "@/components/home/Experience";
import StructuredData from "@/components/seo/StructuredData";
import { site } from "@/lib/site";

const homeTitle = site.seo.title;
const homeDescription = site.seo.description;
const homeImage = {
  url: "/images/hero.jpg",
  width: 1600,
  height: 1066,
  alt: "ALVETO specialty coffee, brunch, desserts and cocktails",
  type: "image/jpeg",
};

export const metadata: Metadata = {
  title: {
    absolute: homeTitle,
  },
  description: homeDescription,
  alternates: {
    canonical: "/",
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
    url: "/",
    title: homeTitle,
    description: homeDescription,
    images: [homeImage],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
    images: [homeImage],
  },
};

export default function Home() {
  return (
    <>
      <StructuredData />
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
