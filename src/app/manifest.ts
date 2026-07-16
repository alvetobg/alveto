import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ALVETO",
    short_name: "ALVETO",
    description:
      "Premium specialty coffee, brunch and desserts.",

    start_url: "/",

    display: "standalone",

    background_color: "#F7F4EF",

    theme_color: "#D9A066",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/x-icon",
      },
    ],
  };
}