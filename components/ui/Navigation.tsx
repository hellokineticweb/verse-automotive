'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';
import { useScrollState, SectionId } from '@/context/ScrollStateContext';
import { useConfigurator } from '@/context/ConfiguratorContext';

const NAV_LINKS: { id: SectionId; label: string; number: string }[] = [
  { id: 'hero', label: 'MODEL', number: '01' },
  { id: 'design', label: 'DESIGN', number: '02' },
  { id: 'performance', label: 'PERFORMANCE', number: '03' },
  { id: 'technology', label: 'TECHNOLOGY', number: '04' },
  { id: 'interior', label: 'INTERIOR', number: '05' },
  { id: 'aerodynamics', label: 'AERO', number: '06' },
  { id: 'configurator', label: 'STUDIO', number: '08' },
];

export function Navigation() {
  const { isMuted, toggleMute, playClick } = useAudio();
  const { activeSection } = useScrollState();
  const { setIsReservationOpen } = useConfigurator();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrolled = activeSection !== 'hero';


  const scrollToSection = (id: SectionId) => {
    playClick(1400, 0.03);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050608]/75 backdrop-blur-md border-b border-white/5 py-4'
            : 'bg-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Monogram */}
          <button
            onClick={() => scrollToSection('hero')}
            data-cursor="TOP"
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <span className="text-xl md:text-2xl font-light tracking-[0.35em] text-white transition-colors group-hover:text-white/80 uppercase">
              VÉRSE
            </span>
            <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-white/40 border border-white/10 px-1.5 py-0.5 rounded-sm">
              GT-1 EV
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  data-cursor="VIEW"
                  className={`text-xs font-mono tracking-[0.2em] transition-all relative py-1 focus:outline-none ${
                    isActive ? 'text-white font-medium' : 'text-white/45 hover:text-white/90'
                  }`}
                >
                  <span className="text-[9px] text-white/30 mr-1.5">{item.number}</span>
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Utilities (Sound & Reservation CTA) */}
          <div className="flex items-center gap-4">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                toggleMute();
                playClick(900, 0.05);
              }}
              data-cursor={isMuted ? 'SOUND' : 'MUTE'}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all text-xs font-mono focus:outline-none"
              title={isMuted ? 'Enable Soundscape' : 'Mute Soundscape'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-white/50" />
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  <span className="flex items-end gap-[2px] h-3">
                    <span className="w-[2px] h-2 bg-cyan-400 animate-bounce" />
                    <span className="w-[2px] h-3 bg-cyan-400 animate-pulse" />
                    <span className="w-[2px] h-1.5 bg-cyan-400 animate-bounce" />
                  </span>
                </>
              )}
              <span className="hidden sm:inline text-[10px] tracking-widest uppercase">
                {isMuted ? 'AUDIO OFF' : 'ACOUSTIC'}
              </span>
            </button>

            {/* VIP Reserve Button */}
            <button
              onClick={() => {
                playClick(1600, 0.04);
                setIsReservationOpen(true);
              }}
              data-cursor="RESERVE"
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-mono text-xs font-medium tracking-wider hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] group focus:outline-none"
            >
              <span>ACQUIRE</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                playClick(1000, 0.03);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 text-white/80 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#050608]/95 backdrop-blur-2xl flex flex-col justify-between pt-28 pb-12 px-8 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
                PORTFOLIO DIRECTORY
              </span>
              {NAV_LINKS.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-baseline justify-between text-2xl font-light tracking-widest text-white/80 hover:text-white text-left py-2 border-b border-white/5 focus:outline-none"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-white/30">{item.number}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsReservationOpen(true);
                }}
                className="w-full py-4 rounded-full bg-white text-black font-mono text-sm tracking-widest font-semibold flex items-center justify-center gap-2"
              >
                <span>COMMISSION VÉRSE</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[10px] font-mono text-white/30 tracking-widest">
                © {new Date().getFullYear()} VÉRSE AUTOMOTIVE INC.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
