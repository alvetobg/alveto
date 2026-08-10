import Image from "next/image";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import type { PublicReservationSettings } from "@/features/reservations/types";
import {
  formatCopyright,
  groupBusinessHours,
} from "@/features/site-settings/presentation";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type FooterProps = Readonly<{
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

export default function Footer({
  reservationSettings,
  siteSettings,
}: FooterProps) {
  const email = siteSettings.publicEmail ?? reservationSettings?.email ?? null;
  const phoneNumber =
    siteSettings.publicPhone ?? reservationSettings?.phoneNumber ?? null;
  const phoneHref =
    siteSettings.phoneHref ?? reservationSettings?.phoneHref ?? null;
  const hours = groupBusinessHours(siteSettings);
  const addressLines = [
    siteSettings.addressLine,
    [siteSettings.city, siteSettings.country].filter(Boolean).join(", "),
  ].filter((value): value is string => Boolean(value));
  const footerLinks = [
    ...siteSettings.footerNavigationLinks.map((link) => ({
      ...link,
      key: `navigation-${link.label}-${link.url}`,
    })),
    ...siteSettings.footerLegalLinks.map((link) => ({
      ...link,
      key: `legal-${link.label}-${link.url}`,
    })),
  ];

  return (
    <footer className="relative overflow-hidden bg-[#1B1B1B] text-white">
      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <Container>
        {/* CTA */}

        <div className="relative border-b border-white/10 py-24 text-center md:py-32">
          <Image
            src="/logos/alveto-wordmark.png"
            alt={siteSettings.businessName}
            width={190}
            height={46}
            sizes="190px"
            className="mx-auto mb-10 h-auto w-[190px]"
          />

          <h2 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight md:text-6xl">
            See You at
            <br />
            {siteSettings.businessName}
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/70">
            Specialty coffee, handcrafted brunch,
            signature desserts and unforgettable moments
            in the heart of Belgrade.
          </p>

          {reservationSettings?.reservationsEnabled &&
          reservationSettings.reservationUrl ? (
            <div className="mt-12">
              <Button href={reservationSettings.reservationUrl}>
                {reservationSettings.primaryCtaLabel}
              </Button>
            </div>
          ) : null}
        </div>

        {/* Content */}

        <div className="grid gap-16 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">
              {siteSettings.businessName}
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
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[4px] text-white/40">
              Visit
            </h3>

            {addressLines.length > 0 ? (
              siteSettings.googleMapsUrl ? (
                <a
                  href={siteSettings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leading-8 text-white/80 transition-colors duration-300 hover:text-primary"
                >
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              ) : (
                <p className="leading-8 text-white/80">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              )
            ) : null}
          </div>

          {/* Hours */}

          <div className="text-center md:text-left">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[4px] text-white/40">
              Hours
            </h3>

            <div className="space-y-3 leading-8 text-white/80">
              {hours.map((group) => (
                <p key={`${group.days}-${group.hours}`}>
                  <span className="block">{group.days}</span>
                  <span className="block">{group.hours}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Contact */}

          <div className="text-center md:text-left">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[4px] text-white/40">
              Contact
            </h3>

            <div className="space-y-3">
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="block transition-colors duration-300 hover:text-primary"
                >
                  {email}
                </a>
              ) : null}

              {phoneNumber && phoneHref ? (
                <a
                  href={phoneHref}
                  className="block transition-colors duration-300 hover:text-primary"
                >
                  {phoneNumber}
                </a>
              ) : null}

              {siteSettings.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block capitalize transition-colors duration-300 hover:text-primary"
                >
                  {link.platform}
                </a>
              ))}

              {siteSettings.googleMapsUrl ? (
                <a
                  href={siteSettings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors duration-300 hover:text-primary"
                >
                  Google Maps
                </a>
              ) : null}
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-sm text-white/40 md:flex-row">
          <p>
            {formatCopyright(
              siteSettings.footerCopyrightText,
              siteSettings.businessName,
            )}
          </p>

          {footerLinks.length > 0 ? (
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-end">
                {footerLinks.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.url}
                      target={
                        link.url.startsWith("https://") ? "_blank" : undefined
                      }
                      rel={
                        link.url.startsWith("https://")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            <p>Every Moment Has a Flavor.</p>
          )}
        </div>
      </Container>
    </footer>
  );
}
