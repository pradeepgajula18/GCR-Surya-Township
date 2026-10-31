-- ==========================================================
-- GCR SURYA TOWNSHIP, KOILAKUNTLA - COMPLETE SUPABASE SCHEMA
-- Developer: SUDHEER DEVELOPERS (G. Sudheer Reddy)
-- Website: https://suryatownship.vercel.app
-- Contact: +91 94402 99999
-- ==========================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. HERO VIDEOS TABLE
CREATE TABLE IF NOT EXISTS public.hero_videos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    video_url TEXT NOT NULL,
    poster_url TEXT,
    badge_text TEXT DEFAULT 'RERA & DTCP Norms Compliant',
    headline TEXT DEFAULT 'Luxury Gated Community Township in Koilakuntla',
    subheadline TEXT DEFAULT 'Prime open residential plots with 40ft & 33ft BT roads, underground drainage, and immediate spot registration.',
    is_active BOOLEAN DEFAULT false,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_hero_videos_active ON public.hero_videos(is_active);

-- 2. PLOTS INVENTORY TABLE (Coordinates, dimensions, layout shapes)
CREATE TABLE IF NOT EXISTS public.plots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plot_number VARCHAR(30) UNIQUE NOT NULL,
    area_sq_yards NUMERIC(10, 2) NOT NULL,
    area_cents NUMERIC(10, 2) NOT NULL,
    dimensions VARCHAR(50) NOT NULL,
    facing VARCHAR(30) NOT NULL, -- 'East', 'West', 'North', 'South', 'North-East', 'Corner'
    road_width VARCHAR(30) DEFAULT '40 Feet',
    status VARCHAR(20) NOT NULL DEFAULT 'available', -- 'available', 'reserved', 'sold'
    price_per_sq_yd NUMERIC(12, 2),
    total_price NUMERIC(14, 2),
    is_corner BOOLEAN DEFAULT false,
    boundary_svg TEXT,
    x NUMERIC(10, 2) DEFAULT 100,
    y NUMERIC(10, 2) DEFAULT 100,
    width NUMERIC(10, 2) DEFAULT 75,
    height NUMERIC(10, 2) DEFAULT 55,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_plots_status ON public.plots(status);
CREATE INDEX IF NOT EXISTS idx_plots_number ON public.plots(plot_number);

-- 3. PROJECT HIGHLIGHTS TABLE
CREATE TABLE IF NOT EXISTS public.project_highlights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    metric TEXT,
    metric_label TEXT,
    icon_name TEXT NOT NULL,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. AMENITIES TABLE
CREATE TABLE IF NOT EXISTS public.amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    image_url TEXT,
    category TEXT DEFAULT 'Infrastructure',
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. GALLERY ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Drone Views', 'Ground Progress', 'Master Plan', 'Amenities', 'Entrance'
    media_type TEXT NOT NULL DEFAULT 'image', -- 'image', 'video'
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. SITE VISITS TABLE
CREATE TABLE IF NOT EXISTS public.site_visits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    preferred_date DATE NOT NULL,
    preferred_time_slot TEXT NOT NULL,
    interested_plot_number TEXT,
    pickup_location TEXT,
    notes TEXT,
    status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new', -- 'new', 'in_progress', 'resolved'
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. PROJECT SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.project_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enables direct sync between Admin dashboard and public view
-- without requiring email/password auth sessions
-- ==========================================================
ALTER TABLE public.hero_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_settings ENABLE ROW LEVEL SECURITY;

-- Clean existing policies
DROP POLICY IF EXISTS "Public can read active hero videos" ON public.hero_videos;
DROP POLICY IF EXISTS "Admins full access to hero videos" ON public.hero_videos;
DROP POLICY IF EXISTS "Allow all hero_videos access" ON public.hero_videos;

DROP POLICY IF EXISTS "Public can read plots inventory" ON public.plots;
DROP POLICY IF EXISTS "Admins full access to plots" ON public.plots;
DROP POLICY IF EXISTS "Allow all plots access" ON public.plots;

DROP POLICY IF EXISTS "Public can read highlights" ON public.project_highlights;
DROP POLICY IF EXISTS "Admins full access to highlights" ON public.project_highlights;
DROP POLICY IF EXISTS "Allow all highlights access" ON public.project_highlights;

DROP POLICY IF EXISTS "Public can read amenities" ON public.amenities;
DROP POLICY IF EXISTS "Admins full access to amenities" ON public.amenities;
DROP POLICY IF EXISTS "Allow all amenities access" ON public.amenities;

DROP POLICY IF EXISTS "Public can read gallery" ON public.gallery_items;
DROP POLICY IF EXISTS "Admins full access to gallery" ON public.gallery_items;
DROP POLICY IF EXISTS "Allow all gallery access" ON public.gallery_items;

DROP POLICY IF EXISTS "Public can read project settings" ON public.project_settings;
DROP POLICY IF EXISTS "Admins full access to project settings" ON public.project_settings;
DROP POLICY IF EXISTS "Allow all settings access" ON public.project_settings;

DROP POLICY IF EXISTS "Public can insert site visits" ON public.site_visits;
DROP POLICY IF EXISTS "Admins full access to site visits" ON public.site_visits;
DROP POLICY IF EXISTS "Allow all site_visits access" ON public.site_visits;

DROP POLICY IF EXISTS "Public can insert enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Admins full access to enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Allow all enquiries access" ON public.enquiries;

-- UNIVERSAL POLICIES FOR INSTANT REAL-TIME CLOUD SYNC
CREATE POLICY "Allow all hero_videos access" ON public.hero_videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all plots access" ON public.plots FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all highlights access" ON public.project_highlights FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all amenities access" ON public.amenities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all gallery access" ON public.gallery_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all site_visits access" ON public.site_visits FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all enquiries access" ON public.enquiries FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all settings access" ON public.project_settings FOR ALL USING (true) WITH CHECK (true);

-- ==========================================================
-- STORAGE BUCKETS SETUP (township-media)
-- ==========================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('township-media', 'township-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Access Township Media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload Township Media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update Township Media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete Township Media" ON storage.objects;
DROP POLICY IF EXISTS "Allow all storage select" ON storage.objects;
DROP POLICY IF EXISTS "Allow all storage insert" ON storage.objects;
DROP POLICY IF EXISTS "Allow all storage update" ON storage.objects;
DROP POLICY IF EXISTS "Allow all storage delete" ON storage.objects;

CREATE POLICY "Allow all storage select" ON storage.objects FOR SELECT USING (bucket_id = 'township-media');
CREATE POLICY "Allow all storage insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'township-media');
CREATE POLICY "Allow all storage update" ON storage.objects FOR UPDATE USING (bucket_id = 'township-media');
CREATE POLICY "Allow all storage delete" ON storage.objects FOR DELETE USING (bucket_id = 'township-media');

-- ==========================================================
-- ENABLE SUPABASE REALTIME REPLICATION FOR LIVE SYNC
-- ==========================================================
DO $$
BEGIN
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.hero_videos;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.plots;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.project_settings;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.gallery_items;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.site_visits;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.enquiries;
  EXCEPTION WHEN duplicate_object THEN NULL;
  END;
END $$;
