import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';

const siteUrl = 'https://suryatownship.vercel.app';

export const viewport: Viewport = {
  themeColor: '#0B3064',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'GCR Surya Township™ | Ultra-Premium Residential Plots in Koilakuntla, Andhra Pradesh',
    template: '%s | GCR Surya Township',
  },
  description:
    'GCR Surya Township in Koilakuntla, Andhra Pradesh by Sudheer Developers (G. Sudheer Reddy). Premier gated community with 40ft & 33ft BT roads, underground drainage, 100% Vastu compliance, clear legal titles, and immediate spot registration. Call +91 94402 99999.',
  applicationName: 'GCR Surya Township',
  authors: [
    { name: 'Sudheer Developers' },
    { name: 'G. Sudheer Reddy' },
  ],
  generator: 'Next.js',
  keywords: [
    'suryatownship.vercel.app',
    'Surya Township',
    'Surya Township Koilakuntla',
    'GCR Surya Township',
    'GCR Surya Township Koilakuntla',
    'Sudheer Developers',
    'Sudheer Developers Koilakuntla',
    'G. Sudheer Reddy',
    'G Sudheer Reddy Koilakuntla',
    'Plots in Koilakuntla',
    'Open plots in Koilakuntla',
    'Plots for sale in Koilakuntla',
    'Residential plots in Koilakuntla Andhra Pradesh',
    'Koilakuntla real estate',
    'Gated community plots Nandyal district',
    'DTCP layout Koilakuntla',
    'Clear title plots Koilakuntla',
    '100% Vastu plots Rayalaseema',
    'Highway facing plots Koilakuntla',
    'Spot registration plots Koilakuntla',
    'Best real estate investment Koilakuntla',
    'Koilakuntla to Banaganapalli road plots',
    'Underground drainage plots Koilakuntla',
    'Sudheer Developers phone 9440299999',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Sudheer Developers',
  publisher: 'G. Sudheer Reddy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/images/gcr-surya-logo.jpg', sizes: '32x32', type: 'image/jpeg' },
    ],
    apple: [
      { url: '/images/gcr-surya-logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: 'GCR Surya Township™ | Ultra-Premium Residential Plots in Koilakuntla',
    description:
      'Premier gated community plotted venture in Koilakuntla, Andhra Pradesh by Sudheer Developers. 40ft & 33ft BT roads, underground drainage, parks & spot registration.',
    url: siteUrl,
    siteName: 'GCR Surya Township',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/gcr-surya-logo.jpg',
        width: 1024,
        height: 1024,
        alt: 'GCR Surya Township - Sudheer Developers Official Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GCR Surya Township™ | Prime Plots in Koilakuntla, AP',
    description:
      'Premium gated community residential plots by Sudheer Developers (G. Sudheer Reddy). 40ft & 33ft BT roads, 100% Vastu, spot registration.',
    images: ['/images/gcr-surya-logo.jpg'],
  },
  category: 'Real Estate',
  other: {
    'geo.region': 'IN-AP',
    'geo.placename': 'Koilakuntla, Nandyal District, Andhra Pradesh',
    'geo.position': '15.2343;78.3188',
    'ICBM': '15.2343, 78.3188',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['RealEstateAgent', 'LocalBusiness'],
      '@id': `${siteUrl}/#organization`,
      name: 'GCR SURYA TOWNSHIP',
      alternateName: [
        'Surya Township',
        'GCR Surya Township Koilakuntla',
        'Sudheer Developers',
        'G. Sudheer Reddy Township',
      ],
      description:
        'Premier gated community residential plots venture by Sudheer Developers in Koilakuntla, Andhra Pradesh. Features 40ft & 33ft BT roads, underground drainage, spot registration, and 100% Vastu compliance.',
      url: siteUrl,
      telephone: '+91-94402-99999',
      image: `${siteUrl}/images/gcr-surya-logo.jpg`,
      logo: `${siteUrl}/images/gcr-surya-logo.jpg`,
      priceRange: '₹₹ - ₹₹₹',
      founder: {
        '@type': 'Person',
        name: 'G. Sudheer Reddy',
        jobTitle: 'Promoter & Developer',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Near State Highway Corridor',
        addressLocality: 'Koilakuntla',
        addressRegion: 'Andhra Pradesh',
        postalCode: '518134',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 15.2343,
        longitude: 78.3188,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '08:00',
          closes: '20:00',
        },
      ],
      sameAs: [
        'https://ssdcreativestudio.linklee.in',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Residential Open Plots Portfolio',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'SingleFamilyResidence',
              name: '150 Sq. Yards Residential Plot (3.1 Cents)',
              description: 'East & West facing open plots with 33ft BT road access',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'SingleFamilyResidence',
              name: '166.6 Sq. Yards Residential Plot (3.44 Cents)',
              description: 'Vastu compliant residential plots with underground drainage',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'SingleFamilyResidence',
              name: '200 Sq. Yards Residential Plot (4.13 Cents)',
              description: 'Premium plots facing 40ft wide main avenue road',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'SingleFamilyResidence',
              name: '266.6 Sq. Yards Luxury Plot (5.51 Cents)',
              description: 'Corner plots with dual road access and park view',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'GCR Surya Township',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-surya-orange-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
