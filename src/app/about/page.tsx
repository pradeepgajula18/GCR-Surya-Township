import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Compass, Award, Building, CheckCircle2, Phone, Calendar, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata = {
  title: 'About Project & Developer | GCR Surya Township Koilakuntla',
  description: 'Learn about GCR Surya Township developed by Sudheer Developers (G. Sudheer Reddy). A premium plotted venture in Koilakuntla with 40ft & 33ft BT roads, clear title, and spot registration.',
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      {/* Page Header */}
      <div className="bg-surya-navy-950 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surya-orange-500/20 text-surya-orange-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-surya-orange-500/30">
            <span>The Developer & The Venture</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Building Landmarks of Trust in Koilakuntla
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            GCR Surya Township is a flagship residential venture by Sudheer Developers, engineered to offer security, pride of ownership, and outstanding investment returns.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8">
        {/* Main Overview Card with Official Logo */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white p-2 border-4 border-surya-orange-500 shadow-xl mb-4">
                <Image
                  src="/images/gcr-surya-logo.jpg"
                  alt="GCR Surya Township"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-serif text-2xl font-bold text-surya-navy-950">
                SUDHEER DEVELOPERS
              </h2>
              <p className="text-xs uppercase tracking-widest text-surya-orange-600 font-bold mt-1">
                Promoted by G. Sudheer Reddy
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Headquartered in Koilakuntla, Andhra Pradesh
              </p>

              <div className="mt-6 pt-6 border-t border-slate-200 w-full flex items-center justify-around text-xs text-slate-600">
                <div>
                  <span className="block font-bold text-surya-navy-950 text-lg">100%</span>
                  <span>Clear Title</span>
                </div>
                <div>
                  <span className="block font-bold text-surya-navy-950 text-lg">Spot</span>
                  <span>Registration</span>
                </div>
                <div>
                  <span className="block font-bold text-surya-navy-950 text-lg">40/33 Ft</span>
                  <span>BT Roads</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-surya-navy-950">
                A Vision for Modern Township Living in Rayalaseema
              </h3>
              <p>
                Koilakuntla is witnessing an unprecedented phase of economic and infrastructural expansion. Strategically located along the pivotal transit axis connecting Kurnool, Nandyal, Banaganapalle, and Jammalamadugu, the region requires residential communities that match metro standards while preserving serene natural beauty.
              </p>
              <p>
                Under the leadership of <strong>G. Sudheer Reddy</strong>, <span className="text-surya-navy-900 font-semibold">GCR SURYA TOWNSHIP</span> was conceived to bridge this gap. We have deployed top-tier civil engineering expertise to lay down 40-feet wide main arterial avenues, durable 33-feet cross blacktop roads, underground storm drainage networks, dedicated power grids, and lush community parks.
              </p>
              <p>
                Every buyer is guaranteed complete legal transparency with clear title deeds and prompt spot registration at the local sub-registrar office.
              </p>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-md">
            <div className="w-12 h-12 rounded-xl bg-surya-navy-900 text-surya-orange-400 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-surya-navy-950 mb-2">
              Absolute Legal Security
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              All land parcels have been scrutinized and validated through multiple title searches. Buyers receive clear, marketable, encumbrance-free title deeds with immediate spot registration.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-md">
            <div className="w-12 h-12 rounded-xl bg-surya-navy-900 text-surya-orange-400 flex items-center justify-center mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-surya-navy-950 mb-2">
              100% Traditional Vastu
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Designed strictly per ancient Vastu Shastra principles. Every plot orientation — whether East, West, North, or Corner — is configured to invite prosperity, good health, and peace of mind.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200/80 shadow-md">
            <div className="w-12 h-12 rounded-xl bg-surya-navy-900 text-surya-orange-400 flex items-center justify-center mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-surya-navy-950 mb-2">
              High Capital Appreciation
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Positioned on the primary highway growth corridor of Koilakuntla, real estate values in this sector have consistently grown, making this venture an ideal asset for family wealth creation.
            </p>
          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-8 rounded-3xl bg-surya-navy-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Speak Directly with G. Sudheer Reddy
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Have questions regarding plot bookings or want to schedule an in-person site walkthrough?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/book-visit"
              className="px-6 py-3 rounded-xl bg-surya-orange-500 hover:bg-surya-orange-600 text-white font-semibold text-sm transition-all shadow-md shadow-surya-orange-500/30 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Site Visit</span>
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-surya-orange-400" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

