export const SITE_CONFIG = {
  name: "GCR SURYA TOWNSHIP",
  tagline: "Ultra-Premium Gated Community Plotted Venture",
  developer: "SUDHEER DEVELOPERS",
  promoter: "G. Sudheer Reddy",
  phone: "+91 94402 99999",
  phoneRaw: "919440299999",
  url: "https://suryatownship.vercel.app",
  location: "Koilakuntla, Andhra Pradesh",
  fullAddress: "GCR Surya Township, State Highway Corridor, Koilakuntla - 518134, Nandyal District, Andhra Pradesh",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30835.88243679803!2d78.298516!3d15.234674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb43bf7e997f0a9%3A0x8e82ef45b3a3ea5a!2sKoilkuntla%2C%20Andhra%20Pradesh%20518134!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  whatsappUrl: (message?: string) => {
    const text = encodeURIComponent(
      message || "Hello! I am interested in GCR Surya Township plots in Koilakuntla. Please share details and pricing."
    );
    return `https://wa.me/919440299999?text=${text}`;
  }
};

export const COLORS = {
  navy: '#0B3064',
  navyDark: '#041228',
  navyLight: '#1E64AC',
  orange: '#F26522',
  orangeLight: '#FF9747',
  gold: '#F59E0B',
};

