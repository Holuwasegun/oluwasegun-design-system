"use client";

import React from 'react';
import { Box } from '@mui/material';

import Header from '@/components/marketing/Header';
import Hero from '@/components/marketing/Hero';
import Features from '@/components/marketing/Features';
import HowItWorks from '@/components/marketing/HowItWorks';
import FAQ from '@/components/marketing/FAQ';
import DocumentationSection from '@/components/marketing/DocumentationSection';
import Footer from '@/components/marketing/Footer';
import ScrollToTop from '@/components/marketing/ScrollToTop';

export default function Home() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Hero />
        <Features />
        <HowItWorks />
        <DocumentationSection />
        <FAQ />
      </Box>
      <Footer />
      <ScrollToTop />
    </Box>
  );
}
