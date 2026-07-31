'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Box, Typography, Stack, IconButton, Tooltip, Chip, CircularProgress,
  Drawer, useMediaQuery, useTheme,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  DesktopWindows as DesktopIcon,
  Tablet as TabletIcon,
  PhoneIphone as MobileIcon,
  OpenInNew as OpenIcon,
  DarkMode, LightMode,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useThemeStore, useAppStore } from '@/store';
import { generateSchemeFromConfig, type ThemeConfig, type ColorScheme } from '@/theme/scheme';
import { generatePreviewTokens, getGradientContrastTextColor } from '@/lib/token-utils';
import { SCREENS, type ScreenType, type ScreenMeta } from '@/lib/screen-templates';

const VIEWPORTS = [
  { key: 'desktop', label: 'Desktop', icon: <DesktopIcon sx={{ fontSize: 18 }} />, width: '100%' },
  { key: 'tablet', label: 'Tablet', icon: <TabletIcon sx={{ fontSize: 18 }} />, width: 768 },
  { key: 'mobile', label: 'Mobile', icon: <MobileIcon sx={{ fontSize: 18 }} />, width: 375 },
] as const;

type ViewportKey = typeof VIEWPORTS[number]['key'];
const STORAGE_KEY = 'screen-preview-preferences';

function loadPreferences(): { screenType: ScreenType; viewport: ViewportKey } {
  if (typeof window === 'undefined') return { screenType: 'finance', viewport: 'desktop' };
  try { const r = localStorage.getItem(STORAGE_KEY); if (r) return JSON.parse(r); } catch { /* graceful fallback */ }
  return { screenType: 'finance', viewport: 'desktop' };
}

function savePreferences(s: ScreenType, v: ViewportKey) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ screenType: s, viewport: v })); } catch { /* graceful fallback */ }
}

function SidebarContent({
  config, toggleMode, activeViewport, handleSelectViewport, activeScreen, handleSelectScreen,
  activeVp, scheme, onClose,
}: {
  config: ThemeConfig; toggleMode: () => void; activeViewport: ViewportKey;
  handleSelectViewport: (v: ViewportKey) => void; activeScreen: ScreenType;
  handleSelectScreen: (s: ScreenType) => void; activeVp: typeof VIEWPORTS[number]; scheme: ColorScheme;
  activeMeta?: ScreenMeta; iframeReady: boolean; onClose?: () => void;
}) {
  return (
    <>
      <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
            <Tooltip title="Back to dashboard">
              <IconButton onClick={() => useAppStore.getState().setCurrentView('home')} size="small" sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                <BackIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 11 }}>Back to Dashboard</Typography>
          </Stack>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: 2,
              background: `linear-gradient(135deg, ${scheme.primary}, ${scheme.tertiary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 8px ${scheme.primary}33`, flexShrink: 0,
            }}>
              <Typography sx={{ color: getGradientContrastTextColor(scheme.primary, scheme.tertiary), fontWeight: 700, fontSize: 13 }}>O</Typography>
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, lineHeight: 1.2, fontSize: 13 }}>Screen Preview</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 10 }}>Live design system preview</Typography>
            </Box>
          </Stack>
        </Box>
        {onClose && (
          <IconButton onClick={onClose} size="small" aria-label="Close navigation drawer" sx={{ color: 'text.secondary' }}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>

      <Box sx={{ px: 2, py: 1.5, }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, fontSize: 10 }}>Theme</Typography>
          <Tooltip title={`Switch to ${config.mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton size="small" onClick={toggleMode} sx={{ width: 28, height: 28, '&:hover': { bgcolor: 'action.hover' } }}>
              {config.mode === 'light' ? <DarkMode sx={{ fontSize: 15, color: 'text.secondary' }} /> : <LightMode sx={{ fontSize: 15, color: 'text.secondary' }} />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>

      <Box sx={{ px: 2, py: 2, }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, fontSize: 10, display: 'block', mb: 1.25 }}>Viewport</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0.5 }}>
          {VIEWPORTS.map((vp) => {
            const isActive = activeViewport === vp.key;
            return (
              <Box
                key={vp.key}
                onClick={() => handleSelectViewport(vp.key)}
                sx={{
                  py: 1.25, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5,
                  borderRadius: 1.5, cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                  bgcolor: isActive ? `${scheme.primary}0D` : 'transparent',
                  '&:hover': { bgcolor: isActive ? `${scheme.primary}14` : 'action.hover' },
                }}
              >
                <Box sx={{ color: isActive ? scheme.primary : 'text.secondary', transition: 'color 0.2s' }}>{vp.icon}</Box>
                <Typography variant="caption" sx={{ color: isActive ? scheme.primary : 'text.secondary', fontWeight: isActive ? 600 : 400, fontSize: 10, transition: 'color 0.2s' }}>{vp.label}</Typography>
              </Box>
            );
          })}
        </Box>
        {activeViewport !== 'desktop' && (
          <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1, textAlign: 'center', fontFamily: 'monospace', fontSize: 10 }}>{activeVp.width}px</Typography>
        )}
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto', px: 1.5, py: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, fontSize: 10, display: 'block', mb: 1, px: 0.5 }}>Screens</Typography>
        <Stack spacing={0.5}>
          {SCREENS.map((screen) => {
            const isActive = activeScreen === screen.type;
            return (
              <Box
                key={screen.type}
                onClick={() => handleSelectScreen(screen.type)}
                sx={{
                  px: 1.5, py: 1.25, borderRadius: 1.5, cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
                  bgcolor: isActive ? `${scheme.primary}0D` : 'transparent',
                  '&:hover': { bgcolor: isActive ? `${scheme.primary}14` : 'action.hover' },
                  position: 'relative',
                }}
              >
                {isActive && (
                  <Box sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', bgcolor: scheme.primary }} />
                )}
                <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
                  <Typography sx={{ fontSize: 18, lineHeight: 1 }}>{screen.icon}</Typography>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography variant="body2" sx={{ color: isActive ? 'text.primary' : 'text.secondary', fontWeight: isActive ? 600 : 400, fontSize: 12.5, lineHeight: 1.3, transition: 'color 0.15s' }}>{screen.label}</Typography>
                    <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: 10.5, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.4 }}>{screen.description}</Typography>
                  </Box>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>

      <Box sx={{ px: 2, py: 1.5, }}>
        <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: 10, lineHeight: 1.4 }}>Tokens sync live from the design system</Typography>
      </Box>
    </>
  );
}

export default function ScreenPreviewPage() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const config = useThemeStore((s) => s.config);
  const toggleMode = useThemeStore((s) => s.toggleMode);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [prefs, setPrefs] = useState(loadPreferences);
  const activeScreen = prefs.screenType;
  const activeViewport = prefs.viewport;
  const [iframeReady, setIframeReady] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [debouncedTokens, setDebouncedTokens] = useState(() => generatePreviewTokens(config));
  useEffect(() => {
    const t = setTimeout(() => setDebouncedTokens(generatePreviewTokens(config)), 300);
    return () => clearTimeout(t);
  }, [config]);

  const sendToIframe = useCallback((st: ScreenType, tk: ReturnType<typeof generatePreviewTokens>) => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'UPDATE_PREVIEW', payload: { screenType: st, tokens: tk } }, '*');
  }, []);

  useEffect(() => { if (iframeReady) sendToIframe(activeScreen, debouncedTokens); }, [debouncedTokens, activeScreen, iframeReady, sendToIframe]);

  useEffect(() => {
    const h = (e: MessageEvent) => { if (e.data?.type === 'IFRAME_READY') setIframeReady(true); };
    window.addEventListener('message', h);
    return () => window.removeEventListener('message', h);
  }, []);

  const handleSelectScreen = useCallback((type: ScreenType) => {
    setPrefs((p) => { const n = { ...p, screenType: type }; savePreferences(n.screenType, n.viewport); return n; });
    setDrawerOpen(false);
  }, []);

  const handleSelectViewport = useCallback((vp: ViewportKey) => {
    setPrefs((p) => { const n = { ...p, viewport: vp }; savePreferences(n.screenType, n.viewport); return n; });
  }, []);

  const activeVp = VIEWPORTS.find((v) => v.key === activeViewport)!;
  const iframeWidth = typeof activeVp.width === 'number' ? activeVp.width : '100%';
  const scheme = useMemo(() => generateSchemeFromConfig(config), [config]);
  const activeMeta = useMemo(() => SCREENS.find((s) => s.type === activeScreen), [activeScreen]);

  const sidebarProps = { config, toggleMode, activeViewport, handleSelectViewport, activeScreen, handleSelectScreen, activeVp, scheme, activeMeta, iframeReady };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Box sx={{
          width: 280, flexShrink: 0, position: 'sticky', top: 0,
          height: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper',
        }}>
          <SidebarContent {...sidebarProps} />
        </Box>
      )}

      {/* Mobile Drawer */}
      <Drawer
        open={isMobile && drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: '100%', maxWidth: '100vw', bgcolor: 'background.paper' } } }}
      >
        <SidebarContent {...sidebarProps} onClose={() => setDrawerOpen(false)} />
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Bar */}
        <Box sx={{
          px: { xs: 1.5, sm: 3 }, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'background.paper',
          position: 'sticky', top: 0, zIndex: 10,
        }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {isMobile && (
              <IconButton size="small" onClick={() => setDrawerOpen(true)} sx={{ mr: 0.5 }}>
                <MenuIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
            <Box sx={{
              width: 8, height: 8, borderRadius: '50%',
              bgcolor: iframeReady ? '#22c55e' : '#eab308',
              boxShadow: `0 0 6px ${iframeReady ? '#22c55e44' : '#eab30844'}`,
              transition: 'all 0.3s',
            }} />
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: 12, sm: 13 } }}>{activeMeta?.label}</Typography>
            <Chip label={activeVp.label} size="small" variant="outlined" sx={{ fontSize: 10, height: 20, fontWeight: 500, display: { xs: 'none', sm: 'flex' } }} />
            {activeViewport !== 'desktop' && (
              <Chip label={`${activeVp.width}px`} size="small" variant="outlined" sx={{ fontSize: 10, height: 20, fontFamily: 'monospace', display: { xs: 'none', sm: 'flex' } }} />
            )}
          </Stack>
          <Tooltip title="Open in new tab">
            <IconButton size="small" component="a" href="/screen-preview/preview" target="_blank"
              sx={{ width: 32, height: 32, borderRadius: 1.5, '&:hover': { bgcolor: 'action.hover' } }}>
              <OpenIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Mobile Viewport Selector */}
        {isMobile && (
          <Box sx={{ px: 1.5, py: 1, bgcolor: 'background.paper' }}>
            <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'center' }}>
              {VIEWPORTS.map((vp) => {
                const isActive = activeViewport === vp.key;
                return (
                  <Chip
                    key={vp.key}
                    icon={vp.icon}
                    label={vp.label}
                    size="small"
                    onClick={() => handleSelectViewport(vp.key)}
                    variant={isActive ? 'filled' : 'outlined'}
                    color={isActive ? 'primary' : 'default'}
                    sx={{ cursor: 'pointer', fontWeight: isActive ? 600 : 400 }}
                  />
                );
              })}
            </Stack>
          </Box>
        )}

        {/* Preview Canvas */}
        <Box sx={{
          flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
          p: { xs: 1, sm: 3 }, overflow: 'auto', bgcolor: 'background.default',
        }}>
          <Box sx={{
            width: isMobile ? '100%' : iframeWidth, maxWidth: '100%',
            height: { xs: 'calc(100vh - 120px)', sm: 'calc(100vh - 96px)' },
            borderRadius: { xs: 1.5, sm: 2.5 }, overflow: 'hidden',
            bgcolor: 'background.paper',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
            transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
            position: 'relative',
          }}>
            {/* Device Frame Chrome */}
            <Box sx={{
              height: { xs: 28, sm: 32 }, bgcolor: 'background.paper',
              display: 'flex', alignItems: 'center', px: 1.5, gap: 0.75,
            }}>
              <Box sx={{ width: { xs: 6, sm: 8 }, height: { xs: 6, sm: 8 }, borderRadius: '50%', bgcolor: '#ff5f57' }} />
              <Box sx={{ width: { xs: 6, sm: 8 }, height: { xs: 6, sm: 8 }, borderRadius: '50%', bgcolor: '#febc2e' }} />
              <Box sx={{ width: { xs: 6, sm: 8 }, height: { xs: 6, sm: 8 }, borderRadius: '50%', bgcolor: '#28c840' }} />
              <Box sx={{ flex: 1, mx: 2, py: 0.25, borderRadius: 1, bgcolor: 'action.hover', display: 'flex', justifyContent: 'center' }}>
                <Typography sx={{ color: 'text.disabled', fontSize: { xs: 8, sm: 9 }, fontFamily: 'monospace' }}>{activeScreen}.preview</Typography>
              </Box>
            </Box>

            {!iframeReady && (
              <Box sx={{
                position: 'absolute', inset: 0, top: { xs: 28, sm: 32 },
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                bgcolor: 'background.default', zIndex: 10, gap: 1.5,
              }}>
                <CircularProgress size={24} sx={{ color: scheme.primary }} />
                <Typography sx={{ color: 'text.disabled', fontSize: 11 }}>Loading preview...</Typography>
              </Box>
            )}

            <iframe
              ref={iframeRef}
              src="/screen-preview/preview"
              title="Screen Preview"
              style={{ width: '100%', height: 'calc(100% - 32px)', }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
