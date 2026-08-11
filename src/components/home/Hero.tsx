import Image from "next/image";

import AtelierMotion from "@/components/home/AtelierMotion";
import Button from "@/components/ui/Button";
import type {
  HomepageHero,
  PublishedHomepageResult,
} from "@/features/homepage/types";
import type { PublicReservationSettings } from "@/features/reservations/types";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type HeroProps = Readonly<{
  content: HomepageHero | null;
  state: PublishedHomepageResult["state"];
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

export default function Hero({
  content,
  state,
  reservationSettings,
  siteSettings,
}: HeroProps) {
  const location = [siteSettings.city, siteSettings.country]
    .filter(Boolean)
    .join(", ");

  return (
    <section
      data-homepage-hero
      aria-labelledby="homepage-hero-title"
      className="relative bg-[var(--atelier-ivory)] text-[var(--atelier-ink-deep)]"
    >
      <div className="mx-auto grid min-h-[100svh] max-w-[1600px] pt-20 lg:grid-cols-12 lg:pt-0">
        <div className="order-1 flex min-w-0 flex-col justify-center px-6 pb-12 pt-12 sm:px-8 sm:pb-16 sm:pt-16 lg:col-span-5 lg:min-h-[100svh] lg:px-12 lg:pb-16 lg:pt-32 xl:px-16 2xl:px-20">
          <AtelierMotion eager>
            <p className="flex items-center gap-4 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-[var(--atelier-ink-soft)] sm:text-xs">
              <span className="h-px w-10 bg-[var(--atelier-coral)]" />
              Alveto · Vračar
            </p>

            {content ? (
              <>
                <h1
                  id="homepage-hero-title"
                  className="mt-7 max-w-[10ch] whitespace-pre-line font-[family-name:var(--font-display)] text-[clamp(3.35rem,15vw,5.5rem)] font-medium leading-[0.9] tracking-[-0.065em] text-balance sm:mt-9 sm:text-[clamp(4.25rem,11vw,6rem)] lg:max-w-[8.5ch] lg:text-[clamp(4.8rem,6.5vw,7rem)]"
                >
                  {content.title}
                </h1>

                <p className="mt-7 max-w-lg text-base leading-7 text-[var(--atelier-ink-soft)] sm:text-lg sm:leading-8 lg:mt-8 lg:text-[1.18rem] lg:leading-9">
                  {content.subtitle}
                </p>
              </>
            ) : (
              <>
                <h1
                  id="homepage-hero-title"
                  className="mt-7 font-[family-name:var(--font-display)] text-[clamp(3.75rem,16vw,6rem)] font-medium leading-[0.9] tracking-[-0.065em]"
                >
                  {siteSettings.businessName}
                </h1>
                <p className="mt-7 max-w-lg text-base leading-7 text-[var(--atelier-ink-soft)] sm:text-lg sm:leading-8">
                  {state === "error"
                    ? "Homepage content is temporarily unavailable."
                    : "New homepage content is coming soon."}
                </p>
              </>
            )}

            <div className="mt-9 flex w-full flex-col gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
              {content ? (
                <Button
                  href={content.buttonUrl}
                  variant="atelier"
                  className="min-h-12 w-full rounded-full px-8 sm:w-auto"
                >
                  {content.buttonLabel}
                  <span aria-hidden="true" className="ml-3 text-base">
                    ↗
                  </span>
                </Button>
              ) : null}

              {reservationSettings?.reservationsEnabled &&
              reservationSettings.reservationUrl ? (
                <Button
                  href="#reservation"
                  variant="ghost"
                  className="min-h-12 w-full rounded-full border border-[var(--atelier-ink)]/28 px-8 sm:w-auto"
                >
                  {reservationSettings.primaryCtaLabel}
                </Button>
              ) : null}
            </div>

            <div className="mt-11 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-t border-[var(--atelier-line)] pt-5 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--atelier-ink-soft)] sm:mt-14 sm:text-xs">
              <span>01</span>
              <span>Coffee / Brunch / Desserts / Cocktails</span>
            </div>
          </AtelierMotion>
        </div>

        <div className="order-2 min-w-0 px-4 pb-4 sm:px-7 sm:pb-7 lg:col-span-7 lg:flex lg:px-8 lg:pb-8 lg:pl-2 lg:pt-28 xl:pr-10">
          <div className="relative h-[46svh] min-h-[320px] max-h-[500px] w-full overflow-hidden rounded-[1.25rem] bg-[var(--atelier-ivory-deep)] sm:min-h-[390px] sm:rounded-[1.75rem] lg:h-auto lg:max-h-none lg:min-h-[calc(100svh-9rem)]">
            {content ? (
              <Image
                src={content.imagePath}
                alt=""
                fill
                priority
                quality={85}
                sizes="(max-width: 1023px) calc(100vw - 32px), 58vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="absolute inset-0 bg-[var(--atelier-ivory-deep)]" />
            )}

            {location ? (
              <p className="absolute bottom-4 left-4 max-w-[16rem] rounded-full bg-[var(--atelier-ivory)]/94 px-4 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[var(--atelier-ink-deep)] shadow-[0_8px_28px_rgba(34,34,34,0.1)] sm:bottom-6 sm:left-6 sm:text-xs">
                {location}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
