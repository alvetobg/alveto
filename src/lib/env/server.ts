import "server-only";

type ServerEnvironment = Readonly<{
  supabaseUrl: string;
  supabasePublishableKey: string;
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

export function getServerEnvironment(): ServerEnvironment {
  const supabaseUrl = getValidatedSupabaseUrl(process.env.SUPABASE_URL);
  const supabasePublishableKey =
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  const revalidateSecret = process.env.REVALIDATE_SECRET?.trim();
  const invalidVariables = [
    ...(!supabaseUrl ? ["SUPABASE_URL"] : []),
    ...(!supabasePublishableKey ? ["SUPABASE_PUBLISHABLE_KEY"] : []),
    ...(!revalidateSecret || revalidateSecret.length < 32
      ? ["REVALIDATE_SECRET"]
      : []),
  ];

  if (
    !supabaseUrl ||
    !supabasePublishableKey ||
    !revalidateSecret ||
    revalidateSecret.length < 32
  ) {
    throw new Error(
      `Invalid server environment configuration: ${invalidVariables.join(", ")}`,
    );
  }

  return {
    supabaseUrl,
    supabasePublishableKey,
    revalidateSecret,
  };
}
