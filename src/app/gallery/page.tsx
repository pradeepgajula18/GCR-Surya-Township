import React from 'react';
import DroneGallerySection from '@/components/DroneGallerySection';
import { getGallery } from '@/lib/supabase';
import { DEFAULT_GALLERY } from '@/lib/defaultData';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Drone Video & Image Gallery | GCR Surya Township Koilakuntla',
  description: 'View 4K drone flyovers, ground progress photos, entrance arch design, and layout developments of GCR Surya Township in Koilakuntla, Andhra Pradesh.',
};

export default async function GalleryPage() {
  const gallery = await getGallery().catch(() => DEFAULT_GALLERY);

  return (
    <div className="bg-white min-h-screen py-8">
      <DroneGallerySection gallery={gallery} />
    </div>
  );
}

