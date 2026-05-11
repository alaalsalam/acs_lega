import { fallbackData } from '../data/fallback';
import type { Article, Service, SiteData } from '../types';

const API_BASE = '/api/method/acs_legal.api.website';

async function call<T>(method: string, params?: Record<string, unknown>): Promise<T> {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, String(value));
  });

  const suffix = query.toString() ? `?${query.toString()}` : '';
  const response = await fetch(`${API_BASE}.${method}${suffix}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const json = await response.json();
  if (json.exception) throw new Error(json._error_message || json.exc_type || 'API exception');
  return json.message as T;
}

export async function getSiteData(): Promise<SiteData> {
  try {
    return normalizeSiteData(await call<Partial<SiteData>>('get_site_data'));
  } catch {
    return fallbackData;
  }
}

export async function submitContact(payload: Record<string, string>) {
  return call<{ success: boolean; error?: string }>('submit_contact', {
    data: JSON.stringify(payload),
  });
}

function normalizeSiteData(data: Partial<SiteData> | null | undefined): SiteData {
  const source = data ?? {};

  return {
    settings: {
      ...fallbackData.settings,
      ...(source.settings ?? {}),
    },
    stats: source.stats?.length ? source.stats : fallbackData.stats,
    services: normalizeServices(source.services),
    articles: normalizeArticles(source.articles),
    faqs: source.faqs?.length ? source.faqs : fallbackData.faqs,
    checklist: source.checklist?.length ? source.checklist : fallbackData.checklist,
  };
}

function normalizeServices(services?: Partial<Service>[]): Service[] {
  const fallbackBySlug = new Map(fallbackData.services.map((item) => [item.slug, item]));
  const items = services?.length ? services : fallbackData.services;

  return items.map((item, index) => {
    const fallback = fallbackBySlug.get(item.slug || '') ?? fallbackData.services[index] ?? fallbackData.services[0];
    const points = item.points_ar?.length ? item.points_ar : fallback.points_ar;

    return {
      slug: item.slug || fallback.slug,
      title_ar: item.title_ar || fallback.title_ar,
      title_en: item.title_en || fallback.title_en,
      summary_ar: item.summary_ar || fallback.summary_ar,
      summary_en: item.summary_en || fallback.summary_en,
      points_ar: points,
      icon: item.icon || fallback.icon || 'scale',
      when_needed: item.when_needed || fallback.when_needed || item.summary_ar || fallback.summary_ar,
      deliverables: item.deliverables?.length ? item.deliverables : fallback.deliverables?.length ? fallback.deliverables : points,
      risks: item.risks?.length ? item.risks : fallback.risks?.length ? fallback.risks : ['مخاطر تعاقدية', 'تأخر الإجراءات', 'عدم وضوح الالتزامات'],
    };
  });
}

function normalizeArticles(articles?: Partial<Article>[]): Article[] {
  const fallbackBySlug = new Map(fallbackData.articles.map((item) => [item.slug, item]));
  const items = articles?.length ? articles : fallbackData.articles;

  return items.map((item, index) => {
    const fallback = fallbackBySlug.get(item.slug || '') ?? fallbackData.articles[index] ?? fallbackData.articles[0];
    const category = item.category_ar || fallback.category_ar;

    return {
      slug: item.slug || fallback.slug,
      title_ar: item.title_ar || fallback.title_ar,
      excerpt_ar: item.excerpt_ar || fallback.excerpt_ar,
      category_ar: category,
      category_slug: item.category_slug || fallback.category_slug || categorySlug(category),
      published_on: item.published_on || fallback.published_on,
      reading_time: item.reading_time || fallback.reading_time || 5,
      image_alt: item.image_alt || fallback.image_alt || item.title_ar || fallback.title_ar,
    };
  });
}

function categorySlug(category: string) {
  const known: Record<string, string> = {
    'استثمار أجنبي': 'foreign-investment',
    'الاستثمار الأجنبي': 'foreign-investment',
    'تأسيس الشركات': 'company-formation',
    'عقود': 'contracts',
    'العقود التجارية': 'contracts',
    'حوكمة': 'governance',
    'الامتثال والحوكمة': 'governance',
    'الملكية الفكرية': 'ip',
    'النزاعات والتحكيم': 'disputes',
    'الضرائب والزكاة': 'tax',
    'القانون الرياضي': 'sports',
    'حماية البيانات': 'data-protection',
    'التقنية القانونية': 'legal-tech',
    'العمل والموارد البشرية': 'labor',
    'الإقامة المميزة': 'residency',
  };

  return known[category] ?? 'foreign-investment';
}
