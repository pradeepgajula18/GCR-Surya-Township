'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Camera, Eye, Video } from 'lucide-react';
import { GalleryItem } from '@/lib/types';
import { DEFAULT_GALLERY } from '@/lib/defaultData';
import MediaLightbox from './MediaLightbox';

interface DroneGallerySectionProps {
  gallery?: GalleryItem[];
}

export default function DroneGallerySection({ gallery = DEFAULT_GALLERY }: DroneGallerySectionProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>('All');

  const tabs = ['All', 'Drone Views', 'Ground Progress', 'Entrance', 'Amenities', 'Master Plan'];

  const filtered = activeTab === 'All'
    ? gallery
    : gallery.filter((item) => item.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="gallery" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surya-navy-50 text-surya-navy-900 text-xs font-semibold tracking-wider uppercase mb-3 border border-surya-navy-200">
            <Camera className="w-3.5 h-3.5 text-surya-orange-500" />
            <span>Visual Evidence & Field Progress</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-surya-navy-950 tracking-tight">
            Cinematic Drone & Progress Gallery
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Witness the actual development happening on the ground in Koilakuntla with ultra-high resolution photography and aerial drone sweeps.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-surya-navy-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => {
            const isVideo = item.media_type === 'video';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setSelectedItem(item)}
                className="group relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer bg-slate-900 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Image / Thumbnail */}
                <Image
                  src={item.thumbnail_url || item.media_url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surya-navy-950/90 via-surya-navy-950/20 to-black/30 group-hover:via-surya-navy-950/40 transition-colors" />

                {/* Video Play Icon Indicator */}
                {isVideo && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-surya-orange-500/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                )}

                {/* Badge Indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-surya-navy-950/80 backdrop-blur-md text-surya-orange-400 border border-white/10 flex items-center gap-1">
                    {isVideo ? <Video className="w-3 h-3" /> : <Camera className="w-3 h-3" />}
                    <span>{item.category}</span>
                  </span>
                </div>

                {/* Card Title Bottom */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-surya-orange-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 mt-1 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-surya-orange-400" />
                    <span>Click to view full screen {isVideo ? 'video' : 'photo'}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Media Lightbox */}
        <MediaLightbox
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </section>
  );
}

