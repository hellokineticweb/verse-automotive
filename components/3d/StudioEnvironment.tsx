'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ContactShadows } from '@react-three/drei';
import { useScrollState } from '@/context/ScrollStateContext';

interface StudioEnvironmentProps {
  isMobile?: boolean;
}

export function StudioEnvironment({ isMobile = false }: StudioEnvironmentProps) {
  const dustRef = useRef<THREE.Points>(null);
  const { activeSection } = useScrollState();

  // Atmospheric micro dust particles for depth and volumetric feeling
  const [dustPositions] = useMemo(() => {
    const count = isMobile ? 120 : 320;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return [pos];
  }, [isMobile]);

  useFrame((_, delta) => {
    if (!dustRef.current) return;
    const pos = dustRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      let y = pos.getY(i) - delta * 0.08;
      if (y < 0.05) y = 4.8;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    dustRef.current.rotation.y += delta * 0.01;
  });

  const isDarkCta = activeSection === 'cta';

  return (
    <group>
      {/* Ambient Lighting & Atmosphere */}
      <ambientLight intensity={isDarkCta ? 0.2 : 0.65} color="#e2e8f0" />

      {/* Main Studio Overhead Softbox Lights */}
      <directionalLight
        position={[4, 8, 3]}
        intensity={isDarkCta ? 0.4 : 2.2}
        color="#f8fafc"
        castShadow={!isMobile}
        shadow-mapSize-width={isMobile ? 512 : 1024}
        shadow-mapSize-height={isMobile ? 512 : 1024}
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-4, 7, -3]}
        intensity={isDarkCta ? 0.2 : 1.4}
        color="#cbd5e1"
      />

      {/* Dramatic Rim Lighting (Contour edge highlights) */}
      <spotLight
        position={[-6, 2.5, -4]}
        target-position={[0, 0.4, 0]}
        intensity={3.8}
        angle={0.5}
        penumbra={0.8}
        color="#93c5fd"
      />
      <spotLight
        position={[6, 2.5, 4]}
        target-position={[0, 0.4, 0]}
        intensity={3.2}
        angle={0.5}
        penumbra={0.8}
        color="#ffffff"
      />

      {/* Studio Softbox Rectangular Glow Panel Mesh */}
      <mesh position={[0, 5.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 10]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>

      {/* High-Fidelity Reflective Ground Floor */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={!isMobile}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#060709"
          roughness={0.12}
          metalness={0.88}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Soft Contact Ground Shadows beneath Vehicle */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.85}
        scale={8}
        blur={1.8}
        far={2.5}
        resolution={isMobile ? 256 : 512}
        color="#000000"
      />

      {/* Subtle Studio Floor Grid Lines */}
      <gridHelper
        args={[40, 40, '#1f242d', '#0e1117']}
        position={[0, 0.001, 0]}
      />

      {/* Atmospheric Dust Motes */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[dustPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#94a3b8"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

