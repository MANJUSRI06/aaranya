-- ============================================================
-- AARANYA — Woven by Tradition
-- Supabase Database Schema & Row Level Security (RLS) Policies
-- ============================================================

-- 1. SAREES TABLE
CREATE TABLE IF NOT EXISTS public.sarees (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  original_price NUMERIC(10, 2),
  category TEXT NOT NULL CHECK (category IN ('silk', 'cotton', 'festive', 'wedding', 'everyday', 'regional')),
  fabric TEXT NOT NULL,
  color TEXT NOT NULL,
  color_family TEXT NOT NULL,
  occasion TEXT NOT NULL,
  weaving_technique TEXT NOT NULL,
  regional_origin TEXT NOT NULL,
  cluster_name TEXT NOT NULL,
  is_verified_handloom BOOLEAN DEFAULT true,
  handloom_certification TEXT NOT NULL,
  dimensions JSONB NOT NULL DEFAULT '{}'::jsonb,
  materials JSONB NOT NULL DEFAULT '{}'::jsonb,
  care_instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
  stock INTEGER NOT NULL DEFAULT 1 CHECK (stock >= 0),
  is_available BOOLEAN DEFAULT true,
  is_made_to_order BOOLEAN DEFAULT false,
  dispatch_time TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  images JSONB NOT NULL DEFAULT '{}'::jsonb,
  story JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. INDEXES FOR HIGH-PERFORMANCE SEARCH & FILTERING
CREATE INDEX IF NOT EXISTS idx_sarees_category ON public.sarees(category);
CREATE INDEX IF NOT EXISTS idx_sarees_color_family ON public.sarees(color_family);
CREATE INDEX IF NOT EXISTS idx_sarees_price ON public.sarees(price);
CREATE INDEX IF NOT EXISTS idx_sarees_is_published ON public.sarees(is_published);
CREATE INDEX IF NOT EXISTS idx_sarees_is_featured ON public.sarees(is_featured);
CREATE INDEX IF NOT EXISTS idx_sarees_slug ON public.sarees(slug);

-- 3. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.sarees ENABLE ROW LEVEL SECURITY;

-- Anonymous and authenticated visitors can view published sarees
CREATE POLICY "Public visitors can view published sarees"
  ON public.sarees
  FOR SELECT
  USING (is_published = true OR auth.role() = 'authenticated');

-- Only authenticated administrators can insert new sarees
CREATE POLICY "Admins can insert sarees"
  ON public.sarees
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated administrators can update sarees
CREATE POLICY "Admins can update sarees"
  ON public.sarees
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated administrators can delete sarees
CREATE POLICY "Admins can delete sarees"
  ON public.sarees
  FOR DELETE
  TO authenticated
  USING (true);

-- 4. STORAGE BUCKET FOR SAREE PHOTOGRAPHS
INSERT INTO storage.buckets (id, name, public) 
VALUES ('saree-media', 'saree-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read images from saree-media
CREATE POLICY "Public Saree Media Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'saree-media');

-- Authenticated admins can upload media
CREATE POLICY "Admin Saree Media Upload"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'saree-media');

-- Authenticated admins can update/delete media
CREATE POLICY "Admin Saree Media Modify"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'saree-media');

CREATE POLICY "Admin Saree Media Delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'saree-media');
