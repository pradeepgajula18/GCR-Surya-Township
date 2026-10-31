'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, MapPin, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Project', href: '/about' },
  { name: 'Master Layout', href: '/layout-map' },
  { name: 'Plot Availability', href: '/plots' },
  { name: 'Amenities', href: '/amenities' },
  { name: 'Drone Gallery', href: '/gallery' },
  { name: 'Location & Map', href: '/location' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isAdmin) {
    return (
      <header className="sticky top-0 z-50 bg-surya-navy-950 border-b border-surya-navy-800 text-white px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-surya-orange-500 bg-white p-0.5 shadow-sm shrink-0">
              <Image
                src="/images/gcr-surya-logo.jpg"
                alt="GCR Surya Township"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-serif font-bold text-base sm:text-lg text-white tracking-wide flex items-center gap-1.5">
                <span>GCR SURYA</span>
                <span className="text-[11px] font-sans font-bold text-surya-orange-400 tracking-wider">
                  TOWNSHIP<span className="text-[8px] align-top ml-0.5">&trade;</span>
                </span>
              </div>
              <span className="block text-[10px] sm:text-[11px] text-surya-orange-400 font-semibold tracking-wider">
                ADMINISTRATIVE DASHBOARD
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors flex items-center gap-1.5"
            >
              <span>View Public Website</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Top Notification Bar (Visible only when not scrolled) */}
      <div
        className={`bg-surya-navy-950 text-slate-300 text-xs py-2 px-4 sm:px-6 border-b border-surya-navy-800/80 transition-all duration-300 hidden lg:block ${
          isScrolled ? 'opacity-0 h-0 py-0 overflow-hidden border-0' : 'opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-surya-orange-500 shrink-0" />
              <span>Koilakuntla, Andhra Pradesh (Highway Corridor)</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>100% Clear Title • DTCP & RERA Norms • Spot Registration</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="flex items-center gap-1.5 text-surya-orange-400 font-semibold hover:text-surya-orange-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating / Sticky Navbar Wrapper */}
      <div
        className={`z-40 transition-all duration-300 ${
          isScrolled
            ? 'fixed top-2 sm:top-3 inset-x-0 px-2 sm:px-4 md:px-6 pointer-events-none'
            : 'sticky top-0 w-full pointer-events-auto'
        }`}
      >
        <header
          className={`transition-all duration-300 ${
            isScrolled
              ? 'max-w-7xl mx-auto rounded-2xl bg-surya-navy-950/95 backdrop-blur-xl shadow-2xl shadow-black/50 border border-white/15 py-2.5 px-4 sm:px-6 pointer-events-auto'
              : 'w-full bg-surya-navy-900/95 backdrop-blur-md py-3.5 px-4 sm:px-6 border-b border-white/5'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Logo Brand with refined Trademark typography */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div
                className={`relative rounded-full overflow-hidden bg-white p-0.5 shadow-md border-2 border-surya-orange-500 group-hover:scale-105 transition-all shrink-0 ${
                  isScrolled ? 'w-10 h-10 sm:w-11 sm:h-11' : 'w-11 h-11 sm:w-13 sm:h-13'
                }`}
              >
                <Image
                  src="/images/gcr-surya-logo.jpg"
                  alt="GCR Surya Township"
                  width={52}
                  height={52}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="leading-tight">
                <div
                  className={`font-serif font-bold text-white tracking-wide flex items-center ${
                    isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                  }`}
                >
                  <span>GCR SURYA</span>
                  {/* Clean Trademark superscript style without box border */}
                  <span className="text-[10px] sm:text-xs font-sans font-bold tracking-widest text-surya-orange-400 uppercase ml-1.5 self-start">
                    TOWNSHIP<span className="text-[8px] sm:text-[9px] align-top ml-0.5">&trade;</span>
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-300 tracking-wider font-medium">
                  SUDHEER DEVELOPERS • KOILAKUNTLA
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links - roomy whitespace-nowrap preventing text collision */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-3">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium whitespace-nowrap transition-colors ${
                      active
                        ? 'text-surya-orange-400 bg-white/10 font-semibold'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Action CTA */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <Link
                href="/book-visit"
                className="flex items-center gap-1.5 bg-gradient-to-r from-surya-orange-500 to-surya-orange-600 hover:from-surya-orange-600 hover:to-surya-orange-700 text-white font-medium px-4 py-2 rounded-xl text-xs sm:text-sm shadow-md shadow-surya-orange-600/30 whitespace-nowrap transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Site Visit</span>
              </Link>
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Drawer */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-slate-800 space-y-1.5 text-white animate-fade-in">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'text-surya-orange-400 bg-white/10 font-semibold'
                        : 'text-slate-200 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                <Link
                  href="/book-visit"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-surya-orange-500 hover:bg-surya-orange-600 text-white font-semibold py-2.5 rounded-xl text-xs shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Site Visit</span>
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium py-2 rounded-xl text-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-surya-orange-400" />
                  <span>Call {SITE_CONFIG.phone}</span>
                </a>
              </div>
            </div>
          )}
        </header>
      </div>
    </>
  );
}
