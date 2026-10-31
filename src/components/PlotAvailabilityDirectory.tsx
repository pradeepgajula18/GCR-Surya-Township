'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, Compass, Maximize2, Route, Calendar, MessageSquare, Check, ArrowRight } from 'lucide-react';
import { Plot, PlotStatus, PlotFacing } from '@/lib/types';
import { DEFAULT_PLOTS } from '@/lib/defaultData';
import { SITE_CONFIG } from '@/lib/constants';
import PlotDetailModal from './PlotDetailModal';

interface PlotAvailabilityDirectoryProps {
  plots?: Plot[];
}

export default function PlotAvailabilityDirectory({ plots = DEFAULT_PLOTS }: PlotAvailabilityDirectoryProps) {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | PlotStatus>('available');
  const [facingFilter, setFacingFilter] = useState<'all' | PlotFacing>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'plot_number' | 'area_sq_yards'>('plot_number');

  const filteredPlots = useMemo(() => {
    return plots
      .filter((plot) => {
        const matchStatus = statusFilter === 'all' || plot.status === statusFilter;
        const matchFacing = facingFilter === 'all' || plot.facing === facingFilter;
        const matchSearch =
          searchQuery.trim() === '' ||
          plot.plot_number.toLowerCase().includes(searchQuery.toLowerCase());
        return matchStatus && matchFacing && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'plot_number') {
          return parseInt(a.plot_number) - parseInt(b.plot_number);
        }
        return b.area_sq_yards - a.area_sq_yards;
      });
  }, [plots, statusFilter, facingFilter, searchQuery, sortBy]);

  return (
    <section id="plot-directory" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wider uppercase mb-3 border border-emerald-200">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real-Time Inventory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-surya-navy-950 tracking-tight">
              Plot Availability & Dimensions
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-2xl">
              Browse transparent inventory across East, West, North, and South facings. Ready for spot registration at Koilakuntla.
            </p>
          </div>

          <Link
            href="/layout-map"
            className="inline-flex items-center gap-2 text-sm font-semibold text-surya-orange-600 hover:text-surya-orange-700 transition-colors"
          >
            <span>Switch to Master Plan View</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-surya-navy-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              All Plots ({plots.length})
            </button>
            <button
              onClick={() => setStatusFilter('available')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'available'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              Available ({plots.filter((p) => p.status === 'available').length})
            </button>
            <button
              onClick={() => setStatusFilter('reserved')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'reserved'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white text-amber-700 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              Reserved ({plots.filter((p) => p.status === 'reserved').length})
            </button>
            <button
              onClick={() => setStatusFilter('sold')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'sold'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Sold ({plots.filter((p) => p.status === 'sold').length})
            </button>
          </div>

          {/* Facing filter, Sort, and Search */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <select
              aria-label="Filter by Facing Direction"
              value={facingFilter}
              onChange={(e) => setFacingFilter(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-surya-orange-500"
            >
              <option value="all">All Facings</option>
              <option value="East">East Facing</option>
              <option value="West">West Facing</option>
              <option value="North">North Facing</option>
              <option value="South">South Facing</option>
            </select>

            <select
              aria-label="Sort plots by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-surya-orange-500"
            >
              <option value="plot_number">Sort by Plot #</option>
              <option value="area_sq_yards">Sort by Largest Size</option>
            </select>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search plot #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg w-32 focus:outline-none focus:ring-1 focus:ring-surya-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Plots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlots.map((plot) => {
            const isAvailable = plot.status === 'available';
            const isReserved = plot.status === 'reserved';

            return (
              <div
                key={plot.id}
                onClick={() => setSelectedPlot(plot)}
                className={`relative rounded-2xl p-5 border transition-all duration-300 hover:shadow-xl cursor-pointer group flex flex-col justify-between ${
                  isAvailable
                    ? 'bg-white border-slate-200 hover:border-emerald-500'
                    : isReserved
                    ? 'bg-amber-50/40 border-amber-200 hover:border-amber-400'
                    : 'bg-slate-50 border-slate-200 opacity-70'
                }`}
              >
                <div>
                  {/* Top Bar: Plot number and status */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-2xl font-bold text-surya-navy-950 group-hover:text-surya-orange-600 transition-colors">
                        Plot #{plot.plot_number}
                      </span>
                      {plot.is_corner && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-surya-orange-100 text-surya-orange-700">
                          Corner
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isAvailable
                          ? 'bg-emerald-100 text-emerald-800'
                          : isReserved
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {plot.status}
                    </span>
                  </div>

                  {/* Specs List */}
                  <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Maximize2 className="w-3.5 h-3.5 text-surya-orange-500" />
                        <span>Area:</span>
                      </span>
                      <span className="font-bold text-slate-800 font-mono">
                        {plot.area_sq_yards} Sq. Yds ({plot.area_cents} Cents)
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Compass className="w-3.5 h-3.5 text-surya-orange-500" />
                        <span>Orientation:</span>
                      </span>
                      <span className="font-semibold text-slate-800">
                        {plot.facing} Facing
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Route className="w-3.5 h-3.5 text-surya-navy-600" />
                        <span>Road Width:</span>
                      </span>
                      <span className="font-medium text-slate-700">
                        {plot.road_width}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Dimensions:</span>
                      <span className="font-mono text-slate-700">{plot.dimensions}</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-surya-navy-800 group-hover:text-surya-orange-600 flex items-center gap-1">
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>

                  {isAvailable && (
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      Ready to Register
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Plot Detail Modal */}
        <PlotDetailModal
          plot={selectedPlot}
          onClose={() => setSelectedPlot(null)}
        />
      </div>
    </section>
  );
}

