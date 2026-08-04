import "server-only";

import { getServerEnvironment } from "@/lib/env/server";
import type { Database } from "@/lib/supabase/database.types";

type PublishedMenuRpcRow =
  Database["public"]["Functions"]["get_alveto_published_menu"]["Returns"][number];

type PublishedHomepageRpcRow =
  Database["public"]["Functions"]["get_alveto_published_homepage"]["Returns"][number];

type PublishedGalleryRpcRow =
  Database["public"]["Functions"]["get_alveto_published_gallery"]["Returns"][number];

type PublicReservationSettingsRpcRow =
  Database["public"]["Functions"]["get_alveto_public_reservation_settings"]["Returns"][number];

type PublishedBuilderRpcRow =
  Database["public"]["Functions"]["get_alveto_published_builders"]["Returns"][number];

type PublicSeoRpcRow =
  Database["public"]["Functions"]["get_alveto_public_seo"]["Returns"][number];
type PublicSiteSettingsRpcRow =
  Database["public"]["Functions"]["get_alveto_public_site_settings"]["Returns"][number];

type SignedImage = Readonly<{
  path: string;
  signedUrl: string;
}>;

type StorageSignedUrlPayload = Readonly<{
  signedURL?: unknown;
}>;

export class SupabaseServerClientError extends Error {
  constructor(
    readonly operation:
      | "published-gallery"
      | "published-builders"
      | "published-homepage"
      | "published-menu"
      | "public-reservations"
      | "public-seo"
      | "public-site-settings"
      | "sign-images",
    readonly status?: number,
  ) {
    super("The server content request failed.");
    this.name = "SupabaseServerClientError";
  }
}

function createHeaders(publishableKey: string) {
  const headers = new Headers({
    apikey: publishableKey,
  });

  if (!publishableKey.startsWith("sb_publishable_")) {
    headers.set("Authorization", `Bearer ${publishableKey}`);
  }

  return headers;
}

async function parseJson(response: Response, operation: SupabaseServerClientError["operation"]) {
  if (!response.ok) {
    throw new SupabaseServerClientError(operation, response.status);
  }

  try {
    return (await response.json()) as unknown;
  } catch {
    throw new SupabaseServerClientError(operation, response.status);
  }
}

export function createSupabaseServerClient() {
  const environment = getServerEnvironment();
  const headers = createHeaders(environment.supabasePublishableKey);

  return {
    async getPublicSiteSettingsRows(): Promise<PublicSiteSettingsRpcRow[]> {
      const requestUrl = new URL(
        "/rest/v1/rpc/get_alveto_public_site_settings",
        environment.supabaseUrl,
      );
      const requestHeaders = new Headers(headers);
      requestHeaders.set("Content-Type", "application/json");

      const payload = await parseJson(
        await fetch(requestUrl, {
          method: "POST",
          headers: requestHeaders,
          body: "{}",
          cache: "no-store",
        }),
        "public-site-settings",
      );

      if (!Array.isArray(payload)) {
        throw new SupabaseServerClientError("public-site-settings");
      }

      return payload as PublicSiteSettingsRpcRow[];
    },

    async getPublicSeoRows(): Promise<PublicSeoRpcRow[]> {
      const requestUrl = new URL(
        "/rest/v1/rpc/get_alveto_public_seo",
        environment.supabaseUrl,
      );
      const requestHeaders = new Headers(headers);
      requestHeaders.set("Content-Type", "application/json");

      const payload = await parseJson(
        await fetch(requestUrl, {
          method: "POST",
          headers: requestHeaders,
          body: "{}",
          cache: "no-store",
        }),
        "public-seo",
      );

      if (!Array.isArray(payload)) {
        throw new SupabaseServerClientError("public-seo");
      }

      return payload as PublicSeoRpcRow[];
    },

    async getPublishedBuilderRows(): Promise<PublishedBuilderRpcRow[]> {
      const requestUrl = new URL(
        "/rest/v1/rpc/get_alveto_published_builders",
        environment.supabaseUrl,
      );
      const requestHeaders = new Headers(headers);
      requestHeaders.set("Content-Type", "application/json");

      const payload = await parseJson(
        await fetch(requestUrl, {
          method: "POST",
          headers: requestHeaders,
          body: "{}",
          cache: "no-store",
        }),
        "published-builders",
      );

      if (!Array.isArray(payload)) {
        throw new SupabaseServerClientError("published-builders");
      }

      return payload as PublishedBuilderRpcRow[];
    },

    async getPublicReservationSettingsRows(): Promise<
      PublicReservationSettingsRpcRow[]
    > {
      const requestUrl = new URL(
        "/rest/v1/rpc/get_alveto_public_reservation_settings",
        environment.supabaseUrl,
      );
      const requestHeaders = new Headers(headers);
      requestHeaders.set("Content-Type", "application/json");

      const payload = await parseJson(
        await fetch(requestUrl, {
          method: "POST",
          headers: requestHeaders,
          body: "{}",
          cache: "no-store",
        }),
        "public-reservations",
      );

      if (!Array.isArray(payload)) {
        throw new SupabaseServerClientError("public-reservations");
      }

      return payload as PublicReservationSettingsRpcRow[];
    },

    async getPublishedGalleryRows(): Promise<PublishedGalleryRpcRow[]> {
      const requestUrl = new URL(
        "/rest/v1/rpc/get_alveto_published_gallery",
        environment.supabaseUrl,
      );
      const requestHeaders = new Headers(headers);
      requestHeaders.set("Content-Type", "application/json");

      const payload = await parseJson(
        await fetch(requestUrl, {
          method: "POST",
          headers: requestHeaders,
          body: "{}",
          cache: "no-store",
        }),
        "published-gallery",
      );

      if (!Array.isArray(payload)) {
        throw new SupabaseServerClientError("published-gallery");
      }

      return payload as PublishedGalleryRpcRow[];
    },

    async getPublishedHomepageRows(): Promise<PublishedHomepageRpcRow[]> {
      const requestUrl = new URL(
        "/rest/v1/rpc/get_alveto_published_homepage",
        environment.supabaseUrl,
      );
      const requestHeaders = new Headers(headers);
      requestHeaders.set("Content-Type", "application/json");

      const payload = await parseJson(
        await fetch(requestUrl, {
          method: "POST",
          headers: requestHeaders,
          body: "{}",
          cache: "no-store",
        }),
        "published-homepage",
      );

      if (!Array.isArray(payload)) {
        throw new SupabaseServerClientError("published-homepage");
      }

      return payload as PublishedHomepageRpcRow[];
    },

    async getPublishedMenuRows(): Promise<PublishedMenuRpcRow[]> {
      const requestUrl = new URL(
        "/rest/v1/rpc/get_alveto_published_menu",
        environment.supabaseUrl,
      );
      const requestHeaders = new Headers(headers);
      requestHeaders.set("Content-Type", "application/json");

      const payload = await parseJson(
        await fetch(requestUrl, {
          method: "POST",
          headers: requestHeaders,
          body: "{}",
          cache: "no-store",
        }),
        "published-menu",
      );

      if (!Array.isArray(payload)) {
        throw new SupabaseServerClientError("published-menu");
      }

      return payload as PublishedMenuRpcRow[];
    },

    async createSignedImageUrls(
      paths: readonly string[],
      expiresIn: number,
    ): Promise<SignedImage[]> {
      if (paths.length === 0) {
        return [];
      }

      const signingHeaders = new Headers(headers);
      signingHeaders.set("Content-Type", "application/json");

      const payload = await parseJson(
        await fetch(
          new URL(
            "/storage/v1/object/sign/product-images",
            environment.supabaseUrl,
          ),
          {
            method: "POST",
            headers: signingHeaders,
            body: JSON.stringify({
              expiresIn,
              paths,
            }),
            cache: "no-store",
          },
        ),
        "sign-images",
      );

      if (!Array.isArray(payload) || payload.length !== paths.length) {
        throw new SupabaseServerClientError("sign-images");
      }

      return payload.map((entry: StorageSignedUrlPayload, index) => {
        if (
          typeof entry !== "object" ||
          entry === null ||
          typeof entry.signedURL !== "string" ||
          !entry.signedURL.startsWith("/object/sign/product-images/")
        ) {
          throw new SupabaseServerClientError("sign-images");
        }

        return {
          path: paths[index],
          signedUrl: `${environment.supabaseUrl}/storage/v1${entry.signedURL}`,
        };
      });
    },
  };
}

export type SupabaseServerClient = ReturnType<
  typeof createSupabaseServerClient
>;
