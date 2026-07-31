"use client";

import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { Palette } from 'lucide-react';

import Hero from '@/components/marketing/Hero';
import Features from '@/components/marketing/Features';
import HowItWorks from '@/components/marketing/HowItWorks';
import FAQ from '@/components/marketing/FAQ';
import Footer from '@/components/marketing/Footer';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box component="header" sx={{ p: 4, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
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

      {/* Main Content Areas */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
      </Box>

      <Footer />
    </Box>
  );
}
