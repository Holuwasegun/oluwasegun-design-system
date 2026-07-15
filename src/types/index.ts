export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'User';
  avatar: string;
  createdAt: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  action: 'Login' | 'View' | 'Edit' | 'Delete' | 'Create' | 'Export';
  target: string;
  timestamp: string;
}

export interface AnalyticsData {
  date: string;
  revenue: number;
  visitors: number;
  sessions: number;
  conversions: number;
}

export interface KpiCard {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  color: string;
}
