import {
  BadgeCheck, Building2, BriefcaseBusiness,
  Cpu, FileText, Landmark, ReceiptText, Scale, Trophy,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  scale: Scale,
  'file-text': FileText,
  'building-2': Building2,
  'briefcase-business': BriefcaseBusiness,
  landmark: Landmark,
  'badge-check': BadgeCheck,
  trophy: Trophy,
  'receipt-text': ReceiptText,
  cpu: Cpu,
};

interface ServiceIconProps {
  name: string;
  size?: number;
}

export default function ServiceIcon({ name, size = 20 }: ServiceIconProps) {
  const Icon = iconMap[name] ?? Scale;
  return <Icon size={size} />;
}