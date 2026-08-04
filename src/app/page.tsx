import type { Metadata } from "next";

import Reservation from "@/components/home/Reservation";
import Gallery from "@/components/home/Gallery";
import Footer from "@/components/layout/Footer";
import About from "@/components/home/About";
import Signature from "@/components/home/Signature";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Experience from "@/components/home/Experience";
import StructuredData from "@/components/seo/StructuredData";
import { getPublishedHomepage } from "@/features/homepage/service";
import { getPublishedGallery } from "@/features/gallery/service";
import { getPublicReservationSettings } from "@/features/reservations/service";
import { createPageMetadata } from "@/features/seo/metadata";
import { getPublicSeo } from "@/features/seo/service";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("homepage", await getPublicSeo());
}

export default async function Home() {
  const [homepageResult, galleryResult, reservationResult] = await Promise.all([
    getPublishedHomepage(),
    getPublishedGallery(),
    getPublicReservationSettings(),
  ]);
  const featuredSection = homepageResult.content?.featuredSection;
  const reservationSettings = reservationResult.settings;

  return (
    <>
      <StructuredData reservationSettings={reservationSettings} />
      <Navbar reservationSettings={reservationSettings} />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero
          content={homepageResult.content?.hero ?? null}
          state={homepageResult.state}
          reservationSettings={reservationSettings}
        />
        <Experience />
        {featuredSection ? (
          <Signature
            eyebrow={featuredSection.eyebrow}
            title={featuredSection.title}
            products={featuredSection.products}
            state={homepageResult.state}
          />
        ) : null}
        <About reservationSettings={reservationSettings} />
        <Gallery collections={galleryResult.collections} />
        <Reservation settings={reservationSettings} />
      </main>
      <Footer reservationSettings={reservationSettings} />
    </>
  );
}
