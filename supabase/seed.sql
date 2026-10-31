-- ==========================================================
-- GCR SURYA TOWNSHIP, KOILAKUNTLA - SEED DATA
-- ==========================================================

-- 1. SEED HERO VIDEO
INSERT INTO public.hero_videos (id, title, video_url, poster_url, badge_text, headline, subheadline, is_active)
VALUES (
    'a1111111-1111-1111-1111-111111111111',
    'GCR Surya Township Cinematic Drone Reel 4K',
    'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-residential-suburb-with-houses-and-gardens-41525-large.mp4',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80',
    'DTCP & RERA Compliant Layout',
    'Elevate Your Living In Koilakuntla',
    'A landmark gated community open plotted venture developed by Sudheer Developers. 40ft & 33ft BT roads, underground drainage, and immediate spot registration.',
    true
)
ON CONFLICT (id) DO UPDATE SET is_active = true;

-- 2. SEED PROJECT HIGHLIGHTS
INSERT INTO public.project_highlights (title, description, metric, metric_label, icon_name, order_index)
VALUES
('Wide Blacktop Roads', 'Spacious 40-feet main spine roads and 33-feet internal blacktop roads engineered for smooth vehicle transit.', '40 & 33 Ft', 'BT Roadways', 'Road', 1),
('100% Clear Title', 'Crystal clear legal ownership documentation verified by premier property advocates with spot registration assistance.', '100%', 'Clear Title', 'ShieldCheck', 2),
('100% Vastu Compliant', 'Meticulously designed layouts in strictly auspicious East and West orientations adhering to traditional Vastu principles.', '100%', 'Vastu Perfect', 'Compass', 3),
('Underground Drainage', 'Modern concealed underground drainage and modern stormwater management preventing water logging.', 'UGD', 'Modern Drainage', 'Droplets', 4),
('Electric Grid & Lighting', 'Dedicated electricity distribution transformer, standard electric poles, and high-lumen solar LED street lights.', '24x7', 'Power & Streetlights', 'Zap', 5),
('Avenue Plantation', 'Lush green avenue plantation along all walkways and landscaped parks fostering clean air and serene nature.', 'Green', 'Eco Living', 'Trees', 6)
ON CONFLICT DO NOTHING;

-- 3. SEED AMENITIES
INSERT INTO public.amenities (title, description, icon_name, category, order_index)
VALUES
('Grand Entrance Arch', 'Architectural landmark entrance gate featuring 24/7 security guard cabin and boom barrier control.', 'Gate', 'Security & Grandeur', 1),
('Underground Drainage System', 'Complete underground pipe drainage network designed to international municipal standards.', 'Pipette', 'Infrastructure', 2),
('24x7 Round-the-Clock Security', 'Gated perimeter compound wall with dedicated security personnel and full CCTV surveillance coverage.', 'ShieldAlert', 'Security & Grandeur', 3),
('Landscaped Parks & Green Belts', 'Designed green open spaces with ornamental flora, meditation pavilions, and walking avenues.', 'Flower2', 'Recreation & Nature', 4),
('Overhead Water Tank & Supply', 'Dedicated 24/7 water supply pipelines connected to individual plot boundaries from central overhead storage reservoir.', 'Waves', 'Infrastructure', 5),
('Children Play Ground', 'Safe, joyful play arena fitted with modern non-toxic play gear, swings, slides, and soft turf.', 'Baby', 'Recreation & Nature', 6),
('Solar Powered LED Lighting', 'Energy-efficient automated streetlights illuminating every boulevard and intersection seamlessly.', 'SunMedium', 'Infrastructure', 7),
('Immediate Spot Registration', 'Ready for immediate document conveyance and spot registration at the Koilakuntla Sub-Registrar office.', 'FileCheck', 'Legal & Financial', 8)
ON CONFLICT DO NOTHING;

-- 4. SEED GALLERY
INSERT INTO public.gallery_items (title, category, media_type, media_url, thumbnail_url, order_index)
VALUES
('Aerial Drone Panoramic Perspective', 'Drone Views', 'image', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80', 1),
('Grand Entrance Gate Architectural Concept', 'Entrance', 'image', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80', 2),
('40-Feet Wide Blacktop Internal Roadway', 'Ground Progress', 'image', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80', 3),
('Plotted Layout Green Parkland Development', 'Amenities', 'image', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80', 4),
('Drone Flyover Survey', 'Drone Views', 'video', 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-residential-suburb-with-houses-and-gardens-41525-large.mp4', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80', 5),
('Underground Drainage Pipeline Laying', 'Ground Progress', 'image', 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=400&q=80', 6)
ON CONFLICT DO NOTHING;

