'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, SunMedium } from 'lucide-react';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { useAudio } from '@/context/AudioContext';
import { INTERIOR_OPTIONS } from '@/lib/specs-data';

export function InteriorSection() {
  const { selectedInterior, setSelectedInterior } = useConfigurator();
  const { playClick } = useAudio();

  return (
    <section
      id="interior"
      className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 py-24 select-none z-10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Editorial Headline & Manifesto */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-cyan-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            05 // CABIN SANCTUARY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight uppercase leading-[0.95]"
          >
            THE SPACE <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/40">
              BETWEEN DRIVER
            </span> <br />
            AND MACHINE.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm md:text-base text-white/60 font-light max-w-lg leading-relaxed"
          >
            A cocoon of acoustic silence and tactile warmth. The cockpit reduces cognitive load to the essentials, with a panoramic curved display integrated seamlessly into machined titanium bezels.
          </motion.p>

          {/* Interactive Interior Material Trims */}
          <div className="space-y-3 pt-4">
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
              SELECT CABIN BESPOKE UPHOLSTERY
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {INTERIOR_OPTIONS.map((trim) => {
                const isSelected = selectedInterior.id === trim.id;
                return (
                  <button
                    key={trim.id}
                    onClick={() => {
                      playClick(1400, 0.04);
                      setSelectedInterior(trim);
                    }}
                    data-cursor="SELECT"
                    className={`w-full p-3.5 rounded-lg border text-left font-mono transition-all text-xs focus:outline-none ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] font-semibold'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: trim.hexAccent }}
                      />
                      <span className="truncate uppercase text-[10px] tracking-wider">{trim.name.split('&')[0]}</span>
                    </div>
                    <div className="text-[9px] opacity-60 truncate">{trim.palette}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Cabin Material & Acoustic Specs Card */}
        <div className="lg:col-span-6 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedInterior.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="bg-[#07090c]/85 backdrop-blur-xl border border-white/15 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                    {selectedInterior.name}
                  </span>
                  <span className="text-xs font-mono text-white/40">NORDIC ATELIER</span>
                </div>

                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  {selectedInterior.description}
                </p>

                {/* Tactile Material Badges */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
                    AUTHENTICATED LUXURY MATERIALS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedInterior.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono text-white/90 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Active Noise Cancellation & Spatial Audio */}
                <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-500/20 flex items-center gap-3">
                  <SunMedium className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div className="text-xs font-mono">
                    <div className="text-white font-semibold">22-SPEAKER SPATIAL AUDIO</div>
                    <div className="text-white/50 text-[10px]">Headrest active noise neutralization (-28 dB ambient)</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
