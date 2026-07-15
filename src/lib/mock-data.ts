import { format, formatDistanceToNow } from 'date-fns';
import { faker } from '@faker-js/faker';
import type { User, Activity, AnalyticsData, KpiCard } from '@/types';

faker.seed(42);

export const mockUsers: User[] = Array.from({ length: 24 }, (_, i) => ({
  id: `usr_${i + 1}`,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  role: (['Admin', 'Manager', 'User'] as const)[faker.number.int({ min: 0, max: 2 })],
  avatar: faker.image.avatar(),
  createdAt: faker.date.past({ years: 2 }).toISOString(),
  lastActive: faker.date.recent({ days: 30 }).toISOString(),
  status: faker.datatype.boolean(0.85) ? 'active' : 'inactive',
}));

export const mockActivities: Activity[] = Array.from({ length: 20 }, (_, i) => ({
  id: `act_${i + 1}`,
  userId: `usr_${faker.number.int({ min: 1, max: 24 })}`,
  userName: faker.person.fullName(),
  action: (['Login', 'View', 'Edit', 'Delete', 'Create', 'Export'] as const)[faker.number.int({ min: 0, max: 5 })],
  target: faker.helpers.arrayElement(['Dashboard', 'User Profile', 'Report Q4', 'Settings', 'Analytics', 'Project Alpha', 'Invoice #1042']),
  timestamp: faker.date.recent({ days: 7 }).toISOString(),
}));

export const mockAnalytics: AnalyticsData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: format(date, 'MMM dd'),
    revenue: faker.number.int({ min: 12000, max: 48000 }),
    visitors: faker.number.int({ min: 800, max: 3500 }),
    sessions: faker.number.int({ min: 1200, max: 5000 }),
    conversions: faker.number.int({ min: 40, max: 300 }),
  };
});

export const kpiCards: KpiCard[] = [
  { title: 'Total Users', value: '12,847', change: 12.5, changeLabel: 'vs last month', color: '#6750A4' },
  { title: 'Revenue', value: '$284,392', change: 8.2, changeLabel: 'vs last month', color: '#2E7D32' },
  { title: 'Active Sessions', value: '3,241', change: -2.4, changeLabel: 'vs last hour', color: '#ED6C02' },
  { title: 'Conversion Rate', value: '4.6%', change: 0.8, changeLabel: 'vs last week', color: '#0288D1' },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function formatDate(dateStr: string): string {
  return format(new Date(dateStr), 'MMM dd, yyyy');
}

export function formatDateTime(dateStr: string): string {
  return format(new Date(dateStr), 'MMM dd, yyyy HH:mm');
}

export function timeAgo(dateStr: string): string {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
}
