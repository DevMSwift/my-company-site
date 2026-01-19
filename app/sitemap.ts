import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.codecore-cc.com";

  return [{ url: `${baseUrl}/`, lastModified: new Date() }];
}