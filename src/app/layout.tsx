import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alveto.rs"),

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

  applicationName: "ALVETO",

  themeColor: "#D9A066",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alveto.rs",
    siteName: "ALVETO",
    title: "ALVETO | Coffee • Brunch • Desserts",
    description:
      "Premium specialty coffee, brunch, desserts and cocktails in the heart of Belgrade.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1600,
        height: 900,
        alt: "ALVETO",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ALVETO",
    description:
      "Coffee • Brunch • Desserts • Cocktails",
    images: ["/images/hero.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
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
      <body className="bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}