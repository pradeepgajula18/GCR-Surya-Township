'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Video,
  Layers,
  Calendar,
  MessageSquare,
  Image as ImageIcon,
  BarChart3,
  Database,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  Upload,
  Play,
  Phone,
  Search,
  ExternalLink,
  Edit2,
  RefreshCw,
  LogOut,
  Download,
  AlertCircle
} from 'lucide-react';
import {
  getHeroVideos,
  saveHeroVideo,
  deleteHeroVideo,
  getPlots,
  updatePlot,
  addPlot,
  deletePlot,
  getSiteVisits,
  updateSiteVisitStatus,
  getEnquiries,
  updateEnquiryStatus,
  getGallery,
  addGalleryItem,
  deleteGalleryItem,
  uploadMediaToSupabase,
  getProjectSettings,
  saveProjectSettings,
  DEFAULT_SETTINGS,
  supabase
} from '@/lib/supabase';
import { HeroVideo, Plot, SiteVisitRequest, Enquiry, GalleryItem, ProjectSettings } from '@/lib/types';
import { SITE_CONFIG } from '@/lib/constants';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    'hero' | 'plots' | 'settings' | 'visits' | 'enquiries' | 'gallery' | 'reports' | 'database'
  >('hero');

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('admin@gcrsuryatownship.com');

  // Module state
  const [heroVideos, setHeroVideos] = useState<HeroVideo[]>([]);
  const [plots, setPlots] = useState<Plot[]>([]);
  const [siteVisits, setSiteVisits] = useState<SiteVisitRequest[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [settingsForm, setSettingsForm] = useState<ProjectSettings>(DEFAULT_SETTINGS);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Add Plot State
  const [showAddPlotModal, setShowAddPlotModal] = useState(false);
  const [newPlotForm, setNewPlotForm] = useState<Omit<Plot, 'id'>>({
    plot_number: '',
    area_sq_yards: 200,
    area_cents: 4.13,
    dimensions: "36' x 50'",
    facing: 'East',
    road_width: '40 Feet',
    status: 'available',
    is_corner: false,
    notes: '',
  });

  // Hero Video Form State
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoForm, setVideoForm] = useState<Partial<HeroVideo>>({
    title: '',
    video_url: '',
    poster_url: '',
    badge_text: 'DTCP & RERA Compliant Layout',
    headline: 'Ultra-Premium Gated Community in Koilakuntla',
    subheadline: 'Open residential plots developed by Sudheer Developers with 40ft & 33ft BT roads, underground drainage, and immediate spot registration.',
    is_active: true,
  });
  const [uploadingFile, setUploadingFile] = useState(false);

  // Plot Edit State
  const [editingPlot, setEditingPlot] = useState<Plot | null>(null);
  const [plotSearch, setPlotSearch] = useState('');
  const [plotFilterStatus, setPlotFilterStatus] = useState<string>('all');

  // Check auth
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('gcr_surya_admin_auth');
      const email = localStorage.getItem('gcr_surya_admin_user');
      if (!auth) {
        router.push('/admin/login');
        return;
      }
      if (email) setUserEmail(email);
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [vids, plts, vsts, enqs, glry, sttngs] = await Promise.all([
        getHeroVideos(),
        getPlots(),
        getSiteVisits(),
        getEnquiries(),
        getGallery(),
        getProjectSettings(),
      ]);
      setHeroVideos(vids);
      setPlots(plts);
      setSiteVisits(vsts);
      setEnquiries(enqs);
      setGallery(glry);
      if (sttngs) setSettingsForm(sttngs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gcr_surya_admin_auth');
      localStorage.removeItem('gcr_surya_admin_user');
    }
    router.push('/admin/login');
  };

  // ---------------- HERO VIDEO ACTIONS ----------------
  const handleSaveHeroVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.video_url) {
      alert('Please enter a video URL or upload a video file.');
      return;
    }

    try {
      const saved = await saveHeroVideo(videoForm);
      setShowVideoModal(false);
      await loadData();
      alert('Hero Video updated and published successfully! Homepage reflects this change.');
    } catch (err) {
      console.error(err);
      alert('Error saving video.');
    }
  };

  const handleSetActiveVideo = async (video: HeroVideo) => {
    try {
      await saveHeroVideo({ ...video, is_active: true });
      await loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hero video?')) return;
    try {
      await deleteHeroVideo(id);
      await loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleVideoFileUpload = async (file: File) => {
    setUploadingFile(true);
    try {
      const publicUrl = await uploadMediaToSupabase(file, 'hero-videos');
      setVideoForm((prev) => ({ ...prev, video_url: publicUrl }));
    } catch (e) {
      console.error(e);
      alert('Failed to upload video file.');
    } finally {
      setUploadingFile(false);
    }
  };

  const handlePosterFileUpload = async (file: File) => {
    setUploadingFile(true);
    try {
      const publicUrl = await uploadMediaToSupabase(file, 'hero-posters');
      setVideoForm((prev) => ({ ...prev, poster_url: publicUrl }));
    } catch (e) {
      console.error(e);
      alert('Failed to upload poster image.');
    } finally {
      setUploadingFile(false);
    }
  };

  // ---------------- PLOT ACTIONS ----------------
  const handleQuickStatusChange = async (plot: Plot, newStatus: 'available' | 'reserved' | 'sold') => {
    const updated = { ...plot, status: newStatus };
    setPlots((prev) => prev.map((p) => (p.plot_number === plot.plot_number ? updated : p)));
    try {
      await updatePlot(updated);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSavePlotModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlot) return;
    try {
      await updatePlot(editingPlot);
      setEditingPlot(null);
      await loadData();
      alert('Plot specifications updated successfully!');
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddPlot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlotForm.plot_number) {
      alert('Please enter a plot number');
      return;
    }
    try {
      await addPlot(newPlotForm);
      setShowAddPlotModal(false);
      setNewPlotForm({
        plot_number: '',
        area_sq_yards: 200,
        area_cents: 4.13,
        dimensions: "36' x 50'",
        facing: 'East',
        road_width: '40 Feet',
        status: 'available',
        is_corner: false,
        notes: '',
      });
      await loadData();
      alert(`Plot #${newPlotForm.plot_number} added to inventory!`);
    } catch (e) {
      console.error(e);
      alert('Failed to add plot.');
    }
  };

  const handleDeletePlot = async (plot_number: string) => {
    if (!confirm(`Are you sure you want to delete Plot #${plot_number} from the layout inventory?`)) return;
    try {
      await deletePlot(plot_number);
      await loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      await saveProjectSettings(settingsForm);
      alert('Project settings, contact mobile numbers, and plot statistics updated successfully!');
    } catch (e) {
      console.error(e);
      alert('Failed to save settings.');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Filtered plots
  const filteredPlots = plots.filter((p) => {
    const matchStatus = plotFilterStatus === 'all' || p.status === plotFilterStatus;
    const matchSearch =
      plotSearch.trim() === '' ||
      p.plot_number.toLowerCase().includes(plotSearch.toLowerCase()) ||
      p.facing.toLowerCase().includes(plotSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Plot Counts
  const plotStats = {
    total: plots.length,
    available: plots.filter((p) => p.status === 'available').length,
    reserved: plots.filter((p) => p.status === 'reserved').length,
    sold: plots.filter((p) => p.status === 'sold').length,
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Plot Number', 'Area (Sq Yds)', 'Area (Cents)', 'Facing', 'Dimensions', 'Road Width', 'Status', 'Notes'];
    const rows = plots.map((p) => [
      p.plot_number,
      p.area_sq_yards,
      p.area_cents,
      p.facing,
      `"${p.dimensions}"`,
      `"${p.road_width}"`,
      p.status,
      `"${p.notes || ''}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gcr_surya_township_plots_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Sub-bar */}
      <div className="bg-surya-navy-900 text-white px-6 py-3 border-b border-surya-navy-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-300">Signed in as:</span>
          <span className="text-xs font-mono text-surya-orange-400 font-semibold">{userEmail}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={loadData}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Admin Body */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'hero'
                ? 'bg-surya-navy-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Video className="w-4 h-4 text-surya-orange-400" />
            <span>Hero Video System</span>
          </button>

          <button
            onClick={() => setActiveTab('plots')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'plots'
                ? 'bg-surya-navy-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 text-surya-orange-400" />
            <span>Plots Inventory ({plots.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'settings'
                ? 'bg-surya-navy-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Phone className="w-4 h-4 text-surya-orange-400" />
            <span>Mobile & Project Settings</span>
          </button>

          <button
            onClick={() => setActiveTab('visits')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'visits'
                ? 'bg-surya-navy-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4 text-surya-orange-400" />
            <span>Site Visits ({siteVisits.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'enquiries'
                ? 'bg-surya-navy-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-surya-orange-400" />
            <span>Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'gallery'
                ? 'bg-surya-navy-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-surya-orange-400" />
            <span>Gallery Media ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'reports'
                ? 'bg-surya-navy-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-surya-orange-400" />
            <span>Reports & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'database'
                ? 'bg-surya-navy-950 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Database className="w-4 h-4 text-surya-orange-400" />
            <span>Supabase SQL Setup</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: HERO VIDEO MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-surya-navy-950">
                  Homepage Cinematic Hero Video System
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Upload drone footage, replace preview videos, and set active hero reels. Homepage dynamically plays the active video in real-time.
                </p>
              </div>

              <button
                onClick={() => {
                  setVideoForm({
                    title: 'New Township Aerial Drone Sweep',
                    video_url: '',
                    poster_url: '',
                    badge_text: 'DTCP & RERA Compliant Layout',
                    headline: 'Ultra-Premium Gated Community in Koilakuntla',
                    subheadline: 'Open residential plots developed by Sudheer Developers with 40ft & 33ft BT roads, underground drainage, and immediate spot registration.',
                    is_active: true,
                  });
                  setShowVideoModal(true);
                }}
                className="px-5 py-3 rounded-xl bg-surya-orange-500 hover:bg-surya-orange-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-surya-orange-500/30 flex items-center gap-2 shrink-0 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Hero Video</span>
              </button>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {heroVideos.map((video) => (
                <div
                  key={video.id}
                  className={`bg-white rounded-3xl border overflow-hidden shadow-md flex flex-col justify-between transition-all ${
                    video.is_active
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Video Player / Poster Preview */}
                  <div className="relative aspect-video w-full bg-black overflow-hidden group">
                    <video
                      src={video.video_url}
                      poster={video.poster_url}
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    />

                    {video.is_active && (
                      <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span>Currently Active on Public Site</span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase font-bold text-surya-orange-600 tracking-wider">
                          {video.badge_text || 'RERA Compliant'}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          ID: {video.id.slice(0, 8)}
                        </span>
                      </div>
                      <h4 className="font-serif text-xl font-bold text-surya-navy-950 mt-1">
                        {video.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                        {video.subheadline}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      {!video.is_active ? (
                        <button
                          onClick={() => handleSetActiveVideo(video)}
                          className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>Publish & Set Active</span>
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4" />
                          <span>Live on Homepage</span>
                        </span>
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setVideoForm(video);
                            setShowVideoModal(true);
                          }}
                          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video.id)}
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                          title="Delete Video"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Uploading / Editing Video */}
            {showVideoModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto border border-slate-100">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-surya-navy-950">
                        {videoForm.id ? 'Edit Hero Video' : 'Add New Hero Video'}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Uploaded video will be stored in Supabase Storage and published automatically.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowVideoModal(false)}
                      className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveHeroVideo} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Video Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={videoForm.title || ''}
                        onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                      />
                    </div>

                    {/* Video File / URL */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Video Source (MP4 / WebM) *
                      </label>
                      <input
                        type="url"
                        placeholder="https://...mp4 or upload below"
                        value={videoForm.video_url || ''}
                        onChange={(e) => setVideoForm({ ...videoForm, video_url: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500 mb-2"
                      />

                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-surya-navy-50 hover:bg-surya-navy-100 text-surya-navy-900 border border-surya-navy-200 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                          <Upload className="w-3.5 h-3.5 text-surya-orange-500" />
                          <span>{uploadingFile ? 'Uploading...' : 'Upload Video File to Supabase Storage'}</span>
                          <input
                            type="file"
                            accept="video/*"
                            disabled={uploadingFile}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleVideoFileUpload(file);
                            }}
                            className="hidden"
                          />
                        </label>
                        <span className="text-[11px] text-slate-400">MP4, 4K, 1080p supported</span>
                      </div>
                    </div>

                    {/* Poster Image / URL */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Fallback Poster Image (JPG / PNG)
                      </label>
                      <input
                        type="url"
                        placeholder="https://...jpg or upload below"
                        value={videoForm.poster_url || ''}
                        onChange={(e) => setVideoForm({ ...videoForm, poster_url: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500 mb-2"
                      />

                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors">
                          <ImageIcon className="w-3.5 h-3.5 text-surya-orange-500" />
                          <span>{uploadingFile ? 'Uploading...' : 'Upload Poster Image'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={uploadingFile}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handlePosterFileUpload(file);
                            }}
                            className="hidden"
                          />
                        </label>
                        <span className="text-[11px] text-slate-400">High-res aerial shot recommended</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Badge Label
                        </label>
                        <input
                          type="text"
                          value={videoForm.badge_text || ''}
                          onChange={(e) => setVideoForm({ ...videoForm, badge_text: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                          Headline
                        </label>
                        <input
                          type="text"
                          value={videoForm.headline || ''}
                          onChange={(e) => setVideoForm({ ...videoForm, headline: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Subheadline / Synopsis
                      </label>
                      <textarea
                        rows={2}
                        value={videoForm.subheadline || ''}
                        onChange={(e) => setVideoForm({ ...videoForm, subheadline: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                      />
                    </div>

                    <div className="pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={videoForm.is_active}
                          onChange={(e) => setVideoForm({ ...videoForm, is_active: e.target.checked })}
                          className="w-4 h-4 rounded text-surya-orange-500 focus:ring-surya-orange-500"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          Set as published active hero video on public homepage immediately
                        </span>
                      </label>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowVideoModal(false)}
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={uploadingFile}
                        className="px-6 py-2.5 rounded-xl bg-surya-navy-950 hover:bg-black text-white text-xs font-semibold shadow-lg disabled:opacity-50"
                      >
                        Save & Publish
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: PLOTS INVENTORY & LAYOUT MANAGER */}
        {/* ============================================================== */}
        {activeTab === 'plots' && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <span className="text-xs font-semibold text-slate-400 uppercase">Total Plots</span>
                <p className="font-serif text-2xl font-bold text-surya-navy-950 mt-1">{plotStats.total}</p>
                <span className="text-[11px] text-slate-500">Demarcated Units</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-sm">
                <span className="text-xs font-semibold text-emerald-600 uppercase">Available Plots</span>
                <p className="font-serif text-2xl font-bold text-emerald-700 mt-1">{plotStats.available}</p>
                <span className="text-[11px] text-emerald-600">Open for Booking</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-sm">
                <span className="text-xs font-semibold text-amber-600 uppercase">Reserved Plots</span>
                <p className="font-serif text-2xl font-bold text-amber-700 mt-1">{plotStats.reserved}</p>
                <span className="text-[11px] text-amber-600">In Token Process</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-300 bg-slate-50 shadow-sm">
                <span className="text-xs font-semibold text-slate-600 uppercase">Sold Plots</span>
                <p className="font-serif text-2xl font-bold text-slate-800 mt-1">{plotStats.sold}</p>
                <span className="text-[11px] text-slate-500">Registered</span>
              </div>
            </div>

            {/* Filter and Actions Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  onClick={() => setPlotFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    plotFilterStatus === 'all' ? 'bg-surya-navy-950 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  All ({plots.length})
                </button>
                <button
                  onClick={() => setPlotFilterStatus('available')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    plotFilterStatus === 'available' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  Available ({plotStats.available})
                </button>
                <button
                  onClick={() => setPlotFilterStatus('reserved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    plotFilterStatus === 'reserved' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  Reserved ({plotStats.reserved})
                </button>
                <button
                  onClick={() => setPlotFilterStatus('sold')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    plotFilterStatus === 'sold' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  Sold ({plotStats.sold})
                </button>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search plot # or facing..."
                    value={plotSearch}
                    onChange={(e) => setPlotSearch(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-44 focus:outline-none focus:ring-1 focus:ring-surya-orange-500"
                  />
                </div>

                <button
                  onClick={handleExportCSV}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setShowAddPlotModal(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-surya-orange-500 hover:bg-surya-orange-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Plot</span>
                </button>
              </div>
            </div>

            {/* Plots Management Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Plot #</th>
                      <th className="py-3.5 px-4">Area (Sq. Yds / Cts)</th>
                      <th className="py-3.5 px-4">Facing</th>
                      <th className="py-3.5 px-4">Dimensions</th>
                      <th className="py-3.5 px-4">Road Width</th>
                      <th className="py-3.5 px-4">Current Status</th>
                      <th className="py-3.5 px-4">Quick Status Change</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPlots.map((plot) => (
                      <tr key={plot.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 font-serif font-bold text-sm text-surya-navy-950">
                          #{plot.plot_number} {plot.is_corner && <span className="text-[10px] text-surya-orange-600 font-sans uppercase font-bold">(Corner)</span>}
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-slate-800">
                          {plot.area_sq_yards} Yds <span className="text-slate-400">({plot.area_cents} Cts)</span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-700">
                          {plot.facing}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">
                          {plot.dimensions}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {plot.road_width}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              plot.status === 'available'
                                ? 'bg-emerald-100 text-emerald-800'
                                : plot.status === 'reserved'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {plot.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleQuickStatusChange(plot, 'available')}
                              className={`px-2 py-1 rounded text-[10px] font-bold ${
                                plot.status === 'available'
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              }`}
                            >
                              Available
                            </button>
                            <button
                              onClick={() => handleQuickStatusChange(plot, 'reserved')}
                              className={`px-2 py-1 rounded text-[10px] font-bold ${
                                plot.status === 'reserved'
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                              }`}
                            >
                              Reserve
                            </button>
                            <button
                              onClick={() => handleQuickStatusChange(plot, 'sold')}
                              className={`px-2 py-1 rounded text-[10px] font-bold ${
                                plot.status === 'sold'
                                  ? 'bg-slate-700 text-white'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              Sold
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setEditingPlot(plot)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                              title="Edit Plot Specifications"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeletePlot(plot.plot_number)}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600"
                              title="Delete Plot"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Edit Plot Modal */}
            {editingPlot && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h3 className="font-serif text-xl font-bold text-surya-navy-950">
                      Edit Plot #{editingPlot.plot_number}
                    </h3>
                    <button onClick={() => setEditingPlot(null)} className="text-slate-400 hover:text-slate-600">✕</button>
                  </div>

                  <form onSubmit={handleSavePlotModal} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Status</label>
                      <select
                        value={editingPlot.status}
                        onChange={(e) => setEditingPlot({ ...editingPlot, status: e.target.value as any })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      >
                        <option value="available">Available</option>
                        <option value="reserved">Reserved</option>
                        <option value="sold">Sold</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Area (Sq. Yds)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editingPlot.area_sq_yards}
                          onChange={(e) => setEditingPlot({ ...editingPlot, area_sq_yards: parseFloat(e.target.value) || 0 })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Area (Cents)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={editingPlot.area_cents}
                          onChange={(e) => setEditingPlot({ ...editingPlot, area_cents: parseFloat(e.target.value) || 0 })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Facing</label>
                        <select
                          value={editingPlot.facing}
                          onChange={(e) => setEditingPlot({ ...editingPlot, facing: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="East">East</option>
                          <option value="West">West</option>
                          <option value="North">North</option>
                          <option value="South">South</option>
                          <option value="North-East">North-East</option>
                          <option value="Corner">Corner</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Dimensions</label>
                        <input
                          type="text"
                          value={editingPlot.dimensions}
                          onChange={(e) => setEditingPlot({ ...editingPlot, dimensions: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Notes</label>
                      <input
                        type="text"
                        value={editingPlot.notes || ''}
                        onChange={(e) => setEditingPlot({ ...editingPlot, notes: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setEditingPlot(null)}
                        className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-surya-navy-950 text-white font-semibold"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Add New Plot Modal */}
            {showAddPlotModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h3 className="font-serif text-xl font-bold text-surya-navy-950">
                      Add New Demarcated Plot
                    </h3>
                    <button onClick={() => setShowAddPlotModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                  </div>

                  <form onSubmit={handleAddPlot} className="space-y-3.5 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Plot Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 53"
                          value={newPlotForm.plot_number}
                          onChange={(e) => setNewPlotForm({ ...newPlotForm, plot_number: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-surya-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Status</label>
                        <select
                          value={newPlotForm.status}
                          onChange={(e) => setNewPlotForm({ ...newPlotForm, status: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="available">Available</option>
                          <option value="reserved">Reserved</option>
                          <option value="sold">Sold</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Area (Sq. Yds) *</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newPlotForm.area_sq_yards}
                          onChange={(e) => {
                            const yds = parseFloat(e.target.value) || 0;
                            setNewPlotForm({
                              ...newPlotForm,
                              area_sq_yards: yds,
                              area_cents: parseFloat((yds / 48.4).toFixed(2)),
                            });
                          }}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-surya-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Area (Cents)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={newPlotForm.area_cents}
                          onChange={(e) => setNewPlotForm({ ...newPlotForm, area_cents: parseFloat(e.target.value) || 0 })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Facing</label>
                        <select
                          value={newPlotForm.facing}
                          onChange={(e) => setNewPlotForm({ ...newPlotForm, facing: e.target.value as any })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        >
                          <option value="East">East</option>
                          <option value="West">West</option>
                          <option value="North">North</option>
                          <option value="South">South</option>
                          <option value="North-East">North-East</option>
                          <option value="Corner">Corner</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Dimensions</label>
                        <input
                          type="text"
                          placeholder="e.g. 33' x 50'"
                          value={newPlotForm.dimensions}
                          onChange={(e) => setNewPlotForm({ ...newPlotForm, dimensions: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Road Width</label>
                        <input
                          type="text"
                          value={newPlotForm.road_width}
                          onChange={(e) => setNewPlotForm({ ...newPlotForm, road_width: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                        />
                      </div>
                      <div className="flex items-center pt-5">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newPlotForm.is_corner}
                            onChange={(e) => setNewPlotForm({ ...newPlotForm, is_corner: e.target.checked })}
                            className="w-4 h-4 rounded text-surya-orange-500"
                          />
                          <span className="font-semibold text-slate-700">Corner Plot</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-1">Special Notes</label>
                      <input
                        type="text"
                        placeholder="e.g. Prime park view facing"
                        value={newPlotForm.notes}
                        onChange={(e) => setNewPlotForm({ ...newPlotForm, notes: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                      />
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setShowAddPlotModal(false)}
                        className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-surya-orange-500 hover:bg-surya-orange-600 text-white font-semibold shadow-md"
                      >
                        Add to Inventory
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB: EDITABLE SETTINGS & MOBILE NUMBERS */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-surya-navy-950">
                  Project Settings & Editable Mobile Numbers
                </h3>
                <p className="text-slate-600 text-sm mt-1">
                  Manage phone numbers, WhatsApp contact, developer attributes, and township plot statistics.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
                  Live Dynamic Sync
                </span>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                  <h4 className="font-serif text-base font-bold text-surya-navy-950 mb-3 pb-2 border-b border-slate-100">
                    Contact Numbers & Communication
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Primary Calling Mobile Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+91 94402 99999"
                        value={settingsForm.contact_phone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, contact_phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">Displayed across navbar, floating pill, and contact cards.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        WhatsApp Chat Number (Digits only with country code) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="919440299999"
                        value={settingsForm.whatsapp_number}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp_number: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                      />
                      <span className="text-[11px] text-slate-400 mt-1 block">Used for direct WhatsApp chat links and plot inquiries.</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-base font-bold text-surya-navy-950 mb-3 pb-2 border-b border-slate-100">
                    Developer & Business Identity
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Developer Company Name
                      </label>
                      <input
                        type="text"
                        value={settingsForm.developer_name}
                        onChange={(e) => setSettingsForm({ ...settingsForm, developer_name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Client / Promoter Name
                      </label>
                      <input
                        type="text"
                        value={settingsForm.client_name}
                        onChange={(e) => setSettingsForm({ ...settingsForm, client_name: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-base font-bold text-surya-navy-950 mb-3 pb-2 border-b border-slate-100">
                    Township Project Statistics & Site Office
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Plots Count Metric Display
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 52+ Plots"
                        value={settingsForm.total_plots_count}
                        onChange={(e) => setSettingsForm({ ...settingsForm, total_plots_count: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Road Specifications
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 40 & 33 Ft BT Roads"
                        value={settingsForm.road_specs}
                        onChange={(e) => setSettingsForm({ ...settingsForm, road_specs: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Pricing Tagline
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Contact for Pricing"
                        value={settingsForm.pricing_note}
                        onChange={(e) => setSettingsForm({ ...settingsForm, pricing_note: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Site Office Full Address
                    </label>
                    <textarea
                      rows={2}
                      value={settingsForm.office_address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, office_address: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSavingSettings}
                    className="px-6 py-3 rounded-xl bg-surya-navy-950 hover:bg-black text-white font-semibold text-sm shadow-xl transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSavingSettings ? 'Saving...' : 'Save All Settings & Numbers'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: SITE VISITS MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === 'visits' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-surya-navy-950">
                  Customer Site Visit Requests ({siteVisits.length})
                </h3>
                <p className="text-slate-600 text-sm mt-0.5">
                  Coordinate on-site tours, cab pickup assistance, and plot walkthroughs.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4">Customer Name</th>
                      <th className="py-3.5 px-4">Contact Phone</th>
                      <th className="py-3.5 px-4">Visit Date & Slot</th>
                      <th className="py-3.5 px-4">Plot Interest</th>
                      <th className="py-3.5 px-4">Pickup Request</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {siteVisits.map((visit) => (
                      <tr key={visit.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-surya-navy-950">
                          {visit.full_name}
                          {visit.email && <span className="block text-[11px] text-slate-400 font-normal">{visit.email}</span>}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-surya-navy-900">
                          {visit.phone}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-800">{visit.preferred_date}</span>
                          <span className="block text-[11px] text-slate-500">{visit.preferred_time_slot}</span>
                        </td>
                        <td className="py-3 px-4">
                          {visit.interested_plot_number ? (
                            <span className="px-2 py-0.5 rounded bg-surya-orange-50 text-surya-orange-700 font-bold">
                              Plot #{visit.interested_plot_number}
                            </span>
                          ) : (
                            <span className="text-slate-400">General Tour</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {visit.pickup_location ? (
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                              {visit.pickup_location}
                            </span>
                          ) : (
                            <span className="text-slate-400">Self Transport</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={visit.status}
                            onChange={async (e) => {
                              const newStatus = e.target.value as any;
                              await updateSiteVisitStatus(visit.id, newStatus);
                              await loadData();
                            }}
                            className={`px-2 py-1 rounded text-xs font-bold ${
                              visit.status === 'confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : visit.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : visit.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`tel:${visit.phone.replace(/[^0-9]/g, '')}`}
                              className="p-1.5 rounded-lg bg-surya-navy-50 text-surya-navy-900 hover:bg-surya-navy-100"
                              title="Call Customer"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                            <a
                              href={SITE_CONFIG.whatsappUrl(`Hello ${visit.full_name}, this is G. Sudheer Reddy from GCR Surya Township regarding your site visit on ${visit.preferred_date}.`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              title="WhatsApp Customer"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: ENQUIRIES MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-surya-navy-950">
                  Customer Enquiries & Pricing Leads ({enquiries.length})
                </h3>
                <p className="text-slate-600 text-sm mt-0.5">
                  Follow up with prospective buyers regarding plot quotes and spot registration.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enquiries.map((enq) => (
                <div key={enq.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-lg text-surya-navy-950">
                        {enq.full_name}
                      </span>
                      <select
                        value={enq.status}
                        onChange={async (e) => {
                          const newStatus = e.target.value as any;
                          await updateEnquiryStatus(enq.id, newStatus);
                          await loadData();
                        }}
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          enq.status === 'resolved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : enq.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        <option value="new">New Lead</option>
                        <option value="in_progress">In Contact</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>

                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                      <span>Phone: <strong className="text-slate-800 font-mono">{enq.phone}</strong></span>
                      {enq.email && <span>Email: {enq.email}</span>}
                    </div>

                    {enq.subject && (
                      <p className="text-xs font-semibold text-surya-navy-900 mt-3">
                        Sub: {enq.subject}
                      </p>
                    )}

                    <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
                      "{enq.message}"
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Received: {new Date(enq.created_at).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${enq.phone.replace(/[^0-9]/g, '')}`}
                        className="px-3 py-1.5 rounded-lg bg-surya-navy-50 text-surya-navy-900 text-xs font-semibold hover:bg-surya-navy-100 flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                      <a
                        href={SITE_CONFIG.whatsappUrl(`Hello ${enq.full_name}, thank you for your enquiry regarding GCR Surya Township plots in Koilakuntla.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: GALLERY MANAGEMENT */}
        {/* ============================================================== */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-surya-navy-950">
                  Drone & Ground Progress Gallery ({gallery.length})
                </h3>
                <p className="text-slate-600 text-sm mt-0.5">
                  Manage live site progress photos, aerial drone footage, and master layout schematics.
                </p>
              </div>

              <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-surya-orange-500 hover:bg-surya-orange-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors">
                <Upload className="w-4 h-4" />
                <span>Upload Media</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const isVideo = file.type.startsWith('video');
                    const url = await uploadMediaToSupabase(file, 'gallery');
                    await addGalleryItem({
                      title: file.name.replace(/\.[^/.]+$/, ''),
                      category: 'Ground Progress',
                      media_type: isVideo ? 'video' : 'image',
                      media_url: url,
                    });
                    await loadData();
                  }}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {gallery.map((item) => (
                <div key={item.id} className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm group">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={item.thumbnail_url || item.media_url}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={async () => {
                          if (confirm('Delete this gallery item?')) {
                            await deleteGalleryItem(item.id);
                            await loadData();
                          }
                        }}
                        className="p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold text-surya-orange-600 uppercase">
                      {item.category}
                    </span>
                    <h5 className="font-serif font-bold text-xs text-slate-800 truncate mt-0.5">
                      {item.title}
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: REPORTS & STATS */}
        {/* ============================================================== */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-surya-navy-950">
                Venture Commercial Health & Conversion Metrics
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Overview of plot bookings, site footfalls, and pending enquiries for GCR Surya Township.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h4 className="font-serif text-lg font-bold text-surya-navy-950 mb-4">
                  Plot Inventory Distribution
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1 font-semibold">
                      <span className="text-emerald-700">Available Plots</span>
                      <span>{plotStats.available} ({Math.round((plotStats.available / plotStats.total) * 100)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${(plotStats.available / plotStats.total) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 font-semibold">
                      <span className="text-amber-700">Reserved Plots</span>
                      <span>{plotStats.reserved} ({Math.round((plotStats.reserved / plotStats.total) * 100)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${(plotStats.reserved / plotStats.total) * 100}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1 font-semibold">
                      <span className="text-slate-700">Sold & Registered</span>
                      <span>{plotStats.sold} ({Math.round((plotStats.sold / plotStats.total) * 100)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-slate-600 h-2.5 rounded-full" style={{ width: `${(plotStats.sold / plotStats.total) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-surya-navy-950 mb-2">
                    Total Site Visit Pipeline
                  </h4>
                  <p className="text-3xl font-serif font-bold text-surya-orange-600 mt-2">
                    {siteVisits.length} Visits
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {siteVisits.filter((s) => s.status === 'confirmed').length} visits scheduled for this week.
                  </p>
                </div>

                <Link
                  href="/book-visit"
                  className="mt-6 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <span>Open Public Visit Booking Form</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-lg font-bold text-surya-navy-950 mb-2">
                    Inquiry Conversion Ratio
                  </h4>
                  <p className="text-3xl font-serif font-bold text-surya-navy-950 mt-2">
                    {enquiries.length} Inquiries
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Fast response within 3 hours boosts spot registration conversion by 45%.
                  </p>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="mt-6 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-surya-navy-950 hover:bg-black text-white text-xs font-semibold transition-colors shadow-md"
                >
                  <Download className="w-3.5 h-3.5 text-surya-orange-400" />
                  <span>Download Full Inventory CSV</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 7: SUPABASE SQL & SETUP GUIDE */}
        {/* ============================================================== */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-6 h-6 text-surya-orange-500" />
                <h3 className="font-serif text-2xl font-bold text-surya-navy-950">
                  Supabase PostgreSQL & Storage Schema
                </h3>
              </div>
              <p className="text-slate-600 text-sm">
                The database schema is prepared in <code className="bg-slate-100 px-2 py-0.5 rounded text-surya-navy-900 font-mono">supabase/schema.sql</code> and seed data in <code className="bg-slate-100 px-2 py-0.5 rounded text-surya-navy-900 font-mono">supabase/seed.sql</code>.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
                <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-800 text-slate-400">
                  <span>Supabase Project: zxnuydlxeggezzmevivr.supabase.co</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `-- Run supabase/schema.sql and supabase/seed.sql in Supabase SQL Editor`
                      );
                      alert('Instructions copied!');
                    }}
                    className="text-surya-orange-400 hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <pre className="text-emerald-400">
{`-- 1. Open Supabase Dashboard -> SQL Editor
-- 2. Paste contents of supabase/schema.sql and click RUN
-- 3. Paste contents of supabase/seed.sql and click RUN
-- 4. In Supabase Storage, ensure 'township-media' bucket is created and marked Public.`}
                </pre>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <AlertCircle className="w-4 h-4 text-emerald-600" />
                <span>Note: The website features an automatic fallback store so all dynamic functions run seamlessly in all environments!</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

