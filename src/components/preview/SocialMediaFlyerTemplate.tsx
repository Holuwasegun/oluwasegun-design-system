import { Box, Typography, Avatar, Stack, IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ColorScheme } from '@/theme/scheme';
import { useThemeStore } from '@/store';

export default function SocialMediaFlyerTemplate({ scheme }: { scheme: ColorScheme }) {
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
      <Box sx={{ height: 640, bgcolor: scheme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, borderRadius: 4, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', gap: 4 }}>

          {/* Flyer 1 — Gradient Hero Post */}
          <Box
            sx={{
              width: 340,
              borderRadius: 6,
              overflow: 'hidden',
              bgcolor: scheme.surfaceContainerLowest,
            }}
          >
            <Box
              sx={{
                height: 340,
                background: `linear-gradient(135deg, ${scheme.primary}, ${scheme.tertiary})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                textAlign: 'center',
              }}
            >
              <Typography variant="overline" sx={{ color: scheme.onPrimary, letterSpacing: 4, fontWeight: 600, opacity: 0.8 }}>
                Limited Offer
              </Typography>
              <Typography variant="h2" sx={{ color: scheme.onPrimary, fontWeight: 900, lineHeight: 1.1, my: 2, fontSize: '2.25rem' }}>
                50% Off Everything
              </Typography>
              <Typography variant="body1" sx={{ color: scheme.onPrimary, opacity: 0.85, mb: 3 }}>
                Use code DESIGN50 at checkout
              </Typography>
              <Box
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 30,
                  bgcolor: scheme.onPrimary,
                  color: scheme.primary,
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}
              >
                Shop Now
              </Box>
            </Box>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: scheme.primary, color: scheme.onPrimary, fontSize: '0.8rem' }}>OA</Avatar>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>designsystem.co</Typography>
              </Stack>
              <Stack direction="row" spacing={0}>
                <IconButton size="small" disableRipple><FavoriteBorderIcon sx={{ fontSize: 20 }} /></IconButton>
                <IconButton size="small" disableRipple><ChatBubbleOutlineIcon sx={{ fontSize: 20 }} /></IconButton>
                <IconButton size="small" disableRipple><ShareIcon sx={{ fontSize: 20 }} /></IconButton>
              </Stack>
            </Box>
          </Box>

          {/* Flyer 2 — Quote / Testimonial Post */}
          <Box
            sx={{
              width: 340,
              borderRadius: 6,
              overflow: 'hidden',
              bgcolor: scheme.surfaceContainerLowest,
            }}
          >
            <Box
              sx={{
                height: 340,
                bgcolor: scheme.secondaryContainer,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: 5,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: '3rem',
                  lineHeight: 1,
                  color: scheme.onSecondaryContainer,
                  opacity: 0.2,
                  fontWeight: 900,
                  mb: -1,
                }}
              >
                &ldquo;
              </Typography>
              <Typography variant="h5" sx={{ color: scheme.onSecondaryContainer, fontWeight: 600, lineHeight: 1.5, mb: 3 }}>
                This design system saved us hundreds of hours. The tokens make theming effortless.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Avatar sx={{ width: 40, height: 40, bgcolor: scheme.secondary, color: scheme.onSecondary }}>OA</Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: scheme.onSecondaryContainer }}>Oluwasegun Awodeyi</Typography>
                  <Typography variant="caption" sx={{ color: scheme.onSecondaryContainer, opacity: 0.7 }}>Head of Design, Acme Inc</Typography>
                </Box>
              </Stack>
            </Box>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: scheme.secondary, color: scheme.onSecondary, fontSize: '0.8rem' }}>OA</Avatar>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>designsystem.co</Typography>
              </Stack>
              <Stack direction="row" spacing={0}>
                <IconButton size="small" disableRipple><FavoriteBorderIcon sx={{ fontSize: 20 }} /></IconButton>
                <IconButton size="small" disableRipple><BookmarkBorderIcon sx={{ fontSize: 20 }} /></IconButton>
                <IconButton size="small" disableRipple><ShareIcon sx={{ fontSize: 20 }} /></IconButton>
              </Stack>
            </Box>
          </Box>

          {/* Flyer 3 — Feature Announcement */}
          <Box
            sx={{
              width: 340,
              borderRadius: 6,
              overflow: 'hidden',
              bgcolor: scheme.surfaceContainerLowest,
            }}
          >
            <Box
              sx={{
                height: 340,
                bgcolor: scheme.tertiaryContainer,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '20px',
                  bgcolor: scheme.tertiary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <Typography sx={{ color: scheme.onTertiary, fontSize: '1.8rem' }}>✦</Typography>
              </Box>
              <Typography variant="overline" sx={{ color: scheme.onTertiaryContainer, letterSpacing: 3, fontWeight: 600 }}>
                New Feature
              </Typography>
              <Typography variant="h4" sx={{ color: scheme.onTertiaryContainer, fontWeight: 800, my: 1.5, fontSize: '1.5rem' }}>
                Dark Mode Support
              </Typography>
              <Typography variant="body2" sx={{ color: scheme.onTertiaryContainer, opacity: 0.75, maxWidth: 260 }}>
                Automatically adapt your designs to light and dark themes with one-click toggling.
              </Typography>
            </Box>
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: scheme.tertiary, color: scheme.onTertiary, fontSize: '0.8rem' }}>OA</Avatar>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>designsystem.co</Typography>
              </Stack>
              <Stack direction="row" spacing={0}>
                <IconButton size="small" disableRipple><FavoriteBorderIcon sx={{ fontSize: 20 }} /></IconButton>
                <IconButton size="small" disableRipple><ChatBubbleOutlineIcon sx={{ fontSize: 20 }} /></IconButton>
                <IconButton size="small" disableRipple><BookmarkBorderIcon sx={{ fontSize: 20 }} /></IconButton>
              </Stack>
            </Box>
          </Box>

        </Box>
      </Box>
    </ThemeProvider>
  );
}
