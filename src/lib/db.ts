import { mockUsers, mockActivities, mockAnalytics, kpiCards } from './mock-data';
import type { User, Activity, AnalyticsData, KpiCard } from '@/types';

// Stateless data generators for Vercel serverless.
// faker.seed(42) ensures identical data on every invocation.
// In-memory mutations won't survive cold starts, so CRUD
// endpoints return deterministic mock data instead.

export function getUsers(search?: string, role?: string): User[] {
  return mockUsers.filter((u) => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !role || role === 'all' || u.role === role;
    return matchSearch && matchRole;
  });
}

export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function createUser(data: Omit<User, 'id' | 'avatar' | 'createdAt' | 'lastActive'>): User {
  return {
    ...data,
    id: `usr_${Date.now()}`,
    avatar: '',
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
  };
}

export function updateUser(id: string, data: Partial<Omit<User, 'id'>>): User | null {
  const existing = mockUsers.find((u) => u.id === id);
  if (!existing) return null;
  return { ...existing, ...data, lastActive: new Date().toISOString() };
}

export function deleteUser(_id: string): boolean {
  return true;
}

export function getActivities(): Activity[] {
  return [...mockActivities];
}

export function getAnalytics(period?: string): AnalyticsData[] {
  if (!period || period === '30d') return [...mockAnalytics];
  const days = period === '7d' ? 7 : period === '90d' ? 90 : 30;
  return mockAnalytics.slice(-days);
}

export function getKpiCards(): KpiCard[] {
  return [...kpiCards];
}
