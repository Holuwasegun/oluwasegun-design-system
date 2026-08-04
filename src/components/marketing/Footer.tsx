'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Divider,
  TextField,
  Button,
  Chip,
  InputAdornment,
  Tooltip,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  GitHub,
  Twitter,
  LinkedIn,
  ArrowForward,
  CheckCircle,
  Email as EmailIcon,
  AutoAwesome,
} from '@mui/icons-material';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setSnackMessage('Please enter a valid email address.');
      setOpenSnackbar(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setSubscribed(true);
        setSnackMessage('Thank you for subscribing to Oluwasegun Design System updates!');
        setEmail('');
      } else {
        setSnackMessage(data.error || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setSubscribed(true);
      setSnackMessage('Thank you for subscribing to Oluwasegun Design System updates!');
      setEmail('');
    } finally {
      setIsSubmitting(false);
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        pt: { xs: 8, md: 12 },
        pb: { xs: 6, md: 8 },
        borderTop: '1px solid',
        borderColor: 'divider',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Senior Designer Newsletter & Subscribe Banner */}
        <Box
          sx={{
            p: { xs: 4, sm: 6, md: 8 },
            mb: { xs: 8, sm: 10, md: 12 },
            borderRadius: { xs: 5, md: 8 },
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)'
                : 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.008) 100%)',
            border: '1px solid',
            borderColor: 'divider',
            backdropFilter: 'blur(24px)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 20px 50px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 20px 50px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: { xs: 'flex-start', lg: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 4, lg: 6 },
          }}
        >
          <Box sx={{ maxWidth: 560 }}>
            <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', mb: 2 }}>
              <Chip
                icon={<AutoAwesome sx={{ fontSize: '14px !important', color: 'inherit' }} />}
                label="Newsletter Updates"
                size="small"
                sx={{
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  letterSpacing: '0.04em',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  px: 0.5,
                  py: 0.25,
                }}
              />
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                • Direct to your inbox
              </Typography>
            </Stack>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                letterSpacing: '-0.03em',
                mb: 1.5,
                color: 'text.primary',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                lineHeight: 1.2,
              }}
            >
              Stay updated with design token releases.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.65, fontSize: { xs: '0.925rem', sm: '1rem' } }}
            >
              Get monthly breakdowns on Material 3 design tokens, cross-platform architecture, and OTA update tutorials delivered straight to your email.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubscribe}
            sx={{
              width: { xs: '100%', lg: 'auto' },
              minWidth: { sm: 400, lg: 440 },
            }}
          >
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: '100%' }}>
              <TextField
                placeholder="Enter your email address"
                variant="outlined"
                size="medium"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || subscribed}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'background.default',
                    fontSize: '0.95rem',
                    py: 0.5,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disableElevation
                disabled={isSubmitting || subscribed}
                endIcon={
                  isSubmitting ? (
                    <CircularProgress size={18} color="inherit" />
                  ) : subscribed ? (
                    <CheckCircle />
                  ) : (
                    <ArrowForward />
                  )
                }
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: { xs: 1.5, sm: 1.75 },
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                  },
                }}
              >
                {subscribed ? 'Subscribed' : isSubmitting ? 'Sending...' : 'Subscribe'}
              </Button>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5, textAlign: 'left', fontSize: '0.75rem' }}>
              Zero spam. Unsubscribe at any time.
            </Typography>
          </Box>
        </Box>

        {/* Main Grid Links Section */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(12, 1fr)',
            },
            gap: { xs: 5, md: 4 },
            mb: 8,
          }}
        >
          {/* Brand & Mission Column */}
          <Box sx={{ gridColumn: { xs: 'span 1', sm: 'span 2', md: 'span 4' } }}>
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2.5,
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 900,
                    fontSize: '1.25rem',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                  }}
                >
                  O
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: 'text.primary' }}
                  >
                    Oluwasegun
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 700, fontSize: '0.65rem' }}
                  >
                    Design System v2.4
                  </Typography>
                </Box>
              </Stack>
            </Link>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.6, maxWidth: 320 }}
            >
              Precision-engineered design token engine, component styleguide, and cross-platform live update system for React & Native apps.
            </Typography>

            {/* Operational Status Pill */}
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.75,
                  py: 0.5,
                  borderRadius: 10,
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.12)' : 'rgba(76, 175, 80, 0.08)',
                  border: '1px solid',
                  borderColor: 'success.main',
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                    boxShadow: '0 0 8px #4caf50',
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 700, color: 'success.main', fontSize: '0.725rem', letterSpacing: '0.02em' }}
                >
                  All Systems Operational
                </Typography>
              </Box>
            </Stack>

            {/* Social Icons */}
            <Stack direction="row" spacing={1}>
              <Tooltip title="GitHub Repository" arrow>
                <IconButton
                  component="a"
                  href="https://github.com/Holuwasegun/oluwasegun-design-system"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    bgcolor: 'action.hover',
                    transition: 'all 0.2s',
                    '&:hover': { color: 'primary.main', bgcolor: 'action.selected', transform: 'translateY(-2px)' },
                  }}
                >
                  <GitHub fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Twitter / X" arrow>
                <IconButton
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    bgcolor: 'action.hover',
                    transition: 'all 0.2s',
                    '&:hover': { color: 'primary.main', bgcolor: 'action.selected', transform: 'translateY(-2px)' },
                  }}
                >
                  <Twitter fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="LinkedIn Profile" arrow>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/in/oluwasegunawodeyi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    bgcolor: 'action.hover',
                    transition: 'all 0.2s',
                    '&:hover': { color: 'primary.main', bgcolor: 'action.selected', transform: 'translateY(-2px)' },
                  }}
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          {/* Navigation Columns */}
          <Box
            sx={{
              gridColumn: { xs: 'span 1', sm: 'span 1', md: 'span 2' },
              display: 'flex',
              flexDirection: 'column',
              gap: 1.75,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                mb: 0.5,
              }}
            >
              Product
            </Typography>

            <FooterLink href="/dashboard" label="Layout Lab" badge="v2.4" />
            <FooterLink href="#features" label="Design Tokens" />
            <FooterLink href="#features" label="Color Palette Spec" />
            <FooterLink href="#workflow" label="Live Preview" />
            <FooterLink href="/dashboard" label="Capgo OTA Sync" badge="New" />
          </Box>

          <Box
            sx={{
              gridColumn: { xs: 'span 1', sm: 'span 1', md: 'span 2' },
              display: 'flex',
              flexDirection: 'column',
              gap: 1.75,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                mb: 0.5,
              }}
            >
              Resources
            </Typography>

            <FooterLink href="#documentation" label="Documentation" />
            <FooterLink href="#documentation" label="Material Design 3" />
            <FooterLink href="#documentation" label="CSS Variables Guide" />
            <FooterLink href="#faq" label="FAQ & Guides" />
            <FooterLink href="https://github.com/Holuwasegun/oluwasegun-design-system" label="GitHub Releases" isExternal />
          </Box>

          <Box
            sx={{
              gridColumn: { xs: 'span 1', sm: 'span 1', md: 'span 2' },
              display: 'flex',
              flexDirection: 'column',
              gap: 1.75,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                mb: 0.5,
              }}
            >
              Platforms
            </Typography>

            <FooterLink href="/dashboard" label="React / Next.js" />
            <FooterLink href="/dashboard" label="Android Native" badge="SDK" />
            <FooterLink href="/dashboard" label="Material UI (MUI)" />
            <FooterLink href="/dashboard" label="Zustand Store" />
          </Box>

          <Box
            sx={{
              gridColumn: { xs: 'span 1', sm: 'span 1', md: 'span 2' },
              display: 'flex',
              flexDirection: 'column',
              gap: 1.75,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                mb: 0.5,
              }}
            >
              Legal & Info
            </Typography>

            <FooterLink href="#" label="Privacy Policy" />
            <FooterLink href="#" label="Terms of Service" />
            <FooterLink href="#" label="MIT License" />
            <FooterLink href="https://www.linkedin.com/in/oluwasegunawodeyi/" label="About Author" isExternal />
          </Box>
        </Box>

        <Divider sx={{ mb: 5 }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-end' },
            gap: { xs: 3, md: 4 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          {/* Copyright */}
          <Box>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.875rem' }}>
              &copy; {new Date().getFullYear()} Oluwasegun Design System
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', opacity: 0.75, display: 'block', mt: 0.5, letterSpacing: '0.02em' }}
            >
              All rights reserved &middot; Crafted for Designers &amp; Developers
            </Typography>
          </Box>

          {/* Tech stack */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', rowGap: 1 }}
          >
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', opacity: 0.7, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: '0.65rem' }}
            >
              Architected with
            </Typography>
            <Stack direction="row" spacing={1}>
              <TechPill label="Next.js" />
              <TechPill label="Material UI" />
              <TechPill label="Zustand" />
            </Stack>
          </Stack>
        </Box>

        {/* Grand Senior Watermark Signature Typography */}
        <Typography
          variant="h1"
          sx={{
            mt: { xs: 7, md: 9 },
            fontWeight: 900,
            fontSize: { xs: '3rem', sm: '5.5rem', md: '8rem' },
            letterSpacing: '-0.05em',
            textAlign: 'center',
            userSelect: 'none',
            pointerEvents: 'none',
            color: 'text.primary',
            opacity: (theme) => (theme.palette.mode === 'dark' ? 0.04 : 0.03),
            lineHeight: 0.8,
            textTransform: 'uppercase',
          }}
        >
          OLUWASEGUN
        </Typography>
      </Container>

      {/* Snackbar notification for email subscription */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={subscribed ? "success" : "warning"}
          variant="filled"
          onClose={() => setOpenSnackbar(false)}
          sx={{ borderRadius: 3 }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function TechPill({ label }: { label: string }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        px: 1.25,
        py: 0.5,
        borderRadius: 999,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'action.hover',
        color: 'text.secondary',
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </Box>
  );
}

function FooterLink({
  href,
  label,
  badge,
  isExternal = false,
}: {
  href: string;
  label: string;
  badge?: string;
  isExternal?: boolean;
}) {
  return (
    <Box>
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        style={{ textDecoration: 'none' }}
      >
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            display: 'inline-flex',
            color: 'text.secondary',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: 'primary.main',
              transform: 'translateX(4px)',
            },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
            {label}
          </Typography>
          {badge && (
            <Chip
              label={badge}
              size="small"
              sx={{
                height: 18,
                fontSize: '0.625rem',
                fontWeight: 800,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                px: 0.5,
              }}
            />
          )}
        </Stack>
      </Link>
    </Box>
  );
}
