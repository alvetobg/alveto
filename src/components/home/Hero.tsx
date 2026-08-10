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
      className="relative isolate overflow-hidden bg-[var(--atelier-ink-deep)] text-[var(--atelier-ivory)]"
    >
      <div className="mx-auto grid min-h-[100svh] max-w-[1600px] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <AtelierMotion
          eager
          direction="right"
          className="relative order-1 h-[52svh] min-h-[360px] overflow-hidden sm:min-h-[420px] lg:order-2 lg:h-auto lg:min-h-[100svh]"
        >
          {content ? (
            <Image
              src={content.imagePath}
              alt=""
              fill
              priority
              quality={85}
              sizes="(max-width: 1023px) 100vw, 56vw"
              className="object-cover object-center motion-reduce:transform-none"
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--atelier-ink)]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[var(--atelier-ink-deep)]/80 via-transparent to-[var(--atelier-ink-deep)]/25 lg:bg-gradient-to-r lg:from-[var(--atelier-ink-deep)]/35 lg:via-transparent lg:to-transparent" />

          <div className="absolute inset-x-0 bottom-8 flex items-end justify-between gap-5 px-6 sm:bottom-10 sm:px-8 lg:bottom-12 lg:px-12">
            <Image
              src="/logos/alveto-wordmark.png"
              alt={siteSettings.businessName}
              width={420}
              height={103}
              sizes="(max-width: 639px) 180px, (max-width: 1023px) 250px, 360px"
              draggable={false}
              className="h-auto w-[180px] select-none sm:w-[250px] lg:w-[min(25vw,360px)]"
            />
          </div>
        </AtelierMotion>

        <div className="relative z-10 order-2 -mt-9 flex min-w-0 flex-col justify-center rounded-t-[2rem] bg-[var(--atelier-ink-deep)] px-6 pb-16 pt-11 sm:-mt-12 sm:px-8 sm:pb-20 sm:pt-14 lg:order-1 lg:mt-0 lg:rounded-none lg:px-12 lg:pb-20 lg:pt-36 xl:px-20 2xl:px-24">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--atelier-ivory)]/72 sm:text-xs">
            <span className="h-px w-10 bg-[var(--atelier-coral)]" />
            <span>Coffee · Brunch · Desserts · Cocktails</span>
            {location ? (
              <>
                <span aria-hidden="true" className="text-[var(--atelier-coral)]">
                  /
                </span>
                <span>{location}</span>
              </>
            ) : null}
          </div>

          {content ? (
            <>
              <h1
                id="homepage-hero-title"
                className="mt-8 max-w-[10ch] whitespace-pre-line font-[family-name:var(--font-display)] text-[clamp(3rem,14vw,5.25rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-balance sm:mt-10 sm:text-[clamp(4rem,11vw,6rem)] lg:max-w-[9ch] lg:text-[clamp(4.8rem,7vw,7.5rem)]"
              >
                {content.title}
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-[var(--atelier-ivory)]/78 sm:text-lg sm:leading-8 lg:mt-9 lg:text-xl lg:leading-9">
                {content.subtitle}
              </p>
            </>
          ) : (
            <div className="mt-8 sm:mt-10">
              <h1
                id="homepage-hero-title"
                className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,16vw,6rem)] font-semibold leading-none tracking-[-0.06em]"
              >
                {siteSettings.businessName}
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[var(--atelier-ivory)]/78 sm:text-lg sm:leading-8">
                {state === "error"
                  ? "Homepage content is temporarily unavailable."
                  : "New homepage content is coming soon."}
              </p>
            </div>
          )}

          <div className="mt-9 flex w-full flex-col gap-3 sm:mt-11 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            {content ? (
              <Button
                href={content.buttonUrl}
                variant="atelier"
                className="min-h-12 w-full rounded-full px-7 sm:w-auto"
              >
                {content.buttonLabel}
              </Button>
            ) : null}

            {reservationSettings?.reservationsEnabled &&
            reservationSettings.reservationUrl ? (
              <Button
                href="#reservation"
                variant="secondary"
                className="min-h-12 w-full rounded-full px-7 sm:w-auto"
              >
                {reservationSettings.primaryCtaLabel}
              </Button>
            ) : null}
          </div>

          <div className="mt-12 border-t border-white/14 pt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--atelier-ivory)]/58 lg:mt-16">
            Morning / Afternoon / Evening
          </div>
        </div>
      </div>
    </section>
  );
}
