import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE.url, lastModified, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${SITE.url}/privacy`, lastModified, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE.url}/terms`, lastModified, changeFrequency: "yearly" as const, priority: 0.3 },
  ];
}
