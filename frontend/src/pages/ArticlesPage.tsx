import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { SiteData } from '../types';
import ArticleFilter from '../components/ArticleFilter';

interface ArticlesPageProps {
  data: SiteData;
}

export default function ArticlesPage({ data }: ArticlesPageProps) {
  const navigate = useNavigate();
  const { slug } = useParams();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // If there's a slug param, we could expand a specific article
  // For now we show the full articles section
  const article = slug ? data.articles.find((a) => a.slug === slug) : null;

  return (
    <div className="page-articles">
      {/* Hero bar */}
      <div className="page-hero-bar">
        <div className="container">
          <button className="page-back-btn" onClick={() => navigate('/')}>
            <ArrowLeft size={14} />
            العودة للرئيسية
          </button>
          <h1>الرؤى القانونية</h1>
          <p>مقالات قانونية مبسطة للمدراء والمستثمرين في السوق السعودي.</p>
          <span className="articles-count">{data.articles.length} مقال</span>
        </div>
      </div>

      <section className="section articles-section">
        <div className="container">
          <ArticleFilter articles={data.articles} />
        </div>
      </section>
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