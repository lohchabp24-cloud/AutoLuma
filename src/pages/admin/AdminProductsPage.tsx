import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  X, 
  Check, 
  SlidersHorizontal,
  Wand2,
  AlertCircle
} from 'lucide-react';
import { Product, Category, VehicleCategory } from '../../types';
import { 
  getProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  getCategories, 
  getVehicleCategories 
} from '../../services/dataService';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [vehicleCategories, setVehicleCategories] = useState<VehicleCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form fields
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [vehicleCategoryId, setVehicleCategoryId] = useState('');
  const [opticalTech, setOpticalTech] = useState('');
  const [lumens, setLumens] = useState(4500);
  const [wattage, setWattage] = useState(45);
  const [voltage, setVoltage] = useState('12V DC');
  const [colorTemperature, setColorTemperature] = useState(6000);
  const [beamPattern, setBeamPattern] = useState('ECE R112 Asymmetric Cutoff');
  const [ipRating, setIpRating] = useState('IP67');
  const [certifications, setCertifications] = useState('ECE R112, DOT SAE, AIS-012');
  const [housingMaterial, setHousingMaterial] = useState('Die-cast Aluminium ADC12');
  const [lensMaterial, setLensMaterial] = useState('Optical Grade Polycarbonate UV-Coated');
  const [operatingTemp, setOperatingTemp] = useState('-40°C to +85°C');
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [priceEstimate, setPriceEstimate] = useState(12000);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [prods, cats, vcats] = await Promise.all([
      getProducts(),
      getCategories(),
      getVehicleCategories(),
    ]);
    setProducts(prods);
    setCategories(cats);
    setVehicleCategories(vcats);
    if (cats.length > 0 && !categoryId) setCategoryId(cats[0].id);
    if (vcats.length > 0 && !vehicleCategoryId) setVehicleCategoryId(vcats[0].id);
    setIsLoading(false);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setSku('');
    setName('');
    setOpticalTech('Bi-LED Precision Projector');
    setLumens(5500);
    setWattage(50);
    setVoltage('12V DC (9V-16V Operating)');
    setColorTemperature(6000);
    setBeamPattern('ECE R112 Asymmetric Sharp Cutoff');
    setIpRating('IP67');
    setCertifications('ECE R112, DOT SAE J583, AIS-012');
    setHousingMaterial('Die-cast Aluminium ADC12');
    setLensMaterial('Optical Grade Polycarbonate UV-Coated');
    setOperatingTemp('-40°C to +85°C');
    setDescription('');
    setFeaturesText('Integrated thermal foldback protection\nSealed Gore-Tex condensation breather\nDirect plug-and-play harness');
    setImageUrl('https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80');
    setPriceEstimate(14500);
    setIsFeatured(false);
    setIsActive(true);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setSku(p.sku);
    setName(p.name);
    setCategoryId(p.category_id);
    setVehicleCategoryId(p.vehicle_category_id);
    setOpticalTech(p.optical_tech);
    setLumens(p.lumens);
    setWattage(p.wattage);
    setVoltage(p.voltage);
    setColorTemperature(p.color_temperature);
    setBeamPattern(p.beam_pattern);
    setIpRating(p.ip_rating);
    setCertifications(p.certifications);
    setHousingMaterial(p.housing_material);
    setLensMaterial(p.lens_material);
    setOperatingTemp(p.operating_temp);
    setDescription(p.description);
    setFeaturesText(p.features.join('\n'));
    setImageUrl(p.image_url);
    setPriceEstimate(p.price_estimate);
    setIsFeatured(p.is_featured);
    setIsActive(p.is_active);
    setFormError('');
    setIsModalOpen(true);
  };

  const generateSmartSku = () => {
    const cat = categories.find((c) => c.id === categoryId);
    let code = 'HL';
    if (cat?.slug === 'tail-lamps') code = 'TL';
    else if (cat?.slug === 'fog-lamps') code = 'FL';
    else if (cat?.slug === 'drls') code = 'DRL';
    else if (cat?.slug === 'signal-lamps') code = 'SL';
    else if (cat?.slug === 'auxiliary-lighting') code = 'AUX';

    const rand = Math.floor(1000 + Math.random() * 9000);
    const newSku = `AL-${code}-${rand}-X`;
    setSku(newSku);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sku || !name || !description || !categoryId || !vehicleCategoryId) {
      setFormError('Please fill in all mandatory product information.');
      return;
    }

    const featuresArray = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const payload = {
      sku: sku.trim().toUpperCase(),
      name,
      slug,
      category_id: categoryId,
      vehicle_category_id: vehicleCategoryId,
      optical_tech: opticalTech,
      lumens: Number(lumens),
      wattage: Number(wattage),
      voltage,
      color_temperature: Number(colorTemperature),
      beam_pattern: beamPattern,
      ip_rating: ipRating,
      certifications,
      housing_material: housingMaterial,
      lens_material: lensMaterial,
      operating_temp: operatingTemp,
      description,
      features: featuresArray,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
      gallery: [imageUrl],
      price_estimate: Number(priceEstimate),
      is_featured: isFeatured,
      is_active: isActive,
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, payload);
    } else {
      await addProduct(payload);
    }

    setIsModalOpen(false);
    await loadData();
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    setDeleteConfirmId(null);
    await loadData();
  };

  const filteredProducts = products.filter((p) => {
    if (selectedCategory && p.category_id !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.optical_tech.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Product & SKU Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain catalogue master records, photometric parameters, and active SKU statuses.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-sky-500/25 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product SKU</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by SKU code, name or optical technology..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
        >
          <option value="">All Categories ({products.length})</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3.5">SKU & Identification</th>
                <th className="p-3.5">Category & Segment</th>
                <th className="p-3.5">Photometrics</th>
                <th className="p-3.5">Electrical / Voltage</th>
                <th className="p-3.5">Certifications</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No products matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => {
                  const cat = categories.find((c) => c.id === prod.category_id);
                  const vcat = vehicleCategories.find((v) => v.id === prod.vehicle_category_id);
                  return (
                    <tr key={prod.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image_url}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-slate-900 shrink-0"
                          />
                          <div>
                            <span className="font-mono font-bold text-sky-400 block">
                              {prod.sku}
                            </span>
                            <span className="font-semibold text-white truncate block max-w-xs">
                              {prod.name}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-slate-200 font-medium">{cat?.name || 'Lighting'}</div>
                        <div className="text-[11px] text-slate-400">{vcat?.name || 'Universal'}</div>
                      </td>
                      <td className="p-3.5 font-mono">
                        <div className="text-white font-bold">{prod.lumens.toLocaleString()} lm</div>
                        <div className="text-[11px] text-amber-400">{prod.color_temperature}K • {prod.wattage}W</div>
                      </td>
                      <td className="p-3.5 text-slate-300">
                        <div>{prod.voltage}</div>
                        <div className="text-[11px] text-emerald-400 font-mono">{prod.ip_rating}</div>
                      </td>
                      <td className="p-3.5 text-slate-400 max-w-xs truncate">
                        {prod.certifications}
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          prod.is_active
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {prod.is_active ? 'Active' : 'Archived'}
                        </span>
                        {prod.is_featured && (
                          <span className="block mt-1 text-[9px] font-mono text-amber-300">
                            ★ Featured
                          </span>
                        )}
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`/products/${prod.slug || prod.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                            title="Preview on Public Site"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => openEditModal(prod)}
                            className="p-1.5 text-sky-400 hover:text-sky-300 rounded hover:bg-slate-800"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(prod.id)}
                            className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-slate-800"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-bold text-white">Confirm SKU Deletion</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to delete this product? All corresponding inventory and vehicle compatibility links will also be purged.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-2xl w-full my-8 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">
                {editingProduct ? 'Edit Lighting Product' : 'Register New Automotive Lighting SKU'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-500/15 border border-red-500/30 text-xs text-red-300 rounded-lg">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4">
              {/* SKU & Generator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-300">Part SKU *</label>
                    <button
                      type="button"
                      onClick={generateSmartSku}
                      className="text-[11px] font-mono text-sky-400 hover:underline flex items-center gap-1"
                    >
                      <Wand2 className="w-3 h-3" /> Auto-Gen SKU
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. AL-HL-9010-PRO"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. VortexBeam 9000 Bi-LED Headlamp"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Category & Vehicle Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Lighting Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Primary Vehicle Segment *</label>
                  <select
                    value={vehicleCategoryId}
                    onChange={(e) => setVehicleCategoryId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  >
                    {vehicleCategories.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optical Tech & Beam Pattern */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Optical Technology *</label>
                  <input
                    type="text"
                    value={opticalTech}
                    onChange={(e) => setOpticalTech(e.target.value)}
                    placeholder="e.g. Bi-LED Dual TIR Precision Lens"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Beam Pattern *</label>
                  <input
                    type="text"
                    value={beamPattern}
                    onChange={(e) => setBeamPattern(e.target.value)}
                    placeholder="e.g. ECE R112 Sharp Left/Right Cutoff"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Lumens, Wattage, Voltage */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Lumens (lm)</label>
                  <input
                    type="number"
                    value={lumens}
                    onChange={(e) => setLumens(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Power (Watts)</label>
                  <input
                    type="number"
                    value={wattage}
                    onChange={(e) => setWattage(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Voltage Rating</label>
                  <input
                    type="text"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                    placeholder="12V / 24V"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Color Temp, Ingress, Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Color Temp (K)</label>
                  <input
                    type="number"
                    value={colorTemperature}
                    onChange={(e) => setColorTemperature(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Ingress Rating</label>
                  <input
                    type="text"
                    value={ipRating}
                    onChange={(e) => setIpRating(e.target.value)}
                    placeholder="IP67"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Certifications</label>
                  <input
                    type="text"
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                    placeholder="ECE R112, DOT SAE"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Technical Description *</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Comprehensive technical summary for OEM engineers..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-sky-500 resize-none"
                ></textarea>
              </div>

              {/* Features (one per line) */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Features Bullet Points (one per line)
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Enter engineering features, one per line..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-sky-500 resize-none"
                ></textarea>
              </div>

              {/* Image URL & Estimated Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Estimated Unit Price (₹)</label>
                  <input
                    type="number"
                    value={priceEstimate}
                    onChange={(e) => setPriceEstimate(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded accent-sky-500"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded accent-sky-500"
                  />
                  <span>Active in Public Catalogue</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold uppercase rounded-lg shadow-md shadow-sky-500/20"
                >
                  {editingProduct ? 'Update Product Record' : 'Save & Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
