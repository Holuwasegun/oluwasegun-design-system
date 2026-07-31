"use client";

import React from 'react';
import { Box } from '@mui/material';

import Header from '@/components/marketing/Header';
import Hero from '@/components/marketing/Hero';
import Features from '@/components/marketing/Features';
import HowItWorks from '@/components/marketing/HowItWorks';
import FAQ from '@/components/marketing/FAQ';
import CtaSection from '@/components/marketing/CtaSection';
import Footer from '@/components/marketing/Footer';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
        <CtaSection />
      </Box>
      <Footer />
    </Box>
  );
}
