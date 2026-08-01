'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import ScreenRenderer, { buildMuiTheme } from '@/components/screen-preview/ScreenRenderer';
import type { ScreenType } from '@/lib/screen-templates';
import { generatePreviewTokens, type PreviewTokens } from '@/lib/token-utils';
import { useThemeStore } from '@/store';

export default function ScreenPreviewIframePage() {
  const config = useThemeStore((s) => s.config);

  const initialTokens = useMemo(() => generatePreviewTokens(config), [config]);

  const [previewState, setPreviewState] = useState<{
    screenType: ScreenType;
    tokens: PreviewTokens;
  }>({
    screenType: 'finance',
    tokens: initialTokens,
  });

  useEffect(() => {
    // Notify parent window that iframe is ready to receive tokens
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'IFRAME_READY' }, '*');
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'UPDATE_PREVIEW' && event.data?.payload) {
        const { screenType, tokens } = event.data.payload;
        setPreviewState({
          screenType: screenType || 'finance',
          tokens: tokens || initialTokens,
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [initialTokens]);

  const theme = useMemo(() => {
    const themeObj = buildMuiTheme(previewState.tokens);
    return createTheme(themeObj);
  }, [previewState.tokens]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100%', height: '100vh', overflow: 'auto', bgcolor: 'background.default' }}>
        <ScreenRenderer screenType={previewState.screenType} tokens={previewState.tokens} />
      </Box>
    </ThemeProvider>
  );
}
