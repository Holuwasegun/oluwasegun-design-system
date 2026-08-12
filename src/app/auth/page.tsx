'use client';

import React, { useState, Suspense } from 'react';
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
  Tabs,
  Tab,
  Stack,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const features = [
  'Access your design tokens anywhere',
  'Sync projects across devices',
  'Export to JSON, CSS, or Tailwind',
  'Collaborate with your team in real-time',
];

function AuthContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode');
  const [tabValue, setTabValue] = useState<number>(mode === 'signup' ? 1 : 0);
  const [prevMode, setPrevMode] = useState<string | null>(mode);

  if (prevMode !== mode) {
    setPrevMode(mode);
    setTabValue(mode === 'signup' ? 1 : 0);
  }

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setLoginError(null);
    setSignupError(null);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.requiresVerification) {
          router.push(`/verify?email=${encodeURIComponent(data.email)}`);
          return;
        }
        setLoginError(data.error || 'Failed to sign in.');
        return;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_user', JSON.stringify(data.user || { email: loginEmail }));
      }
      const redirectTo = searchParams.get('redirect') || '/dashboard';
      router.push(redirectTo);
    } catch {
      setLoginError('A network error occurred. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError(null);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: signupName, email: signupEmail, password: signupPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSignupError(data.error || 'Failed to create account.');
        return;
      }

      router.push(`/verify?email=${encodeURIComponent(signupEmail)}&sent=true`);
    } catch {
      setSignupError('A network error occurred. Please try again.');
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default', p: { xs: 2, sm: 4 }, alignItems: 'center', justifyContent: 'center' }}>
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
        }}
      >
        {/* Left Branding & Hero Panel */}
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
            Your complete Material Design 3 toolkit. Configure tokens, preview components, and ship accessible systems.
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

        {/* Right Unified Form Panel */}
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
          <Box sx={{ maxWidth: 400, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar aria-hidden="true" sx={{ m: 1, bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}>
              {tabValue === 0 ? <LockOutlinedIcon aria-hidden="true" fontSize="small" /> : <PersonAddOutlinedIcon aria-hidden="true" fontSize="small" />}
            </Avatar>

            <Typography component="h1" variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.02em', mb: 1, textAlign: 'center' }}>
              {tabValue === 0 ? 'Welcome Back' : 'Create Account'}
            </Typography>

            {/* WCAG 2.1 Compliant ARIA Accessible Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%', mb: 1 }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                aria-label="Authentication mode tabs"
                sx={{
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' },
                }}
              >
                <Tab label="Sign In" id="auth-tab-0" aria-controls="auth-tabpanel-0" />
                <Tab label="Create Account" id="auth-tab-1" aria-controls="auth-tabpanel-1" />
              </Tabs>
            </Box>

            {/* Tab 0: Sign In Form */}
            <CustomTabPanel value={tabValue} index={0}>
              {loginError && (
                <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                  {loginError}
                </Alert>
              )}

              <Box component="form" noValidate onSubmit={handleLoginSubmit} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="auth-login-email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus={tabValue === 0}
                  size="small"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="auth-login-password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  size="small"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
                  <MuiLink
                    component={Link}
                    href="/verify"
                    variant="caption"
                    sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'underline' }}
                  >
                    Forgot password or need to verify email?
                  </MuiLink>
                </Box>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loginLoading}
                  sx={{ py: 1.25, fontWeight: 600, borderRadius: 2, textTransform: 'none', fontSize: '0.95rem' }}
                >
                  {loginLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                </Button>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 3 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
                  or continue with
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
            </CustomTabPanel>

            {/* Tab 1: Create Account Form */}
            <CustomTabPanel value={tabValue} index={1}>
              {signupError && (
                <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: 2 }}>
                  {signupError}
                </Alert>
              )}

              <Box component="form" noValidate onSubmit={handleSignupSubmit} sx={{ width: '100%' }}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    required
                    id="auth-signup-name"
                    label="Full Name"
                    name="name"
                    autoComplete="name"
                    size="small"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    required
                    id="auth-signup-email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    size="small"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    required
                    id="auth-signup-password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    size="small"
                    helperText="Must be at least 6 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={signupLoading}
                    sx={{ py: 1.25, borderRadius: 2, textTransform: 'none', fontWeight: 600, fontSize: '0.95rem', mt: 1 }}
                  >
                    {signupLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
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
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function UnifiedAuthPage() {
  return (
    <Suspense fallback={<Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }} />}>
      <AuthContainer />
    </Suspense>
  );
}
