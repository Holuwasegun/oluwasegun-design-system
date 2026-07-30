'use client';

import React, { useMemo } from 'react';
import {
  Box, Typography, Button, Card, CardContent, Avatar, Stack, Divider,
  TextField, IconButton, Paper, LinearProgress, Chip, Badge,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, List, ListItem, ListItemIcon, ListItemText,
  Alert,
} from '@mui/material';
import {
  Dashboard as DashboardIcon, ShoppingCart, BarChart, Layers,
  Notifications, Search, TrendingUp, TrendingDown,
  AttachMoney, People, School, Assignment, CalendarToday,
  CheckCircle, Google, GitHub,
} from '@mui/icons-material';
import type { ScreenType } from '@/lib/screen-templates';
import type { PreviewTokens } from '@/lib/token-utils';

// ---------- Token-to-MUI-theme adapter ----------
function buildMuiTheme(tokens: PreviewTokens) {
  const s = tokens.scheme;
  return {
    palette: {
      mode: tokens.mode,
      primary: { main: s.primary, light: s.primaryContainer, dark: s.onPrimaryContainer, contrastText: s.onPrimary },
      secondary: { main: s.secondary, light: s.secondaryContainer, dark: s.onSecondaryContainer, contrastText: s.onSecondary },
      error: { main: s.error, light: s.errorContainer, dark: s.onErrorContainer, contrastText: s.onError },
      warning: { main: s.tertiary, light: s.tertiaryContainer, dark: s.onTertiaryContainer, contrastText: s.onTertiary },
      background: { default: s.background, paper: s.surfaceContainerLow },
      text: { primary: s.onBackground, secondary: s.onSurfaceVariant },
      divider: s.outlineVariant,
    },
    typography: {
      fontFamily: tokens.typography.fontFamily,
      h1: { fontSize: tokens.typography.styles['Display Large']?.fontSize ?? 57, fontWeight: tokens.typography.styles['Display Large']?.fontWeight ?? 400 },
      h2: { fontSize: tokens.typography.styles['Display Medium']?.fontSize ?? 45, fontWeight: tokens.typography.styles['Display Medium']?.fontWeight ?? 400 },
      h3: { fontSize: tokens.typography.styles['Display Small']?.fontSize ?? 36, fontWeight: tokens.typography.styles['Display Small']?.fontWeight ?? 400 },
      h4: { fontSize: tokens.typography.styles['Headline Large']?.fontSize ?? 32, fontWeight: tokens.typography.styles['Headline Large']?.fontWeight ?? 400 },
      h5: { fontSize: tokens.typography.styles['Headline Medium']?.fontSize ?? 28, fontWeight: tokens.typography.styles['Headline Medium']?.fontWeight ?? 400 },
      h6: { fontSize: tokens.typography.styles['Headline Small']?.fontSize ?? 24, fontWeight: tokens.typography.styles['Headline Small']?.fontWeight ?? 400 },
      subtitle1: { fontSize: tokens.typography.styles['Title Large']?.fontSize ?? 22, fontWeight: tokens.typography.styles['Title Large']?.fontWeight ?? 400 },
      subtitle2: { fontSize: tokens.typography.styles['Title Medium']?.fontSize ?? 16, fontWeight: tokens.typography.styles['Title Medium']?.fontWeight ?? 500 },
      body1: { fontSize: tokens.typography.styles['Body Large']?.fontSize ?? 16, fontWeight: tokens.typography.styles['Body Large']?.fontWeight ?? 400, lineHeight: 1.6 },
      body2: { fontSize: tokens.typography.styles['Body Medium']?.fontSize ?? 14, fontWeight: tokens.typography.styles['Body Medium']?.fontWeight ?? 400, lineHeight: 1.5 },
      button: { fontSize: tokens.typography.styles['Label Large']?.fontSize ?? 14, fontWeight: tokens.typography.styles['Label Large']?.fontWeight ?? 500, textTransform: 'none' as const },
      caption: { fontSize: tokens.typography.styles['Label Small']?.fontSize ?? 11, fontWeight: tokens.typography.styles['Label Small']?.fontWeight ?? 500 },
    },
    shape: { borderRadius: 12 },
    spacing: tokens.spacing.baseUnit,
  };
}

// ---------- Finance Template ----------
const FinanceScreen = React.memo(function FinanceScreen({ tokens }: { tokens: PreviewTokens }) {
  const s = tokens.scheme;
  const sp = tokens.spacing.baseUnit;

  return (
    <Box sx={{ fontFamily: tokens.typography.fontFamily, bgcolor: s.background, color: s.onBackground, height: '100%', overflow: 'hidden' }}>
      {/* App Bar */}
      <Box sx={{ bgcolor: s.surfaceContainer, px: sp * 2.5, py: sp * 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: s.primary, fontSize: 18 }}>FinTrack</Typography>
        <Stack direction="row" spacing={sp * 1} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: s.surfaceContainerHigh, borderRadius: 99, px: sp * 1.5, py: sp * 0.5, display: 'flex', alignItems: 'center', gap: 0.75, minWidth: 180 }}>
            <Search sx={{ fontSize: 16, color: s.onSurfaceVariant }} />
            <Typography variant="body2" sx={{ color: s.onSurfaceVariant, fontSize: 12 }}>Search transactions...</Typography>
          </Box>
          <Badge badgeContent={3} color="error">
            <Notifications sx={{ color: s.onSurfaceVariant, fontSize: 20 }} />
          </Badge>
          <Avatar sx={{ width: 32, height: 32, bgcolor: s.primary, color: s.onPrimary, fontSize: 12 }}>OA</Avatar>
        </Stack>
      </Box>

      <Box sx={{ p: sp * 2, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25, fontSize: 22 }}>Welcome back, Oluwasegun</Typography>
        <Typography variant="body2" sx={{ color: s.onSurfaceVariant, mb: sp * 2, fontSize: 13 }}>Here&apos;s your financial overview</Typography>

        {/* Stats Cards */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={sp * 1.5} sx={{ mb: sp * 2 }}>
          {[
            { label: 'Total Balance', value: '₦48,352', change: '+12.5%', up: true, icon: <AttachMoney /> },
            { label: 'Monthly Income', value: '₦8,420', change: '+8.2%', up: true, icon: <TrendingUp /> },
            { label: 'Expenses', value: '₦3,240', change: '-3.1%', up: false, icon: <TrendingDown /> },
          ].map((stat) => (
            <Card key={stat.label} sx={{ flex: 1, bgcolor: s.surfaceContainerLow, }}>
              <CardContent sx={{ p: sp * 1.5, '&:last-child': { pb: sp * 1.5 } }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: s.onSurfaceVariant, fontSize: 11 }}>{stat.label}</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 20, my: 0.25 }}>{stat.value}</Typography>
                    <Typography variant="caption" sx={{ color: stat.up ? '#16a34a' : s.error, fontWeight: 600, fontSize: 11 }}>{stat.change}</Typography>
                  </Box>
                  <Box sx={{ bgcolor: s.primaryContainer, borderRadius: 1.5, p: 0.75, display: 'flex' }}>
                    {React.cloneElement(stat.icon, { sx: { color: s.onPrimaryContainer, fontSize: 18 } })}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Quick Actions + Recent Transactions */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={sp * 1.5}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: sp * 1, fontSize: 14 }}>Quick Actions</Typography>
            <Stack direction="row" spacing={sp * 1}>
              {['Send', 'Pay Bills', 'Invest'].map((action) => (
                <Button key={action} variant="contained" sx={{ flex: 1, py: sp * 1, borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: 12 }}>{action}</Button>
              ))}
            </Stack>
          </Box>
          <Box sx={{ flex: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: sp * 1, fontSize: 14 }}>Recent Transactions</Typography>
            <TableContainer component={Paper} sx={{ bgcolor: s.surfaceContainerLow, }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {['Description', 'Category', 'Amount', 'Date'].map((h) => (
                      <TableCell key={h} sx={{ fontWeight: 600, color: s.onSurfaceVariant, borderBottomColor: s.outlineVariant, fontSize: 11, py: 0.75 }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { desc: 'Grocery Store', cat: 'Food', amt: '-₦84.20', date: 'Jul 15' },
                    { desc: 'Salary Deposit', cat: 'Income', amt: '+₦4,200', date: 'Jul 14' },
                    { desc: 'Electric Bill', cat: 'Utilities', amt: '-₦142.50', date: 'Jul 13' },
                    { desc: 'Freelance Payment', cat: 'Income', amt: '+₦1,200', date: 'Jul 12' },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ borderBottomColor: s.outlineVariant, fontSize: 12, py: 0.75 }}>{row.desc}</TableCell>
                      <TableCell sx={{ borderBottomColor: s.outlineVariant, py: 0.75 }}><Chip label={row.cat} size="small" sx={{ bgcolor: s.secondaryContainer, color: s.onSecondaryContainer, fontWeight: 500, fontSize: 10, height: 20 }} /></TableCell>
                      <TableCell sx={{ fontWeight: 600, color: row.amt.startsWith('+') ? '#16a34a' : s.onSurface, borderBottomColor: s.outlineVariant, fontSize: 12, py: 0.75 }}>{row.amt}</TableCell>
                      <TableCell sx={{ color: s.onSurfaceVariant, borderBottomColor: s.outlineVariant, fontSize: 12, py: 0.75 }}>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
});

// ---------- Business Template ----------
const BusinessScreen = React.memo(function BusinessScreen({ tokens }: { tokens: PreviewTokens }) {
  const s = tokens.scheme;
  const sp = tokens.spacing.baseUnit;

  return (
    <Box sx={{ fontFamily: tokens.typography.fontFamily, bgcolor: s.background, color: s.onBackground, height: '100%', display: 'flex', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Box sx={{ width: 200, bgcolor: s.surfaceContainer, p: sp * 1.5, display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: s.primary, mb: sp * 2, fontSize: 16 }}>Acme Inc</Typography>
        <List dense disablePadding>
          {[
            { icon: <DashboardIcon />, label: 'Dashboard', active: true },
            { icon: <ShoppingCart />, label: 'Orders', active: false },
            { icon: <BarChart />, label: 'Analytics', active: false },
            { icon: <Layers />, label: 'Products', active: false },
            { icon: <People />, label: 'Customers', active: false },
          ].map((item) => (
            <ListItem key={item.label} sx={{ borderRadius: 1.5, mb: 0.25, py: 0.5, bgcolor: item.active ? s.primaryContainer : 'transparent', cursor: 'pointer' }}>
              <ListItemIcon sx={{ minWidth: 28, color: item.active ? s.onPrimaryContainer : s.onSurfaceVariant }}>
                {React.cloneElement(item.icon, { fontSize: 'small' as const })}
              </ListItemIcon>
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontSize: 13, fontWeight: item.active ? 600 : 400, color: item.active ? s.onPrimaryContainer : s.onSurface } } }} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ bgcolor: s.surfaceContainer, px: sp * 2.5, py: sp * 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: 18 }}>Dashboard</Typography>
          <Stack direction="row" spacing={sp * 1} sx={{ alignItems: 'center' }}>
            <Button variant="contained" sx={{ textTransform: 'none', borderRadius: 1.5, fontSize: 12, py: 0.5, px: 1.5 }}>Generate Report</Button>
            <Avatar sx={{ width: 32, height: 32, bgcolor: s.tertiary, color: s.onTertiary, fontSize: 12 }}>OA</Avatar>
          </Stack>
        </Box>

        <Box sx={{ p: sp * 2, flex: 1, overflow: 'auto' }}>
          {/* KPI Cards */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={sp * 1.5} sx={{ mb: sp * 2 }}>
            {[
              { label: 'Revenue', value: '₦124,500', sub: '+18% vs last month' },
              { label: 'Customers', value: '2,840', sub: '+120 new' },
              { label: 'Conversion', value: '3.24%', sub: '+0.4% improvement' },
              { label: 'Avg Order', value: '₦86.50', sub: '+₦4.20 vs avg' },
            ].map((kpi) => (
              <Card key={kpi.label} sx={{ flex: 1, bgcolor: s.surfaceContainerLow, }}>
                <CardContent sx={{ p: sp * 1.5, '&:last-child': { pb: sp * 1.5 } }}>
                  <Typography variant="caption" sx={{ color: s.onSurfaceVariant, fontSize: 11 }}>{kpi.label}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, my: 0.25, fontSize: 20 }}>{kpi.value}</Typography>
                  <Typography variant="caption" sx={{ color: '#16a34a', fontSize: 11 }}>{kpi.sub}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Chart + Team */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={sp * 1.5}>
            <Card sx={{ flex: 2, bgcolor: s.surfaceContainerLow, }}>
              <CardContent sx={{ p: sp * 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: sp * 1.5, fontSize: 14 }}>Revenue Overview</Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 0.75, height: 140 }}>
                  {[65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 88, 92].map((h, i) => (
                    <Box key={i} sx={{ flex: 1, height: `${h}%`, bgcolor: i === 10 ? s.primary : s.primaryContainer, borderRadius: '3px 3px 0 0', transition: 'background-color 0.2s' }} />
                  ))}
                </Box>
                <Stack direction="row" sx={{ justifyContent: 'space-between', mt: 0.75 }}>
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m) => (
                    <Typography key={m} variant="caption" sx={{ color: s.onSurfaceVariant, flex: 1, textAlign: 'center', fontSize: 9 }}>{m}</Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1, bgcolor: s.surfaceContainerLow, }}>
              <CardContent sx={{ p: sp * 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: sp * 1.5, fontSize: 14 }}>Team</Typography>
                <Stack spacing={sp * 1}>
                  {[
                    { name: 'Sarah Kim', role: 'Lead Designer', color: s.primary },
                    { name: 'James Lee', role: 'Frontend Dev', color: s.secondary },
                    { name: 'Maria Garcia', role: 'PM', color: s.tertiary },
                    { name: 'Alex Chen', role: 'Backend Dev', color: s.primary },
                  ].map((m) => (
                    <Stack key={m.name} direction="row" spacing={sp * 1} sx={{ alignItems: 'center' }}>
                      <Avatar sx={{ width: 30, height: 30, bgcolor: m.color, color: '#fff', fontSize: 11 }}>{m.name.split(' ').map((n) => n[0]).join('')}</Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 12 }}>{m.name}</Typography>
                        <Typography variant="caption" sx={{ color: s.onSurfaceVariant, fontSize: 10 }}>{m.role}</Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
});

// ---------- Education Template ----------
const EducationScreen = React.memo(function EducationScreen({ tokens }: { tokens: PreviewTokens }) {
  const s = tokens.scheme;
  const sp = tokens.spacing.baseUnit;

  return (
    <Box sx={{ fontFamily: tokens.typography.fontFamily, bgcolor: s.background, color: s.onBackground, height: '100%', overflow: 'hidden' }}>
      {/* Nav */}
      <Box sx={{ bgcolor: s.surfaceContainer, px: sp * 2.5, py: sp * 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
        <Stack direction="row" spacing={sp * 1.5} sx={{ alignItems: 'center' }}>
          <School sx={{ color: s.primary, fontSize: 22 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 18 }}>EduLearn</Typography>
          <Stack direction="row" spacing={sp * 0.75}>
            {['Dashboard', 'Courses', 'Schedule'].map((tab, i) => (
              <Chip key={tab} label={tab} size="small" sx={{ bgcolor: i === 0 ? s.primaryContainer : 'transparent', color: i === 0 ? s.onPrimaryContainer : s.onSurfaceVariant, fontWeight: i === 0 ? 600 : 400, cursor: 'pointer', fontSize: 11, height: 24 }} />
            ))}
          </Stack>
        </Stack>
        <Avatar sx={{ width: 32, height: 32, bgcolor: s.tertiary, color: s.onTertiary, fontSize: 12 }}>OA</Avatar>
      </Box>

      <Box sx={{ p: sp * 2, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25, fontSize: 22 }}>My Learning Dashboard</Typography>
        <Typography variant="body2" sx={{ color: s.onSurfaceVariant, mb: sp * 2, fontSize: 13 }}>Track your progress across all enrolled courses</Typography>

        {/* Stats */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={sp * 1.5} sx={{ mb: sp * 2 }}>
          {[
            { label: 'Enrolled', value: '8', icon: <Assignment /> },
            { label: 'Completed', value: '5', icon: <CheckCircle /> },
            { label: 'Hours', value: '124', icon: <CalendarToday /> },
          ].map((stat) => (
            <Card key={stat.label} sx={{ flex: 1, bgcolor: s.surfaceContainerLow, }}>
              <CardContent sx={{ p: sp * 1.5, display: 'flex', alignItems: 'center', gap: sp * 1, '&:last-child': { pb: sp * 1.5 } }}>
                <Box sx={{ bgcolor: s.primaryContainer, borderRadius: 1.5, p: 0.75, display: 'flex' }}>
                  {React.cloneElement(stat.icon, { sx: { color: s.onPrimaryContainer, fontSize: 18 } })}
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: s.onSurfaceVariant, fontSize: 11 }}>{stat.label}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 20 }}>{stat.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Course Cards */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: sp * 1, fontSize: 14 }}>Active Courses</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={sp * 1.5} sx={{ mb: sp * 2 }}>
          {[
            { title: 'Advanced React', progress: 78, lessons: '12/15', color: s.primary },
            { title: 'System Design', progress: 45, lessons: '9/20', color: s.secondary },
            { title: 'TypeScript', progress: 92, lessons: '23/25', color: s.tertiary },
          ].map((course) => (
            <Card key={course.title} sx={{ flex: 1, bgcolor: s.surfaceContainerLow, }}>
              <CardContent sx={{ p: sp * 1.5, '&:last-child': { pb: sp * 1.5 } }}>
                <Box sx={{ width: '100%', height: 4, bgcolor: s.surfaceContainerHighest, borderRadius: 99, mb: sp * 1, overflow: 'hidden' }}>
                  <Box sx={{ width: `${course.progress}%`, height: '100%', bgcolor: course.color, borderRadius: 99 }} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13, mb: 0.25 }}>{course.title}</Typography>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: s.onSurfaceVariant, fontSize: 11 }}>{course.lessons} lessons</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: course.color, fontSize: 11 }}>{course.progress}%</Typography>
                </Stack>
                <Button variant="outlined" fullWidth sx={{ mt: sp * 1, textTransform: 'none', borderRadius: 1.5, color: s.onSurface, fontSize: 12, py: 0.5 }}>Continue</Button>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Upcoming */}
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: sp * 1, fontSize: 14 }}>Upcoming</Typography>
        <Card sx={{ bgcolor: s.surfaceContainerLow, }}>
          <CardContent sx={{ p: sp * 1.5, '&:last-child': { pb: sp * 1.5 } }}>
            <Stack spacing={sp * 0.75}>
              {[
                { time: '10:00 AM', title: 'Live: React Hooks', type: 'Session', color: s.primary },
                { time: '2:00 PM', title: 'Assignment: System Design', type: 'Deadline', color: s.error },
                { time: '4:30 PM', title: 'Office Hours with Prof. Chen', type: 'Meeting', color: s.tertiary },
              ].map((ev, i) => (
                <Stack key={i} direction="row" spacing={sp * 1} sx={{ alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: s.onSurfaceVariant, minWidth: 60, fontFamily: 'monospace', fontSize: 10 }}>{ev.time}</Typography>
                  <Box sx={{ width: 3, height: 24, bgcolor: ev.color, borderRadius: 99 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: 12 }}>{ev.title}</Typography>
                    <Typography variant="caption" sx={{ color: s.onSurfaceVariant, fontSize: 10 }}>{ev.type}</Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
});

// ---------- Signup Template ----------
const SignupScreen = React.memo(function SignupScreen({ tokens }: { tokens: PreviewTokens }) {
  const s = tokens.scheme;
  const sp = tokens.spacing.baseUnit;

  return (
    <Box sx={{ fontFamily: tokens.typography.fontFamily, height: '100%', display: 'flex', overflow: 'hidden' }}>
      {/* Hero Panel */}
      <Box sx={{
        flex: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        background: `linear-gradient(135deg, ${s.primary}, ${s.tertiary})`, p: sp * 3, position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%', bgcolor: `${s.onPrimary}15` }} />
        <Box sx={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: '50%', bgcolor: `${s.onPrimary}10` }} />
        <Typography variant="h4" sx={{ color: s.onPrimary, fontWeight: 700, mb: sp * 1.5, textAlign: 'center', zIndex: 1, fontSize: 26 }}>Join Our Platform</Typography>
        <Typography variant="body2" sx={{ color: `${s.onPrimary}cc`, textAlign: 'center', maxWidth: 300, zIndex: 1, fontSize: 13 }}>
          Create your account and start building beautiful designs.
        </Typography>
        <Stack direction="row" spacing={sp * 1} sx={{ mt: sp * 3, zIndex: 1 }}>
          {['🎨', '⚡', '🔒'].map((emoji, i) => (
            <Box key={i} sx={{ bgcolor: `${s.onPrimary}20`, borderRadius: 2, p: sp * 1, textAlign: 'center', width: 80 }}>
              <Typography variant="h6">{emoji}</Typography>
              <Typography variant="caption" sx={{ color: s.onPrimary, mt: 0.25, display: 'block', fontSize: 10 }}>{['Design', 'Fast', 'Secure'][i]}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Form Panel */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: sp * 3, bgcolor: s.background }}>
        <Box sx={{ width: '100%', maxWidth: 360 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.25, fontSize: 22 }}>Create Account</Typography>
          <Typography variant="body2" sx={{ color: s.onSurfaceVariant, mb: sp * 2, fontSize: 13 }}>Fill in the details to get started</Typography>

          <Stack spacing={sp * 1.5}>
            <Stack direction="row" spacing={sp * 1}>
              <TextField fullWidth label="First name" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }} />
              <TextField fullWidth label="Last name" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }} />
            </Stack>
            <TextField fullWidth label="Email address" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }} />
            <TextField fullWidth label="Password" type="password" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }} />

            <Button variant="contained" fullWidth sx={{ py: sp * 1, borderRadius: 1.5, textTransform: 'none', fontWeight: 600, fontSize: 14 }}>
              Create Account
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Divider sx={{ flex: 1,}} />
              <Typography variant="caption" sx={{ color: s.onSurfaceVariant, fontSize: 11 }}>or sign up with</Typography>
              <Divider sx={{ flex: 1,}} />
            </Box>

            <Stack direction="row" spacing={sp * 1}>
              <Button fullWidth variant="outlined" startIcon={<Google />} sx={{ textTransform: 'none', borderRadius: 1.5, color: s.onSurface, fontSize: 12, py: 0.75 }}>Google</Button>
              <Button fullWidth variant="outlined" startIcon={<GitHub />} sx={{ textTransform: 'none', borderRadius: 1.5, color: s.onSurface, fontSize: 12, py: 0.75 }}>GitHub</Button>
            </Stack>

            <Typography variant="body2" sx={{ textAlign: 'center', color: s.onSurfaceVariant, fontSize: 12 }}>
              Already have an account? <Box component="span" sx={{ color: s.primary, fontWeight: 600, cursor: 'pointer' }}>Sign in</Box>
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
});

// ---------- Error Boundary ----------
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; screenType: string },
  { hasError: boolean; error: string }
> {
  constructor(props: { children: React.ReactNode; screenType: string }) {
    super(props);
    this.state = { hasError: false, error: '' };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }
  render() {
    if (this.state.hasError) {
      const s = { background: '#fafafa', onBackground: '#1c1b1f', primary: '#6750A4', error: '#B3261E', errorContainer: '#F9DEDC', onErrorContainer: '#410E0B' };
      return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: s.background, fontFamily: 'Inter, sans-serif' }}>
          <Alert severity="error" sx={{ maxWidth: 400, borderRadius: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Preview Unavailable</Typography>
            <Typography variant="body2">Failed to render &quot;{this.props.screenType}&quot; screen: {this.state.error}</Typography>
          </Alert>
        </Box>
      );
    }
    return this.props.children;
  }
}

// ---------- Main Renderer ----------
const ScreenRenderer = React.memo(function ScreenRenderer({
  screenType,
  tokens,
}: {
  screenType: ScreenType;
  tokens: PreviewTokens;
}) {
  const content = useMemo(() => {
    switch (screenType) {
      case 'finance': return <FinanceScreen tokens={tokens} />;
      case 'business': return <BusinessScreen tokens={tokens} />;
      case 'education': return <EducationScreen tokens={tokens} />;
      case 'signup': return <SignupScreen tokens={tokens} />;
      default: return (
        <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: tokens.scheme.background }}>
          <Alert severity="warning" sx={{ borderRadius: 3 }}>Unknown screen type: {screenType}</Alert>
        </Box>
      );
    }
  }, [screenType, tokens]);

  return <ErrorBoundary screenType={screenType}>{content}</ErrorBoundary>;
});

export default ScreenRenderer;
