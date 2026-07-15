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
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 2,
          minHeight: 64,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 1.5,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#fff', fontWeight: 700, lineHeight: 1 }}
          >
            O
          </Typography>
        </Box>
        {sidebarOpen && (
          <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
              Oluwasegun
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Design System
            </Typography>
          </Box>
        )}
      </Box>

      <Divider />

      <List sx={{ flex: 1, px: 1, py: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => isMobile && setSidebarOpen(false)}
                sx={{
                  borderRadius: 2,
                  minHeight: 44,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: sidebarOpen ? 2 : 1.5,
                  backgroundColor: isActive ? 'primary.light' : 'transparent',
                  color: isActive ? 'primary.dark' : 'text.secondary',
                  fontWeight: isActive ? 600 : 400,
                  '&:hover': {
                    backgroundColor: isActive ? 'primary.light' : 'action.hover',
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
                          fontSize: '0.875rem',
                          fontWeight: isActive ? 600 : 400,
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

      <Divider />

      {!isMobile && (
        <Box sx={{ p: 1, display: 'flex', justifyContent: sidebarOpen ? 'flex-end' : 'center' }}>
          <IconButton onClick={toggleSidebar} size="small">
            {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
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
            borderRight: `1px solid ${theme.palette.divider}`,
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
            borderRight: `1px solid ${theme.palette.divider}`,
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
