'use client';

import React, { useState, useCallback } from 'react';
import {
  Box, Typography, Stack, IconButton, Tooltip, Snackbar, Alert, Chip, Divider,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useThemeStore } from '@/store';
import { generateSchemeFromConfig } from '@/theme/scheme';
import { copyToClipboard } from '@/lib/brand-gallery-utils';

const COLOR_GROUPS = [
  {
    label: 'Brand Colors',
    description: 'Primary palette used across all brand touchpoints',
    guidance: 'Use for main actions, headlines, and key brand moments',
    keys: ['primary', 'onPrimary', 'primaryContainer', 'onPrimaryContainer'] as const,
  },
  {
    label: 'Secondary Colors',
    description: 'Supporting palette for complementary elements',
    guidance: 'Use for supporting actions, subtle highlights, and secondary UI elements',
    keys: ['secondary', 'onSecondary', 'secondaryContainer', 'onSecondaryContainer'] as const,
  },
  {
    label: 'Tertiary Colors',
    description: 'Accent palette for emphasis and differentiation',
    guidance: 'Use for accent elements, badges, and distinctive brand touches',
    keys: ['tertiary', 'onTertiary', 'tertiaryContainer', 'onTertiaryContainer'] as const,
  },
  {
    label: 'Error & Status',
    description: 'Semantic colors for feedback and validation',
    guidance: 'Use for error states, validation messages, and destructive actions',
    keys: ['error', 'onError', 'errorContainer', 'onErrorContainer'] as const,
  },
  {
    label: 'Surface & Background',
    description: 'Neutral surfaces for content hierarchy',
    guidance: 'Use for page backgrounds, containers, and card surfaces',
    keys: ['background', 'onBackground', 'surface', 'onSurface', 'surfaceVariant', 'onSurfaceVariant'] as const,
  },
  {
    label: 'Surface Containers',
    description: 'Layered surface tones for depth and elevation',
    guidance: 'Use for nested surfaces, modals, drawers, and content panels',
    keys: ['surfaceContainerLowest', 'surfaceContainerLow', 'surfaceContainer', 'surfaceContainerHigh', 'surfaceContainerHighest', 'surfaceDim', 'surfaceBright'] as const,
  },
  {
    label: 'Outline & Inverse',
    description: 'Borders, dividers, and inverted color tokens',
    guidance: 'Use for borders, dividers, and elements on dark backgrounds',
    keys: ['outline', 'outlineVariant', 'inverseSurface', 'inverseOnSurface', 'inversePrimary'] as const,
  },
];

const SUGGESTED_PALETTES = [
  {
    name: 'Hero Palette',
    description: 'Vibrant combination for hero sections and key marketing moments',
    colors: ['primary', 'primaryContainer', 'tertiary', 'onPrimary', 'onPrimaryContainer'] as const,
  },
  {
    name: 'Data Palette',
    description: 'Distinguishable colors for charts, graphs, and data visualization',
    colors: ['primary', 'secondary', 'tertiary', 'error', 'outline'] as const,
  },
  {
    name: 'Alert Palette',
    description: 'Clear combination for success, warning, and error states',
    colors: ['primary', 'tertiary', 'error', 'primaryContainer', 'errorContainer'] as const,
  },
];

const TEXT_COLORS = ['primary', 'secondary', 'onSurface', 'onBackground'];

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length < 6) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 0;
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function ContrastBadge({ foreground, background }: { foreground: string; background: string }) {
  const ratio = getContrastRatio(foreground, background);
  const passesAA = ratio >= 4.5;
  const passesAALarge = ratio >= 3;
  const passesAAA = ratio >= 7;

  return (
    <Tooltip
      title={
        <Box sx={{ p: 0.25 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 600, mb: 0.5 }}>Contrast: {ratio.toFixed(2)}:1</Typography>
          <Stack spacing={0.25}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              {passesAA ? <CheckCircleIcon sx={{ fontSize: 10, color: 'success.main' }} /> : <CancelIcon sx={{ fontSize: 10, color: 'error.main' }} />}
              <Typography sx={{ fontSize: 10 }}>WCAG AA Normal Text ({passesAA ? 'Pass' : 'Fail'})</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              {passesAALarge ? <CheckCircleIcon sx={{ fontSize: 10, color: 'success.main' }} /> : <CancelIcon sx={{ fontSize: 10, color: 'error.main' }} />}
              <Typography sx={{ fontSize: 10 }}>WCAG AA Large Text ({passesAALarge ? 'Pass' : 'Fail'})</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              {passesAAA ? <CheckCircleIcon sx={{ fontSize: 10, color: 'success.main' }} /> : <CancelIcon sx={{ fontSize: 10, color: 'error.main' }} />}
              <Typography sx={{ fontSize: 10 }}>WCAG AAA ({passesAAA ? 'Pass' : 'Fail'})</Typography>
            </Stack>
          </Stack>
        </Box>
      }
      arrow
      placement="top"
    >
      <Chip
        icon={passesAA ? <CheckCircleIcon sx={{ fontSize: 10 }} /> : <CancelIcon sx={{ fontSize: 10 }} />}
        label={passesAA ? `${ratio.toFixed(1)}:1 AA` : `${ratio.toFixed(1)}:1`}
        size="small"
        color={passesAA ? 'success' : 'error'}
        variant="outlined"
        sx={{ fontSize: 9, height: 18, fontWeight: 600, cursor: 'help' }}
      />
    </Tooltip>
  );
}

function ColorCard({ name, value, showContrast, contrastBg }: {
  name: string; value: string; showContrast?: boolean; contrastBg?: string;
}) {
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
    const rgb = hexToRgb(value);
    if (!rgb) return true;
    return getLuminance(rgb.r, rgb.g, rgb.b) > 0.5;
  })();

  return (
    <>
      <Box
        onClick={handleCopy}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          cursor: 'pointer',
          '&:hover': { transform: 'translateY(-2px)' },
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
          <Typography variant="caption" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.65rem', display: 'block', mb: 0.5 }}>
            {value.toUpperCase()}
          </Typography>
          {showContrast && contrastBg && (
            <ContrastBadge foreground={value} background={contrastBg} />
          )}
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

function PaletteRow({ palette, scheme }: { palette: typeof SUGGESTED_PALETTES[number]; scheme: Record<string, string> }) {
  const [copiedAll, setCopiedAll] = useState(false);
  const [snack, setSnack] = useState(false);

  const handleCopyAll = useCallback(async () => {
    const css = palette.colors.map((c) => `${c}: ${scheme[c]}`).join('\n');
    const ok = await copyToClipboard(css);
    if (ok) {
      setCopiedAll(true);
      setSnack(true);
      setTimeout(() => setCopiedAll(false), 1500);
    }
  }, [palette, scheme]);

  return (
    <>
      <Box sx={{
        p: { xs: 1.5, sm: 2 },
        borderRadius: 2,
        transition: 'all 0.2s',
      }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: 13 }}>{palette.name}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 11 }}>{palette.description}</Typography>
          </Box>
          <Tooltip title={copiedAll ? 'Copied!' : 'Copy all colors'}>
            <IconButton size="small" onClick={handleCopyAll} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
              <ContentCopyIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack direction="row" spacing={0.75} sx={{ flexWrap: 'wrap', gap: 0.75 }}>
          {palette.colors.map((colorKey) => {
            const hex = scheme[colorKey];
            return (
              <Tooltip key={colorKey} title={`${colorKey}: ${hex}`} arrow>
                <Box sx={{
                  width: { xs: 40, sm: 48 },
                  height: { xs: 40, sm: 48 },
                  borderRadius: 1.5,
                  bgcolor: hex,
                  cursor: 'pointer',
                  transition: 'transform 0.15s',
                  '&:hover': { transform: 'scale(1.1)' },
                }} />
              </Tooltip>
            );
          })}
        </Stack>
      </Box>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>Palette copied</Alert>
      </Snackbar>
    </>
  );
}

const MemoizedPaletteRow = React.memo(PaletteRow);

export default function ColorPaletteSection() {
  const config = useThemeStore((s) => s.config);
  const scheme = generateSchemeFromConfig(config) as unknown as Record<string, string>;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Color Palette
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>
        Click any swatch to copy its HEX value. Colors update live with your design system.
      </Typography>

      {/* Color groups */}
      {COLOR_GROUPS.map((group) => (
        <Box key={group.label} sx={{ mb: { xs: 4, md: 5 } }}>
          <Stack sx={{ mb: 0.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.125rem' } }}>
              {group.label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>
              {group.description}
            </Typography>
          </Stack>
          <Chip
            label={group.guidance}
            size="small"
            sx={{
              mb: 2,
              fontSize: 10,
              height: 20,
              bgcolor: 'action.hover',
              color: 'text.secondary',
              fontWeight: 500,
              '& .MuiChip-label': { px: 1 },
            }}
          />
          <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
            {group.keys.map((key) => {
              const isText = TEXT_COLORS.includes(key);
              return (
                <Box key={key} sx={{ width: { xs: 'calc(50% - 8px)', sm: 'calc(33.333% - 11px)', md: 'calc(25% - 12px)' } }}>
                  <MemoizedColorCard
                    name={key}
                    value={scheme[key]}
                    showContrast={isText}
                    contrastBg={isText ? scheme.surface : undefined}
                  />
                </Box>
              );
            })}
          </Stack>
        </Box>
      ))}

      {/* Divider */}
      <Divider sx={{ my: { xs: 4, md: 5 } }} />

      {/* Suggested Palettes */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, fontSize: { xs: '1rem', sm: '1.125rem' } }}>
          Suggested Palettes
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontSize: { xs: '0.8125rem', md: '0.875rem' } }}>
          Curated color combinations for common design tasks
        </Typography>
        <Stack spacing={2}>
          {SUGGESTED_PALETTES.map((palette) => (
            <MemoizedPaletteRow key={palette.name} palette={palette} scheme={scheme} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
