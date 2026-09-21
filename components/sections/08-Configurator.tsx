'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Disc, Shield, Sparkles, Check, ArrowRight, RotateCw } from 'lucide-react';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { useAudio } from '@/context/AudioContext';
import {
  COLOR_OPTIONS,
  WHEEL_OPTIONS,
  CALIPER_OPTIONS,
  INTERIOR_OPTIONS
} from '@/lib/specs-data';

export function ConfiguratorSection() {
  const {
    selectedColor,
    setSelectedColor,
    selectedWheel,
    setSelectedWheel,
    selectedCaliper,
    setSelectedCaliper,
    selectedInterior,
    setSelectedInterior,
    setIsReservationOpen,
    headlightsOn,
    setHeadlightsOn
  } = useConfigurator();

  const { playClick, playModeSwitch } = useAudio();
  const [activeTab, setActiveTab] = useState<'paint' | 'wheels' | 'calipers' | 'interior'>('paint');

  return (
    <section
      id="configurator"
      className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none z-10"
    >
      {/* Top Studio Controls Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-12">
        <div className="space-y-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-cyan-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            08 // BESPOKE COMMISSION STUDIO
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-light text-white uppercase tracking-tight"
          >
            TAILOR YOUR VÉRSE
          </motion.h2>
        </div>

        {/* 360 Orbit Hint & Headlight Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-mono">
            <RotateCw className="w-3 h-3 text-cyan-400 animate-spin" />
            <span>DRAG CANVAS TO ORBIT 360°</span>
          </div>

          <button
            onClick={() => {
              playClick(1100, 0.03);
              setHeadlightsOn(!headlightsOn);
            }}
            data-cursor="LIGHTS"
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-[10px] font-mono transition-colors"
          >
            {headlightsOn ? 'LIGHTS: ON' : 'LIGHTS: OFF'}
          </button>
        </motion.div>
      </div>

      {/* Bottom Floating Customization Dock */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl mx-auto my-6"
      >
        <div className="bg-[#07090c]/90 backdrop-blur-2xl border border-white/15 p-6 sm:p-8 rounded-2xl shadow-2xl space-y-6">
          {/* Customizer Tabs */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 overflow-x-auto gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              {[
                { id: 'paint', label: 'FINISH', icon: Palette },
                { id: 'wheels', label: 'WHEELS', icon: Disc },
                { id: 'calipers', label: 'CALIPERS', icon: Shield },
                { id: 'interior', label: 'CABIN', icon: Sparkles },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playClick(1300, 0.03);
                      setActiveTab(tab.id as typeof activeTab);
                    }}
                    data-cursor="TAB"
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs tracking-wider transition-all focus:outline-none ${
                      isActive
                        ? 'bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Live Price / Commission Button */}
            <button
              onClick={() => {
                playModeSwitch();
                setIsReservationOpen(true);
              }}
              data-cursor="ORDER"
              className="px-5 py-2 rounded-full bg-cyan-400 text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-cyan-300 transition-all flex items-center gap-1.5 flex-shrink-0 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              <span>COMMISSION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Animated Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'paint' && (
              <motion.div
                key="paint"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-mono text-white/40 uppercase">METALLIC BODYWORK TONE</span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{selectedColor.name}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {COLOR_OPTIONS.map((color) => {
                    const isSelected = selectedColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => {
                          playClick(1500, 0.03);
                          setSelectedColor(color);
                        }}
                        data-cursor="COLOR"
                        className={`p-3 rounded-xl border text-left transition-all font-mono focus:outline-none flex flex-col items-center gap-2 ${
                          isSelected
                            ? 'border-cyan-400 bg-white/10 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div
                          className="w-10 h-10 rounded-full border border-white/30 shadow-inner relative flex items-center justify-center"
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && <Check className="w-4 h-4 text-white drop-shadow" />}
                        </div>
                        <span className="text-[10px] text-white text-center font-medium truncate w-full">
                          {color.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] font-mono text-white/50 pt-1">
                  {selectedColor.description}
                </p>
              </motion.div>
            )}

            {activeTab === 'wheels' && (
              <motion.div
                key="wheels"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-mono text-white/40 uppercase">FORGED AERODYNAMIC RIMS</span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{selectedWheel.name}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {WHEEL_OPTIONS.map((wheel) => {
                    const isSelected = selectedWheel.id === wheel.id;
                    return (
                      <button
                        key={wheel.id}
                        onClick={() => {
                          playClick(1400, 0.03);
                          setSelectedWheel(wheel);
                        }}
                        data-cursor="WHEEL"
                        className={`p-4 rounded-xl border text-left transition-all font-mono text-xs focus:outline-none space-y-2 ${
                          isSelected
                            ? 'border-cyan-400 bg-white/10 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-white font-bold">{wheel.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                        </div>
                        <div className="text-[10px] text-cyan-400">{wheel.weightSaved}</div>
                        <p className="text-[10px] text-white/50">{wheel.material}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'calipers' && (
              <motion.div
                key="calipers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-mono text-white/40 uppercase">CARBON-CERAMIC BRAKE CALIPERS</span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{selectedCaliper.name}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CALIPER_OPTIONS.map((caliper) => {
                    const isSelected = selectedCaliper.id === caliper.id;
                    return (
                      <button
                        key={caliper.id}
                        onClick={() => {
                          playClick(1600, 0.03);
                          setSelectedCaliper(caliper);
                        }}
                        data-cursor="CALIPER"
                        className={`p-3.5 rounded-xl border text-left transition-all font-mono text-xs focus:outline-none flex items-center gap-3 ${
                          isSelected
                            ? 'border-cyan-400 bg-white/10 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: caliper.hex }}
                        />
                        <span className="text-white font-medium truncate">{caliper.name}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'interior' && (
              <motion.div
                key="interior"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-mono text-white/40 uppercase">INTERIOR BESPOKE THEME</span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">{selectedInterior.name}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {INTERIOR_OPTIONS.map((interior) => {
                    const isSelected = selectedInterior.id === interior.id;
                    return (
                      <button
                        key={interior.id}
                        onClick={() => {
                          playClick(1400, 0.03);
                          setSelectedInterior(interior);
                        }}
                        data-cursor="CABIN"
                        className={`p-4 rounded-xl border text-left transition-all font-mono text-xs focus:outline-none space-y-1.5 ${
                          isSelected
                            ? 'border-cyan-400 bg-white/10 shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/30"
                            style={{ backgroundColor: interior.hexAccent }}
                          />
                          <span className="text-white font-bold">{interior.name.split('&')[0]}</span>
                        </div>
                        <div className="text-[10px] text-white/50">{interior.palette}</div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
