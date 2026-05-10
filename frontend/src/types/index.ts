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
}

export interface Article {
  slug: string;
  title_ar: string;
  excerpt_ar: string;
  category_ar: string;
  published_on: string;
  reading_time: number;
}

export interface SiteData {
  settings: Settings;
  services: Service[];
  articles: Article[];
  stats: Array<{ label_ar: string; value: string }>;
}
