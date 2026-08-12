'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CssBaseline,
  Alert,
  Link as MuiLink,
  CircularProgress,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

function VerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const urlEmail = searchParams.get('email');
    const urlToken = searchParams.get('token');
    const sentParam = searchParams.get('sent');

    if (urlEmail) setEmail(urlEmail);
    if (urlToken) setCode(urlToken);
    if (sentParam) {
      setSuccess('A verification code generated via 32-byte crypto service has been sent to your email.');
    }
  }, [searchParams]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Verification failed.');
        return;
      }

      setSuccess('Email address verified successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError('Please enter your email address to resend code.');
      return;
    }

    setResending(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to resend code.');
        return;
      }

      setSuccess(data.message || 'A new verification code has been dispatched.');
    } catch {
      setError('Failed to resend verification email.');
    } finally {
      setResending(false);
    }
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 440, width: '100%', borderRadius: 4, boxShadow: 3 }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
          }}
        >
          <MarkEmailReadOutlinedIcon aria-hidden="true" sx={{ fontSize: 32 }} />
        </Box>

        <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: 'center' }}>
          Verify your email
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
          Enter the verification code or 64-character 32-byte crypto token sent to your email address.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
            {success}
          </Alert>
        )}

        {/* WCAG 2.1 AA Form */}
        <Box component="form" noValidate onSubmit={handleVerify} sx={{ width: '100%' }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              required
              id="verify-email"
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
              id="verify-code"
              label="Verification Code / Token"
              name="code"
              size="small"
              placeholder="e.g. 123456 or 64-char token"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              helperText="Powered by Node.js crypto.randomBytes(32)"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ py: 1.25, borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify Account'}
            </Button>
          </Stack>
        </Box>

        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
          <Button
            variant="text"
            size="small"
            disabled={resending}
            onClick={handleResend}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            {resending ? 'Sending...' : 'Resend Verification Code'}
          </Button>

          <Typography variant="body2" color="text.secondary">
            Back to{' '}
            <MuiLink
              component={Link}
              href="/login"
              variant="body2"
              sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'underline' }}
            >
              Sign In
            </MuiLink>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function VerifyPage() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default', p: 3, alignItems: 'center', justifyContent: 'center' }}>
      <CssBaseline />
      <Suspense fallback={<CircularProgress />}>
        <VerifyForm />
      </Suspense>
    </Box>
  );
}
