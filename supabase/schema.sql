-- ====================================================================
-- AUTOLUME DATABASE SCHEMA
-- Automotive Lighting Product Catalogue and Compatibility Management System
-- Database: PostgreSQL (Supabase Compatible)
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
    CREATE TYPE enquiry_type_enum AS ENUM ('general', 'oem_development', 'rfq_quote', 'sample_request', 'fleet_bulk');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE enquiry_status_enum AS ENUM ('new', 'in_review', 'quoted', 'resolved', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE inventory_status_enum AS ENUM ('in_stock', 'low_stock', 'out_of_stock', 'backordered');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PRODUCT LIGHTING CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. VEHICLE CATEGORIES
CREATE TABLE IF NOT EXISTS vehicle_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    icon VARCHAR(50),
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. VEHICLE MANUFACTURERS (OEMs)
CREATE TABLE IF NOT EXISTS vehicle_manufacturers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    country VARCHAR(100) DEFAULT 'India',
    logo_url TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. VEHICLE MODELS
CREATE TABLE IF NOT EXISTS vehicle_models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    manufacturer_id UUID NOT NULL REFERENCES vehicle_manufacturers(id) ON DELETE CASCADE,
    vehicle_category_id UUID NOT NULL REFERENCES vehicle_categories(id) ON DELETE RESTRICT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    year_start INT NOT NULL,
    year_end INT, -- NULL signifies current production
    platform VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(manufacturer_id, name, year_start)
);

-- 7. PRODUCTS (Lighting Assemblies & Modules)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sku VARCHAR(60) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    vehicle_category_id UUID NOT NULL REFERENCES vehicle_categories(id) ON DELETE RESTRICT,
    optical_tech VARCHAR(100) NOT NULL, -- e.g. "Bi-LED Matrix", "Micro-Optic DRL", "Homogeneous Light Guide"
    lumens INT NOT NULL,
    wattage INT NOT NULL,
    voltage VARCHAR(50) DEFAULT '12V / 24V Auto-Select',
    color_temperature INT DEFAULT 6000, -- in Kelvin (e.g. 3000K, 4300K, 6000K)
    beam_pattern VARCHAR(100) NOT NULL, -- e.g. "ECE R112 Left Hand Cutoff", "Asymmetric Wide Low Beam"
    ip_rating VARCHAR(20) DEFAULT 'IP67',
    certifications VARCHAR(255) DEFAULT 'ECE R112, DOT SAE, AIS-012',
    housing_material VARCHAR(100) DEFAULT 'Die-cast Aluminium ADC12',
    lens_material VARCHAR(100) DEFAULT 'Optical Grade Polycarbonate (UV-Hardcoated)',
    operating_temp VARCHAR(50) DEFAULT '-40°C to +85°C',
    description TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    image_url TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    price_estimate NUMERIC(10,2) DEFAULT 0.00,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PRODUCT VEHICLE COMPATIBILITY (Fitment Matrix)
CREATE TABLE IF NOT EXISTS product_compatibilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    vehicle_model_id UUID NOT NULL REFERENCES vehicle_models(id) ON DELETE CASCADE,
    fitment_position VARCHAR(100) NOT NULL, -- e.g. "Front Left / Right Assembly", "Rear Combined Outer"
    year_start INT NOT NULL,
    year_end INT, -- NULL = Present
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(product_id, vehicle_model_id, fitment_position)
);

-- 9. INVENTORY RECORDS
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE UNIQUE,
    stock_quantity INT NOT NULL DEFAULT 0,
    min_threshold INT NOT NULL DEFAULT 20,
    warehouse_bin VARCHAR(50) DEFAULT 'A-01-01',
    status inventory_status_enum DEFAULT 'in_stock',
    last_restocked_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CUSTOMER ENQUIRIES / RFQs
CREATE TABLE IF NOT EXISTS customer_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enquiry_type enquiry_type_enum DEFAULT 'general',
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(150),
    vehicle_interest VARCHAR(200),
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    status enquiry_status_enum DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. INDEXES FOR QUERY OPTIMIZATION
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_vehicle_cat ON products(vehicle_category_id);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_compat_product ON product_compatibilities(product_id);
CREATE INDEX IF NOT EXISTS idx_compat_model ON product_compatibilities(vehicle_model_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON customer_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_inventory_status ON inventory(status);

-- 12. ROW LEVEL SECURITY (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_compatibilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_enquiries ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Vehicle Categories" ON vehicle_categories FOR SELECT USING (true);
CREATE POLICY "Public Read Vehicle Manufacturers" ON vehicle_manufacturers FOR SELECT USING (true);
CREATE POLICY "Public Read Vehicle Models" ON vehicle_models FOR SELECT USING (true);
CREATE POLICY "Public Read Active Products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Compatibilities" ON product_compatibilities FOR SELECT USING (true);
CREATE POLICY "Public Read Inventory Summary" ON inventory FOR SELECT USING (true);

-- Public Write for Inquiries
CREATE POLICY "Public Submit Enquiries" ON customer_enquiries FOR INSERT WITH CHECK (true);

-- Admin Full Access Policies (Authenticated)
CREATE POLICY "Admin All Categories" ON categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Vehicle Categories" ON vehicle_categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Manufacturers" ON vehicle_manufacturers FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Models" ON vehicle_models FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Products" ON products FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Compatibilities" ON product_compatibilities FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Inventory" ON inventory FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Enquiries" ON customer_enquiries FOR ALL TO authenticated USING (true);
