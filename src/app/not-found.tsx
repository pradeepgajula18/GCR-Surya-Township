import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Map, CheckSquare, Phone, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-white p-1 border-2 border-surya-orange-500 shadow-xl mb-6">
        <Image
          src="/images/gcr-surya-logo.jpg"
          alt="GCR Surya Township"
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>

      <span className="text-xs uppercase tracking-widest text-surya-orange-600 font-bold px-3 py-1 rounded-full bg-surya-orange-50 border border-surya-orange-200">
        404 - Page Not Found
      </span>

      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-surya-navy-950 mt-4 max-w-xl">
        The Page You Are Looking For Does Not Exist
      </h1>

      <p className="text-sm sm:text-base text-slate-600 mt-3 max-w-md">
        The link may have moved, or the page has been updated. Explore the prime plotted layout or head back home.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surya-navy-950 hover:bg-surya-navy-900 text-white font-medium text-sm shadow-md transition-all"
        >
          <Home className="w-4 h-4 text-surya-orange-400" />
          <span>Return to Home</span>
        </Link>

        <Link
          href="/layout-map"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-surya-orange-500 hover:bg-surya-orange-600 text-white font-medium text-sm shadow-md transition-all"
        >
          <Map className="w-4 h-4" />
          <span>Master Layout Plan</span>
        </Link>

        <Link
          href="/plots"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-medium text-sm border border-slate-200 shadow-sm transition-all"
        >
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          <span>Plot Availability</span>
        </Link>
      </div>
    </div>
  );
}
