import { 
  Category, 
  VehicleCategory, 
  VehicleManufacturer, 
  VehicleModel, 
  Product, 
  ProductCompatibility, 
  InventoryRecord, 
  CustomerEnquiry 
} from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-hl',
    name: 'Headlamps',
    slug: 'headlamps',
    description: 'Bi-LED, Matrix LED, and Laser projector headlamps engineered for long-range luminance and high-definition cutoff compliance.',
    icon: 'SunMedium',
    display_order: 1,
  },
  {
    id: 'cat-tl',
    name: 'Tail Lamps',
    slug: 'tail-lamps',
    description: 'Homogeneous light-guide clusters, dynamic sequential sweep indicators, and 3D aerodynamic edge-lit rear lighting.',
    icon: 'ShieldAlert',
    display_order: 2,
  },
  {
    id: 'cat-fl',
    name: 'Fog Lamps',
    slug: 'fog-lamps',
    description: 'High-penetration sharp-cutoff LED projector fog assemblies engineered for adverse atmospheric visibility.',
    icon: 'CloudFog',
    display_order: 3,
  },
  {
    id: 'cat-drl',
    name: 'Daytime Running Lights (DRLs)',
    slug: 'drls',
    description: 'Continuous micro-optical guide bars and signature daytime light signatures delivering high daytime conspicuity.',
    icon: 'Sparkles',
    display_order: 4,
  },
  {
    id: 'cat-sl',
    name: 'Signal Lamps & CHMSL',
    slug: 'signal-lamps',
    description: 'Center high-mount stop lamps, side mirror turn indicators, and heavy-duty sequential indicator modules.',
    icon: 'Radio',
    display_order: 5,
  },
  {
    id: 'cat-aux',
    name: 'Auxiliary & Work Lighting',
    slug: 'auxiliary-lighting',
    description: 'IP69K heavy-duty scene floodlamps, curved lightbars, and high-shock proof industrial auxiliary luminaires.',
    icon: 'Zap',
    display_order: 6,
  },
];

export const INITIAL_VEHICLE_CATEGORIES: VehicleCategory[] = [
  {
    id: 'vcat-pv',
    name: 'Passenger Vehicles',
    slug: 'passenger-vehicles',
    description: 'Compact cars, sedans, crossovers, mid-size and full-size SUVs, electric passenger vehicles.',
    icon: 'Car',
    display_order: 1,
  },
  {
    id: 'vcat-cv',
    name: 'Commercial Vehicles',
    slug: 'commercial-vehicles',
    description: 'Light commercial haulers (LCV), medium & heavy-duty trucks (M&HCV), intercity buses and transit coaches.',
    icon: 'Truck',
    display_order: 2,
  },
  {
    id: 'vcat-2w',
    name: 'Two Wheelers',
    slug: 'two-wheelers',
    description: 'High-performance motorcycles, commuter scooters, electric bikes and mopeds.',
    icon: 'Bike',
    display_order: 3,
  },
  {
    id: 'vcat-3w',
    name: 'Three Wheelers',
    slug: 'three-wheelers',
    description: 'Last-mile urban passenger auto-rickshaws, cargo delivery carriers, and electric three-wheelers.',
    icon: 'Navigation',
    display_order: 4,
  },
  {
    id: 'vcat-off',
    name: 'Off-Road & Special Vehicles',
    slug: 'off-road-vehicles',
    description: 'Mining haulers, agricultural tractors, backhoe earthmovers, extreme 4x4 expedition rigs, defense utility.',
    icon: 'Tractor',
    display_order: 5,
  },
];

export const INITIAL_MANUFACTURERS: VehicleManufacturer[] = [
  {
    id: 'mfg-tata',
    name: 'Tata Motors',
    slug: 'tata-motors',
    country: 'India',
    display_order: 1,
  },
  {
    id: 'mfg-mahindra',
    name: 'Mahindra & Mahindra',
    slug: 'mahindra',
    country: 'India',
    display_order: 2,
  },
  {
    id: 'mfg-maruti',
    name: 'Maruti Suzuki',
    slug: 'maruti-suzuki',
    country: 'India / Japan',
    display_order: 3,
  },
  {
    id: 'mfg-hyundai',
    name: 'Hyundai Motor',
    slug: 'hyundai',
    country: 'South Korea',
    display_order: 4,
  },
  {
    id: 'mfg-ashok',
    name: 'Ashok Leyland',
    slug: 'ashok-leyland',
    country: 'India / UK',
    display_order: 5,
  },
  {
    id: 'mfg-bajaj',
    name: 'Bajaj Auto',
    slug: 'bajaj-auto',
    country: 'India',
    display_order: 6,
  },
  {
    id: 'mfg-hero',
    name: 'Hero MotoCorp',
    slug: 'hero-motocorp',
    country: 'India',
    display_order: 7,
  },
  {
    id: 'mfg-force',
    name: 'Force Motors',
    slug: 'force-motors',
    country: 'India',
    display_order: 8,
  },
  {
    id: 'mfg-jcb',
    name: 'JCB Heavy Equipment',
    slug: 'jcb',
    country: 'United Kingdom / India',
    display_order: 9,
  },
];

export const INITIAL_VEHICLE_MODELS: VehicleModel[] = [
  // Passenger Vehicles
  {
    id: 'mod-harrier',
    manufacturer_id: 'mfg-tata',
    vehicle_category_id: 'vcat-pv',
    name: 'Harrier / Safari',
    slug: 'harrier-safari',
    year_start: 2020,
    year_end: null,
    platform: 'OMEGARC',
  },
  {
    id: 'mod-nexon',
    manufacturer_id: 'mfg-tata',
    vehicle_category_id: 'vcat-pv',
    name: 'Nexon & Nexon.ev',
    slug: 'nexon',
    year_start: 2021,
    year_end: null,
    platform: 'X1 Architecture',
  },
  {
    id: 'mod-scorpio-n',
    manufacturer_id: 'mfg-mahindra',
    vehicle_category_id: 'vcat-pv',
    name: 'Scorpio-N',
    slug: 'scorpio-n',
    year_start: 2022,
    year_end: null,
    platform: '3rd Gen Ladder Frame',
  },
  {
    id: 'mod-xuv700',
    manufacturer_id: 'mfg-mahindra',
    vehicle_category_id: 'vcat-pv',
    name: 'XUV700',
    slug: 'xuv700',
    year_start: 2021,
    year_end: null,
    platform: 'W601 Monocoque',
  },
  {
    id: 'mod-brezza',
    manufacturer_id: 'mfg-maruti',
    vehicle_category_id: 'vcat-pv',
    name: 'Brezza Urban SUV',
    slug: 'brezza',
    year_start: 2020,
    year_end: null,
    platform: 'Global C-Platform',
  },
  {
    id: 'mod-creta',
    manufacturer_id: 'mfg-hyundai',
    vehicle_category_id: 'vcat-pv',
    name: 'Creta Facelift & N-Line',
    slug: 'creta',
    year_start: 2020,
    year_end: null,
    platform: 'K2 Platform',
  },
  // Commercial Vehicles
  {
    id: 'mod-dost',
    manufacturer_id: 'mfg-ashok',
    vehicle_category_id: 'vcat-cv',
    name: 'Dost & Bada Dost LCV',
    slug: 'dost-lcv',
    year_start: 2018,
    year_end: null,
    platform: 'LCV Modular Chassis',
  },
  {
    id: 'mod-ecomet',
    manufacturer_id: 'mfg-ashok',
    vehicle_category_id: 'vcat-cv',
    name: 'Ecomet / Boss 14-Tonne Hauler',
    slug: 'ecomet-boss',
    year_start: 2019,
    year_end: null,
    platform: 'Medium Duty Truck',
  },
  {
    id: 'mod-prima',
    manufacturer_id: 'mfg-tata',
    vehicle_category_id: 'vcat-cv',
    name: 'Prima World Truck / Signa Heavy',
    slug: 'prima-signa',
    year_start: 2017,
    year_end: null,
    platform: 'HCV World Truck Chassis',
  },
  // Two Wheelers
  {
    id: 'mod-pulsar',
    manufacturer_id: 'mfg-bajaj',
    vehicle_category_id: 'vcat-2w',
    name: 'Pulsar NS200 / N250',
    slug: 'pulsar-ns',
    year_start: 2019,
    year_end: null,
    platform: 'Perimeter Steel Frame',
  },
  {
    id: 'mod-splendor',
    manufacturer_id: 'mfg-hero',
    vehicle_category_id: 'vcat-2w',
    name: 'Splendor+ Xtec & Passion Pro',
    slug: 'splendor-xtec',
    year_start: 2021,
    year_end: null,
    platform: 'Double Cradle Commuter',
  },
  // Three Wheelers
  {
    id: 'mod-treo',
    manufacturer_id: 'mfg-mahindra',
    vehicle_category_id: 'vcat-3w',
    name: 'Treo Electric & Alfa DX',
    slug: 'treo-electric',
    year_start: 2020,
    year_end: null,
    platform: 'EV Three Wheeler Tubular',
  },
  {
    id: 'mod-maxima',
    manufacturer_id: 'mfg-bajaj',
    vehicle_category_id: 'vcat-3w',
    name: 'Maxima Cargo & Compact 4S',
    slug: 'maxima-cargo',
    year_start: 2018,
    year_end: null,
    platform: 'Reinforced 3W Monocoque',
  },
  // Off-Road & Special Vehicles
  {
    id: 'mod-thar',
    manufacturer_id: 'mfg-mahindra',
    vehicle_category_id: 'vcat-off',
    name: 'Thar 4x4 / Thar ROXX',
    slug: 'thar-4x4',
    year_start: 2020,
    year_end: null,
    platform: 'Heavy-Duty 4WD Ladder Frame',
  },
  {
    id: 'mod-gurkha',
    manufacturer_id: 'mfg-force',
    vehicle_category_id: 'vcat-off',
    name: 'Gurkha 4x4 All-Terrain',
    slug: 'gurkha-4x4',
    year_start: 2021,
    year_end: null,
    platform: 'Rigid Live Axle Expedition',
  },
  {
    id: 'mod-jcb3dx',
    manufacturer_id: 'mfg-jcb',
    vehicle_category_id: 'vcat-off',
    name: '3DX EcoXcellence Backhoe',
    slug: 'jcb-3dx-backhoe',
    year_start: 2018,
    year_end: null,
    platform: 'Earthmoving Integrated Monocoque',
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Bi-LED Headlamp
  {
    id: 'prod-hl-01',
    sku: 'AL-HL-9010-PRO',
    name: 'VortexBeam 9000 Bi-LED Projector Headlamp Assembly',
    slug: 'vortexbeam-9000-bi-led-headlamp',
    category_id: 'cat-hl',
    vehicle_category_id: 'vcat-pv',
    optical_tech: 'Bi-LED Dual TIR Precision Lens',
    lumens: 6800,
    wattage: 55,
    voltage: '12V DC (9V-16V Operating)',
    color_temperature: 6000,
    beam_pattern: 'ECE R112 Sharp Left/Right Asymmetric Cutoff',
    ip_rating: 'IP67 / Hermetically Sealed',
    certifications: 'ECE R112, DOT SAE J583, AIS-012',
    housing_material: 'Die-cast High-Thermal ADC12 Aluminium',
    lens_material: 'Optical Grade UV-Hardcoated Polycarbonate',
    operating_temp: '-40°C to +105°C',
    description: 'Flagship automotive headlamp unit featuring twin integrated high/low beam projectors, laser-precision cutoff optics to eliminate oncoming glare, and dynamic micro-fin active heat sink architecture.',
    features: [
      'Twin high-efficiency Lumileds Luxeon LED emitters',
      'Electronic beam leveling actuator with integrated stepper driver',
      'Anti-fog condensation breather membrane (Gore-Tex certified)',
      'Integrated LED DRL eyebrow signature with 850 cd/m² daytime output',
      'Plug-and-play sealed OEM harness with CAN-bus error canceller'
    ],
    image_url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 24500,
    is_featured: true,
    is_active: true,
    created_at: '2026-01-15T10:00:00Z',
  },
  // 2. Commercial Vehicle Matrix Headlamp
  {
    id: 'prod-hl-02',
    sku: 'AL-HL-CV-7500',
    name: 'TitanHaul 24V Commercial Heavy-Duty LED Headlamp System',
    slug: 'titanhaul-24v-commercial-headlamp',
    category_id: 'cat-hl',
    vehicle_category_id: 'vcat-cv',
    optical_tech: 'Multi-Chamber Reflector + Projector Hybrid',
    lumens: 7500,
    wattage: 70,
    voltage: '24V Heavy Duty (18V-32V Transient Protection)',
    color_temperature: 5500,
    beam_pattern: 'Wide Commercial Long-Haul Spread Pattern',
    ip_rating: 'IP68 & ISO 16750-3 Vibration Compliant',
    certifications: 'AIS-010, ECE R112 Class B, SAE J578',
    housing_material: 'Impact Resistant Xenoy PBT Alloy + Aluminium Core',
    lens_material: 'Heavy-Duty 4mm Polycarbonate Lens with Scratch Armor',
    operating_temp: '-40°C to +85°C',
    description: 'Engineered specifically for long-distance commercial trucks and buses navigating extreme weather, offering 450m beam throw, ultra-ruggedized mounting points, and low power draw to conserve battery life.',
    features: [
      'Dual 24V surge-suppression circuits up to 100V spike defense',
      'Integrated amber side turn repeater and marker halo',
      'Internal vibration dampening up to 25G harmonic resonance',
      'Tool-free aim alignment mechanism with tactile click graduation'
    ],
    image_url: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 18900,
    is_featured: true,
    is_active: true,
    created_at: '2026-02-10T14:30:00Z',
  },
  // 3. Two Wheeler Performance Headlamp
  {
    id: 'prod-hl-03',
    sku: 'AL-HL-2W-3500',
    name: 'AeroMoto Compact LED Projector Unit for Motorcycles',
    slug: 'aeromoto-compact-led-motorcycle-headlamp',
    category_id: 'cat-hl',
    vehicle_category_id: 'vcat-2w',
    optical_tech: 'Micro-Bi-LED Monoblock Optical Prism',
    lumens: 3600,
    wattage: 32,
    voltage: '12V DC',
    color_temperature: 6000,
    beam_pattern: 'Motorcycle Lean-Compensated Asymmetric Spread',
    ip_rating: 'IP67 Waterproof',
    certifications: 'ECE R113 Class D, AIS-009',
    housing_material: 'Aviation Grade 6061 Forged Aluminium',
    lens_material: 'High-Transmittance Optical PMMA / Hardcoat',
    operating_temp: '-30°C to +90°C',
    description: 'Compact, featherweight projector headlamp designed for modern sport bikes and premium commuter motorcycles, providing crisp high/low illumination with razor-sharp horizontal cutoff.',
    features: [
      'Ultra-compact 68mm lens diameter for tight front cowl integration',
      'Silent magnetic solenoid high-beam shutter rated for 500,000 cycles',
      'Integrated aero-cooling duct channel'
    ],
    image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 9400,
    is_featured: false,
    is_active: true,
    created_at: '2026-02-18T09:15:00Z',
  },
  // 4. Tail Lamp: Homogeneous Light Guide Cluster
  {
    id: 'prod-tl-01',
    sku: 'AL-TL-4022-GL',
    name: 'LuminaGlide Full-LED 3D Rear Tail Lamp Cluster',
    slug: 'luminaglide-full-led-tail-lamp-cluster',
    category_id: 'cat-tl',
    vehicle_category_id: 'vcat-pv',
    optical_tech: 'Homogeneous 3D Acrylic Light Pipe & Micro-Prism Matrix',
    lumens: 1850,
    wattage: 28,
    voltage: '12V DC',
    color_temperature: 1800, // Deep Red
    beam_pattern: '180° Panoramic Angular Conspicuity',
    ip_rating: 'IP67 Sealed',
    certifications: 'ECE R7, ECE R6, ECE R23, AIS-012',
    housing_material: 'Thermoplastic ABS/PMMA Co-injection',
    lens_material: 'Deep Ruby Red Polycarbonate + Clear Edge Crystal',
    operating_temp: '-40°C to +85°C',
    description: 'Aerodynamic rear combination lamp featuring continuous light-guide position strips, instantaneous emergency brake pulse activation, and sweeping sequential turn indicators.',
    features: [
      'Homogeneous neon-glow position light without visible diode dots',
      'Emergency Stop Signal (ESS) high-frequency rapid flashing logic',
      'Integrated high-lumen reversing optics and fog lamp module',
      'Aero-vortex generator fins molded directly into the outer lens edge'
    ],
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 14200,
    is_featured: true,
    is_active: true,
    created_at: '2026-02-01T11:20:00Z',
  },
  // 5. Commercial Vehicle Rugged Tail Lamp
  {
    id: 'prod-tl-02',
    sku: 'AL-TL-CV-2401',
    name: 'DuraPoint 24V Modular Waterproof Tail Lamp Assembly',
    slug: 'durapoint-24v-modular-tail-lamp',
    category_id: 'cat-tl',
    vehicle_category_id: 'vcat-cv',
    optical_tech: 'High-Density SMD Array with Diamond-Faceted Optics',
    lumens: 1200,
    wattage: 18,
    voltage: '24V DC Commercial Standard',
    color_temperature: 1800,
    beam_pattern: 'Heavy Commercial Wide-Angle Rear Warning',
    ip_rating: 'IP68 Submersible',
    certifications: 'AIS-012, ECE R7, ECE R6, SAE J593',
    housing_material: 'Reinforced Polyamide PA6-GF30 Structural Casing',
    lens_material: 'Impact Resistant Shatterproof Polycarbonate',
    operating_temp: '-40°C to +90°C',
    description: 'Built for industrial trucks, trailers, and logistics fleets subject to high-pressure washdowns, mud, and continuous vibration. Features hermetically potted circuit boards and Deutsch DT quick-connectors.',
    features: [
      'Integrated reflex reflector conforming to ECE R3',
      'Reverse audio buzzer sync ready',
      'Resistant to hydraulic fluid, diesel splashing, and road salt spray'
    ],
    image_url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 6800,
    is_featured: false,
    is_active: true,
    created_at: '2026-02-05T16:00:00Z',
  },
  // 6. Fog Lamp: Dual-Spectrum Anti-Glare
  {
    id: 'prod-fl-01',
    sku: 'AL-FL-6055-MX',
    name: 'AeroFog Dual-Spectrum LED Projector Fog Assembly',
    slug: 'aerofog-dual-spectrum-led-fog-lamp',
    category_id: 'cat-fl',
    vehicle_category_id: 'vcat-pv',
    optical_tech: 'Dual Spectrum Switchable TIR Free-form Optical Projector',
    lumens: 3200,
    wattage: 30,
    voltage: '12V DC',
    color_temperature: 4300, // Switchable 3000K Amber / 6000K Pure White
    beam_pattern: 'Ultra-Wide Horizontal Ground Wash Cutoff',
    ip_rating: 'IP68 / Submersible Breather',
    certifications: 'ECE R19 Class F3, DOT SAE J583, AIS-012',
    housing_material: 'Die-cast High Purity Aluminium A380',
    lens_material: 'Sapphire Scratch-Proof Coated Borosilicate Glass',
    operating_temp: '-40°C to +110°C',
    description: 'Dual-mode fog projector capable of instant switching between 3000K amber (for dense fog, monsoons, and sand) and 6000K pure white (for pitch-dark country roads). Employs a zero-stray upward glare cutoff.',
    features: [
      'Instant toggle between 3000K deep amber and 6000K crisp daylight',
      '120-degree horizontal dispersion curtain covers roadside ditches and blind corners',
      'Universal 90mm round barrel fitment fits standard OEM bumper cutouts'
    ],
    image_url: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 8900,
    is_featured: true,
    is_active: true,
    created_at: '2026-02-14T08:45:00Z',
  },
  // 7. Off-Road Dual Fog & Pod
  {
    id: 'prod-fl-02',
    sku: 'AL-FL-OR-4000',
    name: 'TerraBeam 4x4 Heavy Armor Fog & Ditch Projector',
    slug: 'terrabeam-4x4-fog-ditch-projector',
    category_id: 'cat-fl',
    vehicle_category_id: 'vcat-off',
    optical_tech: 'Convex Aspheric Spot/Fog Optic',
    lumens: 4200,
    wattage: 40,
    voltage: '12V / 24V Multi-Voltage',
    color_temperature: 3000,
    beam_pattern: 'Low-Mounted Deep Penetration Fog Beam',
    ip_rating: 'IP69K High Pressure Washdown',
    certifications: 'AIS-012, SAE J583 Off-Road',
    housing_material: 'Military Spec Hard-Anodized Aluminium',
    lens_material: 'Unbreakable Lexan Polycarbonate',
    operating_temp: '-40°C to +125°C',
    description: 'Armored fog projector designed for off-road SUVs, utility vehicles, and agricultural tractors. Survives direct stone impacts, deep river wading, and extreme chassis vibration.',
    features: [
      'Stainless steel 316 grade heavy-gauge bracket kit',
      'Gold selective 3000K spectrum cuts through dust clouds and monsoon rains',
      'Thermal foldback protection circuit prevents LED degradation'
    ],
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 11200,
    is_featured: false,
    is_active: true,
    created_at: '2026-02-22T13:10:00Z',
  },
  // 8. DRL: Micro-Optic Blade
  {
    id: 'prod-drl-01',
    sku: 'AL-DRL-8820-BL',
    name: 'AuraBlade Continuous Micro-Optic DRL & Indicator Strip',
    slug: 'aurablade-micro-optic-drl-strip',
    category_id: 'cat-drl',
    vehicle_category_id: 'vcat-pv',
    optical_tech: 'Side-Lit Micro-Structured Silicone Waveguide',
    lumens: 1600,
    wattage: 16,
    voltage: '12V DC',
    color_temperature: 6500,
    beam_pattern: 'Wide Daytime Conspicuity Beam',
    ip_rating: 'IP67 Waterproof',
    certifications: 'ECE R87 (DRL), ECE R6 (Indicator), AIS-012',
    housing_material: 'Low-Profile Thermal Composite Channel',
    lens_material: 'UV-Stabilized Optical Grade Liquid Silicone Rubber',
    operating_temp: '-40°C to +95°C',
    description: 'Ultra-slim flexible light blade that delivers seamless, razor-sharp daytime running light illumination and seamlessly transforms into a dynamic amber sequential turn indicator.',
    features: [
      'Completely seamless neon appearance without any dark spots',
      'Dual-color switchback controller integrated on PCB',
      'Compliant with ECE R87 automatic daytime dimming when headlamps are active',
      'Ultra-thin 12mm profile allows seamless integration into fascia styling lines'
    ],
    image_url: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 7500,
    is_featured: true,
    is_active: true,
    created_at: '2026-02-25T17:40:00Z',
  },
  // 9. DRL: Halo Ring for Off-Road & Retro
  {
    id: 'prod-drl-02',
    sku: 'AL-DRL-7000-HR',
    name: 'HaloSphere 7-Inch Multi-Function DRL & Position Ring',
    slug: 'halosphere-7-inch-drl-position-ring',
    category_id: 'cat-drl',
    vehicle_category_id: 'vcat-off',
    optical_tech: '360° Circular Light-Guide Prism Ring',
    lumens: 1400,
    wattage: 14,
    voltage: '12V / 24V Auto-Select',
    color_temperature: 6000,
    beam_pattern: 'Omnidirectional Circular Daytime Signature',
    ip_rating: 'IP68 Waterproof',
    certifications: 'ECE R87, SAE J2087',
    housing_material: 'Sealed Polycarbonate Carrier Bezel',
    lens_material: 'Frosted Optical Diffuser',
    operating_temp: '-40°C to +90°C',
    description: 'Iconic circular daytime running halo engineered for rugged SUVs, retro cruisers, and all-terrain 4x4 vehicles. Provides striking visual identity during bright sunlight.',
    features: [
      'Integrated switchback amber flashing mode for turn signaling',
      'Constant-current driver topology resistant to voltage drops',
      'Standard 7-inch round retrofittable format'
    ],
    image_url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 5900,
    is_featured: false,
    is_active: true,
    created_at: '2026-02-28T12:00:00Z',
  },
  // 10. Signal Lamp: High-Mount Stop Lamp (CHMSL)
  {
    id: 'prod-sl-01',
    sku: 'AL-SL-CHMSL-10',
    name: 'AeroStop Aerodynamic Integrated High-Mount LED Stop Lamp',
    slug: 'aerostop-aerodynamic-high-mount-stop-lamp',
    category_id: 'cat-sl',
    vehicle_category_id: 'vcat-pv',
    optical_tech: 'Linear Collimator LED Array',
    lumens: 950,
    wattage: 10,
    voltage: '12V DC',
    color_temperature: 1600,
    beam_pattern: 'High-Visibility Rear Elevated Conspicuity',
    ip_rating: 'IP67 Waterproof',
    certifications: 'ECE R48, ECE S3, AIS-012, DOT SAE',
    housing_material: 'UV-Stabilized Polycarbonate Carrier',
    lens_material: 'Optically Clear Red Hardcoat Acrylic',
    operating_temp: '-40°C to +85°C',
    description: 'Roof spoiler and rear glass mount high-level third stop lamp engineered to provide fast-rise brake notification to trailing drivers 200 milliseconds quicker than incandescent bulbs.',
    features: [
      'Ultra-fast rise time (less than 1 millisecond to full luminance)',
      'Aero-profile design flush with roof spoiler aerodynamic contour',
      'Automotive foam seal prevents water and dust ingress into cabin'
    ],
    image_url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 4200,
    is_featured: false,
    is_active: true,
    created_at: '2026-03-01T15:20:00Z',
  },
  // 11. Signal Lamp: Mirror Turn Repeater
  {
    id: 'prod-sl-02',
    sku: 'AL-SL-MTR-05',
    name: 'StreamLine Sequential Side Mirror Indicator Assembly',
    slug: 'streamline-sequential-side-mirror-indicator',
    category_id: 'cat-sl',
    vehicle_category_id: 'vcat-pv',
    optical_tech: 'Micro-Sequential LED Light Pipe',
    lumens: 650,
    wattage: 6,
    voltage: '12V DC',
    color_temperature: 1900, // Amber
    beam_pattern: 'Lateral 120° Flank Warning Beam',
    ip_rating: 'IP67 Sealed',
    certifications: 'ECE R6 Cat 5, AIS-012',
    housing_material: 'Engineered Polymer Chassis',
    lens_material: 'Smoked Tinted Polycarbonate Lens',
    operating_temp: '-35°C to +85°C',
    description: 'Precision side view mirror turn repeater with dynamic fluid animation. Improves lane-change awareness for adjacent motorcyclists and pedestrians in urban blind spots.',
    features: [
      'Fluid sweep animation sequence with calibrated timing interval',
      'Ultra-compact form factor seamlessly integrates into mirror scalp',
      'High contrast smoked glass look when deactivated'
    ],
    image_url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 3400,
    is_featured: false,
    is_active: true,
    created_at: '2026-03-04T10:10:00Z',
  },
  // 12. Auxiliary & Work: Heavy Scene Floodlamp
  {
    id: 'prod-aux-01',
    sku: 'AL-AUX-8500-FL',
    name: 'TitanScene 9500-Lumen Heavy-Duty Mining & Construction Floodlamp',
    slug: 'titanscene-9500-heavy-duty-floodlamp',
    category_id: 'cat-aux',
    vehicle_category_id: 'vcat-off',
    optical_tech: 'Multi-Die CREE XHP70 High-Output Matrix',
    lumens: 9500,
    wattage: 85,
    voltage: '9V - 36V Wide Input DC',
    color_temperature: 5000,
    beam_pattern: 'Ultra-Wide 80° Ground Illumination Flood',
    ip_rating: 'IP69K High Pressure Steam-Clean Proof',
    certifications: 'ISO 13766 EMC Earthmoving, CISPR 25 Class 5',
    housing_material: 'Marine Grade A360 Aluminium with Epoxy Armor Coating',
    lens_material: 'Unbreakable High-Impact 6mm Polycarbonate',
    operating_temp: '-45°C to +125°C',
    description: 'Built to illuminate nocturnal excavation, construction and mining operations under the harshest conditions. Zero radio interference (CISPR 25 Class 5) and rated for 60G shock resilience.',
    features: [
      'Massive 9,500 true measured lumen output with uniform field distribution',
      'Stainless steel 316 trunnion heavy bracket with angle locking teeth',
      'Integrated over-voltage, reverse-polarity and load-dump protection'
    ],
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 16500,
    is_featured: true,
    is_active: true,
    created_at: '2026-03-08T09:00:00Z',
  },
  // 13. Auxiliary: Curved Light Bar for Off-Road / Recovery
  {
    id: 'prod-aux-02',
    sku: 'AL-AUX-50-BAR',
    name: 'RidgeMaster 50-Inch Curved Dual-Row Spot/Flood LED Light Bar',
    slug: 'ridgemaster-50-inch-curved-light-bar',
    category_id: 'cat-aux',
    vehicle_category_id: 'vcat-off',
    optical_tech: 'Combo Optic: 10° Spot Center + 60° Flood Flanks',
    lumens: 28000,
    wattage: 280,
    voltage: '12V / 24V Universal Input',
    color_temperature: 5700,
    beam_pattern: 'Hybrid 800m Long-Distance Spot + Peripheral Flood',
    ip_rating: 'IP68 & Pressure Equalizing Breather Valve',
    certifications: 'CE, RoHS, SAE J575 Off-Road',
    housing_material: 'Extruded 6063 Aluminium Aero Body',
    lens_material: 'Virtually Indestructible GE Lexan Polycarbonate',
    operating_temp: '-40°C to +100°C',
    description: 'Master light bar for emergency rescue, desert navigation, and severe off-road trails. The curved radius precisely matches vehicle windshield arches to maximize peripheral visibility.',
    features: [
      'Dual-row OSRAM Oslon Black Flat LED chips delivering 28,000 lumens',
      'Wind-noise dampening aero-fins eliminate high-speed cabin whistle',
      'Military-grade breathing membrane prevents internal moisture condensation'
    ],
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 29500,
    is_featured: false,
    is_active: true,
    created_at: '2026-03-12T14:15:00Z',
  },
  // 14. Three Wheeler Low-Drain LED Headlamp
  {
    id: 'prod-hl-04',
    sku: 'AL-HL-3W-2000',
    name: 'VoltEco Low-Draw LED Headlamp for Electric Three-Wheelers',
    slug: 'volteco-low-draw-led-headlamp-3w',
    category_id: 'cat-hl',
    vehicle_category_id: 'vcat-3w',
    optical_tech: 'High-Efficiency Reflector Lens with Wide Urban Spread',
    lumens: 2400,
    wattage: 18,
    voltage: '48V - 72V Direct EV Input (No DC-DC Converter Required)',
    color_temperature: 5500,
    beam_pattern: 'Urban Wide Conspicuity Low Glare',
    ip_rating: 'IP66 Weatherproof',
    certifications: 'AIS-012, AIS-009',
    housing_material: 'Thermal Conductive PBT Polymer Chassis',
    lens_material: 'UV Hardcoated Acrylic',
    operating_temp: '-25°C to +85°C',
    description: 'Designed specifically for battery-electric auto rickshaws and urban cargo haulers. Connects directly to 48V-72V lithium/lead-acid packs, eliminating converter failure points and saving valuable battery range.',
    features: [
      'Direct high-voltage pack compatibility (36V-85V continuous)',
      'Ultra-efficient 133 lm/W efficacy maximizes electric vehicle range',
      'Integrated daytime position ring for all-day visibility'
    ],
    image_url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80'
    ],
    price_estimate: 4800,
    is_featured: false,
    is_active: true,
    created_at: '2026-03-15T11:00:00Z',
  }
];

export const INITIAL_COMPATIBILITIES: ProductCompatibility[] = [
  // VortexBeam Headlamp compatibilities
  {
    id: 'comp-01',
    product_id: 'prod-hl-01',
    vehicle_model_id: 'mod-harrier',
    fitment_position: 'Front Left & Right Headlamp Assembly',
    year_start: 2020,
    year_end: null,
    notes: 'Direct OEM mounting replacement. CAN-bus compatible without resistor decoders.'
  },
  {
    id: 'comp-02',
    product_id: 'prod-hl-01',
    vehicle_model_id: 'mod-xuv700',
    fitment_position: 'Front Main Projector Assembly',
    year_start: 2021,
    year_end: null,
    notes: 'Integrates with factory auto-headlamp level sensor.'
  },
  {
    id: 'comp-03',
    product_id: 'prod-hl-01',
    vehicle_model_id: 'mod-creta',
    fitment_position: 'Bumper-Mounted Trio Projector Bay',
    year_start: 2020,
    year_end: null,
    notes: 'Direct bolt-on to SX and SX(O) trim bezels.'
  },
  // TitanHaul CV Headlamp
  {
    id: 'comp-04',
    product_id: 'prod-hl-02',
    vehicle_model_id: 'mod-ecomet',
    fitment_position: 'Front Fascia Main Headlamp Pods',
    year_start: 2019,
    year_end: null,
    notes: 'Standard 24V truck electrical harness plug.'
  },
  {
    id: 'comp-05',
    product_id: 'prod-hl-02',
    vehicle_model_id: 'mod-prima',
    fitment_position: 'Aerodynamic Steel Bumper Housing',
    year_start: 2017,
    year_end: null,
    notes: 'Long-haul spec with anti-vibration rubber bushing mounts.'
  },
  {
    id: 'comp-06',
    product_id: 'prod-hl-02',
    vehicle_model_id: 'mod-dost',
    fitment_position: 'Front Composite Fascia',
    year_start: 2018,
    year_end: null,
    notes: 'Requires 12V-to-24V stepped variant for Dost 12V models.'
  },
  // AeroMoto 2W Headlamp
  {
    id: 'comp-07',
    product_id: 'prod-hl-03',
    vehicle_model_id: 'mod-pulsar',
    fitment_position: 'Front Handlebar Cowl Projector Eye',
    year_start: 2019,
    year_end: null,
    notes: 'Direct replacement for halogen headlamp cowl. Conserves 23W power.'
  },
  {
    id: 'comp-08',
    product_id: 'prod-hl-03',
    vehicle_model_id: 'mod-splendor',
    fitment_position: 'Front Chrome/Black Visor Housing',
    year_start: 2021,
    year_end: null,
    notes: 'Retrofittable bracket included in kit.'
  },
  // LuminaGlide Tail Lamp
  {
    id: 'comp-09',
    product_id: 'prod-tl-01',
    vehicle_model_id: 'mod-nexon',
    fitment_position: 'Rear Quarter Panel & Tailgate Assembly',
    year_start: 2021,
    year_end: null,
    notes: 'Connects to factory X-factor tail harness.'
  },
  {
    id: 'comp-10',
    product_id: 'prod-tl-01',
    vehicle_model_id: 'mod-brezza',
    fitment_position: 'Rear Wrap-Around Outer/Inner Pods',
    year_start: 2020,
    year_end: null,
    notes: 'Factory match for LED light-guide signature.'
  },
  {
    id: 'comp-11',
    product_id: 'prod-tl-01',
    vehicle_model_id: 'mod-scorpio-n',
    fitment_position: 'Vertical D-Pillar High Tail Cluster',
    year_start: 2022,
    year_end: null,
    notes: 'Full vertical blade replacement with dynamic sweep.'
  },
  // AeroFog Dual-Spectrum Fog
  {
    id: 'comp-12',
    product_id: 'prod-fl-01',
    vehicle_model_id: 'mod-harrier',
    fitment_position: 'Lower Bumper Fog Lamp Bezels',
    year_start: 2020,
    year_end: null,
    notes: '90mm round mounting bracket included.'
  },
  {
    id: 'comp-13',
    product_id: 'prod-fl-01',
    vehicle_model_id: 'mod-scorpio-n',
    fitment_position: 'Front Lower Bumper Fog Well',
    year_start: 2022,
    year_end: null,
    notes: 'Toggles color mode using factory fog stalk switch.'
  },
  {
    id: 'comp-14',
    product_id: 'prod-fl-01',
    vehicle_model_id: 'mod-brezza',
    fitment_position: 'Bumper Recessed Pods',
    year_start: 2020,
    year_end: null,
    notes: 'Direct drop-in replacement.'
  },
  // TerraBeam 4x4 Fog
  {
    id: 'comp-15',
    product_id: 'prod-fl-02',
    vehicle_model_id: 'mod-thar',
    fitment_position: 'Front Steel/Polymer Off-road Bumper',
    year_start: 2020,
    year_end: null,
    notes: 'High-strength steel mounting bracket compatible with off-road bumpers.'
  },
  {
    id: 'comp-16',
    product_id: 'prod-fl-02',
    vehicle_model_id: 'mod-gurkha',
    fitment_position: 'Heavy Metal Winch Bumper Cavities',
    year_start: 2021,
    year_end: null,
    notes: 'Tested for 700mm water wading submersion.'
  },
  // DRL AuraBlade
  {
    id: 'comp-17',
    product_id: 'prod-drl-01',
    vehicle_model_id: 'mod-harrier',
    fitment_position: 'Upper Hood Edge DRL Channel',
    year_start: 2020,
    year_end: null,
    notes: 'Matches OEM welcome sequence light animation.'
  },
  {
    id: 'comp-18',
    product_id: 'prod-drl-01',
    vehicle_model_id: 'mod-nexon',
    fitment_position: 'Front Grille Upper Split DRL',
    year_start: 2021,
    year_end: null,
    notes: 'Bi-function white DRL and amber blinker.'
  },
  // HaloSphere DRL
  {
    id: 'comp-19',
    product_id: 'prod-drl-02',
    vehicle_model_id: 'mod-thar',
    fitment_position: '7-Inch Round Headlamp Bezel Perimeter',
    year_start: 2020,
    year_end: null,
    notes: 'Gives the iconic round off-roader aesthetic with modern LED clarity.'
  },
  {
    id: 'comp-20',
    product_id: 'prod-drl-02',
    vehicle_model_id: 'mod-gurkha',
    fitment_position: '7-Inch Headlamp Housing Ring',
    year_start: 2021,
    year_end: null,
    notes: 'Direct plug into auxiliary DRL trigger.'
  },
  // TitanScene Heavy Floodlamp
  {
    id: 'comp-21',
    product_id: 'prod-aux-01',
    vehicle_model_id: 'mod-jcb3dx',
    fitment_position: 'Roof Canopy Front & Rear Boom Arm',
    year_start: 2018,
    year_end: null,
    notes: 'Vibration-isolated bolt mounting withstands hydraulic ram shock.'
  },
  {
    id: 'comp-22',
    product_id: 'prod-aux-01',
    vehicle_model_id: 'mod-prima',
    fitment_position: 'Rear Cabin Work Deck Illumination',
    year_start: 2017,
    year_end: null,
    notes: 'Illuminates fifth-wheel coupling zone during night operations.'
  },
  // VoltEco 3W Headlamp
  {
    id: 'comp-23',
    product_id: 'prod-hl-04',
    vehicle_model_id: 'mod-treo',
    fitment_position: 'Front Nose Center Headlamp Assembly',
    year_start: 2020,
    year_end: null,
    notes: 'Connects directly to 48V battery pack harness without DC converter.'
  },
  {
    id: 'comp-24',
    product_id: 'prod-hl-04',
    vehicle_model_id: 'mod-maxima',
    fitment_position: 'Front Cabin Apron Headlamp Housing',
    year_start: 2018,
    year_end: null,
    notes: 'Weatherproof sealed connector.'
  }
];

export const INITIAL_INVENTORY: InventoryRecord[] = [
  {
    id: 'inv-01',
    product_id: 'prod-hl-01',
    stock_quantity: 148,
    min_threshold: 30,
    warehouse_bin: 'BIN-HL-A01',
    status: 'in_stock',
    last_restocked_at: '2026-03-20T08:00:00Z'
  },
  {
    id: 'inv-02',
    product_id: 'prod-hl-02',
    stock_quantity: 85,
    min_threshold: 25,
    warehouse_bin: 'BIN-HL-C04',
    status: 'in_stock',
    last_restocked_at: '2026-03-18T10:30:00Z'
  },
  {
    id: 'inv-03',
    product_id: 'prod-hl-03',
    stock_quantity: 210,
    min_threshold: 40,
    warehouse_bin: 'BIN-2W-B12',
    status: 'in_stock',
    last_restocked_at: '2026-03-25T14:15:00Z'
  },
  {
    id: 'inv-04',
    product_id: 'prod-tl-01',
    stock_quantity: 19,
    min_threshold: 25,
    warehouse_bin: 'BIN-TL-A08',
    status: 'low_stock',
    last_restocked_at: '2026-02-28T09:00:00Z'
  },
  {
    id: 'inv-05',
    product_id: 'prod-tl-02',
    stock_quantity: 94,
    min_threshold: 20,
    warehouse_bin: 'BIN-TL-D02',
    status: 'in_stock',
    last_restocked_at: '2026-03-12T16:00:00Z'
  },
  {
    id: 'inv-06',
    product_id: 'prod-fl-01',
    stock_quantity: 12,
    min_threshold: 20,
    warehouse_bin: 'BIN-FL-E01',
    status: 'low_stock',
    last_restocked_at: '2026-02-15T11:45:00Z'
  },
  {
    id: 'inv-07',
    product_id: 'prod-fl-02',
    stock_quantity: 62,
    min_threshold: 15,
    warehouse_bin: 'BIN-FL-E05',
    status: 'in_stock',
    last_restocked_at: '2026-03-05T13:20:00Z'
  },
  {
    id: 'inv-08',
    product_id: 'prod-drl-01',
    stock_quantity: 175,
    min_threshold: 30,
    warehouse_bin: 'BIN-DRL-F03',
    status: 'in_stock',
    last_restocked_at: '2026-03-22T08:30:00Z'
  },
  {
    id: 'inv-09',
    product_id: 'prod-drl-02',
    stock_quantity: 45,
    min_threshold: 15,
    warehouse_bin: 'BIN-DRL-F09',
    status: 'in_stock',
    last_restocked_at: '2026-03-10T15:00:00Z'
  },
  {
    id: 'inv-10',
    product_id: 'prod-sl-01',
    stock_quantity: 8,
    min_threshold: 20,
    warehouse_bin: 'BIN-SL-G02',
    status: 'low_stock',
    last_restocked_at: '2026-02-10T12:00:00Z'
  },
  {
    id: 'inv-11',
    product_id: 'prod-sl-02',
    stock_quantity: 130,
    min_threshold: 25,
    warehouse_bin: 'BIN-SL-G07',
    status: 'in_stock',
    last_restocked_at: '2026-03-19T09:40:00Z'
  },
  {
    id: 'inv-12',
    product_id: 'prod-aux-01',
    stock_quantity: 38,
    min_threshold: 10,
    warehouse_bin: 'BIN-AUX-H01',
    status: 'in_stock',
    last_restocked_at: '2026-03-14T11:15:00Z'
  },
  {
    id: 'inv-13',
    product_id: 'prod-aux-02',
    stock_quantity: 0,
    min_threshold: 10,
    warehouse_bin: 'BIN-AUX-H09',
    status: 'out_of_stock',
    last_restocked_at: '2026-01-20T17:00:00Z'
  },
  {
    id: 'inv-14',
    product_id: 'prod-hl-04',
    stock_quantity: 115,
    min_threshold: 20,
    warehouse_bin: 'BIN-3W-K02',
    status: 'in_stock',
    last_restocked_at: '2026-03-24T10:00:00Z'
  }
];

export const INITIAL_ENQUIRIES: CustomerEnquiry[] = [
  {
    id: 'enq-101',
    enquiry_type: 'oem_development',
    name: 'Rajesh Sharma',
    email: 'r.sharma@auto-mobility-tech.in',
    phone: '+91 98201 44521',
    company: 'Apex Mobility Solutions (Tier-1 EV Bus OEM)',
    vehicle_interest: 'Electric Intercity Transit Coach (12-Meter)',
    product_id: 'prod-hl-02',
    message: 'We are engineering a next-gen 12-meter electric transit coach and require 24V LED headlamp assemblies with integrated ECE R112 and AIS-012 certifications. Seeking engineering drawings (3D CAD STEP files) and sample units for photometric bench verification.',
    status: 'new',
    admin_notes: 'High priority OEM lead. Schedule technical review with chief optical engineer.',
    created_at: '2026-03-28T14:35:00Z'
  },
  {
    id: 'enq-102',
    enquiry_type: 'sample_request',
    name: 'Dr. Anand Verma',
    email: 'a.verma@dynasystems-rnd.com',
    phone: '+91 99104 88320',
    company: 'DynaSystems Automotive R&D',
    vehicle_interest: 'Mahindra Scorpio-N Custom Armored Fleet',
    product_id: 'prod-fl-01',
    message: 'Requesting 4 sample pairs of AeroFog Dual-Spectrum LED Projectors for environmental chamber stress testing (-40°C to +85°C thermal cycling) and vibration rig evaluation.',
    status: 'in_review',
    admin_notes: 'Sample dispatch authorized. Tracking number to be generated from warehouse bay E01.',
    created_at: '2026-03-27T09:20:00Z'
  },
  {
    id: 'enq-103',
    enquiry_type: 'rfq_quote',
    name: 'Vikramaditya Rao',
    email: 'procurement@translog-freight.com',
    phone: '+91 98450 71190',
    company: 'TransLog Heavy Haulage Fleet',
    vehicle_interest: 'Tata Prima & Ashok Leyland 2820 Fleet',
    product_id: 'prod-hl-02',
    message: 'Looking for bulk annual contract pricing for 500 units of TitanHaul 24V Commercial Headlamps and 1000 units of DuraPoint 24V Tail Lamps with warranty terms.',
    status: 'quoted',
    admin_notes: 'Quotation Q-2026-0442 sent with Tier-3 volume tier discount.',
    created_at: '2026-03-25T16:45:00Z'
  },
  {
    id: 'enq-104',
    enquiry_type: 'general',
    name: 'Priya Sundaram',
    email: 'priya.sundaram@velocity-customs.co.in',
    phone: '+91 97110 33456',
    company: 'Velocity Automotive Styling',
    vehicle_interest: 'Tata Harrier 2024 Dark Edition',
    product_id: 'prod-hl-01',
    message: 'Can you confirm whether the VortexBeam 9000 Bi-LED requires any wiring harness modification or if it operates directly with the factory CAN-bus without displaying bulb-out error warnings on the instrument cluster?',
    status: 'resolved',
    admin_notes: 'Confirmed 100% CAN-bus error-free plug-and-play compatibility. Customer closed successfully.',
    created_at: '2026-03-22T11:10:00Z'
  }
];
