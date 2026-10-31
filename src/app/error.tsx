'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw, Phone, Home } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4 py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6 text-amber-600">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase tracking-widest text-amber-600 font-bold px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
        Temporary Notice
      </span>

      <h1 className="font-serif text-2xl sm:text-4xl font-bold text-surya-navy-950 mt-4 max-w-lg">
        Something Interrupted This Page
      </h1>

      <p className="text-sm text-slate-600 mt-3 max-w-md">
        We encountered a slight issue while loading this section. You can refresh the view or contact our team directly.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surya-navy-950 hover:bg-surya-navy-900 text-white font-medium text-xs sm:text-sm shadow-md transition-all"
        >
          <RefreshCcw className="w-4 h-4 text-surya-orange-400" />
          <span>Reload Section</span>
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surya-orange-500 hover:bg-surya-orange-600 text-white font-medium text-xs sm:text-sm shadow-md transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <a
          href={`https://wa.me/${SITE_CONFIG.phoneRaw}?text=Hi,%20I%20am%20visiting%20GCR%20Surya%20Township%20website.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm shadow-md transition-all"
        >
          <Phone className="w-4 h-4" />
          <span>WhatsApp Support</span>
        </a>
      </div>
    </div>
  );
}
