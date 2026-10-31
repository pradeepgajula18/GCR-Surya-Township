'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Droplets, Zap, Trees, Route, CheckCircle } from 'lucide-react';
import { ProjectHighlight } from '@/lib/types';
import { DEFAULT_HIGHLIGHTS } from '@/lib/defaultData';

interface ProjectHighlightsProps {
  highlights?: ProjectHighlight[];
}

const ICON_MAP: Record<string, React.ElementType> = {
  Road: Route,
  ShieldCheck: ShieldCheck,
  Compass: Compass,
  Droplets: Droplets,
  Zap: Zap,
  Trees: Trees,
};

export default function ProjectHighlights({ highlights = DEFAULT_HIGHLIGHTS }: ProjectHighlightsProps) {
  return (
    <section id="highlights" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surya-orange-50 text-surya-orange-700 text-xs font-semibold tracking-wider uppercase mb-3 border border-surya-orange-200">
            <CheckCircle className="w-3.5 h-3.5 text-surya-orange-500" />
            <span>Unmatched Quality Specifications</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-surya-navy-950 tracking-tight">
            Engineered For Generations of Trust & Value
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Every feature at GCR Surya Township in Koilakuntla is built to high standards of civil engineering and architectural planning.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const IconComponent = ICON_MAP[item.icon_name] || Route;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative p-8 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-surya-orange-500/50 hover:shadow-2xl hover:shadow-surya-navy-950/10 transition-all duration-300"
              >
                {/* Metric pill */}
                {item.metric && (
                  <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-surya-navy-100/80 text-surya-navy-900 group-hover:bg-surya-orange-500 group-hover:text-white text-xs font-bold font-mono transition-colors">
                    {item.metric}
                  </div>
                )}

                <div className="w-14 h-14 rounded-xl bg-surya-navy-900 group-hover:bg-surya-orange-500 text-white flex items-center justify-center mb-6 shadow-md transition-colors duration-300">
                  <IconComponent className="w-7 h-7" />
                </div>

                <h3 className="font-serif text-xl font-bold text-surya-navy-950 group-hover:text-surya-navy-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {item.metric_label && (
                  <div className="mt-4 pt-4 border-t border-slate-200 text-xs font-semibold text-surya-orange-600 uppercase tracking-wider">
                    {item.metric_label}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

