import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Plus, 
  Search, 
  Trash2, 
  ExternalLink, 
  Car, 
  X, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { 
  ProductCompatibility, 
  Product, 
  VehicleModel, 
  VehicleManufacturer, 
  VehicleCategory 
} from '../../types';
import { 
  getCompatibilities, 
  getProducts, 
  getVehicleModels, 
  getManufacturers, 
  getVehicleCategories, 
  addCompatibility, 
  deleteCompatibility,
  addVehicleModel 
} from '../../services/dataService';

export const AdminCompatibilityPage: React.FC = () => {
  const [compatibilities, setCompatibilities] = useState<ProductCompatibility[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [manufacturers, setManufacturers] = useState<VehicleManufacturer[]>([]);
  const [vehicleCategories, setVehicleCategories] = useState<VehicleCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMfg, setFilterMfg] = useState('');

  // Modals
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isNewModelModalOpen, setIsNewModelModalOpen] = useState(false);

  // New Link Form
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [fitmentPosition, setFitmentPosition] = useState('Front Left & Right Headlamp Assembly');
  const [yearStart, setYearStart] = useState(2020);
  const [yearEnd, setYearEnd] = useState<string>('');
  const [notes, setNotes] = useState('Direct OEM replacement. CAN-bus error-free.');

  // New Model Form
  const [newModelMfgId, setNewModelMfgId] = useState('');
  const [newModelVcatId, setNewModelVcatId] = useState('');
  const [newModelName, setNewModelName] = useState('');
  const [newModelPlatform, setNewModelPlatform] = useState('');
  const [newModelYearStart, setNewModelYearStart] = useState(2022);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [comps, prods, mods, mfgs, vcats] = await Promise.all([
      getCompatibilities(),
      getProducts(),
      getVehicleModels(),
      getManufacturers(),
      getVehicleCategories(),
    ]);
    setCompatibilities(comps);
    setProducts(prods);
    setModels(mods);
    setManufacturers(mfgs);
    setVehicleCategories(vcats);

    if (prods.length > 0 && !selectedProductId) setSelectedProductId(prods[0].id);
    if (mods.length > 0 && !selectedModelId) setSelectedModelId(mods[0].id);
    if (mfgs.length > 0 && !newModelMfgId) setNewModelMfgId(mfgs[0].id);
    if (vcats.length > 0 && !newModelVcatId) setNewModelVcatId(vcats[0].id);

    setIsLoading(false);
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || !selectedModelId || !fitmentPosition) return;

    await addCompatibility({
      product_id: selectedProductId,
      vehicle_model_id: selectedModelId,
      fitment_position: fitmentPosition,
      year_start: Number(yearStart),
      year_end: yearEnd ? Number(yearEnd) : null,
      notes,
    });

    setIsLinkModalOpen(false);
    await loadData();
  };

  const handleCreateModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModelMfgId || !newModelVcatId || !newModelName) return;

    const slug = newModelName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await addVehicleModel({
      manufacturer_id: newModelMfgId,
      vehicle_category_id: newModelVcatId,
      name: newModelName,
      slug,
      year_start: Number(newModelYearStart),
      platform: newModelPlatform,
    });

    setIsNewModelModalOpen(false);
    setNewModelName('');
    setNewModelPlatform('');
    await loadData();
  };

  const handleDeleteLink = async (id: string) => {
    await deleteCompatibility(id);
    await loadData();
  };

  // Filtered compatibilities
  const filteredCompatibilities = compatibilities.filter((comp) => {
    const prod = products.find((p) => p.id === comp.product_id);
    const mod = models.find((m) => m.id === comp.vehicle_model_id);
    const mfg = mod ? manufacturers.find((m) => m.id === mod.manufacturer_id) : null;

    if (filterMfg && mod?.manufacturer_id !== filterMfg) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchProd = prod?.name.toLowerCase().includes(q) || prod?.sku.toLowerCase().includes(q);
      const matchMod = mod?.name.toLowerCase().includes(q);
      const matchMfg = mfg?.name.toLowerCase().includes(q);
      const matchPos = comp.fitment_position.toLowerCase().includes(q);
      if (!matchProd && !matchMod && !matchMfg && !matchPos) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Vehicle Fitment & Compatibility Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Map lighting assemblies to specific OEM vehicle makes, models, year ranges, and mounting positions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewModelModalOpen(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <Car className="w-4 h-4 text-sky-400" />
            <span>Add Vehicle Model</span>
          </button>

          <button
            onClick={() => setIsLinkModalOpen(true)}
            className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-sky-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Link New Compatibility</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by vehicle model, manufacturer, product SKU or position..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <select
          value={filterMfg}
          onChange={(e) => setFilterMfg(e.target.value)}
          className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
        >
          <option value="">All Vehicle Makes ({manufacturers.length})</option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">Vehicle Make & Model</th>
                <th className="p-3.5">Lighting Assembly (Product SKU)</th>
                <th className="p-3.5">Fitment Position</th>
                <th className="p-3.5">Model Years</th>
                <th className="p-3.5">Fitment Notes</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {filteredCompatibilities.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No compatibility records found.
                  </td>
                </tr>
              ) : (
                filteredCompatibilities.map((comp) => {
                  const prod = products.find((p) => p.id === comp.product_id);
                  const mod = models.find((m) => m.id === comp.vehicle_model_id);
                  const mfg = mod ? manufacturers.find((m) => m.id === mod.manufacturer_id) : null;
                  return (
                    <tr key={comp.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-white">
                          {mfg?.name} {mod?.name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Platform: {mod?.platform || 'Standard'}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-mono text-sky-400 font-bold">
                          {prod?.sku || comp.product_id}
                        </div>
                        <div className="text-slate-300 font-medium truncate max-w-xs">
                          {prod?.name}
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-200 font-medium">
                        {comp.fitment_position}
                      </td>
                      <td className="p-3.5 font-mono text-slate-300">
                        {comp.year_start} - {comp.year_end || 'Present'}
                      </td>
                      <td className="p-3.5 text-slate-400 max-w-xs truncate">
                        {comp.notes || 'Verified OEM fit.'}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => handleDeleteLink(comp.id)}
                          className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-slate-800"
                          title="Unlink Compatibility"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Link Compatibility Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                Map Lighting Product to Vehicle Model
              </h3>
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLink} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Select Product Assembly *
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.sku} — {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Select Target Vehicle Model *
                </label>
                <select
                  value={selectedModelId}
                  onChange={(e) => setSelectedModelId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  {models.map((m) => {
                    const mfg = manufacturers.find((mf) => mf.id === m.manufacturer_id);
                    return (
                      <option key={m.id} value={m.id}>
                        {mfg?.name} {m.name} ({m.year_start}-{m.year_end || 'Present'})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Fitment Location / Position *
                </label>
                <input
                  type="text"
                  required
                  value={fitmentPosition}
                  onChange={(e) => setFitmentPosition(e.target.value)}
                  placeholder="e.g. Front Left & Right Headlamp Assembly"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Start Year *
                  </label>
                  <input
                    type="number"
                    required
                    value={yearStart}
                    onChange={(e) => setYearStart(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    End Year (Blank = Current)
                  </label>
                  <input
                    type="number"
                    value={yearEnd}
                    onChange={(e) => setYearEnd(e.target.value)}
                    placeholder="Present"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Fitment & Harness Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Requires 90mm round bumper bezel or direct CAN-bus plug"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white resize-none"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLinkModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-lg"
                >
                  Save Compatibility Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Vehicle Model Modal */}
      {isNewModelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                Register New Vehicle Model Platform
              </h3>
              <button
                onClick={() => setIsNewModelModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateModel} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Manufacturer *
                </label>
                <select
                  value={newModelMfgId}
                  onChange={(e) => setNewModelMfgId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                >
                  {manufacturers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.country})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Vehicle Segment *
                </label>
                <select
                  value={newModelVcatId}
                  onChange={(e) => setNewModelVcatId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                >
                  {vehicleCategories.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Model Designation / Name *
                </label>
                <input
                  type="text"
                  required
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder="e.g. Thar ROXX 4-Door / Prima 5530"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Chassis / Platform Code
                  </label>
                  <input
                    type="text"
                    value={newModelPlatform}
                    onChange={(e) => setNewModelPlatform(e.target.value)}
                    placeholder="e.g. W601 / Heavy Live Axle"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Introduction Year *
                  </label>
                  <input
                    type="number"
                    required
                    value={newModelYearStart}
                    onChange={(e) => setNewModelYearStart(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewModelModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold rounded-lg"
                >
                  Register Vehicle Model
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
