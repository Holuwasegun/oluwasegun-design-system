import React from 'react';
import { Box, Button, Container, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';


export default function Header() {
  const theme = useTheme();

  return (
    <Box 
      component="header" 
      sx={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1100, 
        py: 2, 
        borderBottom: '1px solid', 
        borderColor: 'divider', 
        backgroundColor: `${theme.palette.background.default}CC`,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 } }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                backgroundColor: 'background.default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: (theme) => theme.palette.mode === 'dark' 
                  ? '-4px -4px 10px rgba(255,255,255,0.03), 4px 4px 10px rgba(0,0,0,0.5)'
                  : '-4px -4px 10px rgba(255,255,255,0.9), 4px 4px 10px rgba(0,0,0,0.1)',
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: 'primary.main', fontWeight: 700, lineHeight: 1, fontSize: '1rem' }}
              >
                O
              </Typography>
            </Box>
            <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'text.primary' }}>
                Oluwasegun
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.02em', display: 'block', lineHeight: 1 }}>
                Design System
              </Typography>
            </Box>
          </Stack>
        </a>
        
        <Stack direction="row" spacing={4} sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <Link href="#features" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', transition: 'color 0.2s', '&:hover': { color: 'text.primary' } }}>
              Features
            </Typography>
          </Link>
          <Link href="#workflow" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', transition: 'color 0.2s', '&:hover': { color: 'text.primary' } }}>
              Workflow
            </Typography>
          </Link>
          <Link href="#faq" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary', transition: 'color 0.2s', '&:hover': { color: 'text.primary' } }}>
              FAQ
            </Typography>
          </Link>
        </Stack>

        <Link href="/dashboard" passHref>
          <Button 
            variant="contained" 
            color="primary"
            disableElevation
            sx={{ borderRadius: 8, px: 3, fontWeight: 600, textTransform: 'none' }}
          >
            Open Dashboard
          </Button>
        </Link>
      </Container>
    </Box>
  );
}
