'use client';

import { Box, Typography, Divider, useTheme, useMediaQuery } from '@mui/material';
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
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flex: 1 }}>{children}</Box>

        <Divider sx={{ mx: { xs: 2, md: 4 } }} />
        <Box
          component="footer"
          sx={{
            px: { xs: 2, md: 4 },
            py: 3,
            textAlign: 'center',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.8, display: 'block' }}>
            &copy; 2026 Oluwasegun. All rights reserved.
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.8, display: 'block' }}>
            Built with Next.js, React, Material UI (MUI), Emotion, Zustand, TypeScript &amp; Tailwind CSS
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
