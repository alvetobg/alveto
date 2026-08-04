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

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("menu", await getPublicSeo());
}

export default async function MenuPage() {
  const [menuResult, reservationResult, builderResult] = await Promise.all([
    getPublishedMenu(),
    getPublicReservationSettings(),
    getPublishedBuilders(),
  ]);
  const reservationSettings = reservationResult.settings;

  return (
    <>
      <Navbar reservationSettings={reservationSettings} />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <MenuHero />
        <MenuSection
          menu={menuResult.menu}
          state={menuResult.state}
          builders={builderResult.builders}
          builderState={builderResult.state}
        />
      </main>
      <Footer reservationSettings={reservationSettings} />
    </>
  );
}
