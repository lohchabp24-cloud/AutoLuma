import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { VehicleCategory, VehicleManufacturer, VehicleModel } from '../../types';
import { getVehicleCategories, getManufacturers, getVehicleModels } from '../../services/dataService';

interface VehicleFinderWidgetProps {
  compact?: boolean;
  onSearchSelected?: (filters: {
    vehicleCategoryId: string;
    manufacturerId: string;
    modelId: string;
    year: string;
  }) => void;
}

export const VehicleFinderWidget: React.FC<VehicleFinderWidgetProps> = ({
  compact = false,
  onSearchSelected,
}) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<VehicleCategory[]>([]);
  const [manufacturers, setManufacturers] = useState<VehicleManufacturer[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      const [cats, mfgs, mods] = await Promise.all([
        getVehicleCategories(),
        getManufacturers(),
        getVehicleModels(),
      ]);
      setCategories(cats);
      setManufacturers(mfgs);
      setModels(mods);
    }
    loadData();
  }, []);

  // Filter models based on selected category and manufacturer
  const availableModels = models.filter((m) => {
    if (selectedCategory && m.vehicle_category_id !== selectedCategory) return false;
    if (selectedManufacturer && m.manufacturer_id !== selectedManufacturer) return false;
    return true;
  });

  // Calculate year options based on selected model
  const activeModelObj = models.find((m) => m.id === selectedModel);
  const startYear = activeModelObj?.year_start || 2017;
  const endYear = activeModelObj?.year_end || new Date().getFullYear();
  const yearOptions: number[] = [];
  for (let y = endYear; y >= startYear; y--) {
    yearOptions.push(y);
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSelected) {
      onSearchSelected({
        vehicleCategoryId: selectedCategory,
        manufacturerId: selectedManufacturer,
        modelId: selectedModel,
        year: selectedYear,
      });
    } else {
      const params = new URLSearchParams();
      if (selectedCategory) params.set('vcat', selectedCategory);
      if (selectedManufacturer) params.set('mfg', selectedManufacturer);
      if (selectedModel) params.set('mod', selectedModel);
      if (selectedYear) params.set('year', selectedYear);
      navigate(`/compatibility?${params.toString()}`);
    }
  };

  return (
    <div className={`glass-panel rounded-2xl border border-sky-500/25 p-5 sm:p-7 shadow-2xl relative overflow-hidden ${compact ? '' : 'max-w-4xl mx-auto'}`}>
      {/* Top subtle glow line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Vehicle Fitment Compatibility Finder
            </h3>
            <p className="text-xs text-slate-400">
              Select your vehicle specification to discover 100% verified lighting fitments
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>OEM Verified Fitments</span>
        </div>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* 1. Vehicle Segment */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
            1. Segment
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedModel('');
            }}
            className="w-full bg-slate-900/90 text-white border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500 transition-colors"
          >
            <option value="">All Segments</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Manufacturer */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
            2. Manufacturer
          </label>
          <select
            value={selectedManufacturer}
            onChange={(e) => {
              setSelectedManufacturer(e.target.value);
              setSelectedModel('');
            }}
            className="w-full bg-slate-900/90 text-white border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500 transition-colors"
          >
            <option value="">All Makes</option>
            {manufacturers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Model */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
            3. Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={availableModels.length === 0}
            className="w-full bg-slate-900/90 text-white border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500 transition-colors disabled:opacity-50"
          >
            <option value="">
              {availableModels.length === 0 ? 'No models available' : 'Select Vehicle Model'}
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
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 font-mono">
            4. Model Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full bg-slate-900/90 text-white border border-slate-700 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-sky-500 transition-colors"
          >
            <option value="">Any Year</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y} Model
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 lg:col-span-4 mt-2 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              Optical Cutoff Verified
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              CAN-bus Plug-and-Play
            </span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-sm font-semibold rounded-lg shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>Search Compatible Lighting</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </form>
    </div>
  );
};
