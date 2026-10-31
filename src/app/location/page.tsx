import React from 'react';
import LocationSection from '@/components/LocationSection';

export const metadata = {
  title: 'Location & Google Map | GCR Surya Township Koilakuntla',
  description: 'GCR Surya Township location in Koilakuntla, Andhra Pradesh. State highway corridor access, distances to RTC bus stand, schools, hospitals, and Nandyal.',
};

export default function LocationPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <LocationSection />
    </div>
  );
}

