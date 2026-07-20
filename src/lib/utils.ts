import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatSalary(min?: number, max?: number, currency = 'USD', period = 'yearly'): string {
  if (min === undefined || max === undefined || min === null || max === null) {
    return 'Negotiable';
  }
  const fmt = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(0)}k`;
    return n.toString();
  };
  const sym = currency === 'USD' ? '$' : currency;
  const per = period === 'yearly' ? '/yr' : period === 'monthly' ? '/mo' : '/hr';
  return `${sym}${fmt(min)} - ${sym}${fmt(max)}${per}`;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export const JOB_CATEGORIES = [
  'Technology', 'Design', 'Marketing', 'Finance', 'Healthcare',
  'Education', 'Engineering', 'Sales', 'HR', 'Legal',
  'Data Science', 'Product', 'Operations', 'Customer Service', 'Other',
] as const;

export const JOB_TYPES = [
  { value: 'remote', label: 'Remote' },
  { value: 'onsite', label: 'On-site' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'part-time', label: 'Part-time' },
] as const;

export const EXPERIENCE_LEVELS = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior Level' },
  { value: 'lead', label: 'Lead' },
  { value: 'executive', label: 'Executive' },
] as const;

export const CATEGORY_ICONS: Record<string, string> = {
  Technology: '💻',
  Design: '🎨',
  Marketing: '📢',
  Finance: '💰',
  Healthcare: '🏥',
  Education: '📚',
  Engineering: '⚙️',
  Sales: '📈',
  HR: '👥',
  Legal: '⚖️',
  'Data Science': '📊',
  Product: '🚀',
  Operations: '🔧',
  'Customer Service': '🎧',
  Other: '💼',
};

export const TYPE_COLORS: Record<string, string> = {
  remote: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  onsite: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  hybrid: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'part-time': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export const EXPERIENCE_COLORS: Record<string, string> = {
  entry: 'bg-green-500/20 text-green-400',
  mid: 'bg-blue-500/20 text-blue-400',
  senior: 'bg-purple-500/20 text-purple-400',
  lead: 'bg-orange-500/20 text-orange-400',
  executive: 'bg-red-500/20 text-red-400',
};
