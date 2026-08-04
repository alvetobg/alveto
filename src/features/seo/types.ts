export type PublicSeoPageKey = "global" | "homepage" | "menu";
export type PublicTwitterCardType = "summary" | "summary_large_image";

export interface PublicSeoImage {
  id: string;
  storagePath: string;
  mimeType: "image/avif" | "image/jpeg" | "image/png" | "image/webp";
  width: number;
  height: number;
  altText: string;
}

export interface PublicSeoRecord {
  pageKey: PublicSeoPageKey;
  title: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  robotsIndex: boolean | null;
  robotsFollow: boolean | null;
  openGraphTitle: string | null;
  openGraphDescription: string | null;
  openGraphImage: PublicSeoImage | null;
  twitterCardType: PublicTwitterCardType | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: PublicSeoImage | null;
}

export interface PublicSeoSettings {
  global: PublicSeoRecord | null;
  homepage: PublicSeoRecord | null;
  menu: PublicSeoRecord | null;
}

export type PublicSeoResult = Readonly<{
  settings: PublicSeoSettings;
  state: "ready" | "empty" | "error";
}>;
