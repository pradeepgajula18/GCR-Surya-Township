import React from 'react';
import InteractiveMasterLayout from '@/components/InteractiveMasterLayout';
import { getPlots } from '@/lib/supabase';
import { DEFAULT_PLOTS } from '@/lib/defaultData';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Interactive Master Layout | GCR Surya Township Koilakuntla',
  description: 'Interactive Master Plan layout map of GCR Surya Township in Koilakuntla. Filter plots by East, West, North, South facing, area in Sq. Yards and live availability.',
};

export default async function LayoutMapPage() {
  const plots = await getPlots().catch(() => DEFAULT_PLOTS);

  return (
    <div className="bg-slate-100 min-h-screen pt-4 pb-16">
      <InteractiveMasterLayout plots={plots} />
    </div>
  );
}

