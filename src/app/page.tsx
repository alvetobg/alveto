import type { Metadata, Viewport } from "next";

import "./homepage.css";

import Reservation from "@/components/home/Reservation";
import Gallery from "@/components/home/Gallery";
import HomepageFooter from "@/components/layout/HomepageFooter";
import About from "@/components/home/About";
import Signature from "@/components/home/Signature";
import HomepageNavbar from "@/components/layout/HomepageNavbar";
import Hero from "@/components/home/Hero";
import Experience from "@/components/home/Experience";
import StructuredData from "@/components/seo/StructuredData";
import { getPublishedHomepage } from "@/features/homepage/service";
import { getPublishedGallery } from "@/features/gallery/service";
import { getPublicReservationSettings } from "@/features/reservations/service";
import { createPageMetadata } from "@/features/seo/metadata";
import { getPublicSeo } from "@/features/seo/service";
import { getPublicSiteSettings } from "@/features/site-settings/service";

export const viewport: Viewport = {
  themeColor: "#D9A066",
  colorScheme: "light",
  viewportFit: "cover",
};

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
  const hasSignature = Boolean(featuredSection?.products.length);
  const reservationSettings = reservationResult.settings;
  const siteSettings = siteSettingsResult.settings;

  return (
    <>
      <StructuredData
        reservationSettings={reservationSettings}
        siteSettings={siteSettings}
      />
      <HomepageNavbar
        reservationSettings={reservationSettings}
        siteSettings={siteSettings}
      />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Hero
          content={homepageResult.content?.hero ?? null}
          hasPublishedSignature={hasSignature}
          reservationSettings={reservationSettings}
        />
        <Experience
          images={homepageResult.content?.experienceImages ?? null}
        />
        {featuredSection && featuredSection.products.length > 0 ? (
          <Signature
            eyebrow={featuredSection.eyebrow}
            title={featuredSection.title}
            products={featuredSection.products}
          />
        ) : null}
        <About
          reservationSettings={reservationSettings}
          siteSettings={siteSettings}
          images={homepageResult.content?.aboutImages ?? null}
        />
        <Gallery collections={galleryResult.collections} />
        <Reservation
          settings={reservationSettings}
          siteSettings={siteSettings}
        />
      </main>
      <HomepageFooter
        reservationSettings={reservationSettings}
        siteSettings={siteSettings}
      />
    </>
  );
}
