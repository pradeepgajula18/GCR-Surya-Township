export type PlotStatus = 'available' | 'reserved' | 'sold';

export type PlotFacing = 'East' | 'West' | 'North' | 'South' | 'North-East' | 'Corner';

export interface Plot {
  id: string;
  plot_number: string;
  area_sq_yards: number;
  area_cents: number;
  dimensions: string; // e.g. "33' x 50'"
  facing: PlotFacing;
  road_width: string; // e.g. "40 Feet" or "33 Feet"
  status: PlotStatus;
  price_per_sq_yd?: number;
  total_price?: number;
  is_corner?: boolean;
  notes?: string;
  boundary_svg?: string;
  // SVG layout attributes for interactive map
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  created_at?: string;
  updated_at?: string;
}

export interface HeroVideo {
  id: string;
  title: string;
  video_url: string;
  poster_url?: string;
  badge_text?: string;
  headline?: string;
  subheadline?: string;
  is_active: boolean;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectHighlight {
  id: string;
  title: string;
  description: string;
  metric?: string;
  metric_label?: string;
  icon_name: string;
  order_index: number;
}

export interface Amenity {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  image_url?: string;
  category: string;
  order_index: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Drone Views' | 'Ground Progress' | 'Master Plan' | 'Amenities' | 'Entrance';
  media_type: 'image' | 'video';
  media_url: string;
  thumbnail_url?: string;
  order_index: number;
  created_at?: string;
}

export interface SiteVisitRequest {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  preferred_date: string;
  preferred_time_slot: string;
  interested_plot_number?: string;
  pickup_location?: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  admin_notes?: string;
  created_at: string;
}

export interface ProjectSettings {
  contact_phone: string;
  whatsapp_number: string;
  developer_name: string;
  client_name: string;
  office_address: string;
  total_plots_count: string;
  road_specs: string;
  pricing_note: string;
}

export interface Enquiry {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  admin_notes?: string;
  created_at: string;
}


