import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import type { PublicReservationSettings } from "@/features/reservations/types";
import {
  formatCopyright,
  groupBusinessHours,
} from "@/features/site-settings/presentation";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type AtelierFooterProps = Readonly<{
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

export default function AtelierFooter({
  reservationSettings,
  siteSettings,
}: AtelierFooterProps) {
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
      key: "navigation-" + link.label + "-" + link.url,
    })),
    ...siteSettings.footerLegalLinks.map((link) => ({
      ...link,
      key: "legal-" + link.label + "-" + link.url,
    })),
  ];

  return (
    <footer className="bg-[var(--atelier-ink-deep)] text-[var(--atelier-ivory)]">
      <Container className="max-w-[1440px]">
        <div className="grid gap-10 border-b border-white/14 py-16 sm:py-20 lg:grid-cols-12 lg:items-end lg:gap-14 lg:py-24">
          <div className="min-w-0 lg:col-span-7">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-[var(--atelier-ivory)]/58 sm:text-xs">
              Vračar · Belgrade
            </p>
            <Image
              src="/logos/alveto-wordmark.png"
              alt={siteSettings.businessName}
              width={520}
              height={127}
              sizes="(max-width: 639px) 240px, (max-width: 1023px) 360px, 480px"
              className="mt-7 h-auto w-[240px] sm:w-[360px] lg:w-[min(34vw,480px)]"
            />
          </div>

          <div className="min-w-0 lg:col-span-5">
            <h2 className="max-w-[12ch] font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.75rem)] font-medium leading-[0.92] tracking-[-0.055em] text-balance">
              Every Moment Has a Flavor.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--atelier-ivory)]/66 sm:text-base sm:leading-8">
              {siteSettings.shortBrandDescription}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button
                href="/menu"
                variant="atelier"
                className="min-h-12 w-full rounded-full px-8 sm:w-auto"
              >
                Explore Menu
              </Button>
              {reservationSettings?.reservationsEnabled &&
              reservationSettings.reservationUrl ? (
                <Button
                  href={reservationSettings.reservationUrl}
                  variant="secondary"
                  className="min-h-12 w-full rounded-full px-8 sm:w-auto"
                >
                  {reservationSettings.primaryCtaLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-10 py-12 min-[430px]:grid-cols-2 sm:py-16 lg:grid-cols-4 lg:gap-10 lg:py-20">
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atelier-ivory)]/58">
              Explore
            </h3>
            <nav aria-label="Footer primary navigation" className="mt-4">
              <ul>
                <li>
                  <Link
                    href="/menu"
                    className="inline-flex min-h-11 items-center text-sm text-[var(--atelier-ivory)]/78 transition-colors hover:text-[var(--atelier-coral)]"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#experience"
                    className="inline-flex min-h-11 items-center text-sm text-[var(--atelier-ivory)]/78 transition-colors hover:text-[var(--atelier-coral)]"
                  >
                    Experience
                  </Link>
                </li>
                {reservationSettings?.reservationsEnabled &&
                reservationSettings.reservationUrl ? (
                  <li>
                    <a
                      href={reservationSettings.reservationUrl}
                      target={
                        reservationSettings.reservationUrl.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        reservationSettings.reservationUrl.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex min-h-11 items-center text-sm text-[var(--atelier-ivory)]/78 transition-colors hover:text-[var(--atelier-coral)]"
                    >
                      {reservationSettings.primaryCtaLabel}
                    </a>
                  </li>
                ) : null}
              </ul>
            </nav>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atelier-ivory)]/58">
              Visit
            </h3>
            {addressLines.length > 0 ? (
              siteSettings.googleMapsUrl ? (
                <a
                  href={siteSettings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-11 flex-col justify-center text-sm leading-7 text-[var(--atelier-ivory)]/78 transition-colors hover:text-[var(--atelier-coral)]"
                >
                  {addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </a>
              ) : (
                <p className="mt-4 text-sm leading-7 text-[var(--atelier-ivory)]/78">
                  {addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              )
            ) : null}
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atelier-ivory)]/58">
              Hours
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--atelier-ivory)]/78">
              {hours.map((group) => (
                <p key={group.days + "-" + group.hours}>
                  <span className="block">{group.days}</span>
                  <span className="block">{group.hours}</span>
                </p>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atelier-ivory)]/58">
              Contact
            </h3>
            <div className="mt-4 flex flex-col">
              {email ? (
                <a
                  href={"mailto:" + email}
                  className="inline-flex min-h-11 items-center break-all text-sm text-[var(--atelier-ivory)]/78 transition-colors hover:text-[var(--atelier-coral)]"
                >
                  {email}
                </a>
              ) : null}

              {phoneNumber && phoneHref ? (
                <a
                  href={phoneHref}
                  className="inline-flex min-h-11 items-center text-sm text-[var(--atelier-ivory)]/78 transition-colors hover:text-[var(--atelier-coral)]"
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
                  className="inline-flex min-h-11 items-center text-sm capitalize text-[var(--atelier-ivory)]/78 transition-colors hover:text-[var(--atelier-coral)]"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/14 py-7 text-xs leading-6 text-[var(--atelier-ivory)]/52 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {formatCopyright(
              siteSettings.footerCopyrightText,
              siteSettings.businessName,
            )}
          </p>

          {footerLinks.length > 0 ? (
            <nav aria-label="Footer navigation">
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
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
                      className="inline-flex min-h-11 items-center transition-colors hover:text-[var(--atelier-coral)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
