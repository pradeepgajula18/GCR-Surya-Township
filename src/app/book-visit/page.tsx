import React, { Suspense } from 'react';
import SiteVisitBookingSection from '@/components/SiteVisitBookingSection';

export const metadata = {
  title: 'Book a Free Site Visit | GCR Surya Township Koilakuntla',
  description: 'Schedule a free VIP site inspection of GCR Surya Township in Koilakuntla. Complimentary pickup assistance, guided layout tour, and title document review.',
};

function BookVisitContent({ searchParams }: { searchParams: { plot?: string } }) {
  const plot = searchParams?.plot || '';
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <SiteVisitBookingSection prefilledPlot={plot} />
    </div>
  );
}

export default function BookVisitPage({ searchParams }: { searchParams: { plot?: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading site visit form...</div>}>
      <BookVisitContent searchParams={searchParams} />
    </Suspense>
  );
}

