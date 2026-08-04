import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";
import { getGlobalSeoDefaults } from "@/features/seo/metadata";
import { getPublicSeo } from "@/features/seo/service";
import { site } from "@/lib/site";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#D9A066",
  colorScheme: "light",
};

export async function generateMetadata(): Promise<Metadata> {
  const defaults = getGlobalSeoDefaults(await getPublicSeo());

  return {
    metadataBase: new URL(site.domain),

    title: {
      default: defaults.title,
      template: "%s | ALVETO",
    },

    description: defaults.description,

    keywords: site.seo.keywords,

    authors: [
      {
        name: "ALVETO",
      },
    ],

    creator: "ALVETO",
    publisher: "ALVETO",
    applicationName: "ALVETO",

    category: "Restaurant",
    classification: "Restaurant",

    referrer: "origin-when-cross-origin",

    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: "ALVETO",
    },

    manifest: "/manifest.webmanifest",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={manrope.variable}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-xl bg-dark px-5 py-3 font-semibold text-white opacity-0 shadow-xl transition focus:translate-y-0 focus:opacity-100"
        >
          Skip to content
        </a>

        {children}
      </body>
    </html>
  );
}
