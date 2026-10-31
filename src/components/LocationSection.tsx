'use client';

import React from 'react';
import { MapPin, Navigation, Bus, GraduationCap, Building2, Clock, Phone, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

const LANDMARKS = [
  { icon: Bus, title: 'Koilakuntla RTC Bus Stand', time: '3 Mins (1.2 km)', desc: 'Direct state buses connecting Kurnool, Nandyal, and Kadapa.' },
  { icon: Building2, title: 'Commercial Market & Banks', time: '4 Mins (1.5 km)', desc: 'SBI, Andhra Pragathi Grameena Bank, supermarkets, and post office.' },
  { icon: GraduationCap, title: 'Reputed Schools & Colleges', time: '5 Mins (2.0 km)', desc: 'Sri Chaitanya, Narayana, and Govt Degree Colleges nearby.' },
  { icon: Clock, title: 'Banaganapalle Gateway', time: '18 Mins (16 km)', desc: 'Renowned heritage & growth corridor of Rayalaseema.' },
  { icon: Navigation, title: 'Nandyal District HQ', time: '45 Mins (48 km)', desc: 'Administrative center, railway junction, and multi-speciality hospitals.' },
];

export default function LocationSection() {
  return (
    <section id="location" className="py-20 md:py-28 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surya-orange-50 text-surya-orange-700 text-xs font-semibold tracking-wider uppercase mb-3 border border-surya-orange-200">
            <MapPin className="w-3.5 h-3.5 text-surya-orange-500" />
            <span>Strategic Location & Regional Connectivity</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-surya-navy-950 tracking-tight">
            At the Epicenter of Koilakuntla’s Growth
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            GCR Surya Township is located on the prominent highway access corridor, offering serene residential comfort while keeping every daily convenience within minutes.
          </p>
        </div>

        {/* Content Grid: Landmarks vs Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Key Distances & Highlights */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md">
              <h3 className="font-serif text-xl font-bold text-surya-navy-950 mb-1">
                Prime Neighborhood Connections
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fast transit to everyday educational, medical, and transport essentials.
              </p>

              <div className="space-y-4">
                {LANDMARKS.map((landmark) => {
                  const Icon = landmark.icon;
                  return (
                    <div key={landmark.title} className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                      <div className="p-2.5 rounded-lg bg-surya-navy-50 text-surya-navy-800 shrink-0">
                        <Icon className="w-5 h-5 text-surya-orange-500" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm text-surya-navy-950">
                            {landmark.title}
                          </h4>
                          <span className="text-xs font-bold text-surya-orange-600 bg-surya-orange-50 px-2 py-0.5 rounded">
                            {landmark.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {landmark.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Assistance Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-surya-navy-950 to-surya-navy-900 text-white shadow-xl border border-white/10 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-base text-white">
                  Need Help Finding the Site?
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  We provide free site visit pickup from Koilakuntla bus stand or highway junction.
                </p>
              </div>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="px-4 py-2.5 rounded-xl bg-surya-orange-500 hover:bg-surya-orange-600 text-white font-semibold text-xs shrink-0 flex items-center gap-1.5 shadow-md shadow-surya-orange-500/30"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Google Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 bg-white relative min-h-[420px] flex flex-col">
            <div className="p-4 bg-surya-navy-900 text-white flex items-center justify-between text-xs px-6 border-b border-surya-navy-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-surya-orange-400" />
                <span className="font-semibold tracking-wide">
                  GCR Surya Township Site Coordinates: Koilakuntla, AP
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Koilkuntla,+Andhra+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-surya-orange-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
              >
                <span>Open in Google Maps App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex-grow w-full relative min-h-[400px]">
              <iframe
                title="GCR Surya Township Location Map"
                src={SITE_CONFIG.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '420px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

