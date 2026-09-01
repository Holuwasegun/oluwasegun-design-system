"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography, Paper, useTheme, Tooltip } from '@mui/material';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Code2, Palette, Type, Sparkles } from 'lucide-react';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import { Capacitor } from '@capacitor/core';

export default function Hero() {
  const theme = useTheme();
  const [isNative, setIsNative] = useState(false);

  // Live MD3 seed palette rendered straight from generated tokens
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
              
              {/* Badge Pill */}
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
                <Sparkles size={14} style={{ color: theme.palette.primary.dark }} />
                Material Design 3 · Token System
              </Box>

              {/* Headline */}
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 3,
                  fontSize: { xs: '2.4rem', sm: '3.2rem', md: '4rem' },
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em'
                }}
              >
                Design Systems,
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'block',
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mt: 0.5,
                  }}
                >
                  Instantly Generated.
                </Box>
              </Typography>
              
              {/* Subtext */}
              <Typography 
                variant="h5" 
                color="text.secondary" 
                sx={{ mb: 5, maxWidth: '640px', mx: { xs: 'auto', md: 0 }, lineHeight: 1.6, fontWeight: 400, fontSize: { xs: '1.05rem', sm: '1.2rem', md: '1.3rem' } }}
              >
                Stop guessing hex codes. Build, visualize, and export a complete Material Design 3 token system in seconds. From 5 key colors to a fully robust CSS architecture.
              </Typography>
              
              {/* Action Buttons */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: { xs: 'stretch', sm: 'center' } }}
              >
                <Link href="/dashboard" passHref style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    endIcon={<ArrowRight size={18} />}
                    disableElevation
                    sx={{ 
                      width: buttonWidth,
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2.5, 
                      textTransform: 'none', 
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                      '&:hover': {
                        boxShadow: `0 12px 32px ${theme.palette.primary.main}60`,
                        transform: 'translateY(-1px)',
                      }
                    }}
                  >
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="#documentation" passHref style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="outlined" 
                    color="inherit" 
                    size="large"
                    sx={{ width: buttonWidth, px: 4, py: 1.5, borderRadius: 2.5, textTransform: 'none', fontWeight: 600, fontSize: '1.1rem' }}
                  >
                    Read Documentation
                  </Button>
                </Link>
              </Stack>
              
              {/* Free promise trust row */}
              <Stack 
                direction="row" 
                spacing={{ xs: 1.5, sm: 2.5 }} 
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', flexWrap: 'wrap', rowGap: 1, mt: 3, animation: 'fadeUp 0.8s ease-out 0.25s', animationFillMode: 'both' }}
              >
                {['Free forever', 'No credit card', 'Open source', 'No limits'].map((item) => (
                  <Box key={item} sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'text.secondary' }}>
                    <CheckCircle2 size={16} style={{ color: theme.palette.success.main }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.2 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              
              {/* Native App Downloads */}
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

                  <Tooltip title="iOS App Store build is pending review. Web app & APK downloads are live." arrow placement="top">
                    <Box component="span" sx={{ width: buttonWidth }}>
                      <Button 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
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
                          opacity: 0.85,
                          '&:hover': {
                            backgroundColor: '#111111',
                            borderColor: 'rgba(255,255,255,0.2)',
                            opacity: 1,
                          }
                        }}
                      >
                        <AppleIcon sx={{ fontSize: 36, mr: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <Typography variant="caption" sx={{ fontSize: '0.65rem', lineHeight: 1, mb: 0.5, opacity: 0.7, letterSpacing: '0.05em' }}>
                            DOWNLOAD ON THE
                          </Typography>
                          <Typography variant="subtitle1" sx={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1, fontFamily: 'inherit' }}>
                            App Store (Soon)
                          </Typography>
                        </Box>
                      </Button>
                    </Box>
                  </Tooltip>
                </Stack>
              )}
            </Box>
          </Grid>

          {/* Product Window Visual */}
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

                {/* Window Body: designer photo + generated output */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                  {/* Designer image */}
                  <Box sx={{ position: 'relative', width: { xs: '100%', sm: '46%' }, minHeight: { xs: 260, sm: 380 } }}>
                    <Box 
                      component="img" 
                      src="/images/hero-woman.jpg" 
                      alt="Designer working on design system" 
                      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <Box sx={{ position: 'absolute', bottom: 12, left: 12, px: 1.5, py: 1, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}>
                      <Typography variant="caption" sx={{ color: '#FFFFFF', fontWeight: 600, lineHeight: 1.2 }}>
                        5 colors → 800+ tokens
                      </Typography>
                    </Box>
                  </Box>

                  {/* Generated token output preview */}
                  <Box sx={{ flex: 1, p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {/* Swatches */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
                        <Palette size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.02em' }}>
                          COLORS · MD3 SYSTEM
                        </Typography>
                      </Box>
                      <Stack direction="row" spacing={1}>
                        {paletteSwatches.map((s) => (
                          <Box key={s.label} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                            <Box sx={{ width: { xs: 32, sm: 38 }, height: { xs: 32, sm: 38 }, borderRadius: 2, bgcolor: s.color, border: '1px solid', borderColor: 'divider' }} />
                            <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.65, whiteSpace: 'nowrap' }}>
                              {s.label}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>

                    {/* Typography Scale */}
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1 }}>
                        <Type size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.02em' }}>
                          TYPE SCALE · FLUID CLAMP
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: { xs: '1.8rem', sm: '2.2rem' }, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                        Display Large
                      </Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', opacity: 0.55, display: 'block', mt: 0.5 }}>
                        clamp(3.5rem, 3.1rem + 2vw, 4.5rem)
                      </Typography>
                    </Box>

                    {/* Export Card */}
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
