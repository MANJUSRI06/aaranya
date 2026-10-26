/**
 * AARANYA — Brand Configuration & Settings
 * Woven by Tradition.
 *
 * Central configuration file for brand identity, WhatsApp ordering,
 * shipping policies, and craft cluster origins.
 */

export interface BrandConfig {
  name: string;
  tagline: string;
  message: string;
  headline: string;
  supportingCopy: string;
  whatsapp: {
    /**
     * International WhatsApp number with country code without + or spaces (e.g. "919876543210")
     * Update this single value to redirect all customer orders and concierge enquiries.
     */
    phoneNumber: string;
    displayNumber: string;
    conciergeName: string;
    supportHours: string;
  };
  currency: {
    code: string;
    symbol: string;
    locale: string;
  };
  shipping: {
    freeShippingThreshold: number; // in INR
    standardShippingFee: number; // in INR
    estimatedDeliveryDays: string;
  };
  social: {
    instagram: string;
    pinterest: string;
    facebook: string;
    youtube: string;
  };
  contact: {
    email: string;
    address: string;
    flagshipStore: string;
  };
}

export const brandConfig: BrandConfig = {
  name: 'AARANYA',
  tagline: 'Woven by Tradition.',
  message: 'Every thread carries a story. Every saree reflects a tradition.',
  headline: 'Not Just a Saree. A Story Woven by Hand.',
  supportingCopy:
    "Discover thoughtfully curated sarees inspired by India's rich textile traditions, crafted with care and made to be cherished.",
  whatsapp: {
    phoneNumber: '919043038932', // Target WhatsApp number (+91 9043038932)
    displayNumber: '',
    conciergeName: 'Aaranya Saree Concierge',
    supportHours: 'Mon - Sun, 10:00 AM – 8:00 PM IST',
  },
  currency: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
  },
  shipping: {
    freeShippingThreshold: 5000,
    standardShippingFee: 350,
    estimatedDeliveryDays: '3–6 business days pan-India with insured transit packaging',
  },
  social: {
    instagram: 'https://instagram.com/aaranyasaree',
    pinterest: 'https://pinterest.com/aaranyasaree',
    facebook: 'https://facebook.com/aaranyasaree',
    youtube: 'https://youtube.com/@aaranyasaree',
  },
  contact: {
    email: 'concierge@aaranyasaree.com',
    address: 'Aaranya Atelier, Weaver’s Quarters, Heritage District, New Delhi 110001, India',
    flagshipStore: 'Atelier visits by prior appointment only',
  },
};
