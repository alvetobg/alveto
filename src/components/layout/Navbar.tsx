"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import MobileMenu from "@/components/layout/MobileMenu";
import Button from "@/components/ui/Button";
import type { PublicReservationSettings } from "@/features/reservations/types";

type NavbarProps = Readonly<{
  reservationSettings: PublicReservationSettings | null;
}>;

export default function Navbar({ reservationSettings }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-black/5 bg-white/75 shadow-[0_12px_40px_rgba(0,0,0,0.06)] supports-[backdrop-filter]:backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-6 md:px-8 lg:h-24 lg:px-12 xl:px-16">
        <Link
          href="/"
          aria-label="ALVETO Home"
          className="shrink-0"
        >
          <Image
            src="/logos/alveto-wordmark.png"
            alt="Alveto"
            width={132}
            height={32}
            sizes="132px"
            className="h-auto w-[132px] transition-transform duration-300 hover:scale-[1.03]"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 md:flex lg:gap-8"
        >
          <Link
            href="/#experience"
            className={`text-[15px] font-semibold tracking-wide transition-colors duration-300 ${
              scrolled
                ? "text-dark hover:text-primary"
                : "text-white hover:text-white/80"
            }`}
          >
            Experience
          </Link>

          <Link
            href="/menu"
            className={`text-[15px] font-semibold tracking-wide transition-colors duration-300 ${
              scrolled
                ? "text-dark hover:text-primary"
                : "text-white hover:text-white/80"
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
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-colors duration-300 md:hidden ${
            scrolled
              ? "border-black/10 bg-white/80 text-dark"
              : "border-white/25 bg-black/10 text-white backdrop-blur-sm"
          }`}
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
        open={menuOpen}
        onClose={closeMenu}
        reservationSettings={reservationSettings}
      />
    </header>
  );
}
