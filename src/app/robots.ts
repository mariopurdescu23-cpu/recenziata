import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/admin", "/autentificare", "/maison-noir"],
      },
    ],
    sitemap: "https://recenziata.ro/sitemap.xml",
    host: "https://recenziata.ro",
  };
}
