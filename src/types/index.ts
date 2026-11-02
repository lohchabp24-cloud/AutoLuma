export type ProductCategoryId = 
  | 'headlamps' 
  | 'tail-lamps' 
  | 'fog-lamps' 
  | 'drls' 
  | 'signal-lamps' 
  | 'auxiliary-lighting';

export type VehicleCategoryId = 
  | 'two-wheelers' 
  | 'three-wheelers' 
  | 'passenger-vehicles' 
  | 'commercial-vehicles' 
  | 'off-road-vehicles';

export interface Category {
  id: string;
  name: string;
  slug: ProductCategoryId;
  description: string;
  icon: string;
  display_order: number;
}

export interface VehicleCategory {
  id: string;
  name: string;
  slug: VehicleCategoryId;
  description: string;
  icon: string;
  display_order: number;
}

export interface VehicleManufacturer {
  id: string;
  name: string;
  slug: string;
  country: string;
  logo_url?: string;
  display_order: number;
}

export interface VehicleModel {
  id: string;
  manufacturer_id: string;
  vehicle_category_id: string;
  name: string;
  slug: string;
  year_start: number;
  year_end?: number | null; // null represents current
  platform?: string;
  manufacturer?: VehicleManufacturer;
  vehicle_category?: VehicleCategory;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category_id: string;
  vehicle_category_id: string;
  optical_tech: string;
  lumens: number;
  wattage: number;
  voltage: string;
  color_temperature: number; // in Kelvin
  beam_pattern: string;
  ip_rating: string;
  certifications: string;
  housing_material: string;
  lens_material: string;
  operating_temp: string;
  description: string;
  features: string[];
  image_url: string;
  gallery: string[];
  price_estimate: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
  // joined relations
  category?: Category;
  vehicle_category?: VehicleCategory;
}

export interface ProductCompatibility {
  id: string;
  product_id: string;
  vehicle_model_id: string;
  fitment_position: string;
  year_start: number;
  year_end?: number | null;
  notes?: string;
  vehicle_model?: VehicleModel;
  product?: Product;
}

export type InventoryStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'backordered';

export interface InventoryRecord {
  id: string;
  product_id: string;
  stock_quantity: number;
  min_threshold: number;
  warehouse_bin: string;
  status: InventoryStatus;
  last_restocked_at: string;
  product?: Product;
}

export type EnquiryType = 'general' | 'oem_development' | 'rfq_quote' | 'sample_request' | 'fleet_bulk';
export type EnquiryStatus = 'new' | 'in_review' | 'quoted' | 'resolved' | 'archived';

export interface CustomerEnquiry {
  id: string;
  enquiry_type: EnquiryType;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  vehicle_interest?: string;
  product_id?: string;
  message: string;
  status: EnquiryStatus;
  admin_notes?: string;
  created_at: string;
  product?: Product;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'engineer' | 'viewer';
}
