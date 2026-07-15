import { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItemIcon, ListItemText, IconButton, Badge, Avatar, useMediaQuery, useTheme } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ColorScheme } from '@/theme/scheme';

const DRAWER_WIDTH = 240;

export default function SaaSDashboardTemplate({ scheme }: { scheme: ColorScheme }) {
  const outerTheme = useTheme();
  const isMobile = useMediaQuery(outerTheme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = createTheme({
    palette: {
      primary: { main: scheme.primary },
      secondary: { main: scheme.secondary },
      background: { default: scheme.surface, paper: scheme.surfaceContainerLowest },
      text: { primary: scheme.onSurface, secondary: scheme.onSurfaceVariant },
    },
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
            onClick={() => isMobile && setDrawerOpen(false)}
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
      <Box sx={{ display: 'flex', height: '70vh', bgcolor: 'background.default', borderRadius: 4, overflow: 'hidden' }}>
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

        {isMobile ? (
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', bgcolor: scheme.surfaceContainerLowest },
            }}
          >
            {drawerContent}
          </Drawer>
        ) : (
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
        )}

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 3 }, overflow: 'auto' }}>
          <Toolbar />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', fontSize: { xs: '1.5rem', md: '2.125rem' } }}>
            Overview
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 2, md: 3 }, flexWrap: 'wrap' }}>
            {[
              { label: 'Total Sales', value: '$34,245', bg: scheme.primaryContainer, color: scheme.onPrimaryContainer },
              { label: 'New Users', value: '+2,450', bg: scheme.secondaryContainer, color: scheme.onSecondaryContainer },
              { label: 'Active Sessions', value: '890', bg: scheme.tertiaryContainer, color: scheme.onTertiaryContainer },
            ].map((card) => (
              <Box
                key={card.label}
                sx={{
                  p: { xs: 2, md: 2.5 },
                  display: 'flex',
                  flexDirection: 'column',
                  width: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(33.33% - 16px)' },
                  minHeight: { xs: 120, md: 140 },
                  borderRadius: 4,
                  boxShadow: 3,
                  bgcolor: card.bg,
                  color: card.color,
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>{card.label}</Typography>
                <Typography variant="h3" sx={{ mt: 'auto', fontWeight: 800, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>{card.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
