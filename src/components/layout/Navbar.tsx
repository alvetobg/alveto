"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import MobileMenu from "@/components/layout/MobileMenu";
import { MenuIcon } from "@/components/menu/MenuIcons";
import Button from "@/components/ui/Button";
import type { PublicReservationSettings } from "@/features/reservations/types";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type NavbarProps = Readonly<{
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

export default function Navbar({
  reservationSettings,
  siteSettings,
}: NavbarProps) {
  const [overHero, setOverHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const hero = document.getElementById("menu-hero");
    if (!hero || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      {
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0,
      },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      data-menu-header-shell
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        overHero
          ? "border-transparent bg-transparent"
          : "border-dark/8 bg-cream shadow-[0_8px_28px_rgba(34,34,34,0.05)]"
      }`}
    >
      <div
        className="mx-auto flex h-[calc(5rem+env(safe-area-inset-top))] w-full max-w-[1280px] items-center justify-between px-6 md:h-[88px] md:px-8 lg:px-12 xl:px-16"
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
            className={`rounded-sm text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200 ${
              overHero
                ? "text-white hover:text-white/75"
                : "text-dark hover:text-primary"
            }`}
          >
            Experience
          </Link>
          <Link
            href="/menu"
            aria-current="page"
            className={`rounded-sm text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200 ${
              overHero
                ? "text-white underline decoration-primary decoration-2 underline-offset-8"
                : "text-dark underline decoration-primary decoration-2 underline-offset-8"
            }`}
          >
            Menu
          </Link>
          {reservationSettings?.reservationsEnabled &&
          reservationSettings.reservationUrl ? (
            <Button href={reservationSettings.reservationUrl}>
              {reservationSettings.primaryCtaLabel}
            </Button>
          ) : null}
        </nav>

        <button
          type="button"
          aria-label="Open navigation menu"
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className={`flex h-12 w-12 items-center justify-center rounded-[14px] border transition-[color,background-color,border-color,transform] duration-200 active:translate-y-px motion-reduce:transform-none md:hidden ${
            overHero
              ? "border-white/45 bg-black/12 text-white"
              : "border-dark/14 bg-cream text-dark"
          }`}
        >
          <MenuIcon className="h-[22px] w-[22px]" />
        </button>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        reservationSettings={reservationSettings}
        siteSettings={siteSettings}
      />
    </header>
  );
}
