import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";

import type { StorageImageReference } from "@/lib/supabase/server";

export type ContentImageScope = "gallery" | "homepage" | "signature";

const contentImageVersionLength = 16;
const contentImageVersionPattern = /^[A-Za-z0-9_-]{16}$/;

export function createContentImageVersion(image: StorageImageReference) {
  return createHash("sha256")
    .update(image.bucketId)
    .update("\0")
    .update(image.path)
    .digest("base64url")
    .slice(0, contentImageVersionLength);
}

export function createContentImageUrl(
  scope: ContentImageScope,
  imageKey: string,
  image: StorageImageReference,
) {
  const version = createContentImageVersion(image);

  return `/content-image/${scope}/${encodeURIComponent(imageKey)}?v=${version}`;
}

export function hasCurrentContentImageVersion(
  suppliedVersion: string | null,
  image: StorageImageReference,
) {
  if (
    !suppliedVersion ||
    !contentImageVersionPattern.test(suppliedVersion)
  ) {
    return false;
  }

  const supplied = Buffer.from(suppliedVersion, "ascii");
  const current = Buffer.from(createContentImageVersion(image), "ascii");

  return supplied.length === current.length && timingSafeEqual(supplied, current);
}
