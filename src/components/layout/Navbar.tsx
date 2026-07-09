"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full will-change-transform transition-all duration-500 ${
        scrolled
          ? "border-b border-black/5 bg-white/75 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/">
  <Image
    src="/logos/alveto-logo.png"
    alt="Alveto"
    width={145}
    height={46}
    priority
    className="transition duration-300 hover:scale-105"
  />
</Link>   

        <nav className="flex items-center gap-8 lg:gap-10">
          <a
            href="#experience"
            className={`text-[15px] font-semibold tracking-wide transition-all duration-300 ${
              scrolled
                ? "text-dark hover:text-primary"
                : "text-white hover:text-white/70"
            }`}
          >
            Experience
          </a>

          <Link
  href="/menu"
  className={`text-[15px] font-semibold tracking-wide transition-all duration-300 ${
    scrolled
      ? "text-dark hover:text-primary"
      : "text-white hover:text-white/70"
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