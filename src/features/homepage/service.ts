import "server-only";

import { unstable_cache } from "next/cache";

import { createPublishedHomepageRepository } from "@/features/homepage/repository";
import type { PublishedHomepageResult } from "@/features/homepage/types";
import { publicCacheTags } from "@/lib/cache/tags";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const signedImageCacheRefreshSeconds = 12 * 60 * 60;

function getErrorDiagnostic(error: unknown) {
  const status =
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
      ? error.status
      : undefined;

  return {
    name: error instanceof Error ? error.name : "UnknownError",
    ...(status !== undefined ? { status } : {}),
  };
}

const getCachedPublishedHomepage = unstable_cache(
  async () => {
    const repository = createPublishedHomepageRepository(
      createSupabaseServerClient(),
    );

    return repository.get();
  },
  [publicCacheTags.homepage, "content-image-v1"],
  {
    tags: [publicCacheTags.homepage],
    revalidate: signedImageCacheRefreshSeconds,
  },
);

export async function getPublishedHomepage(): Promise<PublishedHomepageResult> {
  try {
    const content = await getCachedPublishedHomepage();

    return {
      content,
      state: content ? "ready" : "empty",
    };
  } catch (error) {
    console.error(
      "[public-homepage] load failed",
      getErrorDiagnostic(error),
    );

    return {
      content: null,
      state: "error",
    };
  }
}
