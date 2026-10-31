'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { Amenity } from '@/lib/types';
import { DEFAULT_AMENITIES } from '@/lib/defaultData';
import Link from 'next/link';

interface AmenitiesSectionProps {
  amenities?: Amenity[];
}

export default function AmenitiesSection({ amenities = DEFAULT_AMENITIES }: AmenitiesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Infrastructure', 'Security & Grandeur', 'Recreation & Nature', 'Legal & Investment'];

  const filtered = activeCategory === 'All'
    ? amenities
    : amenities.filter((a) => a.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="amenities" className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle decorative circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-surya-navy-800/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-surya-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surya-orange-500/20 text-surya-orange-400 text-xs font-semibold tracking-wider uppercase mb-3 border border-surya-orange-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Township Infrastructure & Amenities</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Designed for Modern Family Living
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Every convenience thoughtfully incorporated to deliver long-term peace of mind, high quality of life, and robust capital appreciation in Koilakuntla.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-surya-orange-500 text-white shadow-lg shadow-surya-orange-500/30'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((amenity, idx) => (
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative rounded-2xl overflow-hidden bg-slate-800/80 border border-white/10 hover:border-surya-orange-500/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Image Preview */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={amenity.image_url || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'}
                  alt={amenity.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] uppercase font-bold px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-surya-orange-300 border border-white/10">
                  {amenity.category}
                </span>
              </div>

              {/* Text Description */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-surya-orange-400 transition-colors">
                    {amenity.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {amenity.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Integrated Specification</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-surya-navy-800 via-surya-navy-900 to-surya-navy-800 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-xl font-bold text-white">
              Want to see these amenities on the ground?
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Join us for a complimentary on-site guided tour of GCR Surya Township in Koilakuntla.
            </p>
          </div>
          <Link
            href="/book-visit"
            className="px-6 py-3 rounded-xl bg-surya-orange-500 hover:bg-surya-orange-600 text-white font-semibold text-sm shadow-lg shadow-surya-orange-500/30 transition-all flex items-center gap-2 shrink-0"
          >
            <span>Book Guided Site Inspection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

