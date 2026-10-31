'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Compass, ShieldCheck, MapPin, Sparkles, Award } from 'lucide-react';

const STATS = [
  {
    icon: Landmark,
    label: 'Plotted Venture',
    value: '52+ Plots',
    sub: '150 - 300 Sq. Yards',
  },
  {
    icon: Award,
    label: 'Road Infrastructure',
    value: '40 & 33 Ft',
    sub: 'Blacktop Asphalt Roads',
  },
  {
    icon: Compass,
    label: 'Vastu Alignment',
    value: '100% Vastu',
    sub: 'East, West & Corner',
  },
  {
    icon: ShieldCheck,
    label: 'Legal Assurance',
    value: 'Clear Title',
    sub: 'Immediate Spot Registration',
  },
  {
    icon: MapPin,
    label: 'Strategic Location',
    value: 'Koilakuntla',
    sub: 'State Highway Corridor',
  },
];

export default function QuickStats() {
  return (
    <section id="quick-stats" className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-200/80 p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-4 lg:pt-0 lg:pl-6' : ''}`}
              >
                <div className="w-12 h-12 rounded-xl bg-surya-navy-50 text-surya-navy-800 flex items-center justify-center mb-3 shadow-inner">
                  <Icon className="w-6 h-6 text-surya-orange-500" />
                </div>
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-500">
                  {stat.label}
                </span>
                <span className="text-xl md:text-2xl font-bold font-serif text-surya-navy-950 mt-1">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-600 mt-0.5">
                  {stat.sub}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

