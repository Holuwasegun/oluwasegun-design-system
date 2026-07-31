"use client";

import React from 'react';
import { Box, Container, Typography, Paper, useTheme } from '@mui/material';
import { Layers, Brush, Download, Zap } from 'lucide-react';

export default function Features() {
  const theme = useTheme();

  return (
    <Box id="features" component="section" sx={{ py: { xs: 12, md: 16 }, flexGrow: 1, position: 'relative' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 1.5 }}>
            POWERFUL FEATURES
          </Typography>
          <Typography variant="h2" component="h2" sx={{ fontWeight: 800, mt: 2, mb: 3 }}>
            Everything you need for a robust system
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
            Stop spending hours manually checking contrast ratios and calculating fluid type scales.
          </Typography>
        </Box>
        
        {/* Bento Box Grid */}
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
            gridAutoRows: 'minmax(250px, auto)',
            gap: 3 
          }}
        >
          {/* Feature 1 - Large Span */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              gridColumn: { xs: 'span 1', md: 'span 2' },
              borderRadius: 6, 
              bgcolor: 'background.paper', 
              border: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 20px 40px ${theme.palette.primary.main}1A`,
                borderColor: 'primary.light'
              }
            }}
          >
            <Box sx={{ position: 'absolute', right: -50, top: -50, opacity: 0.05 }}>
              <Layers size={300} />
            </Box>
            <Box sx={{ p: 2, bgcolor: 'primary.container', color: 'onPrimaryContainer', display: 'inline-flex', borderRadius: 4, mb: 3, width: 'fit-content' }}>
              <Layers size={28} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>MD3 Tonal Palettes</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', maxWidth: 400 }}>
              Automatically interpolate a 26-level tonal palette from a single hex color. Fully mapped to semantic light and dark mode roles ensuring accessible contrast ratios instantly.
            </Typography>
          </Paper>

          {/* Feature 2 */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 6, 
              bgcolor: 'background.paper', 
              border: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 20px 40px ${theme.palette.secondary.main}1A`,
                borderColor: 'secondary.light'
              }
            }}
          >
            <Box sx={{ p: 2, bgcolor: 'secondary.container', color: 'onSecondaryContainer', display: 'inline-flex', borderRadius: 4, mb: 3, width: 'fit-content' }}>
              <Brush size={28} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Fluid Typography</Typography>
            <Typography variant="body1" color="text.secondary">
              Generate a responsive 15-tier type scale using CSS clamp(). Seamlessly scales from mobile to ultrawide displays.
            </Typography>
          </Paper>

          {/* Feature 3 */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4, 
              borderRadius: 6, 
              bgcolor: 'background.paper', 
              border: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 20px 40px ${theme.palette.success.main}1A`,
                borderColor: 'success.light'
              }
            }}
          >
            <Box sx={{ p: 2, bgcolor: 'success.container', color: 'success.dark', display: 'inline-flex', borderRadius: 4, mb: 3, width: 'fit-content' }}>
              <Zap size={28} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>Live Previews</Typography>
            <Typography variant="body1" color="text.secondary">
              Visualize your generated tokens across dozens of interactive UI components and dashboard layouts in real-time.
            </Typography>
          </Paper>

          {/* Feature 4 - Large Span */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              gridColumn: { xs: 'span 1', md: 'span 2' },
              borderRadius: 6, 
              bgcolor: 'background.paper', 
              border: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: `0 20px 40px ${theme.palette.info.main}1A`,
                borderColor: 'info.light'
              }
            }}
          >
            <Box sx={{ position: 'absolute', right: -30, top: -30, opacity: 0.05 }}>
              <Download size={300} />
            </Box>
            <Box sx={{ p: 2, bgcolor: 'info.container', color: 'info.dark', display: 'inline-flex', borderRadius: 4, mb: 3, width: 'fit-content' }}>
              <Download size={28} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Instant Export to CSS</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', maxWidth: 400 }}>
              Say goodbye to manual pixel translation. Export your configurations as raw JSON, or copy-paste ready vanilla CSS variables right into your codebase. No npm packages needed.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
