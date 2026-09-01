import React from 'react';
import { Box, Button, Container, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function CtaSection() {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ py: { xs: 12, md: 20 }, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: `radial-gradient(circle, ${theme.palette.primary.main}1A 0%, rgba(0,0,0,0) 60%)`, zIndex: -1, pointerEvents: 'none' }} />
      
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Box sx={{ mb: 4, display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: 8, bgcolor: 'primary.container', color: 'primary.dark' }}>
          <Sparkles size={18} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>Start for free today</Typography>
        </Box>
        
        <Typography variant="h2" component="h2" sx={{ fontWeight: 800, mb: 4, letterSpacing: '-0.02em' }}>
          Stop guessing hex codes.<br />Start generating systems.
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 6, fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
          Join thousands of designers and engineers shipping accessible, token-driven interfaces at lightspeed.
        </Typography>
        
        <Link href="/dashboard" passHref style={{ textDecoration: 'none' }}>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            disableElevation
            sx={{ 
              px: 6, 
              py: 2, 
              borderRadius: 8, 
              textTransform: 'none', 
              fontWeight: 700,
              fontSize: '1.2rem',
              boxShadow: `0 12px 32px ${theme.palette.primary.main}40`,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: `0 16px 40px ${theme.palette.primary.main}60`,
              }
            }}
          >
            Get Started for Free
          </Button>
        </Link>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 3, fontWeight: 500 }}>
          100% free forever — no credit card, no trial, no limits.
        </Typography>
      </Container>
    </Box>
  );
}
