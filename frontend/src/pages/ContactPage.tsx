import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SiteData } from '../types';
import ContactSection from '../components/ContactSection';

interface ContactPageProps {
  data: SiteData;
  formStatus: string;
  submitting: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ContactPage({ data, formStatus, submitting, onSubmit }: ContactPageProps) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="page-contact">
      {/* Hero bar */}
      <div className="page-hero-bar">
        <div className="container">
          <button className="page-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={14} />
            العودة للرئيسية
          </button>
          <h1>تواصل معنا</h1>
          <p>حوّل مسألتك القانونية إلى خطة واضحة.</p>
        </div>
      </div>

      <ContactSection
        data={data}
        formStatus={formStatus}
        submitting={submitting}
        onSubmit={onSubmit}
      />
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