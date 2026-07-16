import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://alveto-bg.com",
      priority: 1,
    },
    {
      url: "https://alveto-bg.com/menu",
      priority: 0.9,
    },
  ];
}