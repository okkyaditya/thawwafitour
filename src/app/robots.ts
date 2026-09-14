import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/*?*sort=", "/*?*page="],
      },
    ],
    sitemap: "https://thawwafi.com/sitemap.xml",
    host: "https://thawwafi.com",
  };
}