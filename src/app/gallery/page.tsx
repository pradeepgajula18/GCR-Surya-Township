import React from 'react';
import DroneGallerySection from '@/components/DroneGallerySection';
import { getGallery } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Drone Video & Image Gallery | GCR Surya Township Koilakuntla',
  description: 'View 4K drone flyovers, ground progress photos, entrance arch design, and layout developments of GCR Surya Township in Koilakuntla, Andhra Pradesh.',
};

export default async function GalleryPage() {
  const gallery = await getGallery();

  return (
    <div className="bg-white min-h-screen py-8">
      <DroneGallerySection gallery={gallery} />
    </div>
  );
}

