import "server-only";

import type { Metadata } from "next";

import type {
  PublicSeoImage,
  PublicSeoPageKey,
  PublicSeoResult,
  PublicSeoSettings,
} from "@/features/seo/types";
import { site } from "@/lib/site";

type PublicPageKey = Exclude<PublicSeoPageKey, "global">;

const pageDefaults = {
  homepage: {
    title: site.seo.title,
    description: site.seo.description,
    canonical: "https://alveto-bg.com/",
    image: {
      url: "/images/hero.jpg",
      width: 1600,
      height: 1066,
      alt: "ALVETO specialty coffee, brunch, desserts and cocktails",
      type: "image/jpeg",
    },
  },
  menu: {
    title: "ALVETO Menu | Coffee, Brunch & Desserts",
    description:
      "Explore the ALVETO menu of specialty coffee, breakfast, brunch, sweet and savory creations, desserts and cocktails.",
    canonical: "https://alveto-bg.com/menu",
    image: {
      url: "/images/menu-hero.webp",
      width: 2400,
      height: 1350,
      alt: "ALVETO menu",
      type: "image/webp",
    },
  },
} as const;

function firstValue<T>(...values: readonly (T | null | undefined)[]) {
  return values.find((value): value is T => value !== null && value !== undefined);
}

export function isPublicPageIndexable(
  pageKey: PublicPageKey,
  result: PublicSeoResult,
) {
  return (
    firstValue(
      result.settings[pageKey]?.robotsIndex,
      result.settings.global?.robotsIndex,
    ) ?? true
  );
}

function resolveImageUrl(image: PublicSeoImage) {
  return `/seo-image/${encodeURIComponent(image.id)}`;
}

function resolveCanonical(
  pageKey: PublicPageKey,
  settings: PublicSeoSettings,
) {
  const routeSettings = settings[pageKey];

  if (routeSettings?.canonicalUrl) {
    return routeSettings.canonicalUrl;
  }

  const base = settings.global?.canonicalUrl ?? site.domain;
  return new URL(pageKey === "homepage" ? "/" : "/menu", base).toString();
}

function metadataImage(
  image: PublicSeoImage | null | undefined,
  fallback: (typeof pageDefaults)[PublicPageKey]["image"],
) {
  return image
    ? {
        url: resolveImageUrl(image),
        width: image.width,
        height: image.height,
        alt: image.altText,
        type: image.mimeType,
      }
    : fallback;
}

export function createPageMetadata(
  pageKey: PublicPageKey,
  result: PublicSeoResult,
): Metadata {
  const routeSettings = result.settings[pageKey];
  const globalSettings = result.settings.global;
  const defaults = pageDefaults[pageKey];
  const title = firstValue(
    routeSettings?.title,
    globalSettings?.title,
  ) ?? defaults.title;
  const description = firstValue(
    routeSettings?.metaDescription,
    globalSettings?.metaDescription,
  ) ?? defaults.description;
  const canonical = resolveCanonical(pageKey, result.settings);
  const openGraphTitle = firstValue(
    routeSettings?.openGraphTitle,
    globalSettings?.openGraphTitle,
  ) ?? title;
  const openGraphDescription = firstValue(
    routeSettings?.openGraphDescription,
    globalSettings?.openGraphDescription,
  ) ?? description;
  const openGraphSource = firstValue(
    routeSettings?.openGraphImage,
    globalSettings?.openGraphImage,
  );
  const openGraphImage = metadataImage(openGraphSource, defaults.image);
  const twitterImage = metadataImage(
    firstValue(
      routeSettings?.twitterImage,
      routeSettings?.openGraphImage,
      globalSettings?.twitterImage,
      globalSettings?.openGraphImage,
    ),
    defaults.image,
  );
  const robotsIndex = isPublicPageIndexable(pageKey, result);
  const robotsFollow = firstValue(
    routeSettings?.robotsFollow,
    globalSettings?.robotsFollow,
  ) ?? true;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: {
      index: robotsIndex,
      follow: robotsFollow,
      googleBot: {
        index: robotsIndex,
        follow: robotsFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url: canonical,
      title: openGraphTitle,
      description: openGraphDescription,
      images: [openGraphImage],
    },
    twitter: {
      card: firstValue(
        routeSettings?.twitterCardType,
        globalSettings?.twitterCardType,
      ) ?? "summary_large_image",
      title: firstValue(
        routeSettings?.twitterTitle,
        globalSettings?.twitterTitle,
      ) ?? openGraphTitle,
      description: firstValue(
        routeSettings?.twitterDescription,
        globalSettings?.twitterDescription,
      ) ?? openGraphDescription,
      images: [twitterImage],
    },
  };
}

export function getGlobalSeoDefaults(result: PublicSeoResult) {
  return {
    title: result.settings.global?.title ?? site.seo.title,
    description:
      result.settings.global?.metaDescription ?? site.seo.description,
  };
}
