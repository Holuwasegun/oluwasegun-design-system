'use client';

import { Box, Card, CardContent, Typography, Grid, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, Chip, CircularProgress } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import DashboardLayout from '@/components/organisms/DashboardLayout';
import { useAnalytics, useActivities, useKpiCards } from '@/hooks';
import { timeAgo, formatCurrency, formatNumber } from '@/lib/mock-data';

function KpiCards() {
  const { data: kpis, isLoading } = useKpiCards();

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>;
  if (!kpis) return null;

  return (
    <Grid container spacing={2.5}>
      {kpis.map((kpi) => (
        <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={kpi.title}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  {kpi.title}
                </Typography>
                <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: `${kpi.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: kpi.color }} />
                </Box>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, fontSize: '1.5rem' }}>
                {kpi.value}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {kpi.change >= 0 ? (
                  <TrendingUp sx={{ fontSize: 14, color: 'success.main' }} />
                ) : (
                  <TrendingDown sx={{ fontSize: 14, color: 'error.main' }} />
                )}
                <Typography variant="caption" sx={{ color: kpi.change >= 0 ? 'success.main' : 'error.main', fontWeight: 600 }}>
                  {kpi.change >= 0 ? '+' : ''}{kpi.change}%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {kpi.changeLabel}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

function RevenueChart() {
  const { data: analytics, isLoading } = useAnalytics('30d');

  if (isLoading) return <Card><CardContent sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></CardContent></Card>;
  if (!analytics) return null;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Revenue Overview
        </Typography>
        <Box sx={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6750A4" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6750A4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E0EC" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #E7E0EC', fontSize: 12 }}
                formatter={(value) => [formatCurrency(value as number), 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6750A4" strokeWidth={2} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

function VisitorsChart() {
  const { data: analytics, isLoading } = useAnalytics('30d');

  if (isLoading) return <Card><CardContent sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></CardContent></Card>;
  if (!analytics) return null;

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Visitors & Sessions
        </Typography>
        <Box sx={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E7E0EC" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E7E0EC', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="visitors" fill="#6750A4" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sessions" fill="#D0BCFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
}

function RecentActivity() {
  const { data: activities, isLoading } = useActivities();
  const actionColors: Record<string, string> = {
    Login: '#2E7D32',
    View: '#0288D1',
    Edit: '#ED6C02',
    Delete: '#B3261E',
    Create: '#6750A4',
    Export: '#625B71',
  };

  if (isLoading) return <Card><CardContent sx={{ display: 'flex', justifyContent: 'center', py: 6 }}><CircularProgress /></CardContent></Card>;
  if (!activities) return null;

  const items = activities.slice(0, 8);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            Recent Activity
          </Typography>
          <Typography variant="caption" color="primary.main" sx={{ cursor: 'pointer', fontWeight: 600 }}>
            View all
          </Typography>
        </Box>
        <List disablePadding>
          {items.map((act, i) => (
            <Box key={act.id}>
              <ListItem disablePadding sx={{ py: 1 }}>
                <ListItemAvatar sx={{ minWidth: 40 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: '0.7rem', bgcolor: 'action.hover', color: 'text.secondary' }}>
                    {act.userName.split(' ').map((n) => n[0]).join('')}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box component="span" sx={{ fontSize: '0.8rem' }}>
                      <strong>{act.userName}</strong>{' '}
                      <span style={{ color: '#49454F' }}>{act.action.toLowerCase()}</span>{' '}
                      <strong>{act.target}</strong>
                    </Box>
                  }
                  secondary={timeAgo(act.timestamp)}
                  slotProps={{ secondary: { variant: 'caption', sx: { fontSize: '0.65rem' } } }}
                />
                <Chip
                  label={act.action}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.6rem',
                    fontWeight: 600,
                    bgcolor: `${actionColors[act.action]}15`,
                    color: actionColors[act.action],
                  }}
                />
              </ListItem>
              {i < 7 && <Divider />}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Welcome back. Here&apos;s what&apos;s happening with your platform.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <KpiCards />
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <RevenueChart />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <VisitorsChart />
          </Grid>
        </Grid>
        <RecentActivity />
      </Box>
    </DashboardLayout>
  );
}
