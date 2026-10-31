import { createClient } from '@supabase/supabase-js';
import { Plot, HeroVideo, ProjectHighlight, Amenity, GalleryItem, SiteVisitRequest, Enquiry, ProjectSettings } from './types';
import { DEFAULT_HERO_VIDEOS, DEFAULT_PLOTS, DEFAULT_HIGHLIGHTS, DEFAULT_AMENITIES, DEFAULT_GALLERY } from './defaultData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zxnuydlxeggezzmevivr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4bnV5ZGx4ZWdnZXp6bWV2aXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzNTU0MjMsImV4cCI6MjEwODkzMTQyM30.urQlppsT_QzmqB_MUTa6HaZY3tHWzsmUUxvM0oFSu5k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Storage Bucket constant
export const TOWNSHIP_BUCKET = 'township-media';

// ---------------- HERO VIDEOS (PURE SUPABASE SYNC) ----------------
export async function getHeroVideos(): Promise<HeroVideo[]> {
  try {
    const { data, error } = await supabase
      .from('hero_videos')
      .select('*')
      .order('is_active', { ascending: false })
      .order('updated_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data as HeroVideo[];
    }
    if (error) {
      console.warn('Supabase hero_videos query warning:', error.message);
    }
  } catch (err) {
    console.error('Supabase hero_videos fetch error:', err);
  }

  // Fallback to initial seeds only if database table is completely unseeded
  return DEFAULT_HERO_VIDEOS;
}

export async function getActiveHeroVideo(): Promise<HeroVideo> {
  const videos = await getHeroVideos();
  const active = videos.find((v) => v.is_active);
  return active || videos[0] || DEFAULT_HERO_VIDEOS[0];
}

export async function saveHeroVideo(video: Partial<HeroVideo>): Promise<HeroVideo> {
  if (!video.video_url || video.video_url.trim() === '') {
    throw new Error('Video URL or uploaded media file is required.');
  }

  // Prevent local blob URLs from ever being saved to the database
  if (video.video_url.startsWith('blob:')) {
    throw new Error('Cannot save temporary browser blob URL. Please upload the file through Supabase Storage or enter a valid public video URL.');
  }

  // If activating this video, deactivate all others first in Supabase
  if (video.is_active) {
    try {
      await supabase
        .from('hero_videos')
        .update({ is_active: false })
        .neq('id', video.id || '00000000-0000-0000-0000-000000000000');
    } catch (e) {
      console.warn('Deactivating other videos error:', e);
    }
  }

  const payload = {
    title: video.title || 'Township Drone Cinematic',
    video_url: video.video_url,
    poster_url: video.poster_url || '',
    badge_text: video.badge_text || 'DTCP & RERA Compliant Plotted Venture',
    headline: video.headline || 'GCR SURYA TOWNSHIP',
    subheadline: video.subheadline || 'Ultra-Premium Gated Community Residential Plots in Koilakuntla, Andhra Pradesh.',
    is_active: video.is_active ?? true,
    updated_at: new Date().toISOString(),
  };

  // If valid UUID exists, update
  if (video.id && !video.id.startsWith('hero-')) {
    const { data, error } = await supabase
      .from('hero_videos')
      .update(payload)
      .eq('id', video.id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update hero video in Supabase: ${error.message}`);
    }
    return data as HeroVideo;
  }

  // Insert new record into Supabase
  const { data, error } = await supabase
    .from('hero_videos')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to insert hero video in Supabase: ${error.message}`);
  }
  return data as HeroVideo;
}

export async function deleteHeroVideo(id: string): Promise<boolean> {
  const { error } = await supabase.from('hero_videos').delete().eq('id', id);
  if (error) {
    throw new Error(`Failed to delete hero video from Supabase: ${error.message}`);
  }
  return true;
}

// ---------------- PLOTS INVENTORY & LAYOUT MAP (PURE SUPABASE SYNC) ----------------
export async function getPlots(): Promise<Plot[]> {
  try {
    const { data, error } = await supabase
      .from('plots')
      .select('*')
      .order('plot_number', { ascending: true });

    if (!error && data && data.length > 0) {
      return data.map((remotePlot) => {
        const defaultMatch = DEFAULT_PLOTS.find((p) => String(p.plot_number) === String(remotePlot.plot_number));
        return {
          ...defaultMatch,
          ...remotePlot,
          x: remotePlot.x !== undefined && remotePlot.x !== null ? Number(remotePlot.x) : (defaultMatch?.x || 100),
          y: remotePlot.y !== undefined && remotePlot.y !== null ? Number(remotePlot.y) : (defaultMatch?.y || 100),
          width: remotePlot.width !== undefined && remotePlot.width !== null ? Number(remotePlot.width) : (defaultMatch?.width || 75),
          height: remotePlot.height !== undefined && remotePlot.height !== null ? Number(remotePlot.height) : (defaultMatch?.height || 55),
        };
      }) as Plot[];
    }

    if (error) {
      console.warn('Supabase plots query warning:', error.message);
    }
  } catch (err) {
    console.error('Supabase plots fetch error:', err);
  }

  return DEFAULT_PLOTS;
}

export async function updatePlot(plot: Plot): Promise<Plot> {
  const payload = {
    plot_number: String(plot.plot_number),
    area_sq_yards: Number(plot.area_sq_yards),
    area_cents: Number(plot.area_cents),
    dimensions: plot.dimensions,
    facing: plot.facing,
    road_width: plot.road_width,
    status: plot.status,
    is_corner: Boolean(plot.is_corner),
    x: plot.x !== undefined ? Number(plot.x) : 100,
    y: plot.y !== undefined ? Number(plot.y) : 100,
    width: plot.width !== undefined ? Number(plot.width) : 75,
    height: plot.height !== undefined ? Number(plot.height) : 55,
    boundary_svg: plot.boundary_svg || null,
    notes: plot.notes || null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('plots')
    .upsert(payload, { onConflict: 'plot_number' })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update plot in Supabase: ${error.message}`);
  }

  return { ...plot, ...data };
}

export async function addPlot(plot: Omit<Plot, 'id'>): Promise<Plot> {
  const payload = {
    plot_number: String(plot.plot_number),
    area_sq_yards: Number(plot.area_sq_yards),
    area_cents: Number(plot.area_cents),
    dimensions: plot.dimensions,
    facing: plot.facing,
    road_width: plot.road_width,
    status: plot.status,
    is_corner: Boolean(plot.is_corner),
    x: plot.x !== undefined ? Number(plot.x) : 100,
    y: plot.y !== undefined ? Number(plot.y) : 100,
    width: plot.width !== undefined ? Number(plot.width) : 75,
    height: plot.height !== undefined ? Number(plot.height) : 55,
    boundary_svg: plot.boundary_svg || null,
    notes: plot.notes || null,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('plots')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to add plot to Supabase: ${error.message}`);
  }

  return data as Plot;
}

export async function deletePlot(plot_number: string): Promise<boolean> {
  const { error } = await supabase
    .from('plots')
    .delete()
    .eq('plot_number', plot_number);

  if (error) {
    throw new Error(`Failed to delete plot from Supabase: ${error.message}`);
  }
  return true;
}

// ---------------- EDITABLE PROJECT SETTINGS (PURE SUPABASE SYNC) ----------------
export const DEFAULT_SETTINGS: ProjectSettings = {
  contact_phone: '+91 94402 99999',
  whatsapp_number: '919440299999',
  developer_name: 'SUDHEER DEVELOPERS',
  client_name: 'G. Sudheer Reddy',
  office_address: 'GCR Surya Township, State Highway Corridor, Koilakuntla - 518134, Nandyal District, Andhra Pradesh',
  total_plots_count: '52+ Plots',
  road_specs: '40 & 33 Ft BT Roads',
  pricing_note: 'Contact for Transparent Plot Pricing',
};

export async function getProjectSettings(): Promise<ProjectSettings> {
  try {
    const { data, error } = await supabase
      .from('project_settings')
      .select('value')
      .eq('key', 'general')
      .single();

    if (!error && data?.value) {
      return { ...DEFAULT_SETTINGS, ...data.value };
    }
  } catch (err) {
    console.warn('Supabase settings query error:', err);
  }

  return DEFAULT_SETTINGS;
}

export async function saveProjectSettings(settings: Partial<ProjectSettings>): Promise<ProjectSettings> {
  const current = await getProjectSettings();
  const merged: ProjectSettings = { ...current, ...settings };

  const { error } = await supabase
    .from('project_settings')
    .upsert({
      key: 'general',
      value: merged,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error(`Failed to save settings to Supabase: ${error.message}`);
  }

  return merged;
}

// ---------------- HIGHLIGHTS & AMENITIES ----------------
export async function getHighlights(): Promise<ProjectHighlight[]> {
  try {
    const { data, error } = await supabase.from('project_highlights').select('*').order('order_index');
    if (!error && data && data.length > 0) return data as ProjectHighlight[];
  } catch (e) {
    console.warn('Supabase highlights error', e);
  }
  return DEFAULT_HIGHLIGHTS;
}

export async function getAmenities(): Promise<Amenity[]> {
  try {
    const { data, error } = await supabase.from('amenities').select('*').order('order_index');
    if (!error && data && data.length > 0) return data as Amenity[];
  } catch (e) {
    console.warn('Supabase amenities error', e);
  }
  return DEFAULT_AMENITIES;
}

// ---------------- GALLERY (PURE SUPABASE SYNC) ----------------
export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase.from('gallery_items').select('*').order('order_index');
    if (!error && data && data.length > 0) return data as GalleryItem[];
  } catch (e) {
    console.warn('Supabase gallery error', e);
  }
  return DEFAULT_GALLERY;
}

export async function addGalleryItem(item: Partial<GalleryItem>): Promise<GalleryItem> {
  const newItem = {
    title: item.title || 'Township Capture',
    category: item.category || 'Ground Progress',
    media_type: item.media_type || 'image',
    media_url: item.media_url || '',
    thumbnail_url: item.thumbnail_url || item.media_url || '',
    order_index: item.order_index || 99,
  };

  const { data, error } = await supabase
    .from('gallery_items')
    .insert([newItem])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to add gallery item to Supabase: ${error.message}`);
  }

  return data as GalleryItem;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const { error } = await supabase.from('gallery_items').delete().eq('id', id);
  if (error) {
    throw new Error(`Failed to delete gallery item from Supabase: ${error.message}`);
  }
  return true;
}

// ---------------- SITE VISITS (PURE SUPABASE SYNC) ----------------
export async function submitSiteVisit(request: Omit<SiteVisitRequest, 'id' | 'status' | 'created_at'>): Promise<SiteVisitRequest> {
  const payload = {
    full_name: request.full_name,
    phone: request.phone,
    email: request.email || null,
    preferred_date: request.preferred_date,
    preferred_time_slot: request.preferred_time_slot,
    interested_plot_number: request.interested_plot_number || null,
    pickup_location: request.pickup_location || null,
    notes: request.notes || null,
    status: 'pending',
  };

  const { data, error } = await supabase
    .from('site_visits')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to submit site visit to Supabase: ${error.message}`);
  }

  return data as SiteVisitRequest;
}

export async function getSiteVisits(): Promise<SiteVisitRequest[]> {
  try {
    const { data, error } = await supabase
      .from('site_visits')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) return data as SiteVisitRequest[];
  } catch (e) {
    console.warn('Remote site visits query error', e);
  }
  return [];
}

export async function updateSiteVisitStatus(id: string, status: SiteVisitRequest['status'], admin_notes?: string): Promise<boolean> {
  const { error } = await supabase
    .from('site_visits')
    .update({ status, admin_notes, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update site visit status in Supabase: ${error.message}`);
  }
  return true;
}

// ---------------- CUSTOMER ENQUIRIES (PURE SUPABASE SYNC) ----------------
export async function submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'status' | 'created_at'>): Promise<Enquiry> {
  const payload = {
    full_name: enquiry.full_name,
    phone: enquiry.phone,
    email: enquiry.email || null,
    subject: enquiry.subject || 'Plot Pricing Inquiry',
    message: enquiry.message,
    status: 'new',
  };

  const { data, error } = await supabase
    .from('enquiries')
    .insert([payload])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to submit enquiry to Supabase: ${error.message}`);
  }

  return data as Enquiry;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) return data as Enquiry[];
  } catch (e) {
    console.warn('Remote enquiries query error', e);
  }
  return [];
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status'], admin_notes?: string): Promise<boolean> {
  const { error } = await supabase
    .from('enquiries')
    .update({ status, admin_notes, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    throw new Error(`Failed to update enquiry in Supabase: ${error.message}`);
  }
  return true;
}

// ---------------- SUPABASE STORAGE UPLOAD (NO BLOB URLS) ----------------
export async function uploadMediaToSupabase(file: File, folder: string = 'hero'): Promise<string> {
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'mp4';
  const cleanBase = file.name.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 20);
  const fileName = `${folder}/${Date.now()}_${cleanBase}.${fileExt}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from(TOWNSHIP_BUCKET)
    .upload(fileName, file, {
      cacheControl: '31536000',
      upsert: true,
      contentType: file.type || undefined,
    });

  if (error) {
    throw new Error(
      `Supabase Storage upload failed: ${error.message}. Please check that the bucket "${TOWNSHIP_BUCKET}" exists and public upload policies are enabled in your Supabase SQL editor.`
    );
  }

  // Retrieve permanent public URL
  const { data: urlData } = supabase.storage
    .from(TOWNSHIP_BUCKET)
    .getPublicUrl(data.path);

  if (!urlData?.publicUrl) {
    throw new Error('Supabase did not return a public URL for the uploaded asset.');
  }

  return urlData.publicUrl;
}

// ---------------- REALTIME EVENT LISTENERS ----------------
export function subscribeToHeroVideos(onChange: () => void) {
  const channel = supabase
    .channel('realtime:hero_videos')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'hero_videos' }, () => {
      onChange();
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToPlots(onChange: () => void) {
  const channel = supabase
    .channel('realtime:plots')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'plots' }, () => {
      onChange();
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function subscribeToSettings(onChange: (settings: ProjectSettings) => void) {
  const channel = supabase
    .channel('realtime:settings')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'project_settings' }, async () => {
      const updated = await getProjectSettings();
      onChange(updated);
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
