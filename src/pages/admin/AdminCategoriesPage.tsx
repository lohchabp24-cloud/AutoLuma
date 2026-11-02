import React, { useState, useEffect } from 'react';
import { Layers, Car, SunMedium, ShieldAlert, CloudFog, Sparkles, Radio, Zap, CheckCircle2 } from 'lucide-react';
import { Category, VehicleCategory, Product } from '../../types';
import { getCategories, getVehicleCategories, getProducts } from '../../services/dataService';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [vehicleCategories, setVehicleCategories] = useState<VehicleCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'product' | 'vehicle'>('product');

  useEffect(() => {
    async function loadData() {
      const [cats, vcats, prods] = await Promise.all([
        getCategories(),
        getVehicleCategories(),
        getProducts(),
      ]);
      setCategories(cats);
      setVehicleCategories(vcats);
      setProducts(prods);
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Taxonomy & Category Management
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure lighting product classification hierarchies and vehicle sector segments.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab('product')}
          className={`px-5 py-3 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'product'
              ? 'border-sky-500 text-sky-400 bg-sky-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Product Lighting Categories ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vehicle')}
          className={`px-5 py-3 text-xs font-bold font-mono uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'vehicle'
              ? 'border-sky-500 text-sky-400 bg-sky-500/10'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Vehicle Segments ({vehicleCategories.length})</span>
        </button>
      </div>

      {/* Product Categories Tab */}
      {activeTab === 'product' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const count = products.filter((p) => p.category_id === cat.id).length;
            return (
              <div
                key={cat.id}
                className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-sky-500/10 text-sky-400 border border-sky-500/30">
                      Slug: {cat.slug}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Order: #{cat.display_order}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Active SKUs:</span>
                  <span className="font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {count} Assemblies
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Vehicle Segments Tab */}
      {activeTab === 'vehicle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicleCategories.map((vcat) => {
            const count = products.filter((p) => p.vehicle_category_id === vcat.id).length;
            return (
              <div
                key={vcat.id}
                className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Slug: {vcat.slug}
                    </span>
                    <span className="text-xs font-mono text-slate-400">Order: #{vcat.display_order}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{vcat.name}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {vcat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Indexed Assemblies:</span>
                  <span className="font-mono font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                    {count} Products
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
