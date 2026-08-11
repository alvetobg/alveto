"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import MobileMenu from "@/components/layout/MobileMenu";
import Button from "@/components/ui/Button";
import type { PublicReservationSettings } from "@/features/reservations/types";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type NavbarProps = Readonly<{
  appearance?: "classic" | "atelier";
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

export default function Navbar({
  appearance = "classic",
  reservationSettings,
  siteSettings,
}: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isAtelier = appearance === "atelier";
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (isAtelier) {
      const hero = document.querySelector<HTMLElement>("[data-homepage-hero]");

      if (!hero) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => setScrolled(!entry.isIntersecting),
        { threshold: 0 },
      );

      observer.observe(hero);
      return () => observer.disconnect();
    }

    const onScroll = () => {
      const nextScrolled = window.scrollY > 40;
      setScrolled((current) =>
        current === nextScrolled ? current : nextScrolled,
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [isAtelier]);

  const headerClass = isAtelier
    ? scrolled
      ? "border-b border-[var(--atelier-line)] bg-[var(--atelier-header-light)] text-[var(--atelier-ink-deep)] shadow-[var(--atelier-shadow-soft)] supports-[backdrop-filter]:backdrop-blur-xl"
      : "border-b border-[var(--atelier-line)]/70 bg-[var(--atelier-ivory)]/92 text-[var(--atelier-ink-deep)] supports-[backdrop-filter]:backdrop-blur-xl"
    : scrolled
      ? "border-b border-black/5 bg-white/75 shadow-[0_12px_40px_rgba(0,0,0,0.06)] supports-[backdrop-filter]:backdrop-blur-2xl"
      : "bg-transparent";
  const desktopNavClass = isAtelier
    ? "hidden items-center gap-2 lg:flex"
    : "hidden items-center gap-6 md:flex lg:gap-8";
  const mobileButtonBreakpoint = isAtelier ? "lg:hidden" : "md:hidden";

  return (
    <header
      className={
        "fixed left-0 top-0 z-50 w-full transition-[background-color,border-color,box-shadow,color] duration-500 " +
        headerClass
      }
    >
      <div
        className={
          isAtelier
            ? "mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-7 lg:px-12 xl:px-16"
            : "mx-auto flex h-[88px] max-w-7xl items-center justify-between px-6 md:px-8 lg:h-24 lg:px-12 xl:px-16"
        }
      >
        <Link
          href="/"
          aria-label={siteSettings.businessName + " Home"}
          aria-current={pathname === "/" ? "page" : undefined}
          className="flex min-h-11 shrink-0 items-center"
        >
          <Image
            src="/logos/alveto-wordmark.png"
            alt={siteSettings.businessName}
            width={isAtelier ? 144 : 132}
            height={isAtelier ? 35 : 32}
            sizes={isAtelier ? "144px" : "132px"}
            className={
              isAtelier
                ? "h-auto w-[132px] transition-transform duration-300 hover:scale-[1.02] sm:w-36 motion-reduce:transform-none"
                : "h-auto w-[132px] transition-transform duration-300 hover:scale-[1.03]"
            }
          />
        </Link>

        <nav aria-label="Main navigation" className={desktopNavClass}>
          <Link
            href="/#experience"
            className={
              isAtelier
                ? "flex min-h-11 items-center rounded-full px-4 text-sm font-semibold tracking-wide transition-colors hover:bg-current/8"
                : "text-[15px] font-semibold tracking-wide transition-colors duration-300 " +
                  (scrolled
                    ? "text-dark hover:text-primary"
                    : "text-white hover:text-white/80")
            }
          >
            Experience
          </Link>

          <Link
            href="/menu"
            aria-current={pathname === "/menu" ? "page" : undefined}
            className={
              isAtelier
                ? "relative flex min-h-11 items-center rounded-full px-4 text-sm font-semibold tracking-wide transition-colors hover:bg-current/8 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-4 aria-[current=page]:after:bottom-1.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-[var(--atelier-coral)]"
                : "text-[15px] font-semibold tracking-wide transition-colors duration-300 " +
                  (scrolled
                    ? "text-dark hover:text-primary"
                    : "text-white hover:text-white/80")
            }
          >
            Menu
          </Link>

          {reservationSettings?.reservationsEnabled &&
          reservationSettings.reservationUrl ? (
            <Button
              href={reservationSettings.reservationUrl}
              variant={isAtelier ? "atelier" : "primary"}
              className={isAtelier ? "min-h-11 rounded-full px-6" : undefined}
            >
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
          className={
            "flex h-12 w-12 items-center justify-center border transition-colors duration-300 " +
            mobileButtonBreakpoint +
            " " +
            (isAtelier
              ? scrolled
                ? "rounded-full border-[var(--atelier-line)] bg-[var(--atelier-ivory)] text-[var(--atelier-ink-deep)]"
                : "rounded-full border-[var(--atelier-line)] bg-transparent text-[var(--atelier-ink-deep)]"
              : scrolled
                ? "rounded-2xl border-black/10 bg-white/80 text-dark"
                : "rounded-2xl border-white/25 bg-black/10 text-white backdrop-blur-sm")
          }
        >
          <span className="sr-only">Open menu</span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span className="h-0.5 w-full rounded-full bg-current" />
            <span className="h-0.5 w-full rounded-full bg-current" />
            <span className="h-0.5 w-full rounded-full bg-current" />
          </span>
        </button>
      </div>

      <MobileMenu
        appearance={appearance}
        open={menuOpen}
        onClose={closeMenu}
        reservationSettings={reservationSettings}
        siteSettings={siteSettings}
      />
    </header>
  );
}
