import "server-only";

type PublicContentEnvironment = Readonly<{
  supabaseUrl: string;
  supabasePublishableKey: string;
}>;

type RevalidationEnvironment = Readonly<{
  revalidateSecret: string;
}>;

const localHostnames = new Set(["localhost", "127.0.0.1", "::1"]);

function getValidatedSupabaseUrl(value: string | undefined) {
  const candidate = value?.trim();

  if (!candidate) {
    return null;
  }

  try {
    const url = new URL(candidate);
    const isSecure = url.protocol === "https:";
    const isLocalDevelopment =
      process.env.NODE_ENV !== "production" &&
      url.protocol === "http:" &&
      localHostnames.has(url.hostname);

    if (!isSecure && !isLocalDevelopment) {
      return null;
    }

    url.pathname = "/";
    url.search = "";
    url.hash = "";

    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function getPublicContentEnvironment(): PublicContentEnvironment {
  const supabaseUrl = getValidatedSupabaseUrl(process.env.SUPABASE_URL);
  const supabasePublishableKey =
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error("Invalid public content environment configuration.");
  }

  return {
    supabaseUrl,
    supabasePublishableKey,
  };
}

export function getRevalidationEnvironment(): RevalidationEnvironment {
  const revalidateSecret = process.env.REVALIDATE_SECRET?.trim();

  if (!revalidateSecret || revalidateSecret.length < 32) {
    throw new Error("Invalid revalidation environment configuration.");
  }

  return {
    revalidateSecret,
  };
}
