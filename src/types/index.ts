/**
 * AARANYA Saree Brand & Storefront Types
 */

export const TYPES_LOADED = true;

export type SareeCategory =
  | 'silk'
  | 'cotton'
  | 'festive'
  | 'wedding'
  | 'everyday'
  | 'regional';

export type SareeOccasion =
  | 'Wedding & Bridal'
  | 'Festive & Celebrations'
  | 'Everyday Handlooms'
  | 'Formal & Soirée';

export type ColorFamily =
  | 'ivory'
  | 'green'
  | 'gold'
  | 'maroon'
  | 'earth'
  | 'indigo'
  | 'pink'
  | 'purple';

export interface SareeDimensions {
  length: string; // e.g. "5.5 meters" or "6.2 meters with blouse"
  width: string; // e.g. "45 inches (114 cm)"
  blousePiece: string; // e.g. "Includes 80 cm unstitched running blouse piece"
  hasBlousePiece: boolean;
}

export interface SareeMaterials {
  warp: string; // e.g. "3-Ply Mulberry Silk (20/22 denier)"
  weft: string; // e.g. "Pure Mulberry Silk interlocked with electroplated Silver-Gilt Zari"
  zariPurity: string; // e.g. "Certified Pure Zari / Silver Thread (0.6% Silver)" or "Tested Zari"
  weightApprox: string; // e.g. "approx. 850 grams"
}

export interface SareeImages {
  hero: string; // Primary drape photo
  border: string; // Close-up of border and temple motifs
  pallu: string; // Close-up of rich pallu design
  body: string; // Full body drape or pleated view
  texture: string; // Macro texture & weave cross-section
  additional?: string[];
}

export interface JourneyStep {
  step: number;
  title: string;
  description: string;
  duration: string;
  artisanRole: string;
}

export interface SareeStory {
  headline: string;
  text: string;
  clusterNotes: string;
  artisanAttribution: string;
  isVerifiedFact: boolean; // Distinguishes verified heritage records from illustrative design notes
  journeyTimeline: JourneyStep[];
}

export interface Saree {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  sku: string;
  price: number; // in INR
  originalPrice?: number; // for MRP display
  category: SareeCategory;
  fabric: string; // e.g. "Kanjeevaram Pure Silk", "Chanderi Cotton Silk"
  color: string; // e.g. "Warm Ivory & Antique Gold"
  colorFamily: ColorFamily;
  occasion: SareeOccasion;
  weavingTechnique: string; // e.g. "Korvai Interlocking", "Kadwa Brocade"
  regionalOrigin: string; // e.g. "Kanchipuram, Tamil Nadu"
  clusterName: string; // e.g. "Kanchipuram Master Weavers Guild"
  isVerifiedHandloom: boolean; // Handloom verification badge
  handloomCertification: string; // e.g. "Silk Mark Certified • 100% Handloom"
  dimensions: SareeDimensions;
  materials: SareeMaterials;
  careInstructions: string[];
  stock: number;
  isAvailable: boolean;
  isMadeToOrder: boolean;
  dispatchTime: string;
  isFeatured: boolean;
  isPublished: boolean;
  images: SareeImages;
  story: SareeStory;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  saree: Saree;
  quantity: number;
  selectedBlouseOption?: string;
  addedAt: string;
}

export interface FilterState {
  searchQuery: string;
  category: string; // 'all' or SareeCategory
  fabric: string[];
  colorFamily: string[];
  occasion: string[];
  weavingTechnique: string[];
  regionalOrigin: string[];
  priceRange: [number, number];
  availability: 'all' | 'in-stock' | 'made-to-order';
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest';
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  tags: string[];
}
