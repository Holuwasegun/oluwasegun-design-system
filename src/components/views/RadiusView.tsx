'use client';

import { useState, useCallback } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Slider,
  TextField,
  Divider,
  Snackbar,
  Alert,
  Avatar,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const shapeScale = [
  { name: 'None', value: 0, token: 'shape.none' },
  { name: 'Extra Small', value: 4, token: 'shape.extraSmall' },
  { name: 'Small', value: 8, token: 'shape.small' },
  { name: 'Medium', value: 12, token: 'shape.medium' },
  { name: 'Large', value: 16, token: 'shape.large' },
  { name: 'Extra Large', value: 24, token: 'shape.extraLarge' },
  { name: 'Full', value: 9999, token: 'shape.full' },
];

interface RadiusBuilderState {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
}

const RADIUS_DEFAULTS: RadiusBuilderState = { topLeft: 12, topRight: 12, bottomLeft: 12, bottomRight: 12 };

function buildRadiusCSS(s: RadiusBuilderState): string {
  const allEqual = s.topLeft === s.topRight && s.topRight === s.bottomLeft && s.bottomLeft === s.bottomRight;
  if (allEqual) {
    return s.topLeft === 0 ? '0' : `${s.topLeft}px`;
  }
  return `${s.topLeft}px ${s.topRight}px ${s.bottomRight}px ${s.bottomLeft}px`;
}

function RadiusBuilder() {
  const [state, setState] = useState<RadiusBuilderState>(RADIUS_DEFAULTS);
  const [copied, setCopied] = useState(false);

  const handleChange = useCallback((key: keyof RadiusBuilderState, value: number) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleUniformChange = useCallback((value: number) => {
    setState({ topLeft: value, topRight: value, bottomLeft: value, bottomRight: value });
  }, []);

  const radiusCSS = buildRadiusCSS(state);
  const cssCode = `border-radius: ${radiusCSS};`;
  const isUniform = state.topLeft === state.topRight && state.topRight === state.bottomLeft && state.bottomLeft === state.bottomRight;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReset = () => setState(RADIUS_DEFAULTS);

  const corners: { key: keyof RadiusBuilderState; label: string }[] = [
    { key: 'topLeft', label: 'Top Left' },
    { key: 'topRight', label: 'Top Right' },
    { key: 'bottomLeft', label: 'Bottom Left' },
    { key: 'bottomRight', label: 'Bottom Right' },
  ];

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: { xs: 2.5, md: 4 }, '&:last-child': { pb: { xs: 2.5, md: 4 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Radius Builder
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
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                  Uniform Radius
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                  {isUniform ? `${state.topLeft}px` : 'mixed'}
                </Typography>
              </Box>
              <Slider
                value={isUniform ? state.topLeft : 0}
                min={0}
                max={50}
                step={1}
                onChange={(_e, val) => handleUniformChange(val as number)}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v}px`}
                size="small"
                disabled={!isUniform}
              />
            </Box>

            <Divider />

            {corners.map(({ key, label }) => (
              <Box key={key}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    {label}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                    {state[key]}px
                  </Typography>
                </Box>
                <Slider
                  value={state[key]}
                  min={0}
                  max={50}
                  step={1}
                  onChange={(_e, val) => handleChange(key, val as number)}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v}px`}
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
              }}
            >
              <Box
                sx={{
                  width: 160,
                  height: 120,
                  bgcolor: 'primary.main',
                  borderRadius: radiusCSS,
                  opacity: 0.8,
                  transition: 'border-radius 0.2s ease',
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Component Preview</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                <Button variant="contained" sx={{ borderRadius: radiusCSS, textTransform: 'none' }}>Button</Button>
                <Button variant="outlined" sx={{ borderRadius: radiusCSS, textTransform: 'none' }}>Outlined</Button>
                <Chip label="Chip" sx={{ borderRadius: radiusCSS, bgcolor: 'primary.main', color: 'primary.contrastText' }} />
                <Chip label="Outlined" variant="outlined" sx={{ borderRadius: radiusCSS, color: 'primary.main' }} />
              </Box>
              <Paper variant="outlined" sx={{ p: 1.5, borderRadius: radiusCSS, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32, borderRadius: radiusCSS }}>A</Avatar>
                <Typography variant="body2">Card with custom radius</Typography>
              </Paper>
            </Box>

            <Box sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                value={cssCode}
                slotProps={{ input: { readOnly: true, sx: { fontFamily: 'monospace', fontSize: 13, pr: 8 } } }}
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

export default function RadiusPage() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Border Radius
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Shape scale for corners
      </Typography>

      <RadiusBuilder />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        MD3 Shape Scale
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {shapeScale.map(({ name, value, token }) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={name}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 120,
                    height: 80,
                    bgcolor: 'primary.main',
                    opacity: 0.8,
                    borderRadius: value,
                    transition: 'border-radius 0.3s ease',
                  }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value === 9999 ? '9999px' : `${value}px`}
                </Typography>
                <Chip
                  label={token}
                  size="small"
                  variant="outlined"
                  sx={{ fontFamily: 'monospace', fontSize: 11 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Chips & Buttons
      </Typography>
      <Stack spacing={3} sx={{ mb: 4 }}>
        {shapeScale.map(({ name, value }) => (
          <Stack key={`btn-${name}`} direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ width: { xs: 80, sm: 120 }, color: 'text.secondary', flexShrink: 0 }}>
              {name}
            </Typography>
            <Chip
              label="Chip"
              sx={{ borderRadius: value, bgcolor: 'primary.main', color: 'primary.contrastText' }}
            />
            <Chip
              label="Outlined"
              variant="outlined"
              sx={{ borderRadius: value, color: 'primary.main' }}
            />
            <Button
              variant="contained"
              sx={{ borderRadius: value, textTransform: 'none' }}
            >
              Button
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: value, textTransform: 'none' }}
            >
              Outlined
            </Button>
          </Stack>
        ))}
      </Stack>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Square Examples
      </Typography>
      <Grid container spacing={2}>
        {shapeScale.map(({ name, value }) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={`sq-${name}`}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: 'secondary.main',
                  borderRadius: value,
                  transition: 'border-radius 0.3s ease',
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {name}: {value === 9999 ? 'full' : `${value}px`}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
