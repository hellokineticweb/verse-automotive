'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollState, SectionId } from '@/context/ScrollStateContext';
import { useConfigurator } from '@/context/ConfiguratorContext';

interface CameraTarget {
  pos: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

const SECTION_CAMERAS: Record<SectionId, CameraTarget> = {
  hero: {
    pos: [3.8, 1.4, 4.2],
    lookAt: [0, 0.45, 0],
    fov: 38,
  },
  design: {
    pos: [-4.2, 0.8, 2.1], // Low side profile showing sculpted body and stance
    lookAt: [0, 0.4, 0],
    fov: 34,
  },
  performance: {
    pos: [1.8, 0.5, 3.8], // Aggressive low front three-quarter
    lookAt: [0, 0.35, 0.5],
    fov: 42,
  },
  technology: {
    pos: [3.2, 3.2, 3.2], // Elevated technical axonometric view
    lookAt: [0, 0.2, 0],
    fov: 36,
  },
  interior: {
    pos: [-0.3, 0.85, 0.05], // Interior cockpit driver angle
    lookAt: [0, 0.72, 0.9],
    fov: 52,
  },
  aerodynamics: {
    pos: [-5.2, 1.1, 0.2], // Direct side view showing streamline flow
    lookAt: [0, 0.45, 0],
    fov: 32,
  },
  range: {
    pos: [3.8, 1.2, -3.2], // Rear 3/4 fastback angle
    lookAt: [0, 0.5, -0.5],
    fov: 36,
  },
  configurator: {
    pos: [3.6, 1.5, 3.6], // Dynamic 360 studio orbit angle
    lookAt: [0, 0.45, 0],
    fov: 38,
  },
  experience: {
    pos: [0, 0.6, 4.2], // Direct frontal luxury face
    lookAt: [0, 0.4, 0],
    fov: 40,
  },
  cta: {
    pos: [0, 1.8, 6.5], // Distant dramatic retreat into dark void
    lookAt: [0, 0.3, 0],
    fov: 32,
  },
};

export function CameraChoreography() {
  const { camera } = useThree();
  const { activeSection, sectionProgress } = useScrollState();
  const { isCustomizing, isReservationOpen } = useConfigurator();

  const targetPos = useRef(new THREE.Vector3(...SECTION_CAMERAS.hero.pos));
  const currentLookAt = useRef(new THREE.Vector3(...SECTION_CAMERAS.hero.lookAt));
  const targetLookAt = useRef(new THREE.Vector3(...SECTION_CAMERAS.hero.lookAt));
  const targetFov = useRef(SECTION_CAMERAS.hero.fov);
  const desiredPosRef = useRef(new THREE.Vector3());

  const initialCamSet = useRef(false);

  useEffect(() => {
    const config = SECTION_CAMERAS[activeSection] || SECTION_CAMERAS.hero;
    targetPos.current.set(...config.pos);
    targetLookAt.current.set(...config.lookAt);
    targetFov.current = config.fov;
  }, [activeSection]);

  useFrame((state, delta) => {
    // If modal is open or customizing in 3D studio, damp movements smoothly
    if (isReservationOpen) return;

    const config = SECTION_CAMERAS[activeSection] || SECTION_CAMERAS.hero;
    const lerpSpeed = isCustomizing ? 2.0 : 3.5;

    // Add subtle procedural cinematic breathing / float to camera
    const time = state.clock.getElapsedTime();
    const driftX = Math.sin(time * 0.4) * 0.08;
    const driftY = Math.cos(time * 0.3) * 0.04;

    let posX = config.pos[0] + driftX;
    let posY = config.pos[1] + driftY;
    let posZ = config.pos[2];

    // Dynamic scroll influence within section
    if (activeSection === 'hero') {
      posX += sectionProgress * 0.8;
      posZ += sectionProgress * -0.5;
    } else if (activeSection === 'performance') {
      posY -= sectionProgress * 0.15;
    }

    desiredPosRef.current.set(posX, posY, posZ);

    // Smooth camera position interpolation
    camera.position.lerp(desiredPosRef.current, delta * lerpSpeed);


    // Smooth camera lookAt interpolation
    currentLookAt.current.lerp(targetLookAt.current, delta * lerpSpeed);
    camera.lookAt(currentLookAt.current);

    // Smooth FOV transitions for perspective changes
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, delta * lerpSpeed);
      camera.updateProjectionMatrix();
    }

    if (!initialCamSet.current) {
      initialCamSet.current = true;
    }
  });

  return null;
}
