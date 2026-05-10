import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BadgeCheck, BriefcaseBusiness, Building2, Cpu, FileText, Landmark, Mail, Menu, Phone, ReceiptText, Scale, ShieldCheck, Trophy, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSiteData, submitContact } from './api/frappe';
import type { Service, SiteData } from './types';
import { fallbackData } from './data/fallback';

const icons = {
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

const nav = [
  { href: '#about', label: 'عن الشركة' },
  { href: '#services', label: 'الخدمات' },
  { href: '#approach', label: 'المنهجية' },
  { href: '#articles', label: 'المقالات' },
  { href: '#contact', label: 'تواصل معنا' },
];

function serviceIcon(service: Service) {
  return icons[service.icon as keyof typeof icons] || Scale;
}

export default function App() {
  const [data, setData] = useState<SiteData>(fallbackData);
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getSiteData().then(setData);
  }, []);

  const featuredServices = useMemo(() => data.services.slice(0, 9), [data.services]);
  const whatsapp = data.settings.whatsapp.replace(/\D/g, '');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus('');
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries()) as Record<string, string>;
    try {
      const result = await submitContact(payload);
      setStatus(result.success ? 'تم استلام طلبك، وسيتواصل معك الفريق قريباً.' : result.error || 'تعذر إرسال الطلب.');
      if (result.success) event.currentTarget.reset();
    } catch {
      setStatus('تعذر إرسال الطلب حالياً. يمكنك التواصل عبر واتساب مباشرة.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="ACS Legal">
          <span className="brand-mark">ACS</span>
          <span>
            <strong>{data.settings.brand_ar}</strong>
            <small>{data.settings.brand_en}</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="القائمة الرئيسية">
          {nav.map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <div className="top-actions">
          <a className="ghost-link" href="/en">ENG</a>
          <a className="primary-link" href={`https://wa.me/${whatsapp}`}>طلب استشارة</a>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="فتح القائمة">
            <Menu size={22} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-panel">
          <button className="menu-button close" onClick={() => setMenuOpen(false)} aria-label="إغلاق القائمة">
            <X size={22} />
          </button>
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
          ))}
          <a href={`https://wa.me/${whatsapp}`} onClick={() => setMenuOpen(false)}>طلب استشارة</a>
        </div>
      )}

      <main>
        <section className="hero">
          <div className="hero-copy">
            <motion.span className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              شريك قانوني للأعمال والاستثمار في السعودية
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              {data.settings.brand_ar}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
              {data.settings.tagline_ar}. نقدم حماية قانونية استباقية للشركات والمستثمرين عبر فهم دقيق للأنظمة السعودية ومتطلبات السوق.
            </motion.p>
            <div className="hero-actions">
              <a className="primary-link large" href="#contact">ابدأ بطلب استشارة <ArrowLeft size={18} /></a>
              <a className="secondary-link" href="#services">استعراض الخدمات</a>
            </div>
          </div>

          <div className="hero-panel" aria-label="ملخص خدمات ACS Legal">
            <div className="panel-header">
              <ShieldCheck size={28} />
              <span>Legal Operating Partner</span>
            </div>
            <dl>
              {data.stats.map((stat) => (
                <div key={stat.label_ar}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label_ar}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="about" className="section two-col">
          <div>
            <span className="section-kicker">عن ACS Legal</span>
            <h2>مكتب قانوني يفهم لغة الأعمال قبل صياغة الحل القانوني.</h2>
          </div>
          <div className="body-copy">
            <p>
              تأسست شركة معايير الامتثال المتقدمة لمواكبة النهضة الاقتصادية والتشريعية في المملكة العربية السعودية. تعمل الشركة كجسر قانوني آمن للشركات الأجنبية الراغبة في الاستثمار، وللشركات الوطنية الساعية للتوسع والنمو.
            </p>
            <p>
              فلسفة العمل تقوم على الوقاية القانونية، سرعة الاستجابة، وضوح التواصل، وحلول قابلة للتنفيذ داخل بيئة الأعمال لا داخل الورق فقط.
            </p>
          </div>
        </section>

        <section id="services" className="section">
          <div className="section-head">
            <span className="section-kicker">الخدمات</span>
            <h2>تغطية قانونية متكاملة لدورة حياة الشركة.</h2>
          </div>
          <div className="services-grid">
            {featuredServices.map((service, index) => {
              const Icon = serviceIcon(service);
              return (
                <motion.article
                  className="service-card"
                  key={service.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Icon size={26} />
                  <h3>{service.title_ar}</h3>
                  <p>{service.summary_ar}</p>
                  <ul>
                    {service.points_ar.slice(0, 3).map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="approach" className="section approach">
          <div className="section-head">
            <span className="section-kicker">المنهجية</span>
            <h2>من تشخيص المخاطر إلى تنفيذ القرار.</h2>
          </div>
          <div className="steps">
            {['فهم السياق التجاري', 'تحليل المخاطر النظامية', 'صياغة الحل القانوني', 'المتابعة والتحسين'].map((step, index) => (
              <div className="step" key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step}</h3>
              </div>
            ))}
          </div>
        </section>

        <section id="articles" className="section">
          <div className="section-head row">
            <div>
              <span className="section-kicker">المقالات</span>
              <h2>رؤى قانونية مختصرة للإدارة والمستثمرين.</h2>
            </div>
            <a className="secondary-link" href="/articles">جميع المقالات</a>
          </div>
          <div className="articles-grid">
            {data.articles.map((article) => (
              <article className="article-card" key={article.slug}>
                <span>{article.category_ar}</span>
                <h3>{article.title_ar}</h3>
                <p>{article.excerpt_ar}</p>
                <small>{article.published_on} · {article.reading_time} دقائق</small>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-copy">
            <span className="section-kicker">تواصل معنا</span>
            <h2>ابدأ بتحويل المسألة القانونية إلى خطة واضحة.</h2>
            <p>املأ النموذج وسيتم تسجيل الطلب داخل Frappe كفرصة أو تواصل وارد حسب توفر DocTypes في النظام.</p>
            <div className="contact-lines">
              <a href={`mailto:${data.settings.email}`}><Mail size={18} />{data.settings.email}</a>
              <a href={`tel:${data.settings.phone}`}><Phone size={18} />{data.settings.phone}</a>
            </div>
          </div>
          <form className="contact-form" onSubmit={onSubmit}>
            <input name="name" placeholder="الاسم الكامل" required />
            <input name="phone" placeholder="رقم الجوال" required />
            <input name="email" type="email" placeholder="البريد الإلكتروني" />
            <select name="service" defaultValue="">
              <option value="" disabled>اختر الخدمة</option>
              {data.services.map((service) => <option key={service.slug} value={service.title_ar}>{service.title_ar}</option>)}
            </select>
            <textarea name="message" placeholder="اكتب ملخص الاحتياج القانوني" rows={5} />
            <button className="primary-link large" disabled={submitting}>{submitting ? 'جاري الإرسال...' : 'إرسال الطلب'}</button>
            {status && <p className="form-status">{status}</p>}
          </form>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>{data.settings.brand_ar}</strong>
          <p>{data.settings.tagline_ar}</p>
        </div>
        <div className="footer-links">
          {nav.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </div>
      </footer>
    </div>
  );
}
