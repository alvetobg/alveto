import Image from "next/image";

import Container from "@/components/ui/Container";
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
  const addressLines = [
    siteSettings.addressLine,
    [siteSettings.city, siteSettings.country].filter(Boolean).join(", "),
  ].filter((value): value is string => Boolean(value));
  const hours = groupBusinessHours(siteSettings);
  const canReserve = Boolean(
    reservationSettings?.reservationsEnabled &&
      reservationSettings.reservationUrl,
  );
  const primaryLinks = [
    { label: "Menu", url: "/menu" },
    ...(canReserve
      ? [
          {
            label: reservationSettings?.primaryCtaLabel ?? "Reservation",
            url: reservationSettings?.reservationUrl ?? "#reservation",
          },
        ]
      : []),
    ...siteSettings.footerNavigationLinks,
  ].filter(
    (link, index, links) =>
      links.findIndex((candidate) => candidate.url === link.url) === index,
  );

  return (
    <footer className="bg-dark py-14 text-cream md:py-16 lg:py-20">
      <Container>
        <h2 className="sr-only">{siteSettings.businessName} information</h2>

        <div className="flex flex-col gap-8 border-b border-white/12 pb-10 sm:flex-row sm:items-end sm:justify-between md:pb-12">
          <Image
            src="/logos/alveto-wordmark.png"
            alt={siteSettings.businessName}
            width={176}
            height={43}
            sizes="(max-width: 767px) 148px, 176px"
            className="h-auto w-[148px] md:w-44"
          />

          {primaryLinks.length > 0 ? (
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
                {primaryLinks.map((link) => (
                  <li key={`${link.label}-${link.url}`}>
                    <a
                      href={link.url}
                      target={link.url.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="transition-colors duration-200 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>

        <div className="grid gap-9 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-12">
          <FooterGroup title="Visit">
            {addressLines.length > 0 ? (
              siteSettings.googleMapsUrl ? (
                <a
                  href={siteSettings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-primary"
                >
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </a>
              ) : (
                <p>
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              )
            ) : null}
          </FooterGroup>

          <FooterGroup title="Hours">
            {hours.map((group) => (
              <p key={`${group.days}-${group.hours}`} className="mb-2 last:mb-0">
                <span className="block">{group.days}</span>
                <span className="block">{group.hours}</span>
              </p>
            ))}
          </FooterGroup>

          {email || (phoneNumber && phoneHref) ? (
            <FooterGroup title="Contact">
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="block transition-colors duration-200 hover:text-primary"
                >
                  {email}
                </a>
              ) : null}
              {phoneNumber && phoneHref ? (
                <a
                  href={phoneHref}
                  className="mt-1 block transition-colors duration-200 hover:text-primary"
                >
                  {phoneNumber}
                </a>
              ) : null}
            </FooterGroup>
          ) : null}

          <FooterGroup title="Follow">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {siteSettings.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="capitalize transition-colors duration-200 hover:text-primary"
                >
                  {link.platform}
                </a>
              ))}
              {siteSettings.googleMapsUrl ? (
                <a
                  href={siteSettings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-primary"
                >
                  Maps
                </a>
              ) : null}
            </div>
          </FooterGroup>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/12 pt-7 text-xs leading-5 text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            {formatCopyright(
              siteSettings.footerCopyrightText,
              siteSettings.businessName,
            )}
          </p>
          {siteSettings.footerLegalLinks.length > 0 ? (
            <nav aria-label="Legal navigation">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {siteSettings.footerLegalLinks.map((link) => (
                  <li key={`${link.label}-${link.url}`}>
                    <a
                      href={link.url}
                      target={link.url.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.url.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="transition-colors duration-200 hover:text-primary"
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

function FooterGroup({
  title,
  children,
}: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
        {title}
      </h3>
      <div className="text-sm leading-6 text-white/72">{children}</div>
    </section>
  );
}
