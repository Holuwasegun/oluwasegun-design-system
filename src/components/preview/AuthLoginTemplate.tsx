import { Box, TextField, Button, Typography, Avatar, CssBaseline, Divider, Chip } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ColorScheme } from '@/theme/scheme';
import { useThemeStore } from '@/store';

const features = [
  'Access your design tokens anywhere',
  'Sync projects across devices',
  'Export to JSON, CSS, or Tailwind',
  'Collaborate with your team in real-time',
];

export default function AuthLoginTemplate({ scheme }: { scheme: ColorScheme }) {
  const fontFamily = useThemeStore((s) => s.config.typography.fontFamily);
  const ff = fontFamily?.trim() ? `'${fontFamily.trim()}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` : undefined;

  const theme = createTheme({
    palette: {
      primary: { main: scheme.primary },
      secondary: { main: scheme.secondary },
      background: { default: scheme.surface, paper: scheme.surfaceContainerLowest },
      text: { primary: scheme.onSurface, secondary: scheme.onSurfaceVariant },
    },
    ...(ff ? { typography: { fontFamily: ff } } : {}),
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: 580, bgcolor: 'background.default', borderRadius: 4, overflow: 'hidden' }}>
        <CssBaseline />

        {/* Hero Panel */}
        <Box
          sx={{
            flex: '0 0 48%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background gradient */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(160deg, ${scheme.primaryContainer} 0%, ${scheme.primary} 50%, ${scheme.tertiaryContainer} 100%)`,
            }}
          />

          {/* Decorative circles */}
          <Box
            sx={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: '50%',
              bgcolor: `${scheme.primary}20`,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -40,
              left: -40,
              width: 160,
              height: 160,
              borderRadius: '50%',
              bgcolor: `${scheme.onPrimary}10`,
            }}
          />

          {/* Content */}
          <Box sx={{ position: 'relative', zIndex: 1, p: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: scheme.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 4px 12px ${scheme.primary}44`,
                }}
              >
                <Typography sx={{ color: scheme.onPrimary, fontWeight: 700, fontSize: '1.1rem', lineHeight: 1 }}>O</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: scheme.onPrimaryContainer, letterSpacing: '-0.01em' }}>
                Oluwasegun
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: scheme.onPrimaryContainer,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                mb: 2,
              }}
            >
              Design with
              <br />
              confidence.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: `${scheme.onPrimaryContainer}CC`,
                lineHeight: 1.6,
                mb: 4,
                maxWidth: 340,
              }}
            >
              Your complete Material Design 3 toolkit. Configure tokens, preview components, and ship beautiful interfaces.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {features.map((feature) => (
                <Box key={feature} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <CheckCircleIcon sx={{ fontSize: 18, color: scheme.onPrimaryContainer }} />
                  <Typography variant="body2" sx={{ color: scheme.onPrimaryContainer, fontWeight: 500 }}>
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Form Panel */}
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            minWidth: 0,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 360, width: '100%' }}>
            {/* Mobile-only brand */}
            <Box sx={{ display: 'none', alignItems: 'center', gap: 1, mb: 3 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1.5,
                  bgcolor: scheme.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography sx={{ color: scheme.onPrimary, fontWeight: 700, fontSize: '0.875rem', lineHeight: 1 }}>O</Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: '-0.01em' }}>
                Oluwasegun
              </Typography>
            </Box>

            <Avatar sx={{ m: 1, bgcolor: `${scheme.primary}15`, color: 'primary.main', width: 48, height: 48 }}>
              <LockOutlinedIcon fontSize="small" />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
              Welcome back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
              Sign in to your design system account
            </Typography>

            {/* Social Login */}
            <Box sx={{ display: 'flex', gap: 1.5, width: '100%', mb: 2.5 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  py: 1.1,
                  fontWeight: 500,
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHubIcon />}
                sx={{
                  textTransform: 'none',
                  borderRadius: 2,
                  py: 1.1,
                  fontWeight: 500,
                  color: 'text.primary',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
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

            <Box component="form" noValidate sx={{ width: '100%' }} onSubmit={(e) => e.preventDefault()}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                size="small"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                size="small"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 0.5, mb: 1 }}>
                <Typography variant="caption" sx={{ color: scheme.primary, cursor: 'pointer', fontWeight: 500 }}>
                  Forgot password?
                </Typography>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.25,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.9rem',
                  boxShadow: `0 4px 14px ${scheme.primary}33`,
                  '&:hover': { boxShadow: `0 6px 20px ${scheme.primary}44` },
                }}
              >
                Sign In
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 3, textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Typography component="span" variant="body2" sx={{ color: scheme.primary, fontWeight: 600, cursor: 'pointer' }}>
                Get started
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
