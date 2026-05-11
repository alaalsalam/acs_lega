import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CalendarCheck, ScrollText, X } from 'lucide-react';
import type { Article } from '../types';

const coverClassMap: Record<string, string> = {
  'foreign-investment':  'cover-foreign-investment',
  'company-formation': 'cover-company-formation',
  'contracts':          'cover-contracts',
  'governance':         'cover-governance',
  'ip':                 'cover-ip',
  'disputes':           'cover-disputes',
  'tax':                'cover-tax',
  'sports':             'cover-sports',
  'data-protection':    'cover-data-protection',
  'legal-tech':         'cover-legal-tech',
  'labor':              'cover-labor',
  'residency':          'cover-residency',
};

interface ArticlePreviewModalProps {
  article: Article;
  onClose: () => void;
}

export default function ArticlePreviewModal({ article, onClose }: ArticlePreviewModalProps) {
  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const coverClass = coverClassMap[article.category_slug] || 'cover-foreign-investment';

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-panel"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <button className="modal-close" onClick={onClose} aria-label="إغلاق">
            <X size={18} />
          </button>

          <div className={`modal-cover ${coverClass}`}>
            <span className="modal-cover-label">{article.category_ar}</span>
          </div>

          <div className="modal-body">
            <div className="modal-meta">
              <span>
                <CalendarCheck size={12} />
                {new Date(article.published_on).toLocaleDateString('ar-SA', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </span>
              <span>
                <ScrollText size={12} />
                {article.reading_time} دقيقة قراءة
              </span>
            </div>
            <h2 id="modal-title" className="modal-title">{article.title_ar}</h2>
            <p className="modal-excerpt">{article.excerpt_ar}</p>

            <div className="modal-cta-area">
              <p className="modal-cta-hint">
                للحصول على التحليل الكامل والنصائح العملية، تواصل مع فريقنا القانوني.
              </p>
              <a href="/contact" className="modal-cta-btn" onClick={onClose}>
                احجز استشارة متخصصة <ArrowLeft size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}