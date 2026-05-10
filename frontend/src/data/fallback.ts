import type { SiteData } from '../types';

export const fallbackData: SiteData = {
  settings: {
    brand_ar: 'شركة معايير الامتثال المتقدمة',
    brand_en: 'ACS Legal',
    tagline_ar: 'حلول قانونية متكاملة للأعمال والاستثمار',
    tagline_en: 'Integrated legal solutions for business and investment',
    email: 'info@acslegal.sa',
    phone: '+966 53 750 0382',
    whatsapp: '+966537500382',
    location_ar: 'المملكة العربية السعودية',
    domain: 'https://acslegal.sa',
  },
  stats: [
    { label_ar: 'منهجية قانونية', value: '360' },
    { label_ar: 'مجالات خدمة', value: '9' },
    { label_ar: 'استجابة أولية', value: '24h' },
  ],
  services: [
    {
      slug: 'litigation-arbitration',
      title_ar: 'الترافع والوساطة والتحكيم',
      title_en: 'Litigation, Mediation and Arbitration',
      summary_ar: 'تمثيل قانوني متكامل أمام المحاكم والهيئات القضائية مع حلول سريعة للنزاعات عبر الوساطة والتحكيم.',
      summary_en: 'Integrated legal representation before courts and judicial bodies.',
      points_ar: ['التمثيل أمام المحاكم', 'إعداد المذكرات والطعون', 'التحكيم والوساطة'],
      icon: 'scale',
    },
    {
      slug: 'contracts-advisory',
      title_ar: 'صياغة العقود والدراسات والاستشارات',
      title_en: 'Contracts, Studies and Advisory',
      summary_ar: 'صياغة ومراجعة العقود والاتفاقيات وتقديم استشارات قانونية متخصصة ودراسات قانونية شاملة.',
      summary_en: 'Contracts, advisory and legal studies.',
      points_ar: ['صياغة ومراجعة العقود', 'دراسات قانونية', 'تقييم الالتزامات'],
      icon: 'file-text',
    },
    {
      slug: 'corporate-legal-support',
      title_ar: 'الدعم القانوني المؤسسي',
      title_en: 'Corporate Legal Support',
      summary_ar: 'دعم قانوني لمجالس الإدارات والإدارة التنفيذية والسياسات الداخلية والحوكمة والامتثال.',
      summary_en: 'Legal support for boards and executive teams.',
      points_ar: ['سياسات داخلية', 'حوكمة', 'امتثال'],
      icon: 'building-2',
    },
  ],
  articles: [
    {
      slug: 'investing-in-saudi-arabia',
      title_ar: 'دليل المستثمر الأجنبي لدخول السوق السعودي',
      excerpt_ar: 'نقاط نظامية أساسية قبل تأسيس الكيان التجاري والحصول على التراخيص.',
      category_ar: 'استثمار أجنبي',
      published_on: '2026-01-15',
      reading_time: 5,
    },
  ],
};
