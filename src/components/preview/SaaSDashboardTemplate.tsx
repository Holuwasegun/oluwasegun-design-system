import { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItemIcon, ListItemText, IconButton, Badge, Avatar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ColorScheme } from '@/theme/scheme';
import { useThemeStore } from '@/store';

const DRAWER_WIDTH = 240;

export default function SaaSDashboardTemplate({ scheme }: { scheme: ColorScheme }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fontFamily = useThemeStore((s) => s.config.typography.fontFamily);
  const ff = fontFamily?.trim() ? `'${fontFamily.trim()}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` : undefined;

  const theme = createTheme({
    palette: {
      primary: { main: scheme.primary },
      secondary: { main: scheme.secondary },
      background: { default: scheme.surface, paper: scheme.surfaceContainerLowest },
      text: { primary: scheme.onSurface, secondary: scheme.onSurfaceVariant },
    },
    ...(ff ? { typography: { fontFamily: ff } } : {}),
  });

  const navItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', active: true },
    { icon: <ShoppingCartIcon />, label: 'Orders', active: false },
    { icon: <BarChartIcon />, label: 'Reports', active: false },
    { icon: <LayersIcon />, label: 'Integrations', active: false },
  ];

  const drawerContent = (
    <Box sx={{ bgcolor: scheme.surfaceContainerLowest, height: '100%' }}>
      <Toolbar />
      <List sx={{ pt: 1 }}>
        {navItems.map((item) => (
          <Box
            key={item.label}
            onClick={() => setDrawerOpen(false)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '0 24px 24px 0',
              mr: 2,
              mb: 0.5,
              px: 2,
              py: 1.25,
              cursor: 'pointer',
              bgcolor: item.active ? scheme.primaryContainer : 'transparent',
              color: item.active ? scheme.onPrimaryContainer : scheme.onSurface,
              '&:hover': { bgcolor: item.active ? scheme.primaryContainer : `${scheme.primary}08` },
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: 640, bgcolor: 'background.default', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
        <CssBaseline />
        <AppBar position="absolute" sx={{ bgcolor: scheme.primary, boxShadow: 'none' }}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, fontWeight: 700 }}>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" sx={{ ml: 1 }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: scheme.secondary }}>A</Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', bgcolor: scheme.surfaceContainerLowest },
          }}
        >
          {drawerContent}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'hidden' }}>
          <Toolbar />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'text.primary' }}>
            Overview
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {[
              { label: 'Total Sales', value: '₦34,245', bg: scheme.primaryContainer, color: scheme.onPrimaryContainer },
              { label: 'New Users', value: '+2,450', bg: scheme.secondaryContainer, color: scheme.onSecondaryContainer },
              { label: 'Active Sessions', value: '890', bg: scheme.tertiaryContainer, color: scheme.onTertiaryContainer },
            ].map((card) => (
              <Box
                key={card.label}
                sx={{
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  minHeight: 140,
                  borderRadius: 4,
                  bgcolor: card.bg,
                  color: card.color,
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{card.label}</Typography>
                <Typography variant="h3" sx={{ mt: 'auto', fontWeight: 800, fontSize: '2.5rem' }}>{card.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
