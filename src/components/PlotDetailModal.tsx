'use client';

import React from 'react';
import Link from 'next/link';
import { X, Calendar, Phone, MessageSquare, Compass, ShieldCheck, Maximize2, Route } from 'lucide-react';
import { Plot } from '@/lib/types';
import { SITE_CONFIG } from '@/lib/constants';

interface PlotDetailModalProps {
  plot: Plot | null;
  onClose: () => void;
}

export default function PlotDetailModal({ plot, onClose }: PlotDetailModalProps) {
  if (!plot) return null;

  const statusConfig = {
    available: { label: 'Available For Booking', bg: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30' },
    reserved: { label: 'Reserved / In Process', bg: 'bg-amber-500/15 text-amber-700 border-amber-500/30' },
    sold: { label: 'Sold & Registered', bg: 'bg-slate-500/15 text-slate-700 border-slate-500/30' },
  }[plot.status];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-surya-navy-950 via-surya-navy-900 to-surya-navy-950 p-6 text-white flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-semibold text-surya-orange-400 tracking-widest block">
              GCR SURYA TOWNSHIP • KOILAKUNTLA
            </span>
            <div className="flex items-center gap-3 mt-1">
              <h3 className="font-serif text-3xl font-bold">Plot #{plot.plot_number}</h3>
              {plot.is_corner && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-surya-orange-500 text-white font-semibold">
                  Corner Plot
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Current Status:
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusConfig.bg}`}>
              {statusConfig.label}
            </span>
          </div>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
                <Maximize2 className="w-3.5 h-3.5 text-surya-orange-500" />
                <span>Area (Sq. Yards)</span>
              </div>
              <p className="font-serif text-xl font-bold text-surya-navy-950">
                {plot.area_sq_yards} <span className="text-xs font-sans text-slate-600 font-normal">Sq. Yds</span>
              </p>
              <p className="text-xs text-slate-600 mt-0.5">Approx {plot.area_cents} Cents</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
                <Compass className="w-3.5 h-3.5 text-surya-orange-500" />
                <span>Facing Direction</span>
              </div>
              <p className="font-serif text-xl font-bold text-surya-navy-950">
                {plot.facing}
              </p>
              <p className="text-xs text-emerald-600 font-medium mt-0.5">100% Vastu Compliant</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
                <Maximize2 className="w-3.5 h-3.5 text-surya-navy-600" />
                <span>Dimensions</span>
              </div>
              <p className="font-mono text-base font-bold text-slate-800">
                {plot.dimensions}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">Demarcated Boundaries</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium mb-1">
                <Route className="w-3.5 h-3.5 text-surya-navy-600" />
                <span>Road Width</span>
              </div>
              <p className="font-serif text-base font-bold text-slate-800">
                {plot.road_width}
              </p>
              <p className="text-xs text-slate-600 mt-0.5">Blacktop Roadway</p>
            </div>
          </div>

          {plot.notes && (
            <div className="p-3 rounded-lg bg-amber-50 text-amber-800 text-xs border border-amber-200">
              <strong>Note:</strong> {plot.notes}
            </div>
          )}

          {/* Legal / Feature Guarantee */}
          <div className="flex items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-3">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Clear Title</span>
            </span>
            <span className="flex items-center gap-1 text-blue-600 font-medium">
              <span>Immediate Registration</span>
            </span>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            {plot.status === 'available' ? (
              <Link
                href={`/book-visit?plot=${plot.plot_number}`}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-surya-orange-500 to-surya-orange-600 hover:from-surya-orange-600 hover:to-surya-orange-700 text-white font-semibold text-sm shadow-lg shadow-surya-orange-500/30 flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Site Visit For Plot #{plot.plot_number}</span>
              </Link>
            ) : (
              <Link
                href={`/book-visit`}
                className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Site Visit For Alternate Plots</span>
              </Link>
            )}

            <div className="grid grid-cols-2 gap-2">
              <a
                href={SITE_CONFIG.whatsappUrl(`Hello Sudheer Developers, I am inquiring about Plot #${plot.plot_number} (${plot.area_sq_yards} Sq. Yds, ${plot.facing} facing) in GCR Surya Township.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold text-xs border border-emerald-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Query</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="py-2.5 rounded-xl bg-surya-navy-50 hover:bg-surya-navy-100 text-surya-navy-800 font-semibold text-xs border border-surya-navy-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-4 h-4 text-surya-orange-500" />
                <span>Call Developer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

