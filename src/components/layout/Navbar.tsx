import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Lightbulb, 
  Search, 
  SlidersHorizontal, 
  ShieldCheck, 
  Building2, 
  Mail, 
  Lock, 
  Menu, 
  X,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { label: 'Catalogue', path: '/catalog', icon: SlidersHorizontal },
    { label: 'Fitment Finder', path: '/compatibility', icon: Compass },
    { label: 'Engineering & Lab', path: '/about', icon: ShieldCheck },
    { label: 'Contact & RFQ', path: '/contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
      {/* Top micro status bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/40 px-4 py-1.5 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Tier-1 Photometric Compliance: ECE R112 | DOT SAE | AIS-012
            </span>
            <span className="hidden md:inline text-slate-600">•</span>
            <span className="hidden md:inline text-slate-400">
              Autonomous Compatibility Engine v2.4
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/admin" 
              className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors font-mono"
            >
              <Lock className="w-3 h-3" />
              {isAuthenticated ? (
                <span className="flex items-center gap-1">
                  <span>Admin ({user?.email.split('@')[0]})</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                </span>
              ) : (
                <span>Admin Portal</span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center shadow-lg shadow-sky-500/20 border border-sky-400/40 group-hover:border-sky-300 transition-all">
              <Lightbulb className="w-6 h-6 text-white stroke-[2.2]" />
              <div className="absolute -inset-0.5 rounded-xl bg-sky-400/20 blur-sm group-hover:bg-sky-400/40 transition-all -z-10"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-white">
                  AUTO<span className="text-sky-400">LUMA</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold font-mono tracking-wider uppercase bg-sky-500/10 text-sky-400 border border-sky-500/30 rounded">
                  OEM TECH
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide uppercase font-medium">
                Automotive Lighting Systems
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-inner-glow'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-sky-400' : 'text-slate-400'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Fitment Finder & Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/compatibility"
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 text-sky-300 border border-slate-700/80 hover:border-sky-500/50 hover:bg-slate-850 transition-all"
            >
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Vehicle Fitment Search</span>
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20 hover:from-sky-400 hover:to-blue-500 transition-all"
            >
              <span>Request OEM Quote</span>
            </Link>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                  active
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 text-sky-400" />
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/compatibility"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-sky-300 border border-slate-700 text-sm font-medium"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              Fitment Finder Tool
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-sky-500 text-white text-sm font-semibold"
            >
              Request OEM Quote / Sample
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
