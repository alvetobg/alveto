import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
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

  const phoneHref = siteSettings.phoneHref ?? settings.phoneHref;
  const whatsappHref =
    siteSettings.socialLinks.find((link) => link.platform === "whatsapp")?.url ??
    settings.whatsappHref;
  const address = formatAddress(siteSettings);

  return (
    <section
      id="reservation"
      aria-labelledby="reservation-title"
      className="scroll-mt-20 bg-[var(--atelier-coral)] py-24 text-[var(--atelier-ink-deep)] sm:py-28 lg:py-32"
    >
      <Container>
        <div className="grid min-w-0 gap-12 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="min-w-0 lg:col-span-7">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]">
              <span className="h-px w-10 bg-current" />
              Reservation
            </p>
            <h2
              id="reservation-title"
              className="mt-7 max-w-[9ch] font-[family-name:var(--font-display)] text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-balance"
            >
              Reserve Your Experience
            </h2>
            {settings.secondaryMessage ? (
              <p className="mt-7 max-w-2xl text-base leading-8 sm:text-lg sm:leading-9">
                {settings.secondaryMessage}
              </p>
            ) : null}
          </div>

          <div className="min-w-0 border-y border-[var(--atelier-ink-deep)]/24 py-8 lg:col-span-5 lg:px-2 lg:py-10">
            <Button
              href={settings.reservationUrl}
              variant="ink"
              className="min-h-12 w-full rounded-full px-8 focus-visible:outline-[var(--atelier-ink-deep)] sm:w-auto"
            >
              {settings.primaryCtaLabel}
            </Button>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
              {phoneHref ? (
                <Button
                  href={phoneHref}
                  variant="ghost"
                  className="min-h-11 rounded-full border border-[var(--atelier-ink-deep)]/65 px-6 focus-visible:outline-[var(--atelier-ink-deep)]"
                >
                  Call Us
                </Button>
              ) : null}

              {whatsappHref ? (
                <Button
                  href={whatsappHref}
                  variant="ghost"
                  className="min-h-11 rounded-full border border-[var(--atelier-ink-deep)]/65 px-6 focus-visible:outline-[var(--atelier-ink-deep)]"
                >
                  WhatsApp
                </Button>
              ) : null}
            </div>

            {address ? (
              siteSettings.googleMapsUrl ? (
                <a
                  href={siteSettings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 flex min-h-11 items-center border-t border-[var(--atelier-ink-deep)]/18 pt-5 text-sm font-semibold underline decoration-current/40 underline-offset-4 transition-opacity hover:opacity-90 focus-visible:outline-[var(--atelier-ink-deep)]"
                >
                  {address}
                </a>
              ) : (
                <p className="mt-7 border-t border-[var(--atelier-ink-deep)]/18 pt-5 text-sm font-semibold">
                  {address}
                </p>
              )
            ) : null}

            {settings.bookingInstructions ? (
              <p className="mt-5 text-sm leading-7">
                {settings.bookingInstructions}
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
