import "server-only";

import { unstable_cache } from "next/cache";

import { createPublishedMenuRepository } from "@/features/menu/repository";
import type { PublishedMenuResult } from "@/features/menu/types";
import { publicCacheTags } from "@/lib/cache/tags";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const signedImageCacheRefreshSeconds = 12 * 60 * 60;

type DiagnosticValue = string | number | boolean | null;

function getDiagnosticValue(error: unknown, property: string) {
  if (typeof error !== "object" || error === null || !(property in error)) {
    return undefined;
  }

  const value = (error as Record<string, unknown>)[property];

  return value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
    ? (value as DiagnosticValue)
    : undefined;
}

function getErrorDiagnostic(error: unknown) {
  const code = getDiagnosticValue(error, "code");
  const status = getDiagnosticValue(error, "status");
  const details = getDiagnosticValue(error, "details");

  return {
    name: error instanceof Error ? error.name : "UnknownError",
    message: error instanceof Error ? error.message : "Unknown error",
    constructorName:
      error instanceof Error ? error.constructor.name : typeof error,
    ...(code !== undefined ? { code } : {}),
    ...(status !== undefined ? { status } : {}),
    ...(details !== undefined ? { details } : {}),
  };
}

const getCachedPublishedMenu = unstable_cache(
  async () => {
    const repository = createPublishedMenuRepository(
      createSupabaseServerClient(),
    );

    return repository.list();
  },
  [publicCacheTags.publicMenu],
  {
    tags: [publicCacheTags.publicMenu],
    revalidate: signedImageCacheRefreshSeconds,
  },
);

export async function getPublishedMenu(): Promise<PublishedMenuResult> {
  try {
    const menu = await getCachedPublishedMenu();

    return {
      menu,
      state: menu.length > 0 ? "ready" : "empty",
    };
  } catch (error) {
    console.error("[public-menu] load failed", getErrorDiagnostic(error));

    return {
      menu: [],
      state: "error",
    };
  }
}
