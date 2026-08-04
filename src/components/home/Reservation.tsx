import Image from "next/image";

import FadeIn from "@/components/animations/FadeIn";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import type { PublicReservationSettings } from "@/features/reservations/types";
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

  const phoneHref = siteSettings.phoneHref ?? settings.phoneHref;
  const whatsappHref =
    siteSettings.socialLinks.find((link) => link.platform === "whatsapp")?.url ??
    settings.whatsappHref;

  return (
    <Section
      id="reservation"
      className="relative overflow-hidden text-white"
    >
      <Image
        src="/images/hero.jpg"
        alt="Alveto"
        fill
        sizes="100vw"
        className="object-cover scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85" />

      <Container>
        <FadeIn>
          <div className="relative z-10 mx-auto max-w-4xl py-24 text-center md:py-36">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[8px] text-primary">
              RESERVATION
            </p>

            <Heading className="text-white">
              Reserve Your
              <br />
              Experience
            </Heading>

            {settings.secondaryMessage ? (
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/75">
                {settings.secondaryMessage}
              </p>
            ) : null}

            <div className="mt-14 flex flex-wrap justify-center gap-5">
              <Button href={settings.reservationUrl}>
                {settings.primaryCtaLabel}
              </Button>

              {phoneHref ? (
                <Button href={phoneHref} variant="secondary">
                  Call Us
                </Button>
              ) : null}

              {whatsappHref ? (
                <Button href={whatsappHref} variant="secondary">
                  WhatsApp
                </Button>
              ) : null}
            </div>

            {settings.bookingInstructions ? (
              <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/65">
                {settings.bookingInstructions}
              </p>
            ) : null}
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
