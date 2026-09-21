'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Gauge, ShieldCheck } from 'lucide-react';

export function RangeSection() {
  const [speed, setSpeed] = useState(110);
  const [temperature, setTemperature] = useState(20);

  const calculateRange = () => {
    let base = 620;
    const speedPenalty = ((speed - 90) / 70) * 140;
    const tempPenalty = temperature < 15 ? (15 - temperature) * 3.5 : (temperature > 30 ? (temperature - 30) * 1.5 : 0);
    return Math.max(380, Math.round(base - speedPenalty - tempPenalty));
  };

  const calculatedRange = calculateRange();

  return (
    <section
      id="range"
      className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 py-24 select-none z-10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Range Manifesto */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-cyan-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            07 // ENERGY DENSITY & 800V ARCHITECTURE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight uppercase leading-[0.95]"
          >
            POWER <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/40">
              WITHOUT
            </span> <br />
            BOUNDARY.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm md:text-base text-white/60 font-light max-w-lg leading-relaxed"
          >
            Equipped with an ultra-dense 118 kWh solid-core battery architecture operating at 800 volts. 300 km of range is replenished in just 10 minutes at 350 kW DC charging stations.
          </motion.p>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 font-mono text-center">
            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
              <span className="text-[9px] text-white/40 uppercase block">MAX CHARGE</span>
              <span className="text-xl sm:text-2xl font-light text-cyan-400 mt-0.5 block">350 kW</span>
              <span className="text-[9px] text-white/50 block">DC Hypercharge</span>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
              <span className="text-[9px] text-white/40 uppercase block">10% TO 80%</span>
              <span className="text-xl sm:text-2xl font-light text-emerald-400 mt-0.5 block">18 MIN</span>
              <span className="text-[9px] text-white/50 block">Pre-conditioned</span>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
              <span className="text-[9px] text-white/40 uppercase block">CAPACITY</span>
              <span className="text-xl sm:text-2xl font-light text-amber-400 mt-0.5 block">118 kWh</span>
              <span className="text-[9px] text-white/50 block">Structural Pack</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Range Simulator Card */}
        <div className="lg:col-span-6 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >
            <div className="bg-[#07090c]/90 backdrop-blur-xl border border-white/15 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                  REAL-TIME RANGE PREDICTOR
                </span>
                <span className="text-xs font-mono text-white/40">WLTP TEST CYCLE</span>
              </div>

              {/* Main Result Display */}
              <div className="text-center py-2 bg-white/5 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                  ESTIMATED REAL-WORLD RANGE
                </span>
                <div className="text-5xl font-light text-white font-mono tracking-tight">
                  {calculatedRange} <span className="text-xl text-cyan-400">KM</span>
                </div>
                <span className="text-[10px] font-mono text-white/50">
                  {(calculatedRange * 0.621371).toFixed(0)} Miles on Full Charge
                </span>
              </div>

              {/* Slider 1: Speed */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/60 flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                    CRUISING SPEED
                  </span>
                  <span className="text-white font-bold">{speed} KM/H</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="160"
                  step="5"
                  value={speed}
                  onChange={(e) => {
                    setSpeed(parseInt(e.target.value));
                  }}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Slider 2: Temperature */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-white/60 flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                    AMBIENT CLIMATE
                  </span>
                  <span className="text-white font-bold">{temperature}°C ({temperature <= 0 ? 'Sub-Zero' : 'Mild'})</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="40"
                  step="5"
                  value={temperature}
                  onChange={(e) => {
                    setTemperature(parseInt(e.target.value));
                  }}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 flex items-center gap-2.5 text-xs font-mono text-emerald-300">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Silicon carbide heat pump standard across all climate packages.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
