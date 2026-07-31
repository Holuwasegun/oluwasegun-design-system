"use client";

import React from 'react';
import { Box, Button, Container, Stack, Typography, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { Palette, Layers, Brush, Download, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box component="header" sx={{ p: 4, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/marketing" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Palette color="currentColor" size={28} />
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                Oluwasegun Design
              </Typography>
            </Stack>
          </Link>
          <Link href="/dashboard" passHref>
            <Button variant="outlined" color="primary">Go to Dashboard</Button>
          </Link>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 4,
              background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Design Systems,<br />Instantly Generated.
          </Typography>
          
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 6, maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
          >
            Build, visualize, and export a complete Material Design 3 token system in seconds. From 5 key colors to a fully robust CSS architecture.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
            <Link href="/dashboard" passHref>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                endIcon={<ArrowRight />}
                sx={{ px: 4, py: 1.5, borderRadius: 8, textTransform: 'none', fontWeight: 600 }}
              >
                Open Layout Lab
              </Button>
            </Link>
            <Button 
              variant="outlined" 
              color="secondary" 
              size="large"
              sx={{ px: 4, py: 1.5, borderRadius: 8, textTransform: 'none', fontWeight: 600 }}
            >
              Read Documentation
            </Button>
          </Stack>
        </Container>

        {/* Features Section */}
        <Box sx={{ bgcolor: 'surfaceContainerLowest', py: { xs: 8, md: 12 }, flexGrow: 1 }}>
          <Container maxWidth="lg">
            <Typography variant="h2" component="h2" sx={{ textAlign: 'center', fontWeight: 700, mb: 8 }}>
              Everything you need for a robust system
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
              <Box>
                <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ p: 2, bgcolor: 'primary.container', color: 'onPrimaryContainer', display: 'inline-flex', borderRadius: 3, mb: 3 }}>
                    <Layers size={24} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>MD3 Tonal Palettes</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Automatically interpolate a 26-level tonal palette from a single hex color. Fully mapped to light and dark mode roles.
                  </Typography>
                </Paper>
              </Box>

              <Box>
                <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ p: 2, bgcolor: 'secondary.container', color: 'onSecondaryContainer', display: 'inline-flex', borderRadius: 3, mb: 3 }}>
                    <Brush size={24} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Fluid Typography</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Generate a responsive 15-tier type scale using CSS clamp(). Seamlessly scales from mobile to ultrawide displays.
                  </Typography>
                </Paper>
              </Box>

              <Box>
                <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: 4, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ p: 2, bgcolor: 'tertiary.container', color: 'onTertiaryContainer', display: 'inline-flex', borderRadius: 3, mb: 3 }}>
                    <Download size={24} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Instant Export</Typography>
                  <Typography variant="body1" color="text.secondary">
                    Export your configurations as raw JSON, copy-paste ready CSS variables, or persist them directly to local storage.
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ p: 4, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Oluwasegun Design System. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
