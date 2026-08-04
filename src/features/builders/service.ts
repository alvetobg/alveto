import "server-only";

import { unstable_cache } from "next/cache";

import { createPublishedBuildersRepository } from "@/features/builders/repository";
import type { PublishedBuildersResult } from "@/features/builders/types";
import { publicCacheTags } from "@/lib/cache/tags";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const getCachedPublishedBuilders = unstable_cache(
  async () =>
    createPublishedBuildersRepository(
      createSupabaseServerClient(),
    ).list(),
  [publicCacheTags.builders],
  { tags: [publicCacheTags.builders] },
);

export async function getPublishedBuilders(): Promise<PublishedBuildersResult> {
  try {
    const builders = await getCachedPublishedBuilders();
    return {
      builders,
      state: builders.length > 0 ? "ready" : "empty",
    };
  } catch (error) {
    console.error("[public-builders] load failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return { builders: [], state: "error" };
  }
}
