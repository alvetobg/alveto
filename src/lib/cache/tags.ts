export const publicCacheTags = {
  homepage: "alveto-public-homepage",
  publicMenu: "alveto-public-menu",
} as const;

export type PublicCacheTag =
  (typeof publicCacheTags)[keyof typeof publicCacheTags];

export const publicCacheTagValues = Object.values(
  publicCacheTags,
) as readonly PublicCacheTag[];
