'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';
import { PERFORMANCE_METRICS } from '@/lib/specs-data';
import { MaskedHeading, FadeSlideIn, StaggerContainer, StaggerItem } from '@/components/ui/AnimatedText';

export function PerformanceSection() {
  const { triggerThrottle, playLaunchIgnition } = useAudio();
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchSpeed, setLaunchSpeed] = useState(0);
  const [gForce, setGForce] = useState(0);
  const [launchTime, setLaunchTime] = useState(0);
  const launchTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startLaunch = () => {
    setIsLaunching(true);
    setLaunchSpeed(0);
    setLaunchTime(0);
    setGForce(1.35);
    playLaunchIgnition();

    const startTime = performance.now();
    launchTimerRef.current = setInterval(() => {
      const elapsed = (performance.now() - startTime) / 1000;
      setLaunchTime(elapsed);

      // 0 to 100 km/h in 2.9 seconds parabolic curve
      const speed = Math.min(100, (elapsed / 2.9) * 100);
      setLaunchSpeed(Math.round(speed));

      // Throttle audio synth
      triggerThrottle(Math.min(1.0, speed / 100));

      if (speed >= 100) {
        if (launchTimerRef.current) clearInterval(launchTimerRef.current);
        setGForce(0.1);
        setTimeout(() => {
          triggerThrottle(0);
          setIsLaunching(false);
        }, 1200);
      }
    }, 30);
  };

  const stopLaunch = () => {
    if (launchTimerRef.current) clearInterval(launchTimerRef.current);
    triggerThrottle(0);
    setIsLaunching(false);
  };

  useEffect(() => {
    return () => {
      if (launchTimerRef.current) clearInterval(launchTimerRef.current);
    };
  }, []);

  return (
    <section
      id="performance"
      className="relative w-full min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 py-24 select-none z-10"
    >
      <div className="max-w-7xl mx-auto w-full space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <FadeSlideIn delay={0.1} className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-cyan-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            03 // DYNAMICS & PROPULSION
          </FadeSlideIn>

          <div className="space-y-1">
            <MaskedHeading as="h2" delay={0.2} className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight uppercase leading-[0.95]">
              INSTANT. SILENT.
            </MaskedHeading>
            <MaskedHeading as="h2" delay={0.3} className="text-4xl sm:text-6xl md:text-7xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-white/40 uppercase leading-[0.95]">
              UNFORGETTABLE.
            </MaskedHeading>
          </div>

          <FadeSlideIn delay={0.4}>
            <p className="text-sm md:text-base text-white/60 font-light max-w-xl leading-relaxed">
              Dual permanent-magnet motors deliver continuous linear torque from zero RPM.
              No turbo lag. No gear shifts. Pure electric kinetic force.
            </p>
          </FadeSlideIn>
        </div>

        {/* Animated Metrics Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PERFORMANCE_METRICS.map((metric, idx) => (
            <StaggerItem key={idx}>
              <div className="bg-[#07090c]/70 backdrop-blur-md border border-white/10 p-5 rounded-lg space-y-2 hover:border-white/30 transition-colors h-full flex flex-col justify-between">
                <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block">
                  {metric.label}
                </span>
                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-3xl sm:text-4xl font-light text-white font-mono">
                    {metric.value}
                  </span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">
                    {metric.unit}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/50 block">
                  {metric.subtext}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Interactive Launch Control Telemetry HUD */}
        <FadeSlideIn delay={0.2}>
          <div className="bg-[#07090c]/85 backdrop-blur-xl border border-white/15 p-6 sm:p-8 rounded-xl shadow-2xl max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono tracking-widest text-white font-semibold uppercase">
                  VÉRSE LAUNCH CONTROL SIMULATOR
                </span>
              </div>

              <p className="text-xs text-white/60 font-mono leading-relaxed">
                Experience the instantaneous acoustic torque vectoring curve. Press below to engage dual synchronous motors.
              </p>

              {/* Launch Progress Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-[10px] font-mono text-white/60">
                  <span>0 KM/H</span>
                  <span className="text-cyan-400 font-bold">{launchSpeed} KM/H ({launchTime.toFixed(2)}s)</span>
                  <span>100 KM/H</span>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(0,229,255,0.7)]"
                    style={{ width: `${launchSpeed}%` }}
                  />
                </div>
              </div>

              <button
                onMouseDown={startLaunch}
                onMouseUp={stopLaunch}
                onTouchStart={startLaunch}
                onTouchEnd={stopLaunch}
                data-cursor="HOLD"
                className={`w-full sm:w-auto px-8 py-3.5 rounded-lg font-mono text-xs font-bold tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2 ${
                  isLaunching
                    ? 'bg-cyan-400 text-black shadow-[0_0_30px_rgba(0,229,255,0.5)] scale-[0.98]'
                    : 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>{isLaunching ? 'LAUNCHING... (RELEASE TO STOP)' : 'HOLD TO SIMULATE 0–100 KM/H'}</span>
              </button>
            </div>

            {/* Right Live G-Force Meter */}
            <div className="md:col-span-5 grid grid-cols-2 gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 font-mono text-center">
              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <span className="text-[10px] text-white/40 uppercase block">LATERAL ACCEL</span>
                <span className="text-2xl font-light text-cyan-400 mt-1 block">
                  {gForce > 0 ? `${gForce.toFixed(2)} G` : '0.00 G'}
                </span>
                <span className="text-[9px] text-white/50 mt-1 block">Vector Force</span>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                <span className="text-[10px] text-white/40 uppercase block">VOLTAGE</span>
                <span className="text-2xl font-light text-emerald-400 mt-1 block">
                  800 V
                </span>
                <span className="text-[9px] text-white/50 mt-1 block">SiC Bus</span>
              </div>
            </div>
          </div>
        </FadeSlideIn>
      </div>
    </section>
  );
}
