'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudio } from '@/context/AudioContext';

const DESIGN_PILLARS = [
  {
    id: 'sculpted-form',
    number: '01',
    title: 'SCULPTED FORM',
    sub: 'PURE MONOLITHIC VOLUME',
    desc: 'Crafted without superfluous creases. Every curve is formed to slice air with absolute structural purity and muscular athletic proportions.',
    specs: ['Carbon-Composite Monocoque', 'Zero-Gap Surface Tolerances', 'Low Aerodynamic Roofline']
  },
  {
    id: 'precision-lighting',
    number: '02',
    title: 'PRECISION LIGHTING',
    sub: 'PHOTONIC MATRIX BLADES',
    desc: 'An ultra-narrow continuous matrix laser lightbar upfront paired with a monolithic rear OLED light blade that casts razor-sharp geometric horizons in the dark.',
    specs: ['Micro-Lens Projectors', 'Adaptive Beam Shading', 'Integrated Laser DRL']
  },
  {
    id: 'aerodynamic-body',
    number: '03',
    title: 'AERODYNAMIC BODY',
    sub: 'COMPUTATIONAL FLUID DYNAMICS',
    desc: 'Sub-surface venturi tunnels channel massive underfloor vacuum downforce without relying on unsightly static wings.',
    specs: ['0.19 Drag Coefficient', 'Underfloor Venturi Strakes', 'Active Variable Diffuser']
  }
];

export function DesignSection() {
  const [activePillar, setActivePillar] = useState(0);
  const { playClick } = useAudio();

  const handleSelectPillar = (idx: number) => {
    playClick(1300 + idx * 100, 0.03);
    setActivePillar(idx);
  };

  return (
    <section
      id="design"
      className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 py-24 select-none z-10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Big Editorial Statement */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-cyan-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            02 // EXTERIOR ARCHITECTURE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight uppercase leading-[0.95]"
          >
            DESIGN <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/40">
              WITHOUT
            </span> <br />
            COMPROMISE.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm md:text-base text-white/60 font-light max-w-lg leading-relaxed"
          >
            Every surface exists to manage airflow, thermal dissipation, or kinetic stance.
            Nothing is ornamental; everything is essential.
          </motion.p>

          {/* Pillar Selector Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row gap-3"
          >
            {DESIGN_PILLARS.map((pillar, idx) => {
              const isSelected = activePillar === idx;
              return (
                <button
                  key={pillar.id}
                  onClick={() => handleSelectPillar(idx)}
                  data-cursor="INSPECT"
                  className={`px-4 py-3 rounded-lg border text-left transition-all font-mono text-xs focus:outline-none ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="text-[9px] opacity-60">{pillar.number}</div>
                  <div className="font-bold tracking-wider uppercase mt-0.5">{pillar.title}</div>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Right Column: Deep Pillar Detail Card */}
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
                key={activePillar}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-[#07090c]/85 backdrop-blur-xl border border-white/15 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-xs font-mono tracking-widest text-cyan-400">
                    {DESIGN_PILLARS[activePillar].sub}
                  </span>
                  <span className="text-xs font-mono text-white/40">
                    {DESIGN_PILLARS[activePillar].number} / 03
                  </span>
                </div>

                <h3 className="text-2xl font-light text-white tracking-wide">
                  {DESIGN_PILLARS[activePillar].title}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  {DESIGN_PILLARS[activePillar].desc}
                </p>

                {/* Technical Bullet Spec Tags */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
                    ENGINEERING METRICS
                  </span>
                  <div className="space-y-1.5">
                    {DESIGN_PILLARS[activePillar].specs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-mono text-white/80 bg-white/5 px-3 py-2 rounded"
                      >
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        <span>{spec}</span>
                      </div>
                    ))}
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
