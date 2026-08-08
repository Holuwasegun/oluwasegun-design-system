'use client';

import { useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Slider,
  TextField,
  IconButton,
} from '@mui/material';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAlt';
import { useThemeStore } from '@/store';
import { generateSpacingScale } from '@/theme/scheme';

export default function SpacingPage() {
  const { config, setSpacing } = useThemeStore();
  const baseUnit = config.spacing.baseUnit;
  const spacingOverrides = useMemo(() => config.spacing.spacingOverrides ?? {}, [config.spacing.spacingOverrides]);
  const spacingScale = useMemo(() => generateSpacingScale(baseUnit, spacingOverrides), [baseUnit, spacingOverrides]);

  const maxPx = Math.max(...spacingScale.map((s) => s.px), 1);

  const handleBaseUnitChange = (_e: unknown, value: number | number[]) => {
    setSpacing({ baseUnit: value as number });
  };

  const handleStepChange = (label: string, valueStr: string) => {
    const num = parseInt(valueStr, 10);
    if (!isNaN(num) && num >= 0) {
      const next = { ...spacingOverrides, [label]: num };
      setSpacing({ spacingOverrides: next });
    }
  };

  const handleResetStep = (label: string) => {
    const next = { ...spacingOverrides };
    delete next[label];
    setSpacing({ spacingOverrides: next });
  };

  const handleResetAll = () => {
    setSpacing({ spacingOverrides: {} });
  };

  const hasAnyOverride = Object.keys(spacingOverrides).length > 0;

  const previewSteps = useMemo(() => {
    const wanted = ['1', '2', '3', '4', '6', '8', '12'];
    return spacingScale.filter((s) => wanted.includes(s.label));
  }, [spacingScale]);

  return (
    <Box sx={{ p: { xs: 1.5, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: { xs: 2, md: 3 } }}>
        <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.35rem', sm: '2rem', md: '2.125rem' }, mb: 0.75 }}>
          Spacing
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
          Configurable base spacing unit with generated scale, grid system, and usage patterns
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 3, md: 4 }, alignItems: 'start' }}>
        {/* LEFT COLUMN */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
          {/* Card 1: Base Spacing Unit */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' }, mb: 0.5 }}>
                Base Spacing Unit
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 1.5, sm: 2 } }}>
                Change the base grid step (in pixels) to scale the layout spacing steps mathematically.
              </Typography>

              <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary', display: 'block', mb: 1 }}>
                Base Step Unit (Slider)
              </Typography>

              <Box sx={{ px: { xs: 1, sm: 2 } }}>
                <Slider
                  value={baseUnit}
                  onChange={handleBaseUnitChange}
                  min={2}
                  max={8}
                  step={1}
                  marks={[
                    { value: 2, label: '2' },
                    { value: 4, label: '4' },
                    { value: 6, label: '6' },
                    { value: 8, label: '8' },
                  ]}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v}px`}
                  sx={{ color: 'primary.main', '& .MuiSlider-thumb': { bgcolor: 'primary.main' } }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 0.5, mt: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Compact</Typography>
                <Typography variant="caption" color="text.secondary">Default</Typography>
                <Typography variant="caption" color="text.secondary">Spacious</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Card 2: Manual Spacing Steps */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
            <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 1.5, sm: 2 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
                  Manual Spacing Steps
                </Typography>
                {hasAnyOverride && (
                  <IconButton size="small" onClick={handleResetAll} sx={{ p: 0.5 }}>
                    <RestartAltRoundedIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
              </Box>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: { xs: 1.5, sm: 2 },
                  maxHeight: { xs: 360, sm: 420, md: 480 },
                  overflowY: 'auto',
                  pr: { xs: 0.5, sm: 1 },
                  '&::-webkit-scrollbar': { width: 6 },
                  '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
                  '&::-webkit-scrollbar-thumb': { bgcolor: 'text.disabled', borderRadius: 3 },
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'text.disabled transparent',
                }}
              >
                {spacingScale.map((step) => {
                  const currentPx = step.px;
                  const isOverridden = step.label in spacingOverrides;

                  return (
                    <Box key={step.label} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary' }}>
                          STEP {step.label}
                        </Typography>
                        {isOverridden && (
                          <IconButton size="small" onClick={() => handleResetStep(step.label)} sx={{ p: 0.25, ml: 0.5 }}>
                            <RestartAltRoundedIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        )}
                      </Box>
                      <TextField
                        type="number"
                        value={currentPx}
                        onChange={(e) => handleStepChange(step.label, e.target.value)}
                        slotProps={{
                          htmlInput: { min: 0, max: 200, step: 1 },
                          input: {
                            endAdornment: (
                              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.75rem' }}>
                                px
                              </Typography>
                            ),
                          },
                        }}
                        size="small"
                        fullWidth
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper', fontFamily: 'monospace', fontWeight: 600 } }}
                      />
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* RIGHT COLUMN */}
        <Box sx={{ position: { lg: 'sticky' }, top: { lg: '88px' }, alignSelf: 'start' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' }, mb: { xs: 1.5, sm: 2 } }}>
            Grid Layout Preview
          </Typography>
          <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3.5, md: 4 }, '&:last-child': { pb: { xs: 2.5, sm: 3.5, md: 4 } } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', mb: { xs: 2, sm: 3 } }}>
                Visual representation of spacer tokens:
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}>
                {previewSteps.map((step) => {
                  const rem = (step.px / 16).toFixed(step.px % 16 === 0 ? 2 : 4);
                  const barHeight = maxPx > 0 ? Math.max((step.px / maxPx) * 120, 2) : 2;

                  return (
                    <Box key={step.label} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, fontFamily: 'monospace', width: { xs: 28, sm: 36 }, flexShrink: 0 }}>
                        {step.label}
                      </Typography>
                      <Box
                        sx={{
                          width: 4,
                          height: barHeight,
                          bgcolor: 'primary.main',
                          borderRadius: 2,
                          opacity: 0.7 + (step.px / maxPx) * 0.3,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontWeight: 600 }}>
                        {rem}rem
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
