import { createHmac, timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import {
  publicCacheTagValues,
  type PublicCacheTag,
} from "@/lib/cache/tags";
import { getServerEnvironment } from "@/lib/env/server";

export const runtime = "nodejs";

const signatureHeader = "x-alveto-revalidate-signature";
const timestampHeader = "x-alveto-revalidate-timestamp";
const maximumRequestAgeMs = 5 * 60 * 1_000;
const maximumBodyLength = 1_024;

function unauthorizedResponse() {
  return NextResponse.json(
    { error: "Unauthorized" },
    {
      status: 401,
      headers: { "cache-control": "no-store" },
    },
  );
}

function invalidRequestResponse() {
  return NextResponse.json(
    { error: "Invalid request" },
    {
      status: 400,
      headers: { "cache-control": "no-store" },
    },
  );
}

function isValidSignature(
  signature: string,
  timestamp: string,
  body: string,
  secret: string,
) {
  if (!/^\d{13}$/.test(timestamp) || !/^[a-f0-9]{64}$/.test(signature)) {
    return false;
  }

  const requestTime = Number(timestamp);

  if (
    !Number.isSafeInteger(requestTime) ||
    Math.abs(Date.now() - requestTime) > maximumRequestAgeMs
  ) {
    return false;
  }

  const expectedSignature = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest();
  const providedSignature = Buffer.from(signature, "hex");

  return (
    expectedSignature.length === providedSignature.length &&
    timingSafeEqual(expectedSignature, providedSignature)
  );
}

function isRevalidationPayload(
  value: unknown,
): value is { tags: PublicCacheTag[] } {
  if (typeof value !== "object" || value === null || !("tags" in value)) {
    return false;
  }

  const keys = Object.keys(value);
  const tags = (value as { tags?: unknown }).tags;

  return (
    keys.length === 1 &&
    keys[0] === "tags" &&
    Array.isArray(tags) &&
    tags.length > 0 &&
    tags.length <= publicCacheTagValues.length &&
    new Set(tags).size === tags.length &&
    tags.every(
      (tag): tag is PublicCacheTag =>
        typeof tag === "string" &&
        publicCacheTagValues.includes(tag as PublicCacheTag),
    )
  );
}

export async function POST(request: Request) {
  const signature = request.headers.get(signatureHeader);
  const timestamp = request.headers.get(timestampHeader);

  if (!signature || !timestamp) {
    return unauthorizedResponse();
  }

  let secret: string;

  try {
    secret = getServerEnvironment().revalidateSecret;
  } catch {
    return NextResponse.json(
      { error: "Service unavailable" },
      {
        status: 503,
        headers: { "cache-control": "no-store" },
      },
    );
  }

  const body = await request.text();

  if (
    body.length === 0 ||
    body.length > maximumBodyLength ||
    !isValidSignature(signature, timestamp, body, secret)
  ) {
    return unauthorizedResponse();
  }

  let payload: unknown;

  try {
    payload = JSON.parse(body);
  } catch {
    return invalidRequestResponse();
  }

  if (!isRevalidationPayload(payload)) {
    return invalidRequestResponse();
  }

  for (const tag of payload.tags) {
    revalidateTag(tag, { expire: 0 });
  }

  return NextResponse.json(
    { revalidated: payload.tags },
    { headers: { "cache-control": "no-store" } },
  );
}
