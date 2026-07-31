import React from 'react';
import { Box, Button, Container, Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { Palette } from 'lucide-react';

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
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', transition: 'opacity 0.2s', '&:hover': { opacity: 0.8 } }}>
            <Palette color={theme.palette.primary.main} size={28} />
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
              Oluwasegun Design
            </Typography>
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
