'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsLoaded(true);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoaded(true), 250);
          return 100;
        }
        const increment = Math.floor(Math.random() * 18) + 12;
        return Math.min(prev + increment, 100);
      });
    }, 45);

    return () => clearInterval(timer);
  }, []);


  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 bg-[#050608] flex flex-col items-center justify-between p-10 pointer-events-auto select-none"
        >
          {/* Top Label */}
          <div className="text-[10px] font-mono tracking-[0.4em] text-white/40 uppercase">
            FLAGSHIP CONCEPT LAUNCH // 2027
          </div>

          {/* Center Brand Identity */}
          <div className="text-center space-y-4">
            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.8em' }}
              animate={{ opacity: 1, letterSpacing: '0.45em' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="text-5xl md:text-7xl font-light text-white tracking-[0.45em] uppercase pl-4"
            >
              VÉRSE
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xs md:text-sm font-mono tracking-[0.25em] text-white/50 uppercase"
            >
              ENGINEERED FOR THE NEXT HORIZON
            </motion.p>
          </div>

          {/* Bottom Progress Bar */}
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-[10px] font-mono text-white/40 tracking-widest">
              <span>CALIBRATING 3D RIG</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
