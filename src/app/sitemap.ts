import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://propautopilot.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://propautopilot.com/pitch",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]
}
