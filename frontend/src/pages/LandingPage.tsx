import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft, BookOpen, Building2, CalendarCheck, CheckCircle2,
  ClipboardCheck, Eye, Globe, Landmark, MessageCircle, Phone,
  Quote, Scale, ScrollText, Send, Shield, Sparkles, Target,
  Trophy, Zap,
} from 'lucide-react';
import type { SiteData } from '../types';
import ArticleFilter from '../components/ArticleFilter';
import FAQAccordion from '../components/FAQAccordion';
import LegalChecklist from '../components/LegalChecklist';
import ConsultationFlowSection from '../components/ConsultationFlowSection';

interface LandingPageProps {
  data: SiteData;
}

// ── Animation helpers ─────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
const stagger = { show: { transition: { staggerChildren: 0.08 } } };

// ── Hero case data ─────────────────────────────────────────
const heroCases = [
  { type: 'استثمار أجنبي', status: 'قيد المعالجة', name: 'ترخيص دخول السوق السعودي', detail: 'هيكلة الكيان · مراجعة القيود النظامية' },
  { type: 'نزاع تجاري', status: 'تقييم أولي', name: 'مطالبة تعاقدية مع شريك', detail: 'تحليل العقد · خيارات التسوية والتحكيم' },
  { type: 'ملكية فكرية', status: 'جاهز للتقديم', name: 'تسجيل علامة تجارية', detail: 'تصنيف العلامة · بحث التعارضات' },
  { type: 'امتثال', status: 'متابعة دورية', name: 'مراجعة زكوية وضريبية', detail: 'تقليل المخاطر · جدول الالتزامات' },
];

// ── Static content ─────────────────────────────────────────
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

const stats = [
  { value: '15+', label: 'سنة خبرة قانونية' },
  { value: '500+', label: 'قضية منجزة' },
  { value: '10+', label: 'مجالات خدمة قانونية' },
  { value: '24h', label: 'متوسط الاستجابة' },
];

// ── Landing Page ───────────────────────────────────────────
export default function LandingPage({ data }: LandingPageProps) {
  const whatsapp = data.settings.whatsapp.replace(/\D/g, '');

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-grid-pattern" />
        <div className="hero-bottom-fade" />

        <div className="hero-inner">
          {/* Left: messaging */}
          <motion.div
            variants={stagger} initial="hidden" animate="show"
            className="hero-content"
          >
            <motion.div className="hero-eyebrow" variants={fadeUp}>
              مكتب محاماة واستشارات قانونية للأعمال في السعودية
            </motion.div>
            <motion.h1 className="hero-title" variants={fadeUp}>
              قرارات قانونية<br />
              تحمي أعمالك و<em>تفتح مسار النمو.</em>
            </motion.h1>
            <motion.p className="hero-desc" variants={fadeUp}>
              ACS Legal شريكك القانوني للشركات والمستثمرين في السوق السعودي. نقرأ المخاطر، نصيغ الحل، ونحوّل المسألة القانونية إلى خطة واضحة قابلة للتنفيذ.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp}>
              <a className="btn-primary" href="/contact">
                ابدأ استشارتك <ArrowLeft size={15} />
              </a>
              <a className="btn-ghost" href="/services">
                اكتشف خدماتنا
              </a>
            </motion.div>
            <motion.div className="hero-proof-row" variants={fadeUp}>
              {[
                { icon: CheckCircle2, text: 'استشارة واضحة بلا تعقيد' },
                { icon: Shield, text: 'سرية مهنية منذ أول تواصل' },
                { icon: Zap, text: 'استجابة خلال 24 ساعة' },
              ].map((item) => (
                <span key={item.text} className="proof-chip">
                  <item.icon size={12} />
                  {item.text}
                </span>
              ))}
            </motion.div>
            <motion.div className="hero-badge" variants={fadeUp}>
              <span className="hero-badge-dot" />
              متاحون لاستقبال الطلبات العاجلة خلال أيام العمل
            </motion.div>
          </motion.div>

          {/* Right: Advisory Desk */}
          <motion.div
            className="hero-command"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.55 }}
            aria-label="لوحة الملفات القانونية"
          >
            <div className="hero-command-head">
              <span className="hero-command-title">ACS Advisory Desk</span>
              <div className="hero-command-dots">
                <span /><span /><span />
              </div>
            </div>
            <div className="hero-command-body">
              <div className="hero-command-summary">
                <div className="summary-card">
                  <span>مسارات نشطة</span>
                  <strong>04</strong>
                </div>
                <div className="summary-card">
                  <span>حالة الإنجاز</span>
                  <strong>83%</strong>
                </div>
              </div>
              {heroCases.map((c, i) => (
                <motion.div
                  key={i}
                  className="hero-case"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.65 + i * 0.09, duration: 0.35 }}
                >
                  <div className="hero-case-labels">
                    <span className="hero-case-type">{c.type}</span>
                    <span className={`hero-case-status status-${i % 3 === 0 ? 'active' : i % 2 === 0 ? 'review' : 'ready'}`}>{c.status}</span>
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
              transition={{ duration: 0.6, delay: 0.12 }}
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
                <div className="trust-icon"><t.icon size={21} /></div>
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
          <ConsultationFlowSection />
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

      {/* ── Services ── */}
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
              <h2 className="section-title">
                عشرة مجالات قانونية.<br />نظرة واحدة تكفي.
              </h2>
              <p className="section-subtitle" style={{ marginTop: 10 }}>
                اختر أي خدمة لتعرف متى تحتاجها وما الذي نقدمه والمخاطر التي نعالجها.
              </p>
            </motion.div>
            <a href="/services" className="btn-ghost" style={{ flexShrink: 0, fontSize: '0.82rem' }}>
              عرض كل الخدمات
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {/* Inline service preview (first 4 services) */}
            <div className="services-preview-grid">
              {data.services.slice(0, 4).map((s, i) => (
                <motion.a
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="service-preview-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <div className="service-preview-icon">
                    <Landmark size={20} />
                  </div>
                  <div>
                    <h3>{s.title_ar}</h3>
                    <p>{s.summary_ar.slice(0, 60)}...</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="section-cross-link"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a href="/services" className="cross-link-text">
              اكتشف كل الخدمات العشرة
              <ArrowLeft size={13} />
            </a>
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
          {stats.map((s, i) => (
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

      {/* ── Team / Founder ── */}
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
              transition={{ duration: 0.6, delay: 0.12 }}
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
              <h2 className="section-title">
                مقالات قانونية مبسطة<br />للمديرين والمستثمرين.
              </h2>
            </motion.div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
              <span className="articles-count">{data.articles.length} مقال</span>
              <a href="/articles" className="btn-ghost" style={{ fontSize: '0.82rem' }}>
                جميع المقالات
              </a>
            </div>
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
              أجب على 5 أسئلة للحصول على تقييم مبدئي للاستعداد القانوني لشركتك.
              هذا التقييم لا يغني عن الاستشارة المتخصصة.
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

          <motion.div
            className="section-cross-link"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ marginTop: 28 }}
          >
            <a href="/contact" className="cross-link-text">
              لديك سؤال آخر؟ تواصل معنا مباشرة
              <ArrowLeft size={13} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
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
          <a className="cta-btn" href="/contact">
            تواصل معنا الآن <ArrowLeft size={15} />
          </a>
        </motion.div>
      </div>
    </>
  );
}