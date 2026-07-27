import { site } from "@/lib/site";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "@id": `${site.domain}/#business`,
    name: site.name,
    description: site.seo.description,
    image: `${site.domain}/images/hero.jpg`,
    url: site.domain,
    menu: `${site.domain}/menu`,
    telephone: site.phone,
    email: site.email,
    servesCuisine: [
      "Breakfast",
      "Brunch",
      "Desserts",
      "Coffee",
      "Cocktails",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: site.address.countryCode,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: site.hours.opens,
        closes: site.hours.closes,
      },
    ],
    hasMap: site.maps,
    sameAs: [site.instagram],
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
