'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { soundEngine } from '@/lib/sound-engine';

interface AudioContextType {
  isMuted: boolean;
  toggleMute: () => void;
  unmute: () => void;
  playClick: (freq?: number, duration?: number) => void;
  playModeSwitch: () => void;
  playLaunchIgnition: () => void;
  playPropulsionChord: () => void;
  triggerThrottle: (intensity: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    soundEngine.setMuted(isMuted);
  }, [isMuted]);

  const unmute = () => {
    setIsMuted(false);
    soundEngine.setMuted(false);
    soundEngine.startAmbient();
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
    if (!next) {
      soundEngine.startAmbient();
      soundEngine.playModeSwitch();
    }
  };

  const playClick = (freq?: number, duration?: number) => {
    if (isMuted) return;
    soundEngine.playClick(freq, duration);
  };

  const playModeSwitch = () => {
    soundEngine.playModeSwitch();
  };

  const playLaunchIgnition = () => {
    unmute();
    soundEngine.playLaunchIgnition();
  };

  const playPropulsionChord = () => {
    unmute();
    soundEngine.playPropulsionChord();
  };

  const triggerThrottle = (intensity: number) => {
    soundEngine.triggerThrottle(intensity);
  };

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        unmute,
        playClick,
        playModeSwitch,
        playLaunchIgnition,
        playPropulsionChord,
        triggerThrottle,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
