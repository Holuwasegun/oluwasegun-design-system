'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import {
  Box,
  Button,
  Typography,
  CssBaseline,
  Alert,
  Link as MuiLink,
  CircularProgress,
  Stack,
  InputBase,
  TextField,
  useTheme,
} from '@mui/material';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const OTP_LENGTH = 6;

const features = [
  'Access your design tokens anywhere',
  'Sync projects across devices',
  'Export to JSON, CSS, or Tailwind',
  'Collaborate with your team in real-time',
];

function VerifySidePanel() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: '0 0 45%',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        background: `linear-gradient(160deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.dark} 100%)`,
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
            color: 'primary.main',
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
        One quick step.
      </Typography>

      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.95)', mb: 4, maxWidth: 320, lineHeight: 1.6 }}>
        Confirm your email to unlock your design system workspace. It takes less than a minute.
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
  );
}

function VerifyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlEmail = searchParams.get('email') || '';
  const urlToken = searchParams.get('token') || '';
  const urlSent = searchParams.get('sent') === 'true';

  const [email, setEmail] = useState<string>(urlEmail);
  const [editingEmail, setEditingEmail] = useState<boolean>(!urlEmail);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState<number>(urlSent ? 30 : 0);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const currentEmail = email.trim();

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const submitCode = async (code: string) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentEmail, code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'That code did not match. Please check it and try again.');
        setOtp(Array(OTP_LENGTH).fill(''));
        inputsRef.current[0]?.focus();
        return;
      }

      setSuccess('Email verified! Taking you to sign in...');
      setTimeout(() => router.push('/login'), 1800);
    } catch {
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!urlToken) return;
    const timer = setTimeout(() => {
      void submitCode(urlToken);
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlToken]);

  const handleOtpChange = (index: number, raw: string) => {
    if (error) setError(null);
    const digits = raw.replace(/\D/g, '');

    if (digits.length > 1) {
      const next = Array(OTP_LENGTH).fill('');
      digits.slice(0, OTP_LENGTH).split('').forEach((d, i) => (next[i] = d));
      setOtp(next);
      const focusIndex = Math.min(digits.length, OTP_LENGTH - 1);
      inputsRef.current[focusIndex]?.focus();
      if (next.every((d) => d)) submitCode(next.join(''));
      return;
    }

    const next = [...otp];
    next[index] = digits;
    setOtp(next);

    if (digits && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    if (next.every((d) => d)) submitCode(next.join(''));
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text').replace(/\D/g, '');
    if (text.length === 0) return;
    handleOtpChange(0, text);
  };

  const handleResend = async () => {
    if (!currentEmail) {
      setEditingEmail(true);
      setError('Please enter your email address to resend the code.');
      return;
    }
    if (cooldown > 0) return;

    setResending(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('/api/auth/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: currentEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'We could not resend the code. Please try again.');
        return;
      }

      setSuccess(data.message || 'A new code is on its way to your inbox.');
      setCooldown(30);
      setOtp(Array(OTP_LENGTH).fill(''));
      inputsRef.current[0]?.focus();
    } catch {
      setError('Failed to resend the code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== OTP_LENGTH) {
      setError('Please enter the 6-digit code from your email.');
      return;
    }
    submitCode(code);
  };

  const otpComplete = otp.every((d) => d);
  const showSentInfo = urlSent && !success && !error;

  return (
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
      <Box sx={{ maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Link href="/" aria-label="Go to Oluwasegun Design System home" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 3,
              p: 0.75,
              borderRadius: 2,
              transition: 'opacity 0.2s',
              '&:hover': { opacity: 0.8 },
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              },
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: 2,
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontWeight: 700, lineHeight: 1, fontSize: '0.9rem' }}>O</Typography>
            </Box>
            <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'text.primary' }}>
                Oluwasegun
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', letterSpacing: '0.02em', display: 'block', lineHeight: 1 }}>
                Design System
              </Typography>
            </Box>
          </Box>
        </Link>

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

        <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mb: 1, textAlign: 'center', letterSpacing: '-0.02em' }}>
          Verify your email
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3, lineHeight: 1.6 }}>
          {currentEmail ? (
            <>
              We sent a 6-digit code to{' '}
              <Typography component="span" variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                {currentEmail}
              </Typography>
              . Enter it below to activate your account.
            </>
          ) : (
            <>Enter your email address to receive your 6-digit verification code.</>
          )}
        </Typography>

        {currentEmail && !editingEmail && (
          <Button variant="text" size="small" onClick={() => setEditingEmail(true)} sx={{ mt: -1.5, mb: 1.5, textTransform: 'none', fontWeight: 600, minHeight: 36 }}>
            Wrong email? Edit
          </Button>
        )}

        {editingEmail && (
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
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(null);
            }}
            sx={{ mb: 2 }}
          />
        )}

        {showSentInfo && (
          <Alert severity="info" role="status" aria-live="polite" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
            We sent a 6-digit code to your inbox. Check your spam folder if you don&apos;t see it.
          </Alert>
        )}

        {error && (
          <Alert severity="error" role="alert" aria-live="assertive" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" role="status" aria-live="polite" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
            {success}
          </Alert>
        )}

        <Box
          component="form"
          noValidate
          onSubmit={handleVerify}
          sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <Stack direction="row" spacing={{ xs: 1, sm: 1.5 }} role="group" aria-label="6-digit verification code" sx={{ width: '100%', justifyContent: 'center' }}>
            {otp.map((digit, index) => (
              <InputBase
                key={index}
                inputRef={(el) => {
                  inputsRef.current[index] = el;
                }}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                onPaste={handleOtpPaste}
                disabled={loading}
                inputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  maxLength: OTP_LENGTH,
                  autoComplete: index === 0 ? 'one-time-code' : 'off',
                  'aria-label': `Code digit ${index + 1}`,
                }}
                sx={{
                  width: { xs: 5.5, sm: 6 },
                  height: { xs: 6.5, sm: 7 },
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: error ? 'error.main' : 'divider',
                  bgcolor: 'background.paper',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'text.primary',
                  transition: 'border-color 0.2s',
                  '& .MuiInputBase-input': {
                    textAlign: 'center',
                    p: 0,
                  },
                  '&.Mui-focused': {
                    borderColor: 'primary.main',
                    boxShadow: (theme) => `0 0 0 3px ${theme.palette.primary.main}33`,
                    outline: 'none',
                  },
                  '&.Mui-disabled': {
                    opacity: 0.6,
                  },
                }}
              />
            ))}
          </Stack>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading || !otpComplete}
            sx={{
              py: 1.25,
              minHeight: 44,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '0.95rem',
              mt: 3,
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.dark',
                outlineOffset: '2px',
              },
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify Account'}
          </Button>
        </Box>

        <Box sx={{ mt: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
          <Button
            variant="text"
            size="small"
            onClick={handleResend}
            disabled={resending || cooldown > 0 || loading}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              minHeight: 44,
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                borderRadius: 1,
              },
            }}
          >
            {resending
              ? 'Sending...'
              : cooldown > 0
                ? `Resend code in ${cooldown}s`
                : 'Didn\u2019t get it? Resend code'}
          </Button>

          <Typography variant="body2" color="text.secondary">
            Already verified?{' '}
            <MuiLink
              component={Link}
              href="/login"
              variant="body2"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                textDecoration: 'underline',
                '&:focus-visible': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  borderRadius: 1,
                },
              }}
            >
              Sign In
            </MuiLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default function VerifyPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default',
        p: { xs: 2, sm: 4 },
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          maxWidth: 980,
          width: '100%',
          minHeight: 600,
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 4,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Suspense fallback={<CircularProgress />}>
          <VerifySidePanel />
          <VerifyForm />
        </Suspense>
      </Box>
    </Box>
  );
}