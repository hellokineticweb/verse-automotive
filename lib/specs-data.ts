export interface ColorOption {
  id: string;
  name: string;
  tagline: string;
  hex: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  description: string;
}

export interface WheelOption {
  id: string;
  name: string;
  size: string;
  material: string;
  weightSaved: string;
  description: string;
}

export interface CaliperOption {
  id: string;
  name: string;
  hex: string;
}

export interface InteriorOption {
  id: string;
  name: string;
  palette: string;
  materials: string[];
  hexAccent: string;
  description: string;
}

export interface AeroMode {
  id: 'CITY' | 'TOURING' | 'PERFORMANCE';
  name: string;
  cd: string;
  downforce: string;
  speedRating: string;
  suspension: string;
  particleSpeed: number;
  particleDensity: number;
  color: string;
  description: string;
}

export interface TechComponent {
  id: string;
  name: string;
  category: string;
  specs: string;
  metric: string;
  detail: string;
  x: number;
  y: number;
  z: number;
}

export const COLOR_OPTIONS: ColorOption[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Noir',
    tagline: 'Deep Starlight Metallic',
    hex: '#0a0b0e',
    roughness: 0.15,
    metalness: 0.95,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    description: 'Triple-layer deep metallic lacquer infused with ultra-fine midnight blue silica flakes.'
  },
  {
    id: 'silver',
    name: 'Liquid Quicksilver',
    tagline: 'Pure Machined Metal',
    hex: '#c2c7cc',
    roughness: 0.12,
    metalness: 0.98,
    clearcoat: 1.0,
    clearcoatRoughness: 0.04,
    description: 'Polished aluminium liquid vapor deposition with mirror reflection and fluid light refraction.'
  },
  {
    id: 'ivory',
    name: 'Glacier Ivory',
    tagline: 'Satin Ceramic Mineral',
    hex: '#eef1f5',
    roughness: 0.22,
    metalness: 0.85,
    clearcoat: 0.9,
    clearcoatRoughness: 0.08,
    description: 'Architectural ceramic pearlescent finish inspired by Nordic glacial ice and matte porcelain.'
  },
  {
    id: 'graphite',
    name: 'Stealth Graphite',
    tagline: 'Forged Carbon Tone',
    hex: '#23262b',
    roughness: 0.35,
    metalness: 0.75,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
    description: 'Sub-surface light-absorbing matte basalt finish with structural carbon weave undertones.'
  },
  {
    id: 'emerald',
    name: 'Nordic Emerald',
    tagline: 'Deep Sub-surface Teal',
    hex: '#0a231c',
    roughness: 0.18,
    metalness: 0.92,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    description: 'Bespoke deep spectrum green shifting to crystalline black in low-light environments.'
  },
  {
    id: 'copper',
    name: 'Solar Copper',
    tagline: 'Raw Ember Bronze',
    hex: '#5c2d1b',
    roughness: 0.2,
    metalness: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    description: 'Oxidized hot titanium and molten copper alloy with dramatic twilight luminance.'
  }
];

export const WHEEL_OPTIONS: WheelOption[] = [
  {
    id: 'aero-blade',
    name: '21" Aero Blade',
    size: '21-inch Monoblock',
    material: 'Forged Aerospace Alloy & Carbon Aero-Vanes',
    weightSaved: '-3.8 kg per corner',
    description: 'Low-drag directional aerodynamic turbine blades for high-speed thermodynamic heat extraction.'
  },
  {
    id: 'forged-turbine',
    name: '22" Forged Turbine',
    size: '22-inch Multi-Spoke',
    material: 'Full Dry Carbon Fiber Rim Barrel',
    weightSaved: '-5.2 kg per corner',
    description: 'Ultra-lightweight track-honed structural spokes designed for extreme lateral G-force loads.'
  },
  {
    id: 'monoblock',
    name: '20" Stealth Track',
    size: '20-inch Lightweight',
    material: 'Milled Billet Titanium-Magnesium Alloy',
    weightSaved: '-4.1 kg per corner',
    description: 'Minimalist industrial geometry with maximum caliper cooling and direct steering feedback.'
  }
];

export const CALIPER_OPTIONS: CaliperOption[] = [
  { id: 'amber', name: 'Electric Amber', hex: '#ff9800' },
  { id: 'lime', name: 'Acid Photonic', hex: '#bfff00' },
  { id: 'azure', name: 'Liquid Azure', hex: '#00e5ff' },
  { id: 'ceramic', name: 'Titanium Slate', hex: '#8a949e' }
];

export const INTERIOR_OPTIONS: InteriorOption[] = [
  {
    id: 'noir',
    name: 'Obsidian & Smoked Glass',
    palette: 'Deep Noir / Brushed Titanium',
    materials: ['Full-Grain Aniline Leather', 'Smoked Quartz Glass', 'Black Alcantara Headliner'],
    hexAccent: '#3a3f47',
    description: 'A sanctuary of deep tonal darkness, isolating external light and sharpening driver focus.'
  },
  {
    id: 'oyster',
    name: 'Oyster Suede & Satin Aluminium',
    palette: 'Off-White / Precision Metal',
    materials: ['Recycled Microfiber Vegan Suede', 'Satin Machined Alloy', 'OLED Ambient Weave'],
    hexAccent: '#e3e7ec',
    description: 'Luminous architectural serenity with warm tactile surfaces and floating console architecture.'
  },
  {
    id: 'carbon',
    name: 'Forged Carbon & Crimson Weave',
    palette: 'Raw Carbon / Flame Stitch',
    materials: ['Structural Forged Carbon', 'Nappa Leather', 'Contrast Anodized Dial Rings'],
    hexAccent: '#ff2a4b',
    description: 'Track-calibrated ergonomics with motorsport-derived composite shells and tactile feedback dials.'
  }
];

export const AERO_MODES: AeroMode[] = [
  {
    id: 'CITY',
    name: 'City Mode',
    cd: '0.22 Cd',
    downforce: '80 kg',
    speedRating: '0–80 km/h',
    suspension: '+15 mm Lift',
    particleSpeed: 1.2,
    particleDensity: 280,
    color: '#00e5ff',
    description: 'Closed cooling louvers, elevated ground clearance, and ultra-smooth urban aerodynamic glide.'
  },
  {
    id: 'TOURING',
    name: 'Touring GT',
    cd: '0.19 Cd',
    downforce: '180 kg',
    speedRating: '80–180 km/h',
    suspension: 'Standard Height',
    particleSpeed: 2.4,
    particleDensity: 480,
    color: '#9d4edd',
    description: 'Optimal laminar airflow envelope maximizing battery range and ultra-silent high-speed cruising.'
  },
  {
    id: 'PERFORMANCE',
    name: 'Track Horizon',
    cd: '0.18 Cd',
    downforce: '440 kg @ 250 km/h',
    speedRating: '200+ km/h',
    suspension: '-25 mm Track Stance',
    particleSpeed: 4.2,
    particleDensity: 750,
    color: '#ff3366',
    description: 'Active rear carbon wing deployed, underbody venturi tunnels energized, generating massive vacuum ground-effect.'
  }
];

export const TECH_COMPONENTS: TechComponent[] = [
  {
    id: 'battery',
    name: '800V Solid-Core Cell Matrix',
    category: 'Energy Architecture',
    specs: '118 kWh Capacity / 800V Architecture',
    metric: '10%–80% in 18 Min',
    detail: 'Structural battery pack integrated directly into the carbon-composite monocoque chassis, lowering the center of gravity to 380mm.',
    x: 0,
    y: -0.6,
    z: 0
  },
  {
    id: 'motors',
    name: 'Dual Permanent-Magnet Synchronous Motors',
    category: 'Powertrain',
    specs: '500 kW Combined / 1,020 Nm Torque',
    metric: '0–100 km/h in 2.9s',
    detail: 'Hairpin-wound copper stator with carbon-sleeved rotors revving up to 21,500 RPM with sub-millisecond torque vectoring.',
    x: 0,
    y: 0.3,
    z: -1.2
  },
  {
    id: 'aero',
    name: 'Active Dual-Plane Aero Wing',
    category: 'Aerodynamic Dynamics',
    specs: '4-Stage Adaptive Pitch Control',
    metric: '440 kg Downforce',
    detail: 'Electro-mechanical hydraulic struts deploy the active carbon foil during high-speed cornering and act as an emergency airbrake.',
    x: 0,
    y: 0.8,
    z: -2.1
  },
  {
    id: 'neural',
    name: 'VÉRSE Neural Drive Computer',
    category: 'Autonomy & Control',
    specs: '2,400 TFLOPS Dual-SoC Processing',
    metric: '0.4 ms Reaction Time',
    detail: 'Predictive active suspension adjusting individual damper valves 1,000 times per second using forward LiDAR topographical scans.',
    x: 0,
    y: 0.5,
    z: 0.8
  }
];

export const PERFORMANCE_METRICS = [
  { label: 'ACCELERATION', value: '2.9', unit: 'SEC', subtext: '0–100 km/h (0–62 mph)' },
  { label: 'POWER OUTPUT', value: '680', unit: 'HP', subtext: '500 kW Dual Motor' },
  { label: 'TORQUE', value: '1,020', unit: 'NM', subtext: 'Instant Vectoring' },
  { label: 'ESTIMATED RANGE', value: '620', unit: 'KM', subtext: 'WLTP Combined Cycle' },
  { label: 'TOP SPEED', value: '310', unit: 'KM/H', subtext: 'Electronically Limited' },
  { label: 'DRAG COEFFICIENT', value: '0.19', unit: 'CD', subtext: 'Wind-Tunnel Optimized' }
];
