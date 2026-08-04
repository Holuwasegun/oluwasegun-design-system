"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography, Paper, useTheme } from '@mui/material';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Code2, Palette, Type } from 'lucide-react';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import { Capacitor } from '@capacitor/core';

export default function Hero() {
  const theme = useTheme();
  const [isNative, setIsNative] = useState(false);

  // Live MD3 seed palette rendered straight from the generated tokens (5 key colors -> full system)
  const paletteSwatches = [
    { color: theme.palette.primary.main, label: 'Primary' },
    { color: theme.palette.primary.light, label: 'Container' },
    { color: theme.palette.secondary.main, label: 'Secondary' },
    { color: theme.palette.warning.main, label: 'Tertiary' },
    { color: theme.palette.error.main, label: 'Error' },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  // Mobile-first: CTAs stack and stretch to full width, then go inline on larger screens
  const buttonWidth = { xs: '100%', sm: 'auto' };

  return (
    <Box 
      component="section" 
      sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 6, md: 14 },
        pb: { xs: 10, md: 14 }
      }}
    >
      {/* Background glow effects */}
      <Box sx={{ position: 'absolute', top: '-12%', left: '50%', transform: 'translateX(-50%)', width: '85%', height: '520px', background: `radial-gradient(circle, ${theme.palette.primary.main}1A 0%, rgba(0,0,0,0) 70%)`, zIndex: -1, pointerEvents: 'none' }} />
      <Box sx={{ position: 'absolute', top: '55%', right: '-10%', width: '45%', height: '420px', background: `radial-gradient(circle, ${theme.palette.warning.main}1A 0%, rgba(0,0,0,0) 70%)`, zIndex: -1, pointerEvents: 'none', display: { xs: 'none', md: 'block' } }} />

      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 7, md: 8 }} sx={{ alignItems: 'center' }}>
          {/* Copy column */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, animation: 'fadeUp 0.8s ease-out' }}>
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 0.75,
                  borderRadius: 999,
                  mb: 3,
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.dark,
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  letterSpacing: '0.02em',
                }}
              >
                <Box component="span" sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
                Material Design 3 · Token System
              </Box>

              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 4,
                  fontSize: { xs: '2.25rem', sm: '3rem', md: '4rem' },
                  lineHeight: 1.12,
                  letterSpacing: '-0.03em'
                }}
              >
                Five colors in.
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'block',
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Every token out.
                </Box>
              </Typography>
              
              <Typography 
                variant="h5" 
                color="text.secondary" 
                sx={{ mb: 6, maxWidth: '640px', mx: { xs: 'auto', md: 0 }, lineHeight: 1.6, fontWeight: 400, fontSize: { xs: '1rem', sm: '1.2rem', md: '1.35rem' } }}
              >
                Stop hand-assembling token files. Drop in 5 brand colors and get a complete Material Design 3 system — color, type, spacing, and shadows — exported in seconds.
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: { xs: 'stretch', sm: 'center' } }}
              >
                <Link href="/dashboard" passHref>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    endIcon={<ArrowRight />}
                    disableElevation
                    sx={{ 
                      width: buttonWidth,
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
                    sx={{ width: buttonWidth, px: 4, py: 1.5, borderRadius: 8, textTransform: 'none', fontWeight: 600, fontSize: '1.1rem' }}
                  >
                    Read Documentation
                  </Button>
                </Link>
              </Stack>
              
              {!isNative && (
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: { xs: 'stretch', sm: 'center' }, mt: 4, animation: 'fadeUp 0.8s ease-out 0.3s', animationFillMode: 'both' }}
                >
                  <Button 
                    component="a"
                    href="/downloads/oluwasegun-design-system.apk"
                    download
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      width: buttonWidth,
                      minWidth: { xs: 0, sm: 220 },
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      border: '1px solid',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '8px 20px',
                      textTransform: 'none',
                      justifyContent: 'flex-start',
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
                      width: buttonWidth,
                      minWidth: { xs: 0, sm: 220 },
                      backgroundColor: '#000000',
                      color: '#FFFFFF',
                      border: '1px solid',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      padding: '8px 20px',
                      textTransform: 'none',
                      justifyContent: 'flex-start',
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
          </Grid>

          {/* Visual column — one product window: the designer, and the system she generated */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ animation: 'fadeUp 0.9s ease-out 0.15s', animationFillMode: 'both', display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <Paper 
                elevation={24}
                sx={{ 
                  maxWidth: 520,
                  width: '100%',
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper'
                }}
              >
                {/* Window chrome */}
                <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main', opacity: 0.8 }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main', opacity: 0.8 }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main', opacity: 0.8 }} />
                  </Box>
                  <Typography variant="body2" sx={{ mx: 'auto', fontFamily: 'monospace', fontSize: '0.8rem', opacity: 0.6 }}>
                    oluwasegun-design-system
                  </Typography>
                  <Code2 size={16} style={{ opacity: 0.5 }} />
                </Box>

                {/* Body: designer photo + generated output */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                  {/* Designer */}
                  <Box sx={{ position: 'relative', width: { xs: '100%', md: '46%' }, minHeight: { xs: 300, md: 420 } }}>
                    <Box 
                      component="img" 
                      src="/images/hero-woman.jpg" 
                      alt="Black African woman designer working on a laptop in a modern studio" 
                      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <Box sx={{ position: 'absolute', bottom: 12, left: 12, px: 1.5, py: 1, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}>
                      <Typography variant="caption" sx={{ color: '#FFFFFF', fontWeight: 600, lineHeight: 1.2 }}>
                        5 colors → 800+ tokens
                      </Typography>
                    </Box>
                  </Box>

                  {/* Generated output */}
                  <Box sx={{ flex: 1, p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {/* Colors */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
                        <Palette size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.02em' }}>
                          COLORS · MD3
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        {paletteSwatches.map((s) => (
                          <Box key={s.label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                            <Box sx={{ width: { xs: 36, md: 40 }, height: { xs: 36, md: 40 }, borderRadius: 2, bgcolor: s.color, border: '1px solid', borderColor: 'divider' }} />
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.6, whiteSpace: 'nowrap' }}>
                              {s.label}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>

                    {/* Type scale */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
                        <Type size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.02em' }}>
                          TYPE SCALE · DISPLAY LARGE
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: { xs: '1.9rem', md: '2.4rem' }, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                        Display Large
                      </Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', opacity: 0.55, display: 'block', mt: 0.5 }}>
                        clamp(3.5rem, 3.1rem + 2vw, 4.5rem)
                      </Typography>
                    </Box>

                    {/* Export status */}
                    <Box sx={{ mt: 'auto', pt: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1.5, py: 1.5, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.dark' }}>
                        <CheckCircle2 size={18} />
                        <Box>
                          <Typography variant="caption" sx={{ opacity: 0.75, display: 'block', lineHeight: 1.2 }}>
                            Ready to export
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2, fontFamily: 'monospace' }}>
                            design-tokens.css
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
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
