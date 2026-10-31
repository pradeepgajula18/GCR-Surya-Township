import { createClient } from '@supabase/supabase-js';
import { Plot, HeroVideo, ProjectHighlight, Amenity, GalleryItem, SiteVisitRequest, Enquiry, ProjectSettings } from './types';
import { DEFAULT_HERO_VIDEOS, DEFAULT_PLOTS, DEFAULT_HIGHLIGHTS, DEFAULT_AMENITIES, DEFAULT_GALLERY } from './defaultData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zxnuydlxeggezzmevivr.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4bnV5ZGx4ZWdnZXp6bWV2aXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMzNTU0MjMsImV4cCI6MjEwODkzMTQyM30.urQlppsT_QzmqB_MUTa6HaZY3tHWzsmUUxvM0oFSu5k';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Storage Bucket constant
export const TOWNSHIP_BUCKET = 'township-media';

// Local storage key helpers for seamless fallback
const STORAGE_KEYS = {
  HERO_VIDEOS: 'gcr_surya_hero_videos',
  PLOTS: 'gcr_surya_plots',
  SITE_VISITS: 'gcr_surya_site_visits',
  ENQUIRIES: 'gcr_surya_enquiries',
  GALLERY: 'gcr_surya_gallery',
  SETTINGS: 'gcr_surya_settings',
};

// ---------------- HERO VIDEOS ----------------
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
  } catch (err) {
    console.warn('Supabase hero_videos query error, using local fallback:', err);
  }

  // Client-side local storage fallback
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.HERO_VIDEOS);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return DEFAULT_HERO_VIDEOS;
}

export async function getActiveHeroVideo(): Promise<HeroVideo> {
  const videos = await getHeroVideos();
  const active = videos.find((v) => v.is_active);
  return active || videos[0] || DEFAULT_HERO_VIDEOS[0];
}

export async function saveHeroVideo(video: Partial<HeroVideo>): Promise<HeroVideo> {
  // If activating, deactivate others
  if (video.is_active) {
    try {
      await supabase.from('hero_videos').update({ is_active: false }).neq('id', video.id || 'none');
    } catch (e) {
      console.warn('Deactivating others failed in remote DB', e);
    }
  }

  try {
    if (video.id && !video.id.startsWith('hero-')) {
      const { data, error } = await supabase
        .from('hero_videos')
        .upsert({ ...video, updated_at: new Date().toISOString() })
        .select()
        .single();
      if (!error && data) return data as HeroVideo;
    } else {
      const { data, error } = await supabase
        .from('hero_videos')
        .insert([{ ...video, updated_at: new Date().toISOString() }])
        .select()
        .single();
      if (!error && data) return data as HeroVideo;
    }
  } catch (e) {
    console.warn('Remote save failed, falling back to local store', e);
  }

  // Fallback to local storage
  if (typeof window !== 'undefined') {
    const all = await getHeroVideos();
    const updatedId = video.id || `hero-${Date.now()}`;
    const newVideo: HeroVideo = {
      id: updatedId,
      title: video.title || 'Township Cinematic Video',
      video_url: video.video_url || '',
      poster_url: video.poster_url || '',
      badge_text: video.badge_text || 'DTCP & RERA Compliant Layout',
      headline: video.headline || 'Ultra-Premium Gated Community in Koilakuntla',
      subheadline: video.subheadline || '40ft & 33ft BT roads, underground drainage, and spot registration.',
      is_active: video.is_active ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    let updatedList = all.map((v) => {
      if (newVideo.is_active) {
        return v.id === updatedId ? newVideo : { ...v, is_active: false };
      }
      return v.id === updatedId ? newVideo : v;
    });

    if (!updatedList.some((v) => v.id === updatedId)) {
      if (newVideo.is_active) {
        updatedList = updatedList.map((v) => ({ ...v, is_active: false }));
      }
      updatedList.unshift(newVideo);
    }

    localStorage.setItem(STORAGE_KEYS.HERO_VIDEOS, JSON.stringify(updatedList));
    return newVideo;
  }

  return { ...DEFAULT_HERO_VIDEOS[0], ...video } as HeroVideo;
}

export async function deleteHeroVideo(id: string): Promise<boolean> {
  try {
    await supabase.from('hero_videos').delete().eq('id', id);
  } catch (e) {
    console.warn('Remote delete failed', e);
  }

  if (typeof window !== 'undefined') {
    const all = await getHeroVideos();
    const filtered = all.filter((v) => v.id !== id);
    if (filtered.length > 0 && !filtered.some((v) => v.is_active)) {
      filtered[0].is_active = true;
    }
    localStorage.setItem(STORAGE_KEYS.HERO_VIDEOS, JSON.stringify(filtered));
  }
  return true;
}

// ---------------- PLOTS INVENTORY ----------------
export async function getPlots(): Promise<Plot[]> {
  try {
    const { data, error } = await supabase
      .from('plots')
      .select('*')
      .order('plot_number', { ascending: true });

    if (!error && data && data.length > 0) {
      // Merge with coordinate metadata if needed
      return data.map((remotePlot) => {
        const defaultMatch = DEFAULT_PLOTS.find((p) => p.plot_number === remotePlot.plot_number);
        return {
          ...defaultMatch,
          ...remotePlot,
          x: remotePlot.x || defaultMatch?.x || 100,
          y: remotePlot.y || defaultMatch?.y || 100,
          width: remotePlot.width || defaultMatch?.width || 75,
          height: remotePlot.height || defaultMatch?.height || 55,
        };
      }) as Plot[];
    }
  } catch (err) {
    console.warn('Supabase plots query error, using local fallback:', err);
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.PLOTS);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return DEFAULT_PLOTS;
}

export async function updatePlot(plot: Plot): Promise<Plot> {
  try {
    const { data, error } = await supabase
      .from('plots')
      .upsert({
        ...plot,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    if (!error && data) return data as Plot;
  } catch (e) {
    console.warn('Remote plot update failed', e);
  }

  if (typeof window !== 'undefined') {
    const all = await getPlots();
    const updatedList = all.map((p) => (p.plot_number === plot.plot_number ? { ...p, ...plot } : p));
    localStorage.setItem(STORAGE_KEYS.PLOTS, JSON.stringify(updatedList));
  }
  return plot;
}

export async function addPlot(plot: Omit<Plot, 'id'>): Promise<Plot> {
  const newPlot: Plot = {
    ...plot,
    id: `plot-${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase.from('plots').insert([newPlot]).select().single();
    if (!error && data) return data as Plot;
  } catch (e) {
    console.warn('Remote add plot failed', e);
  }

  if (typeof window !== 'undefined') {
    const all = await getPlots();
    all.push(newPlot);
    localStorage.setItem(STORAGE_KEYS.PLOTS, JSON.stringify(all));
  }
  return newPlot;
}

export async function deletePlot(plot_number: string): Promise<boolean> {
  try {
    await supabase.from('plots').delete().eq('plot_number', plot_number);
  } catch (e) {
    console.warn('Remote delete plot failed', e);
  }

  if (typeof window !== 'undefined') {
    const all = await getPlots();
    const filtered = all.filter((p) => p.plot_number !== plot_number);
    localStorage.setItem(STORAGE_KEYS.PLOTS, JSON.stringify(filtered));
  }
  return true;
}

// ---------------- EDITABLE PROJECT SETTINGS ----------------
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

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (cached) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(cached) };
      } catch (e) {
        console.error(e);
      }
    }
  }
  return DEFAULT_SETTINGS;
}

export async function saveProjectSettings(settings: Partial<ProjectSettings>): Promise<ProjectSettings> {
  const current = await getProjectSettings();
  const merged: ProjectSettings = { ...current, ...settings };

  try {
    await supabase
      .from('project_settings')
      .upsert({
        key: 'general',
        value: merged,
        updated_at: new Date().toISOString(),
      });
  } catch (e) {
    console.warn('Remote settings save failed', e);
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(merged));
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

// ---------------- GALLERY ----------------
export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase.from('gallery_items').select('*').order('order_index');
    if (!error && data && data.length > 0) return data as GalleryItem[];
  } catch (e) {
    console.warn('Supabase gallery error', e);
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return DEFAULT_GALLERY;
}

export async function addGalleryItem(item: Partial<GalleryItem>): Promise<GalleryItem> {
  const newItem: GalleryItem = {
    id: item.id || `gal-${Date.now()}`,
    title: item.title || 'Township Capture',
    category: item.category || 'Ground Progress',
    media_type: item.media_type || 'image',
    media_url: item.media_url || '',
    thumbnail_url: item.thumbnail_url || item.media_url || '',
    order_index: item.order_index || 99,
    created_at: new Date().toISOString(),
  };

  try {
    await supabase.from('gallery_items').insert([newItem]);
  } catch (e) {
    console.warn('Remote gallery insert error', e);
  }

  if (typeof window !== 'undefined') {
    const all = await getGallery();
    all.push(newItem);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(all));
  }
  return newItem;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  try {
    await supabase.from('gallery_items').delete().eq('id', id);
  } catch (e) {
    console.warn('Remote delete gallery error', e);
  }

  if (typeof window !== 'undefined') {
    const all = await getGallery();
    const filtered = all.filter((g) => g.id !== id);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(filtered));
  }
  return true;
}

// ---------------- SITE VISITS ----------------
export async function submitSiteVisit(request: Omit<SiteVisitRequest, 'id' | 'status' | 'created_at'>): Promise<SiteVisitRequest> {
  const newVisit: SiteVisitRequest = {
    ...request,
    id: `sv-${Date.now()}`,
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('site_visits')
      .insert([{
        full_name: request.full_name,
        phone: request.phone,
        email: request.email,
        preferred_date: request.preferred_date,
        preferred_time_slot: request.preferred_time_slot,
        interested_plot_number: request.interested_plot_number,
        pickup_location: request.pickup_location,
        notes: request.notes,
        status: 'pending',
      }])
      .select()
      .single();

    if (!error && data) return data as SiteVisitRequest;
  } catch (e) {
    console.warn('Remote site visit insert error', e);
  }

  if (typeof window !== 'undefined') {
    const list = await getSiteVisits();
    list.unshift(newVisit);
    localStorage.setItem(STORAGE_KEYS.SITE_VISITS, JSON.stringify(list));
  }
  return newVisit;
}

export async function getSiteVisits(): Promise<SiteVisitRequest[]> {
  try {
    const { data, error } = await supabase.from('site_visits').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as SiteVisitRequest[];
  } catch (e) {
    console.warn('Remote site visits query error', e);
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.SITE_VISITS);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return [
    {
      id: 'sv-demo-1',
      full_name: 'Rajesh Kumar Reddy',
      phone: '+91 98480 12345',
      email: 'rajesh.reddy@example.com',
      preferred_date: '2026-11-05',
      preferred_time_slot: 'Morning (9 AM - 12 PM)',
      interested_plot_number: '1',
      pickup_location: 'Koilakuntla RTC Bus Stand',
      notes: 'Interested in Corner East plot for independent duplex construction.',
      status: 'confirmed',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
    {
      id: 'sv-demo-2',
      full_name: 'Venkat Rao Naidu',
      phone: '+91 94412 87654',
      email: 'venkat.naidu@gmail.com',
      preferred_date: '2026-11-07',
      preferred_time_slot: 'Afternoon (12 PM - 3 PM)',
      interested_plot_number: '29',
      pickup_location: 'Self drive to site',
      notes: 'Wants to inspect park facing plots.',
      status: 'pending',
      created_at: new Date(Date.now() - 3600000 * 18).toISOString(),
    }
  ];
}

export async function updateSiteVisitStatus(id: string, status: SiteVisitRequest['status'], admin_notes?: string): Promise<boolean> {
  try {
    await supabase.from('site_visits').update({ status, admin_notes }).eq('id', id);
  } catch (e) {
    console.warn('Remote site visit update error', e);
  }

  if (typeof window !== 'undefined') {
    const all = await getSiteVisits();
    const updated = all.map((v) => (v.id === id ? { ...v, status, admin_notes } : v));
    localStorage.setItem(STORAGE_KEYS.SITE_VISITS, JSON.stringify(updated));
  }
  return true;
}

// ---------------- CUSTOMER ENQUIRIES ----------------
export async function submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'status' | 'created_at'>): Promise<Enquiry> {
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    status: 'new',
    created_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('enquiries')
      .insert([{
        full_name: enquiry.full_name,
        phone: enquiry.phone,
        email: enquiry.email,
        subject: enquiry.subject,
        message: enquiry.message,
        status: 'new',
      }])
      .select()
      .single();

    if (!error && data) return data as Enquiry;
  } catch (e) {
    console.warn('Remote enquiry insert error', e);
  }

  if (typeof window !== 'undefined') {
    const list = await getEnquiries();
    list.unshift(newEnquiry);
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(list));
  }
  return newEnquiry;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as Enquiry[];
  } catch (e) {
    console.warn('Remote enquiries query error', e);
  }

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error(e);
      }
    }
  }
  return [
    {
      id: 'enq-demo-1',
      full_name: 'P. Sudhakar',
      phone: '+91 97011 22334',
      email: 'sudhakar.p@outlook.com',
      subject: 'Inquiry regarding 200 Sq Yards Plot Price and Payment Schedule',
      message: 'Looking to invest in Plot 2 or 5. Please share price per sq yard and installment options.',
      status: 'new',
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: 'enq-demo-2',
      full_name: 'M. Chandra Mohan',
      phone: '+91 98495 66778',
      email: 'm.mohan@gmail.com',
      subject: 'Bank Loan eligibility and DTCP approval documents',
      message: 'Are home loans pre-approved with SBI or HDFC? Please advise when we can meet.',
      status: 'in_progress',
      created_at: new Date(Date.now() - 3600000 * 22).toISOString(),
    }
  ];
}

export async function updateEnquiryStatus(id: string, status: Enquiry['status'], admin_notes?: string): Promise<boolean> {
  try {
    await supabase.from('enquiries').update({ status, admin_notes }).eq('id', id);
  } catch (e) {
    console.warn('Remote enquiry update error', e);
  }

  if (typeof window !== 'undefined') {
    const all = await getEnquiries();
    const updated = all.map((e) => (e.id === id ? { ...e, status, admin_notes } : e));
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
  }
  return true;
}

// ---------------- SUPABASE STORAGE UPLOAD ----------------
export async function uploadMediaToSupabase(file: File, folder: string = 'hero'): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

  try {
    const { data, error } = await supabase.storage
      .from(TOWNSHIP_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.warn('Storage upload error, generating local object URL:', error);
      return URL.createObjectURL(file);
    }

    const { data: urlData } = supabase.storage
      .from(TOWNSHIP_BUCKET)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (err) {
    console.warn('Storage exception, creating local preview URL:', err);
    return URL.createObjectURL(file);
  }
}

