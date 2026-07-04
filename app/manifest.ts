import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — психолог онлайн (КПТ)`,
    short_name: siteConfig.brand,
    description: "Психолог-консультант, специализация КПТ. Онлайн-консультации.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ee",
    theme_color: "#7c9a82",
    lang: "ru",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
