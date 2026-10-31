import React from 'react';
import ContactSection from '@/components/ContactSection';
import LocationSection from '@/components/LocationSection';

export const metadata = {
  title: 'Contact Us | GCR Surya Township Koilakuntla',
  description: 'Contact Sudheer Developers (G. Sudheer Reddy) for GCR Surya Township plots in Koilakuntla. Call +91 94402 99999 or chat on WhatsApp.',
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen py-8">
      <ContactSection />
      <LocationSection />
    </div>
  );
}

