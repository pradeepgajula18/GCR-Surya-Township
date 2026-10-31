'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';
import { submitEnquiry } from '@/lib/supabase';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    subject: 'Plot Pricing & Availability Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.phone || !formData.message) {
      alert('Please fill in your name, phone number, and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEnquiry({
        full_name: formData.full_name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      alert('Unable to submit enquiry right now. Please call or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surya-navy-50 text-surya-navy-900 text-xs font-semibold tracking-wider uppercase mb-3 border border-surya-navy-200">
            <Phone className="w-3.5 h-3.5 text-surya-orange-500" />
            <span>Connect Directly with Sudheer Developers</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-surya-navy-950 tracking-tight">
            Get in Touch for Exclusive Plot Pricing
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Reach out directly to G. Sudheer Reddy and the core management team for plot availability, spot registration schedule, and site tours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Cards & Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Developer Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-white p-1 border-2 border-surya-orange-500 shadow-md">
                  <Image
                    src="/images/gcr-surya-logo.jpg"
                    alt="Sudheer Developers"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-surya-navy-950">G. Sudheer Reddy</h3>
                  <p className="text-xs font-semibold text-surya-orange-600 uppercase tracking-wider">
                    Sudheer Developers • Promoter
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-slate-200/70 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-surya-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs uppercase text-slate-400">Site Office Address</strong>
                    <span className="text-slate-700">{SITE_CONFIG.fullAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-surya-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs uppercase text-slate-400">Direct Contact Line</strong>
                    <a href={`tel:${SITE_CONFIG.phoneRaw}`} className="text-surya-navy-900 font-bold hover:text-surya-orange-600">
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-surya-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-xs uppercase text-slate-400">Site Office Hours</strong>
                    <span className="text-slate-700">Monday - Sunday: 8:00 AM – 7:30 PM (7 Days Open)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Banner */}
            <div className="p-6 rounded-3xl bg-emerald-700 text-white shadow-xl flex items-center justify-between gap-4">
              <div>
                <h4 className="font-serif font-bold text-lg text-white">Prefer WhatsApp?</h4>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Chat instantly with our Koilakuntla site coordinator.
                </p>
              </div>
              <a
                href={SITE_CONFIG.whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs shrink-0 flex items-center gap-1.5 shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>Start Chat</span>
              </a>
            </div>
          </div>

          {/* Right Column: General Enquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-md">
            {isSuccess ? (
              <div className="text-center py-10 space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-surya-navy-950">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for inquiring about GCR Surya Township. Our developer representative will get in touch with you shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      full_name: '',
                      phone: '',
                      email: '',
                      subject: 'Plot Pricing & Availability Inquiry',
                      message: '',
                    });
                  }}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-surya-navy-900 text-white text-xs font-semibold hover:bg-surya-navy-950"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-surya-navy-950 mb-4">
                  Send an Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 94402 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Inquiry Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Your Message / Requirements *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the plot size you are looking for (e.g. 150, 200, 300 Sq. Yards), orientation (East/West), and any specific questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-surya-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-surya-navy-950 hover:bg-black text-white font-semibold text-sm shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-surya-orange-500" />
                      <span>Submit Inquiry to Sudheer Developers</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

