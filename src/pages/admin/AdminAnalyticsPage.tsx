import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Database, 
  Download, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  Layers, 
  Zap, 
  ShieldCheck,
  Package
} from 'lucide-react';
import { 
  getProducts, 
  getInventory, 
  getEnquiries, 
  getCompatibilities, 
  getCategories, 
  getVehicleCategories,
  resetFactoryDemoData 
} from '../../services/dataService';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Product, InventoryRecord, CustomerEnquiry } from '../../types';

export const AdminAnalyticsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [inventory, setInventory] = useState<InventoryRecord[]>([]);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [copiedSql, setCopiedSql] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [p, i, e] = await Promise.all([getProducts(), getInventory(), getEnquiries()]);
    setProducts(p);
    setInventory(i);
    setEnquiries(e);
  };

  // Calculations
  const totalStockUnits = inventory.reduce((sum, item) => sum + item.stock_quantity, 0);
  const totalValuation = inventory.reduce((sum, item) => {
    const prod = products.find((p) => p.id === item.product_id);
    return sum + item.stock_quantity * (prod?.price_estimate || 10000);
  }, 0);

  const avgLumens = Math.round(
    products.reduce((sum, p) => sum + p.lumens, 0) / (products.length || 1)
  );

  const avgWattage = Math.round(
    products.reduce((sum, p) => sum + p.wattage, 0) / (products.length || 1)
  );

  const handleExportJson = () => {
    const exportData = {
      exported_at: new Date().toISOString(),
      products_count: products.length,
      inventory_count: inventory.length,
      enquiries_count: enquiries.length,
      products,
      inventory,
      enquiries,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AutoLuma_Database_Export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all AutoLuma database tables to factory demo state? This will restore all standard Tier-1 assemblies and inquiries.')) {
      resetFactoryDemoData();
      setResetSuccess(true);
      loadData();
      setTimeout(() => setResetSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Analytics & Database Architecture
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Technical inventory valuation, photometric efficiency telemetry, and Supabase PostgreSQL connectivity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportJson}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-sky-400" />
            <span>Export Database JSON</span>
          </button>

          <button
            onClick={handleResetDemoData}
            className="px-4 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Seed Data</span>
          </button>
        </div>
      </div>

      {resetSuccess && (
        <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Factory demo database restored successfully with original products and inquiries.</span>
        </div>
      )}

      {/* Analytics KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Total Stock Inventory</div>
          <div className="text-3xl font-extrabold text-white font-mono">
            {totalStockUnits.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Units across all warehouse bins</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Inventory Valuation</div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">
            ₹{(totalValuation / 100000).toFixed(2)} Lakhs
          </div>
          <div className="text-xs text-slate-400">Estimated OEM catalog valuation</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Average Luminous Flux</div>
          <div className="text-3xl font-extrabold text-sky-400 font-mono">
            {avgLumens} lm
          </div>
          <div className="text-xs text-slate-400">Average forward lighting flux</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="text-xs font-mono uppercase text-slate-400">Optical Efficacy Ratio</div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono">
            {Math.round(avgLumens / (avgWattage || 1))} lm/W
          </div>
          <div className="text-xs text-slate-400">Average energy efficiency</div>
        </div>
      </div>

      {/* Supabase PostgreSQL Engine Monitor */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Supabase & PostgreSQL Storage Engine
              </h3>
              <p className="text-xs text-slate-400">
                Relational schema containing Products, Categories, Vehicle Models, Compatibilities, Inventory & Inquiries.
              </p>
            </div>
          </div>

          <div>
            {isSupabaseConfigured ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Connected to Supabase PostgreSQL Cloud
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                Resilient Local Data Engine (Zero Setup Required)
              </span>
            )}
          </div>
        </div>

        {/* Step-by-Step Supabase Connection Guide */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
            How to Link Your Own Live Supabase Project (3 Easy Steps)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-mono font-bold flex items-center justify-center">
                1
              </div>
              <div className="font-bold text-white">Create Free Project</div>
              <p className="text-slate-400 leading-relaxed">
                Log in to <strong className="text-slate-300">supabase.com</strong> and create a new project.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-mono font-bold flex items-center justify-center">
                2
              </div>
              <div className="font-bold text-white">Run SQL Schema</div>
              <p className="text-slate-400 leading-relaxed">
                Open the Supabase SQL Editor and execute the schema located in <strong className="text-slate-300 font-mono">supabase/schema.sql</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 font-mono font-bold flex items-center justify-center">
                3
              </div>
              <div className="font-bold text-white">Paste .env Keys</div>
              <p className="text-slate-400 leading-relaxed">
                Add <code className="text-sky-400 font-mono">VITE_SUPABASE_URL</code> and <code className="text-sky-400 font-mono">VITE_SUPABASE_ANON_KEY</code> to your project's <code className="font-mono text-white">.env</code> file.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
