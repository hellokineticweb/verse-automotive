'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { useAudio } from '@/context/AudioContext';
import { TECH_COMPONENTS } from '@/lib/specs-data';

export function TechnologySection() {
  const { explodedProgress, setExplodedProgress } = useConfigurator();
  const { playClick } = useAudio();
  const [selectedTech, setSelectedTech] = useState(0);

  const handleSelectTech = (idx: number) => {
    playClick(1500, 0.03);
    setSelectedTech(idx);
    setExplodedProgress(0.8);
  };

  return (
    <section
      id="technology"
      className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 py-24 select-none z-10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Tech Schematics & Interactive Exploded Slider */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-cyan-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            04 // STRUCTURAL ANATOMY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight uppercase leading-[0.95]"
          >
            ENGINEERING <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-white/40">
              EXPLODED.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm md:text-base text-white/60 font-light max-w-lg leading-relaxed"
          >
            The carbon monocoque chassis seamlessly integrates the 800V solid-core battery pack as a stressed structural member, delivering extreme torsional rigidity of 48,000 Nm/deg.
          </motion.p>

          {/* Interactive Exploded View Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-[#07090c]/80 backdrop-blur-xl border border-white/10 p-5 rounded-xl space-y-3"
          >
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-white/60 uppercase">EXPLODED CHASSIS INSPECTION</span>
              <span className="text-cyan-400 font-bold">{Math.round(explodedProgress * 100)}% SEPARATION</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodedProgress}
              onChange={(e) => {
                setExplodedProgress(parseFloat(e.target.value));
              }}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[9px] font-mono text-white/40">
              <span>ASSEMBLED MONOCOQUE</span>
              <span>TECHNICAL COMPONENT SEPARATION</span>
            </div>
          </motion.div>

          {/* Tech Component Selection Tabs */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {TECH_COMPONENTS.map((tech, idx) => {
              const isSelected = selectedTech === idx;
              return (
                <button
                  key={tech.id}
                  onClick={() => handleSelectTech(idx)}
                  data-cursor="INSPECT"
                  className={`w-full p-3 rounded-lg border text-left font-mono transition-all text-xs focus:outline-none flex items-center justify-between ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)] font-medium'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{tech.name.split(' ')[0]} {tech.name.split(' ')[1]}</span>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Blueprint Component Card */}
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
                key={selectedTech}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-[#07090c]/90 backdrop-blur-xl border border-cyan-500/20 p-6 sm:p-8 rounded-xl shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono">
                  <span className="text-xs text-cyan-400 uppercase tracking-widest">
                    {TECH_COMPONENTS[selectedTech].category}
                  </span>
                  <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                    PATENT PENDING
                  </span>
                </div>

                <h3 className="text-2xl font-light text-white tracking-wide">
                  {TECH_COMPONENTS[selectedTech].name}
                </h3>

                <div className="space-y-1 font-mono text-xs">
                  <div className="text-white/40 text-[10px] uppercase">TECHNICAL SPECIFICATION</div>
                  <div className="text-white font-medium">{TECH_COMPONENTS[selectedTech].specs}</div>
                </div>

                <div className="space-y-1 font-mono text-xs">
                  <div className="text-white/40 text-[10px] uppercase">BENCHMARK METRIC</div>
                  <div className="text-cyan-400 font-bold text-lg">{TECH_COMPONENTS[selectedTech].metric}</div>
                </div>

                <p className="text-xs text-white/70 font-light leading-relaxed pt-2 border-t border-white/10">
                  {TECH_COMPONENTS[selectedTech].detail}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
