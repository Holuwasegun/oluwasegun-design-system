'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Box, Typography, Card, CardContent, CardActionArea, Stack, IconButton,
  Chip, Divider, Tooltip, CircularProgress,
} from '@mui/material';
import {
  DesktopWindows as DesktopIcon,
  Tablet as TabletIcon,
  PhoneIphone as MobileIcon,
  OpenInNew as OpenIcon,
  DarkMode, LightMode,
} from '@mui/icons-material';
import { useThemeStore } from '@/store';
import { generateSchemeFromConfig } from '@/theme/scheme';
import { generatePreviewTokens } from '@/lib/token-utils';
import { SCREENS, type ScreenType } from '@/lib/screen-templates';

const VIEWPORTS = [
  { key: 'desktop', label: 'Desktop', icon: <DesktopIcon />, width: '100%' },
  { key: 'tablet', label: 'Tablet', icon: <TabletIcon />, width: 768 },
  { key: 'mobile', label: 'Mobile', icon: <MobileIcon />, width: 375 },
] as const;

type ViewportKey = typeof VIEWPORTS[number]['key'];

const STORAGE_KEY = 'screen-preview-preferences';

function loadPreferences(): { screenType: ScreenType; viewport: ViewportKey } {
  if (typeof window === 'undefined') return { screenType: 'finance', viewport: 'desktop' };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { screenType: 'finance', viewport: 'desktop' };
}

function savePreferences(screenType: ScreenType, viewport: ViewportKey) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ screenType, viewport })); } catch { /* ignore */ }
}

export default function ScreenPreviewPage() {
  const config = useThemeStore((s) => s.config);
  const toggleMode = useThemeStore((s) => s.toggleMode);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [prefs, setPrefs] = useState(loadPreferences);
  const activeScreen = prefs.screenType;
  const activeViewport = prefs.viewport;
  const [iframeReady, setIframeReady] = useState(false);

  const [debouncedTokens, setDebouncedTokens] = useState(() => generatePreviewTokens(config));
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTokens(generatePreviewTokens(config));
    }, 300);
    return () => clearTimeout(timer);
  }, [config]);

  const sendToIframe = useCallback((screenType: ScreenType, tokens: ReturnType<typeof generatePreviewTokens>) => {
    if (!iframeRef.current?.contentWindow) return;
    iframeRef.current.contentWindow.postMessage(
      { type: 'UPDATE_PREVIEW', payload: { screenType, tokens } },
      '*'
    );
  }, []);

  useEffect(() => {
    if (iframeReady) sendToIframe(activeScreen, debouncedTokens);
  }, [debouncedTokens, activeScreen, iframeReady, sendToIframe]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'IFRAME_READY') setIframeReady(true);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const handleSelectScreen = useCallback((type: ScreenType) => {
    setPrefs((p) => {
      const next = { ...p, screenType: type };
      savePreferences(next.screenType, next.viewport);
      return next;
    });
  }, []);

  const handleSelectViewport = useCallback((vp: ViewportKey) => {
    setPrefs((p) => {
      const next = { ...p, viewport: vp };
      savePreferences(next.screenType, next.viewport);
      return next;
    });
  }, []);

  const activeVp = VIEWPORTS.find((v) => v.key === activeViewport)!;
  const iframeWidth = typeof activeVp.width === 'number' ? activeVp.width : '100%';
  const scheme = useMemo(() => generateSchemeFromConfig(config), [config]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: '#0f0f13' }}>
      {/* Sidebar */}
      <Box sx={{
        width: 300, flexShrink: 0, bgcolor: '#1a1a24', borderRight: '1px solid #2a2a3a',
        display: 'flex', flexDirection: 'column', overflow: 'auto',
      }}>
        {/* Logo */}
        <Box sx={{ p: 2.5, borderBottom: '1px solid #2a2a3a' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box sx={{
              width: 32, height: 32, borderRadius: 1.5,
              background: `linear-gradient(135deg, ${scheme.primary}, ${scheme.tertiary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 12 }}>O</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600, lineHeight: 1.2 }}>Screen Preview</Typography>
              <Typography variant="caption" sx={{ color: '#888', fontSize: 11 }}>Design System Preview</Typography>
            </Box>
          </Stack>
        </Box>

        {/* Theme toggle */}
        <Box sx={{ px: 2.5, py: 1.5, borderBottom: '1px solid #2a2a3a' }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="caption" sx={{ color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Theme</Typography>
            <Tooltip title={`Switch to ${config.mode === 'light' ? 'dark' : 'light'} mode`}>
              <IconButton size="small" onClick={toggleMode} sx={{ color: '#aaa' }}>
                {config.mode === 'light' ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
              </IconButton>
            </Tooltip>
          </Stack>
          <Chip
            label={config.mode === 'light' ? 'Light Mode' : 'Dark Mode'}
            size="small"
            sx={{
              mt: 0.5, bgcolor: config.mode === 'light' ? '#2a2a3a' : '#333355',
              color: '#ddd', fontWeight: 500, fontSize: 11,
            }}
          />
        </Box>

        {/* Viewport Controls */}
        <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid #2a2a3a' }}>
          <Typography variant="caption" sx={{ color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'block', mb: 1.5 }}>
            Viewport
          </Typography>
          <Stack direction="row" spacing={0.75}>
            {VIEWPORTS.map((vp) => (
              <Tooltip key={vp.key} title={vp.label}>
                <Box
                  onClick={() => handleSelectViewport(vp.key)}
                  sx={{
                    flex: 1, py: 1.25, display: 'flex', flexDirection: 'column', gap: 0.5,
                    borderRadius: 1.5, cursor: 'pointer', transition: 'all 0.15s',
                    alignItems: 'center',
                    bgcolor: activeViewport === vp.key ? `${scheme.primary}30` : '#2a2a3a',
                    border: `1.5px solid ${activeViewport === vp.key ? scheme.primary : 'transparent'}`,
                    '&:hover': { bgcolor: activeViewport === vp.key ? `${scheme.primary}40` : '#333344' },
                  }}
                >
                  <Box sx={{ color: activeViewport === vp.key ? scheme.primary : '#888', display: 'flex' }}>
                    {vp.icon}
                  </Box>
                  <Typography variant="caption" sx={{
                    color: activeViewport === vp.key ? scheme.primary : '#888',
                    fontWeight: activeViewport === vp.key ? 600 : 400, fontSize: 10,
                  }}>
                    {vp.label}
                  </Typography>
                </Box>
              </Tooltip>
            ))}
          </Stack>
          {activeViewport !== 'desktop' && (
            <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 1, textAlign: 'center' }}>
              {activeVp.width}px wide
            </Typography>
          )}
        </Box>

        {/* Screen Categories */}
        <Box sx={{ px: 2.5, py: 2, flex: 1, overflow: 'auto' }}>
          <Typography variant="caption" sx={{ color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'block', mb: 1.5 }}>
            Screen Type
          </Typography>
          <Stack spacing={1}>
            {SCREENS.map((screen) => {
              const isActive = activeScreen === screen.type;
              return (
                <Card
                  key={screen.type}
                  sx={{
                    bgcolor: isActive ? `${scheme.primary}20` : '#1e1e2e',
                    border: `1.5px solid ${isActive ? scheme.primary : '#2a2a3a'}`,
                    borderRadius: 2,
                    transition: 'all 0.15s',
                    '&:hover': { borderColor: isActive ? scheme.primary : '#444' },
                  }}
                >
                  <CardActionArea onClick={() => handleSelectScreen(screen.type)} sx={{ p: 1.5 }}>
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                      <Box sx={{ fontSize: 24 }}>{screen.icon}</Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" sx={{ color: isActive ? '#fff' : '#ccc', fontWeight: isActive ? 600 : 400, fontSize: 13 }}>
                          {screen.label}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#777', fontSize: 11, display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {screen.description}
                        </Typography>
                      </Box>
                      {isActive && (
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: scheme.primary, flexShrink: 0 }} />
                      )}
                    </Stack>
                  </CardActionArea>
                </Card>
              );
            })}
          </Stack>
        </Box>

        {/* Footer */}
        <Box sx={{ px: 2.5, py: 1.5, borderTop: '1px solid #2a2a3a' }}>
          <Typography variant="caption" sx={{ color: '#555', fontSize: 10 }}>
            Tokens update live as you edit in the design system
          </Typography>
        </Box>
      </Box>

      {/* Preview Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <Box sx={{ px: 3, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #2a2a3a', bgcolor: '#1a1a24' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
              {SCREENS.find((s) => s.type === activeScreen)?.label}
            </Typography>
            <Chip label={activeVp.label} size="small" sx={{ bgcolor: '#2a2a3a', color: '#aaa', fontSize: 10, height: 20 }} />
            {activeViewport !== 'desktop' && (
              <Chip label={`${activeVp.width}px`} size="small" sx={{ bgcolor: '#2a2a3a', color: '#888', fontSize: 10, height: 20, fontFamily: 'monospace' }} />
            )}
          </Stack>
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Open in new tab">
              <IconButton
                size="small"
                component="a"
                href="/screen-preview/preview"
                target="_blank"
                sx={{ color: '#888' }}
              >
                <OpenIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Iframe container */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', p: 2, overflow: 'auto', bgcolor: '#0f0f13' }}>
          <Box sx={{
            width: iframeWidth,
            maxWidth: '100%',
            height: 'calc(100vh - 100px)',
            border: '1px solid #2a2a3a',
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: '#fff',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            transition: 'width 0.3s ease',
            position: 'relative',
          }}>
            {!iframeReady && (
              <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fafafa', zIndex: 10 }}>
                <CircularProgress size={28} />
              </Box>
            )}
            <iframe
              ref={iframeRef}
              src="/screen-preview/preview"
              title="Screen Preview"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
