import "server-only";

import { unstable_cache } from "next/cache";

import { createPublishedMenuRepository } from "@/features/menu/repository";
import type { PublishedMenuResult } from "@/features/menu/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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
    ...(status ? { status } : {}),
  };
}

const getCachedPublishedMenu = unstable_cache(
  async () => {
    const repository = createPublishedMenuRepository(
      createSupabaseServerClient(),
    );

    return repository.list();
  },
  ["alveto-public-menu"],
  {
    revalidate: 300,
    tags: ["alveto-public-menu"],
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
