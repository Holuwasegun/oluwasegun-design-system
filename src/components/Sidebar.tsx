'use client';


import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  ButtonBase,
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
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAppStore } from '@/store';

import { useRouter } from 'next/navigation';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, href: 'home' },
  { label: 'Color', icon: <PaletteIcon />, href: 'color' },
  { label: 'Typography', icon: <TextFieldsIcon />, href: 'typography' },
  { label: 'Spacing', icon: <SpaceBarIcon />, href: 'spacing' },
  { label: 'Shadows', icon: <GradientIcon />, href: 'shadows' },
  { label: 'Elevation', icon: <LayersIcon />, href: 'elevation' },
  { label: 'Border Radius', icon: <CropSquareIcon />, href: 'radius' },
  { label: 'Motion', icon: <AnimationIcon />, href: 'motion' },
  { label: 'Components', icon: <WidgetsIcon />, href: 'components' },
  { label: 'Preview', icon: <PreviewIcon />, href: 'preview' },
  { label: 'Screen Preview', icon: <ScreenPreviewIcon />, href: 'screen-preview' },
  { label: 'Brand Gallery', icon: <BrandGalleryIcon />, href: 'brand-gallery' },
];

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sidebarOpen, toggleSidebar, setSidebarOpen, currentView, setCurrentView } = useAppStore();
  const router = useRouter();

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: isMobile ? '100%' : sidebarOpen ? DRAWER_WIDTH : COLLAPSED_WIDTH,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5, minHeight: 72 }}>
        <ButtonBase
          onClick={() => {
            setCurrentView('home');
            router.push('/dashboard');
            if (isMobile) setSidebarOpen(false);
          }}
          tabIndex={0}
          aria-label="Oluwasegun Design System Brand Logo - Return to Dashboard"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 1.5,
            flex: 1,
            minWidth: 0,
            py: 1,
            px: 1,
            borderRadius: 2,
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              bgcolor: 'action.hover',
            },
            '&:focus-visible, &.Mui-focusVisible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '-2px',
            },
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
          {(sidebarOpen || isMobile) && (
            <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'text.primary' }}>
                Oluwasegun
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.02em', display: 'block' }}>
                Design System
              </Typography>
            </Box>
          )}
        </ButtonBase>

        {isMobile && (
          <IconButton
            onClick={() => setSidebarOpen(false)}
            tabIndex={0}
            aria-label="Close navigation drawer"
            sx={{
              color: 'text.secondary',
              ml: 1,
              flexShrink: 0,
              '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
              '&:focus-visible, &.Mui-focusVisible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mx: sidebarOpen || isMobile ? 2 : 1 }} />

      <List sx={{ flex: 1, px: 1, py: 1.5, overflowY: 'auto' }}>
        {navItems.map((item) => {
          const isActive = currentView === item.href;
          return (
            <ListItem key={item.href} disablePadding sx={{ mb: 0.25 }}>
              <ListItemButton
                tabIndex={0}
                role="link"
                aria-label={`Navigate to ${item.label} section`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => {
                  setCurrentView(item.href);
                  if (isMobile) setSidebarOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  minHeight: 44,
                  justifyContent: sidebarOpen || isMobile ? 'initial' : 'center',
                  px: sidebarOpen || isMobile ? 2 : 1.5,
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
                    backgroundColor: isActive ? 'background.default' : 'action.hover',
                  },
                  '&:focus-visible, &.Mui-focusVisible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: '-2px',
                    zIndex: 1,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen || isMobile ? 1.5 : 0,
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {(sidebarOpen || isMobile) && (
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

      <Divider sx={{ mx: sidebarOpen || isMobile ? 2 : 1 }} />

      {!isMobile && (
        <Box sx={{ p: 1, display: 'flex', justifyContent: sidebarOpen ? 'flex-end' : 'center' }}>
          <IconButton
            onClick={toggleSidebar}
            size="small"
            tabIndex={0}
            aria-label={sidebarOpen ? "Collapse navigation sidebar" : "Expand navigation sidebar"}
            sx={{
              color: 'text.secondary',
              '&:focus-visible, &.Mui-focusVisible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              },
            }}
          >
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
            width: '100%',
            maxWidth: '100vw',
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
