export type ScreenType = 'finance' | 'business' | 'education' | 'signup';

export interface ScreenMeta {
  type: ScreenType;
  label: string;
  description: string;
  icon: string;
}

export const SCREENS: ScreenMeta[] = [
  { type: 'finance', label: 'Finance', description: 'Banking dashboard with balance, transactions, and quick actions', icon: '💰' },
  { type: 'business', label: 'Business', description: 'SaaS analytics dashboard with KPIs, charts, and team overview', icon: '📊' },
  { type: 'education', label: 'Education', description: 'Learning platform with courses, progress tracking, and schedule', icon: '🎓' },
  { type: 'signup', label: 'Signup', description: 'Multi-step registration form with validation and social login', icon: '✍️' },
];
