'use client';

import React, { useState, useCallback } from 'react';
import { Box, Typography, Stack, IconButton, Tooltip, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useThemeStore } from '@/store';
import { generateSchemeFromConfig } from '@/theme/scheme';
import { copyToClipboard } from '@/lib/brand-gallery-utils';

const COLOR_GROUPS = [
  {
    label: 'Brand Colors',
    description: 'Primary palette used across all brand touchpoints',
    keys: ['primary', 'onPrimary', 'primaryContainer', 'onPrimaryContainer'] as const,
  },
  {
    label: 'Secondary Colors',
    description: 'Supporting palette for complementary elements',
    keys: ['secondary', 'onSecondary', 'secondaryContainer', 'onSecondaryContainer'] as const,
  },
  {
    label: 'Tertiary Colors',
    description: 'Accent palette for emphasis and differentiation',
    keys: ['tertiary', 'onTertiary', 'tertiaryContainer', 'onTertiaryContainer'] as const,
  },
  {
    label: 'Error & Status',
    description: 'Semantic colors for feedback and validation',
    keys: ['error', 'onError', 'errorContainer', 'onErrorContainer'] as const,
  },
  {
    label: 'Surface & Background',
    description: 'Neutral surfaces for content hierarchy',
    keys: ['background', 'onBackground', 'surface', 'onSurface', 'surfaceVariant', 'onSurfaceVariant'] as const,
  },
  {
    label: 'Surface Containers',
    description: 'Layered surface tones for depth and elevation',
    keys: ['surfaceContainerLowest', 'surfaceContainerLow', 'surfaceContainer', 'surfaceContainerHigh', 'surfaceContainerHighest', 'surfaceDim', 'surfaceBright'] as const,
  },
  {
    label: 'Outline & Inverse',
    description: 'Borders, dividers, and inverted color tokens',
    keys: ['outline', 'outlineVariant', 'inverseSurface', 'inverseOnSurface', 'inversePrimary'] as const,
  },
];

function ColorCard({ name, value }: { name: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const [snack, setSnack] = useState(false);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setSnack(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [value]);

  const isLight = (() => {
    const hex = value.replace('#', '');
    if (hex.length < 6) return true;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 128;
  })();

  return (
    <>
      <Box
        onClick={handleCopy}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 },
        }}
      >
        <Box sx={{ height: 120, bgcolor: value, position: 'relative' }}>
          <Tooltip title={copied ? 'Copied!' : 'Click to copy'}>
            <IconButton
              size="small"
              sx={{
                position: 'absolute', top: 8, right: 8,
                bgcolor: isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)',
                color: isLight ? '#000' : '#fff',
                '&:hover': { bgcolor: isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.25)' },
              }}
            >
              <ContentCopyIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ p: 1.5 }}>
          <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', lineHeight: 1.2, fontSize: '0.7rem' }}>
            {name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.65rem' }}>
            {value.toUpperCase()}
          </Typography>
        </Box>
      </Box>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
          Copied {value.toUpperCase()}
        </Alert>
      </Snackbar>
    </>
  );
}

const MemoizedColorCard = React.memo(ColorCard);

export default function ColorPaletteSection() {
  const config = useThemeStore((s) => s.config);
  const scheme = generateSchemeFromConfig(config);

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Color Palette</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
        Click any swatch to copy its HEX value. Colors update live with your design system.
      </Typography>

      {COLOR_GROUPS.map((group) => (
        <Box key={group.label} sx={{ mb: 5 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>{group.label}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{group.description}</Typography>
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
            {group.keys.map((key) => (
              <Box key={key} sx={{ width: { xs: 'calc(50% - 8px)', sm: 'calc(33.333% - 11px)', md: 'calc(25% - 12px)' } }}>
                <MemoizedColorCard name={key} value={scheme[key]} />
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
}
