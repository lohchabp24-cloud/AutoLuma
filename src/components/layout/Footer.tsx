import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Lightbulb, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  ExternalLink,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-lg shadow-sky-500/20 border border-sky-400/40">
                <Lightbulb className="w-6 h-6 text-white stroke-[2.2]" />
              </div>
              <div>
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  AUTO<span className="text-sky-400">LUMA</span>
                </span>
                <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold font-mono uppercase bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded">
                  OEM SYSTEMS
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Tier-1 inspired precision automotive lighting systems, photometrics engineering, and real-time vehicle fitment compatibility verification for OEMs, fleets, and specialized mobility.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                ECE R112 & R7 Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                AIS-010 / 012 Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                <Layers className="w-3.5 h-3.5 text-emerald-400" />
                IATF 16949 Standards
              </span>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Product Systems
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/catalog?cat=headlamps" className="hover:text-sky-400 transition-colors">
                  Bi-LED Headlamps
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=tail-lamps" className="hover:text-sky-400 transition-colors">
                  3D Light-Guide Tail Lamps
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=fog-lamps" className="hover:text-sky-400 transition-colors">
                  Dual-Spectrum Fog Lamps
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=drls" className="hover:text-sky-400 transition-colors">
                  Micro-Optic DRL Blades
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=signal-lamps" className="hover:text-sky-400 transition-colors">
                  Sequential Signals & CHMSL
                </Link>
              </li>
              <li>
                <Link to="/catalog?cat=auxiliary-lighting" className="hover:text-sky-400 transition-colors">
                  Heavy-Duty Auxiliary / Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Vehicle Segments */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Vehicle Segments
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/compatibility?vcat=passenger-vehicles" className="hover:text-sky-400 transition-colors">
                  Passenger Vehicles & SUVs
                </Link>
              </li>
              <li>
                <Link to="/compatibility?vcat=commercial-vehicles" className="hover:text-sky-400 transition-colors">
                  Commercial Haulers & LCV
                </Link>
              </li>
              <li>
                <Link to="/compatibility?vcat=two-wheelers" className="hover:text-sky-400 transition-colors">
                  Motorcycles & EV 2W
                </Link>
              </li>
              <li>
                <Link to="/compatibility?vcat=three-wheelers" className="hover:text-sky-400 transition-colors">
                  Urban 3W & Electric Rickshaws
                </Link>
              </li>
              <li>
                <Link to="/compatibility?vcat=off-road-vehicles" className="hover:text-sky-400 transition-colors">
                  Mining, Off-Road & Earthmoving
                </Link>
              </li>
              <li>
                <Link to="/compatibility" className="text-sky-400 hover:text-sky-300 font-medium inline-flex items-center gap-1 mt-1">
                  Fitment Finder <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* OEM Technical Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              OEM Engineering
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-xs">
                  Automotive Lighting R&D Corridor, Gurugram / Pune, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:oem-engineering@autoluma.tech" className="hover:text-sky-300 text-xs">
                  oem-engineering@autoluma.tech
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-xs">+91 (0124) 480-LUMA (5862)</span>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-sky-500/60 text-sky-400 text-xs font-mono transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Control Center</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} AutoLuma Lighting Systems. All rights reserved.</p>
            <p className="text-slate-600">
              Disclaimer: Independent educational prototype inspired by automotive lighting leaders (e.g. Neolite ZKW). All trademarks and brand names are property of their respective owners.
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/about" className="hover:text-slate-300">Engineering Lab</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-slate-300">OEM RFQ</Link>
            <span>•</span>
            <Link to="/admin" className="hover:text-sky-400">Admin Sign In</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
