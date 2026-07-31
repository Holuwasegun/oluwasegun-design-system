import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { Layers, Brush, Download } from 'lucide-react';

export default function Features() {
  return (
    <Box component="section" sx={{ bgcolor: 'surfaceContainerLowest', py: { xs: 8, md: 12 }, flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={{ textAlign: 'center', fontWeight: 700, mb: 8 }}>
          Everything you need for a robust system
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          {/* Feature 1 */}
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

          {/* Feature 2 */}
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

          {/* Feature 3 */}
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
  );
}
