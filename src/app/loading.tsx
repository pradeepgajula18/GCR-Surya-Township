import React from 'react';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-900/10 px-4">
      <div className="relative flex items-center justify-center">
        {/* Pulsing Outer Rings */}
        <div className="absolute w-24 h-24 rounded-full border-2 border-surya-orange-500/30 animate-ping" />
        <div className="absolute w-20 h-20 rounded-full border-2 border-surya-orange-500/50 animate-pulse" />
        
        {/* Center Logo */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white p-1 border-2 border-surya-orange-500 shadow-xl">
          <Image
            src="/images/gcr-surya-logo.jpg"
            alt="Loading GCR Surya Township"
            width={64}
            height={64}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>

      <div className="mt-6 text-center">
        <h4 className="font-serif font-bold text-lg text-surya-navy-950 tracking-wider">
          GCR SURYA TOWNSHIP<span className="text-[9px] align-top ml-0.5">&trade;</span>
        </h4>
        <p className="text-xs text-surya-orange-600 font-semibold tracking-widest uppercase mt-1 animate-pulse">
          Loading Premium Plotted Venture...
        </p>
      </div>
    </div>
  );
}
