import Image from "next/image";

import Heading from "@/components/ui/Heading";
import PremiumButton from "@/components/ui/PremiumButton";
import PremiumContainer from "@/components/ui/PremiumContainer";
import Section from "@/components/ui/Section";
import type { HomepageAboutImages } from "@/features/homepage/types";
import type { PublicReservationSettings } from "@/features/reservations/types";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type AboutProps = Readonly<{
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
  images: HomepageAboutImages | null;
}>;

export default function About({
  reservationSettings,
  siteSettings,
  images,
}: AboutProps) {
  const canReserve = Boolean(
    reservationSettings?.reservationsEnabled &&
      reservationSettings.reservationUrl,
  );
  const primaryImage = images?.primary;
  const secondaryImage = images?.secondary;

  return (
    <Section id="about" className="bg-cream">
      <PremiumContainer>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
          <div className="mx-auto w-full max-w-[620px] md:relative md:pb-12 lg:mx-0">
            <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-[#eee8df] md:aspect-[4/3] md:w-[90%] md:rounded-[24px]">
              <Image
                src={primaryImage?.url ?? "/images/about/interior-1.webp"}
                alt={
                  primaryImage?.altText ??
                  "Warm dining and seating area inside Alveto"
                }
                fill
                quality={85}
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 560px, 560px"
                className="object-cover object-[56%_52%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:object-[50%_52%] motion-safe:group-hover:scale-[1.012] motion-reduce:transition-none"
              />
            </div>

            <div className="group relative ml-auto mt-4 aspect-[3/2] w-[68%] overflow-hidden rounded-[18px] bg-[#eee8df] md:absolute md:bottom-0 md:right-0 md:mt-0 md:w-[42%] md:rounded-[20px] md:border-[6px] md:border-cream">
              <Image
                src={secondaryImage?.url ?? "/images/about/interior-2.webp"}
                alt={secondaryImage?.altText ?? "Interior details at Alveto"}
                fill
                quality={85}
                sizes="(max-width: 767px) 68vw, 260px"
                className="object-cover object-[50%_48%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.012] motion-reduce:transition-none"
              />
            </div>
          </div>

          <div className="lg:py-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary md:text-xs">
              About {siteSettings.businessName}
            </p>
            <Heading className="mt-4">
              More Than{" "}
              <br />
              Just Coffee.
            </Heading>

            <p className="mt-6 max-w-xl text-base leading-8 text-text md:mt-8 md:text-lg md:leading-9">
              {siteSettings.shortBrandDescription}
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-text md:mt-6 md:text-lg md:leading-9">
              Every detail, from the ingredients we choose to the interior we
              created, exists for one reason: to make every visit feel worth
              remembering.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
              {canReserve ? (
                <PremiumButton
                  href="#reservation"
                  className="w-full sm:w-auto"
                >
                  {reservationSettings?.primaryCtaLabel}
                </PremiumButton>
              ) : null}
              <PremiumButton
                href="/menu"
                variant="outline"
                showArrow
                className="w-full sm:w-auto"
              >
                Explore Menu
              </PremiumButton>
            </div>
          </div>
        </div>
      </PremiumContainer>
    </Section>
  );
}
