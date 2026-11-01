import React from 'react';
import AmenitiesSection from '@/components/AmenitiesSection';
import { getAmenities } from '@/lib/supabase';
import { DEFAULT_AMENITIES } from '@/lib/defaultData';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Amenities & Infrastructure | GCR Surya Township Koilakuntla',
  description: 'World-class infrastructure at GCR Surya Township: 40ft & 33ft BT roads, underground drainage, landscaped parks, 24/7 security, LED lighting, spot registration.',
};

export default async function AmenitiesPage() {
  const amenities = await getAmenities().catch(() => DEFAULT_AMENITIES);

  return (
    <div className="bg-slate-900 min-h-screen py-10">
      <AmenitiesSection amenities={amenities} />
    </div>
  );
}

