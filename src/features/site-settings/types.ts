export type PublicSocialPlatform =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "whatsapp";

export interface PublicSocialLink {
  platform: PublicSocialPlatform;
  url: string;
}

export interface PublicBusinessHour {
  dayOfWeek: number;
  opensAt: string | null;
  closesAt: string | null;
  closed: boolean;
}

export interface PublicFooterLink {
  label: string;
  url: string;
}

export interface PublicSiteSettings {
  businessName: string;
  shortBrandDescription: string;
  temporarilyClosed: boolean;
  publicEmail: string | null;
  publicPhone: string | null;
  phoneHref: string | null;
  addressLine: string | null;
  city: string | null;
  country: string | null;
  countryCode: string | null;
  googleMapsUrl: string | null;
  socialLinks: PublicSocialLink[];
  businessHours: PublicBusinessHour[];
  footerCopyrightText: string | null;
  footerNavigationLinks: PublicFooterLink[];
  footerLegalLinks: PublicFooterLink[];
}

export type PublicSiteSettingsResult = Readonly<{
  settings: PublicSiteSettings;
  state: "ready" | "empty" | "error";
}>;
