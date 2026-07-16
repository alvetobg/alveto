"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] =useState(false);

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
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:h-24 lg:px-12 xl:px-16">
        <Link
          href="/"
          aria-label="ALVETO Home"
          className="shrink-0"
        >
          <Image
            src="/logos/alveto-logo.png"
            alt="Alveto"
            width={132}
            height={42}
            priority
            sizes="132px"
            className="transition-transform duration-300 hover:scale-[1.03]"
          />
        </Link>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-3 sm:gap-5 lg:gap-8"
        >
          <a
            href="#experience"
            className={`hidden text-[15px] font-semibold tracking-wide transition-colors duration-300 md:block ${
              scrolled
                ? "text-dark hover:text-primary"
                : "text-white hover:text-white/80"
            }`}
          >
            Experience
          </a>

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

          <Button href="#reservation">
            Reserve
          </Button>
        </nav>
      </div>
    </header>
  );
}