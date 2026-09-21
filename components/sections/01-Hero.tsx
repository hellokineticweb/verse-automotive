'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';
import { useConfigurator } from '@/context/ConfiguratorContext';

export function HeroSection() {
  const { playClick } = useAudio();
  const { headlightsOn, setHeadlightsOn } = useConfigurator();

  const handleExplore = () => {
    playClick(1200, 0.04);
    const designSec = document.getElementById('design');
    if (designSec) designSec.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTech = () => {
    playClick(1400, 0.04);
    const techSec = document.getElementById('technology');
    if (techSec) techSec.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none z-10"
    >
      {/* Top Tagline Indicator */}
      <div className="pt-20 sm:pt-24 flex items-center justify-between pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[10px] font-mono tracking-[0.35em] text-white/60 uppercase">
            WORLD PREMIERE // PURE ELECTRIC GRAND TOURER
          </span>
        </motion.div>

        {/* Headlight Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <button
            onClick={() => {
              playClick(1000, 0.03);
              setHeadlightsOn(!headlightsOn);
            }}
            data-cursor="LIGHTS"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all text-[10px] font-mono"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>{headlightsOn ? 'MATRIX LIGHTS ON' : 'STEALTH MODE'}</span>
          </button>
        </motion.div>
      </div>

      {/* Main Center / Left Hero Editorial Block */}
      <div className="max-w-3xl my-auto py-6 sm:py-8 pointer-events-auto">
        <div className="space-y-4 sm:space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <span className="inline-block text-xs font-mono tracking-[0.4em] text-cyan-400 uppercase">
              01 — THE FLAGSHIP
            </span>
          </motion.div>

          <div className="space-y-0.5 sm:space-y-1">
            <div className="overflow-hidden py-0.5">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase leading-[0.95]"
              >
                ENGINEERED
              </motion.h1>
            </div>
            <div className="overflow-hidden py-0.5">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-white/40 uppercase leading-[0.95]"
              >
                FOR THE NEXT
              </motion.h1>
            </div>
            <div className="overflow-hidden py-0.5">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase leading-[0.95]"
              >
                HORIZON.
              </motion.h1>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-lg text-xs sm:text-sm text-white/70 font-light leading-relaxed"
          >
            VÉRSE is a new expression of electric performance, precision and design.
            Born in Scandinavian winds, sculpted by computational aerodynamics.
          </motion.p>

          {/* Interactive CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <button
              onClick={handleExplore}
              data-cursor="SCROLL"
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white text-black font-mono text-xs font-semibold tracking-widest uppercase hover:bg-neutral-200 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center gap-2 group"
            >
              <span>Explore VÉRSE</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            </button>

            <button
              onClick={handleTech}
              data-cursor="INSPECT"
              className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-widest uppercase transition-all backdrop-blur-sm"
            >
              Discover the Technology
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Telemetry Overview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex flex-wrap items-end justify-between border-t border-white/10 pt-4 sm:pt-6 gap-4"
      >
        <div className="flex gap-6 sm:gap-12 md:gap-16">
          <div>
            <div className="text-xl sm:text-2xl md:text-3xl font-light text-white font-mono">2.9<span className="text-xs text-cyan-400 ml-1">S</span></div>
            <div className="text-[9px] font-mono tracking-widest text-white/40 uppercase mt-0.5">0–100 KM/H</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl md:text-3xl font-light text-white font-mono">680<span className="text-xs text-amber-400 ml-1">HP</span></div>
            <div className="text-[9px] font-mono tracking-widest text-white/40 uppercase mt-0.5">DUAL MOTOR</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl md:text-3xl font-light text-white font-mono">620<span className="text-xs text-emerald-400 ml-1">KM</span></div>
            <div className="text-[9px] font-mono tracking-widest text-white/40 uppercase mt-0.5">RANGE (WLTP)</div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-white/40 tracking-widest uppercase">
          <span>SCROLL TO UNVEIL</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
