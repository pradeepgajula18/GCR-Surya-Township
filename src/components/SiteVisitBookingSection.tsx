'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, Phone, CheckCircle2, Car, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitSiteVisit } from '@/lib/supabase';
import { SITE_CONFIG } from '@/lib/constants';

interface SiteVisitBookingSectionProps {
  prefilledPlot?: string;
}

export default function SiteVisitBookingSection({ prefilledPlot = '' }: SiteVisitBookingSectionProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    preferred_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferred_time_slot: 'Morning (9 AM - 12 PM)',
    interested_plot_number: prefilledPlot,
    pickup_location: '',
    notes: '',
  });

  const [pickupNeeded, setPickupNeeded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.phone || !formData.preferred_date) {
      alert('Please fill in your name, phone number and preferred date.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitSiteVisit({
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        preferred_date: formData.preferred_date,
        preferred_time_slot: formData.preferred_time_slot,
        interested_plot_number: formData.interested_plot_number,
        pickup_location: pickupNeeded ? formData.pickup_location || 'Koilakuntla RTC Bus Stand' : undefined,
        notes: formData.notes,
      });

      setIsSuccess(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore confetti if canvas unsupported
      }
    } catch (err) {
      console.error(err);
      alert('There was an issue submitting your booking. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-visit" className="py-20 md:py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Branding & Benefits Column */}
            <div className="lg:col-span-5 bg-gradient-to-br from-surya-navy-950 via-surya-navy-900 to-surya-navy-950 p-8 sm:p-10 text-white flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surya-orange-500/20 text-surya-orange-400 text-xs font-semibold uppercase tracking-wider mb-6 border border-surya-orange-500/30">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>VIP Site Inspection</span>
                </div>

                <h3 className="font-serif text-3xl font-bold text-white tracking-tight leading-snug">
                  Experience GCR Surya Township in Person
                </h3>

                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  Walk through the demarcated plots, inspect the 40ft & 33ft BT roads, check underground drainage pipes, and review verified legal approval documentation with our township development team.
                </p>

                <div className="mt-8 space-y-4 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span>Complimentary on-site cab pickup available</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span>One-on-one layout walk with senior site engineer</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span>Spot title verification & customized pricing plan</span>
                  </div>
                </div>
              </div>

              {/* Developer Contact Card */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <span className="text-xs uppercase font-semibold text-surya-orange-400 tracking-wider block mb-1">
                  Immediate Inquiries:
                </span>
                <p className="text-sm font-serif font-bold text-white">G. Sudheer Reddy (Sudheer Developers)</p>
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="mt-2 inline-flex items-center gap-2 text-surya-orange-400 font-mono text-base font-bold hover:text-surya-orange-300"
                >
                  <Phone className="w-4 h-4" />
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Booking Form Column */}
            <div className="lg:col-span-7 p-8 sm:p-10">
              {isSuccess ? (
                <div className="text-center py-12 space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-surya-navy-950">
                    Site Visit Scheduled Successfully!
                  </h4>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-surya-navy-900">{formData.full_name}</strong>. Our township executive will contact you at <strong className="text-surya-navy-900">{formData.phone}</strong> to confirm timing and pickup logistics.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          full_name: '',
                          phone: '',
                          email: '',
                          preferred_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                          preferred_time_slot: 'Morning (9 AM - 12 PM)',
                          interested_plot_number: '',
                          pickup_location: '',
                          notes: '',
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                    >
                      Book Another Visit
                    </button>
                    <a
                      href={SITE_CONFIG.whatsappUrl(`Hello, I have booked a site visit for ${formData.preferred_date} (${formData.preferred_time_slot}) under the name ${formData.full_name}. Please coordinate.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 shadow-md"
                    >
                      Confirm on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Reddy"
                          value={formData.full_name}
                          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="+91 98480 XXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Plot Interested In (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Plot 1 or East Facing"
                      value={formData.interested_plot_number}
                      onChange={(e) => setFormData({ ...formData, interested_plot_number: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500 focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Preferred Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          required
                          value={formData.preferred_date}
                          onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                          className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                        Preferred Time Slot *
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={formData.preferred_time_slot}
                          onChange={(e) => setFormData({ ...formData, preferred_time_slot: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500 focus:bg-white transition-all"
                        >
                          <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                          <option value="Afternoon (12 PM - 3 PM)">Afternoon (12 PM - 3 PM)</option>
                          <option value="Evening (3 PM - 6 PM)">Evening (3 PM - 6 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pickup Assistance Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pickupNeeded}
                        onChange={(e) => setPickupNeeded(e.target.checked)}
                        className="w-4 h-4 rounded text-surya-orange-500 focus:ring-surya-orange-500 border-slate-300"
                      />
                      <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                        <Car className="w-4 h-4 text-surya-orange-500" />
                        <span>I require free pickup assistance in Koilakuntla</span>
                      </span>
                    </label>

                    {pickupNeeded && (
                      <div className="mt-2.5 animate-fade-in">
                        <input
                          type="text"
                          placeholder="Pickup Location (e.g. Koilakuntla Bus Stand, Hotel, or Junction)"
                          value={formData.pickup_location}
                          onChange={(e) => setFormData({ ...formData, pickup_location: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-surya-orange-500"
                        />
                      </div>
                    )}
                  </div>

                  {/* Special Notes */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Questions / Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Any specific plot size preferences or questions..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500 focus:bg-white transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-surya-orange-500 to-surya-orange-600 hover:from-surya-orange-600 hover:to-surya-orange-700 text-white font-semibold text-sm sm:text-base shadow-xl shadow-surya-orange-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Submitting Booking...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Confirm Free Site Visit Booking</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

