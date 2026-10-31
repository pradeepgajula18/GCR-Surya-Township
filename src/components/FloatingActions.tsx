'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Phone, MessageSquare, Calendar } from 'lucide-react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export default function FloatingActions() {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <aside aria-label="Quick contact actions" className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 items-end">
      {/* Schedule Visit Floating Pill */}
      <Link
        href="/book-visit"
        className="hidden md:flex items-center gap-2 bg-surya-navy-900/95 hover:bg-surya-navy-950 text-white border border-surya-orange-500/50 shadow-xl px-4 py-2.5 rounded-full text-xs font-semibold backdrop-blur-md transition-all hover:scale-105"
      >
        <Calendar className="w-3.5 h-3.5 text-surya-orange-400" />
        <span>Book Site Visit</span>
      </Link>

      <div className="flex items-center gap-2.5">
        {/* Direct Call Button */}
        <a
          href={`tel:${SITE_CONFIG.phoneRaw}`}
          aria-label="Call Developer directly"
          className="w-12 h-12 rounded-full bg-surya-navy-900 text-white flex items-center justify-center shadow-2xl border border-white/20 hover:bg-surya-navy-800 transition-all hover:scale-110 group relative"
        >
          <Phone className="w-5 h-5 text-surya-orange-400 group-hover:scale-110 transition-transform" />
          <span className="absolute right-14 bg-surya-navy-950 text-white text-xs px-2.5 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700">
            Call +91 94402 99999
          </span>
        </a>

        {/* WhatsApp Quick Chat */}
        <a
          href={SITE_CONFIG.whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-13 h-13 p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-900/40 transition-all hover:scale-110 group relative"
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="absolute right-16 bg-surya-navy-950 text-white text-xs px-2.5 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </aside>
  );
}

