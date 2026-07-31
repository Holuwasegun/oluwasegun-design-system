'use client';

import React, { useState, useCallback } from 'react';
import { Box, Typography, Stack, Snackbar, Alert, Divider } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useThemeStore } from '@/store';
import { generateSpacingScale } from '@/theme/scheme';
import { copyToClipboard } from '@/lib/brand-gallery-utils';

// ---------- Spacing Section ----------
function SpacingBar({ label, px, index }: { label: string; px: number; index: number }) {
  const [, setCopied] = useState(false);
  const [snack, setSnack] = useState(false);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(`--spacing-${label}: ${px}px`);
    if (ok) {
      setCopied(true);
      setSnack(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [label, px]);

  const maxPx = 128;
  const widthPercent = Math.min((px / maxPx) * 100, 100);

  return (
    <>
      <Box
        onClick={handleCopy}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          py: 1,
          cursor: 'pointer',
          borderRadius: 1,
          transition: 'all 0.15s',
          '&:hover': { bgcolor: 'action.hover' },
          '&:hover .copy-hint': { opacity: 1 },
        }}
      >
        <Typography variant="caption" sx={{ width: 40, fontFamily: 'monospace', color: 'text.secondary', textAlign: 'right', flexShrink: 0 }}>
          {label}
        </Typography>
        <Box sx={{ flex: 1, position: 'relative', height: 28 }}>
          <Box
            sx={{
              height: '100%',
              width: `${widthPercent}%`,
              bgcolor: index % 2 === 0 ? 'primary.main' : 'primary.light',
              borderRadius: 1,
              transition: 'width 0.3s ease',
              opacity: 0.85,
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ width: 50, fontFamily: 'monospace', color: 'text.secondary', flexShrink: 0 }}>
          {px}px
        </Typography>
        <ContentCopyIcon className="copy-hint" sx={{ fontSize: 12, color: 'text.disabled', opacity: 0, transition: 'opacity 0.2s', flexShrink: 0 }} />
      </Box>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>Copied spacing token</Alert>
      </Snackbar>
    </>
  );
}

// ---------- Elevation Card ----------
function ElevationCard({ level, shadow }: { level: number; shadow: string }) {
  const [, setCopied] = useState(false);
  const [snack, setSnack] = useState(false);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(`box-shadow: ${shadow}`);
    if (ok) {
      setCopied(true);
      setSnack(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [shadow]);

  return (
    <>
      <Box
        onClick={handleCopy}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: 'background.paper',
          boxShadow: shadow,
          cursor: 'pointer',
          transition: 'all 0.2s',
          textAlign: 'center',
          '&:hover': { transform: 'translateY(-2px)' },
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>E{level}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>Level {level}</Typography>
        <Divider sx={{ my: 1.5 }} />
        <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'text.disabled', wordBreak: 'break-all' }}>
          {shadow}
        </Typography>
      </Box>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>Copied shadow token</Alert>
      </Snackbar>
    </>
  );
}

// ---------- MD3 Elevation Tokens ----------
const MD3_ELEVATIONS = [
  { level: 0, shadow: 'none' },
  { level: 1, shadow: '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)' },
  { level: 2, shadow: '0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)' },
  { level: 3, shadow: '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)' },
  { level: 4, shadow: '0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3)' },
  { level: 5, shadow: '0 8px 12px 6px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.3)' },
];

// ---------- Radius Section ----------
function RadiusCard({ name, value }: { name: string; value: number }) {
  const [, setCopied] = useState(false);
  const [snack, setSnack] = useState(false);

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(`border-radius: ${value}px`);
    if (ok) {
      setCopied(true);
      setSnack(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }, [value]);

  return (
    <>
      <Box
        onClick={handleCopy}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          transition: 'all 0.15s',
          '&:hover': { transform: 'translateY(-2px)' },
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'primary.main',
            borderRadius: value,
            opacity: 0.8,
            transition: 'border-radius 0.3s',
          }}
        />
        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.7rem' }}>{name}</Typography>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '0.65rem' }}>{value}px</Typography>
      </Box>
      <Snackbar open={snack} autoHideDuration={1500} onClose={() => setSnack(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>Copied radius token</Alert>
      </Snackbar>
    </>
  );
}

const MD3_SHAPE = [
  { name: 'None', value: 0 },
  { name: 'Extra Small', value: 4 },
  { name: 'Small', value: 8 },
  { name: 'Medium', value: 12 },
  { name: 'Large', value: 16 },
  { name: 'Extra Large', value: 28 },
  { name: 'Full', value: 9999 },
];

// ---------- Main Section ----------
export default function SpacingElevationSection() {
  const config = useThemeStore((s) => s.config);
  const spacingScale = generateSpacingScale(config.spacing.baseUnit);

  return (
    <Box>
      {/* Spacing */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Spacing Scale</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
        Base unit: {config.spacing.baseUnit}px. Click any bar to copy the CSS token.
      </Typography>
      <Box sx={{ mb: 6 }}>
        {spacingScale.map((sp, i) => (
          <SpacingBar key={sp.label} label={sp.label} px={sp.px} index={i} />
        ))}
      </Box>

      {/* Elevation */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Elevation System</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
        Material Design 3 shadow tokens. Click any card to copy the box-shadow CSS.
      </Typography>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 3, mb: 6 }}>
        {MD3_ELEVATIONS.map((e) => (
          <Box key={e.level} sx={{ width: { xs: 'calc(50% - 12px)', sm: 'calc(33.333% - 16px)', md: '160px' } }}>
            <ElevationCard level={e.level} shadow={e.shadow} />
          </Box>
        ))}
      </Stack>

      {/* Border Radius */}
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Border Radius</Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
        MD3 shape scale. Click any shape to copy the CSS border-radius.
      </Typography>
      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
        {MD3_SHAPE.map((shape) => (
          <RadiusCard key={shape.name} name={shape.name} value={shape.value} />
        ))}
      </Stack>
    </Box>
  );
}
