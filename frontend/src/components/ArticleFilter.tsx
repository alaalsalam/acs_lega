import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CalendarCheck, ChevronLeft, ScrollText } from 'lucide-react';
import type { Article } from '../types';
import ArticlePreviewModal from './ArticlePreviewModal';

const coverClassMap: Record<string, string> = {
  'foreign-investment':  'cover-foreign-investment',
  'company-formation':   'cover-company-formation',
  'contracts':           'cover-contracts',
  'governance':          'cover-governance',
  'ip':                  'cover-ip',
  'disputes':            'cover-disputes',
  'tax':                 'cover-tax',
  'sports':              'cover-sports',
  'data-protection':     'cover-data-protection',
  'legal-tech':          'cover-legal-tech',
  'labor':               'cover-labor',
  'residency':           'cover-residency',
};

interface ArticleFilterProps {
  articles: Article[];
  initialArticleSlug?: string;
}

export default function ArticleFilter({ articles, initialArticleSlug }: ArticleFilterProps) {
  const categories = ['الكل', ...Array.from(new Set(articles.map((a) => a.category_ar)))];
  const [active, setActive] = useState('الكل');
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);

  const filtered = active === 'الكل' ? articles : articles.filter((a) => a.category_ar === active);

  useEffect(() => {
    if (!initialArticleSlug) return;

    const article = articles.find((item) => item.slug === initialArticleSlug);
    if (!article) return;

    setActive(article.category_ar);
    setPreviewArticle(article);
  }, [articles, initialArticleSlug]);

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
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.3), duration: 0.4 }}
              layout
              onClick={() => setPreviewArticle(article)}
            >
              <div className={`article-cover ${coverClass}`}>
                <span className="article-cover-acronym">{acronym}</span>
                <div className="article-cover-overlay" />
              </div>
              <div className="article-body">
                <div className="article-meta">
                  <span className="article-cat">{article.category_ar}</span>
                  <span className="article-date">
                    {new Date(article.published_on).toLocaleDateString('ar-SA', {
                      year: 'numeric', month: 'short',
                    })}
                  </span>
                </div>
                <h3>{article.title_ar}</h3>
                <p>{article.excerpt_ar}</p>
                <div className="article-footer">
                  <button className="article-read-btn">
                    اقرأ الرؤية <ChevronLeft size={12} />
                  </button>
                  <span className="article-time">
                    <ScrollText size={11} />
                    {article.reading_time} د
                  </span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <AnimatePresence>
        {previewArticle && (
          <ArticlePreviewModal
            article={previewArticle}
            onClose={() => setPreviewArticle(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
