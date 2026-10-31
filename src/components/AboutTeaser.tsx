'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck, Award, Building, UserCheck } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function AboutTeaser() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Showcase & Real Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80"
                alt="GCR Surya Township Architecture"
                width={800}
                height={900}
                className="w-full h-[480px] object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surya-navy-950/80 via-transparent to-transparent" />

              {/* Floating Badge with official logo */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl flex items-center gap-4 border border-surya-orange-500/30">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white p-1 border-2 border-surya-orange-500 shrink-0 shadow-md">
                  <Image
                    src="/images/gcr-surya-logo.jpg"
                    alt="GCR Surya Township Official Logo"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-surya-navy-950">
                    SUDHEER DEVELOPERS
                  </h4>
                  <p className="text-xs text-surya-orange-600 font-medium">
                    Led by G. Sudheer Reddy • Koilakuntla
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Committed to transparent real-estate development
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative background shape */}
            <div className="absolute -top-6 -left-6 w-32 h-32 rounded-3xl bg-surya-orange-500/10 -z-10 blur-xl" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-full bg-surya-navy-900/10 -z-10 blur-xl" />
          </motion.div>

          {/* Right Column: Narrative & Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surya-navy-100 text-surya-navy-800 text-xs font-semibold tracking-wider uppercase mb-3">
                <Building className="w-3.5 h-3.5 text-surya-orange-500" />
                <span>About GCR Surya Township</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-surya-navy-950 tracking-tight leading-tight">
                Crafting Koilakuntla’s Premier Destination for Modern Living
              </h2>
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Conceived with a vision to redefine plotted community standards in Rayalaseema, <strong className="text-surya-navy-900">GCR SURYA TOWNSHIP</strong> stands as the pinnacle of quality living in Koilakuntla. Under the stewardship of <strong className="text-surya-navy-900">G. Sudheer Reddy</strong> (Sudheer Developers), every facet of this venture has been engineered with uncompromising attention to durability, aesthetics, and legal security.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/70 shadow-sm">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-surya-navy-950">Guaranteed Clear Title</h4>
                  <p className="text-xs text-slate-500 mt-0.5">100% legally clear documentation verified by senior advocates.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/70 shadow-sm">
                <div className="p-2 rounded-lg bg-surya-orange-50 text-surya-orange-600">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-surya-navy-950">Superior Infrastructure</h4>
                  <p className="text-xs text-slate-500 mt-0.5">40ft & 33ft wide asphalt roads, underground drainage, and lighting.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/70 shadow-sm">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-surya-navy-950">Spot Registration</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Seamless immediate registration at Koilakuntla sub-registrar office.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/70 shadow-sm">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-surya-navy-950">100% Vastu Perfection</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Strictly oriented in auspicious East and West directions.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="px-6 py-3 rounded-xl bg-surya-navy-900 hover:bg-surya-navy-950 text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Read Developer Story & Vision</span>
                <ArrowRight className="w-4 h-4 text-surya-orange-400" />
              </Link>
              <Link
                href="/layout-map"
                className="px-6 py-3 rounded-xl bg-surya-orange-50 hover:bg-surya-orange-100 text-surya-orange-700 font-semibold text-sm border border-surya-orange-200 transition-all flex items-center gap-2"
              >
                <span>View Master Layout Plan</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

