'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { useScrollState } from '@/context/ScrollStateContext';

interface WindTunnelProps {
  isMobile?: boolean;
}

export function WindTunnel({ isMobile = false }: WindTunnelProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { aeroMode } = useConfigurator();
  const { activeSection } = useScrollState();

  const isAeroActive = activeSection === 'aerodynamics' || activeSection === 'performance';
  const particleCount = isMobile ? Math.min(400, Math.floor(aeroMode.particleDensity * 0.55)) : aeroMode.particleDensity;

  // Generate aerodynamic stream path points that flow naturally around vehicle contours
  const [streamData] = useMemo(() => {
    const total = isMobile ? 450 : 900;
    const origins = new Float32Array(total * 3);
    const positions = new Float32Array(total * 3);
    const velocities = new Float32Array(total);
    const linePositions = new Float32Array(total * 6); // 2 points per line segment

    for (let i = 0; i < total; i++) {
      // Streamline distribution across frontal projection area
      const x = (Math.random() - 0.5) * 2.6;
      const y = 0.15 + Math.random() * 1.5;
      const z = 4.5 + Math.random() * 2.0;

      origins[i * 3] = x;
      origins[i * 3 + 1] = y;
      origins[i * 3 + 2] = z;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities[i] = 0.8 + Math.random() * 0.4;
    }

    return [{ origins, positions, velocities, linePositions }];
  }, [isMobile]);


  const pointMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: new THREE.Color(aeroMode.color),
      size: 0.04,
      transparent: true,
      opacity: isAeroActive ? 0.85 : 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [aeroMode.color, isAeroActive]);

  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(aeroMode.color),
      transparent: true,
      opacity: isAeroActive ? 0.45 : 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [aeroMode.color, isAeroActive]);

  useFrame((_, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const linePosAttr = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;

    const baseSpeed = aeroMode.particleSpeed * (isAeroActive ? 7.5 : 2.5);
    const total = particleCount;

    for (let i = 0; i < total; i++) {
      const idx = i * 3;
      let x = posAttr.array[idx];
      let y = posAttr.array[idx + 1];
      let z = posAttr.array[idx + 2];

      const prevX = x;
      const prevY = y;
      const prevZ = z;

      // Move particle backwards along airflow direction
      z -= streamData.velocities[i] * baseSpeed * delta;

      // Aerodynamic diversion geometry over vehicle shape
      // Front hood slope (z between 2.2 and 0.8)
      if (z < 2.3 && z > 0.6 && Math.abs(x) < 1.0) {
        y = THREE.MathUtils.lerp(y, 0.55 + (2.3 - z) * 0.35, delta * 8.0);
      }
      // Cabin roofline (z between 0.6 and -1.4)
      if (z <= 0.6 && z > -1.4 && Math.abs(x) < 0.85) {
        y = THREE.MathUtils.lerp(y, 1.15 - Math.abs(z + 0.4) * 0.25, delta * 8.0);
      }
      // Rear active wing downwash (z between -1.4 and -2.4)
      if (z <= -1.4 && z > -2.4) {
        if (aeroMode.id === 'PERFORMANCE') {
          // Downforce vortex deflection
          y = THREE.MathUtils.lerp(y, 0.85 - (z + 1.4) * 0.4, delta * 6.0);
        } else {
          y = THREE.MathUtils.lerp(y, 0.7 - (z + 1.4) * 0.15, delta * 4.0);
        }
      }
      // Outward side curtain diversion around widebody haunches
      if (z < 2.0 && z > -2.0 && Math.abs(x) > 0.85 && Math.abs(x) < 1.3) {
        x += (x > 0 ? 1 : -1) * delta * 0.4;
      }

      // Reset when flowing past the back of the car
      if (z < -4.5) {
        x = streamData.origins[idx];
        y = streamData.origins[idx + 1];
        z = streamData.origins[idx + 2];
      }

      posAttr.array[idx] = x;
      posAttr.array[idx + 1] = y;
      posAttr.array[idx + 2] = z;

      // Update streamline tail segment
      const lineIdx = i * 6;
      linePosAttr.array[lineIdx] = prevX;
      linePosAttr.array[lineIdx + 1] = prevY;
      linePosAttr.array[lineIdx + 2] = prevZ;
      linePosAttr.array[lineIdx + 3] = x;
      linePosAttr.array[lineIdx + 4] = y;
      linePosAttr.array[lineIdx + 5] = z;
    }

    posAttr.needsUpdate = true;
    linePosAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* Particle leading heads */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[streamData.positions, 3]}
          />
        </bufferGeometry>
        <primitive object={pointMaterial} />
      </points>

      {/* Streamline tail ribbons */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[streamData.linePositions, 3]}
          />
        </bufferGeometry>
        <primitive object={lineMaterial} />
      </lineSegments>
    </group>
  );
}
