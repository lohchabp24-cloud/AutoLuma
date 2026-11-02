import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  SunMedium, 
  Zap, 
  ShieldCheck, 
  Thermometer, 
  Cpu, 
  Download, 
  ArrowLeft, 
  CheckCircle2, 
  Car, 
  FileText, 
  Share2, 
  SlidersHorizontal,
  Compass,
  AlertCircle
} from 'lucide-react';
import { Product, ProductCompatibility, VehicleModel, VehicleManufacturer, Category, VehicleCategory } from '../types';
import { 
  getProductBySlug, 
  getCompatibilities, 
  getVehicleModels, 
  getManufacturers,
  getCategories,
  getVehicleCategories
} from '../services/dataService';
import { EnquiryModal } from '../components/common/EnquiryModal';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [product, setProduct] = useState<Product | null>(null);
  const [compatibilities, setCompatibilities] = useState<ProductCompatibility[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [manufacturers, setManufacturers] = useState<VehicleManufacturer[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [vehicleCategories, setVehicleCategories] = useState<VehicleCategory[]>([]);
  
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [datasheetDownloaded, setDatasheetDownloaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProductData() {
      if (!slug) return;
      setIsLoading(true);

      const [prod, allComp, allMods, allMfgs, allCats, allVcats] = await Promise.all([
        getProductBySlug(slug),
        getCompatibilities(),
        getVehicleModels(),
        getManufacturers(),
        getCategories(),
        getVehicleCategories(),
      ]);

      if (prod) {
        setProduct(prod);
        setSelectedImage(prod.image_url);
        // filter compatibilities for this product
        const matchedComp = allComp.filter((c) => c.product_id === prod.id);
        setCompatibilities(matchedComp);
      }

      setModels(allMods);
      setManufacturers(allMfgs);
      setCategories(allCats);
      setVehicleCategories(allVcats);
      setIsLoading(false);
    }
    loadProductData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm text-slate-400 font-mono">Loading technical specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Product Assembly Not Found</h2>
        <p className="text-sm text-slate-400">
          The requested automotive lighting SKU or slug "{slug}" does not exist in our active catalogue.
        </p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-sky-500 text-white font-semibold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalogue</span>
        </Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category_id);
  const vehicleCategory = vehicleCategories.find((v) => v.id === product.vehicle_category_id);

  // Gallery array
  const gallery = [product.image_url, ...(product.gallery || [])].filter(
    (item, index, self) => self.indexOf(item) === index
  );

  const handleDownloadDatasheet = () => {
    // Generate downloadable text spec sheet simulation
    const content = `====================================================================
AUTOLUMA AUTOMOTIVE LIGHTING SYSTEMS
TECHNICAL PRODUCT SPECIFICATION SHEET (OEM COMPLIANT)
====================================================================

PART NUMBER (SKU)   : ${product.sku}
PRODUCT DESIGNATION : ${product.name}
OPTICAL TECHNOLOGY  : ${product.optical_tech}
HOMOLOGATION CODES  : ${product.certifications}

PHOTOMETRIC CHARACTERISTICS:
--------------------------------------------------------------------
Luminous Output     : ${product.lumens} Lumens (measured at 25m optical tunnel)
Color Temperature   : ${product.color_temperature}K
Beam Pattern        : ${product.beam_pattern}

ELECTRICAL RATINGS:
--------------------------------------------------------------------
Operating Voltage   : ${product.voltage}
Power Consumption   : ${product.wattage} Watts
Driver Topology     : Integrated Constant Current with Reverse Polarity Protection

MECHANICAL & THERMAL:
--------------------------------------------------------------------
Housing Material    : ${product.housing_material}
Lens Substrate      : ${product.lens_material}
Ingress Rating      : ${product.ip_rating}
Operating Temp      : ${product.operating_temp}

KEY ENGINEERING HIGHLIGHTS:
${product.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

OEM VEHICLE COMPATIBILITY:
${compatibilities.map((c, i) => {
  const mod = models.find((m) => m.id === c.vehicle_model_id);
  const mfg = mod ? manufacturers.find((m) => m.id === mod.manufacturer_id) : null;
  return `${i + 1}. ${mfg?.name || ''} ${mod?.name || ''} (${c.year_start} - ${c.year_end || 'Present'}) -> ${c.fitment_position}`;
}).join('\n')}

====================================================================
AutoLuma Systems R&D | All specifications subject to test chamber validation.
====================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${product.sku}_Datasheet_AutoLuma.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setDatasheetDownloaded(true);
    setTimeout(() => setDatasheetDownloaded(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <Link to="/catalog" className="hover:text-white flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Catalogue</span>
        </Link>
        <span>/</span>
        <span className="text-sky-400">{category?.name || 'Lighting'}</span>
        <span>/</span>
        <span className="text-slate-300 truncate">{product.sku}</span>
      </div>

      {/* Main Top Layout: Gallery & Key Specs / RFQ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono font-bold text-sky-400 border border-sky-400/30">
              {product.sku}
            </div>
            <div className="absolute bottom-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-emerald-400 border border-emerald-400/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{product.certifications.split(',')[0]}</span>
            </div>
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === img
                      ? 'border-sky-500 shadow-glow-cyan'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Technical Summary Card */}
          <div className="glass-panel rounded-xl p-4 border border-slate-800 text-xs space-y-2.5">
            <div className="flex items-center justify-between text-slate-400 font-mono">
              <span>Housing Alloy</span>
              <span className="text-white font-semibold">{product.housing_material}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 font-mono">
              <span>Lens Polymer</span>
              <span className="text-white font-semibold">{product.lens_material}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 font-mono">
              <span>Thermal Threshold</span>
              <span className="text-white font-semibold">{product.operating_temp}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 font-mono">
              <span>Ingress Defense</span>
              <span className="text-emerald-400 font-bold">{product.ip_rating}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Specs Matrix, RFQ Action (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-mono font-bold">
                {product.sku}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 text-xs font-medium">
                {category?.name}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 text-xs font-medium">
                {vehicleCategory?.name}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="text-xs font-mono text-sky-400">
              Optical System: {product.optical_tech}
            </p>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* 4 Photometric KPI Boxes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-card rounded-xl p-3 border border-slate-800 text-center">
              <SunMedium className="w-4 h-4 text-amber-400 mx-auto" />
              <div className="text-base font-bold font-mono text-white mt-1">
                {product.lumens.toLocaleString()} lm
              </div>
              <div className="text-[11px] text-slate-400">Luminous Flux</div>
            </div>

            <div className="glass-card rounded-xl p-3 border border-slate-800 text-center">
              <Zap className="w-4 h-4 text-sky-400 mx-auto" />
              <div className="text-base font-bold font-mono text-white mt-1">
                {product.wattage}W
              </div>
              <div className="text-[11px] text-slate-400">Power Rating</div>
            </div>

            <div className="glass-card rounded-xl p-3 border border-slate-800 text-center">
              <Thermometer className="w-4 h-4 text-cyan-300 mx-auto" />
              <div className="text-base font-bold font-mono text-white mt-1">
                {product.color_temperature}K
              </div>
              <div className="text-[11px] text-slate-400">Color Spectrum</div>
            </div>

            <div className="glass-card rounded-xl p-3 border border-slate-800 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto" />
              <div className="text-base font-bold font-mono text-white mt-1 truncate">
                {product.ip_rating.split(' ')[0]}
              </div>
              <div className="text-[11px] text-slate-400">Ingress Seal</div>
            </div>
          </div>

          {/* Key Features List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Engineering Features & Architectures
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-slate-800">
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="flex-1 min-w-[200px] px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4" />
              <span>Request OEM Quote & Samples</span>
            </button>

            <button
              onClick={handleDownloadDatasheet}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-all"
              title="Download Certified Spec Sheet"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>{datasheetDownloaded ? 'Datasheet Saved!' : 'Download Datasheet'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Compatibility Matrix for this Product */}
      <section className="space-y-5 pt-8 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              <Compass className="w-4 h-4" />
              <span>Fitment Verification Matrix</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              Verified Vehicle Platform Compatibilities
            </h2>
          </div>
          <Link
            to="/compatibility"
            className="text-xs text-sky-400 hover:text-sky-300 font-medium inline-flex items-center gap-1"
          >
            <span>Launch Complete Fitment Finder Tool</span>
          </Link>
        </div>

        {compatibilities.length === 0 ? (
          <div className="p-8 rounded-2xl glass-panel text-center text-slate-400 text-sm">
            No specific OEM vehicle platform links are registered for this universal assembly. 
            Contact application engineering for customized CAD fitment analysis.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Vehicle Manufacturer</th>
                  <th className="p-3.5">Model Platform</th>
                  <th className="p-3.5">Model Years</th>
                  <th className="p-3.5">Fitment Location</th>
                  <th className="p-3.5">Engineering Notes</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                {compatibilities.map((comp) => {
                  const mod = models.find((m) => m.id === comp.vehicle_model_id);
                  const mfg = mod ? manufacturers.find((m) => m.id === mod.manufacturer_id) : null;
                  return (
                    <tr key={comp.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3.5 font-bold text-white">
                        {mfg?.name || 'OEM Standard'}
                      </td>
                      <td className="p-3.5 text-slate-200">
                        {mod?.name || 'General Platform'}
                      </td>
                      <td className="p-3.5 font-mono text-sky-400">
                        {comp.year_start} - {comp.year_end || 'Present'}
                      </td>
                      <td className="p-3.5 text-slate-300 font-medium">
                        {comp.fitment_position}
                      </td>
                      <td className="p-3.5 text-slate-400 max-w-xs truncate">
                        {comp.notes || 'Direct plug & play fitment verified.'}
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setIsEnquiryOpen(true)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-sky-400 hover:text-white bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded"
                        >
                          Enquire Fitment
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Global RFQ modal */}
      <EnquiryModal
        product={product}
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
};
