'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  CssBaseline,
  Divider,
  Alert,
  Link as MuiLink,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const features = [
  'Access your design tokens anywhere',
  'Sync projects across devices',
  'Export to JSON, CSS, or Tailwind',
  'Collaborate with your team in real-time',
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.requiresVerification) {
          router.push(`/verify?email=${encodeURIComponent(data.email)}`);
          return;
        }
        setError(data.error || 'Failed to sign in.');
        return;
      }

      // Successful login
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(data.user || { email }));
      }
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(redirectTo);
    } catch {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default', p: { xs: 2, sm: 4 }, alignItems: 'center', justifyContent: 'center' }}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          maxWidth: 960,
          width: '100%',
          minHeight: 560,
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 4,
          overflow: 'hidden',
        }}
      >
        {/* Hero Branding Panel */}
        <Box
          sx={{
            flex: '0 0 45%',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            background: 'linear-gradient(160deg, #6750a4 0%, #4f378b 50%, #7d5260 100%)',
            color: '#ffffff',
            p: 5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: '#ffffff',
                color: '#6750a4',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              O
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#ffffff' }}>
              Oluwasegun
            </Typography>
          </Box>

          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 2 }}>
            Design with<br />confidence.
          </Typography>

          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 4, maxWidth: 320 }}>
            Your complete Material Design 3 toolkit. Configure tokens, preview components, and ship.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {features.map((feature) => (
              <Box key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CheckCircleIcon aria-hidden="true" sx={{ fontSize: 18, color: '#ffffff' }} />
                <Typography variant="body2" sx={{ color: '#ffffff', fontWeight: 500 }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Auth Form Panel */}
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 3, sm: 5 },
          }}
        >
          <Box sx={{ maxWidth: 360, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar aria-hidden="true" sx={{ m: 1, bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}>
              <LockOutlinedIcon aria-hidden="true" fontSize="small" />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 0.5 }}>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Sign in to your design system account
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* Social Authentication */}
            <Box sx={{ display: 'flex', gap: 1.5, width: '100%', mb: 2.5 }}>
              <Button fullWidth variant="outlined" startIcon={<GoogleIcon aria-hidden="true" />} sx={{ textTransform: 'none', borderRadius: 2, py: 1 }}>
                Google
              </Button>
              <Button fullWidth variant="outlined" startIcon={<GitHubIcon aria-hidden="true" />} sx={{ textTransform: 'none', borderRadius: 2, py: 1 }}>
                GitHub
              </Button>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', mb: 2.5 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                or continue with email
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {/* WCAG AA Accessible Form */}
            <Box component="form" noValidate sx={{ width: '100%' }} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="login-email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                size="small"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="login-password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                size="small"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
                <MuiLink
                  component={Link}
                  href="/verify"
                  variant="caption"
                  sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'underline' }}
                >
                  Forgot password or verify code?
                </MuiLink>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ py: 1.25, fontWeight: 600, borderRadius: 2, textTransform: 'none', fontSize: '0.95rem' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
              </Button>
            </Box>

            {/* WCAG AA Accessible Signup Link */}
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <MuiLink
                component={Link}
                href="/signup"
                variant="body2"
                sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'underline' }}
              >
                Get started
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
