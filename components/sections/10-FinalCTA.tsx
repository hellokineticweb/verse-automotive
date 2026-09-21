'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, ArrowUp } from 'lucide-react';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { useAudio } from '@/context/AudioContext';

export function FinalCTASection() {
  const { setIsReservationOpen } = useConfigurator();
  const { playClick, playLaunchIgnition } = useAudio();

  const handleOpenReservation = () => {
    playLaunchIgnition();
    setIsReservationOpen(true);
  };

  const scrollToTop = () => {
    playClick(1500, 0.04);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="cta"
      className="relative w-full min-h-screen flex flex-col justify-between px-6 sm:px-12 md:px-20 pt-28 pb-12 select-none z-10"
    >
      {/* Center Cinematic Climax */}
      <div className="max-w-4xl mx-auto text-center my-auto space-y-8">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-mono tracking-[0.4em] text-cyan-400 uppercase">
              10 // THE HORIZON
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-light text-white tracking-tight uppercase leading-[0.95]"
          >
            THE NEXT HORIZON <br />
            <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-white/30 uppercase leading-[0.95]">
              IS YOURS.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sm sm:text-base text-white/60 font-light max-w-xl mx-auto leading-relaxed"
          >
            Strictly limited to 150 bespoke chassis globally. Commission your specification or schedule a private dynamic evaluation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="pt-4 flex flex-wrap items-center justify-center gap-4"
          >
            <button
              onClick={handleOpenReservation}
              data-cursor="COMMISSION"
              className="px-10 py-4 rounded-full bg-white text-black font-mono text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.25)] flex items-center gap-2 group"
            >
              <span>Experience VÉRSE</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => {
                playClick(1300, 0.03);
                alert('VÉRSE GT-1 Technical Whitepaper Dossier (2027 Edition) ready for review.');
              }}
              data-cursor="DOSSIER"
              className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs tracking-widest uppercase transition-all"
            >
              Technical Dossier
            </button>
          </motion.div>
        </div>
      </div>

      {/* Luxury Footer */}
      <footer className="w-full border-t border-white/10 pt-10 space-y-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-2xl font-light tracking-[0.4em] text-white uppercase block">
              VÉRSE
            </span>
            <p className="text-[11px] font-mono text-white/40 max-w-sm">
              ENGINEERED FOR THE CONNOISSEURS OF ELECTRIC VELOCITY.
            </p>
          </div>

          {/* Showroom Pavilions */}
          <div className="flex flex-wrap gap-6 text-xs font-mono text-white/60">
            {['ZURICH', 'LONDON', 'TOKYO', 'NEW YORK'].map((city) => (
              <div key={city} className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{city}</span>
              </div>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white transition-colors focus:outline-none"
          >
            <span>BACK TO SUMMIT</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/30 pt-6 border-t border-white/5">
          <div>
            © {new Date().getFullYear()} VÉRSE AUTOMOTIVE INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-white/60 cursor-pointer">PRIVACY PROTOCOL</span>
            <span className="hover:text-white/60 cursor-pointer">LEGAL DISCLAIMER</span>
            <span className="hover:text-white/60 cursor-pointer">HOMOLOGATION</span>
          </div>
        </div>
      </footer>
    </section>
  );
}
