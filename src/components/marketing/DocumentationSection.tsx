"use client";

import React from 'react';
import { Box, Container, Typography, Paper, useTheme } from '@mui/material';
import DocTabs from './docs/DocTabs';
import { BookOpen } from 'lucide-react';

export default function DocumentationSection() {
  const theme = useTheme();

  return (
    <Box 
      component="section" 
      id="documentation"
      sx={{ 
        py: { xs: 8, md: 12 },
        position: 'relative',
        bgcolor: 'background.default',
        borderTop: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden'
      }}
    >
      {/* Subtle background glow */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '20%', 
          right: '-10%', 
          width: '50%', 
          height: '600px', 
          background: \`radial-gradient(circle, \${theme.palette.primary.main}1A 0%, rgba(0,0,0,0) 70%)\`, 
          zIndex: 0, 
          pointerEvents: 'none' 
        }} 
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ mb: 6, textAlign: { xs: 'center', md: 'left' } }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 4, bgcolor: 'primary.main', color: 'primary.contrastText', mb: 3 }}>
            <BookOpen size={18} />
            <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Documentation
            </Typography>
          </Box>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 800, 
              mb: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              letterSpacing: '-0.02em',
            }}
          >
            Everything you need.
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: '800px', lineHeight: 1.6, fontWeight: 400, mx: { xs: 'auto', md: 0 } }}
          >
            Explore the philosophy behind algorithmic token generation, understand the output architecture, and learn how to integrate the system into your codebase.
          </Typography>
        </Box>

        <Paper 
          elevation={0}
          sx={{ 
            borderRadius: 4,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            background: 'background.paper',
            p: { xs: 2, md: 4 },
            minHeight: '500px',
            boxShadow: \`0 24px 64px \${theme.palette.background.default}\`
          }}
        >
          <DocTabs />
        </Paper>
      </Container>
    </Box>
  );
}
