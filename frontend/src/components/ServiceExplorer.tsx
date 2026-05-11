import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, CheckCircle2, Eye, Scale, Shield,
} from 'lucide-react';
import type { Service } from '../types';
import ServiceIcon from './ServiceIcon';

interface ServiceExplorerProps {
  services: Service[];
  initialIndex?: number;
}

export default function ServiceExplorer({ services, initialIndex = 0 }: ServiceExplorerProps) {
  const [active, setActive] = useState(initialIndex);
  const current = services[active];

  return (
    <div className="services-layout">
      {/* Left: tab list */}
      <div className="services-tabs">
        {services.map((s, i) => (
          <button
            key={s.slug}
            className={`service-tab ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)}
            aria-pressed={i === active}
          >
            <div className="service-tab-icon">
              <ServiceIcon name={s.icon} size={17} />
            </div>
            <div className="service-tab-text">
              <div className="service-tab-title">{s.title_ar}</div>
              <div className="service-tab-sub">{s.summary_ar.slice(0, 50)}...</div>
            </div>
          </button>
        ))}
      </div>

      {/* Right: animated detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.slug}
          className="service-panel"
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.32 }}
        >
          <div className="service-panel-header">
            <div className="service-panel-icon">
              <ServiceIcon name={current.icon} size={24} />
            </div>
            <div>
              <h2>{current.title_ar}</h2>
              <p>{current.summary_ar}</p>
            </div>
          </div>

          <div className="service-panel-section">
            <h4><Eye size={12} /> متى تحتاج هذه الخدمة؟</h4>
            <p>{current.when_needed}</p>
          </div>

          <div className="service-panel-section">
            <h4><CheckCircle2 size={12} /> ما الذي نقدمه</h4>
            <ul>
              {current.deliverables.map((d) => (
                <li key={d}>
                  <span className="deliverable-dot" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="service-panel-section">
            <h4><Shield size={12} /> المخاطر التي نعالجها</h4>
            <div className="risk-items">
              {current.risks.map((r) => (
                <span key={r} className="risk-item">
                  <Scale size={11} />
                  {r}
                </span>
              ))}
            </div>
          </div>

          <div className="service-panel-footer">
            <a href="/contact" className="service-cta-link">
              احصل على هذه الخدمة <ArrowLeft size={13} />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}