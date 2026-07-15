'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  InputBase,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as BellIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAppStore } from '@/store';

export default function TopAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleSidebar } = useAppStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important', px: { xs: 2, md: 3 } }}>
        {isMobile && (
          <IconButton edge="start" onClick={toggleSidebar} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
        )}

        {/* Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'action.hover',
            borderRadius: '8px',
            px: 1.5,
            py: 0.5,
            maxWidth: 400,
            flex: 1,
          }}
        >
          <SearchIcon sx={{ color: 'text.secondary', fontSize: 18, mr: 1 }} />
          <InputBase placeholder="Search..." sx={{ fontSize: '0.8125rem', flex: 1 }} />
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* Right actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small">
            <Badge badgeContent={3} color="error" variant="dot">
              <BellIcon fontSize="small" />
            </Badge>
          </IconButton>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.75rem', fontWeight: 700 }}>
              O
            </Avatar>
          </IconButton>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Settings</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
