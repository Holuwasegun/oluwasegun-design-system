'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import DashboardLayout from '@/components/organisms/DashboardLayout';
import { useAnalytics } from '@/hooks';
import { formatCurrency, formatNumber } from '@/lib/mock-data';

const PIE_COLORS = ['#6750A4', '#D0BCFF', '#7D5260', '#CAC4D0'];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d');
  const { data: analytics, isLoading } = useAnalytics(period);

  const pieData = [
    { name: 'Direct', value: 4000 },
    { name: 'Organic', value: 3000 },
    { name: 'Referral', value: 2000 },
    { name: 'Social', value: 1500 },
  ];

  const handleExport = () => {
    if (!analytics) return;
    const headers = ['Date', 'Revenue', 'Visitors', 'Sessions', 'Conversions'];
    const rows = analytics.map((d) => [d.date, d.revenue, d.visitors, d.sessions, d.conversions]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${period}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>Analytics</Typography>
          <Typography variant="body2" color="text.secondary">Track performance metrics and trends.</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <TextField select size="small" value={period} onChange={(e) => setPeriod(e.target.value)} sx={{ minWidth: 120 }}>
            <MenuItem value="7d">Last 7 days</MenuItem>
            <MenuItem value="30d">Last 30 days</MenuItem>
            <MenuItem value="90d">Last 90 days</MenuItem>
          </TextField>
          <Button variant="outlined" startIcon={<DownloadIcon />} size="small" onClick={handleExport}>Export CSV</Button>
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
      ) : !analytics ? null : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* KPI Row */}
          <Grid container spacing={2.5}>
            {[
              { label: 'Total Revenue', value: formatCurrency(analytics.reduce((s, d) => s + d.revenue, 0)) },
              { label: 'Total Visitors', value: formatNumber(analytics.reduce((s, d) => s + d.visitors, 0)) },
              { label: 'Avg Sessions/Day', value: formatNumber(Math.round(analytics.reduce((s, d) => s + d.sessions, 0) / analytics.length)) },
              { label: 'Total Conversions', value: formatNumber(analytics.reduce((s, d) => s + d.conversions, 0)) },
            ].map((kpi) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={kpi.label}>
                <Card><CardContent sx={{ p: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>{kpi.label}</Typography>
                   <Typography variant="h5" sx={{ fontWeight: 700 }}>{kpi.value}</Typography>
                </CardContent></Card>
              </Grid>
            ))}
          </Grid>

          {/* Charts */}
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <Card><CardContent sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Revenue Trend</Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E7E0EC" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                      <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E7E0EC', fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Line type="monotone" dataKey="revenue" stroke="#6750A4" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="conversions" stroke="#7D5260" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent></Card>
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Card><CardContent sx={{ p: 2.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Traffic Sources</Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                        {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #E7E0EC', fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent></Card>
            </Grid>
          </Grid>

          {/* Data Table */}
          <Card><CardContent sx={{ p: 2.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Daily Breakdown</Typography>
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px' }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                    <TableCell align="right">Visitors</TableCell>
                    <TableCell align="right">Sessions</TableCell>
                    <TableCell align="right">Conversions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analytics.slice(-10).map((row) => (
                    <TableRow key={row.date} hover>
                      <TableCell>{row.date}</TableCell>
                      <TableCell align="right">{formatCurrency(row.revenue)}</TableCell>
                      <TableCell align="right">{formatNumber(row.visitors)}</TableCell>
                      <TableCell align="right">{formatNumber(row.sessions)}</TableCell>
                      <TableCell align="right">{formatNumber(row.conversions)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent></Card>
        </Box>
      )}
    </DashboardLayout>
  );
}
