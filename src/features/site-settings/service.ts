import "server-only";

import { unstable_cache } from "next/cache";

import { createPublicSiteSettingsRepository } from "@/features/site-settings/repository";
import type {
  PublicSiteSettings,
  PublicSiteSettingsResult,
} from "@/features/site-settings/types";
import { publicCacheTags } from "@/lib/cache/tags";
import { site } from "@/lib/site";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const fallbackSettings: PublicSiteSettings = {
  businessName: site.name,
  shortBrandDescription:
    "Alveto is a place where specialty coffee, thoughtfully crafted brunch and signature desserts come together in a warm, carefully designed atmosphere.",
  temporarilyClosed: false,
  publicEmail: null,
  publicPhone: null,
  phoneHref: null,
  addressLine: site.address.street,
  city: site.address.city,
  country: site.address.country,
  countryCode: site.address.countryCode,
  googleMapsUrl: site.maps,
  socialLinks: [{ platform: "instagram", url: site.instagram }],
  businessHours: Array.from({ length: 7 }, (_, index) => ({
    dayOfWeek: index + 1,
    opensAt: site.hours.opens,
    closesAt: site.hours.closes,
    closed: false,
  })),
  footerCopyrightText: `© {year} ${site.name}. All rights reserved.`,
  footerNavigationLinks: [],
  footerLegalLinks: [],
};

const getCachedPublicSiteSettings = unstable_cache(
  async () =>
    createPublicSiteSettingsRepository(createSupabaseServerClient()).get(),
  [publicCacheTags.siteSettings],
  { tags: [publicCacheTags.siteSettings] },
);

export async function getPublicSiteSettings(): Promise<PublicSiteSettingsResult> {
  try {
    const settings = await getCachedPublicSiteSettings();
    return settings
      ? { settings, state: "ready" }
      : { settings: fallbackSettings, state: "empty" };
  } catch (error) {
    console.error("[public-site-settings] load failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return { settings: fallbackSettings, state: "error" };
  }
}
