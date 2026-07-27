import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.domain}/`,
      priority: 1,
    },
    {
      url: `${site.domain}/menu`,
      priority: 0.9,
    },
  ];
}
