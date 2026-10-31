'use client';

import React from 'react';
import Image from 'next/image';
import { X, Play } from 'lucide-react';
import { GalleryItem } from '@/lib/types';

interface MediaLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export default function MediaLightbox({ item, onClose }: MediaLightboxProps) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <button
        onClick={onClose}
        aria-label="Close media preview"
        className="absolute top-6 right-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
        {item.media_type === 'video' ? (
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
            <video
              src={item.media_url}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={item.media_url}
              alt={item.title}
              fill
              className="object-contain"
            />
          </div>
        )}

        <div className="mt-4 text-center">
          <span className="text-xs uppercase font-semibold text-surya-orange-400 tracking-wider">
            {item.category}
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
            {item.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

