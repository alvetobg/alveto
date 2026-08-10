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
import { getPublicSiteSettings } from "@/features/site-settings/service";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("homepage", await getPublicSeo());
}

export default async function Home() {
  const [
    homepageResult,
    galleryResult,
    reservationResult,
    siteSettingsResult,
  ] = await Promise.all([
    getPublishedHomepage(),
    getPublishedGallery(),
    getPublicReservationSettings(),
    getPublicSiteSettings(),
  ]);
  const featuredSection = homepageResult.content?.featuredSection;
  const reservationSettings = reservationResult.settings;
  const siteSettings = siteSettingsResult.settings;

  return (
    <div className="homepage-v2 bg-[var(--atelier-ivory)] text-[var(--atelier-ink)]">
      <StructuredData
        reservationSettings={reservationSettings}
        siteSettings={siteSettings}
      />
      <Navbar
        appearance="atelier"
        reservationSettings={reservationSettings}
        siteSettings={siteSettings}
      />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero
          content={homepageResult.content?.hero ?? null}
          state={homepageResult.state}
          reservationSettings={reservationSettings}
          siteSettings={siteSettings}
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
        <About
          reservationSettings={reservationSettings}
          siteSettings={siteSettings}
        />
        <Gallery
          collections={galleryResult.collections}
          state={galleryResult.state}
        />
        <Reservation
          settings={reservationSettings}
          siteSettings={siteSettings}
        />
      </main>
      <Footer
        appearance="atelier"
        reservationSettings={reservationSettings}
        siteSettings={siteSettings}
      />
    </div>
  );
}
