import "server-only";

import { unstable_cache } from "next/cache";

import { createPublishedGalleryRepository } from "@/features/gallery/repository";
import type { PublishedGalleryResult } from "@/features/gallery/types";
import { publicCacheTags } from "@/lib/cache/tags";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const signedImageCacheRefreshSeconds = 30 * 60;

const getCachedPublishedGallery = unstable_cache(
  async () =>
    createPublishedGalleryRepository(createSupabaseServerClient()).list(),
  [publicCacheTags.gallery, "content-image-v1"],
  {
    tags: [publicCacheTags.gallery],
    revalidate: signedImageCacheRefreshSeconds,
  },
);

export async function getPublishedGallery(): Promise<PublishedGalleryResult> {
  try {
    const collections = await getCachedPublishedGallery();

    return {
      collections,
      state: collections.length > 0 ? "ready" : "empty",
    };
  } catch (error) {
    console.error("[public-gallery] load failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return { collections: [], state: "error" };
  }
}
