'use client';

import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { VerseVehicle } from './VerseVehicle';
import { StudioEnvironment } from './StudioEnvironment';
import { WindTunnel } from './WindTunnel';
import { CameraChoreography } from './CameraChoreography';
import { OrbitControls, AdaptiveDpr } from '@react-three/drei';
import { useScrollState } from '@/context/ScrollStateContext';

export function SceneContainer() {
  const { activeSection } = useScrollState();
  const allowOrbit = activeSection === 'configurator';
  const [isTabActive, setIsTabActive] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // Detect mobile device for adaptive rendering
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });

    // Handle tab visibility to stop GPU draw calls when tab is unfocused
    const handleVisibilityChange = () => {
      setIsTabActive(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleCreated = useCallback((state: { gl: import('three').WebGLRenderer }) => {
    // Enable power-efficient pixel ratio and handle context loss gracefully
    state.gl.domElement.addEventListener(
      'webglcontextlost',
      (event) => {
        event.preventDefault();
        console.warn('VÉRSE WebGL context lost. Attempting recovery...');
      },
      false
    );
  }, []);

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#050608] flex items-center justify-center">
        <div className="text-center p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md max-w-md">
          <div className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2">HARDWARE ACCELERATION</div>
          <h3 className="text-white text-xl font-light mb-2">VÉRSE GT-1 Cinematic Engine</h3>
          <p className="text-white/50 text-xs font-mono">Enable WebGL in your browser to experience real-time 3D vehicle physics and aerodynamics.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#050608]">
      <Canvas
        shadows={!isMobile}
        frameloop={isTabActive ? 'always' : 'never'}
        dpr={isMobile ? [1, 1.3] : [1, 1.8]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{
          position: [3.8, 1.4, 4.2],
          fov: 38,
          near: 0.1,
          far: 40,
        }}
        onCreated={handleCreated}
        style={{
          pointerEvents: allowOrbit ? 'auto' : 'none',
        }}
      >
        <color attach="background" args={['#050608']} />
        <fog attach="fog" args={['#050608', 8, 24]} />
        <AdaptiveDpr pixelated={false} />

        <Suspense fallback={null}>
          <StudioEnvironment isMobile={isMobile} />
          <VerseVehicle isMobile={isMobile} />
          <WindTunnel isMobile={isMobile} />
          <CameraChoreography />

          {allowOrbit && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.05}
              minDistance={3.2}
              maxDistance={5.8}
              dampingFactor={0.05}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

