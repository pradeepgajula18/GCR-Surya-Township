import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ShieldCheck, ArrowUpRight, Compass } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-surya-navy-950 text-slate-300 border-t border-surya-navy-800">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-surya-navy-900 via-surya-navy-950 to-surya-navy-900 border-b border-surya-navy-800/80 py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase font-semibold text-surya-orange-400 tracking-widest block mb-1">
              G. SUDHEER REDDY • SUDHEER DEVELOPERS
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white font-bold">
              Own a Prime Plot in Koilakuntla’s Most Promising Township
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Wide BT roads, underground drainage, vastu compliance, and spot registration.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/book-visit"
              className="bg-surya-orange-500 hover:bg-surya-orange-600 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-all shadow-lg shadow-surya-orange-600/30 flex items-center gap-2"
            >
              <span>Schedule Free Site Visit</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-3 rounded-lg text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-surya-orange-400" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white p-0.5 border-2 border-surya-orange-500 shadow-md">
                <Image
                  src="/images/gcr-surya-logo.jpg"
                  alt="GCR Surya Township"
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-xl font-bold text-white tracking-wide flex items-center">
                  <span>GCR SURYA</span>
                  <span className="text-xs font-sans font-bold text-surya-orange-400 tracking-wider ml-1.5">
                    TOWNSHIP<span className="text-[8px] align-top ml-0.5">&trade;</span>
                  </span>
                </h4>
                <p className="text-xs text-surya-orange-400 font-semibold tracking-wider">SUDHEER DEVELOPERS</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              GCR Surya Township is a premier gated community plotted development situated in Koilakuntla, Andhra Pradesh. Conceived and developed by G. Sudheer Reddy (Sudheer Developers) with uncompromising standards in infrastructure, road widths, and legal transparency.
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Clear Title</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <Compass className="w-4 h-4" />
                <span>100% Vastu Approved</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 text-surya-orange-400">
              Project Navigation
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">About Project & Developer</Link>
              </li>
              <li>
                <Link href="/layout-map" className="hover:text-white transition-colors">Interactive Master Layout</Link>
              </li>
              <li>
                <Link href="/plots" className="hover:text-white transition-colors">Live Plot Availability</Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-white transition-colors">Amenities & Infrastructure</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">Drone & Ground Gallery</Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-white transition-colors">Location & Route Map</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Plot Sizes & Options */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 text-surya-orange-400">
              Plot Dimensions
            </h5>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex justify-between">
                <span>150 Sq. Yards</span>
                <span className="text-slate-300 font-mono">3.1 Cents</span>
              </li>
              <li className="flex justify-between">
                <span>166.6 Sq. Yards</span>
                <span className="text-slate-300 font-mono">3.44 Cents</span>
              </li>
              <li className="flex justify-between">
                <span>200 Sq. Yards</span>
                <span className="text-slate-300 font-mono">4.13 Cents</span>
              </li>
              <li className="flex justify-between">
                <span>266.6 Sq. Yards</span>
                <span className="text-slate-300 font-mono">5.51 Cents</span>
              </li>
              <li className="flex justify-between">
                <span>300 Sq. Yards (Villa)</span>
                <span className="text-slate-300 font-mono">6.20 Cents</span>
              </li>
              <li className="pt-2 text-xs text-amber-300/80">
                East, West & Corner Facing Options
              </li>
            </ul>
          </div>

          {/* Col 4: Project Office & Contact */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4 text-surya-orange-400">
              Contact & Site Office
            </h5>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-surya-orange-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  GCR Surya Township, State Highway, Koilakuntla, Nandyal District, AP - 518134
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-surya-orange-500 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-white hover:text-surya-orange-400 font-medium">
                  {SITE_CONFIG.phone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-surya-navy-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} GCR SURYA TOWNSHIP. Developed by Sudheer Developers (G. Sudheer Reddy). All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1.5">
              <span>Crafted by</span>
              <a
                href="https://ssdcreativestudio.linklee.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-surya-orange-400 hover:text-surya-orange-300 transition-colors underline decoration-surya-orange-500/50 underline-offset-4 hover:decoration-surya-orange-400"
              >
                SSD Creative Studio
              </a>
            </p>

            <span className="text-slate-700">|</span>

            {/* Quick Building Emoji Admin Link */}
            <Link
              href="/admin"
              title="Admin Portal"
              className="text-base opacity-50 hover:opacity-100 hover:scale-125 transition-all p-1"
              aria-label="Admin Access"
            >
              🏢
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
