import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MenuHero from "@/components/menu/MenuHero";
import MenuSection from "@/components/menu/MenuSection";
import { getPublishedBuilders } from "@/features/builders/service";
import { getPublishedMenu } from "@/features/menu/service";
import { getPublicReservationSettings } from "@/features/reservations/service";
import { createPageMetadata } from "@/features/seo/metadata";
import { getPublicSeo } from "@/features/seo/service";
import { getPublicSiteSettings } from "@/features/site-settings/service";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("menu", await getPublicSeo());
}

export default async function MenuPage() {
  const [menuResult, reservationResult, builderResult, siteSettingsResult] =
    await Promise.all([
      getPublishedMenu(),
      getPublicReservationSettings(),
      getPublishedBuilders(),
      getPublicSiteSettings(),
    ]);
  const reservationSettings = reservationResult.settings;

  return (
    <>
      <Navbar
        reservationSettings={reservationSettings}
        siteSettings={siteSettingsResult.settings}
      />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <MenuHero />
        <MenuSection
          menu={menuResult.menu}
          state={menuResult.state}
          builders={builderResult.builders}
          builderState={builderResult.state}
        />
      </main>
      <Footer
        reservationSettings={reservationSettings}
        siteSettings={siteSettingsResult.settings}
      />
    </>
  );
}
