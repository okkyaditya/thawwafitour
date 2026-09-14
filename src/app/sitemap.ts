import { MetadataRoute } from "next";
import { getPayloadClient } from "@/lib/payload";

export const revalidate = 3600; // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://thawwafi.com";
  const payload = await getPayloadClient();

  try {
    const [packagesResult, postsResult] = await Promise.all([
      payload.find({ collection: "packages", where: { status: { equals: "active" } }, limit: 100, pagination: false }),
      payload.find({ collection: "posts", limit: 100, pagination: false }),
    ]);

    const packageEntries: MetadataRoute.Sitemap = (packagesResult.docs as Array<{id: number; updatedAt?: string; createdAt: string}>).map((pkg) => ({
      url: `${baseUrl}/paket/${pkg.id}`,
      lastModified: new Date(pkg.updatedAt ?? pkg.createdAt),
      priority: 0.8,
      changeFrequency: "weekly" as const,
    }));

    const postEntries: MetadataRoute.Sitemap = (postsResult.docs as Array<{slug: string; updatedAt?: string; createdAt: string}>).map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.createdAt),
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }));

    const staticPages: MetadataRoute.Sitemap = [
      { url: baseUrl, lastModified: new Date(), priority: 1.0, changeFrequency: "daily" as const },
      { url: `${baseUrl}/paket`, lastModified: new Date(), priority: 0.9, changeFrequency: "daily" as const },
      { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8, changeFrequency: "weekly" as const },
      { url: `${baseUrl}/tentang`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" as const },
      { url: `${baseUrl}/kontak`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" as const },
    ];

    return [...staticPages, ...packageEntries, ...postEntries];
  } catch {
    return [
      { url: baseUrl, lastModified: new Date(), priority: 1.0, changeFrequency: "daily" as const },
      { url: `${baseUrl}/paket`, lastModified: new Date(), priority: 0.9, changeFrequency: "daily" as const },
      { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8, changeFrequency: "weekly" as const },
      { url: `${baseUrl}/tentang`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" as const },
      { url: `${baseUrl}/kontak`, lastModified: new Date(), priority: 0.7, changeFrequency: "monthly" as const },
    ];
  }
}
