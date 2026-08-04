import { site } from "@/lib/site";
import type { PublicReservationSettings } from "@/features/reservations/types";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type StructuredDataProps = Readonly<{
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

export default function StructuredData({
  reservationSettings,
  siteSettings,
}: StructuredDataProps) {
  const phoneNumber =
    siteSettings.publicPhone ?? reservationSettings?.phoneNumber ?? null;
  const email = siteSettings.publicEmail ?? reservationSettings?.email ?? null;
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const openingHours = siteSettings.temporarilyClosed
    ? []
    : siteSettings.businessHours.flatMap((hours) =>
        !hours.closed && hours.opensAt && hours.closesAt
          ? [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: dayNames[hours.dayOfWeek - 1],
                opens: hours.opensAt,
                closes: hours.closesAt,
              },
            ]
          : [],
      );
  const address = {
    "@type": "PostalAddress",
    ...(siteSettings.addressLine
      ? { streetAddress: siteSettings.addressLine }
      : {}),
    ...(siteSettings.city ? { addressLocality: siteSettings.city } : {}),
    ...(siteSettings.countryCode
      ? { addressCountry: siteSettings.countryCode }
      : {}),
  };
  const socialLinks = siteSettings.socialLinks.map((link) => link.url);
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${site.domain}/#business`,
    name: siteSettings.businessName,
    description: siteSettings.shortBrandDescription,
    image: `${site.domain}/images/hero.jpg`,
    url: site.domain,
    menu: `${site.domain}/menu`,
    ...(phoneNumber ? { telephone: phoneNumber } : {}),
    ...(email ? { email } : {}),
    servesCuisine: [
      "Breakfast",
      "Brunch",
      "Desserts",
      "Coffee",
      "Cocktails",
    ],
    ...(Object.keys(address).length > 1 ? { address } : {}),
    ...(openingHours.length > 0
      ? { openingHoursSpecification: openingHours }
      : {}),
    ...(siteSettings.googleMapsUrl
      ? { hasMap: siteSettings.googleMapsUrl }
      : {}),
    ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
  };

  const serializedData = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: serializedData,
      }}
    />
  );
}
