'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Radio, Sparkles } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

const SOUNDSCAPES = [
  {
    id: 'nordic-drone',
    title: 'NORDIC HARMONIC DRONE',
    freq: '55 Hz Sub-Fundamental',
    desc: 'Synthesized directly from the stator magnetic flux frequencies to provide deep acoustic calm in the cockpit.',
  },
  {
    id: 'kinetic-rev',
    title: 'KINETIC TORQUE CRESCENDO',
    freq: '240–1,200 Hz Harmonic Arc',
    desc: 'A progressive acoustic feedback curve responding to throttle angle and lateral cornering loads.',
  },
  {
    id: 'silence',
    title: 'ACTIVE COUNTER-PHASE SILENCE',
    freq: '4-Mic Acoustic Cancellation',
    desc: 'Bespoke anti-noise waveforms emitted via the four headrests eliminate road and tyre rumble completely.',
  }
];

export function ExperienceSection() {
  const { playClick, playLaunchIgnition, playPropulsionChord, isMuted } = useAudio();
  const [activeSoundscape, setActiveSoundscape] = useState(0);
  const [isPlayingChord, setIsPlayingChord] = useState(false);

  const handleTestChord = () => {
    setIsPlayingChord(true);
    playPropulsionChord();
    setTimeout(() => setIsPlayingChord(false), 3500);
  };

  const handleSelectSoundscape = (idx: number) => {
    setActiveSoundscape(idx);
    if (idx === 0) {
      playPropulsionChord();
    } else if (idx === 1) {
      playLaunchIgnition();
    } else {
      playClick(800, 0.2);
    }
  };

  return (
    <section
      id="experience"
      className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 py-24 select-none z-10"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Sensory Manifesto */}
        <div className="lg:col-span-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-cyan-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            09 // ACOUSTIC & TACTILE SENSORY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight uppercase leading-[0.95]"
          >
            POWER <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-white/40">
              WITHOUT
            </span> <br />
            NOISE.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm md:text-base text-white/60 font-light max-w-lg leading-relaxed"
          >
            Electric propulsion is not merely the absence of internal combustion; it is the creation of a new auditory dialogue between machine and driver.
          </motion.p>

          {/* Soundscape Interactive Cards */}
          <div className="space-y-3 pt-4">
            {SOUNDSCAPES.map((item, idx) => {
              const isSelected = activeSoundscape === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectSoundscape(idx)}
                  data-cursor="SAMPLE"
                  className={`w-full p-4 rounded-xl border text-left font-mono transition-all text-xs focus:outline-none flex items-start gap-4 ${
                    isSelected
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.2)] font-medium'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isSelected ? 'text-cyan-600' : 'text-cyan-400'}`} />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold tracking-wider">{item.title}</span>
                      <span className="text-[10px] opacity-60">{item.freq}</span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-black/80' : 'text-white/50'}`}>
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Audio Synthesizer Waveform Visualizer */}
        <div className="lg:col-span-6 flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-md"
          >
            <div className="bg-[#07090c]/85 backdrop-blur-xl border border-white/15 p-6 sm:p-8 rounded-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs">
                <span className="text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  ACOUSTIC FREQUENCY LAB
                </span>
                <span className="text-white/40">24-BIT / 96 KHZ</span>
              </div>

              {/* Visualizer Animated Bars (GPU Composite scaleY) */}
              <div className="h-32 bg-white/5 rounded-lg border border-white/10 p-4 flex items-end justify-between gap-1 overflow-hidden">
                {Array.from({ length: 28 }).map((_, i) => {
                  const targetScale = isPlayingChord || !isMuted ? Math.min(1, Math.max(0.1, (30 + Math.sin(i * 0.5 + activeSoundscape * 3) * 45 + ((i * 17) % 25)) / 100)) : 0.12;
                  return (
                    <motion.div
                      key={i}
                      className="w-full h-full bg-gradient-to-t from-cyan-500 via-cyan-300 to-white rounded-t-sm shadow-[0_0_8px_rgba(0,229,255,0.4)] origin-bottom"
                      animate={{ scaleY: targetScale }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: isPlayingChord ? 0.3 + (i % 4) * 0.08 : 0.8 + (i % 5) * 0.15,
                        ease: 'easeInOut',
                      }}
                    />
                  );
                })}
              </div>


              <div className="flex items-center justify-between text-xs font-mono text-white/60">
                <span>LATENCY: 0.2 MS</span>
                <span className="text-emerald-400">HARMONIC PHASE LOCKED</span>
              </div>

              <button
                onClick={handleTestChord}
                data-cursor="TRIGGER"
                className={`w-full py-3.5 rounded-lg font-mono text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  isPlayingChord
                    ? 'bg-cyan-400 text-black shadow-[0_0_30px_rgba(0,229,255,0.6)] font-bold scale-[0.98]'
                    : 'bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-md'
                }`}
              >
                <Radio className={`w-4 h-4 ${isPlayingChord ? 'animate-spin text-black' : 'text-cyan-400'}`} />
                <span>{isPlayingChord ? 'PLAYING PROPULSION CHORD...' : 'TEST FULL PROPULSION CHORD'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
