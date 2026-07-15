'use client';

import { Box, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;
const TOPBAR_HEIGHT = 64;

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <TopBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: `${TOPBAR_HEIGHT}px`,
          ml: isMobile ? 0 : `${COLLAPSED_WIDTH}px`,
          transition: theme.transitions.create('margin-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
