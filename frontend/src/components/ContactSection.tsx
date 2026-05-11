import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import type { SiteData } from '../types';

interface ContactSectionProps {
  data: SiteData;
  formStatus: string;
  submitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ContactSection({ data, formStatus, submitting, onSubmit }: ContactSectionProps) {
  const whatsapp = data.settings.whatsapp.replace(/\D/g, '');

  return (
    <section className="section contact-section">
      <div className="container">
        <div className="contact-grid">
          {/* Info column */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
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
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-channel"
              >
                <div className="contact-icon"><MessageCircle size={16} /></div>
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

          {/* Form column */}
          <motion.form
            className="contact-form-card"
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div className="form-title">أرسل طلب استشارة</div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">الاسم الكامل *</label>
                <input id="name" name="name" type="text" placeholder="اسمك الرباعي" required autoComplete="name" />
              </div>
              <div className="form-group">
                <label htmlFor="phone">رقم الجوال *</label>
                <input id="phone" name="phone" type="tel" placeholder="05xxxxxxxx" required autoComplete="tel" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">البريد الإلكتروني</label>
              <input id="email" name="email" type="email" placeholder="example@company.com" autoComplete="email" />
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
              {submitting ? (
                <span className="submitting-text">جاري الإرسال...</span>
              ) : (
                <><Send size={14} /> إرسال الطلب</>
              )}
            </button>
            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.p
                  className="form-status"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  تم استلام طلبك بنجاح. سيتواصل معك الفريق قريباً.
                </motion.p>
              )}
              {formStatus === 'error' && (
                <motion.p
                  className="form-status form-error"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  تعذر إرسال الطلب. تواصل معنا عبر واتساب مباشرة.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}