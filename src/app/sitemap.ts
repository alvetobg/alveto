import type { MetadataRoute } from "next";
import {
  isPublicPageIndexable,
} from "@/features/seo/metadata";
import { getPublicSeo } from "@/features/seo/service";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const seo = await getPublicSeo();

  return [
    ...(isPublicPageIndexable("homepage", seo)
      ? [
          {
            url: `${site.domain}/`,
            priority: 1,
          },
        ]
      : []),
    ...(isPublicPageIndexable("menu", seo)
      ? [
          {
            url: `${site.domain}/menu`,
            priority: 0.9,
          },
        ]
      : []),
  ];
}
