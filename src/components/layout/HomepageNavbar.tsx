"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import HomepageMobileMenu from "@/components/layout/HomepageMobileMenu";
import { MenuIcon } from "@/components/ui/Icons";
import PremiumButton from "@/components/ui/PremiumButton";
import type { PublicReservationSettings } from "@/features/reservations/types";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type HomepageNavbarProps = Readonly<{
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

export default function HomepageNavbar({
  reservationSettings,
  siteSettings,
}: HomepageNavbarProps) {
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const canReserve = Boolean(
    reservationSettings?.reservationsEnabled &&
      reservationSettings.reservationUrl,
  );

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (!hero) {
      return;
    }

    const headerHeight =
      document
        .querySelector<HTMLElement>("[data-homepage-header-shell]")
        ?.getBoundingClientRect().height ?? 80;
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu();
    };

    desktop.addEventListener("change", handleBreakpoint);
    return () => desktop.removeEventListener("change", handleBreakpoint);
  }, [closeMenu]);

  return (
    <>
      <header
        data-homepage-header-shell
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          overHero
            ? "border-transparent bg-transparent"
            : "border-dark/8 bg-cream shadow-[0_8px_28px_rgba(34,34,34,0.05)]"
        }`}
      >
        <div
          className="mx-auto flex h-[calc(5rem+env(safe-area-inset-top))] w-full max-w-[1280px] items-center justify-between px-5 min-[375px]:px-6 md:h-[88px] md:px-8 lg:px-12 xl:px-16"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <Link
            href="/"
            aria-label={`${siteSettings.businessName} Home`}
            className="rounded-sm"
          >
            <Image
              src="/logos/alveto-wordmark.png"
              alt={siteSettings.businessName}
              width={148}
              height={36}
              sizes="(max-width: 767px) 132px, 148px"
              className="h-auto w-[132px] md:w-[148px]"
            />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-7 md:flex lg:gap-9"
          >
            <Link
              href="/#experience"
              className={`rounded-sm text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                overHero
                  ? "text-white hover:text-white/75"
                  : "text-dark hover:text-primary"
              }`}
            >
              Experience
            </Link>
            <Link
              href="/menu"
              className={`rounded-sm text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                overHero
                  ? "text-white hover:text-white/75"
                  : "text-dark hover:text-primary"
              }`}
            >
              Menu
            </Link>
            {canReserve ? (
              <PremiumButton
                href={reservationSettings?.reservationUrl ?? "#reservation"}
              >
                {reservationSettings?.primaryCtaLabel}
              </PremiumButton>
            ) : null}
          </nav>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-controls="homepage-mobile-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className={`flex h-12 w-12 items-center justify-center rounded-[14px] border transition-[color,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px md:hidden ${
              overHero
                ? "border-white/45 bg-black/12 text-white"
                : "border-dark/14 bg-cream text-dark"
            }`}
          >
            <MenuIcon className="h-[22px] w-[22px]" />
          </button>
        </div>
      </header>

      <HomepageMobileMenu
        open={menuOpen}
        onClose={closeMenu}
        reservationSettings={reservationSettings}
        siteSettings={siteSettings}
      />
    </>
  );
}
