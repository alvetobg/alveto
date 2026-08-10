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
      className="bg-[var(--atelier-ivory)] py-24 sm:py-28 lg:py-36"
    >
      <Container>
        <div className="grid min-w-0 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 lg:col-span-5 lg:pr-8">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--atelier-ink-soft)]">
              <span className="h-2 w-2 rounded-full bg-[var(--atelier-coral)]" />
              About {siteSettings.businessName}
            </p>
            <h2
              id="about-title"
              className="mt-7 max-w-[9ch] font-[family-name:var(--font-display)] text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-balance"
            >
              More Than Just Coffee.
            </h2>
            <p className="mt-8 border-l-2 border-[var(--atelier-coral)] pl-6 text-lg leading-9 text-[var(--atelier-ink-soft)] sm:text-xl">
              {siteSettings.shortBrandDescription}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              {reservationSettings?.reservationsEnabled &&
              reservationSettings.reservationUrl ? (
                <Button
                  href="#reservation"
                  variant="atelier"
                  className="min-h-12 w-full rounded-full px-7 sm:w-auto"
                >
                  {reservationSettings.primaryCtaLabel}
                </Button>
              ) : null}

              <Button
                href="/menu"
                variant="ghost"
                className="min-h-12 w-full rounded-full border border-[var(--atelier-ink)]/20 px-7 sm:w-auto"
              >
                Explore Menu
              </Button>
            </div>
          </div>

          <AtelierMotion
            direction="right"
            className="min-w-0 lg:col-span-7"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] rounded-bl-[5rem] bg-[var(--atelier-ivory-deep)] shadow-[0_24px_70px_rgba(34,34,34,0.1)] sm:aspect-[16/12] sm:rounded-[2.25rem] sm:rounded-bl-[8rem] lg:aspect-[4/5] xl:aspect-[16/13]">
              <Image
                src="/images/about/interior-1.webp"
                alt="Alveto interior"
                fill
                quality={85}
                sizes="(max-width: 1023px) calc(100vw - 48px), 58vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.02] motion-reduce:transform-none"
              />

              <div className="absolute bottom-5 right-5 aspect-[4/5] w-[36%] overflow-hidden rounded-2xl border-[5px] border-[var(--atelier-ivory)] bg-[var(--atelier-ivory)] shadow-[0_18px_45px_rgba(34,34,34,0.2)] sm:bottom-8 sm:right-8 sm:rounded-[1.75rem] sm:border-[7px]">
                <Image
                  src="/images/about/interior-2.webp"
                  alt=""
                  fill
                  quality={85}
                  sizes="(max-width: 1023px) 32vw, 220px"
                  className="object-cover"
                />
              </div>
            </div>
          </AtelierMotion>
        </div>
      </Container>
    </section>
  );
}
