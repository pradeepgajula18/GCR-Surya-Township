import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gcrsuryatownship.com';
  const currentDate = new Date().toISOString();

  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/layout-map`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/plots`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/amenities`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/location`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/book-visit`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
  ];

  return routes;
}
