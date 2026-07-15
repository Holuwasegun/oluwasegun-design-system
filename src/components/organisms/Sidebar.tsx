'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Dashboard as DashboardIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Palette,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppStore } from '@/store';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: DashboardIcon },
  { label: 'Analytics', href: '/analytics', icon: AnalyticsIcon },
  { label: 'Users', href: '/users', icon: PeopleIcon },
  { label: 'Settings', href: '/settings', icon: SettingsIcon },
];

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

export default function Sidebar() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();

  const drawerWidth = isMobile ? DRAWER_WIDTH : sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH;

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 64 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #6750A4, #D0BCFF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Palette sx={{ color: '#fff', fontSize: 18 }} />
        </Box>
        {sidebarOpen && (
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: '0.8rem' }}>
              Oluwasegun
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Design System
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Navigation */}
      <List sx={{ px: 1.5, pt: 1, flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
                sx={{
                  borderRadius: '8px',
                  minHeight: 40,
                  px: sidebarOpen ? 1.5 : 0,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  backgroundColor: active ? 'primary.light' : 'transparent',
                  color: active ? 'primary.dark' : 'text.secondary',
                  '&:hover': { backgroundColor: active ? 'primary.light' : 'action.hover' },
                }}
              >
                <ListItemIcon sx={{ minWidth: sidebarOpen ? 32 : 0, color: 'inherit' }}>
                  <Icon fontSize="small" />
                </ListItemIcon>
                {sidebarOpen && <ListItemText primary={item.label} slotProps={{ primary: { variant: 'body2', sx: { fontWeight: active ? 600 : 500 } } }} />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Collapse toggle (desktop only) */}
      {!isMobile && (
        <Box sx={{ p: 1.5, display: 'flex', justifyContent: sidebarOpen ? 'flex-end' : 'center' }}>
          <IconButton onClick={toggleSidebar} size="small" sx={{ color: 'text.secondary' }}>
            {sidebarOpen ? <ChevronLeft fontSize="small" /> : <ChevronRight fontSize="small" />}
          </IconButton>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      {/* Desktop */}
      <Box component="nav" sx={{ display: { xs: 'none', md: 'block' } }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
              transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
              overflowX: 'hidden',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={isMobile ? sidebarOpen : false}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
