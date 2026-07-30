'use client';

import { usePathname } from 'next/navigation';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Palette as PaletteIcon,
  TextFields as TextFieldsIcon,
  SpaceBar as SpaceBarIcon,
  Gradient as GradientIcon,
  Layers as LayersIcon,
  CropSquare as CropSquareIcon,
  Animation as AnimationIcon,
  Widgets as WidgetsIcon,
  Visibility as PreviewIcon,
  DesktopWindows as ScreenPreviewIcon,
  Collections as BrandGalleryIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useAppStore } from '@/store';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
  { label: 'Color', icon: <PaletteIcon />, href: '/color' },
  { label: 'Typography', icon: <TextFieldsIcon />, href: '/typography' },
  { label: 'Spacing', icon: <SpaceBarIcon />, href: '/spacing' },
  { label: 'Shadows', icon: <GradientIcon />, href: '/shadows' },
  { label: 'Elevation', icon: <LayersIcon />, href: '/elevation' },
  { label: 'Border Radius', icon: <CropSquareIcon />, href: '/radius' },
  { label: 'Motion', icon: <AnimationIcon />, href: '/motion' },
  { label: 'Components', icon: <WidgetsIcon />, href: '/components' },
  { label: 'Preview', icon: <PreviewIcon />, href: '/preview' },
  { label: 'Screen Preview', icon: <ScreenPreviewIcon />, href: '/screen-preview' },
  { label: 'Brand Gallery', icon: <BrandGalleryIcon />, href: '/brand-gallery' },
];

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, setSidebarOpen } = useAppStore();

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: isMobile ? DRAWER_WIDTH : sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 2.5,
          minHeight: 72,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            backgroundColor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: theme.palette.mode === 'dark' 
              ? '-4px -4px 10px rgba(255,255,255,0.03), 4px 4px 10px rgba(0,0,0,0.5)'
              : '-4px -4px 10px rgba(255,255,255,0.9), 4px 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: 'primary.main', fontWeight: 700, lineHeight: 1, fontSize: '1rem' }}
          >
            O
          </Typography>
        </Box>
        {sidebarOpen && (
          <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              Oluwasegun
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.02em' }}>
              Design System
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ mx: sidebarOpen ? 2 : 1 }} />

      <List sx={{ flex: 1, px: 1, py: 1.5 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
                sx={{
                  borderRadius: 2,
                  minHeight: 44,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: sidebarOpen ? 2 : 1.5,
                  position: 'relative',
                  backgroundColor: isActive ? 'background.default' : 'transparent',
                  boxShadow: isActive 
                    ? theme.palette.mode === 'dark'
                      ? 'inset 3px 3px 6px rgba(0,0,0,0.5), inset -3px -3px 6px rgba(255,255,255,0.03)'
                      : 'inset 3px 3px 6px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.7)'
                    : 'none',
                  color: isActive ? 'primary.main' : 'text.secondary',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    backgroundColor: isActive ? 'background.default' : 'rgba(0,0,0,0.02)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 1.5 : 0,
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {sidebarOpen && (
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '0.8125rem',
                          fontWeight: isActive ? 600 : 400,
                          letterSpacing: '0.01em',
                        },
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ mx: sidebarOpen ? 2 : 1 }} />

      {!isMobile && (
        <Box sx={{ p: 1, display: 'flex', justifyContent: sidebarOpen ? 'flex-end' : 'center' }}>
          <IconButton onClick={toggleSidebar} size="small" sx={{ color: 'text.secondary' }}>
            {sidebarOpen ? <ChevronLeftIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
          </IconButton>
        </Box>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        width: sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        flexShrink: 0,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.standard,
            }),
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
