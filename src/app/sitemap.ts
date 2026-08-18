import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data";

const base = "https://recenziata.ro";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/cum-functioneaza`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/preturi`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/aplicatie`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...blogPosts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    { url: `${base}/termeni`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/confidentialitate`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
