import Image from "next/image";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1B1B1B] text-white">
      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <Container>
        {/* CTA */}

        <div className="relative border-b border-white/10 py-24 text-center md:py-32">
          <Image
            src="/logos/alveto-wordmark.png"
            alt="Alveto"
            width={190}
            height={46}
            sizes="190px"
            className="mx-auto mb-10 h-auto w-[190px]"
          />

          <h2 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight md:text-6xl">
            See You at
            <br />
            Alveto
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/70">
            Specialty coffee, handcrafted brunch,
            signature desserts and unforgettable moments
            in the heart of Belgrade.
          </p>

          <div className="mt-12">
            <Button href={site.instagram}>
              Reserve a Table
            </Button>
          </div>
        </div>

        {/* Content */}

        <div className="grid gap-16 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">
              {site.name}
            </h3>

            <p className="mt-6 max-w-sm leading-8 text-white/65">
              More than coffee.
              <br />
              A place to slow down, enjoy great food and create memorable
              moments.
            </p>
          </div>

          {/* Visit */}

          <div className="text-center md:text-left">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[4px] text-white/40">
              Visit
            </h4>

            <a
              href={site.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="leading-8 text-white/80 transition-colors duration-300 hover:text-primary"
            >
              Sokolska 4
              <br />
              Belgrade, Serbia
            </a>
          </div>

          {/* Hours */}

          <div className="text-center md:text-left">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[4px] text-white/40">
              Hours
            </h4>

            <p className="leading-8 text-white/80">
              Monday – Sunday
              <br />
              09:00 – 00:00
            </p>
          </div>

          {/* Contact */}

          <div className="text-center md:text-left">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[4px] text-white/40">
              Contact
            </h4>

            <div className="space-y-3">
              <a
                href={`mailto:${site.email}`}
                className="block transition-colors duration-300 hover:text-primary"
              >
                {site.email}
              </a>

              <a
                href={`tel:${site.phone}`}
                className="block transition-colors duration-300 hover:text-primary"
              >
                {site.phoneDisplay}
              </a>

              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors duration-300 hover:text-primary"
              >
                Instagram
              </a>

              <a
                href={site.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors duration-300 hover:text-primary"
              >
                Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>

          <p>
            Every Moment Has a Flavor.
          </p>
        </div>
      </Container>
    </footer>
  );
}
