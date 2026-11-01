import React from 'react';
import HeroSection from '@/components/HeroSection';
import QuickStats from '@/components/QuickStats';
import AboutTeaser from '@/components/AboutTeaser';
import ProjectHighlights from '@/components/ProjectHighlights';
import InteractiveMasterLayout from '@/components/InteractiveMasterLayout';
import PlotAvailabilityDirectory from '@/components/PlotAvailabilityDirectory';
import AmenitiesSection from '@/components/AmenitiesSection';
import DroneGallerySection from '@/components/DroneGallerySection';
import LocationSection from '@/components/LocationSection';
import SiteVisitBookingSection from '@/components/SiteVisitBookingSection';
import ContactSection from '@/components/ContactSection';
import { getActiveHeroVideo, getPlots, getHighlights, getAmenities, getGallery } from '@/lib/supabase';
import { DEFAULT_HERO_VIDEOS, DEFAULT_PLOTS, DEFAULT_HIGHLIGHTS, DEFAULT_AMENITIES, DEFAULT_GALLERY } from '@/lib/defaultData';

// Revalidate periodically or dynamic SSR
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [activeHero, plots, highlights, amenities, gallery] = await Promise.all([
    getActiveHeroVideo().catch(() => DEFAULT_HERO_VIDEOS[0]),
    getPlots().catch(() => DEFAULT_PLOTS),
    getHighlights().catch(() => DEFAULT_HIGHLIGHTS),
    getAmenities().catch(() => DEFAULT_AMENITIES),
    getGallery().catch(() => DEFAULT_GALLERY),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Cinematic Hero with Dynamic Video */}
      <HeroSection initialVideo={activeHero} />

      {/* Quick Metrics Bar */}
      <QuickStats />

      {/* 2. About Project & Developer G. Sudheer Reddy */}
      <AboutTeaser />

      {/* 3. Project Highlights */}
      <ProjectHighlights highlights={highlights} />

      {/* 4. Interactive Master Layout Map */}
      <InteractiveMasterLayout plots={plots} />

      {/* 5. Plot Availability Directory */}
      <PlotAvailabilityDirectory plots={plots} />

      {/* 6. World-Class Amenities */}
      <AmenitiesSection amenities={amenities} />

      {/* 7. Drone Video & Image Gallery */}
      <DroneGallerySection gallery={gallery} />

      {/* 8. Location & Regional Connectivity */}
      <LocationSection />

      {/* 9. VIP Site Visit Booking */}
      <SiteVisitBookingSection />

      {/* 10. Contact Us & Developer Office */}
      <ContactSection />
    </div>
  );
}

