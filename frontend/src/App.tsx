import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, Globe, Menu, Phone,
  Mail, Shield, X, Zap,
} from 'lucide-react';
import { useSiteData } from './hooks/useSiteData';
import { submitContact } from './api/frappe';
import type { SiteData } from './types';

// Pages
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';

// ── Shared: nav items ─────────────────────────────────────
const navItems = [
  { href: '/#about',     label: 'عن الشركة' },
  { href: '/#services',  label: 'الخدمات' },
  { href: '/#approach',  label: 'المنهجية' },
  { href: '/#articles',   label: 'الرؤى' },
  { href: '/#checklist', label: 'التقييم' },
  { href: '/contact',    label: 'تواصل' },
];

// ── Drawer ─────────────────────────────────────────────────
function Drawer({ data, onClose }: { data: SiteData; onClose: () => void }) {
  const whatsapp = data.settings.whatsapp.replace(/\D/g, '');
  return (
    <>
      <motion.div
        className="drawer-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="drawer"
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="drawer-head">
          <span className="brand-mark">ACS</span>
          <button className="drawer-close" onClick={onClose} aria-label="إغلاق">
            <X size={18} />
          </button>
        </div>
        <nav className="drawer-nav" aria-label="القائمة">
          {navItems.map((n) => (
            <a key={n.href} href={n.href} onClick={onClose}>{n.label}</a>
          ))}
        </nav>
        <div className="drawer-foot">
          <a
            className="cta-header"
            href={`https://wa.me/${whatsapp}`}
            onClick={onClose}
            style={{ justifyContent: 'center' }}
            target="_blank" rel="noopener noreferrer"
          >
            طلب استشارة الآن
          </a>
        </div>
      </motion.div>
    </>
  );
}

// ── Main App ───────────────────────────────────────────────
export default function App() {
  const { data } = useSiteData();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const location = useLocation();
  const whatsapp = data.settings.whatsapp.replace(/\D/g, '');

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

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
      {/* ── Header ── */}
      <header className="header">
        <a className="brand" href="/" aria-label="ACS Legal — الرئيسية">
          <span className="brand-mark">ACS</span>
          <span className="brand-text">
            <strong>{data.settings.brand_ar}</strong>
            <small>{data.settings.brand_en}</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {navItems.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>

        <div className="top-actions">
          <button className="lang-btn" aria-label="English version">EN</button>
          <a
            className="cta-header"
            href={`https://wa.me/${whatsapp}`}
            target="_blank" rel="noopener noreferrer"
          >
            طلب استشارة <ArrowLeft size={13} />
          </a>
          <button
            className="menu-toggle"
            onClick={() => setDrawerOpen(true)}
            aria-label="فتح القائمة"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {drawerOpen && <Drawer data={data} onClose={() => setDrawerOpen(false)} />}
      </AnimatePresence>

      {/* ── Page Content ── */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage data={data} />} />
          <Route path="/services" element={<ServicesPage data={data} />} />
          <Route path="/services/:slug" element={<ServicesPage data={data} />} />
          <Route path="/articles" element={<ArticlesPage data={data} />} />
          <Route path="/articles/:slug" element={<ArticlesPage data={data} />} />
          <Route path="/contact" element={
            <ContactPage
              data={data}
              formStatus={formStatus}
              submitting={submitting}
              onSubmit={handleSubmit}
            />
          } />
          {/* Catch-all → home */}
          <Route path="*" element={
            <LandingPage data={data} />
          } />
        </Routes>
      </main>

      {/* ── Footer ── */}
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
                  <a key={s.slug} href="/services">{s.title_ar}</a>
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