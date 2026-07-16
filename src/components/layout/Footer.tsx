import Image from "next/image";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1B1B1B] text-white">
      {/* Background glow */}

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <Container>
        {/* CTA */}

        <div className="relative border-b border-white/10 py-24 text-center md:py-32">
          <Image
            src="/logos/alveto-logo.png"
            alt="Alveto"
            width={190}
            height={70}
            priority={false}
            className="mx-auto mb-10"
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
            <Button href="#reservation">
              Reserve a Table
            </Button>
          </div>
        </div>

        {/* Content */}

        <div className="grid gap-16 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">
              ALVETO
            </h3>

            <p className="mt-6 max-w-sm leading-8 text-white/65">
              More than coffee.
              <br />
              A place to slow down, enjoy great food and create memorable moments.
            </p>
          </div>

          {/* Visit */}

          <div className="text-center md:text-left">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[4px] text-white/40">
              Visit
            </h4>

            <p className="leading-8 text-white/80">
              Sokolska 4
              <br />
              Belgrade, Serbia
            </p>
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
                href="mailto:alveto.bg@gmail.com"
                className="block transition-colors duration-300 hover:text-primary"
              >
                alveto.bg@gmail.com
              </a>

              <a
                href="tel:+381665707777"
                className="block transition-colors duration-300 hover:text-primary"
              >
                +381 66 570 7777
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="block transition-colors duration-300 hover:text-primary"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} ALVETO. All rights reserved.
          </p>

          <p>
            Crafted with care in Belgrade.
          </p>
        </div>
      </Container>
    </footer>
  );
}