'use client';

import dynamic from 'next/dynamic';
import { ScrollOrchestrator } from '@/components/ScrollOrchestrator';
import { HeroSection } from '@/components/sections/01-Hero';
import { DesignSection } from '@/components/sections/02-Design';
import { PerformanceSection } from '@/components/sections/03-Performance';
import { TechnologySection } from '@/components/sections/04-Technology';
import { InteriorSection } from '@/components/sections/05-Interior';
import { AerodynamicsSection } from '@/components/sections/06-Aerodynamics';
import { RangeSection } from '@/components/sections/07-Range';
import { ConfiguratorSection } from '@/components/sections/08-Configurator';
import { ExperienceSection } from '@/components/sections/09-Experience';
import { FinalCTASection } from '@/components/sections/10-FinalCTA';

// Dynamically import Three.js scene container to ensure clean client-side WebGL hydration
const SceneContainer = dynamic(
  () => import('@/components/3d/SceneContainer').then((mod) => mod.SceneContainer),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#050608] text-white">
      {/* Fixed 3D WebGL Vehicle Canvas */}
      <SceneContainer />

      {/* Interactive Scroll-Driven Cinematic Sections */}
      <ScrollOrchestrator>
        <HeroSection />
        <DesignSection />
        <PerformanceSection />
        <TechnologySection />
        <InteriorSection />
        <AerodynamicsSection />
        <RangeSection />
        <ConfiguratorSection />
        <ExperienceSection />
        <FinalCTASection />
      </ScrollOrchestrator>
    </div>
  );
}
