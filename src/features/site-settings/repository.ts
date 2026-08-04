import "server-only";

import type {
  PublicBusinessHour,
  PublicFooterLink,
  PublicSiteSettings,
  PublicSocialLink,
  PublicSocialPlatform,
} from "@/features/site-settings/types";
import type { Database } from "@/lib/supabase/database.types";
import type { SupabaseServerClient } from "@/lib/supabase/server";

type GeneratedSiteSettingsRow =
  Database["public"]["Functions"]["get_alveto_public_site_settings"]["Returns"][number];
type RuntimeSiteSettingsRow = {
  [Key in keyof GeneratedSiteSettingsRow]: GeneratedSiteSettingsRow[Key] | null;
};

const socialPlatforms = new Set<PublicSocialPlatform>([
  "instagram",
  "facebook",
  "tiktok",
  "whatsapp",
]);
const socialHosts: Record<PublicSocialPlatform, ReadonlySet<string>> = {
  instagram: new Set(["instagram.com", "www.instagram.com"]),
  facebook: new Set(["facebook.com", "www.facebook.com"]),
  tiktok: new Set(["tiktok.com", "www.tiktok.com"]),
  whatsapp: new Set(["wa.me", "api.whatsapp.com", "www.whatsapp.com"]),
};

export class PublicSiteSettingsRepositoryError extends Error {
  constructor() {
    super("The public global site settings could not be loaded.");
    this.name = "PublicSiteSettingsRepositoryError";
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalString(value: unknown): value is string | null {
  return value === null || isNonEmptyString(value);
}

function isHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}

function isSafeLink(value: string) {
  return (
    (value.startsWith("/") &&
      !value.startsWith("//") &&
      !/[\s\\]/.test(value)) ||
    isHttpsUrl(value)
  );
}

function parseSocialLinks(value: unknown): PublicSocialLink[] | null {
  if (!Array.isArray(value) || value.length > 4) return null;
  const links: PublicSocialLink[] = [];
  const seen = new Set<PublicSocialPlatform>();

  for (const item of value) {
    if (typeof item !== "object" || item === null) return null;
    const row = item as Record<string, unknown>;
    if (
      typeof row.platform !== "string" ||
      !socialPlatforms.has(row.platform as PublicSocialPlatform) ||
      !isNonEmptyString(row.url)
    ) {
      return null;
    }

    const platform = row.platform as PublicSocialPlatform;
    try {
      const url = new URL(row.url);
      if (
        url.protocol !== "https:" ||
        !socialHosts[platform].has(url.hostname.toLowerCase()) ||
        seen.has(platform)
      ) {
        return null;
      }
      seen.add(platform);
      links.push({ platform, url: url.toString() });
    } catch {
      return null;
    }
  }

  return links;
}

function parseBusinessHours(value: unknown): PublicBusinessHour[] | null {
  if (!Array.isArray(value) || value.length > 7) return null;
  const result: PublicBusinessHour[] = [];
  const seen = new Set<number>();

  for (const item of value) {
    if (typeof item !== "object" || item === null) return null;
    const row = item as Record<string, unknown>;
    if (
      !Number.isInteger(row.dayOfWeek) ||
      Number(row.dayOfWeek) < 1 ||
      Number(row.dayOfWeek) > 7 ||
      typeof row.closed !== "boolean" ||
      (row.opensAt !== null && typeof row.opensAt !== "string") ||
      (row.closesAt !== null && typeof row.closesAt !== "string") ||
      seen.has(Number(row.dayOfWeek))
    ) {
      return null;
    }

    const dayOfWeek = Number(row.dayOfWeek);
    if (
      !row.closed &&
      (!/^\d{2}:\d{2}$/.test(String(row.opensAt)) ||
        !/^\d{2}:\d{2}$/.test(String(row.closesAt)))
    ) {
      return null;
    }

    seen.add(dayOfWeek);
    result.push({
      dayOfWeek,
      opensAt: row.closed ? null : String(row.opensAt),
      closesAt: row.closed ? null : String(row.closesAt),
      closed: row.closed,
    });
  }

  return result;
}

function parseFooterLinks(value: unknown): PublicFooterLink[] | null {
  if (!Array.isArray(value) || value.length > 12) return null;
  const links: PublicFooterLink[] = [];

  for (const item of value) {
    if (typeof item !== "object" || item === null) return null;
    const row = item as Record<string, unknown>;
    if (
      !isNonEmptyString(row.label) ||
      !isNonEmptyString(row.url) ||
      !isSafeLink(row.url)
    ) {
      return null;
    }
    links.push({ label: row.label.trim(), url: row.url.trim() });
  }

  return links;
}

function phoneHref(value: string | null) {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? `tel:+${digits}` : null;
}

function mapRow(value: unknown): PublicSiteSettings | null {
  if (typeof value !== "object" || value === null) return null;
  const row = value as RuntimeSiteSettingsRow;
  const socialLinks = parseSocialLinks(row.social_links);
  const businessHours = parseBusinessHours(row.business_hours);
  const navigationLinks = parseFooterLinks(row.footer_navigation_links);
  const legalLinks = parseFooterLinks(row.footer_legal_links);

  if (
    !isNonEmptyString(row.business_name) ||
    !isNonEmptyString(row.short_brand_description) ||
    typeof row.temporarily_closed !== "boolean" ||
    !isOptionalString(row.public_email) ||
    !isOptionalString(row.public_phone) ||
    !isOptionalString(row.address_line) ||
    !isOptionalString(row.city) ||
    !isOptionalString(row.country) ||
    !isOptionalString(row.country_code) ||
    (row.country_code !== null && !/^[A-Z]{2}$/.test(row.country_code)) ||
    !isOptionalString(row.google_maps_url) ||
    (row.google_maps_url !== null && !isHttpsUrl(row.google_maps_url)) ||
    socialLinks === null ||
    businessHours === null ||
    !isOptionalString(row.footer_copyright_text) ||
    navigationLinks === null ||
    legalLinks === null
  ) {
    return null;
  }

  const publicPhone = row.public_phone?.trim() ?? null;
  return {
    businessName: row.business_name.trim(),
    shortBrandDescription: row.short_brand_description.trim(),
    temporarilyClosed: row.temporarily_closed,
    publicEmail: row.public_email?.trim() ?? null,
    publicPhone,
    phoneHref: phoneHref(publicPhone),
    addressLine: row.address_line?.trim() ?? null,
    city: row.city?.trim() ?? null,
    country: row.country?.trim() ?? null,
    countryCode: row.country_code,
    googleMapsUrl: row.google_maps_url?.trim() ?? null,
    socialLinks,
    businessHours,
    footerCopyrightText: row.footer_copyright_text?.trim() ?? null,
    footerNavigationLinks: navigationLinks,
    footerLegalLinks: legalLinks,
  };
}

export function createPublicSiteSettingsRepository(
  supabase: SupabaseServerClient,
) {
  return {
    async get(): Promise<PublicSiteSettings | null> {
      const rows = await supabase.getPublicSiteSettingsRows();
      if (rows.length === 0) return null;
      if (rows.length !== 1) throw new PublicSiteSettingsRepositoryError();

      const settings = mapRow(rows[0]);
      if (!settings) throw new PublicSiteSettingsRepositoryError();
      return settings;
    },
  };
}
