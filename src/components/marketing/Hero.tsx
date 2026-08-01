"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Stack, Typography, Paper, useTheme } from '@mui/material';
import Link from 'next/link';
import { ArrowRight, Code2 } from 'lucide-react';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import { Capacitor } from '@capacitor/core';

export default function Hero() {
  const theme = useTheme();
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  return (
    <Box 
      component="section" 
      sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 8, md: 16 },
        pb: { xs: 8, md: 12 }
      }}
    >
      {/* Background glow effects */}
      <Box sx={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '500px', background: `radial-gradient(circle, ${theme.palette.primary.main}1A 0%, rgba(0,0,0,0) 70%)`, zIndex: -1, pointerEvents: 'none' }} />

      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8, animation: 'fadeUp 0.8s ease-out' }}>
          <Typography 
            variant="h1" 
            component="h1" 
            sx={{ 
              fontWeight: 800, 
              mb: 4,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              background: (theme) => `linear-gradient(135deg, ${theme.palette.text.primary} 30%, ${theme.palette.primary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Design Systems,<br />Instantly Generated.
          </Typography>
          
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ mb: 6, maxWidth: '700px', mx: 'auto', lineHeight: 1.6, fontWeight: 400, fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
          >
            Stop guessing hex codes. Build, visualize, and export a complete Material Design 3 token system in seconds. From 5 key colors to a fully robust CSS architecture.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
            <Link href="/dashboard" passHref>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                endIcon={<ArrowRight />}
                disableElevation
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 8, 
                  textTransform: 'none', 
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                  '&:hover': {
                    boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
                  }
                }}
              >
                Launch Dashboard
              </Button>
            </Link>
            <Link href="#documentation" passHref legacyBehavior>
              <Button 
                variant="outlined" 
                color="inherit" 
                size="large"
                sx={{ px: 4, py: 1.5, borderRadius: 8, textTransform: 'none', fontWeight: 600, fontSize: '1.1rem' }}
              >
                Read Documentation
              </Button>
            </Link>
          </Stack>
          
          {!isNative && (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center', mt: 4, animation: 'fadeUp 0.8s ease-out 0.3s', animationFillMode: 'both' }}>
              <Button 
                component="a"
                href="/downloads/oluwasegun-design-system.apk"
                download
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: '1px solid',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '8px 20px',
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  minWidth: '220px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: '#111111',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                    borderColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <AndroidIcon sx={{ fontSize: 36, mr: 2, color: '#3DDC84' }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ fontSize: '0.65rem', lineHeight: 1, mb: 0.5, opacity: 0.7, letterSpacing: '0.05em' }}>
                    DOWNLOAD FOR
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1, fontFamily: 'inherit' }}>
                    Android
                  </Typography>
                </Box>
              </Button>
              <Button 
                onClick={() => alert("iOS apps cannot be sideloaded directly from websites. They must be downloaded from the official App Store. This link will be updated once published.")}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: '1px solid',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '8px 20px',
                  textTransform: 'none',
                  justifyContent: 'flex-start',
                  minWidth: '220px',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: '#111111',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
                    borderColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <AppleIcon sx={{ fontSize: 36, mr: 2 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Typography variant="caption" sx={{ fontSize: '0.65rem', lineHeight: 1, mb: 0.5, opacity: 0.7, letterSpacing: '0.05em' }}>
                    DOWNLOAD ON THE
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1, fontFamily: 'inherit' }}>
                    App Store
                  </Typography>
                </Box>
              </Button>
            </Stack>
          )}
        </Box>

        {/* Hero Visual Mockup */}
        <Box sx={{ animation: 'fadeUp 1s ease-out 0.2s', animationFillMode: 'both' }}>
          <Paper 
            elevation={24}
            sx={{ 
              borderRadius: 4,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
              background: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              aspectRatio: { xs: '4/3', md: '16/9' },
              maxWidth: 900,
              mx: 'auto'
            }}
          >
            {/* Mock Window Header */}
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main', opacity: 0.8 }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main', opacity: 0.8 }} />
              <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main', opacity: 0.8 }} />
            </Box>
            {/* Mock Code Content */}
            <Box sx={{ p: 4, flexGrow: 1, bgcolor: '#0d1117', color: '#c9d1d9', overflow: 'hidden', position: 'relative' }}>
              <Stack direction="row" spacing={2} sx={{ mb: 3, opacity: 0.6, alignItems: 'center' }}>
                <Code2 size={20} />
                <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>design-tokens.css</Typography>
              </Stack>
              <Typography sx={{ fontFamily: 'monospace', fontSize: { xs: '0.75rem', md: '0.95rem' }, whiteSpace: 'pre', color: '#8b949e' }}>
                <span style={{ color: '#ff7b72' }}>:root</span> {'{'}
                <br />  <span style={{ color: '#79c0ff' }}>--md-sys-color-primary</span>: <span style={{ color: '#a5d6ff' }}>#006493</span>;
                <br />  <span style={{ color: '#79c0ff' }}>--md-sys-color-on-primary</span>: <span style={{ color: '#a5d6ff' }}>#ffffff</span>;
                <br />  <span style={{ color: '#79c0ff' }}>--md-sys-color-primary-container</span>: <span style={{ color: '#a5d6ff' }}>#cae6ff</span>;
                <br />  <span style={{ color: '#79c0ff' }}>--md-sys-color-secondary</span>: <span style={{ color: '#a5d6ff' }}>#50606e</span>;
                <br />  <span style={{ color: '#8b949e' }}>{'/* 15-tier type scale */'}</span>
                <br />  <span style={{ color: '#79c0ff' }}>--md-sys-typescale-display-large-size</span>: <span style={{ color: '#a5d6ff' }}>clamp(3.5rem, 3.1rem + 2vw, 4.5rem)</span>;
                <br />{'}'}
              </Typography>
              <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(to top, #0d1117, transparent)' }} />
            </Box>
          </Paper>
        </Box>
      </Container>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </Box>
  );
}
