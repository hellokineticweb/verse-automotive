'use client';

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import {
  COLOR_OPTIONS,
  WHEEL_OPTIONS,
  CALIPER_OPTIONS,
  INTERIOR_OPTIONS,
  AERO_MODES,
  ColorOption,
  WheelOption,
  CaliperOption,
  InteriorOption,
  AeroMode
} from '@/lib/specs-data';

interface ConfiguratorContextType {
  selectedColor: ColorOption;
  setSelectedColor: (color: ColorOption) => void;
  selectedWheel: WheelOption;
  setSelectedWheel: (wheel: WheelOption) => void;
  selectedCaliper: CaliperOption;
  setSelectedCaliper: (caliper: CaliperOption) => void;
  selectedInterior: InteriorOption;
  setSelectedInterior: (interior: InteriorOption) => void;
  aeroMode: AeroMode;
  setAeroMode: (mode: AeroMode) => void;
  headlightsOn: boolean;
  setHeadlightsOn: (on: boolean) => void;
  doorsOpen: boolean;
  setDoorsOpen: (open: boolean) => void;
  explodedProgress: number;
  setExplodedProgress: (progress: number) => void;
  isCustomizing: boolean;
  setIsCustomizing: (val: boolean) => void;
  activeTechPart: string | null;
  setActiveTechPart: (id: string | null) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
}

const ConfiguratorContext = createContext<ConfiguratorContextType | undefined>(undefined);

export function ConfiguratorProvider({ children }: { children: ReactNode }) {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(COLOR_OPTIONS[0]);
  const [selectedWheel, setSelectedWheel] = useState<WheelOption>(WHEEL_OPTIONS[0]);
  const [selectedCaliper, setSelectedCaliper] = useState<CaliperOption>(CALIPER_OPTIONS[0]);
  const [selectedInterior, setSelectedInterior] = useState<InteriorOption>(INTERIOR_OPTIONS[0]);
  const [aeroMode, setAeroMode] = useState<AeroMode>(AERO_MODES[1]); // Default TOURING
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [explodedProgress, setExplodedProgress] = useState(0);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [activeTechPart, setActiveTechPart] = useState<string | null>(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const value = useMemo(
    () => ({
      selectedColor,
      setSelectedColor,
      selectedWheel,
      setSelectedWheel,
      selectedCaliper,
      setSelectedCaliper,
      selectedInterior,
      setSelectedInterior,
      aeroMode,
      setAeroMode,
      headlightsOn,
      setHeadlightsOn,
      doorsOpen,
      setDoorsOpen,
      explodedProgress,
      setExplodedProgress,
      isCustomizing,
      setIsCustomizing,
      activeTechPart,
      setActiveTechPart,
      isReservationOpen,
      setIsReservationOpen,
    }),
    [
      selectedColor,
      selectedWheel,
      selectedCaliper,
      selectedInterior,
      aeroMode,
      headlightsOn,
      doorsOpen,
      explodedProgress,
      isCustomizing,
      activeTechPart,
      isReservationOpen
    ]
  );

  return (
    <ConfiguratorContext.Provider value={value}>
      {children}
    </ConfiguratorContext.Provider>
  );
}

export function useConfigurator() {
  const context = useContext(ConfiguratorContext);
  if (!context) {
    throw new Error('useConfigurator must be used within a ConfiguratorProvider');
  }
  return context;
}
