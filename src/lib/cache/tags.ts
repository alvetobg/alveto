export const publicCacheTags = {
  builders: "alveto-public-builders",
  gallery: "alveto-public-gallery",
  homepage: "alveto-public-homepage",
  publicMenu: "alveto-public-menu",
  reservations: "alveto-public-reservations",
  seo: "alveto-public-seo",
  siteSettings: "alveto-public-site-settings",
} as const;

export type PublicCacheTag =
  (typeof publicCacheTags)[keyof typeof publicCacheTags];

export const publicCacheTagValues = Object.values(
  publicCacheTags,
) as readonly PublicCacheTag[];
