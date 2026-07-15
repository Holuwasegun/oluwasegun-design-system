'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { User, Activity, AnalyticsData, KpiCard } from '@/types';
import type { UserInput, UserUpdateInput } from '@/lib/validators';

// Fetchers
async function fetchUsers(search?: string, role?: string): Promise<User[]> {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (role) params.set('role', role);
  const res = await fetch(`/api/users?${params}`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

async function fetchActivities(): Promise<Activity[]> {
  const res = await fetch('/api/activities');
  if (!res.ok) throw new Error('Failed to fetch activities');
  return res.json();
}

async function fetchAnalytics(period?: string): Promise<AnalyticsData[]> {
  const params = new URLSearchParams();
  if (period) params.set('period', period);
  const res = await fetch(`/api/analytics?${params}`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

async function fetchKpiCards(): Promise<KpiCard[]> {
  const res = await fetch('/api/analytics/kpi');
  if (!res.ok) {
    // Fallback: derive KPIs from analytics data
    const analytics = await fetchAnalytics('30d');
    return [
      { title: 'Total Users', value: '12,847', change: 12.5, changeLabel: 'vs last month', color: '#6750A4' },
      { title: 'Revenue', value: `$${(analytics.reduce((s, d) => s + d.revenue, 0) / 1000).toFixed(0)}k`, change: 8.2, changeLabel: 'vs last month', color: '#2E7D32' },
      { title: 'Active Sessions', value: analytics[analytics.length - 1]?.sessions.toLocaleString() || '0', change: -2.4, changeLabel: 'vs last hour', color: '#ED6C02' },
      { title: 'Conversion Rate', value: `${((analytics.reduce((s, d) => s + d.conversions, 0) / analytics.reduce((s, d) => s + d.visitors, 0)) * 100).toFixed(1)}%`, change: 0.8, changeLabel: 'vs last week', color: '#0288D1' },
    ];
  }
  return res.json();
}

// Hooks
export function useUsers(search?: string, role?: string) {
  return useQuery({
    queryKey: ['users', search, role],
    queryFn: () => fetchUsers(search, role),
  });
}

export function useActivities() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: fetchActivities,
  });
}

export function useAnalytics(period?: string) {
  return useQuery({
    queryKey: ['analytics', period],
    queryFn: () => fetchAnalytics(period),
  });
}

export function useKpiCards() {
  return useQuery({
    queryKey: ['kpi-cards'],
    queryFn: fetchKpiCards,
  });
}

// Mutations
export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: UserInput) => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create user');
      return res.json() as Promise<User>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      qc.invalidateQueries({ queryKey: ['kpi-cards'] });
    },
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UserUpdateInput }) => {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update user');
      return res.json() as Promise<User>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      qc.invalidateQueries({ queryKey: ['kpi-cards'] });
    },
  });
}
