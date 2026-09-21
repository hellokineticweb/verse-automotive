'use client';

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from 'react';

export type SectionId =
  | 'hero'
  | 'design'
  | 'performance'
  | 'technology'
  | 'interior'
  | 'aerodynamics'
  | 'range'
  | 'configurator'
  | 'experience'
  | 'cta';

interface ScrollStateContextType {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  scrollProgress: number;
  setScrollProgress: (val: number) => void;
  sectionProgress: number;
  setSectionProgress: (val: number) => void;
}

const ScrollStateContext = createContext<ScrollStateContextType | undefined>(undefined);

export function ScrollStateProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<SectionId>('hero');
  const [scrollProgress, setScrollProgressState] = useState(0);
  const [sectionProgress, setSectionProgressState] = useState(0);

  const setActiveSection = useCallback((section: SectionId) => {
    setActiveSectionState((prev) => (prev === section ? prev : section));
  }, []);

  const setScrollProgress = useCallback((val: number) => {
    setScrollProgressState((prev) => {
      // Only trigger React state change when the integer percentage changes (max 100 updates over entire page)
      if (Math.round(prev * 100) !== Math.round(val * 100)) {
        return val;
      }
      return prev;
    });
  }, []);

  const setSectionProgress = useCallback((val: number) => {
    setSectionProgressState((prev) => {
      // Only trigger when progress changes by at least 2.5%
      if (Math.abs(prev - val) >= 0.025) {
        return val;
      }
      return prev;
    });
  }, []);


  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
      scrollProgress,
      setScrollProgress,
      sectionProgress,
      setSectionProgress,
    }),
    [activeSection, scrollProgress, sectionProgress, setActiveSection, setScrollProgress, setSectionProgress]
  );

  return (
    <ScrollStateContext.Provider value={value}>
      {children}
    </ScrollStateContext.Provider>
  );
}

export function useScrollState() {
  const context = useContext(ScrollStateContext);
  if (!context) {
    throw new Error('useScrollState must be used within a ScrollStateProvider');
  }
  return context;
}
