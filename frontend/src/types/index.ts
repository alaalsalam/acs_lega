export interface Settings {
  brand_ar: string;
  brand_en: string;
  tagline_ar: string;
  tagline_en: string;
  email: string;
  phone: string;
  whatsapp: string;
  location_ar: string;
  domain: string;
}

export interface Service {
  slug: string;
  title_ar: string;
  title_en: string;
  summary_ar: string;
  summary_en: string;
  points_ar: string[];
  icon: string;
  /** When does a company need this service */
  when_needed: string;
  /** What we deliver */
  deliverables: string[];
  /** Key risks this addresses */
  risks: string[];
}

export interface Article {
  slug: string;
  title_ar: string;
  excerpt_ar: string;
  category_ar: string;
  category_slug: string;
  published_on: string;
  reading_time: number;
  image_alt: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ChecklistItem {
  question: string;
  yes_label: string;
  no_label: string;
  impact: 'high' | 'medium' | 'low';
}

export interface SiteData {
  settings: Settings;
  services: Service[];
  articles: Article[];
  stats: Array<{ label_ar: string; value: string }>;
  faqs: FAQ[];
  checklist: ChecklistItem[];
}