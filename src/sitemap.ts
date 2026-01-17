import { MetadataRoute } from "next";

const baseUrl = process.env.SITE_URL!;

const staticPages = [
  "/",
  "/products",
  "/categories",
  "/offers",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));
}
