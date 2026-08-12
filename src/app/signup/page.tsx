'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CssBaseline,
  Divider,
  Alert,
  Link as MuiLink,
  CircularProgress,
  Stack,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create account.');
        return;
      }

      // Redirect to verification page with email
      router.push(`/verify?email=${encodeURIComponent(email)}&sent=true`);
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
          minHeight: 580,
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
            alignItems: 'center',
            background: 'linear-gradient(135deg, #6750a4 0%, #7d5260 100%)',
            color: '#ffffff',
            p: 5,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
            Join Our Platform
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', maxWidth: 300, mb: 4 }}>
            Create your account and start configuring your Material Design 3 tokens.
          </Typography>

          <Stack direction="row" spacing={2}>
            {[
              { icon: '🎨', label: 'Design' },
              { icon: '⚡', label: 'Fast' },
              { icon: '🔒', label: 'Secure' },
            ].map((item) => (
              <Box key={item.label} sx={{ bgcolor: 'rgba(255, 255, 255, 0.15)', borderRadius: 2, p: 2, minWidth: 80 }}>
                <Typography variant="h5" role="img" aria-label={item.label}>
                  {item.icon}
                </Typography>
                <Typography variant="caption" sx={{ color: '#ffffff', mt: 0.5, display: 'block', fontWeight: 600 }}>
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Signup Form Panel */}
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
          <Box sx={{ maxWidth: 380, width: '100%' }}>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Fill in your details to activate your design system workspace
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {/* WCAG 2.1 AA Compliant Form */}
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  required
                  id="signup-name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  fullWidth
                  required
                  id="signup-email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  required
                  id="signup-password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  size="small"
                  helperText="Must be at least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  sx={{ py: 1.25, borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: '0.95rem', mt: 1 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
                </Button>
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                or sign up with
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            <Stack direction="row" spacing={1.5}>
              <Button fullWidth variant="outlined" startIcon={<GoogleIcon aria-hidden="true" />} sx={{ textTransform: 'none', borderRadius: 2, py: 1 }}>
                Google
              </Button>
              <Button fullWidth variant="outlined" startIcon={<GitHubIcon aria-hidden="true" />} sx={{ textTransform: 'none', borderRadius: 2, py: 1 }}>
                GitHub
              </Button>
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?{' '}
              <MuiLink
                component={Link}
                href="/login"
                variant="body2"
                sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'underline' }}
              >
                Sign in
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
