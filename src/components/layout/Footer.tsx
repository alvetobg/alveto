import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import type { PublicReservationSettings } from "@/features/reservations/types";
import {
  formatCopyright,
  groupBusinessHours,
} from "@/features/site-settings/presentation";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type FooterProps = Readonly<{
  appearance?: "classic" | "atelier";
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

export default function Footer({
  appearance = "classic",
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

  if (appearance === "atelier") {
    return (
      <footer className="bg-[var(--atelier-ink-deep)] text-[var(--atelier-ivory)]">
        <Container>
          <div className="grid gap-10 border-b border-white/16 py-20 sm:py-24 lg:grid-cols-12 lg:items-end lg:gap-12 lg:py-28">
            <div className="lg:col-span-5">
              <Image
                src="/logos/alveto-wordmark.png"
                alt={siteSettings.businessName}
                width={360}
                height={88}
                sizes="(max-width: 639px) 220px, 320px"
                className="h-auto w-[220px] sm:w-80"
              />
            </div>

            <div className="min-w-0 lg:col-span-7">
              <h2 className="max-w-[11ch] font-[family-name:var(--font-display)] text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-balance">
                See You at {siteSettings.businessName}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--atelier-ivory)]/72 sm:text-lg">
                {siteSettings.shortBrandDescription}
              </p>

              {reservationSettings?.reservationsEnabled &&
              reservationSettings.reservationUrl ? (
                <div className="mt-8">
                  <Button
                    href={reservationSettings.reservationUrl}
                    variant="atelier"
                    className="min-h-12 w-full rounded-full px-8 sm:w-auto"
                  >
                    {reservationSettings.primaryCtaLabel}
                  </Button>
                </div>
              ) : null}
            </div>
          </div>

          <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-20">
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atelier-ivory)]/58">
                Explore
              </h3>
              <nav aria-label="Footer primary navigation" className="mt-5">
                <ul className="space-y-1">
                  <li>
                    <Link
                      href="/menu"
                      className="inline-flex min-h-11 items-center text-[var(--atelier-ivory)]/82 transition-colors hover:text-[var(--atelier-coral)]"
                    >
                      Menu
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#experience"
                      className="inline-flex min-h-11 items-center text-[var(--atelier-ivory)]/82 transition-colors hover:text-[var(--atelier-coral)]"
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
                        className="inline-flex min-h-11 items-center text-[var(--atelier-ivory)]/82 transition-colors hover:text-[var(--atelier-coral)]"
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
                    className="mt-5 inline-flex min-h-11 flex-col justify-center leading-7 text-[var(--atelier-ivory)]/82 transition-colors hover:text-[var(--atelier-coral)]"
                  >
                    {addressLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </a>
                ) : (
                  <p className="mt-5 leading-7 text-[var(--atelier-ivory)]/82">
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
              <div className="mt-5 space-y-4 leading-7 text-[var(--atelier-ivory)]/82">
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
              <div className="mt-5 flex flex-col">
                {email ? (
                  <a
                    href={"mailto:" + email}
                    className="inline-flex min-h-11 items-center break-all text-[var(--atelier-ivory)]/82 transition-colors hover:text-[var(--atelier-coral)]"
                  >
                    {email}
                  </a>
                ) : null}

                {phoneNumber && phoneHref ? (
                  <a
                    href={phoneHref}
                    className="inline-flex min-h-11 items-center text-[var(--atelier-ivory)]/82 transition-colors hover:text-[var(--atelier-coral)]"
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
                    className="inline-flex min-h-11 items-center capitalize text-[var(--atelier-ivory)]/82 transition-colors hover:text-[var(--atelier-coral)]"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-5 border-t border-white/16 py-8 text-sm text-[var(--atelier-ivory)]/62 sm:flex-row sm:items-center sm:justify-between">
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
