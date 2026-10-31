import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GCR SURYA TOWNSHIP - Sudheer Developers',
    short_name: 'GCR Surya',
    description: 'Ultra-Premium Gated Community Residential Plots in Koilakuntla, Andhra Pradesh by Sudheer Developers (G. Sudheer Reddy).',
    start_url: '/',
    display: 'standalone',
    background_color: '#041228',
    theme_color: '#0B3064',
    icons: [
      {
        src: '/images/gcr-surya-logo.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/images/gcr-surya-logo.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  };
}
