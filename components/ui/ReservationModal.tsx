'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, ArrowRight, Shield, Download } from 'lucide-react';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { useAudio } from '@/context/AudioContext';
import confetti from 'canvas-confetti';

export function ReservationModal() {
  const {
    isReservationOpen,
    setIsReservationOpen,
    selectedColor,
    selectedWheel,
    selectedCaliper,
    selectedInterior
  } = useConfigurator();

  const { playClick, playLaunchIgnition } = useAudio();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Zurich / Private Studio',
    experienceType: 'Private Track Commission & Delivery',
  });

  const reservationCode = 'VRSE-GT1-9842';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playLaunchIgnition();
    setFormSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00e5ff', '#ffffff', '#ff9800'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleClose = () => {
    playClick(1100, 0.04);
    setIsReservationOpen(false);
    setTimeout(() => setFormSubmitted(false), 300);
  };

  if (!isReservationOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-4xl bg-[#090b0e] border border-white/15 rounded-xl shadow-2xl overflow-hidden z-10 my-auto text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono tracking-[0.3em] text-white/50 uppercase">
                COMMISSION ATELIER
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono text-cyan-400">ALLOCATION PROTOCOL</span>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Bespoke Vehicle Specification Summary */}
            <div className="md:col-span-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                  CURRENT SPECIFICATION
                </span>
                <h3 className="text-2xl font-light tracking-wide mt-1 mb-4 text-white">
                  VÉRSE GT-1
                </h3>

                <div className="space-y-4 font-mono text-xs">
                  {/* Exterior Paint */}
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-white/40 uppercase">EXTERIOR FINISH</div>
                      <div className="text-white font-medium">{selectedColor.name}</div>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border border-white/40 shadow-inner"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                  </div>

                  {/* Wheels */}
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className="text-[10px] text-white/40 uppercase">WHEEL ASSEMBLY</div>
                    <div className="text-white font-medium">{selectedWheel.name}</div>
                    <div className="text-[10px] text-white/50 mt-0.5">{selectedWheel.material}</div>
                  </div>

                  {/* Calipers & Interior */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-[10px] text-white/40 uppercase">CALIPERS</div>
                      <div className="text-white font-medium flex items-center gap-1.5 mt-0.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: selectedCaliper.hex }}
                        />
                        <span className="truncate">{selectedCaliper.name}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-[10px] text-white/40 uppercase">INTERIOR</div>
                      <div className="text-white font-medium truncate mt-0.5">{selectedInterior.name.split('&')[0]}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  VIP Concierge Priority
                </span>
                <span className="text-white font-semibold">Q1 2027 DELIVERY</span>
              </div>
            </div>

            {/* Right Column: Allocation Form or Confirmation */}
            <div className="md:col-span-7 flex flex-col justify-center">
              {!formSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h4 className="text-lg font-light tracking-wide text-white">
                      Reserve Your Production Slot
                    </h4>
                    <p className="text-xs text-white/50 mt-1 font-mono">
                      Strictly limited to 150 bespoke chassis globally. No immediate deposit required for portfolio review.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Lord / Lady / Dr. / Alex Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                        Private Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vance@privateoffice.ch"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                        Direct Phone
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+41 44 892 00 11"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded bg-white/5 border border-white/10 text-white placeholder-white/20 text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 mb-1">
                        Showroom Atelier
                      </label>
                      <select
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded bg-neutral-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="Zurich / Private Studio">Zurich / Private Studio</option>
                        <option value="London / Mayfair Atelier">London / Mayfair Atelier</option>
                        <option value="Tokyo / Ginza Pavilion">Tokyo / Ginza Pavilion</option>
                        <option value="New York / Madison Private">New York / Madison Private</option>
                        <option value="Dubai / DIFC Gallery">Dubai / DIFC Gallery</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3.5 rounded-lg bg-white text-black hover:bg-neutral-200 transition-all font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 group shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                  >
                    <span>CONFIRM CHASSIS RESERVATION</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-xl font-light text-white">Chassis Slot Allocated</h4>
                    <p className="text-xs font-mono text-white/50 mt-1">
                      Congratulations, {formData.name || 'Collector'}. Your allocation pass has been confirmed.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-white/5 border border-white/10 font-mono text-left max-w-sm mx-auto">
                    <div className="text-[10px] text-white/40 uppercase">CERTIFICATE NUMBER</div>
                    <div className="text-lg font-bold text-cyan-400 tracking-widest">{reservationCode}</div>
                    <div className="text-[10px] text-white/60 mt-2 flex items-center justify-between">
                      <span>LOCATION: {formData.location}</span>
                      <span className="text-emerald-400">AUTHENTICATED</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold hover:bg-neutral-200 transition-colors"
                    >
                      RETURN TO EXPERIENCE
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
