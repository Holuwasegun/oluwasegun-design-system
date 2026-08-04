"use client";

import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography, Paper, useTheme } from '@mui/material';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Code2, Layers, Palette } from 'lucide-react';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import { Capacitor } from '@capacitor/core';

export default function Hero() {
  const theme = useTheme();
  const [isNative, setIsNative] = useState(false);

  // Live MD3 seed palette pulled straight from the generated tokens (5 key colors -> full system)
  const paletteSwatches = [
    theme.palette.primary.main,
    theme.palette.primary.light,
    theme.palette.secondary.main,
    theme.palette.warning.main,
    theme.palette.error.main,
  ];

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
        <Grid container spacing={{ xs: 6, md: 8 }} sx={{ alignItems: 'center' }}>
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
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.25rem' },
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
                sx={{ mb: 6, maxWidth: '700px', mx: { xs: 'auto', md: 0 }, lineHeight: 1.6, fontWeight: 400, fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}
              >
                Stop guessing hex codes. Build, visualize, and export a complete Material Design 3 token system in seconds. From 5 key colors to a fully robust CSS architecture.
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}>
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
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, mt: 4, animation: 'fadeUp 0.8s ease-out 0.3s', animationFillMode: 'both' }}>
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
          </Grid>

          {/* Visual column — designer using the product, with live generated tokens floating on top */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ position: 'relative', animation: 'fadeUp 0.9s ease-out 0.15s', animationFillMode: 'both', display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              {/* Secondary glow behind the visual */}
              <Box sx={{ position: 'absolute', top: '8%', right: '-20%', width: '70%', height: '70%', borderRadius: '50%', background: `radial-gradient(circle, ${theme.palette.warning.main}1F 0%, rgba(0,0,0,0) 70%)`, zIndex: -1, pointerEvents: 'none' }} />

              <Paper 
                elevation={24}
                sx={{ 
                  position: 'relative',
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  width: '100%',
                  maxWidth: 440,
                  aspectRatio: '4/5'
                }}
              >
                <Box 
                  component="img" 
                  src="/images/hero-woman.jpg" 
                  alt="Black African woman designer working on a laptop in a modern studio" 
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Bottom scrim seats the photo in the composition */}
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))', pointerEvents: 'none' }} />
              </Paper>

              {/* Floating card: live MD3 color tokens */}
              <Paper 
                elevation={12}
                sx={{ 
                  position: 'absolute',
                  top: { xs: -20, md: -28 },
                  left: { xs: 4, md: -32 },
                  zIndex: 2,
                  p: 2,
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Palette size={16} />
                  <Typography variant="caption" sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
                    Live MD3 palette
                  </Typography>
                </Box>
                <Stack direction="row" spacing={0.75}>
                  {paletteSwatches.map((c) => (
                    <Box
                      key={c}
                      sx={{ width: 28, height: 28, borderRadius: 1.5, bgcolor: c, border: '1px solid', borderColor: 'divider' }}
                    />
                  ))}
                </Stack>
              </Paper>

              {/* Floating chip: exported tokens */}
              <Paper 
                elevation={12}
                sx={{ 
                  position: 'absolute',
                  bottom: { xs: 24, md: 36 },
                  right: { xs: 8, md: -28 },
                  zIndex: 2,
                  px: 2,
                  py: 1.5,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: 'background.paper',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', bgcolor: 'success.main', color: 'success.contrastText' }}>
                  <CheckCircle2 size={16} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', lineHeight: 1.2 }}>
                    Exported
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace', lineHeight: 1.2 }}>
                    design-tokens.css
                  </Typography>
                </Box>
              </Paper>

              {/* Floating chip: token count */}
              <Paper 
                elevation={12}
                sx={{ 
                  position: 'absolute',
                  bottom: { xs: 24, md: 32 },
                  left: { xs: 8, md: -24 },
                  zIndex: 2,
                  px: 2,
                  py: 1.5,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  bgcolor: 'background.paper',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.dark' }}>
                  <Layers size={16} />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', lineHeight: 1.2 }}>
                    From 5 key colors
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                    800+ tokens
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Hero Visual Mockup */}
        <Box sx={{ mt: { xs: 8, md: 10 }, animation: 'fadeUp 1s ease-out 0.2s', animationFillMode: 'both' }}>
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
