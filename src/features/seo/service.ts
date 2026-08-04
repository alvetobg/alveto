import "server-only";

import { unstable_cache } from "next/cache";

import { createPublicSeoRepository } from "@/features/seo/repository";
import type {
  PublicSeoImage,
  PublicSeoResult,
  PublicSeoSettings,
} from "@/features/seo/types";
import { publicCacheTags } from "@/lib/cache/tags";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const emptySettings: PublicSeoSettings = {
  global: null,
  homepage: null,
  menu: null,
};

const getCachedPublicSeo = unstable_cache(
  async () =>
    createPublicSeoRepository(createSupabaseServerClient()).get(),
  [publicCacheTags.seo],
  { tags: [publicCacheTags.seo] },
);

export async function getPublicSeo(): Promise<PublicSeoResult> {
  try {
    const settings = await getCachedPublicSeo();
    const hasSettings = Object.values(settings).some(Boolean);

    return {
      settings,
      state: hasSettings ? "ready" : "empty",
    };
  } catch (error) {
    console.error("[public-seo] load failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return { settings: emptySettings, state: "error" };
  }
}

export function findPublicSeoImage(
  settings: PublicSeoSettings,
  mediaAssetId: string,
): PublicSeoImage | null {
  for (const record of Object.values(settings)) {
    if (record?.openGraphImage?.id === mediaAssetId) {
      return record.openGraphImage;
    }

    if (record?.twitterImage?.id === mediaAssetId) {
      return record.twitterImage;
    }
  }

  return null;
}
