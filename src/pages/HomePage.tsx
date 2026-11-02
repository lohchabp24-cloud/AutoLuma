import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  SunMedium, 
  ShieldCheck, 
  Cpu, 
  ArrowRight, 
  SlidersHorizontal, 
  CheckCircle2, 
  Award, 
  Zap, 
  Radio, 
  CloudFog, 
  Sparkles, 
  ShieldAlert,
  Car,
  Truck,
  Bike,
  Tractor,
  Layers,
  ChevronRight
} from 'lucide-react';
import { Product, Category, VehicleCategory } from '../types';
import { getProducts, getCategories, getVehicleCategories } from '../services/dataService';
import { VehicleFinderWidget } from '../components/common/VehicleFinderWidget';
import { ProductCard } from '../components/common/ProductCard';
import { EnquiryModal } from '../components/common/EnquiryModal';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [vehicleCategories, setVehicleCategories] = useState<VehicleCategory[]>([]);
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadData() {
      const [prods, cats, vcats] = await Promise.all([
        getProducts(),
        getCategories(),
        getVehicleCategories(),
      ]);
      setFeaturedProducts(prods.filter((p) => p.is_featured).slice(0, 6));
      setCategories(cats);
      setVehicleCategories(vcats);
    }
    loadData();
  }, []);

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'headlamps': return SunMedium;
      case 'tail-lamps': return ShieldAlert;
      case 'fog-lamps': return CloudFog;
      case 'drls': return Sparkles;
      case 'signal-lamps': return Radio;
      case 'auxiliary-lighting': return Zap;
      default: return SunMedium;
    }
  };

  const getVehicleIcon = (slug: string) => {
    switch (slug) {
      case 'passenger-vehicles': return Car;
      case 'commercial-vehicles': return Truck;
      case 'two-wheelers': return Bike;
      case 'three-wheelers': return Car;
      case 'off-road-vehicles': return Tractor;
      default: return Car;
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background automotive lighting visual */}
        <div className="absolute inset-0 -z-10 bg-slate-950">
          <img
            src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=2000&q=85"
            alt="Automotive Lighting Engineering"
            className="w-full h-full object-cover object-center opacity-25 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
          {/* Subtle beam glow visual */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none"></div>
        </div>

        <div className="max-w-6xl mx-auto w-full text-center space-y-8">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-mono font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            Tier-1 Inspired Automotive Lighting Innovation
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Optical Precision Engineered for the <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">Next Generation</span> of Global Mobility
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            AutoLuma designs and manufactures advanced Bi-LED projectors, homogeneous light-guide tail systems, and certified vehicle-specific lighting assemblies with 100% verified fitment guarantee.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/catalog"
              className="px-7 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-xl shadow-sky-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Explore Product Catalogue</span>
            </Link>

            <Link
              to="/compatibility"
              className="px-7 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm rounded-xl border border-slate-700/80 hover:border-sky-500/50 flex items-center gap-2 transition-all"
            >
              <span>Fitment Verification Matrix</span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </Link>
          </div>

          {/* Integrated Fitment Finder Bar */}
          <div className="pt-10 max-w-4xl mx-auto">
            <VehicleFinderWidget />
          </div>
        </div>
      </section>

      {/* 2. STATS & CREDENTIALS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-panel rounded-2xl border border-slate-800">
          <div className="p-4 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              6,800+ <span className="text-sky-400 text-lg">lm</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
              Peak Bi-LED Luminous Flux
            </div>
          </div>

          <div className="p-4 text-center border-l border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              100% <span className="text-emerald-400 text-lg">Verified</span>
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
              OEM Fitment Guarantee
            </div>
          </div>

          <div className="p-4 text-center border-l border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              IP68 / IP69K
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
              Submersion & High Pressure
            </div>
          </div>

          <div className="p-4 text-center border-l border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              ECE & AIS
            </div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">
              Global Regulatory Homologation
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATEGORIES (6 Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              Photometric Product Taxonomy
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Engineered Lighting Systems
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mt-1">
              Explore advanced forward lighting, signalisation, and auxiliary luminaires engineered to stringent optical cutoff and thermal benchmarks.
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>View Full Catalogue</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = getCategoryIcon(cat.slug);
            return (
              <Link
                key={cat.id}
                to={`/catalog?cat=${cat.slug}`}
                className="glass-card rounded-2xl p-6 border border-slate-800 hover:border-sky-500/60 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 flex items-center justify-between text-xs font-semibold text-sky-400 border-t border-slate-800/80 mt-6">
                  <span>Explore Series</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              Flagship OEM Assemblies
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              Featured Lighting Systems
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mt-1">
              Selected assemblies delivering high photometric luminous efficacy and thermal endurance.
            </p>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
          >
            <span>Browse All {featuredProducts.length}+ SKUs</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((prod) => {
            const cat = categories.find((c) => c.id === prod.category_id);
            const vcat = vehicleCategories.find((v) => v.id === prod.vehicle_category_id);
            return (
              <ProductCard
                key={prod.id}
                product={prod}
                categoryName={cat?.name}
                vehicleCategoryName={vcat?.name}
                onEnquire={(p) => setEnquiryProduct(p)}
              />
            );
          })}
        </div>
      </section>

      {/* 5. VEHICLE SEGMENTS (5 Segments) */}
      <section className="bg-slate-900/60 border-y border-slate-800/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              Cross-Platform Mobility Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Specialized Solutions by Vehicle Segment
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              From high-speed passenger crossovers to heavy 24V mining earthmovers and direct-EV three-wheelers, our lighting modules conform to specific vehicle electrical architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {vehicleCategories.map((vcat) => {
              const Icon = getVehicleIcon(vcat.slug);
              return (
                <Link
                  key={vcat.id}
                  to={`/compatibility?vcat=${vcat.id}`}
                  className="glass-card rounded-xl p-5 border border-slate-800 hover:border-sky-500/50 flex flex-col justify-between text-center group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 mx-auto flex items-center justify-center text-sky-400 group-hover:bg-sky-500/20 group-hover:scale-105 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                      {vcat.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-snug line-clamp-3">
                      {vcat.description}
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-semibold text-sky-400 flex items-center justify-center gap-1">
                    <span>View Fitments</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. ENGINEERING & R&D SHOWCASE (Inspired by Neolite ZKW) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              Photometrics & Laboratory Rigor
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Tier-1 Quality Systems & Environmental Validation
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              AutoLuma prototypes and production assemblies undergo rigorous multi-axis environmental qualification. Utilizing type-A goniophotometer tunnels, salt-spray corrosion chambers, and thermal shock ovens, every beam meets or exceeds global homologation thresholds.
            </p>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Type-A Goniophotometer Lab: </span>
                  <span className="text-slate-400">
                    High-accuracy optical intensity mapping, isocandela verification, and anti-glare cutoff analysis.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Environmental Thermal Cycling: </span>
                  <span className="text-slate-400">
                    Rapid -40°C to +105°C thermal shock endurance testing ensuring zero lens fogging or driver degradation.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Hermetic IP67 / IP69K Sealing: </span>
                  <span className="text-slate-400">
                    Automated liquid silicone gasketing and Gore-Tex pressure equalizing breather membranes.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500/50 text-sky-300 hover:text-white text-sm font-semibold transition-all"
              >
                <span>Read Full Engineering & Lab Standards</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                alt="Optical testing lab"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-75"></div>
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-700/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-sky-400 font-bold uppercase">
                    Test Chamber: Photometric Bench 04
                  </span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Calibrated
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  ECE R112 Left-Hand Cutoff gradient: 0.14 lux max above cutoff threshold.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM OEM RFQ CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-sky-950/60 border border-sky-500/30 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono">
            Direct OEM Application Engineering
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
            Ready to Engineer or Spec Custom Lighting for Your Vehicle Platform?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Our optical and mechanical engineers collaborate with automotive OEMs and fleet operators to provide 3D CAD models, photometric simulations, and compliance samples.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact?type=oem_development"
              className="px-8 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-xl shadow-sky-500/25 transition-all"
            >
              Submit OEM Project RFQ
            </Link>
            <Link
              to="/compatibility"
              className="px-8 py-3.5 bg-slate-950 text-slate-200 hover:text-white font-semibold text-sm rounded-xl border border-slate-700 hover:border-slate-500 transition-all"
            >
              Check Compatibility Engine
            </Link>
          </div>
        </div>
      </section>

      {/* Global Enquiry Modal */}
      <EnquiryModal
        product={enquiryProduct}
        isOpen={!!enquiryProduct}
        onClose={() => setEnquiryProduct(null)}
      />
    </div>
  );
};
