export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "ALVETO",
    image: "https://alveto-bg.com/images/hero.jpg",
    url: "https://alveto-bg.com",
    telephone: "+381665707777",
    email: "alveto.bg@gmail.com",
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
      "https://instagram.com/alveto.bg",
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