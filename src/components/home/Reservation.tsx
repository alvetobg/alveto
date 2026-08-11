import Heading from "@/components/ui/Heading";
import PremiumButton from "@/components/ui/PremiumButton";
import PremiumContainer from "@/components/ui/PremiumContainer";
import Section from "@/components/ui/Section";
import type { PublicReservationSettings } from "@/features/reservations/types";
import { formatAddress } from "@/features/site-settings/presentation";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type ReservationProps = Readonly<{
  settings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

export default function Reservation({
  settings,
  siteSettings,
}: ReservationProps) {
  if (!settings?.reservationsEnabled || !settings.reservationUrl) {
    return null;
  }

  const address = formatAddress(siteSettings);
  const phoneNumber = siteSettings.publicPhone ?? settings.phoneNumber;
  const phoneHref = siteSettings.phoneHref ?? settings.phoneHref;
  const email = siteSettings.publicEmail ?? settings.email;

  return (
    <Section id="reservation" className="bg-cream">
      <PremiumContainer>
        <div className="rounded-[22px] bg-primary px-6 py-10 text-dark min-[375px]:px-8 md:rounded-[26px] md:px-12 md:py-14 lg:grid lg:grid-cols-12 lg:items-end lg:gap-12 lg:px-16 lg:py-16">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-dark/70 md:text-xs">
              Reservation
            </p>
            <Heading className="mt-4 text-dark">
              Reserve Your{" "}
              <br />
              Experience
            </Heading>
          </div>

          <div className="mt-7 lg:col-span-6 lg:mt-0">
            {settings.secondaryMessage ? (
              <p className="max-w-xl text-base leading-7 text-dark/80 md:text-lg md:leading-8">
                {settings.secondaryMessage}
              </p>
            ) : null}

            <PremiumButton
              href={settings.reservationUrl}
              variant="dark"
              showArrow
              className="mt-7 w-full sm:w-auto"
            >
              {settings.primaryCtaLabel}
            </PremiumButton>

            <div className="mt-8 flex flex-col gap-2 border-t border-dark/16 pt-6 text-sm leading-6 text-dark/78 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {address ? (
                siteSettings.googleMapsUrl ? (
                  <a
                    href={siteSettings.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-dark"
                  >
                    {address}
                  </a>
                ) : (
                  <span>{address}</span>
                )
              ) : null}
              {phoneNumber && phoneHref ? (
                <a
                  href={phoneHref}
                  className="transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-dark"
                >
                  {phoneNumber}
                </a>
              ) : null}
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-dark"
                >
                  {email}
                </a>
              ) : null}
            </div>

            {settings.bookingInstructions ? (
              <p className="mt-5 max-w-xl text-xs leading-5 text-dark/75">
                {settings.bookingInstructions}
              </p>
            ) : null}
          </div>
        </div>
      </PremiumContainer>
    </Section>
  );
}
