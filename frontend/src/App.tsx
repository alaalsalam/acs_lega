import { useEffect, useState, useCallback } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Cpu,
  Eye,
  FileText,
  Gavel,
  Globe,
  Landmark,
  ListChecks,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  Phone,
  Quote,
  ReceiptText,
  Scale,
  ScrollText,
  Send,
  Shield,
  Sparkles,
  Target,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSiteData, submitContact } from './api/frappe';
import type { Service, SiteData, Article, FAQ, ChecklistItem } from './types';
import { fallbackData } from './data/fallback';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  scale: Scale,
  'file-text': FileText,
  'building-2': Building2,
  'briefcase-business': BriefcaseBusiness,
  landmark: Landmark,
  'badge-check': BadgeCheck,
  trophy: Trophy,
  'receipt-text': ReceiptText,
  cpu: Cpu,
};

function ServiceIcon({ name, size = 20 }: { name: string; size?: number }) {
  const Icon = iconMap[name] || Scale;
  return <Icon size={size} />;
}

const navItems = [
  { href: '#about', label: 'عن الشركة' },
  { href: '#services', label: 'الخدمات' },
  { href: '#approach', label: 'المنهجية' },
  { href: '#articles', label: 'الرؤى' },
  { href: '#checklist', label: 'التقييم' },
  { href: '#contact', label: 'تواصل' },
];

const approach = [
  { num: '01', title: 'الاستماع والتشخيص', desc: 'نفهم وضعك وأهدافك والتحديات النظامية التي تواجهك.' },
  { num: '02', title: 'تحليل المخاطر', desc: 'نرسم خريطة المخاطر ونضع الأولويات بناءً على الأثر والجدية.' },
  { num: '03', title: 'صياغة الحل', desc: 'نصمم حلاً قانونياً عملياً متوافقاً مع الأنظمة السعودية.' },
  { num: '04', title: 'المتابعة المستمرة', desc: 'نرافقك في التنفيذ ونُعيد تقييم الحلول وفق المتغيرات.' },
];

const trustPoints = [
  { icon: Zap, title: 'استجابة خلال 24 ساعة', desc: 'لا نُبقيك تنتظر. نتواصل بسرعة ونبقيك على اطلاع.' },
  { icon: Globe, title: 'خبرة بالسوق السعودي', desc: 'فهم عميق للبيئة النظامية والتجارية السعودية من الداخل.' },
  { icon: Shield, title: 'سرية تامة', desc: 'جميع معلوماتك محمية باتفاقيات سرية مهنية.' },
  { icon: CheckCircle2, title: 'حلول عملية لا نظرية', desc: 'نقدم حلولاً قابلة للتنفيذ في بيئة الأعمال.' },
];

const consultationFlow = [
  {
    icon: MessageCircle,
    title: 'طلب الاستشارة',
    desc: 'تشاركنا ملخص المسألة، والقطاع، والهدف التجاري من الاستشارة.',
  },
  {
    icon: ClipboardCheck,
    title: 'فرز قانوني أولي',
    desc: 'نحدد درجة العجلة، المستندات المطلوبة، والمسار الأنسب للتعامل.',
  },
  {
    icon: CalendarCheck,
    title: 'جلسة تشخيص',
    desc: 'نناقش الوقائع ونرتب المخاطر والخيارات القانونية بلغة واضحة.',
  },
  {
    icon: Sparkles,
    title: 'خطة عمل قابلة للتنفيذ',
    desc: 'تستلم توصية عملية: ما الذي نفعله الآن، وما الذي يؤجل، ولماذا.',
  },
];

const coverClassMap: Record<string, string> = {
  'foreign-investment': 'cover-foreign-investment',
  'company-formation': 'cover-company-formation',
  'contracts': 'cover-contracts',
  'governance': 'cover-governance',
  'ip': 'cover-ip',
  'disputes': 'cover-disputes',
  'tax': 'cover-tax',
  'sports': 'cover-sports',
  'data-protection': 'cover-data-protection',
  'legal-tech': 'cover-legal-tech',
  'labor': 'cover-labor',
  'residency': 'cover-residency',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

// ── Hero Case data (simulated) ──
const heroCases = [
  { type: 'استثمار أجنبي', status: 'قيد المعالجة', name: 'ترخيص دخول السوق السعودي', detail: 'هيكلة الكيان · مراجعة القيود النظامية' },
  { type: 'نزاع تجاري', status: 'تقييم أولي', name: 'مطالبة تعاقدية مع شريك', detail: 'تحليل العقد · خيارات التسوية والتحكيم' },
  { type: 'ملكية فكرية', status: 'جاهز للتقديم', name: 'تسجيل علامة تجارية', detail: 'تصنيف العلامة · بحث التعارضات' },
  { type: 'امتثال', status: 'متابعة دورية', name: 'مراجعة زكوية وضريبية', detail: 'تقليل المخاطر · جدول الالتزامات' },
];

const heroHighlights = [
  'استشارة واضحة بلا تعقيد',
  'خطة مكتوبة قابلة للتنفيذ',
  'سرية مهنية منذ أول تواصل',
];

// ── Component: Service Explorer ──
function ServiceExplorer({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <div className="services-layout">
      <div className="services-tabs">
        {services.map((s, i) => (
          <button
            key={s.slug}
            className={`service-tab ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
          >
            <div className="service-tab-icon">
              <ServiceIcon name={s.icon} size={17} />
            </div>
            <div className="service-tab-text">
              <div className="service-tab-title">{s.title_ar}</div>
              <div className="service-tab-sub">{s.summary_ar.slice(0, 45)}...</div>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.slug}
          className="service-panel"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.3 }}
        >
          <div className="service-panel-header">
            <div className="service-panel-icon">
              <ServiceIcon name={current.icon} size={22} />
            </div>
            <h2>{current.title_ar}</h2>
            <p>{current.summary_ar}</p>
          </div>

          <div className="service-panel-section">
            <h4>متى تحتاج هذه الخدمة؟</h4>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.8 }}>{current.when_needed}</p>
          </div>

          <div className="service-panel-section">
            <h4>ما الذي نقدمه</h4>
            <ul>
              {current.deliverables.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>

          <div className="service-panel-section">
            <h4>المخاطر التي تعالجها</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
              {current.risks.map((r) => (
                <span key={r} className="risk-item">
                  <Scale size={11} />
                  {r}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ── Component: Article Filter ──
function ArticleFilter({ articles }: { articles: Article[] }) {
  const categories = ['الكل', ...Array.from(new Set(articles.map((a) => a.category_ar)))];
  const [active, setActive] = useState('الكل');

  const filtered = active === 'الكل' ? articles : articles.filter((a) => a.category_ar === active);

  return (
    <>
      <div className="article-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${active === cat ? 'active' : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="articles-grid">
        {filtered.map((article, index) => {
          const coverClass = coverClassMap[article.category_slug] || 'cover-foreign-investment';
          const acronym = article.category_slug.slice(0, 3).toUpperCase();
          return (
            <motion.article
              key={article.slug}
              className="article-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              layout
            >
              <div className={`article-cover ${coverClass}`}>
                <span className="article-cover-acronym">{acronym}</span>
                <div className="article-cover-overlay" />
              </div>
              <div className="article-body">
                <div className="article-meta">
                  <span className="article-cat">{article.category_ar}</span>
                  <span className="article-date">
                    {new Date(article.published_on).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <h3>{article.title_ar}</h3>
                <p>{article.excerpt_ar}</p>
                <div className="article-footer">
                  <span className="article-read">اقرأ المقال <ArrowLeft size={12} /></span>
                  <span className="article-time">
                    <ScrollText size={11} />
                    {article.reading_time} دقيقة
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </>
  );
}

// ── Component: Checklist ──
function LegalChecklist({ items }: { items: ChecklistItem[] }) {
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no'>>({});

  function toggle(index: number, val: 'yes' | 'no') {
    setAnswers((prev) => ({
      ...prev,
      [index]: prev[index] === val ? '' as never : val,
    }));
  }

  const answered = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter((v) => v === 'yes').length;
  const highRiskNo = items.filter(
    (item, i) => item.impact === 'high' && answers[i] === 'no'
  ).length;

  let resultMsg = '';
  if (answered === 0) {
    resultMsg = 'أجب على الأسئلة لتحصل على تقييم مبدئي للاستعداد القانوني لشركتك.';
  } else if (highRiskNo > 0) {
    resultMsg = `لديك ${highRiskNo} نقطة خطر عالية تتطلب اهتماماً فورياً. ننصح بحجز استشارة لتقديم تقييم شامل.`;
  } else if (yesCount >= items.length * 0.7) {
    resultMsg = 'وضعك القانوني جيد. لكن نوصي بمراجعة دورية لضمان استمرار الامتثال.';
  } else if (yesCount >= items.length * 0.4) {
    resultMsg = 'لديك أساس قانوني جيد لكن هناك نقاط تحتاج تحسين. يمكننا مساعدتك في ترتيب الأولويات.';
  } else {
    resultMsg = 'أنت في مرحلة تحتاج فيها بناء أسس قانونية متينة. ابدأ بتأسيس الحوكمة والامتثال.';
  }

  return (
    <div>
      <div className="checklist-grid">
        {items.map((item, i) => (
          <div key={i} className="checklist-item">
            <h4>{item.question}</h4>
            <div className="checklist-choices">
              <button
                className={`check-btn ${answers[i] === 'yes' ? 'selected-yes' : ''}`}
                onClick={() => toggle(i, 'yes')}
              >
                <CheckCircle2 size={13} style={{ verticalAlign: 'middle', marginLeft: 5 }} />
                {item.yes_label}
              </button>
              <button
                className={`check-btn ${answers[i] === 'no' ? 'selected-no' : ''}`}
                onClick={() => toggle(i, 'no')}
              >
                <X size={13} style={{ verticalAlign: 'middle', marginLeft: 5 }} />
                {item.no_label}
              </button>
            </div>
          </div>
        ))}
      </div>

      {answered > 0 && (
        <motion.div
          className="checklist-result"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h3>التقييم المبدئي</h3>
          <p>{resultMsg}</p>
        </motion.div>
      )}
    </div>
  );
}

// ── Component: FAQ Accordion ──
function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => (
        <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
          <button
            className="faq-question"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span>{faq.question}</span>
            <div className="faq-icon">
              <ChevronDown size={15} />
            </div>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                className="faq-answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="faq-answer-inner">{faq.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function ConsultationFlow() {
  return (
    <div className="flow-grid">
      {consultationFlow.map((item, index) => (
        <motion.div
          className="flow-card"
          key={item.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: index * 0.08, duration: 0.45 }}
        >
          <div className="flow-number">{String(index + 1).padStart(2, '0')}</div>
          <div className="flow-icon"><item.icon size={19} /></div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main App ──
export default function App() {
  const [data] = useState<SiteData>(fallbackData);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getSiteData().catch(() => {/* fallback already set */});
  }, []);

  const whatsapp = data.settings.whatsapp.replace(/\D/g, '');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormStatus('');
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries()) as Record<string, string>;
    try {
      const res = await submitContact(payload);
      setFormStatus(res.success ? 'success' : 'error');
      if (res.success) e.currentTarget.reset();
    } catch {
      setFormStatus('error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="site-shell">
      {/* Header */}
      <header className="header">
        <a className="brand" href="/" aria-label="ACS Legal">
          <span className="brand-mark">ACS</span>
          <span className="brand-text">
            <strong>{data.settings.brand_ar}</strong>
            <small>{data.settings.brand_en}</small>
          </span>
        </a>

        <nav className="desktop-nav">
          {navItems.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>

        <div className="top-actions">
          <button className="lang-btn">EN</button>
          <a className="cta-header" href={`https://wa.me/${whatsapp}`}>
            طلب استشارة <ArrowLeft size={13} />
          </a>
          <button className="menu-toggle" onClick={() => setDrawerOpen(true)} aria-label="القائمة">
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="drawer-head">
              <span className="brand-mark" style={{ width: 35, height: 35, fontSize: '0.68rem' }}>ACS</span>
              <button className="drawer-close" onClick={() => setDrawerOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <nav className="drawer-nav">
              {navItems.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setDrawerOpen(false)}>{n.label}</a>
              ))}
            </nav>
            <div className="drawer-foot">
              <a className="cta-header" href={`https://wa.me/${whatsapp}`} onClick={() => setDrawerOpen(false)} style={{ justifyContent: 'center' }}>
                طلب استشارة الآن
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-grid-pattern" />
          <div className="hero-bottom-fade" />

          <div className="hero-inner">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.div className="hero-eyebrow" variants={fadeUp}>
                مكتب محاماة واستشارات قانونية للأعمال في السعودية
              </motion.div>
              <motion.h1 className="hero-title" variants={fadeUp}>
                قرارات قانونية<br />
                تحمي أعمالك وتفتح <em>مسار النمو.</em>
              </motion.h1>
              <motion.p className="hero-desc" variants={fadeUp}>
                ACS Legal شريك قانوني للشركات والمستثمرين: نقرأ المخاطر، نصيغ الحل، ونحوّل المسألة القانونية إلى خطة واضحة قابلة للتنفيذ في السوق السعودي.
              </motion.p>
              <motion.div className="hero-actions" variants={fadeUp}>
                <a className="btn-primary" href="#contact">
                  ابدأ استشارتك <ArrowLeft size={16} />
                </a>
                <a className="btn-ghost" href="#services">
                  اكتشف خدماتنا
                </a>
              </motion.div>
              <motion.div className="hero-proof-row" variants={fadeUp}>
                {heroHighlights.map((item) => (
                  <span key={item}><CheckCircle2 size={13} />{item}</span>
                ))}
              </motion.div>
              <motion.div className="hero-badge" variants={fadeUp}>
                <span className="hero-badge-dot" />
                متاحون لاستقبال الطلبات العاجلة خلال أيام العمل
              </motion.div>
            </motion.div>

            {/* Legal Command Center */}
            <motion.div
              className="hero-command"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="hero-command-head">
                <span className="hero-command-title">ACS Advisory Desk</span>
                <div className="hero-command-dots">
                  <span /><span /><span />
                </div>
              </div>
              <div className="hero-command-body">
                <div className="hero-command-summary">
                  <div>
                    <span>مسارات نشطة</span>
                    <strong>04</strong>
                  </div>
                  <div>
                    <span>أولوية</span>
                    <strong>عالية</strong>
                  </div>
                </div>
                {heroCases.map((c, i) => (
                  <motion.div
                    key={i}
                    className="hero-case"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.35 }}
                  >
                    <div className="hero-case-labels">
                      <span className="hero-case-type">{c.type}</span>
                      <span className="hero-case-status">{c.status}</span>
                    </div>
                    <div className="hero-case-name">{c.name}</div>
                    <div className="hero-case-detail">
                      <Scale size={11} />
                      {c.detail}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="section">
          <div className="container">
            <div className="about-grid">
              <motion.div
                className="about-visual"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
              >
                <div className="about-visual-grid" />
                <span className="about-visual-tag">ACS Legal · منذ 2009</span>
                <span className="about-visual-big">ACS</span>
                <p className="about-visual-text">
                  "أفضل قضية هي<br />التي لا تصل إلى<br />المحكمة."
                </p>
              </motion.div>

              <motion.div
                className="about-content"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="section-kicker">عن الشركة</span>
                <h2 className="section-title" style={{ marginBottom: 6 }}>
                  نفهم لغة الأعمال قبل أن نصيغ الحل القانوني.
                </h2>
                <div className="section-divider" />
                <p>
                  تأسست <strong>{data.settings.brand_ar}</strong> لمواكبة النهضة الاقتصادية والتشريعية في المملكة. نعمل جسراً قانونياً للشركات الأجنبية الراغبة في الاستثمار، وللشركات الوطنية الساعية للنمو.
                </p>
                <p>
                  فلسفتنا: <strong>الوقاية قبل العلاج</strong>. نقدم حلولاً قابلة للتنفيذ داخل بيئة الأعمال — لا ضمن الأوراق الرسمية فقط.
                </p>
                <div className="side-note">
                  كل قرار قانوني له أثر تجاري — والعكس صحيح. لذلك نعمل كفريق واحد مع عملائنا، نفهم أولوياتهم ونمشي بها نحو أهدافها بثقة.
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Trust ── */}
        <section className="section trust-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-kicker" style={{ color: 'var(--gold)' }}>لماذا ACS Legal</span>
              <h2 className="section-title white">أربع ركائز تميّزنا.</h2>
            </motion.div>

            <div className="trust-grid">
              {trustPoints.map((t, i) => (
                <motion.div
                  key={t.title}
                  className="trust-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                >
                  <div className="trust-icon">
                    <t.icon size={21} />
                  </div>
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Consultation Flow ── */}
        <section className="section flow-section">
          <div className="container">
            <motion.div
              className="flow-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-kicker">رحلة الاستشارة</span>
              <h2 className="section-title">من أول رسالة إلى قرار قانوني واضح.</h2>
              <p className="section-subtitle">
                صممنا تجربة التواصل لتكون مباشرة ومطمئنة: تفهم أين تقف، وما المطلوب منك، وما الخطوة التالية.
              </p>
            </motion.div>
            <ConsultationFlow />
          </div>
        </section>

        {/* ── Vision & Values ── */}
        <section className="section" style={{ background: 'var(--paper)' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-kicker">الرؤية والرسالة</span>
              <h2 className="section-title">نحو نظام قانوني داعم للأعمال.</h2>
            </motion.div>

            <div className="vm-grid" style={{ marginTop: 32 }}>
              {[
                { icon: Eye, title: 'الرؤية', text: 'أن نكون الشريك القانوني الأول للشركات والمستثمرين في السوق السعودي، عبر خدمات تجمع بين الدقة والسرعة والابتكار.' },
                { icon: Target, title: 'الرسالة', text: 'نقدم حلولاً قانونية تحمي مصالح عملائنا وتدعم نموهم، بنهج استباقي يستبق التحديات ويرسم المسار الآمن.' },
              ].map((vm, i) => (
                <motion.div
                  key={vm.title}
                  className="vm-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <div className="vm-icon"><vm.icon size={20} /></div>
                  <h3>{vm.title}</h3>
                  <p>{vm.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Values */}
            <div style={{ marginTop: 40 }}>
              <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: 20 }}>قيمنا</h2>
              <div className="values-grid">
                {[
                  { icon: Shield, title: 'الموثوقية والسرية', desc: 'نتعامل مع كل قضية بمصداقية تامة. سرية عملائنا خط أحمر لا نقبل المساس به.' },
                  { icon: Target, title: 'الاستباقية', desc: 'نستبق المشكلات قبل وقوعها. تحليلنا يركّز على الوقاية قبل العلاج.' },
                  { icon: Globe, title: 'فهم السوق السعودي', desc: 'خبرة عميقة بالبيئة النظامية والتجارية السعودية من الداخل.' },
                ].map((v, i) => (
                  <motion.div
                    key={v.title}
                    className="value-card"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: i * 0.07, duration: 0.45 }}
                  >
                    <div className="value-icon"><v.icon size={18} /></div>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Services Explorer ── */}
        <section id="services" className="section services-section">
          <div className="container">
            <div className="services-header">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <span className="section-kicker">الخدمات القانونية</span>
                <h2 className="section-title"> عشرة مجالات قانونية.<br />نظرة واحدة تكفي.</h2>
                <p className="section-subtitle" style={{ marginTop: 10 }}>
                  اختر أي خدمة لتعرف متى تحتاجها وما الذي نقدمه.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <ServiceExplorer services={data.services} />
            </motion.div>
          </div>
        </section>

        {/* ── Approach ── */}
        <section id="approach" className="section approach-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-kicker" style={{ color: 'var(--gold)' }}>المنهجية</span>
              <h2 className="section-title white">من تشخيص المخاطر إلى تنفيذ القرار.</h2>
              <p className="section-subtitle white" style={{ marginTop: 10 }}>
                أربع مراحل محدّدة نطبقها على كل مشروع أو قضية.
              </p>
            </motion.div>

            <div className="steps-grid">
              {approach.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="step-card"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.09, duration: 0.45 }}
                >
                  <span className="step-num">{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <div className="stats-bar">
          <div className="stats-grid">
            {[
              { value: '15+', label: 'سنة خبرة قانونية' },
              { value: '500+', label: 'قضية منجزة' },
              { value: '10+', label: 'مجالات خدمة قانونية' },
              { value: '24h', label: 'متوسط الاستجابة' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-item"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Team ── */}
        <section id="team" className="section" style={{ background: 'var(--paper)' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-kicker">كلمة المؤسس</span>
              <h2 className="section-title">خبرة قانونية في خدمة الأعمال.</h2>
            </motion.div>

            <div className="team-grid">
              <motion.div
                className="team-visual"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
              >
                <span className="team-visual-bg">ACS</span>
                <div>
                  <p className="team-visual-label">ACS Legal · شريكك القانوني</p>
                  <p className="team-visual-text">
                    حان الوقت أن يكون<br />
                    لديك شريك قانوني<br />
                    يفهم عملك.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="team-content"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <blockquote>
                  "النظام لا يُدار بالورق، بل بالتطبيق العملي. عملنا أن نضع الحل القانوني في سياقه التجاري — فكل قرار قانوني له أثر تجاري، والعكس صحيح."
                </blockquote>
                <p>
                  نمتلك في ACS Legal خبرة تمتد عبر مختلف القطاعات والأنظمة السعودية. فريقنا يجمع بين العمق القانوني الصارم وفهم السوق السعودي، ما يمكننا من تقديم استشارات تتجاوز الإطار النظري إلى التنفيذ الفعلي.
                </p>
                <p>
                  نؤمن بأن أفضل ممتلكاتنا هي ثقة عملائنا. لذلك نتعامل مع كل قضية كأنها قضية شركتنا، بنفس الاهتمام والحرص والسرية.
                </p>
                <p>
                  سواء كنت مستثمراً أجنبياً يدخل السوق السعودي، أو شركة وطنية تسعى للنمو — نحن هنا لنكون جزءاً من فريقك.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Articles ── */}
        <section id="articles" className="section articles-section">
          <div className="container">
            <div className="articles-top">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <span className="section-kicker">الرؤى القانونية</span>
                <h2 className="section-title">مقالات قانونية مبسطة<br />للمديرين والمستثمرين.</h2>
              </motion.div>
              <a className="btn-ghost" href="/articles" style={{ flexShrink: 0, fontSize: '0.85rem' }}>
                جميع المقالات
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
            >
              <ArticleFilter articles={data.articles} />
            </motion.div>
          </div>
        </section>

        {/* ── Checklist ── */}
        <section id="checklist" className="section checklist-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-kicker">تقييم الاستعداد القانوني</span>
              <h2 className="section-title">هل شركتك مستعدة قانونياً؟</h2>
              <p className="checklist-intro">
                أجب على 5 أسئلة للحصول على تقييم مبدئي للاستعداد القانوني لشركتك. هذا التقييم لا يغني عن الاستشارة المتخصصة.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <LegalChecklist items={data.checklist} />
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="section faq-section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-kicker">الأسئلة الشائعة</span>
              <h2 className="section-title">أسئلة نتلقاها كثيراً.</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <FAQAccordion faqs={data.faqs} />
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <div className="cta-banner">
          <motion.div
            className="cta-inner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <h2>هل لديك سؤال قانوني أو تحتاج استشارة متخصصة؟</h2>
            <p>فريقنا جاهز للتواصل والرد على استفساراتك خلال 24 ساعة.</p>
            <a className="cta-btn" href="#contact">
              تواصل معنا الآن <ArrowLeft size={16} />
            </a>
          </motion.div>
        </div>

        {/* ── Contact ── */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <div className="contact-grid">
              <motion.div
                className="contact-info"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55 }}
              >
                <span className="section-kicker" style={{ color: 'var(--gold)' }}>تواصل معنا</span>
                <h2>حوّل مسألتك القانونية إلى خطة واضحة.</h2>
                <p>
                  املأ النموذج وسيتواصل معك الفريق خلال 24 ساعة. للمتابعة العاجلة، تواصل معنا مباشرة.
                </p>
                <div className="contact-channels">
                  <a href={`mailto:${data.settings.email}`} className="contact-channel">
                    <div className="contact-icon"><Mail size={16} /></div>
                    <span>{data.settings.email}</span>
                  </a>
                  <a href={`tel:${data.settings.phone}`} className="contact-channel">
                    <div className="contact-icon"><Phone size={16} /></div>
                    <span>{data.settings.phone}</span>
                  </a>
                  <a href={`https://wa.me/${whatsapp}`} className="contact-channel">
                    <div className="contact-icon"><Phone size={16} /></div>
                    <span>واتساب – استشارة سريعة</span>
                  </a>
                  <div className="contact-channel">
                    <div className="contact-icon"><MapPin size={16} /></div>
                    <span>{data.settings.location_ar}</span>
                  </div>
                </div>
                <div className="contact-promise">
                  <div><strong>01</strong><span>مراجعة أولية للطلب</span></div>
                  <div><strong>02</strong><span>تحديد المستندات المطلوبة</span></div>
                  <div><strong>03</strong><span>اقتراح موعد مناسب للاستشارة</span></div>
                </div>
              </motion.div>

              <motion.form
                className="contact-form-card"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: 0.1 }}
              >
                <div className="form-title">أرسل طلب استشارة</div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">الاسم الكامل *</label>
                    <input id="name" name="name" type="text" placeholder="اسمك الرباعي" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">رقم الجوال *</label>
                    <input id="phone" name="phone" type="tel" placeholder="05xxxxxxxx" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">البريد الإلكتروني</label>
                  <input id="email" name="email" type="email" placeholder="example@company.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="service">الخدمة المطلوبة</label>
                  <select id="service" name="service" defaultValue="">
                    <option value="" disabled>اختر الخدمة...</option>
                    {data.services.map((s) => (
                      <option key={s.slug} value={s.title_ar}>{s.title_ar}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">ملخص الاحتياج القانوني</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="اكتب ملخصاً مختصراً للاحتياج أو المسألة القانونية..."
                    rows={4}
                  />
                </div>
                <button type="submit" className="form-submit" disabled={submitting}>
                  {submitting ? 'جاري الإرسال...' : (
                    <><Send size={14} /> إرسال الطلب</>
                  )}
                </button>
                {formStatus === 'success' && (
                  <p className="form-status">✓ تم استلام طلبك بنجاح. سيتواصل معك الفريق قريباً.</p>
                )}
                {formStatus === 'error' && (
                  <p className="form-status form-error">
                    تعذر إرسال الطلب. تواصل معنا عبر واتساب مباشرة.
                  </p>
                )}
              </motion.form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <strong>{data.settings.brand_ar}</strong>
              <small>{data.settings.brand_en}</small>
              <p>مكتب قانوني سعودي متخصص في الخدمات القانونية للأعمال والاستثمار. نجمع بين الدقة القانونية وفهم بيئة السوق.</p>
              <a href={`mailto:${data.settings.email}`}>
                <Mail size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 5 }} />
                {data.settings.email}
              </a>
              <a href={`tel:${data.settings.phone}`}>
                <Phone size={12} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 5 }} />
                {data.settings.phone}
              </a>
            </div>

            <div>
              <h4>روابط سريعة</h4>
              <div className="footer-links">
                {navItems.map((n) => (
                  <a key={n.href} href={n.href}>{n.label}</a>
                ))}
              </div>
            </div>

            <div>
              <h4>الخدمات القانونية</h4>
              <div className="footer-links">
                {data.services.map((s) => (
                  <a key={s.slug} href="#services">{s.title_ar}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 {data.settings.brand_ar}. جميع الحقوق محفوظة.</span>
            <span>المملكة العربية السعودية · الرياض</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
