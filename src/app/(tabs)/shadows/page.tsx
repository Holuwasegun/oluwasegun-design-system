'use client';

import { useState, useCallback } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Slider,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const shadowLevels: { level: number; shadow: string; label: string }[] = [
  { level: 0, shadow: 'none', label: 'none' },
  {
    level: 1,
    shadow: '0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)',
    label: '0px 1px 2px + 1px 3px blur',
  },
  {
    level: 2,
    shadow: '0px 1px 2px rgba(0,0,0,0.3), 0px 2px 6px 2px rgba(0,0,0,0.15)',
    label: '0px 1px 2px + 2px 6px blur',
  },
  {
    level: 3,
    shadow: '0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px rgba(0,0,0,0.3)',
    label: '4px 8px 3px blur + 1px 3px',
  },
  {
    level: 4,
    shadow: '0px 6px 10px 4px rgba(0,0,0,0.15), 0px 2px 3px rgba(0,0,0,0.3)',
    label: '6px 10px 4px blur + 2px 3px',
  },
  {
    level: 5,
    shadow: '0px 8px 12px 6px rgba(0,0,0,0.15), 0px 4px 4px rgba(0,0,0,0.3)',
    label: '8px 12px 6px blur + 4px 4px',
  },
];

function generateGenericShadow(level: number): string {
  const spread = level - 2;
  const blur = 4 + level * 2;
  const y = level * 2;
  const opacityAmbient = 0.1 + level * 0.01;
  const opacityKey = 0.15 + level * 0.01;
  return `0px ${y}px ${blur}px ${spread}px rgba(0,0,0,${opacityAmbient.toFixed(2)}), 0px ${Math.floor(y / 2)}px ${Math.floor(blur / 3)}px rgba(0,0,0,${opacityKey.toFixed(2)})`;
}

for (let i = 6; i <= 24; i++) {
  shadowLevels.push({
    level: i,
    shadow: generateGenericShadow(i),
    label: `generic increasing shadow`,
  });
}

interface ShadowBuilderState {
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  opacity: number;
}

const SHADOW_DEFAULTS: ShadowBuilderState = { offsetX: 0, offsetY: 4, blur: 8, spread: 2, opacity: 0.15 };

function buildShadowCSS(s: ShadowBuilderState): string {
  const ambient = `0px ${s.offsetY}px ${s.blur}px ${s.spread}px rgba(0,0,0,${s.opacity.toFixed(2)})`;
  const key = `0px ${Math.round(s.offsetY * 0.5)}px ${Math.round(s.blur / 3)}px rgba(0,0,0,${Math.min(s.opacity + 0.15, 1).toFixed(2)})`;
  return `${ambient}, ${key}`;
}

function ShadowBuilder() {
  const [state, setState] = useState<ShadowBuilderState>(SHADOW_DEFAULTS);
  const [copied, setCopied] = useState(false);

  const handleChange = useCallback((key: keyof ShadowBuilderState, value: number) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const shadowCSS = buildShadowCSS(state);

  const cssCode = `box-shadow: ${shadowCSS};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => setState(SHADOW_DEFAULTS);

  const sliders: { key: keyof ShadowBuilderState; label: string; min: number; max: number; step: number; unit: string }[] = [
    { key: 'offsetX', label: 'Offset X', min: -50, max: 50, step: 1, unit: 'px' },
    { key: 'offsetY', label: 'Offset Y', min: -50, max: 50, step: 1, unit: 'px' },
    { key: 'blur', label: 'Blur Radius', min: 0, max: 100, step: 1, unit: 'px' },
    { key: 'spread', label: 'Spread', min: -50, max: 50, step: 1, unit: 'px' },
    { key: 'opacity', label: 'Opacity', min: 0, max: 1, step: 0.01, unit: '' },
  ];

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: { xs: 2.5, md: 4 }, '&:last-child': { pb: { xs: 2.5, md: 4 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Shadow Builder
          </Typography>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RestartAltIcon />}
            onClick={handleReset}
            sx={{ textTransform: 'none' }}
          >
            Reset
          </Button>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: { xs: 3, md: 4 },
            alignItems: 'start',
          }}
        >
          <Stack spacing={2.5}>
            {sliders.map(({ key, label, min, max, step, unit }) => (
              <Box key={key}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    {label}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                    {key === 'opacity' ? state[key].toFixed(2) : `${state[key]}${unit}`}
                  </Typography>
                </Box>
                <Slider
                  value={state[key]}
                  min={min}
                  max={max}
                  step={step}
                  onChange={(_e, val) => handleChange(key, val as number)}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => (key === 'opacity' ? v.toFixed(2) : `${v}${unit}`)}
                  size="small"
                />
              </Box>
            ))}
          </Stack>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 200,
                bgcolor: 'grey.100',
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Box
                sx={{
                  width: 140,
                  height: 100,
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  boxShadow: shadowCSS,
                  transition: 'box-shadow 0.2s ease',
                }}
              />
            </Box>

            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={cssCode}
                slotProps={{ input: { readOnly: true, sx: { fontFamily: 'monospace', fontSize: 13 } } }}
                size="small"
              />
              <Button
                size="small"
                startIcon={<ContentCopyIcon />}
                onClick={handleCopy}
                sx={{ position: 'absolute', top: 4, right: 4, minWidth: 0, textTransform: 'none' }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
      <Snackbar open={copied} autoHideDuration={2000} onClose={() => setCopied(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          CSS copied to clipboard
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default function ShadowsPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Shadows
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Material Design elevation shadow values
      </Typography>

      <ShadowBuilder />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        MD3 Shadow Tokens
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {shadowLevels.filter((s) => s.level <= 5).map(({ level, shadow, label }) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={level}>
            <Card
              sx={{
                height: 140,
                boxShadow: shadow,
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: shadowLevels[Math.min(level + 2, 24)].shadow,
                },
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {level}
                  </Typography>
                  <Chip label={`Level ${level}`} size="small" color="primary" variant="outlined" />
                </Stack>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: 10, lineHeight: 1.4, wordBreak: 'break-all' }}>
                  {label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Extended Levels 6–24
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Increasing shadow intensity for deeper surfaces. Hover to preview a higher level.
      </Typography>
      <Grid container spacing={2}>
        {shadowLevels.filter((s) => s.level >= 6).map(({ level, shadow }) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={level}>
            <Card
              sx={{
                height: 100,
                boxShadow: shadow,
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: shadowLevels[Math.min(level + 3, 24)].shadow,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', py: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {level}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Elevation
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
