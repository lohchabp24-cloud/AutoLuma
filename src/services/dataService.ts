import { 
  Category, 
  VehicleCategory, 
  VehicleManufacturer, 
  VehicleModel, 
  Product, 
  ProductCompatibility, 
  InventoryRecord, 
  CustomerEnquiry,
  InventoryStatus,
  EnquiryStatus
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_VEHICLE_CATEGORIES,
  INITIAL_MANUFACTURERS,
  INITIAL_VEHICLE_MODELS,
  INITIAL_PRODUCTS,
  INITIAL_COMPATIBILITIES,
  INITIAL_INVENTORY,
  INITIAL_ENQUIRIES
} from '../data/seedData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const STORAGE_KEYS = {
  CATEGORIES: 'autoluma_categories_v1',
  VEHICLE_CATEGORIES: 'autoluma_veh_categories_v1',
  MANUFACTURERS: 'autoluma_manufacturers_v1',
  MODELS: 'autoluma_models_v1',
  PRODUCTS: 'autoluma_products_v1',
  COMPATIBILITIES: 'autoluma_compatibilities_v1',
  INVENTORY: 'autoluma_inventory_v1',
  ENQUIRIES: 'autoluma_enquiries_v1',
};

// Safe local storage helpers
function getLocalItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error('LocalStorage write error', err);
  }
}

// Ensure local seed data is loaded initially
export function initializeStorageIfNeeded(): void {
  getLocalItem(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
  getLocalItem(STORAGE_KEYS.VEHICLE_CATEGORIES, INITIAL_VEHICLE_CATEGORIES);
  getLocalItem(STORAGE_KEYS.MANUFACTURERS, INITIAL_MANUFACTURERS);
  getLocalItem(STORAGE_KEYS.MODELS, INITIAL_VEHICLE_MODELS);
  getLocalItem(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  getLocalItem(STORAGE_KEYS.COMPATIBILITIES, INITIAL_COMPATIBILITIES);
  getLocalItem(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY);
  getLocalItem(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
}

// Reset data to factory seed
export function resetFactoryDemoData(): void {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(INITIAL_CATEGORIES));
  localStorage.setItem(STORAGE_KEYS.VEHICLE_CATEGORIES, JSON.stringify(INITIAL_VEHICLE_CATEGORIES));
  localStorage.setItem(STORAGE_KEYS.MANUFACTURERS, JSON.stringify(INITIAL_MANUFACTURERS));
  localStorage.setItem(STORAGE_KEYS.MODELS, JSON.stringify(INITIAL_VEHICLE_MODELS));
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(STORAGE_KEYS.COMPATIBILITIES, JSON.stringify(INITIAL_COMPATIBILITIES));
  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(INITIAL_INVENTORY));
  localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(INITIAL_ENQUIRIES));
}

// --- DATA ACCESS METHODS ---

export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('categories').select('*').order('display_order');
    if (!error && data && data.length > 0) return data as Category[];
  }
  return getLocalItem<Category[]>(STORAGE_KEYS.CATEGORIES, INITIAL_CATEGORIES);
}

export async function getVehicleCategories(): Promise<VehicleCategory[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('vehicle_categories').select('*').order('display_order');
    if (!error && data && data.length > 0) return data as VehicleCategory[];
  }
  return getLocalItem<VehicleCategory[]>(STORAGE_KEYS.VEHICLE_CATEGORIES, INITIAL_VEHICLE_CATEGORIES);
}

export async function getManufacturers(): Promise<VehicleManufacturer[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('vehicle_manufacturers').select('*').order('display_order');
    if (!error && data && data.length > 0) return data as VehicleManufacturer[];
  }
  return getLocalItem<VehicleManufacturer[]>(STORAGE_KEYS.MANUFACTURERS, INITIAL_MANUFACTURERS);
}

export async function getVehicleModels(): Promise<VehicleModel[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('vehicle_models').select('*');
    if (!error && data && data.length > 0) return data as VehicleModel[];
  }
  return getLocalItem<VehicleModel[]>(STORAGE_KEYS.MODELS, INITIAL_VEHICLE_MODELS);
}

export async function addVehicleModel(model: Omit<VehicleModel, 'id'>): Promise<VehicleModel> {
  const newModel: VehicleModel = {
    ...model,
    id: `mod-${Date.now().toString(36)}`,
  };
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('vehicle_models').insert(newModel).select().single();
    if (data) return data as VehicleModel;
  }
  const models = getLocalItem<VehicleModel[]>(STORAGE_KEYS.MODELS, INITIAL_VEHICLE_MODELS);
  models.push(newModel);
  setLocalItem(STORAGE_KEYS.MODELS, models);
  return newModel;
}

export async function getProducts(): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as Product[];
  }
  return getLocalItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug || p.id === slug) || null;
}

export async function addProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
  const id = `prod-${Date.now().toString(36)}`;
  const newProduct: Product = {
    ...product,
    id,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('products').insert(newProduct).select().single();
    if (data) {
      // Also create inventory record in supabase
      await supabase.from('inventory').insert({
        product_id: id,
        stock_quantity: 50,
        min_threshold: 20,
        warehouse_bin: 'BIN-NEW-01',
        status: 'in_stock',
      });
      return data as Product;
    }
  }

  const products = getLocalItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  products.unshift(newProduct);
  setLocalItem(STORAGE_KEYS.PRODUCTS, products);

  // Auto-create matching inventory entry
  const inventory = getLocalItem<InventoryRecord[]>(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY);
  inventory.unshift({
    id: `inv-${Date.now().toString(36)}`,
    product_id: id,
    stock_quantity: 50,
    min_threshold: 20,
    warehouse_bin: 'BIN-NEW-01',
    status: 'in_stock',
    last_restocked_at: new Date().toISOString(),
  });
  setLocalItem(STORAGE_KEYS.INVENTORY, inventory);

  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('products').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id).select().single();
    if (data) return data as Product;
  }
  const products = getLocalItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;
  const updated = { ...products[index], ...updates, updated_at: new Date().toISOString() };
  products[index] = updated;
  setLocalItem(STORAGE_KEYS.PRODUCTS, products);
  return updated;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from('products').delete().eq('id', id);
  }
  const products = getLocalItem<Product[]>(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS).filter(p => p.id !== id);
  setLocalItem(STORAGE_KEYS.PRODUCTS, products);

  // remove associated inventory and compatibilities
  const inventory = getLocalItem<InventoryRecord[]>(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY).filter(i => i.product_id !== id);
  setLocalItem(STORAGE_KEYS.INVENTORY, inventory);

  const compatibilities = getLocalItem<ProductCompatibility[]>(STORAGE_KEYS.COMPATIBILITIES, INITIAL_COMPATIBILITIES).filter(c => c.product_id !== id);
  setLocalItem(STORAGE_KEYS.COMPATIBILITIES, compatibilities);

  return true;
}

export async function getCompatibilities(): Promise<ProductCompatibility[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('product_compatibilities').select('*');
    if (!error && data && data.length > 0) return data as ProductCompatibility[];
  }
  return getLocalItem<ProductCompatibility[]>(STORAGE_KEYS.COMPATIBILITIES, INITIAL_COMPATIBILITIES);
}

export async function addCompatibility(compat: Omit<ProductCompatibility, 'id'>): Promise<ProductCompatibility> {
  const newCompat: ProductCompatibility = {
    ...compat,
    id: `comp-${Date.now().toString(36)}`,
  };
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('product_compatibilities').insert(newCompat).select().single();
    if (data) return data as ProductCompatibility;
  }
  const list = getLocalItem<ProductCompatibility[]>(STORAGE_KEYS.COMPATIBILITIES, INITIAL_COMPATIBILITIES);
  list.push(newCompat);
  setLocalItem(STORAGE_KEYS.COMPATIBILITIES, list);
  return newCompat;
}

export async function deleteCompatibility(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from('product_compatibilities').delete().eq('id', id);
  }
  const list = getLocalItem<ProductCompatibility[]>(STORAGE_KEYS.COMPATIBILITIES, INITIAL_COMPATIBILITIES).filter(c => c.id !== id);
  setLocalItem(STORAGE_KEYS.COMPATIBILITIES, list);
  return true;
}

// Vehicle Compatibility Finder Query Engine
export async function findCompatibleProducts(params: {
  vehicleCategoryId?: string;
  manufacturerId?: string;
  modelId?: string;
  year?: number;
  productCategoryId?: string;
}): Promise<{
  product: Product;
  compatibility: ProductCompatibility;
  model: VehicleModel;
  manufacturer?: VehicleManufacturer;
}[]> {
  const [products, compatibilities, models, manufacturers] = await Promise.all([
    getProducts(),
    getCompatibilities(),
    getVehicleModels(),
    getManufacturers(),
  ]);

  const results: {
    product: Product;
    compatibility: ProductCompatibility;
    model: VehicleModel;
    manufacturer?: VehicleManufacturer;
  }[] = [];

  for (const comp of compatibilities) {
    const prod = products.find(p => p.id === comp.product_id && p.is_active);
    const mod = models.find(m => m.id === comp.vehicle_model_id);
    if (!prod || !mod) continue;

    const mfg = manufacturers.find(m => m.id === mod.manufacturer_id);

    // Apply filters
    if (params.modelId && mod.id !== params.modelId) continue;
    if (params.manufacturerId && mod.manufacturer_id !== params.manufacturerId) continue;
    if (params.vehicleCategoryId && mod.vehicle_category_id !== params.vehicleCategoryId) continue;
    if (params.productCategoryId && prod.category_id !== params.productCategoryId) continue;

    if (params.year) {
      if (params.year < comp.year_start) continue;
      if (comp.year_end !== null && comp.year_end !== undefined && params.year > comp.year_end) continue;
    }

    results.push({
      product: prod,
      compatibility: comp,
      model: mod,
      manufacturer: mfg,
    });
  }

  return results;
}

// INVENTORY
export async function getInventory(): Promise<InventoryRecord[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('inventory').select('*');
    if (!error && data && data.length > 0) return data as InventoryRecord[];
  }
  return getLocalItem<InventoryRecord[]>(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY);
}

export async function updateInventoryStock(
  productId: string, 
  quantity: number, 
  warehouseBin?: string
): Promise<InventoryRecord | null> {
  let status: InventoryStatus = 'in_stock';
  const list = getLocalItem<InventoryRecord[]>(STORAGE_KEYS.INVENTORY, INITIAL_INVENTORY);
  const item = list.find(i => i.product_id === productId);
  const minThreshold = item ? item.min_threshold : 20;

  if (quantity <= 0) {
    status = 'out_of_stock';
  } else if (quantity <= minThreshold) {
    status = 'low_stock';
  } else {
    status = 'in_stock';
  }

  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from('inventory')
      .update({
        stock_quantity: quantity,
        status,
        ...(warehouseBin ? { warehouse_bin: warehouseBin } : {}),
        last_restocked_at: new Date().toISOString(),
      })
      .eq('product_id', productId)
      .select()
      .single();
    if (data) return data as InventoryRecord;
  }

  const idx = list.findIndex(i => i.product_id === productId);
  if (idx !== -1) {
    list[idx] = {
      ...list[idx],
      stock_quantity: quantity,
      status,
      ...(warehouseBin ? { warehouse_bin: warehouseBin } : {}),
      last_restocked_at: new Date().toISOString(),
    };
    setLocalItem(STORAGE_KEYS.INVENTORY, list);
    return list[idx];
  }

  // Create new if missing
  const newRecord: InventoryRecord = {
    id: `inv-${Date.now().toString(36)}`,
    product_id: productId,
    stock_quantity: quantity,
    min_threshold: 20,
    warehouse_bin: warehouseBin || 'BIN-A01',
    status,
    last_restocked_at: new Date().toISOString(),
  };
  list.push(newRecord);
  setLocalItem(STORAGE_KEYS.INVENTORY, list);
  return newRecord;
}

// ENQUIRIES
export async function getEnquiries(): Promise<CustomerEnquiry[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase.from('customer_enquiries').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as CustomerEnquiry[];
  }
  return getLocalItem<CustomerEnquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
}

export async function submitEnquiry(enquiry: Omit<CustomerEnquiry, 'id' | 'created_at' | 'status'>): Promise<CustomerEnquiry> {
  const newEnquiry: CustomerEnquiry = {
    ...enquiry,
    id: `enq-${Date.now().toString(36)}`,
    status: 'new',
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from('customer_enquiries').insert(newEnquiry).select().single();
    if (data) return data as CustomerEnquiry;
  }

  const list = getLocalItem<CustomerEnquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  list.unshift(newEnquiry);
  setLocalItem(STORAGE_KEYS.ENQUIRIES, list);
  return newEnquiry;
}

export async function updateEnquiryStatus(
  id: string, 
  status: EnquiryStatus, 
  adminNotes?: string
): Promise<CustomerEnquiry | null> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from('customer_enquiries')
      .update({ status, ...(adminNotes ? { admin_notes: adminNotes } : {}) })
      .eq('id', id)
      .select()
      .single();
    if (data) return data as CustomerEnquiry;
  }

  const list = getLocalItem<CustomerEnquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  const idx = list.findIndex(e => e.id === id);
  if (idx === -1) return null;

  list[idx] = {
    ...list[idx],
    status,
    ...(adminNotes !== undefined ? { admin_notes: adminNotes } : {}),
  };
  setLocalItem(STORAGE_KEYS.ENQUIRIES, list);
  return list[idx];
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    await supabase.from('customer_enquiries').delete().eq('id', id);
  }
  const list = getLocalItem<CustomerEnquiry[]>(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES).filter(e => e.id !== id);
  setLocalItem(STORAGE_KEYS.ENQUIRIES, list);
  return true;
}
