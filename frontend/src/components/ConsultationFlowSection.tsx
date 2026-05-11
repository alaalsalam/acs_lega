import { motion } from 'framer-motion';
import { CalendarCheck, ClipboardCheck, MessageCircle, Sparkles } from 'lucide-react';

const consultationFlow = [
  {
    icon: MessageCircle,
    title: 'طلب الاستشارة',
    desc: 'تشاركنا ملخص المسألة، والقطاع، والهدف التجاري من الاستشارة.',
  },
  {
    icon: ClipboardCheck,
    title: 'فرز قانوني أولي',
    desc: 'نحدد درجة العجلة، المستندات المطلوبة، والمسار الأنسب للتعامل.',
  },
  {
    icon: CalendarCheck,
    title: 'جلسة تشخيص',
    desc: 'نناقش الوقائع ونرتب المخاطر والخيارات القانونية بلغة واضحة.',
  },
  {
    icon: Sparkles,
    title: 'خطة عمل قابلة للتنفيذ',
    desc: 'تستلم توصية عملية: ما الذي نفعله الآن، وما الذي يؤجل، ولماذا.',
  },
];

export default function ConsultationFlowSection() {
  return (
    <div className="flow-grid">
      {consultationFlow.map((item, index) => (
        <motion.div
          className="flow-card"
          key={item.title}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: index * 0.08, duration: 0.45 }}
        >
          <div className="flow-number">{String(index + 1).padStart(2, '0')}</div>
          <div className="flow-icon"><item.icon size={19} /></div>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}