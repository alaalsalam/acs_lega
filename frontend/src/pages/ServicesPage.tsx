import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { SiteData } from '../types';
import ServiceExplorer from '../components/ServiceExplorer';

interface ServicesPageProps {
  data: SiteData;
}

export default function ServicesPage({ data }: ServicesPageProps) {
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // If a service slug is provided, we could auto-select it
  const serviceIndex = slug
    ? data.services.findIndex((s) => s.slug === slug)
    : 0;

  return (
    <div className="page-services">
      {/* Hero bar */}
      <div className="page-hero-bar">
        <div className="container">
          <button className="page-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={14} />
            العودة للرئيسية
          </button>
          <h1>الخدمات القانونية</h1>
          <p>عشرة مجالات قانونية تغطي جميع احتياجات الشركات والمستثمرين.</p>
          <span className="articles-count">{data.services.length} خدمة</span>
        </div>
      </div>

      <section className="section services-section">
        <div className="container">
          <ServiceExplorer services={data.services} initialIndex={serviceIndex >= 0 ? serviceIndex : 0} />
        </div>
      </section>

      {/* Cross-link to contact */}
      <div className="page-cross-section">
        <div className="container">
          <p>هل تحتاج مساعدة في اختيار الخدمة المناسبة؟</p>
          <a href="/contact" className="btn-primary">
            تواصل معنا <ArrowLeft size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

function ArrowLeft(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? 16} height={props.size ?? 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}