'use client';

import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import { useAppStore } from '@/store';

const pageTitles: Record<string, string> = {
  '/color': 'Color',
  '/typography': 'Typography',
  '/spacing': 'Spacing',
  '/shadows': 'Shadows',
  '/elevation': 'Elevation',
  '/radius': 'Border Radius',
  '/motion': 'Motion',
  '/components': 'Components',
};

export default function TopBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const { toggleSidebar } = useAppStore();

  const title = pageTitles[pathname] || 'Design System';

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        {isMobile && (
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small">
            <Badge
              variant="dot"
              color="error"
              invisible={false}
              sx={{
                '& .MuiBadge-badge': {
                  top: 4,
                  right: 4,
                },
              }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          >
            M
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
