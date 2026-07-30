import { useState } from 'react';
import { Box, Container, Typography, Button, CssBaseline, Stack, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ColorScheme } from '@/theme/scheme';
import { useThemeStore } from '@/store';

export default function MarketingHeroTemplate({ scheme }: { scheme: ColorScheme }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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
      <Box sx={{ height: 640, bgcolor: 'background.default', display: 'flex', flexDirection: 'column', borderRadius: 4, overflow: 'hidden' }}>
        <CssBaseline />

        {/* Header */}
        <Box component="header" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: scheme.surfaceContainerLowest }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: scheme.primary }}>BrandName</Typography>

          {/* Desktop nav */}
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Button color="inherit" sx={{ fontWeight: 600 }} disableRipple>Features</Button>
            <Button color="inherit" sx={{ fontWeight: 600 }} disableRipple>Pricing</Button>
            <Button variant="contained" sx={{ fontWeight: 700, borderRadius: 20 }} disableRipple>Get Started</Button>
          </Stack>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: 'none', minWidth: 44, minHeight: 44 }}
            onClick={() => setMobileNavOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Mobile nav drawer */}
        <Drawer
          anchor="right"
          open={mobileNavOpen}
          onClose={() => setMobileNavOpen(false)}
          sx={{ '& .MuiDrawer-paper': { width: 260, bgcolor: scheme.surfaceContainerLowest } }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={() => setMobileNavOpen(false)} sx={{ minWidth: 44, minHeight: 44 }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {['Features', 'Pricing'].map((item) => (
              <ListItem key={item} onClick={() => setMobileNavOpen(false)} sx={{ cursor: 'pointer' }}>
                <ListItemText primary={item} sx={{ '& .MuiTypography-root': { fontWeight: 600 } }} />
              </ListItem>
            ))}
          </List>
          <Box sx={{ px: 2, pb: 2 }}>
            <Button variant="contained" fullWidth sx={{ fontWeight: 700, borderRadius: 20, py: 1.25 }} disableRipple>
              Get Started
            </Button>
          </Box>
        </Drawer>

        {/* Hero */}
        <Container maxWidth="lg" sx={{ my: 6, flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center', width: '100%' }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h2" sx={{ fontWeight: 900, color: 'text.primary', mb: 3, lineHeight: 1.2, fontSize: '2.5rem' }}>
                Build Something Amazing with Our Platform
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 5, lineHeight: 1.6, fontSize: '1.125rem' }}>
                The all-in-one solution that helps you scale your business, delight your customers, and dominate your market.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
                <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} sx={{ py: 2, px: 4, fontWeight: 700, borderRadius: 30 }} disableRipple>
                  Start Free Trial
                </Button>
                <Button variant="outlined" size="large" sx={{ py: 2, px: 4, fontWeight: 700, borderRadius: 30 }} disableRipple>
                  Watch Demo
                </Button>
              </Stack>
            </Box>
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 8,
                  overflow: 'hidden',
                  height: 340,
                  bgcolor: scheme.surfaceContainerHigh,
                }}
              >
                <Box sx={{ width: '100%', height: '100%', bgcolor: scheme.primaryContainer, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h3" sx={{ color: scheme.onPrimaryContainer, fontWeight: 800, fontSize: '2rem' }}>Dashboard Preview</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>

        <Box component="footer" sx={{ py: 3, bgcolor: scheme.surfaceContainerLowest, textAlign: 'center', color: 'text.secondary' }}>
          <Typography variant="body2">&copy; 2026 BrandName. All rights reserved.</Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
