'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { useAudio } from '@/context/AudioContext';
import { AERO_MODES, AeroMode } from '@/lib/specs-data';

export function AerodynamicsSection() {
  const { aeroMode, setAeroMode } = useConfigurator();
  const { playModeSwitch } = useAudio();

  const handleModeChange = (mode: AeroMode) => {
    playModeSwitch();
    setAeroMode(mode);
  };

  return (
    <section
      id="aerodynamics"
      className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 py-24 select-none z-10"
    >
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-cyan-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            06 // FLUID DYNAMICS & WIND TUNNEL
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight uppercase leading-[0.95]"
          >
            SHAPED BY <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-white/40">
              INVISIBLE CURRENTS.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm md:text-base text-white/60 font-light max-w-xl leading-relaxed"
          >
            Real-time active aerodynamics modulate underfloor venturi channels and the rear dual-plane carbon wing to balance minimum drag against massive high-speed downforce.
          </motion.p>
        </div>

        {/* Interactive Aero Mode Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AERO_MODES.map((mode) => {
            const isActive = aeroMode.id === mode.id;
            return (
              <motion.button
                key={mode.id}
                onClick={() => handleModeChange(mode)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="ACTIVE"
                className={`w-full p-6 sm:p-8 rounded-xl border text-left transition-all relative overflow-hidden focus:outline-none flex flex-col justify-between min-h-[260px] ${
                  isActive
                    ? 'bg-[#07090c]/90 border-cyan-400 shadow-[0_0_30px_rgba(0,229,255,0.25)]'
                    : 'bg-[#07090c]/60 border-white/10 hover:border-white/30 hover:bg-[#07090c]/80'
                }`}
              >
                {/* Active Indicator Top Glow */}
                {isActive && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1 shadow-[0_0_12px_rgba(0,229,255,0.8)]"
                    style={{ backgroundColor: mode.color }}
                  />
                )}

                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-3">
                    <span
                      className="font-bold tracking-widest uppercase"
                      style={{ color: isActive ? mode.color : 'rgba(255,255,255,0.5)' }}
                    >
                      {mode.name}
                    </span>
                    <span className="text-white/40 text-[10px]">{mode.speedRating}</span>
                  </div>

                  <div className="text-3xl font-light text-white font-mono mb-2">
                    {mode.cd}
                  </div>

                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {mode.description}
                  </p>
                </div>

                {/* Technical Aero Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/10 font-mono text-xs mt-4">
                  <div>
                    <span className="text-[9px] text-white/40 block">DOWNFORCE</span>
                    <span className="text-white font-semibold">{mode.downforce}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/40 block">SUSPENSION</span>
                    <span className="text-cyan-400 font-semibold">{mode.suspension}</span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Live Wind Tunnel Telemetry Banner */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/70">
          <div className="flex items-center gap-3">
            <Wind className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>WIND TUNNEL SIMULATION: <strong className="text-white">{aeroMode.name.toUpperCase()}</strong></span>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-white/50">
            <span>VELOCITY: <strong className="text-cyan-400">{aeroMode.particleSpeed * 60} KM/H</strong></span>
            <span>STREAMLINES: <strong className="text-white">{aeroMode.particleDensity} VECTORS</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
}
