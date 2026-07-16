import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";
import StructuredData from "@/components/seo/StructuredData";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#D9A066",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://alveto-bg.com"),

  title: {
    default: "ALVETO | Coffee • Brunch • Desserts",
    template: "%s | ALVETO",
  },

  description:
    "Premium specialty coffee, brunch, desserts and cocktails in the heart of Belgrade.",

  keywords: [
    "Alveto",
    "Coffee",
    "Specialty Coffee",
    "Brunch",
    "Breakfast",
    "Desserts",
    "Waffles",
    "Pancakes",
    "Crepes",
    "Cocktails",
    "Belgrade",
    "Vračar",
  ],

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

  alternates: {
    canonical: "https://alveto-bg.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

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

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alveto-bg.com",
    siteName: "ALVETO",
    title: "ALVETO | Coffee • Brunch • Desserts",
    description:
      "Premium specialty coffee, brunch, desserts and cocktails in the heart of Belgrade.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1600,
        height: 900,
        alt: "ALVETO Coffee • Brunch • Desserts",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ALVETO | Coffee • Brunch • Desserts",
    description:
      "Premium specialty coffee, brunch, desserts and cocktails in the heart of Belgrade.",
    images: ["/images/hero.jpg"],
  },

  verification: {
    google: "",
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
    ],
    apple: [
      {
        url: "/favicon.ico",
      },
    ],
    shortcut: "/favicon.ico",
  },
};

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
        <StructuredData />

        {children}
      </body>
    </html>
  );
}