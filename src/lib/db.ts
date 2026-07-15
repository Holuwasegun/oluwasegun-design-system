import { mockUsers, mockActivities, mockAnalytics, kpiCards } from './mock-data';
import type { User, Activity, AnalyticsData, KpiCard } from '@/types';

const users: User[] = [...mockUsers];
const activities: Activity[] = [...mockActivities];
const analytics: AnalyticsData[] = [...mockAnalytics];

let nextUserId = users.length + 1;
let nextActivityId = activities.length + 1;

// Users
export function getUsers(search?: string, role?: string): User[] {
  return users.filter((u) => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = !role || role === 'all' || u.role === role;
    return matchSearch && matchRole;
  });
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function createUser(data: Omit<User, 'id' | 'avatar' | 'createdAt' | 'lastActive'>): User {
  const user: User = {
    ...data,
    id: `usr_${nextUserId++}`,
    avatar: '',
    createdAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
  };
  users.unshift(user);
  return user;
}

export function updateUser(id: string, data: Partial<Omit<User, 'id'>>): User | null {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...data, lastActive: new Date().toISOString() };
  return users[idx];
}

export function deleteUser(id: string): boolean {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}

// Activities
export function getActivities(): Activity[] {
  return [...activities];
}

// Analytics
export function getAnalytics(period?: string): AnalyticsData[] {
  if (!period || period === '30d') return [...analytics];
  const days = period === '7d' ? 7 : period === '90d' ? 90 : 30;
  return analytics.slice(-days);
}

// KPI
export function getKpiCards(): KpiCard[] {
  return [...kpiCards];
}
