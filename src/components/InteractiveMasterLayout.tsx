'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw, Map, Layers, CheckCircle2, Search, Filter } from 'lucide-react';
import { Plot, PlotStatus, PlotFacing } from '@/lib/types';
import { DEFAULT_PLOTS } from '@/lib/defaultData';
import PlotDetailModal from './PlotDetailModal';

interface InteractiveMasterLayoutProps {
  plots?: Plot[];
}

export default function InteractiveMasterLayout({ plots = DEFAULT_PLOTS }: InteractiveMasterLayoutProps) {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [hoveredPlot, setHoveredPlot] = useState<Plot | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | PlotStatus>('all');
  const [facingFilter, setFacingFilter] = useState<'all' | PlotFacing>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  // Filtered plot list
  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      const matchStatus = statusFilter === 'all' || plot.status === statusFilter;
      const matchFacing = facingFilter === 'all' || plot.facing === facingFilter;
      const matchSearch =
        searchQuery.trim() === '' ||
        plot.plot_number.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchFacing && matchSearch;
    });
  }, [plots, statusFilter, facingFilter, searchQuery]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: plots.length,
      available: plots.filter((p) => p.status === 'available').length,
      reserved: plots.filter((p) => p.status === 'reserved').length,
      sold: plots.filter((p) => p.status === 'sold').length,
    };
  }, [plots]);

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, 0.7), 2.0));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <section id="master-layout" className="py-20 md:py-28 bg-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surya-navy-100 text-surya-navy-800 text-xs font-semibold tracking-wider uppercase mb-3">
            <Map className="w-3.5 h-3.5 text-surya-orange-500" />
            <span>Interactive Plotted Layout Plan</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-surya-navy-950 tracking-tight">
            Explore GCR Surya Township Master Layout
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Click on any demarcated plot below to view its dimensions, facing orientation, vastu alignment, and live availability.
          </p>
        </div>

        {/* Control & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-200/80 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:inline mr-1">
              Status:
            </span>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-surya-navy-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({counts.all})
            </button>
            <button
              onClick={() => setStatusFilter('available')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                statusFilter === 'available'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available ({counts.available})</span>
            </button>
            <button
              onClick={() => setStatusFilter('reserved')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                statusFilter === 'reserved'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Reserved ({counts.reserved})</span>
            </button>
            <button
              onClick={() => setStatusFilter('sold')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                statusFilter === 'sold'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-500" />
              <span>Sold ({counts.sold})</span>
            </button>
          </div>

          {/* Facing & Search Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Facing select */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                aria-label="Filter by Facing Direction"
                value={facingFilter}
                onChange={(e) => setFacingFilter(e.target.value as any)}
                className="bg-transparent text-slate-700 font-medium focus:outline-none"
              >
                <option value="all">All Facings</option>
                <option value="East">East Facing</option>
                <option value="West">West Facing</option>
                <option value="North">North Facing</option>
                <option value="South">South Facing</option>
              </select>
            </div>

            {/* Plot Number Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Find Plot #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-28 sm:w-36 focus:outline-none focus:ring-1 focus:ring-surya-orange-500"
              />
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
              <button
                onClick={() => handleZoom(0.15)}
                className="p-1.5 text-slate-600 hover:text-surya-navy-950 transition-colors"
                title="Zoom In"
                aria-label="Zoom in on master layout"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleZoom(-0.15)}
                className="p-1.5 text-slate-600 hover:text-surya-navy-950 transition-colors"
                title="Zoom Out"
                aria-label="Zoom out on master layout"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={resetZoom}
                className="p-1.5 text-slate-600 hover:text-surya-navy-950 transition-colors"
                title="Reset Zoom"
                aria-label="Reset zoom on master layout"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Master Plan Map Canvas */}
        <div className="relative bg-white rounded-3xl p-4 sm:p-6 shadow-xl border border-slate-200/90 overflow-hidden">
          {/* Active Hover Pill */}
          {hoveredPlot && (
            <div className="absolute top-4 left-4 z-20 bg-surya-navy-950/95 text-white px-4 py-2 rounded-xl text-xs backdrop-blur-md shadow-xl border border-white/10 flex items-center gap-3 animate-fade-in pointer-events-none">
              <div className="font-serif font-bold text-sm text-surya-orange-400">
                Plot #{hoveredPlot.plot_number}
              </div>
              <div className="text-slate-300">
                {hoveredPlot.area_sq_yards} Sq. Yds ({hoveredPlot.facing} Facing)
              </div>
              <div
                className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                  hoveredPlot.status === 'available'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : hoveredPlot.status === 'reserved'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-slate-700 text-slate-300'
                }`}
              >
                {hoveredPlot.status}
              </div>
            </div>
          )}

          {/* Map Scrollable Wrapper */}
          <div className="w-full overflow-x-auto overflow-y-hidden pb-4">
            <div
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top left',
                transition: 'transform 0.25s ease-out',
                minWidth: '1150px',
              }}
              className="relative select-none"
            >
              <svg
                viewBox="0 0 1200 700"
                className="w-full h-auto drop-shadow-sm"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Layout Boundary */}
                <rect x="20" y="20" width="1160" height="660" rx="16" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="3" />

                {/* Grand Entrance Arch & Security Gate at Top-Left */}
                <rect x="30" y="30" width="160" height="70" rx="8" fill="#0B3064" stroke="#F26522" strokeWidth="2" />
                <text x="110" y="60" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  GRAND ENTRANCE
                </text>
                <text x="110" y="76" fill="#F26522" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  ARCH & SECURITY CABIN
                </text>

                {/* 40-Feet Wide Main Boulevard Road */}
                <rect x="200" y="30" width="70" height="640" fill="#334155" opacity="0.9" />
                {/* Center Road Dashes */}
                <line x1="235" y1="30" x2="235" y2="670" stroke="#F8FAFC" strokeWidth="2" strokeDasharray="10 10" />
                <text x="235" y="360" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle" transform="rotate(-90 235 360)" letterSpacing="3">
                  40-FEET MAIN BOULEVARD ROAD
                </text>

                {/* 33-Feet Internal Cross Road 1 (Horizontal between Block A and Block B) */}
                <rect x="20" y="275" width="1160" height="40" fill="#475569" opacity="0.85" />
                <line x1="20" y1="295" x2="1180" y2="295" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="8 8" />
                <text x="500" y="300" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                  33-FEET WIDE CROSS ROAD NO. 1
                </text>

                {/* 33-Feet Internal Cross Road 2 (Horizontal between Block B and Block C) */}
                <rect x="20" y="445" width="1160" height="40" fill="#475569" opacity="0.85" />
                <line x1="20" y1="465" x2="1180" y2="465" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="8 8" />
                <text x="500" y="470" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" letterSpacing="2">
                  33-FEET WIDE CROSS ROAD NO. 2
                </text>

                {/* North-South Dividing Cross Road East Sector */}
                <rect x="715" y="30" width="45" height="640" fill="#475569" opacity="0.85" />
                <line x1="737" y1="30" x2="737" y2="670" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="8 8" />
                <text x="737" y="360" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90 737 360)">
                  33-FEET CROSS ROAD NO. 3
                </text>

                {/* Landscaped Central Park Zone */}
                <rect x="770" y="275" width="345" height="150" rx="12" fill="#D1FAE5" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="820" cy="330" r="16" fill="#10B981" opacity="0.4" />
                <circle cx="940" cy="360" r="22" fill="#10B981" opacity="0.4" />
                <circle cx="1060" cy="330" r="18" fill="#10B981" opacity="0.4" />
                <text x="942" y="340" fill="#065F46" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  CENTRAL PARK & WALKING TRACK
                </text>
                <text x="942" y="360" fill="#047857" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
                  Lush Greenery • Gazebo • Children Play Arena
                </text>

                {/* Commercial Frontage Space */}
                <rect x="20" y="630" width="180" height="40" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" />
                <text x="110" y="655" fill="#92400E" fontSize="10" fontWeight="bold" textAnchor="middle">
                  COMMERCIAL CORNER
                </text>

                {/* Overhead Water Tank Area */}
                <rect x="1115" y="30" width="60" height="60" rx="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
                <text x="1145" y="55" fill="#0369A1" fontSize="9" fontWeight="bold" textAnchor="middle">
                  WATER
                </text>
                <text x="1145" y="70" fill="#0369A1" fontSize="8" textAnchor="middle">
                  RESERVOIR
                </text>

                {/* Render All Plots */}
                {plots.map((plot) => {
                  const isMatch = filteredPlots.some((fp) => fp.id === plot.id);
                  const isHovered = hoveredPlot?.id === plot.id;

                  // Dynamic color fills based on plot status
                  let fillColor = '#10B981'; // Available (Emerald Green)
                  let strokeColor = '#047857';
                  let textColor = '#FFFFFF';

                  if (plot.status === 'reserved') {
                    fillColor = '#F59E0B'; // Reserved (Amber)
                    strokeColor = '#B45309';
                    textColor = '#FFFFFF';
                  } else if (plot.status === 'sold') {
                    fillColor = '#64748B'; // Sold (Slate)
                    strokeColor = '#334155';
                    textColor = '#E2E8F0';
                  }

                  // Fallback default coordinates
                  const x = plot.x || 100;
                  const y = plot.y || 100;
                  const width = plot.width || 75;
                  const height = plot.height || 55;

                  return (
                    <g
                      key={plot.id}
                      onClick={() => setSelectedPlot(plot)}
                      onMouseEnter={() => setHoveredPlot(plot)}
                      onMouseLeave={() => setHoveredPlot(null)}
                      className="plot-polygon group cursor-pointer"
                      opacity={isMatch ? 1 : 0.25}
                    >
                      {/* Plot Rectangle boundary */}
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx="5"
                        fill={fillColor}
                        stroke={isHovered ? '#FFFFFF' : strokeColor}
                        strokeWidth={isHovered ? '3' : '1.5'}
                        filter={isHovered ? 'url(#drop-shadow)' : undefined}
                      />

                      {/* Corner badge indicator */}
                      {plot.is_corner && (
                        <circle cx={x + width - 8} cy={y + 8} r="4" fill="#F26522" />
                      )}

                      {/* Plot Number */}
                      <text
                        x={x + width / 2}
                        y={y + height / 2 - 3}
                        fill={textColor}
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                        fontFamily="sans-serif"
                      >
                        #{plot.plot_number}
                      </text>

                      {/* Plot Area */}
                      <text
                        x={x + width / 2}
                        y={y + height / 2 + 11}
                        fill={textColor}
                        fontSize="8.5"
                        fontWeight="600"
                        textAnchor="middle"
                        opacity="0.95"
                      >
                        {plot.area_sq_yards} Yds
                      </text>

                      {/* Facing Tag */}
                      <text
                        x={x + width / 2}
                        y={y + height / 2 + 21}
                        fill={textColor}
                        fontSize="7"
                        textAnchor="middle"
                        opacity="0.8"
                      >
                        {plot.facing}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Map Legend Indicator Bar */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500 border border-emerald-600 shadow-sm" />
                <span className="text-slate-700 font-medium">Available Plots ({counts.available})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-amber-500 border border-amber-600 shadow-sm" />
                <span className="text-slate-700 font-medium">Reserved Plots ({counts.reserved})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-500 border border-slate-600 shadow-sm" />
                <span className="text-slate-700 font-medium">Sold & Registered ({counts.sold})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-surya-orange-500" />
                <span className="text-slate-700 font-medium">Corner Plot</span>
              </div>
            </div>

            <div className="text-slate-400 text-[11px] italic">
              * Click any plot on the layout to inspect detailed dimensions & book site visit
            </div>
          </div>
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

