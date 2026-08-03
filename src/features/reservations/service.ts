import "server-only";

import { unstable_cache } from "next/cache";

import { createPublicReservationSettingsRepository } from "@/features/reservations/repository";
import type { PublicReservationSettingsResult } from "@/features/reservations/types";
import { publicCacheTags } from "@/lib/cache/tags";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const getCachedPublicReservationSettings = unstable_cache(
  async () =>
    createPublicReservationSettingsRepository(
      createSupabaseServerClient(),
    ).get(),
  [publicCacheTags.reservations],
  { tags: [publicCacheTags.reservations] },
);

export async function getPublicReservationSettings(): Promise<
  PublicReservationSettingsResult
> {
  try {
    const settings = await getCachedPublicReservationSettings();

    return {
      settings,
      state: settings ? "ready" : "empty",
    };
  } catch (error) {
    console.error("[public-reservations] load failed", {
      name: error instanceof Error ? error.name : "UnknownError",
    });

    return { settings: null, state: "error" };
  }
}
