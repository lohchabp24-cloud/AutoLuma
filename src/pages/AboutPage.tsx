import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Cpu, 
  Award, 
  Layers, 
  SunMedium, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Zap,
  Globe2,
  Factory,
  Beaker,
  ThermometerSnowflake
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* 1. Header Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80"
            alt="Optical testing engineering"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
            Tier-1 Inspired Automotive Lighting Manufacturing
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineering Precision, Optical Physics & Global Homologation
          </h1>
          <p className="text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            AutoLuma is an advanced automotive lighting systems and compatibility prototype modeled after industry leaders like Neolite ZKW. We fuse computational ray tracing, die-cast aluminium thermal dissipation, and rigorous photometric goniometry.
          </p>
        </div>
      </section>

      {/* 2. Educational Prototype Note Alert */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-2xl p-6 border border-sky-500/30 bg-sky-950/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold uppercase text-sky-400">
              Architecture & Prototype Designation
            </div>
            <p className="text-sm text-slate-300">
              This system is an independent educational engineering prototype demonstrating modern automotive lighting catalogue design, real-time compatibility mapping, and relational inventory architecture. It is not an official internal system of Neolite ZKW.
            </p>
          </div>
          <Link
            to="/catalog"
            className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shrink-0 transition-all"
          >
            Explore Systems
          </Link>
        </div>
      </section>

      {/* 3. The 4 Engineering Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-sky-400">
            Automotive Lighting Methodology
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Comprehensive Optical & Environmental Validation
          </h2>
          <p className="text-sm text-slate-400">
            How our lighting units transition from mathematical ray-tracing simulations to road-ready certified modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400">
              <SunMedium className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Type-A Goniophotometer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every headlamp prototype is measured in a 25-meter dark tunnel goniometer to verify luminous intensity distribution and sharp ECE R112 low-beam horizontal cutoffs.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
              <ThermometerSnowflake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Thermal Shock Chambers</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Assemblies undergo rapid -40°C to +105°C temperature cycling with active high-beam drive to ensure LED phosphor stability and anti-condensation membrane performance.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Hermetic Sealing & IP69K</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated liquid silicone gasketing and ultrasonic weld lines survive extreme 100-bar high-pressure hot water spray down (IP69K) and fine silica dust penetration.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">CAN-bus & EMC Immunity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Compliant with CISPR 25 Class 5 radio emission limits and ISO 7637-2 electrical pulse transients, preventing dashboard bulb-out errors or GPS interference.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Standards & Homologation Matrix */}
      <section className="bg-slate-900/60 border-y border-slate-800/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-sky-400">
                Global Regulatory Homologation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Certifications & Compliance Standards
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Standardized across European, North American & Indian vehicle safety regulations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-400">ECE R112 / R149</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">Passed</span>
              </div>
              <h4 className="text-base font-bold text-white">Forward Headlamp Asymmetric Cutoff</h4>
              <p className="text-xs text-slate-400">
                Mandates strict anti-glare illuminance thresholds for oncoming traffic while maximizing 250m+ road shoulder throw.
              </p>
            </div>

            <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-400">AIS-010 / AIS-012</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">Passed</span>
              </div>
              <h4 className="text-base font-bold text-white">Automotive Industry Standards (India)</h4>
              <p className="text-xs text-slate-400">
                Full compliance with Automotive Research Association of India (ARAI) safety and endurance protocols.
              </p>
            </div>

            <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-sky-400">DOT SAE J583 / J578</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">Passed</span>
              </div>
              <h4 className="text-base font-bold text-white">Federal Motor Vehicle Safety (FMVSS 108)</h4>
              <p className="text-xs text-slate-400">
                North American DOT / SAE performance benchmarks for luminous output and color chromaticity coordinates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Direct OEM Development Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Partner With Application Engineering
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          From concept sketches to tooling DFM, rapid optical prototypes, and homologation testing, our team supports OEMs across the entire development lifecycle.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-sm rounded-xl shadow-xl shadow-sky-500/25 transition-all"
        >
          <span>Connect with OEM Engineering Team</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};
