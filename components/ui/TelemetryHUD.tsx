'use client';

import React from 'react';
import { useScrollState } from '@/context/ScrollStateContext';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { ShieldCheck, Cpu, Wind, Compass } from 'lucide-react';

export function TelemetryHUD() {
  const { activeSection, scrollProgress } = useScrollState();
  const { aeroMode, selectedColor } = useConfigurator();

  // Hide fixed HUD in hero, configurator, and final cta to prevent any overlapping with primary buttons & content
  if (activeSection === 'hero' || activeSection === 'configurator' || activeSection === 'cta') {
    return null;
  }

  return (
    <aside
      aria-label="Vehicle Telemetry"
      className="hidden xl:flex fixed bottom-8 left-8 right-8 justify-between items-end pointer-events-none z-20 font-mono text-[10px] tracking-wider text-white/50 select-none transition-all duration-300"
    >
      {/* Bottom Left: Vehicle Telemetry */}
      <div className="flex flex-col gap-2 bg-[#050608]/75 backdrop-blur-md border border-white/10 p-3.5 rounded-sm shadow-xl">
        <div className="flex items-center gap-2 text-white/80">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-white font-medium">SYS // ARCHITECTURE: 800V SiC</span>
        </div>
        <div className="flex items-center gap-4 text-white/50">
          <span className="flex items-center gap-1.5">
            <Wind className="w-3 h-3 text-white/40" />
            AERO: <span className="text-white/80">{aeroMode.name.toUpperCase()} ({aeroMode.cd})</span>
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            TORQUE VECTOR: ACTIVE
          </span>
        </div>
      </div>

      {/* Bottom Center: Scroll Progress Bar */}
      <div className="flex flex-col items-center gap-1.5 bg-[#050608]/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
        <div className="w-44 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-150 ease-out shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>
        <div className="flex items-center gap-2 text-[9px] text-white/40">
          <span>01 INTRO</span>
          <span>—</span>
          <span className="text-white/80 font-bold">{Math.round(scrollProgress * 100)}%</span>
          <span>—</span>
          <span>10 LAUNCH</span>
        </div>
      </div>

      {/* Bottom Right: Coordinates & Paint Tone */}
      <div className="flex flex-col gap-2 items-end bg-[#050608]/75 backdrop-blur-md border border-white/10 p-3.5 rounded-sm shadow-xl">
        <div className="flex items-center gap-2 text-white/80">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>SPEC: {selectedColor.name.toUpperCase()}</span>
          <span
            className="w-2.5 h-2.5 rounded-full border border-white/30"
            style={{ backgroundColor: selectedColor.hex }}
          />
        </div>
        <div className="text-white/40">
          LAT 46°31'N / LON 9°50'E // NORDIC STANCE
        </div>
      </div>
    </aside>
  );
}
