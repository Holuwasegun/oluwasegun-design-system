import React from 'react';
import { Box, Container, Typography, Button, CssBaseline, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ColorScheme } from '@/theme/scheme';

export default function MarketingHeroTemplate({ scheme }: { scheme: ColorScheme }) {
  const theme = createTheme({
    palette: {
      primary: { main: scheme.primary },
      secondary: { main: scheme.secondary },
      background: { default: scheme.surface, paper: scheme.surfaceContainerLowest },
      text: { primary: scheme.onSurface, secondary: scheme.onSurfaceVariant },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '70vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column', borderRadius: 4, overflow: 'hidden' }}>
        <CssBaseline />
        <Box component="header" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: scheme.surfaceContainerLowest }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: scheme.primary }}>BrandName</Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Button color="inherit" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>Features</Button>
            <Button color="inherit" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>Pricing</Button>
            <Button variant="contained" sx={{ fontWeight: 700, borderRadius: 20 }}>Get Started</Button>
          </Stack>
        </Box>

        <Container maxWidth="lg" sx={{ my: 8, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, alignItems: 'center', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h2" sx={{ fontWeight: 900, color: 'text.primary', mb: 3, lineHeight: 1.2, fontSize: { xs: '2rem', md: '3rem' } }}>
                Build Something Amazing with Our Platform
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 5, lineHeight: 1.6, fontSize: { xs: '1rem', md: '1.25rem' } }}>
                The all-in-one solution that helps you scale your business, delight your customers, and dominate your market.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{ py: 2, px: 4, fontWeight: 700, borderRadius: 30 }}>
                  Start Free Trial
                </Button>
                <Button variant="outlined" size="large" sx={{ py: 2, px: 4, fontWeight: 700, borderRadius: 30 }}>
                  Watch Demo
                </Button>
              </Stack>
            </Box>
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 8,
                  overflow: 'hidden',
                  height: { xs: 250, md: 400 },
                  bgcolor: scheme.surfaceContainerHigh,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                }}
              >
                <Box sx={{ width: '100%', height: '100%', bgcolor: scheme.primaryContainer, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h3" sx={{ color: scheme.onPrimaryContainer, fontWeight: 800, fontSize: { xs: '1.5rem', md: '2.5rem' } }}>Dashboard Preview</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>

        <Box component="footer" sx={{ py: 4, bgcolor: scheme.surfaceContainerLowest, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body2">&copy; 2026 BrandName. All rights reserved.</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
