import React from 'react';
import { Box, Container, Typography, Stack, IconButton, Divider } from '@mui/material';
import { Palette } from 'lucide-react';
import { GitHub, Twitter, LinkedIn } from '@mui/icons-material';
import Link from 'next/link';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', pt: 10, pb: 4, borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(12, 1fr)' }, gap: 8, mb: 8 }}>
          {/* Brand Column */}
          <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 2', md: 'span 6' } }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
              <Palette color="currentColor" size={24} />
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
                Oluwasegun Design
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 300 }}>
              The ultimate open-source tool for generating, visualizing, and exporting Material Design 3 token systems in seconds.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><GitHub fontSize="small" /></IconButton>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><Twitter fontSize="small" /></IconButton>
              <IconButton size="small" sx={{ color: 'text.secondary' }}><LinkedIn fontSize="small" /></IconButton>
            </Stack>
          </Box>

          {/* Links Columns */}
          <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 1', md: 'span 2' }, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Product</Typography>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>Layout Lab</Typography></Link>
            <Link href="#features" style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>Features</Typography></Link>
            <Link href="#workflow" style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>Workflow</Typography></Link>
          </Box>

          <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 1', md: 'span 2' }, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Resources</Typography>
            <Link href="#" style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>Documentation</Typography></Link>
            <Link href="#" style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>Material Design 3</Typography></Link>
            <Link href="#" style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>CSS Variables Guide</Typography></Link>
          </Box>

          <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 1', md: 'span 2' }, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Legal</Typography>
            <Link href="#" style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>Privacy Policy</Typography></Link>
            <Link href="#" style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>Terms of Service</Typography></Link>
            <Link href="#" style={{ textDecoration: 'none' }}><Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>License</Typography></Link>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} Oluwasegun Design System. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Built with Next.js, Material UI, and Zustand.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
