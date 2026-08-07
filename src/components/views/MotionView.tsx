'use client';

import { useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Slider,
  Stack,
  Chip,
  TextField,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useThemeStore } from '@/store';

const DEFAULT_DURATIONS: Record<string, number> = {
  'Short 1': 50,
  'Short 2': 100,
  'Short 3': 150,
  'Short 4': 200,
  'Medium 1': 250,
  'Medium 2': 300,
  'Medium 3': 350,
  'Medium 4': 400,
  'Long 1': 450,
  'Long 2': 500,
  'Long 3': 550,
  'Long 4': 600,
  'Extra Long 1': 700,
  'Extra Long 2': 800,
  'Extra Long 3': 900,
  'Extra Long 4': 1000,
};

const DEFAULT_EASINGS: Record<string, string> = {
  'Emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
  'Emphasized Decelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  'Emphasized Accelerate': 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  'Standard': 'cubic-bezier(0.2, 0, 0, 1)',
  'Standard Decelerate': 'cubic-bezier(0, 0, 0, 1)',
  'Standard Accelerate': 'cubic-bezier(0.3, 0, 1, 1)',
};

const DEFAULT_DELAY = 0;

// ---------- Duration Controls ----------
function DurationControls() {
  const { config, setMotion } = useThemeStore();
  const motion = config.motion ?? { durationScale: 1 };
  const overrides = motion.durationOverrides ?? {};
  const scale = motion.durationScale ?? 1;

  const handleScaleChange = (_e: unknown, val: number) => {
    setMotion({ durationScale: val });
  };

  const handleOverride = (name: string, ms: number) => {
    setMotion({
      durationOverrides: { ...overrides, [name]: ms },
    });
  };

  const handleResetOne = (name: string) => {
    const next = { ...overrides };
    delete next[name];
    setMotion({ durationOverrides: next });
  };

  const handleResetAll = () => {
    setMotion({ durationScale: 1, durationOverrides: {} });
  };

  const hasChanges = scale !== 1 || Object.keys(overrides).length > 0;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 2.5, md: 4 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, gap: 1, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem' } }}>Duration Tokens</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Edit individual durations or scale all by a factor</Typography>
          </Box>
          {hasChanges && (
            <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={handleResetAll} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Reset All
            </Button>
          )}
        </Box>

        {/* Global scale slider */}
        <Box sx={{ mb: 2.5, p: { xs: 1.5, sm: 2 }, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, flexWrap: 'wrap', gap: 0.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Global Duration Scale</Typography>
            <Chip label={`${scale.toFixed(2)}x`} size="small" color={scale !== 1 ? 'primary' : 'default'} variant={scale !== 1 ? 'filled' : 'outlined'} sx={{ fontFamily: 'monospace' }} />
          </Box>
          <Slider value={scale} min={0.1} max={3} step={0.05} onChange={handleScaleChange} valueLabelDisplay="auto" valueLabelFormat={(v) => `${v.toFixed(2)}x`} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>0.1x (faster)</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>1x (default)</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>3x (slower)</Typography>
          </Box>
        </Box>

        {/* Individual duration tokens */}
        <Grid container spacing={1}>
          {Object.entries(DEFAULT_DURATIONS).map(([name, defaultMs]) => {
            const scaledMs = Math.round(defaultMs * scale);
            const overriddenMs = overrides[name];
            const currentMs = overriddenMs ?? scaledMs;
            const isOverridden = name in overrides;

            return (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={name}>
                <Box sx={{ p: 1.5, borderRadius: 1, bgcolor: isOverridden ? 'primary.50' : 'transparent' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5, gap: 0.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>{name}</Typography>
                    {isOverridden && (
                      <Button size="small" onClick={() => handleResetOne(name)} sx={{ minWidth: 0, px: 0.5, textTransform: 'none', fontSize: '0.6rem' }}>
                        Reset
                      </Button>
                    )}
                  </Box>
                  <TextField
                    size="small"
                    value={currentMs}
                    onChange={(e) => {
                      const num = parseInt(e.target.value);
                      if (!isNaN(num) && num >= 0) handleOverride(name, num);
                    }}
                    slotProps={{ htmlInput: { type: 'number', min: 0, max: 2000, step: 10 } }}
                    sx={{ '& .MuiInputBase-input': { fontSize: { xs: '0.8rem', sm: '0.875rem' }, fontFamily: 'monospace', py: 0.5, px: 1 }, '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                  />
                  <Typography variant="caption" color="text.disabled" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                    {isOverridden ? `was ${scaledMs}ms` : 'ms'}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}

// ---------- Easing Controls ----------
function EasingControls() {
  const { config, setMotion } = useThemeStore();
  const motion = config.motion ?? { durationScale: 1 };
  const overrides = motion.easingOverrides ?? {};

  const handleOverride = (name: string, value: string) => {
    setMotion({
      easingOverrides: { ...overrides, [name]: value },
    });
  };

  const handleResetOne = (name: string) => {
    const next = { ...overrides };
    delete next[name];
    setMotion({ easingOverrides: next });
  };

  const handleResetAll = () => {
    setMotion({ easingOverrides: {} });
  };

  const hasChanges = Object.keys(overrides).length > 0;

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 2.5, md: 4 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, gap: 1, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem' } }}>Easing Curves</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Override cubic-bezier values for each easing curve</Typography>
          </Box>
          {hasChanges && (
            <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={handleResetAll} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Reset All
            </Button>
          )}
        </Box>

        <Stack spacing={1.5}>
          {Object.entries(DEFAULT_EASINGS).map(([name, defaultValue]) => {
            const currentValue = overrides[name] ?? defaultValue;
            const isOverridden = name in overrides;

            return (
              <Box key={name} sx={{ p: { xs: 1.5, sm: 2 }, borderRadius: 1, bgcolor: isOverridden ? 'primary.50' : 'transparent' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, gap: 1, flexWrap: 'wrap' }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>{name}</Typography>
                  {isOverridden && (
                    <Button size="small" onClick={() => handleResetOne(name)} sx={{ textTransform: 'none', borderRadius: 1.5 }}>Reset</Button>
                  )}
                </Box>
                <TextField
                  fullWidth
                  size="small"
                  value={currentValue}
                  onChange={(e) => handleOverride(name, e.target.value)}
                  slotProps={{ input: { sx: { fontFamily: 'monospace', fontSize: { xs: '0.8rem', sm: '0.875rem' } } } }}
                />
                <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block', fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                  {isOverridden ? `Default: ${defaultValue}` : 'cubic-bezier(x1, y1, x2, y2)'}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}

// ---------- Delay Control ----------
function DelayControl() {
  const [delay, setDelay] = useState(DEFAULT_DELAY);
  const [boxPosition, setBoxPosition] = useState(0);
  const { config } = useThemeStore();
  const motion = config.motion ?? { durationScale: 1 };
  const overrides = motion.durationOverrides ?? {};
  const testDuration = overrides['Medium 2'] ?? Math.round(300 * (motion.durationScale ?? 1));

  const handleAnimate = () => {
    setBoxPosition(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setBoxPosition((prev) => (prev === 0 ? 300 : 0));
      });
    });
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 2.5, md: 4 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, gap: 1, flexWrap: 'wrap' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.1rem' } }}>Delay & Preview</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Set animation delay and test with current duration/easing settings</Typography>
          </Box>
          {delay !== DEFAULT_DELAY && (
            <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={() => setDelay(DEFAULT_DELAY)} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Reset Delay
            </Button>
          )}
        </Box>

        <Stack spacing={2.5}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>Delay</Typography>
              <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{delay}ms</Typography>
            </Box>
            <Slider value={delay} min={0} max={1000} step={50} onChange={(_e, val) => setDelay(val as number)} valueLabelDisplay="auto" valueLabelFormat={(v) => `${v}ms`} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>0ms</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>1000ms</Typography>
            </Box>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                Test Duration: {testDuration}ms
              </Typography>
            </Box>
          </Box>

          {/* Animation track */}
          <Box sx={{ height: { xs: 50, sm: 60 }, bgcolor: 'grey.100', borderRadius: 1, position: 'relative', overflow: 'hidden' }}>
            <Box
              sx={{
                width: { xs: 48, sm: 60 },
                height: { xs: 48, sm: 60 },
                bgcolor: 'primary.main',
                borderRadius: 1,
                position: 'absolute',
                top: 0,
                left: boxPosition,
                transition: `left ${testDuration}ms cubic-bezier(0.2, 0, 0, 1) ${delay}ms`,
              }}
            />
          </Box>

          <Button variant="contained" onClick={handleAnimate} sx={{ alignSelf: 'flex-start', textTransform: 'none', borderRadius: 2 }}>
            Animate
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

// ---------- Main Page ----------
export default function MotionPage() {
  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' } }}>Motion</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
        Animation principles for Material Design 3 — edit durations, easings, and delays
      </Typography>

      <DurationControls />
      <EasingControls />
      <DelayControl />
    </Box>
  );
}
