import React from 'react';
import PlotAvailabilityDirectory from '@/components/PlotAvailabilityDirectory';
import { getPlots } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Plot Availability & Pricing | GCR Surya Township Koilakuntla',
  description: 'Search available residential plots in GCR Surya Township Koilakuntla. 150 to 300 Sq. Yards, 40ft & 33ft BT roads, clear title deeds, spot registration.',
};

export default async function PlotsPage() {
  const plots = await getPlots();

  return (
    <div className="bg-white min-h-screen py-8">
      <PlotAvailabilityDirectory plots={plots} />
    </div>
  );
}

