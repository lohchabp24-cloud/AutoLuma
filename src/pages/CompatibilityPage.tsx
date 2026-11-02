import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  CheckCircle2, 
  SlidersHorizontal, 
  ArrowRight, 
  Car, 
  AlertCircle, 
  RotateCcw,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { 
  VehicleCategory, 
  VehicleManufacturer, 
  VehicleModel, 
  Category, 
  Product,
  ProductCompatibility
} from '../types';
import { 
  getVehicleCategories, 
  getManufacturers, 
  getVehicleModels, 
  getCategories, 
  findCompatibleProducts 
} from '../services/dataService';
import { ProductCard } from '../components/common/ProductCard';
import { EnquiryModal } from '../components/common/EnquiryModal';

export const CompatibilityPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [vehicleCategories, setVehicleCategories] = useState<VehicleCategory[]>([]);
  const [manufacturers, setManufacturers] = useState<VehicleManufacturer[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);

  // Selection states
  const [selectedVcat, setSelectedVcat] = useState<string>(searchParams.get('vcat') || '');
  const [selectedMfg, setSelectedMfg] = useState<string>(searchParams.get('mfg') || '');
  const [selectedMod, setSelectedMod] = useState<string>(searchParams.get('mod') || '');
  const [selectedYear, setSelectedYear] = useState<string>(searchParams.get('year') || '');
  const [selectedProductCat, setSelectedProductCat] = useState<string>('');

  // Results state
  const [results, setResults] = useState<{
    product: Product;
    compatibility: ProductCompatibility;
    model: VehicleModel;
    manufacturer?: VehicleManufacturer;
  }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Enquiry modal
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadMeta() {
      const [cats, vcats, mfgs, mods] = await Promise.all([
        getCategories(),
        getVehicleCategories(),
        getManufacturers(),
        getVehicleModels(),
      ]);
      setCategories(cats);
      setVehicleCategories(vcats);
      setManufacturers(mfgs);
      setModels(mods);

      // If initial parameters were present in URL, trigger search automatically
      const initVcat = searchParams.get('vcat');
      const initMfg = searchParams.get('mfg');
      const initMod = searchParams.get('mod');
      const initYear = searchParams.get('year');

      if (initVcat || initMfg || initMod) {
        runSearch({
          vehicleCategoryId: initVcat || undefined,
          manufacturerId: initMfg || undefined,
          modelId: initMod || undefined,
          year: initYear ? Number(initYear) : undefined,
        });
      } else {
        // Run broad search to show sample matches immediately
        runSearch({});
      }
    }
    loadMeta();
  }, []);

  // Filter models based on selected category and manufacturer
  const availableModels = models.filter((m) => {
    if (selectedVcat && m.vehicle_category_id !== selectedVcat) return false;
    if (selectedMfg && m.manufacturer_id !== selectedMfg) return false;
    return true;
  });

  const activeModelObj = models.find((m) => m.id === selectedMod);
  const startYear = activeModelObj?.year_start || 2017;
  const endYear = activeModelObj?.year_end || new Date().getFullYear();
  const yearOptions: number[] = [];
  for (let y = endYear; y >= startYear; y--) {
    yearOptions.push(y);
  }

  const runSearch = async (overrideParams?: {
    vehicleCategoryId?: string;
    manufacturerId?: string;
    modelId?: string;
    year?: number;
    productCategoryId?: string;
  }) => {
    setIsSearching(true);
    const params = overrideParams || {
      vehicleCategoryId: selectedVcat || undefined,
      manufacturerId: selectedMfg || undefined,
      modelId: selectedMod || undefined,
      year: selectedYear ? Number(selectedYear) : undefined,
      productCategoryId: selectedProductCat || undefined,
    };

    const res = await findCompatibleProducts(params);
    setResults(res);
    setHasSearched(true);
    setIsSearching(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query: Record<string, string> = {};
    if (selectedVcat) query.vcat = selectedVcat;
    if (selectedMfg) query.mfg = selectedMfg;
    if (selectedMod) query.mod = selectedMod;
    if (selectedYear) query.year = selectedYear;
    setSearchParams(query);

    runSearch();
  };

  const handleReset = () => {
    setSelectedVcat('');
    setSelectedMfg('');
    setSelectedMod('');
    setSelectedYear('');
    setSelectedProductCat('');
    setSearchParams({});
    runSearch({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono">
          <Compass className="w-3.5 h-3.5" />
          <span>Vehicle Fitment & Compatibility Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Find 100% Verified Lighting for Your Exact Vehicle Platform
        </h1>
        <p className="text-sm text-slate-300">
          Filter by vehicle segment, manufacturer, model, and year to reveal guaranteed optical cutoff alignments, harness plugs, and direct OEM mounting compatibilities.
        </p>
      </div>

      {/* Main Fitment Form Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-sky-500/25 shadow-2xl relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Vehicle Segment */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. Vehicle Segment
              </label>
              <select
                value={selectedVcat}
                onChange={(e) => {
                  setSelectedVcat(e.target.value);
                  setSelectedMod('');
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
              >
                <option value="">All Segments (PV, CV, 2W...)</option>
                {vehicleCategories.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Manufacturer */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                2. Manufacturer (Make)
              </label>
              <select
                value={selectedMfg}
                onChange={(e) => {
                  setSelectedMfg(e.target.value);
                  setSelectedMod('');
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
              >
                <option value="">All Vehicle Makes</option>
                {manufacturers.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Model */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                3. Vehicle Model
              </label>
              <select
                value={selectedMod}
                onChange={(e) => setSelectedMod(e.target.value)}
                disabled={availableModels.length === 0}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500 disabled:opacity-50"
              >
                <option value="">
                  {availableModels.length === 0 ? 'Select Make First' : 'All Vehicle Models'}
                </option>
                {availableModels.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Model Year */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
                4. Production Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
              >
                <option value="">All Model Years</option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>
                    {y} Model Year
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Lighting Category Filter Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 mr-1">Filter Type:</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedProductCat('');
                  runSearch({ productCategoryId: undefined });
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  !selectedProductCat
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All Components
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    const next = selectedProductCat === c.id ? '' : c.id;
                    setSelectedProductCat(next);
                    runSearch({ productCategoryId: next || undefined });
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedProductCat === c.id
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {(selectedVcat || selectedMfg || selectedMod || selectedYear || selectedProductCat) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                  <span>Clear Filters</span>
                </button>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/25 flex items-center gap-2 transition-all"
              >
                <Search className="w-4 h-4" />
                <span>Verify Fitment</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Selected Vehicle Profile Indicator if model is chosen */}
      {selectedMod && activeModelObj && (
        <div className="p-4 rounded-xl bg-slate-900/90 border border-sky-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-sky-400 font-bold uppercase">
                Active Vehicle Fitment Profile
              </div>
              <h3 className="text-base font-bold text-white">
                {manufacturers.find((m) => m.id === activeModelObj.manufacturer_id)?.name} {activeModelObj.name}
              </h3>
              <p className="text-xs text-slate-400">
                Platform: {activeModelObj.platform || 'OEM Standard'} • Model Years: {activeModelObj.year_start} to {activeModelObj.year_end || 'Current'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Fitment Verified Database</span>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between pt-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Verified Compatible Assemblies
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {results.length} lighting product assemblies matched to selected vehicle criteria
          </p>
        </div>
      </div>

      {/* Results Grid / Table */}
      {isSearching ? (
        <div className="py-24 text-center space-y-4">
          <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-slate-400 font-mono">Verifying optical and mechanical fitment...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-slate-800 space-y-4 max-w-xl mx-auto">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Direct Compatibility Records Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We did not find pre-mapped assemblies for this specific vehicle and component filter. Our OEM engineering department customizes brackets and optic modules on request.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded-lg hover:text-white"
            >
              Reset Filters
            </button>
            <Link
              to="/contact?type=oem_development"
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-xs font-semibold text-white rounded-lg"
            >
              Request Custom OEM Engineering
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(({ product, compatibility, model, manufacturer }) => {
            const cat = categories.find((c) => c.id === product.category_id);
            return (
              <div
                key={compatibility.id}
                className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-sky-500/50 flex flex-col justify-between group transition-all"
              >
                {/* Product Image */}
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-mono font-bold text-sky-400 border border-sky-400/30">
                    {product.sku}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-500/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Fit Guaranteed</span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs text-sky-400 font-medium">
                      {cat?.name || 'Lighting Assembly'}
                    </span>
                    <Link to={`/products/${product.slug || product.id}`}>
                      <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Fitment Specific Details */}
                    <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs space-y-1">
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400 font-mono text-[11px]">Fitment Position:</span>
                        <span className="font-semibold text-white truncate max-w-[170px]">
                          {compatibility.fitment_position}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span className="text-slate-400 font-mono text-[11px]">Vehicle:</span>
                        <span className="font-medium text-sky-300">
                          {manufacturer?.name} {model.name} ({compatibility.year_start}-{compatibility.year_end || 'Present'})
                        </span>
                      </div>
                      {compatibility.notes && (
                        <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800">
                          {compatibility.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-800">
                    <Link
                      to={`/products/${product.slug || product.id}`}
                      className="flex-1 py-2 px-3 text-center rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700 text-xs font-semibold text-slate-200"
                    >
                      View Specs
                    </Link>
                    <button
                      onClick={() => setEnquiryProduct(product)}
                      className="py-2 px-4 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all shadow-md shadow-sky-500/20"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Global RFQ modal */}
      <EnquiryModal
        product={enquiryProduct}
        isOpen={!!enquiryProduct}
        onClose={() => setEnquiryProduct(null)}
      />
    </div>
  );
};
