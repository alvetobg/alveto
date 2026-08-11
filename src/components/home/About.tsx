import Image from "next/image";

import AtelierMotion from "@/components/home/AtelierMotion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import type { PublicReservationSettings } from "@/features/reservations/types";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type AboutProps = Readonly<{
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

export default function About({
  reservationSettings,
  siteSettings,
}: AboutProps) {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-[var(--atelier-paper)] py-20 sm:py-28 lg:py-36"
    >
      <Container className="max-w-[1440px]">
        <div className="grid min-w-0 gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="min-w-0 lg:col-span-5 lg:pr-5">
            <p className="flex items-center gap-3 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--atelier-ink-soft)] sm:text-xs">
              <span className="h-px w-10 bg-[var(--atelier-coral)]" />
              About {siteSettings.businessName}
            </p>
            <h2
              id="about-title"
              className="mt-7 max-w-[9ch] font-[family-name:var(--font-display)] text-[clamp(2.85rem,7vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.06em] text-balance"
            >
              More Than Just Coffee.
            </h2>
            <p className="mt-8 max-w-xl border-l border-[var(--atelier-coral)] pl-6 text-lg leading-9 text-[var(--atelier-ink-soft)] sm:text-xl">
              {siteSettings.shortBrandDescription}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              {reservationSettings?.reservationsEnabled &&
              reservationSettings.reservationUrl ? (
                <Button
                  href="#reservation"
                  variant="atelier"
                  className="min-h-12 w-full rounded-full px-8 sm:w-auto"
                >
                  {reservationSettings.primaryCtaLabel}
                </Button>
              ) : null}

              <Button
                href="/menu"
                variant="ghost"
                className="min-h-12 w-full rounded-full border border-[var(--atelier-ink)]/26 px-8 sm:w-auto"
              >
                Explore Menu
              </Button>
            </div>
          </div>

          <AtelierMotion className="min-w-0 lg:col-span-7">
            <div className="grid min-w-0 gap-4 sm:grid-cols-12 sm:items-end sm:gap-5">
              <figure className="relative aspect-[5/4] min-w-0 overflow-hidden rounded-[1.25rem] bg-[var(--atelier-ivory-deep)] sm:col-span-8 sm:aspect-[4/5] sm:rounded-[1.75rem] lg:aspect-[5/6]">
                <Image
                  src="/images/about/interior-1.webp"
                  alt="Alveto interior"
                  fill
                  quality={85}
                  sizes="(max-width: 639px) calc(100vw - 48px), (max-width: 1023px) 62vw, 38vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.018] motion-reduce:transform-none"
                />
              </figure>

              <figure className="relative hidden aspect-[4/5] min-w-0 overflow-hidden rounded-[1.5rem] bg-[var(--atelier-ivory-deep)] sm:col-span-4 sm:block sm:translate-y-10 lg:translate-y-14">
                <Image
                  src="/images/about/interior-2.webp"
                  alt=""
                  fill
                  quality={85}
                  sizes="(max-width: 1023px) 30vw, 20vw"
                  className="object-cover"
                />
              </figure>
            </div>
          </AtelierMotion>
        </div>
      </Container>
    </section>
  );
}
