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
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
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
                  ? '-6px -6px 14px rgba(255,255,255,0.06), 6px 6px 14px rgba(0,0,0,0.75)'
                  : '-6px -6px 14px #ffffff, 6px 6px 14px rgba(0,0,0,0.15)',
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
        </Link>
        
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

        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Link href="/dashboard" passHref style={{ textDecoration: 'none' }}>
            <Button
              variant="text"
              sx={{
                fontWeight: 700,
                textTransform: 'none',
                color: 'text.primary',
                px: 2,
              }}
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard" passHref style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained" 
              color="primary"
              disableElevation
              sx={{
                borderRadius: 8,
                px: 3,
                py: 1,
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: (theme) => theme.palette.mode === 'dark'
                  ? '-6px -6px 14px rgba(255,255,255,0.08), 6px 6px 14px rgba(0,0,0,0.6)'
                  : '-6px -6px 14px #ffffff, 6px 6px 14px rgba(0,0,0,0.15)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  boxShadow: (theme) => theme.palette.mode === 'dark'
                    ? '-8px -8px 18px rgba(255,255,255,0.12), 8px 8px 18px rgba(0,0,0,0.75)'
                    : '-8px -8px 18px #ffffff, 8px 8px 18px rgba(0,0,0,0.22)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Get Started for Free
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
