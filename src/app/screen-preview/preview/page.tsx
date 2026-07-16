'use client';

import { useState, useEffect, useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import ScreenRenderer from '@/components/screen-preview/ScreenRenderer';
import type { ScreenType } from '@/lib/screen-templates';
import type { PreviewTokens } from '@/lib/token-utils';

export default function ScreenPreviewFrame() {
  const [screenType, setScreenType] = useState<ScreenType>('finance');
  const [tokens, setTokens] = useState<PreviewTokens | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMessage = useCallback((e: MessageEvent) => {
    if (e.data?.type === 'UPDATE_PREVIEW') {
      const { screenType: st, tokens: t } = e.data.payload;
      if (st) setScreenType(st);
      if (t) setTokens(t);
      setError(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    // Signal ready to parent
    window.parent.postMessage({ type: 'IFRAME_READY' }, '*');
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fafafa' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ color: '#B3261E', fontWeight: 600, mb: 1 }}>Preview Unavailable</Typography>
          <Typography variant="body2" sx={{ color: '#666' }}>{error}</Typography>
        </Box>
      </Box>
    );
  }

  if (!tokens) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fafafa' }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  return <ScreenRenderer screenType={screenType} tokens={tokens} />;
}
