"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography, Paper, useTheme, Tooltip, Chip } from '@mui/material';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Code2, Palette, Type, Sparkles, ShieldCheck, Layers, Cpu, Copy } from 'lucide-react';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import { Capacitor } from '@capacitor/core';

export default function Hero() {
  const theme = useTheme();
  const [isNative, setIsNative] = useState(false);
  const [copied, setCopied] = useState(false);

  // Live MD3 seed palette rendered straight from active tokens
  const paletteSwatches = [
    { color: theme.palette.primary.main, label: 'Primary', role: 'var(--md-sys-color-primary)', hex: theme.palette.primary.main },
    { color: theme.palette.primary.light, label: 'Container', role: 'var(--md-sys-color-primary-container)', hex: theme.palette.primary.light },
    { color: theme.palette.secondary.main, label: 'Secondary', role: 'var(--md-sys-color-secondary)', hex: theme.palette.secondary.main },
    { color: theme.palette.warning.main, label: 'Tertiary', role: 'var(--md-sys-color-tertiary)', hex: theme.palette.warning.main },
    { color: theme.palette.error.main, label: 'Error', role: 'var(--md-sys-color-error)', hex: theme.palette.error.main },
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  const handleCopyCode = () => {
    const codeSnippet = `:root {\n  --md-sys-color-primary: ${theme.palette.primary.main};\n  --md-sys-color-on-primary: #ffffff;\n  --md-sys-typescale-display-large: clamp(3.5rem, 3.1rem + 2vw, 4.5rem);\n}`;
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
        pt: { xs: 5, sm: 8, md: 12 },
        pb: { xs: 10, md: 16 }
      }}
    >
      {/* Dynamic Ambient Background Lights */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '-15%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: { xs: '100%', md: '80%' }, 
          height: '600px', 
          background: `radial-gradient(ellipse at center, ${theme.palette.primary.main}1E 0%, rgba(0,0,0,0) 70%)`, 
          zIndex: -1, 
          pointerEvents: 'none',
          filter: 'blur(40px)',
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '40%', 
          right: '-5%', 
          width: '500px', 
          height: '500px', 
          background: `radial-gradient(circle, ${theme.palette.secondary.main}15 0%, rgba(0,0,0,0) 70%)`, 
          zIndex: -1, 
          pointerEvents: 'none',
          display: { xs: 'none', md: 'block' },
          filter: 'blur(60px)',
        }} 
      />

      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} sx={{ alignItems: 'center' }}>
          
          {/* LEFT COLUMN: Main Hero Copy & CTAs */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              
              {/* Senior UI Badge Pill */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.25,
                  px: 2.25,
                  py: 0.85,
                  borderRadius: 999,
                  mb: 3.5,
                  backgroundColor: 'background.paper',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
                  boxShadow: theme.palette.mode === 'dark' 
                    ? '0 4px 20px rgba(0,0,0,0.3)' 
                    : '0 4px 16px rgba(0,0,0,0.05)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Box 
                  sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    bgcolor: 'primary.main',
                    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                    animation: 'pulseGlow 2s infinite ease-in-out' 
                  }} 
                />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    fontWeight: 700, 
                    fontSize: '0.825rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'text.primary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                  }}
                >
                  <Sparkles size={14} style={{ color: theme.palette.primary.main }} />
                  Material Design 3 · Token Engine
                </Typography>
              </Box>

              {/* Main Headline */}
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 800, 
                  mb: 2.5,
                  fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.2rem' },
                  lineHeight: 1.08,
                  letterSpacing: '-0.035em',
                  color: 'text.primary',
                }}
              >
                Five colors in.
                <Box 
                  component="span" 
                  sx={{ 
                    display: 'block',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 50%, #8B5CF6 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mt: 0.5,
                  }}
                >
                  Every token out.
                </Box>
              </Typography>
              
              {/* Subheadline */}
              <Typography 
                variant="h5" 
                color="text.secondary" 
                sx={{ 
                  mb: 4.5, 
                  maxWidth: '620px', 
                  mx: { xs: 'auto', md: 0 }, 
                  lineHeight: 1.65, 
                  fontWeight: 400, 
                  fontSize: { xs: '1.05rem', sm: '1.2rem', md: '1.25rem' } 
                }}
              >
                Stop hand-assembling design tokens. Input 5 brand colors and instantly extrapolate a complete, WCAG AAA-compliant Material Design 3 system—color roles, fluid typography, spacing, and shadows.
              </Typography>
              
              {/* Main CTAs */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: { xs: 'stretch', sm: 'center' }, mb: 4 }}
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
                      py: 1.65, 
                      borderRadius: '12px', 
                      textTransform: 'none', 
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: `0 14px 32px ${theme.palette.primary.main}60`,
                      }
                    }}
                  >
                    Launch Dashboard
                  </Button>
                </Link>
                <Link href="#documentation" passHref style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="outlined" 
                    color="inherit" 
                    size="large"
                    sx={{ 
                      width: buttonWidth, 
                      px: 3.5, 
                      py: 1.65, 
                      borderRadius: '12px', 
                      textTransform: 'none', 
                      fontWeight: 600, 
                      fontSize: '1.05rem',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                      '&:hover': {
                        borderColor: theme.palette.primary.main,
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Read Documentation
                  </Button>
                </Link>
              </Stack>
              
              {/* App Download Strip (Polished & Professional) */}
              {!isNative && (
                <Box 
                  sx={{ 
                    pt: 2.5, 
                    borderTop: '1px solid', 
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', md: 'flex-start' },
                    gap: 1.5,
                  }}
                >
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.725rem' }}>
                    Native Cross-Platform Apps
                  </Typography>
                  <Stack 
                    direction="row" 
                    spacing={1.5} 
                    sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap', gap: 1 }}
                  >
                    {/* Android APK Download */}
                    <Button 
                      component="a"
                      href="/downloads/oluwasegun-design-system.apk"
                      download
                      size="small"
                      startIcon={<AndroidIcon sx={{ color: '#3DDC84', fontSize: 20 }} />}
                      sx={{ 
                        px: 2,
                        py: 0.9,
                        borderRadius: '10px',
                        textTransform: 'none',
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : '#0F172A',
                        color: '#FFFFFF',
                        border: '1px solid',
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.12)' : '#1E293B',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
                        }
                      }}
                    >
                      Android APK (Direct)
                    </Button>

                    {/* iOS App Badge with Refined Tooltip */}
                    <Tooltip 
                      title="iOS App Store build is pending Apple review. You can run the web app or APK in the meantime." 
                      arrow 
                      placement="top"
                    >
                      <Box component="span">
                        <Button 
                          size="small"
                          startIcon={<AppleIcon sx={{ fontSize: 20, color: 'text.secondary' }} />}
                          sx={{ 
                            px: 2,
                            py: 0.9,
                            borderRadius: '10px',
                            textTransform: 'none',
                            bgcolor: 'background.paper',
                            color: 'text.secondary',
                            border: '1px dashed',
                            borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            cursor: 'help',
                            opacity: 0.85,
                            '&:hover': {
                              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                              opacity: 1,
                            }
                          }}
                        >
                          App Store (Soon)
                        </Button>
                      </Box>
                    </Tooltip>
                  </Stack>
                </Box>
              )}

              {/* Feature Highlights Strip */}
              <Stack 
                direction="row" 
                spacing={{ xs: 2, sm: 3 }} 
                sx={{ 
                  mt: 4, 
                  pt: 2.5, 
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  color: 'text.secondary',
                  fontSize: '0.825rem'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <ShieldCheck size={16} style={{ color: theme.palette.success.main }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>WCAG AAA Compliant</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Layers size={16} style={{ color: theme.palette.primary.main }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>30+ Semantic Roles</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Cpu size={16} style={{ color: theme.palette.warning.main }} />
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Capacitor Mobile Ready</Typography>
                </Box>
              </Stack>

            </Box>
          </Grid>

          {/* RIGHT COLUMN: Senior UI Studio Stage & Interactive Showcase */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, position: 'relative' }}>
              
              {/* Main Studio Frame */}
              <Paper 
                elevation={24}
                sx={{ 
                  maxWidth: 540,
                  width: '100%',
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                  bgcolor: theme.palette.mode === 'dark' ? '#0F172A' : '#FFFFFF',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 24px 60px rgba(0,0,0,0.6)'
                    : '0 24px 48px rgba(103, 80, 164, 0.12)',
                }}
              >
                {/* Window Chrome */}
                <Box 
                  sx={{ 
                    p: 2, 
                    borderBottom: '1px solid', 
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    bgcolor: theme.palette.mode === 'dark' ? '#1E293B' : '#F8FAFC',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FF5F56' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27C93F' }} />
                    <Typography 
                      variant="body2" 
                      sx={{ ml: 1, fontFamily: 'monospace', fontSize: '0.78rem', fontWeight: 600, color: 'text.secondary' }}
                    >
                      oluwasegun.tokens.config
                    </Typography>
                  </Box>
                  <Chip 
                    label="LIVE ENGINE" 
                    size="small" 
                    color="primary" 
                    sx={{ height: 20, fontSize: '0.65rem', fontWeight: 800, borderRadius: 1 }} 
                  />
                </Box>

                {/* Studio Canvas Body */}
                <Box sx={{ p: { xs: 2.5, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  
                  {/* 1. Seed Inputs & Contrast Verification */}
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Palette size={16} style={{ color: theme.palette.primary.main }} />
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                          5 Brand Seed Colors
                        </Typography>
                      </Box>
                      <Chip 
                        label="21:1 AAA PASS" 
                        size="small" 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.625rem', 
                          fontWeight: 700, 
                          bgcolor: 'success.light', 
                          color: 'success.dark' 
                        }} 
                      />
                    </Box>

                    {/* Color Swatch Row */}
                    <Grid container spacing={1}>
                      {paletteSwatches.map((s) => (
                        <Grid key={s.label} size={2.4}>
                          <Box 
                            sx={{ 
                              p: 1, 
                              borderRadius: 2.5, 
                              bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : '#F1F5F9',
                              border: '1px solid',
                              borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                              textAlign: 'center',
                              transition: 'transform 0.2s ease',
                              '&:hover': { transform: 'scale(1.05)' }
                            }}
                          >
                            <Box 
                              sx={{ 
                                width: '100%', 
                                height: 36, 
                                borderRadius: 1.75, 
                                bgcolor: s.color, 
                                boxShadow: `0 4px 10px ${s.color}33`,
                                mb: 0.75 
                              }} 
                            />
                            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.675rem', display: 'block', lineHeight: 1.1 }}>
                              {s.label}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.55, fontSize: '0.6rem', fontFamily: 'monospace' }}>
                              {s.hex.substring(0, 7)}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* 2. Extrapolated System Preview & Fluid Typography */}
                  <Box 
                    sx={{ 
                      p: 2, 
                      borderRadius: 2.5, 
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(103, 80, 164, 0.04)',
                      border: '1px solid',
                      borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(103, 80, 164, 0.1)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Type size={16} style={{ color: theme.palette.primary.main }} />
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                        Fluid Typography Scale
                      </Typography>
                    </Box>
                    <Typography 
                      sx={{ 
                        fontSize: { xs: '1.6rem', sm: '2rem' }, 
                        fontWeight: 800, 
                        lineHeight: 1.1, 
                        letterSpacing: '-0.02em',
                        color: 'text.primary',
                      }}
                    >
                      Display Large
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontFamily: 'monospace', 
                        color: 'primary.main', 
                        fontWeight: 600, 
                        display: 'block', 
                        mt: 0.75,
                        fontSize: '0.75rem' 
                      }}
                    >
                      clamp(3.5rem, 3.1rem + 2vw, 4.5rem)
                    </Typography>
                  </Box>

                  {/* 3. Export Code Snippet Preview */}
                  <Box sx={{ position: 'relative' }}>
                    <Box 
                      sx={{ 
                        p: 2, 
                        borderRadius: 2.5, 
                        bgcolor: '#090D16', 
                        color: '#E2E8F0',
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                        lineHeight: 1.6,
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, color: '#94A3B8' }}>
                        <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '0.7rem' }}>
                          /* Exported Tokens (CSS Custom Props) */
                        </Typography>
                        <Button 
                          size="small" 
                          onClick={handleCopyCode}
                          startIcon={<Copy size={12} />}
                          sx={{ 
                            color: copied ? '#3DDC84' : '#94A3B8', 
                            fontSize: '0.65rem', 
                            textTransform: 'none', 
                            p: 0, 
                            minWidth: 0 
                          }}
                        >
                          {copied ? 'Copied!' : 'Copy CSS'}
                        </Button>
                      </Box>
                      <Box component="pre" sx={{ m: 0, overflowX: 'auto' }}>
                        <code>
                          <span style={{ color: '#F472B6' }}>:root</span> &#123;<br />
                          &nbsp;&nbsp;<span style={{ color: '#38BDF8' }}>--md-sys-color-primary</span>: <span style={{ color: '#FBBF24' }}>{theme.palette.primary.main}</span>;<br />
                          &nbsp;&nbsp;<span style={{ color: '#38BDF8' }}>--md-sys-color-on-primary</span>: <span style={{ color: '#FBBF24' }}>#ffffff</span>;<br />
                          &nbsp;&nbsp;<span style={{ color: '#38BDF8' }}>--md-sys-typescale-display</span>: <span style={{ color: '#A7F3D0' }}>clamp(3.5rem, 3.1rem + 2vw, 4.5rem)</span>;<br />
                          &#125;
                        </code>
                      </Box>
                    </Box>
                  </Box>

                  {/* Status Footer inside window */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle2 size={16} style={{ color: theme.palette.success.main }} />
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                        800+ Tokens Compiled
                      </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ opacity: 0.5, fontFamily: 'monospace', fontSize: '0.7rem' }}>
                      Build Time: 0.4ms
                    </Typography>
                  </Box>

                </Box>
              </Paper>

              {/* Designer Avatar Floating Spotlight Card (Polished integration of hero-woman.jpg) */}
              <Paper
                elevation={12}
                sx={{
                  position: 'absolute',
                  bottom: { xs: -24, sm: -20 },
                  left: { xs: '50%', sm: -24 },
                  transform: { xs: 'translateX(-50%)', sm: 'none' },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.75,
                  p: 1.5,
                  pr: 2.5,
                  borderRadius: 3.5,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
                  backdropFilter: 'blur(16px)',
                  zIndex: 2,
                  minWidth: 260,
                }}
              >
                <Box 
                  sx={{ 
                    position: 'relative', 
                    width: 48, 
                    height: 48, 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    flexShrink: 0,
                  }}
                >
                  <Box 
                    component="img" 
                    src="/images/hero-woman.jpg" 
                    alt="Senior Design Systems Lead" 
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.2, fontSize: '0.85rem' }}>
                    Senior UI Design Standard
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.2, mt: 0.25 }}>
                    Engineered for MD3 Compliance
                  </Typography>
                </Box>
              </Paper>

            </Box>
          </Grid>

        </Grid>
      </Container>

      {/* Embedded Animation Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseGlow {
          0% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.15); }
          100% { opacity: 0.6; transform: scale(0.95); }
        }
      `}} />
    </Box>
  );
}
