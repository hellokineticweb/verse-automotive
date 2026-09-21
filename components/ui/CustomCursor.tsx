'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const isHoveredRef = useRef(false);

  // High-performance Motion Values (Direct GPU transform updates with zero React re-renders)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.1 };
  const dotX = useSpring(rawX, { damping: 35, stiffness: 550, mass: 0.05 });
  const dotY = useSpring(rawY, { damping: 35, stiffness: 550, mass: 0.05 });

  const ringX = useSpring(rawX, springConfig);
  const ringY = useSpring(rawY, springConfig);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, [data-cursor]');
        if (interactive) {
          if (!isHoveredRef.current) {
            isHoveredRef.current = true;
            setIsHovered(true);
          }
          const customLabel = interactive.getAttribute('data-cursor');
          setCursorText(customLabel || '');
        } else {
          if (isHoveredRef.current) {
            isHoveredRef.current = false;
            setIsHovered(false);
            setCursorText('');
          }
        }
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, rawX, rawY]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          scale: isClicked ? 0.6 : isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Smooth Magnetic Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white/40 mix-blend-difference flex items-center justify-center pointer-events-none -ml-4 -mt-4"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          marginLeft: isHovered ? -28 : -16,
          marginTop: isHovered ? -28 : -16,
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.35)',
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {cursorText && (
          <span className="text-[9px] uppercase tracking-widest text-white font-mono font-medium select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}

