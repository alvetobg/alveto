import "server-only";

import type { Database } from "@/lib/supabase/database.types";
import type { SupabaseServerClient } from "@/lib/supabase/server";
import type {
  PublicSeoImage,
  PublicSeoPageKey,
  PublicSeoRecord,
  PublicSeoSettings,
  PublicTwitterCardType,
} from "@/features/seo/types";

type GeneratedSeoRow =
  Database["public"]["Functions"]["get_alveto_public_seo"]["Returns"][number];

type RuntimeSeoRow = {
  [Key in keyof GeneratedSeoRow]: GeneratedSeoRow[Key] | null;
};

const pageKeys = new Set<PublicSeoPageKey>([
  "global",
  "homepage",
  "menu",
]);
const imageMimeTypes = new Set<PublicSeoImage["mimeType"]>([
  "image/avif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const twitterCardTypes = new Set<PublicTwitterCardType>([
  "summary",
  "summary_large_image",
]);

export class PublicSeoRepositoryError extends Error {
  constructor() {
    super("The public SEO settings could not be loaded.");
    this.name = "PublicSeoRepositoryError";
  }
}

function isOptionalTrimmedString(value: unknown): value is string | null {
  return (
    value === null ||
    (typeof value === "string" && value.length > 0 && value === value.trim())
  );
}

function isOptionalBoolean(value: unknown): value is boolean | null {
  return value === null || typeof value === "boolean";
}

function isSafeCanonical(value: string | null, pageKey: PublicSeoPageKey) {
  if (value === null) {
    return true;
  }

  try {
    const url = new URL(value);
    const expectedPathname = pageKey === "menu" ? "/menu" : "/";

    return (
      url.origin === "https://alveto-bg.com" &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      url.pathname === expectedPathname
    );
  } catch {
    return false;
  }
}

function isSafeStoragePath(value: string) {
  return (
    value.length > 2 &&
    value.length <= 500 &&
    !value.startsWith("/") &&
    !value.includes("..") &&
    !value.includes("\\")
  );
}

function mapImage(
  id: unknown,
  storagePath: unknown,
  mimeType: unknown,
  width: unknown,
  height: unknown,
  altText: unknown,
): PublicSeoImage | null | undefined {
  const values = [id, storagePath, mimeType, width, height, altText];

  if (values.every((value) => value === null)) {
    return null;
  }

  if (
    typeof id !== "string" ||
    typeof storagePath !== "string" ||
    !isSafeStoragePath(storagePath) ||
    typeof mimeType !== "string" ||
    !imageMimeTypes.has(mimeType as PublicSeoImage["mimeType"]) ||
    typeof width !== "number" ||
    !Number.isInteger(width) ||
    width <= 0 ||
    typeof height !== "number" ||
    !Number.isInteger(height) ||
    height <= 0 ||
    typeof altText !== "string" ||
    altText.trim().length === 0
  ) {
    return undefined;
  }

  return {
    id,
    storagePath,
    mimeType: mimeType as PublicSeoImage["mimeType"],
    width,
    height,
    altText: altText.trim(),
  };
}

function mapRow(value: unknown): PublicSeoRecord | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const row = value as RuntimeSeoRow;

  if (typeof row.page_key !== "string" || !pageKeys.has(row.page_key as PublicSeoPageKey)) {
    return null;
  }

  const pageKey = row.page_key as PublicSeoPageKey;
  const openGraphImage = mapImage(
    row.open_graph_media_asset_id,
    row.open_graph_image_storage_path,
    row.open_graph_image_mime_type,
    row.open_graph_image_width,
    row.open_graph_image_height,
    row.open_graph_image_alt_text,
  );
  const twitterImage = mapImage(
    row.twitter_media_asset_id,
    row.twitter_image_storage_path,
    row.twitter_image_mime_type,
    row.twitter_image_width,
    row.twitter_image_height,
    row.twitter_image_alt_text,
  );

  if (
    !isOptionalTrimmedString(row.title) ||
    !isOptionalTrimmedString(row.meta_description) ||
    !isOptionalTrimmedString(row.canonical_url) ||
    !isSafeCanonical(row.canonical_url, pageKey) ||
    !isOptionalBoolean(row.robots_index) ||
    !isOptionalBoolean(row.robots_follow) ||
    !isOptionalTrimmedString(row.open_graph_title) ||
    !isOptionalTrimmedString(row.open_graph_description) ||
    openGraphImage === undefined ||
    !isOptionalTrimmedString(row.twitter_card_type) ||
    (row.twitter_card_type !== null &&
      !twitterCardTypes.has(row.twitter_card_type as PublicTwitterCardType)) ||
    !isOptionalTrimmedString(row.twitter_title) ||
    !isOptionalTrimmedString(row.twitter_description) ||
    twitterImage === undefined
  ) {
    return null;
  }

  return {
    pageKey,
    title: row.title,
    metaDescription: row.meta_description,
    canonicalUrl: row.canonical_url,
    robotsIndex: row.robots_index,
    robotsFollow: row.robots_follow,
    openGraphTitle: row.open_graph_title,
    openGraphDescription: row.open_graph_description,
    openGraphImage,
    twitterCardType: row.twitter_card_type as PublicTwitterCardType | null,
    twitterTitle: row.twitter_title,
    twitterDescription: row.twitter_description,
    twitterImage,
  };
}

export function createPublicSeoRepository(supabase: SupabaseServerClient) {
  return {
    async get(): Promise<PublicSeoSettings> {
      const rawRows = await supabase.getPublicSeoRows();

      if (rawRows.length > 3) {
        throw new PublicSeoRepositoryError();
      }

      const settings: PublicSeoSettings = {
        global: null,
        homepage: null,
        menu: null,
      };

      for (const rawRow of rawRows) {
        const row = mapRow(rawRow);

        if (!row || settings[row.pageKey] !== null) {
          throw new PublicSeoRepositoryError();
        }

        settings[row.pageKey] = row;
      }

      return settings;
    },
  };
}
