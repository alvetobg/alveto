import { site } from "@/lib/site";

export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",

    name: site.name,

    image: "https://alveto-bg.com/images/hero.jpg",

    url: "https://alveto-bg.com",

    telephone: site.phone,

    email: site.email,

    servesCuisine: [
      "Breakfast",
      "Brunch",
      "Desserts",
      "Coffee",
      "Cocktails",
    ],

    priceRange: "$$",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Sokolska 4",
      addressLocality: "Belgrade",
      postalCode: "",
      addressCountry: "RS",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: "",
      longitude: "",
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
        opens: "09:00",
        closes: "00:00",
      },
    ],

    sameAs: [
      site.instagram,
      site.maps,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}