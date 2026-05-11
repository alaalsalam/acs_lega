import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Gavel, X } from 'lucide-react';
import type { ChecklistItem } from '../types';

interface LegalChecklistProps {
  items: ChecklistItem[];
}

export default function LegalChecklist({ items }: LegalChecklistProps) {
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no'>>({});

  function toggle(index: number, val: 'yes' | 'no') {
    setAnswers((prev) => ({
      ...prev,
      [index]: prev[index] === val ? ('' as never) : val,
    }));
  }

  const answered = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter((v) => v === 'yes').length;
  const highRiskNo = items.filter(
    (item, i) => item.impact === 'high' && answers[i] === 'no'
  ).length;

  let resultMsg = '';
  let resultLevel: 'high' | 'medium' | 'low' = 'low';

  if (answered === 0) {
    resultMsg = 'أجب على الأسئلة لتحصل على تقييم مبدئي للاستعداد القانوني لشركتك.';
  } else if (highRiskNo > 0) {
    resultMsg = `لديك ${highRiskNo} نقطة خطر عالية تتطلب اهتماماً فورياً. ننصح بحجز استشارة لتقديم تقييم شامل.`;
    resultLevel = 'high';
  } else if (yesCount >= items.length * 0.7) {
    resultMsg = 'وضعك القانوني جيد. لكن نوصي بمراجعة دورية لضمان استمرار الامتثال.';
    resultLevel = 'medium';
  } else if (yesCount >= items.length * 0.4) {
    resultMsg = 'لديك أساس قانوني جيد لكن هناك نقاط تحتاج تحسين. يمكننا مساعدتك في ترتيب الأولويات.';
    resultLevel = 'low';
  } else {
    resultMsg = 'أنت في مرحلة تحتاج فيها بناء أسس قانونية متينة. ابدأ بتأسيس الحوكمة والامتثال.';
    resultLevel = 'high';
  }

  return (
    <div>
      <div className="checklist-grid">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="checklist-item"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <h4>{item.question}</h4>
            <div className="checklist-choices">
              <button
                className={`check-btn ${answers[i] === 'yes' ? 'selected-yes' : ''}`}
                onClick={() => toggle(i, 'yes')}
              >
                <CheckCircle2 size={13} />
                {item.yes_label}
              </button>
              <button
                className={`check-btn ${answers[i] === 'no' ? 'selected-no' : ''}`}
                onClick={() => toggle(i, 'no')}
              >
                <X size={13} />
                {item.no_label}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {answered > 0 && (
        <motion.div
          className={`checklist-result result-${resultLevel}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="checklist-result-header">
            <Gavel size={20} />
            <h3>التقييم المبدئي</h3>
          </div>
          <p>{resultMsg}</p>
          {resultLevel !== 'medium' && (
            <a href="/contact" className="checklist-cta">
              احجز استشارة مجانية <ArrowLeft size={13} />
            </a>
          )}
        </motion.div>
      )}
    </div>
  );
}