import React from 'react';
import { Link } from 'react-router-dom';
import { 
  SunMedium, 
  Zap, 
  Shield, 
  ArrowRight, 
  Layers, 
  CheckCircle2 
} from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  categoryName?: string;
  vehicleCategoryName?: string;
  onEnquire?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  categoryName,
  vehicleCategoryName,
  onEnquire,
}) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden flex flex-col group border border-slate-800 hover:border-sky-500/50 transition-all duration-300">
      {/* Product Image Box */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2 py-0.5 text-[11px] font-mono font-bold uppercase rounded bg-slate-950/80 text-sky-300 border border-sky-400/30 backdrop-blur-md">
            {product.sku}
          </span>
          {product.is_featured && (
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md">
              Featured OEM
            </span>
          )}
        </div>

        {/* Optical Tech Pill */}
        <div className="absolute bottom-2.5 left-3 right-3">
          <span className="inline-block text-[11px] font-medium text-slate-300 bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded border border-slate-700/60 truncate max-w-full">
            {product.optical_tech}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <span className="text-sky-400">{categoryName || 'Automotive Lighting'}</span>
            {vehicleCategoryName && (
              <>
                <span>•</span>
                <span>{vehicleCategoryName}</span>
              </>
            )}
          </div>

          <Link to={`/products/${product.slug || product.id}`}>
            <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Key Technical Specs Grid */}
        <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-800/80 text-center">
          <div className="bg-slate-900/60 rounded p-1.5 border border-slate-800">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <SunMedium className="w-3 h-3 text-amber-400" />
              <span>Lumens</span>
            </div>
            <div className="text-xs font-mono font-bold text-white mt-0.5">
              {product.lumens.toLocaleString()} lm
            </div>
          </div>

          <div className="bg-slate-900/60 rounded p-1.5 border border-slate-800">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <Zap className="w-3 h-3 text-sky-400" />
              <span>Power</span>
            </div>
            <div className="text-xs font-mono font-bold text-white mt-0.5">
              {product.wattage}W
            </div>
          </div>

          <div className="bg-slate-900/60 rounded p-1.5 border border-slate-800">
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>Ingress</span>
            </div>
            <div className="text-xs font-mono font-bold text-white mt-0.5">
              {product.ip_rating.split(' ')[0]}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <Link
            to={`/products/${product.slug || product.id}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-xs font-semibold text-slate-200 border border-slate-700/80 hover:border-sky-500/50 transition-all"
          >
            <span>Specs & Fitment</span>
            <ArrowRight className="w-3.5 h-3.5 text-sky-400" />
          </Link>

          {onEnquire ? (
            <button
              onClick={() => onEnquire(product)}
              className="px-3 py-2 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all shrink-0"
              title="Request RFQ / Sample"
            >
              RFQ
            </button>
          ) : (
            <Link
              to={`/contact?sku=${encodeURIComponent(product.sku)}&product=${encodeURIComponent(product.name)}`}
              className="px-3 py-2 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 border border-sky-500/30 text-xs font-semibold transition-all shrink-0"
              title="Request RFQ / Sample"
            >
              RFQ
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
