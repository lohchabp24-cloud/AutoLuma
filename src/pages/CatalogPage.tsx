import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Grid, 
  List, 
  RotateCcw, 
  SunMedium, 
  Zap, 
  ShieldCheck, 
  Check,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { Product, Category, VehicleCategory } from '../types';
import { getProducts, getCategories, getVehicleCategories } from '../services/dataService';
import { ProductCard } from '../components/common/ProductCard';
import { EnquiryModal } from '../components/common/EnquiryModal';

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [vehicleCategories, setVehicleCategories] = useState<VehicleCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('cat') || '');
  const [selectedVehicleCategory, setSelectedVehicleCategory] = useState<string>(searchParams.get('vcat') || '');
  const [selectedVoltage, setSelectedVoltage] = useState<string>('');
  const [selectedIp, setSelectedIp] = useState<string>('');
  const [minLumens, setMinLumens] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'featured' | 'lumens-desc' | 'lumens-asc' | 'wattage-desc' | 'sku'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Active Enquiry Modal product
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const [prods, cats, vcats] = await Promise.all([
        getProducts(),
        getCategories(),
        getVehicleCategories(),
      ]);
      setProducts(prods);
      setCategories(cats);
      setVehicleCategories(vcats);
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Update state if URL parameters change
  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat) setSelectedCategory(cat);
    const vcat = searchParams.get('vcat');
    if (vcat) setSelectedVehicleCategory(vcat);
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // 1. Search Query (name, SKU, optical tech, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesSku = prod.sku.toLowerCase().includes(q);
        const matchesTech = prod.optical_tech.toLowerCase().includes(q);
        const matchesDesc = prod.description.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesTech && !matchesDesc) return false;
      }

      // 2. Product Category
      if (selectedCategory) {
        // match by id or slug
        const catObj = categories.find((c) => c.slug === selectedCategory || c.id === selectedCategory);
        if (catObj && prod.category_id !== catObj.id) return false;
      }

      // 3. Vehicle Category
      if (selectedVehicleCategory) {
        const vcatObj = vehicleCategories.find((v) => v.slug === selectedVehicleCategory || v.id === selectedVehicleCategory);
        if (vcatObj && prod.vehicle_category_id !== vcatObj.id) return false;
      }

      // 4. Voltage
      if (selectedVoltage) {
        if (!prod.voltage.toLowerCase().includes(selectedVoltage.toLowerCase())) return false;
      }

      // 5. IP Rating
      if (selectedIp) {
        if (!prod.ip_rating.toLowerCase().includes(selectedIp.toLowerCase())) return false;
      }

      // 6. Min Lumens
      if (minLumens > 0 && prod.lumens < minLumens) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.is_featured === b.is_featured) return 0;
        return a.is_featured ? -1 : 1;
      }
      if (sortBy === 'lumens-desc') return b.lumens - a.lumens;
      if (sortBy === 'lumens-asc') return a.lumens - b.lumens;
      if (sortBy === 'wattage-desc') return b.wattage - a.wattage;
      if (sortBy === 'sku') return a.sku.localeCompare(b.sku);
      return 0;
    });
  }, [products, searchQuery, selectedCategory, selectedVehicleCategory, selectedVoltage, selectedIp, minLumens, sortBy, categories, vehicleCategories]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedVehicleCategory('');
    setSelectedVoltage('');
    setSelectedIp('');
    setMinLumens(0);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(
    searchQuery || selectedCategory || selectedVehicleCategory || selectedVoltage || selectedIp || minLumens > 0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
            <Layers className="w-3.5 h-3.5" />
            <span>OEM Lighting Portfolio</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Product Catalogue & Technical Specifications
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse precision Bi-LED projectors, light-guide clusters, fog optics, and signalisation assemblies with verified fitment specs.
          </p>
        </div>

        {/* View mode toggle & total count */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-slate-400">
            Showing <span className="text-white font-bold">{filteredProducts.length}</span> of {products.length} Assemblies
          </div>
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Search & Quick Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search Input */}
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by part name, SKU (e.g. AL-HL-9010), optical technology, or feature..."
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="md:col-span-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
          >
            <option value="featured">Sort by: Featured First</option>
            <option value="lumens-desc">Lumens: Highest to Lowest</option>
            <option value="lumens-asc">Lumens: Lowest to Highest</option>
            <option value="wattage-desc">Power: Highest Wattage</option>
            <option value="sku">SKU Code (A - Z)</option>
          </select>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:col-span-3 flex items-center gap-2">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="w-full md:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-medium text-slate-200"
          >
            <Filter className="w-4 h-4 text-sky-400" />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors shrink-0"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Layout (Sidebar Filters + Results Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Filters Sidebar */}
        <aside className={`lg:block ${showFiltersMobile ? 'block' : 'hidden'} space-y-6`}>
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider font-mono">
                <SlidersHorizontal className="w-4 h-4 text-sky-400" />
                <span>Filter Engine</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-sky-400 hover:text-sky-300"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* 1. Lighting Product Category */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-mono">
                Lighting Category
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    !selectedCategory ? 'bg-sky-500/15 text-sky-300 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>All Categories</span>
                  <span>{products.length}</span>
                </button>
                {categories.map((cat) => {
                  const count = products.filter((p) => p.category_id === cat.id).length;
                  const isSelected = selectedCategory === cat.slug || selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(isSelected ? '' : cat.slug)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        isSelected ? 'bg-sky-500/15 text-sky-300 font-bold border border-sky-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <span className="text-[11px] font-mono opacity-60 ml-2">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Vehicle Segment */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-mono">
                Vehicle Segment
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedVehicleCategory('')}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    !selectedVehicleCategory ? 'bg-sky-500/15 text-sky-300 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>All Segments</span>
                </button>
                {vehicleCategories.map((vcat) => {
                  const count = products.filter((p) => p.vehicle_category_id === vcat.id).length;
                  const isSelected = selectedVehicleCategory === vcat.slug || selectedVehicleCategory === vcat.id;
                  return (
                    <button
                      key={vcat.id}
                      onClick={() => setSelectedVehicleCategory(isSelected ? '' : vcat.slug)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                        isSelected ? 'bg-sky-500/15 text-sky-300 font-bold border border-sky-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                      }`}
                    >
                      <span className="truncate">{vcat.name}</span>
                      <span className="text-[11px] font-mono opacity-60 ml-2">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Voltage Architecture */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-mono">
                Operating Voltage
              </h4>
              <select
                value={selectedVoltage}
                onChange={(e) => setSelectedVoltage(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-sky-500"
              >
                <option value="">Any Voltage</option>
                <option value="12V">12V Passenger / 2W Standard</option>
                <option value="24V">24V Commercial Heavy Haul</option>
                <option value="48V">Direct EV High-Voltage (36V-72V)</option>
              </select>
            </div>

            {/* 4. Minimum Luminous Flux (Lumens) */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
                <span>Min Lumens</span>
                <span className="text-sky-400">{minLumens > 0 ? `${minLumens} lm` : 'Any'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={minLumens}
                onChange={(e) => setMinLumens(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0 lm</span>
                <span>5,000 lm</span>
                <span>10,000+ lm</span>
              </div>
            </div>

            {/* 5. Ingress Protection (IP Rating) */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 font-mono">
                Ingress Protection
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['IP67', 'IP68', 'IP69K'].map((ip) => (
                  <button
                    key={ip}
                    type="button"
                    onClick={() => setSelectedIp(selectedIp === ip ? '' : ip)}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-all ${
                      selectedIp === ip
                        ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {ip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Results List / Grid */}
        <main className="lg:col-span-3">
          {isLoading ? (
            <div className="py-24 text-center space-y-4">
              <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-sm text-slate-400 font-mono">Querying AutoLuma Product Catalogue...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 mx-auto flex items-center justify-center text-slate-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">No Matching Lighting Assemblies Found</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                No products match the selected filter combination. Try adjusting your search query or reset the filters to browse the entire catalogue.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const cat = categories.find((c) => c.id === product.category_id);
                const vcat = vehicleCategories.find((v) => v.id === product.vehicle_category_id);
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={cat?.name}
                    vehicleCategoryName={vcat?.name}
                    onEnquire={(p) => setEnquiryProduct(p)}
                  />
                );
              })}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {filteredProducts.map((product) => {
                const cat = categories.find((c) => c.id === product.category_id);
                const vcat = vehicleCategories.find((v) => v.id === product.vehicle_category_id);
                return (
                  <div
                    key={product.id}
                    className="glass-card rounded-xl p-4 sm:p-5 border border-slate-800 hover:border-sky-500/50 flex flex-col sm:flex-row items-center gap-5 transition-all"
                  >
                    <div className="w-full sm:w-44 aspect-video rounded-lg overflow-hidden bg-slate-900 shrink-0">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2 text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-slate-950 text-sky-400 border border-sky-400/30">
                          {product.sku}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {cat?.name} • {vcat?.name}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-slate-300 pt-1">
                        <span>Flux: <strong className="text-white">{product.lumens} lm</strong></span>
                        <span>Power: <strong className="text-white">{product.wattage}W</strong></span>
                        <span>Voltage: <strong className="text-white">{product.voltage}</strong></span>
                        <span>Ingress: <strong className="text-emerald-400">{product.ip_rating.split(' ')[0]}</strong></span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                      <a
                        href={`/products/${product.slug || product.id}`}
                        className="flex-1 sm:flex-none px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 text-center rounded-lg"
                      >
                        Details
                      </a>
                      <button
                        onClick={() => setEnquiryProduct(product)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-xs font-semibold text-sky-400 rounded-lg"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Global RFQ modal */}
      <EnquiryModal
        product={enquiryProduct}
        isOpen={!!enquiryProduct}
        onClose={() => setEnquiryProduct(null)}
      />
    </div>
  );
};
