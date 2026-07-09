import Image from "next/image";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1B1B1B] text-white">

      {/* Background glow */}
      <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <Container>

        {/* CTA */}

        <div className="relative border-b border-white/10 py-24 text-center">

          <Image
            src="/logos/alveto-logo.png"
            alt="Alveto"
            width={180}
            height={65}
            className="mx-auto mb-10"
          />

          <h2 className="mx-auto max-w-3xl text-5xl font-bold leading-tight md:text-6xl">
            See You at
            <br />
            Alveto
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/70">
            Specialty coffee, handcrafted brunch,
            signature desserts and unforgettable evenings
            in the heart of Belgrade.
          </p>

          <div className="mt-12">
            <Button href="#reservation">
              Reserve a Table
            </Button>
          </div>

        </div>

        {/* Info */}

        <div className="grid gap-14 py-20 text-center md:grid-cols-4 md:text-left">

          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[5px] text-white/40">
              Visit
            </h3>

            <p className="leading-8 text-white/80">
              Alveto
              <br />
              Sokolska 4,  Belgrade, Serbia
            </p>

          </div>

          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[5px] text-white/40">
              Hours
            </h3>

            <p className="leading-8 text-white/80">
              Monday – Sunday
              <br />
              09:00 – 00:00
            </p>

          </div>

          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[5px] text-white/40">
              Contact
            </h3>

            <p className="leading-8 text-white/80">
              alveto.bg@gmail.com
              <br />
              +381 66 570 7777
            </p>

          </div>

          <div>

            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[5px] text-white/40">
              Follow Us
            </h3>

            <div className="space-y-3">

              <a
                href="https://instagram.com"
                target="_blank"
                className="block transition hover:text-primary"
              >
                Instagram
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                className="block transition hover:text-primary"
              >
                TikTok
              </a>

              <a
                href="https://maps.google.com"
                target="_blank"
                className="block transition hover:text-primary"
              >
                Google Maps
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 py-8 text-sm text-white/40 md:flex-row">

          <p>
            © {new Date().getFullYear()} ALVETO.
            All rights reserved.
          </p>

          <p>
            Designed with ❤️ for coffee lovers.
          </p>

        </div>

      </Container>

    </footer>
  );
}