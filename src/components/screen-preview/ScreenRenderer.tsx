'use client';

import React, { useMemo } from 'react';
import {
  Box, Typography, Button, Card, CardContent, Avatar, Stack, Divider,
  TextField, IconButton, Paper, LinearProgress, Chip, Badge, AppBar,
  Toolbar, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Tab, Tabs, Grid, ListItemIcon, ListItemText, List,
  ListItem, Drawer, useMediaQuery, Alert,
} from '@mui/material';
import {
  Dashboard as DashboardIcon, ShoppingCart, BarChart, Layers,
  Notifications, Search, AccountCircle, TrendingUp, TrendingDown,
  AttachMoney, People, School, Assignment, CalendarToday,
  ArrowForward, CheckCircle, Google, GitHub,
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
  const theme = useMemo(() => buildMuiTheme(tokens), [tokens]);
  const s = tokens.scheme;
  const sp = tokens.spacing.baseUnit;

  return (
    <Box sx={{ fontFamily: tokens.typography.fontFamily, bgcolor: s.background, color: s.onBackground, minHeight: '100vh' }}>
      {/* App Bar */}
      <Box sx={{ bgcolor: s.surfaceContainer, px: sp * 3, py: sp * 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: s.primary }}>FinTrack</Typography>
        <Stack direction="row" spacing={sp * 1.5} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: s.surfaceContainerHigh, borderRadius: 99, px: sp * 2, py: sp * 0.75, display: 'flex', alignItems: 'center', gap: 1, minWidth: 200 }}>
            <Search sx={{ fontSize: 18, color: s.onSurfaceVariant }} />
            <Typography variant="body2" sx={{ color: s.onSurfaceVariant }}>Search transactions...</Typography>
          </Box>
          <Badge badgeContent={3} color="error">
            <Notifications sx={{ color: s.onSurfaceVariant }} />
          </Badge>
          <Avatar sx={{ width: 36, height: 36, bgcolor: s.primary, color: s.onPrimary, fontSize: 14 }}>JD</Avatar>
        </Stack>
      </Box>

      <Box sx={{ p: sp * 3, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: sp * 0.5 }}>Welcome back, John</Typography>
        <Typography variant="body2" sx={{ color: s.onSurfaceVariant, mb: sp * 3 }}>Here&apos;s your financial overview</Typography>

        {/* Stats Cards */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={sp * 2} sx={{ mb: sp * 3 }}>
          {[
            { label: 'Total Balance', value: '$48,352.00', change: '+12.5%', up: true, icon: <AttachMoney /> },
            { label: 'Monthly Income', value: '$8,420.00', change: '+8.2%', up: true, icon: <TrendingUp /> },
            { label: 'Expenses', value: '$3,240.00', change: '-3.1%', up: false, icon: <TrendingDown /> },
          ].map((stat) => (
            <Card key={stat.label} sx={{ flex: 1, bgcolor: s.surfaceContainerLow, border: `1px solid ${s.outlineVariant}` }}>
              <CardContent sx={{ p: sp * 2 }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: s.onSurfaceVariant, mb: 0.5 }}>{stat.label}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                    <Typography variant="caption" sx={{ color: stat.up ? '#16a34a' : s.error, fontWeight: 600 }}>{stat.change}</Typography>
                  </Box>
                  <Box sx={{ bgcolor: s.primaryContainer, borderRadius: 2, p: 1, display: 'flex' }}>
                    {React.cloneElement(stat.icon, { sx: { color: s.onPrimaryContainer, fontSize: 20 } })}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Quick Actions + Recent Transactions */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={sp * 2}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: sp * 1.5 }}>Quick Actions</Typography>
            <Stack direction="row" spacing={sp * 1.5}>
              {['Send Money', 'Pay Bills', 'Invest'].map((action) => (
                <Button key={action} variant="contained" sx={{ flex: 1, py: sp * 1.5, borderRadius: 3, textTransform: 'none', fontWeight: 600 }}>{action}</Button>
              ))}
            </Stack>
          </Box>
          <Box sx={{ flex: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: sp * 1.5 }}>Recent Transactions</Typography>
            <TableContainer component={Paper} sx={{ bgcolor: s.surfaceContainerLow, border: `1px solid ${s.outlineVariant}` }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {['Description', 'Category', 'Amount', 'Date'].map((h) => (
                      <TableCell key={h} sx={{ fontWeight: 600, color: s.onSurfaceVariant, borderBottomColor: s.outlineVariant }}>{h}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { desc: 'Grocery Store', cat: 'Food', amt: '-$84.20', date: 'Jul 15' },
                    { desc: 'Salary Deposit', cat: 'Income', amt: '+$4,200.00', date: 'Jul 14' },
                    { desc: 'Electric Bill', cat: 'Utilities', amt: '-$142.50', date: 'Jul 13' },
                    { desc: 'Freelance Payment', cat: 'Income', amt: '+$1,200.00', date: 'Jul 12' },
                  ].map((row, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ borderBottomColor: s.outlineVariant }}>{row.desc}</TableCell>
                      <TableCell sx={{ borderBottomColor: s.outlineVariant }}><Chip label={row.cat} size="small" sx={{ bgcolor: s.secondaryContainer, color: s.onSecondaryContainer, fontWeight: 500 }} /></TableCell>
                      <TableCell sx={{ fontWeight: 600, color: row.amt.startsWith('+') ? '#16a34a' : s.onSurface, borderBottomColor: s.outlineVariant }}>{row.amt}</TableCell>
                      <TableCell sx={{ color: s.onSurfaceVariant, borderBottomColor: s.outlineVariant }}>{row.date}</TableCell>
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
    <Box sx={{ fontFamily: tokens.typography.fontFamily, bgcolor: s.background, color: s.onBackground, minHeight: '100vh', display: 'flex' }}>
      {/* Sidebar */}
      <Box sx={{ width: 240, bgcolor: s.surfaceContainer, borderRight: `1px solid ${s.outlineVariant}`, p: sp * 2, display: { xs: 'none', md: 'flex' }, flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: s.primary, mb: sp * 3 }}>Acme Inc</Typography>
        <List>
          {[
            { icon: <DashboardIcon />, label: 'Dashboard', active: true },
            { icon: <ShoppingCart />, label: 'Orders', active: false },
            { icon: <BarChart />, label: 'Analytics', active: false },
            { icon: <Layers />, label: 'Products', active: false },
            { icon: <People />, label: 'Customers', active: false },
          ].map((item) => (
            <ListItem key={item.label} sx={{ borderRadius: 2, mb: 0.5, bgcolor: item.active ? s.primaryContainer : 'transparent', cursor: 'pointer' }}>
              <ListItemIcon sx={{ minWidth: 36, color: item.active ? s.onPrimaryContainer : s.onSurfaceVariant }}>
                {React.cloneElement(item.icon, { fontSize: 'small' })}
              </ListItemIcon>
              <ListItemText primary={item.label} slotProps={{ primary: { sx: { fontSize: 14, fontWeight: item.active ? 600 : 400, color: item.active ? s.onPrimaryContainer : s.onSurface } } }} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ bgcolor: s.surfaceContainer, px: sp * 3, py: sp * 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${s.outlineVariant}` }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Dashboard</Typography>
          <Stack direction="row" spacing={sp * 1.5} sx={{ alignItems: 'center' }}>
            <Button variant="contained" sx={{ textTransform: 'none', borderRadius: 2 }}>Generate Report</Button>
            <Avatar sx={{ width: 36, height: 36, bgcolor: s.tertiary, color: s.onTertiary, fontSize: 14 }}>SK</Avatar>
          </Stack>
        </Box>

        <Box sx={{ p: sp * 3, flex: 1 }}>
          {/* KPI Cards */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={sp * 2} sx={{ mb: sp * 3 }}>
            {[
              { label: 'Revenue', value: '$124,500', sub: '+18% vs last month' },
              { label: 'Customers', value: '2,840', sub: '+120 new this month' },
              { label: 'Conversion', value: '3.24%', sub: '+0.4% improvement' },
              { label: 'Avg Order', value: '$86.50', sub: '+$4.20 vs avg' },
            ].map((kpi) => (
              <Card key={kpi.label} sx={{ flex: 1, bgcolor: s.surfaceContainerLow, border: `1px solid ${s.outlineVariant}` }}>
                <CardContent sx={{ p: sp * 2 }}>
                  <Typography variant="body2" sx={{ color: s.onSurfaceVariant }}>{kpi.label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, my: 0.5 }}>{kpi.value}</Typography>
                  <Typography variant="caption" sx={{ color: '#16a34a' }}>{kpi.sub}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>

          {/* Chart placeholder + Team */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={sp * 2}>
            <Card sx={{ flex: 2, bgcolor: s.surfaceContainerLow, border: `1px solid ${s.outlineVariant}` }}>
              <CardContent sx={{ p: sp * 2.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: sp * 2 }}>Revenue Overview</Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 180 }}>
                  {[65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 88, 92].map((h, i) => (
                    <Box key={i} sx={{ flex: 1, height: `${h}%`, bgcolor: i === 10 ? s.primary : s.primaryContainer, borderRadius: '4px 4px 0 0', transition: 'background-color 0.2s' }} />
                  ))}
                </Box>
                <Stack direction="row" sx={{ justifyContent: 'space-between', mt: 1 }}>
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                    <Typography key={m} variant="caption" sx={{ color: s.onSurfaceVariant, flex: 1, textAlign: 'center' }}>{m}</Typography>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card sx={{ flex: 1, bgcolor: s.surfaceContainerLow, border: `1px solid ${s.outlineVariant}` }}>
              <CardContent sx={{ p: sp * 2.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: sp * 2 }}>Team</Typography>
                <Stack spacing={sp * 1.5}>
                  {[
                    { name: 'Sarah Kim', role: 'Lead Designer', color: s.primary },
                    { name: 'James Lee', role: 'Frontend Dev', color: s.secondary },
                    { name: 'Maria Garcia', role: 'PM', color: s.tertiary },
                    { name: 'Alex Chen', role: 'Backend Dev', color: s.primary },
                  ].map((m) => (
                    <Stack key={m.name} direction="row" spacing={sp * 1.5} sx={{ alignItems: 'center' }}>
                      <Avatar sx={{ width: 36, height: 36, bgcolor: m.color, color: '#fff', fontSize: 13 }}>{m.name.split(' ').map((n) => n[0]).join('')}</Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{m.name}</Typography>
                        <Typography variant="caption" sx={{ color: s.onSurfaceVariant }}>{m.role}</Typography>
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
    <Box sx={{ fontFamily: tokens.typography.fontFamily, bgcolor: s.background, color: s.onBackground, minHeight: '100vh' }}>
      {/* Nav */}
      <Box sx={{ bgcolor: s.surfaceContainer, px: sp * 3, py: sp * 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={sp * 2} sx={{ alignItems: 'center' }}>
          <School sx={{ color: s.primary }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>EduLearn</Typography>
          <Stack direction="row" spacing={sp * 1}>
            {['Dashboard', 'Courses', 'Schedule'].map((tab, i) => (
              <Chip key={tab} label={tab} size="small" sx={{ bgcolor: i === 0 ? s.primaryContainer : 'transparent', color: i === 0 ? s.onPrimaryContainer : s.onSurfaceVariant, fontWeight: i === 0 ? 600 : 400, cursor: 'pointer' }} />
            ))}
          </Stack>
        </Stack>
        <Avatar sx={{ width: 36, height: 36, bgcolor: s.tertiary, color: s.onTertiary, fontSize: 14 }}>EM</Avatar>
      </Box>

      <Box sx={{ p: sp * 3, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: sp * 0.5 }}>My Learning Dashboard</Typography>
        <Typography variant="body2" sx={{ color: s.onSurfaceVariant, mb: sp * 3 }}>Track your progress across all enrolled courses</Typography>

        {/* Stats */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={sp * 2} sx={{ mb: sp * 3 }}>
          {[
            { label: 'Enrolled Courses', value: '8', icon: <Assignment /> },
            { label: 'Completed', value: '5', icon: <CheckCircle /> },
            { label: 'Hours Learned', value: '124', icon: <CalendarToday /> },
          ].map((stat) => (
            <Card key={stat.label} sx={{ flex: 1, bgcolor: s.surfaceContainerLow, border: `1px solid ${s.outlineVariant}` }}>
              <CardContent sx={{ p: sp * 2, display: 'flex', alignItems: 'center', gap: sp * 1.5 }}>
                <Box sx={{ bgcolor: s.primaryContainer, borderRadius: 2, p: 1, display: 'flex' }}>
                  {React.cloneElement(stat.icon, { sx: { color: s.onPrimaryContainer, fontSize: 20 } })}
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: s.onSurfaceVariant }}>{stat.label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Course Cards */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: sp * 2 }}>Active Courses</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={sp * 2}>
          {[
            { title: 'Advanced React Patterns', progress: 78, lessons: '12/15', color: s.primary },
            { title: 'System Design Masterclass', progress: 45, lessons: '9/20', color: s.secondary },
            { title: 'TypeScript Deep Dive', progress: 92, lessons: '23/25', color: s.tertiary },
          ].map((course) => (
            <Card key={course.title} sx={{ flex: 1, bgcolor: s.surfaceContainerLow, border: `1px solid ${s.outlineVariant}` }}>
              <CardContent sx={{ p: sp * 2.5 }}>
                <Box sx={{ width: '100%', height: 6, bgcolor: s.surfaceContainerHighest, borderRadius: 99, mb: sp * 2, overflow: 'hidden' }}>
                  <Box sx={{ width: `${course.progress}%`, height: '100%', bgcolor: course.color, borderRadius: 99, transition: 'width 0.3s' }} />
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>{course.title}</Typography>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" sx={{ color: s.onSurfaceVariant }}>{course.lessons} lessons</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: course.color }}>{course.progress}%</Typography>
                </Stack>
                <Button variant="outlined" fullWidth sx={{ mt: sp * 1.5, textTransform: 'none', borderRadius: 2, borderColor: s.outlineVariant, color: s.onSurface }}>Continue</Button>
              </CardContent>
            </Card>
          ))}
        </Stack>

        {/* Upcoming Schedule */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: sp * 3, mb: sp * 2 }}>Upcoming</Typography>
        <Card sx={{ bgcolor: s.surfaceContainerLow, border: `1px solid ${s.outlineVariant}` }}>
          <CardContent sx={{ p: sp * 2 }}>
            <Stack spacing={sp * 1.5}>
              {[
                { time: '10:00 AM', title: 'Live: React Hooks Deep Dive', type: 'Live Session', color: s.primary },
                { time: '2:00 PM', title: 'Assignment: System Design Review', type: 'Deadline', color: s.error },
                { time: '4:30 PM', title: 'Office Hours with Prof. Chen', type: 'Meeting', color: s.tertiary },
              ].map((ev, i) => (
                <Stack key={i} direction="row" spacing={sp * 2} sx={{ alignItems: 'center', py: sp * 0.5 }}>
                  <Typography variant="caption" sx={{ color: s.onSurfaceVariant, minWidth: 65, fontFamily: 'monospace' }}>{ev.time}</Typography>
                  <Box sx={{ width: 3, height: 32, bgcolor: ev.color, borderRadius: 99 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{ev.title}</Typography>
                    <Typography variant="caption" sx={{ color: s.onSurfaceVariant }}>{ev.type}</Typography>
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
    <Box sx={{ fontFamily: tokens.typography.fontFamily, minHeight: '100vh', display: 'flex' }}>
      {/* Hero Panel */}
      <Box sx={{
        flex: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        background: `linear-gradient(135deg, ${s.primary}, ${s.tertiary})`, p: sp * 5, position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', bgcolor: `${s.onPrimary}15` }} />
        <Box sx={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', bgcolor: `${s.onPrimary}10` }} />
        <Typography variant="h3" sx={{ color: s.onPrimary, fontWeight: 700, mb: sp * 2, textAlign: 'center', zIndex: 1 }}>Join Our Platform</Typography>
        <Typography variant="body1" sx={{ color: `${s.onPrimary}cc`, textAlign: 'center', maxWidth: 360, zIndex: 1 }}>
          Create your account and start building beautiful designs with our comprehensive design system.
        </Typography>
        <Stack direction="row" spacing={sp * 1.5} sx={{ mt: sp * 4, zIndex: 1 }}>
          {['🎨', '⚡', '🔒'].map((emoji, i) => (
            <Box key={i} sx={{ bgcolor: `${s.onPrimary}20`, borderRadius: 3, p: sp * 1.5, textAlign: 'center', width: 90 }}>
              <Typography variant="h5">{emoji}</Typography>
              <Typography variant="caption" sx={{ color: s.onPrimary, mt: 0.5, display: 'block' }}>{['Design', 'Fast', 'Secure'][i]}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Form Panel */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: sp * 4, bgcolor: s.background }}>
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: sp * 0.5 }}>Create Account</Typography>
          <Typography variant="body2" sx={{ color: s.onSurfaceVariant, mb: sp * 3 }}>Fill in the details to get started</Typography>

          <Stack spacing={sp * 2}>
            <Stack direction="row" spacing={sp * 1.5}>
              <TextField fullWidth label="First name" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              <TextField fullWidth label="Last name" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            </Stack>
            <TextField fullWidth label="Email address" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <TextField fullWidth label="Password" type="password" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />

            <Button variant="contained" fullWidth sx={{ py: sp * 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: 15 }}>
              Create Account
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Divider sx={{ flex: 1, borderColor: s.outlineVariant }} />
              <Typography variant="caption" sx={{ color: s.onSurfaceVariant }}>or sign up with</Typography>
              <Divider sx={{ flex: 1, borderColor: s.outlineVariant }} />
            </Box>

            <Stack direction="row" spacing={sp * 1.5}>
              <Button fullWidth variant="outlined" startIcon={<Google />} sx={{ textTransform: 'none', borderRadius: 2, borderColor: s.outlineVariant, color: s.onSurface }}>Google</Button>
              <Button fullWidth variant="outlined" startIcon={<GitHub />} sx={{ textTransform: 'none', borderRadius: 2, borderColor: s.outlineVariant, color: s.onSurface }}>GitHub</Button>
            </Stack>

            <Typography variant="body2" sx={{ textAlign: 'center', color: s.onSurfaceVariant }}>
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
