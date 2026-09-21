'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useConfigurator } from '@/context/ConfiguratorContext';
import { useScrollState } from '@/context/ScrollStateContext';

interface VerseVehicleProps {
  exploded?: number;
  isMobile?: boolean;
}

export function VerseVehicle({ exploded: overrideExploded, isMobile = false }: VerseVehicleProps) {

  const groupRef = useRef<THREE.Group>(null);
  const frontWheelsRef = useRef<THREE.Group>(null);
  const rearWheelsRef = useRef<THREE.Group>(null);
  const leftFrontWheelRef = useRef<THREE.Group>(null);
  const rightFrontWheelRef = useRef<THREE.Group>(null);
  const activeWingRef = useRef<THREE.Group>(null);
  const chassisRef = useRef<THREE.Group>(null);
  const batteryRef = useRef<THREE.Group>(null);
  const frontMotorRef = useRef<THREE.Group>(null);
  const rearMotorRef = useRef<THREE.Group>(null);

  const {
    selectedColor,
    selectedWheel,
    selectedCaliper,
    selectedInterior,
    headlightsOn,
    explodedProgress,
    aeroMode
  } = useConfigurator();

  const { activeSection } = useScrollState();

  // Effective exploded value
  const isTechSection = activeSection === 'technology';
  const targetExploded = overrideExploded !== undefined
    ? overrideExploded
    : (isTechSection ? 1 : explodedProgress);

  const currentExploded = useRef(0);

  // High-Gloss Luxury Metallic Car Paint Material
  const bodyMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(selectedColor.hex),
      metalness: selectedColor.metalness,
      roughness: selectedColor.roughness,
      clearcoat: selectedColor.clearcoat,
      clearcoatRoughness: selectedColor.clearcoatRoughness,
      reflectivity: 1.0,
      envMapIntensity: 2.2,
      specularColor: new THREE.Color('#ffffff'),
    });
  }, [selectedColor]);

  // Carbon Fiber Material
  const carbonMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#121316'),
      roughness: 0.35,
      metalness: 0.8,
      envMapIntensity: 1.2,
    });
  }, []);

  // Smoked Tinted Glass
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0a0d12'),
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.7,
      thickness: 0.5,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9,
      envMapIntensity: 2.5,
    });
  }, []);

  // Light materials
  const headlightBeamMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: headlightsOn ? new THREE.Color('#e0f2fe') : new THREE.Color('#334155'),
    });
  }, [headlightsOn]);

  const taillightBeamMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ff0033'),
    });
  }, []);

  // Wheel Alloy Material
  const wheelAlloyMaterial = useMemo(() => {
    const isStealth = selectedWheel.id === 'monoblock';
    return new THREE.MeshStandardMaterial({
      color: isStealth ? new THREE.Color('#1e2229') : new THREE.Color('#d1d5db'),
      metalness: 0.95,
      roughness: isStealth ? 0.4 : 0.15,
      envMapIntensity: 2.0,
    });
  }, [selectedWheel]);

  // Brake Caliper Material
  const caliperMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedCaliper.hex),
      metalness: 0.7,
      roughness: 0.25,
      envMapIntensity: 1.8,
    });
  }, [selectedCaliper]);

  // Interior Material
  const interiorMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedInterior.hexAccent),
      roughness: 0.6,
      metalness: 0.2,
    });
  }, [selectedInterior]);

  // Procedural Wheel Spokes Geometry
  const spokeGeometries = useMemo(() => {
    const count = selectedWheel.id === 'forged-turbine' ? 10 : (selectedWheel.id === 'aero-blade' ? 5 : 7);
    const angles = Array.from({ length: count }, (_, i) => (i * 2 * Math.PI) / count);
    return angles;
  }, [selectedWheel]);

  useFrame((state, delta) => {
    // Smoothly interpolate exploded transformation
    currentExploded.current = THREE.MathUtils.lerp(
      currentExploded.current,
      targetExploded,
      delta * 4.0
    );
    const exp = currentExploded.current;

    // Explode transforms
    if (chassisRef.current) {
      chassisRef.current.position.y = exp * 0.45;
    }
    if (batteryRef.current) {
      batteryRef.current.position.y = -exp * 0.4;
    }
    if (frontMotorRef.current) {
      frontMotorRef.current.position.z = 1.45 + exp * 0.55;
    }
    if (rearMotorRef.current) {
      rearMotorRef.current.position.z = -1.45 - exp * 0.55;
    }
    if (activeWingRef.current) {
      const aeroLift = aeroMode.id === 'PERFORMANCE' ? 0.15 : (aeroMode.id === 'TOURING' ? 0.05 : 0);
      activeWingRef.current.position.y = 0.75 + exp * 0.6 + aeroLift;
      activeWingRef.current.rotation.x = aeroMode.id === 'PERFORMANCE' ? -0.18 : -0.05;
    }

    // Wheel rotation and explosion outwards
    const wheelExplodeX = exp * 0.4;
    if (frontWheelsRef.current && rearWheelsRef.current) {
      // Rotate wheels smoothly when scrolling or in aero mode
      const speed = aeroMode.particleSpeed * 1.5;
      const rotDelta = delta * speed * (activeSection === 'aerodynamics' || activeSection === 'performance' ? 8 : 0.8);
      
      frontWheelsRef.current.children.forEach(child => {
        child.rotation.x += rotDelta;
      });
      rearWheelsRef.current.children.forEach(child => {
        child.rotation.x += rotDelta;
      });
    }

    if (leftFrontWheelRef.current && rightFrontWheelRef.current) {
      leftFrontWheelRef.current.position.x = -1.02 - wheelExplodeX;
      rightFrontWheelRef.current.position.x = 1.02 + wheelExplodeX;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} dispose={null}>
      {/* ========================================================
          CHASSIS & UPPER BODYWORK (Sculpted Luxury Performance Silhouette)
          ======================================================== */}
      <group ref={chassisRef}>
        {/* Main Sleek Lower Body Shell */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow material={bodyMaterial}>
          <boxGeometry args={[1.92, 0.35, 4.5]} />
        </mesh>

        {/* Aerodynamic Front Hood Slope */}
        <mesh position={[0, 0.48, 1.45]} rotation={[-0.14, 0, 0]} castShadow receiveShadow material={bodyMaterial}>
          <boxGeometry args={[1.86, 0.22, 1.6]} />
        </mesh>

        {/* Front Nose Cone / Minimal Fascia */}
        <mesh position={[0, 0.32, 2.22]} castShadow receiveShadow material={bodyMaterial}>
          <boxGeometry args={[1.8, 0.28, 0.25]} />
        </mesh>

        {/* Front Aero Splitter (Carbon Fiber) */}
        <mesh position={[0, 0.14, 2.26]} castShadow material={carbonMaterial}>
          <boxGeometry args={[1.96, 0.05, 0.35]} />
        </mesh>

        {/* Front Hood Aero Extraction Channel */}
        <mesh position={[0, 0.58, 1.1]} rotation={[0.08, 0, 0]} material={carbonMaterial}>
          <boxGeometry args={[0.8, 0.04, 0.6]} />
        </mesh>

        {/* Cabin Glass Canopy (Continuous Teardrop Fastback) */}
        <mesh position={[0, 0.82, -0.15]} castShadow material={glassMaterial}>
          <boxGeometry args={[1.44, 0.52, 2.3]} />
        </mesh>

        {/* Roof Structure / Carbon A-B-C Pillars */}
        <mesh position={[0, 1.07, -0.2]} castShadow material={carbonMaterial}>
          <boxGeometry args={[1.38, 0.04, 1.9]} />
        </mesh>

        {/* Muscular Rear Haunches / Widebody Fenders */}
        <mesh position={[-0.92, 0.46, -1.2]} castShadow receiveShadow material={bodyMaterial}>
          <boxGeometry args={[0.26, 0.42, 1.8]} />
        </mesh>
        <mesh position={[0.92, 0.46, -1.2]} castShadow receiveShadow material={bodyMaterial}>
          <boxGeometry args={[0.26, 0.42, 1.8]} />
        </mesh>

        {/* Front Sculpted Wheel Arches */}
        <mesh position={[-0.92, 0.45, 1.3]} castShadow receiveShadow material={bodyMaterial}>
          <boxGeometry args={[0.24, 0.4, 1.3]} />
        </mesh>
        <mesh position={[0.92, 0.45, 1.3]} castShadow receiveShadow material={bodyMaterial}>
          <boxGeometry args={[0.24, 0.4, 1.3]} />
        </mesh>

        {/* Side Aerodynamic Skirts (Carbon) */}
        <mesh position={[-0.96, 0.18, 0]} castShadow material={carbonMaterial}>
          <boxGeometry args={[0.1, 0.1, 2.4]} />
        </mesh>
        <mesh position={[0.96, 0.18, 0]} castShadow material={carbonMaterial}>
          <boxGeometry args={[0.1, 0.1, 2.4]} />
        </mesh>

        {/* Side Digital Wing Mirrors (Aerodynamic Blades) */}
        <mesh position={[-0.88, 0.72, 0.7]} rotation={[0, 0.2, 0]} castShadow material={carbonMaterial}>
          <boxGeometry args={[0.28, 0.04, 0.12]} />
        </mesh>
        <mesh position={[0.88, 0.72, 0.7]} rotation={[0, -0.2, 0]} castShadow material={carbonMaterial}>
          <boxGeometry args={[0.28, 0.04, 0.12]} />
        </mesh>

        {/* Rear Fastback Deck & Kamm Tail */}
        <mesh position={[0, 0.65, -1.55]} rotation={[0.22, 0, 0]} castShadow receiveShadow material={bodyMaterial}>
          <boxGeometry args={[1.68, 0.25, 1.3]} />
        </mesh>

        {/* Rear Massive Carbon Ground-Effect Diffuser */}
        <mesh position={[0, 0.2, -2.18]} rotation={[-0.15, 0, 0]} castShadow material={carbonMaterial}>
          <boxGeometry args={[1.88, 0.24, 0.45]} />
        </mesh>
        {/* Diffuser Vertical Strakes */}
        {[-0.6, -0.2, 0.2, 0.6].map((xPos, idx) => (
          <mesh key={idx} position={[xPos, 0.18, -2.2]} material={carbonMaterial}>
            <boxGeometry args={[0.03, 0.16, 0.4]} />
          </mesh>
        ))}

        {/* ========================================================
            PRECISION LIGHTING (Front Photonic Matrix & Rear Blade)
            ======================================================== */}
        {/* Front Razor-Thin Continuous Lightbar */}
        <mesh position={[0, 0.43, 2.34]} material={headlightBeamMaterial}>
          <boxGeometry args={[1.72, 0.03, 0.04]} />
        </mesh>
        {/* Front Twin Projector Matrix Clusters */}
        <mesh position={[-0.7, 0.42, 2.33]} material={headlightBeamMaterial}>
          <boxGeometry args={[0.25, 0.06, 0.05]} />
        </mesh>
        <mesh position={[0.7, 0.42, 2.33]} material={headlightBeamMaterial}>
          <boxGeometry args={[0.25, 0.06, 0.05]} />
        </mesh>

        {/* Headlight Cast Light Sources */}
        {headlightsOn && (
          <>
            <spotLight
              position={[-0.7, 0.5, 2.4]}
              target-position={[-0.8, 0, 10]}
              intensity={4.5}
              angle={0.6}
              penumbra={0.5}
              color="#e0f2fe"
              castShadow
            />
            <spotLight
              position={[0.7, 0.5, 2.4]}
              target-position={[0.8, 0, 10]}
              intensity={4.5}
              angle={0.6}
              penumbra={0.5}
              color="#e0f2fe"
              castShadow
            />
          </>
        )}

        {/* Rear Continuous Photonic Light Blade */}
        <mesh position={[0, 0.64, -2.25]} material={taillightBeamMaterial}>
          <boxGeometry args={[1.82, 0.03, 0.04]} />
        </mesh>
        {/* Illuminated Rear VÉRSE Monolith Logo */}
        <mesh position={[0, 0.56, -2.25]}>
          <boxGeometry args={[0.28, 0.03, 0.02]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* ========================================================
            COCKPIT INTERIOR (Architectural Minimalist Cabin)
            ======================================================== */}
        {/* Interior Dashboard & Floating Curved Display */}
        <mesh position={[0, 0.68, 0.35]} material={carbonMaterial}>
          <boxGeometry args={[1.2, 0.15, 0.35]} />
        </mesh>
        {/* Wide Panoramic Curved Glass Display */}
        <mesh position={[0, 0.77, 0.32]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[0.9, 0.12, 0.02]} />
          <meshBasicMaterial color="#00e5ff" />
        </mesh>

        {/* Steering Yoke */}
        <group position={[-0.32, 0.68, 0.18]} rotation={[-0.2, 0, 0]}>
          <mesh material={carbonMaterial}>
            <torusGeometry args={[0.12, 0.02, 8, 24, Math.PI * 1.4]} />
          </mesh>
          <mesh position={[0, 0, -0.01]} material={caliperMaterial}>
            <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
          </mesh>
        </group>

        {/* Sculpted Sports Bucket Seats */}
        <group position={[-0.32, 0.5, -0.2]}>
          <mesh castShadow material={interiorMaterial}>
            <boxGeometry args={[0.42, 0.45, 0.45]} />
          </mesh>
          <mesh position={[0, 0.3, -0.15]} rotation={[-0.1, 0, 0]} castShadow material={interiorMaterial}>
            <boxGeometry args={[0.38, 0.48, 0.12]} />
          </mesh>
        </group>
        <group position={[0.32, 0.5, -0.2]}>
          <mesh castShadow material={interiorMaterial}>
            <boxGeometry args={[0.42, 0.45, 0.45]} />
          </mesh>
          <mesh position={[0, 0.3, -0.15]} rotation={[-0.1, 0, 0]} castShadow material={interiorMaterial}>
            <boxGeometry args={[0.38, 0.48, 0.12]} />
          </mesh>
        </group>

        {/* Center Floating Console with Tactile Dials */}
        <mesh position={[0, 0.52, -0.05]} material={carbonMaterial}>
          <boxGeometry args={[0.18, 0.22, 0.9]} />
        </mesh>
        <mesh position={[0, 0.64, -0.05]}>
          <boxGeometry args={[0.08, 0.01, 0.5]} />
          <meshBasicMaterial color={selectedColor.hex} />
        </mesh>
      </group>

      {/* ========================================================
          ACTIVE DUAL-PLANE REAR CARBON AERO WING
          ======================================================== */}
      <group ref={activeWingRef} position={[0, 0.75, -2.0]}>
        {/* Main Wing Aerofoil Plane */}
        <mesh castShadow material={carbonMaterial}>
          <boxGeometry args={[1.78, 0.035, 0.38]} />
        </mesh>
        {/* Wing Endplates */}
        <mesh position={[-0.9, 0.03, 0]} castShadow material={carbonMaterial}>
          <boxGeometry args={[0.02, 0.14, 0.42]} />
        </mesh>
        <mesh position={[0.9, 0.03, 0]} castShadow material={carbonMaterial}>
          <boxGeometry args={[0.02, 0.14, 0.42]} />
        </mesh>
        {/* Wing Structural Hydraulic Mount Struts */}
        <mesh position={[-0.45, -0.18, -0.02]} rotation={[0.15, 0, 0]} material={wheelAlloyMaterial}>
          <cylinderGeometry args={[0.015, 0.015, 0.36, 12]} />
        </mesh>
        <mesh position={[0.45, -0.18, -0.02]} rotation={[0.15, 0, 0]} material={wheelAlloyMaterial}>
          <cylinderGeometry args={[0.015, 0.015, 0.36, 12]} />
        </mesh>
      </group>

      {/* ========================================================
          800V STRUCTURAL SOLID-CORE BATTERY TRAY (Exploded View)
          ======================================================== */}
      <group ref={batteryRef} position={[0, 0.12, 0]}>
        {/* Solid Matrix Enclosure */}
        <mesh castShadow material={carbonMaterial}>
          <boxGeometry args={[1.55, 0.12, 2.7]} />
        </mesh>
        {/* High-Voltage Busbars and Cell Glow Modules */}
        {[-0.5, 0, 0.5].map((xOffset, idx) => (
          <mesh key={idx} position={[xOffset, 0.07, 0]}>
            <boxGeometry args={[0.36, 0.03, 2.4]} />
            <meshBasicMaterial color="#00e5ff" />
          </mesh>
        ))}
      </group>

      {/* ========================================================
          DUAL ELECTRIC MOTORS & INVERTERS (Exploded View)
          ======================================================== */}
      {/* Front Synchronous Motor */}
      <group ref={frontMotorRef} position={[0, 0.32, 1.45]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={wheelAlloyMaterial}>
          <cylinderGeometry args={[0.18, 0.18, 0.6, 24]} />
        </mesh>
        {/* Copper Hairpin Coil Ring */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.16, 0.03, 8, 24]} />
          <meshBasicMaterial color="#ff9800" />
        </mesh>
      </group>

      {/* Rear High-Output Performance Motor */}
      <group ref={rearMotorRef} position={[0, 0.32, -1.45]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={wheelAlloyMaterial}>
          <cylinderGeometry args={[0.22, 0.22, 0.72, 24]} />
        </mesh>
        {/* Silicon Carbide Inverter Box */}
        <mesh position={[0, 0.22, 0]} material={carbonMaterial}>
          <boxGeometry args={[0.5, 0.14, 0.4]} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.2, 0.035, 8, 24]} />
          <meshBasicMaterial color="#ff3366" />
        </mesh>
      </group>

      {/* ========================================================
          HIGH-PRECISION WHEELS, TIRES, BRAKE ROTORS & CALIPERS
          ======================================================== */}
      {/* Front Axle Wheels */}
      <group ref={frontWheelsRef}>
        {/* Left Front */}
        <group ref={leftFrontWheelRef} position={[-1.02, 0.38, 1.45]}>
          <WheelMesh
            spokes={spokeGeometries}
            wheelMaterial={wheelAlloyMaterial}
            caliperMaterial={caliperMaterial}
            carbonMaterial={carbonMaterial}
            isLeft={true}
          />
        </group>
        {/* Right Front */}
        <group ref={rightFrontWheelRef} position={[1.02, 0.38, 1.45]} rotation={[0, Math.PI, 0]}>
          <WheelMesh
            spokes={spokeGeometries}
            wheelMaterial={wheelAlloyMaterial}
            caliperMaterial={caliperMaterial}
            carbonMaterial={carbonMaterial}
            isLeft={false}
          />
        </group>
      </group>

      {/* Rear Axle Wheels */}
      <group ref={rearWheelsRef}>
        {/* Left Rear */}
        <group position={[-1.04, 0.4, -1.45]}>
          <WheelMesh
            spokes={spokeGeometries}
            wheelMaterial={wheelAlloyMaterial}
            caliperMaterial={caliperMaterial}
            carbonMaterial={carbonMaterial}
            isLeft={true}
            isRear={true}
          />
        </group>
        {/* Right Rear */}
        <group position={[1.04, 0.4, -1.45]} rotation={[0, Math.PI, 0]}>
          <WheelMesh
            spokes={spokeGeometries}
            wheelMaterial={wheelAlloyMaterial}
            caliperMaterial={caliperMaterial}
            carbonMaterial={carbonMaterial}
            isLeft={false}
            isRear={true}
          />
        </group>
      </group>
    </group>
  );
}

// Single Complete Wheel Assembly
interface WheelMeshProps {
  spokes: number[];
  wheelMaterial: THREE.Material;
  caliperMaterial: THREE.Material;
  carbonMaterial: THREE.Material;
  isLeft: boolean;
  isRear?: boolean;
}

function WheelMesh({
  spokes,
  wheelMaterial,
  caliperMaterial,
  carbonMaterial,
  isRear
}: WheelMeshProps) {
  const tireRadius = isRear ? 0.41 : 0.39;
  const tireWidth = isRear ? 0.32 : 0.28;

  return (
    <group>
      {/* High-Performance Low Profile Tire */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[tireRadius, tireRadius, tireWidth, 32]} />
        <meshStandardMaterial color="#0c0d0f" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Wheel Rim Barrel */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[tireRadius * 0.72, tireRadius * 0.72, tireWidth * 0.95, 32]} />
        <primitive object={wheelMaterial} />
      </mesh>

      {/* Center Wheel Hub */}
      <mesh position={[-tireWidth * 0.42, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.08, 24]} />
        <primitive object={wheelMaterial} />
      </mesh>

      {/* Dynamic Wheel Spokes */}
      {spokes.map((angle, idx) => (
        <group key={idx} rotation={[angle, 0, 0]} position={[-tireWidth * 0.38, 0, 0]}>
          <mesh position={[0, tireRadius * 0.32, 0]} rotation={[0, 0, 0.08]}>
            <boxGeometry args={[0.025, tireRadius * 0.65, 0.04]} />
            <primitive object={wheelMaterial} />
          </mesh>
        </group>
      ))}

      {/* Carbon-Ceramic Drilled Brake Rotor Disc */}
      <mesh position={[-tireWidth * 0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[tireRadius * 0.62, tireRadius * 0.62, 0.02, 32]} />
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* High-Performance Monoblock Brake Caliper */}
      <mesh position={[-tireWidth * 0.15, tireRadius * 0.42, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.09, 0.16, 0.14]} />
        <primitive object={caliperMaterial} />
      </mesh>
    </group>
  );
}
