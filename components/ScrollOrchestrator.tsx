'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useScrollState, SectionId } from '@/context/ScrollStateContext';

const SECTIONS: SectionId[] = [
  'hero',
  'design',
  'performance',
  'technology',
  'interior',
  'aerodynamics',
  'range',
  'configurator',
  'experience',
  'cta'
];

interface SectionBounds {
  id: SectionId;
  top: number;
  height: number;
}

export function ScrollOrchestrator({ children }: { children: React.ReactNode }) {
  const { setActiveSection, setScrollProgress, setSectionProgress } = useScrollState();

  const setActiveSectionRef = useRef(setActiveSection);
  const setScrollProgressRef = useRef(setScrollProgress);
  const setSectionProgressRef = useRef(setSectionProgress);
  const sectionBoundsRef = useRef<SectionBounds[]>([]);

  useEffect(() => {
    setActiveSectionRef.current = setActiveSection;
    setScrollProgressRef.current = setScrollProgress;
    setSectionProgressRef.current = setSectionProgress;
  });

  useEffect(() => {
    // Measure and cache section offsets to prevent layout thrashing on scroll
    const updateBounds = () => {
      const bounds: SectionBounds[] = [];
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          bounds.push({
            id,
            top: el.offsetTop,
            height: el.offsetHeight,
          });
        }
      });
      sectionBoundsRef.current = bounds;
    };

    updateBounds();
    window.addEventListener('resize', updateBounds, { passive: true });

    // Single unified Lenis instance with RAF loop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let animationFrameId: number;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Fast zero-layout-thrashing scroll handler
    const handleScroll = (e: { scroll: number; progress: number }) => {
      setScrollProgressRef.current(e.progress);

      const bounds = sectionBoundsRef.current;
      if (bounds.length === 0) return;

      const viewportOffset = window.innerHeight * 0.4;
      const scrollPos = e.scroll + viewportOffset;

      for (let i = bounds.length - 1; i >= 0; i--) {
        const { id, top, height } = bounds[i];
        if (scrollPos >= top) {
          setActiveSectionRef.current(id);
          const secProg = Math.min(1, Math.max(0, (scrollPos - top) / height));
          setSectionProgressRef.current(secProg);
          break;
        }
      }
    };

    lenis.on('scroll', handleScroll);

    const initialTimer = setTimeout(() => {
      updateBounds();
      handleScroll({ scroll: window.scrollY, progress: 0 });
    }, 120);

    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('resize', updateBounds);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return <div className="relative w-full">{children}</div>;
}

