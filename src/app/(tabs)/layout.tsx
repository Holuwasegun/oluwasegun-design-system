'use client';

import { Box, Typography, Divider, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

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

        <Box
          component="footer"
          sx={{
            mt: 8,
            borderTop: `1px solid ${theme.palette.divider}`,
            bgcolor: `${theme.palette.background.paper}80`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <Box sx={{ px: { xs: 3, md: 6 }, py: { xs: 3, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 1.5,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.75rem', lineHeight: 1 }}>O</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  &copy; 2026 Oluwasegun
                </Typography>
              </Box>

              <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.02em' }}>
                Built with Next.js, React, Material UI, Emotion, Zustand, TypeScript &amp; Tailwind CSS
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
