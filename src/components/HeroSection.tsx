'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Compass, ShieldCheck, ChevronDown, Calendar, ArrowRight, Phone } from 'lucide-react';
import { HeroVideo } from '@/lib/types';
import { getActiveHeroVideo } from '@/lib/supabase';
import { DEFAULT_HERO_VIDEOS } from '@/lib/defaultData';
import { SITE_CONFIG } from '@/lib/constants';

interface HeroSectionProps {
  initialVideo?: HeroVideo;
}

export default function HeroSection({ initialVideo }: HeroSectionProps) {
  const [videoData, setVideoData] = useState<HeroVideo>(initialVideo || DEFAULT_HERO_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch dynamic hero video from Supabase / local cache
  useEffect(() => {
    async function loadVideo() {
      const active = await getActiveHeroVideo();
      if (active && active.video_url) {
        setVideoData(active);
      }
    }
    loadVideo();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full h-[92vh] min-h-[640px] max-h-[1080px] bg-surya-navy-950 overflow-hidden flex items-center justify-center">
      {/* Background Video with Poster Fallback */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {videoData?.poster_url && !isVideoLoaded && (
          <Image
            src={videoData.poster_url}
            alt="GCR Surya Township Background"
            fill
            priority
            className="object-cover w-full h-full transform scale-105 filter brightness-75 transition-opacity duration-1000"
          />
        )}
        <video
          ref={videoRef}
          key={videoData?.video_url}
          src={videoData?.video_url}
          poster={videoData?.poster_url}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover will-change-transform transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-85' : 'opacity-0'
          }`}
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-surya-navy-950 via-surya-navy-950/50 to-surya-navy-950/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-surya-navy-950/30 to-surya-navy-950/80" />
      </div>

      {/* Floating Video Controls */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-surya-navy-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg text-white text-xs">
        <button
          onClick={togglePlay}
          className="p-1 hover:text-surya-orange-400 transition-colors"
          title={isPlaying ? 'Pause Video' : 'Play Video'}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
        </button>
        <div className="h-3 w-[1px] bg-white/20" />
        <button
          onClick={toggleMute}
          className="p-1 hover:text-surya-orange-400 transition-colors"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-surya-orange-400" />}
        </button>
        <span className="hidden sm:inline-block text-[11px] text-slate-300 font-medium pl-1">
          {videoData.title ? videoData.title.slice(0, 24) + '...' : 'Drone 4K'}
        </span>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center text-white flex flex-col items-center">
        {/* Project Branding Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surya-orange-500/20 border border-surya-orange-500/40 text-surya-orange-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-5 backdrop-blur-md shadow-md"
        >
          <span className="w-2 h-2 rounded-full bg-surya-orange-500 animate-ping" />
          <span>{videoData.badge_text || 'DTCP & RERA Compliant Plotted Venture'}</span>
        </motion.div>

        {/* Developer Attribution */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xs sm:text-sm tracking-[0.25em] text-slate-300 uppercase font-sans font-medium mb-3"
        >
          Sudheer Developers • G. Sudheer Reddy Presents
        </motion.p>

        {/* Main Grand Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl drop-shadow-2xl"
        >
          GCR SURYA <span className="text-orange-gradient">TOWNSHIP<span className="text-xs sm:text-sm md:text-lg font-sans font-bold align-top ml-1 text-surya-orange-400">&trade;</span></span>
        </motion.h1>

        {/* Subtitle / Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 text-base sm:text-xl text-slate-200 max-w-3xl leading-relaxed font-light drop-shadow-md"
        >
          {videoData.subheadline ||
            'Ultra-Premium Gated Community Residential Plots in Koilakuntla, Andhra Pradesh with 40ft & 33ft BT roads, underground drainage, and immediate spot registration.'}
        </motion.p>

        {/* Key Feature Badges Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-200"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-surya-orange-400" />
            <span>40ft & 33ft BT Roads</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Clear Title</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>100% Vastu Compliant</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Underground Drainage</span>
          </div>
        </motion.div>

        {/* Action Buttons Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/layout-map"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-surya-orange-500 to-surya-orange-600 hover:from-surya-orange-600 hover:to-surya-orange-700 text-white font-semibold text-sm sm:text-base shadow-xl shadow-surya-orange-600/40 transition-all hover:scale-[1.03] flex items-center justify-center gap-2 group"
          >
            <span>Explore Interactive Master Layout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/book-visit"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base backdrop-blur-md border border-white/25 transition-all hover:scale-[1.03] flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-surya-orange-400" />
            <span>Book Free Site Visit</span>
          </Link>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <a
        href="#quick-stats"
        aria-label="Scroll to Project Details"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-slate-400 hover:text-white transition-colors group cursor-pointer"
      >
        <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 group-hover:text-surya-orange-400">
          Scroll Down
        </span>
        <ChevronDown className="w-5 h-5 animate-bounce text-surya-orange-400 mt-1" />
      </a>
    </section>
  );
}

