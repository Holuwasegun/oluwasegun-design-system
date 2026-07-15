'use client';

import { useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Slider,
  IconButton,
  Tooltip,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { useThemeStore } from '@/store';
import { generateSpacingScale } from '@/theme/scheme';

const DEFAULT_BASE_UNIT = 4;
const GRID_COLUMNS = 8;

export default function SpacingPage() {
  const { config, setSpacing } = useThemeStore();
  const baseUnit = config.spacing.baseUnit;
  const spacingScale = useMemo(() => generateSpacingScale(baseUnit), [baseUnit]);

  const maxPx = spacingScale[spacingScale.length - 1].px;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Spacing
        </Typography>
        <Tooltip title="Reset base unit to default">
          <IconButton
            size="small"
            onClick={() => setSpacing({ baseUnit: DEFAULT_BASE_UNIT })}
          >
            <RestartAltRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Configurable base spacing unit with generated scale, grid system, and usage patterns
      </Typography>

      {/* ---- 1. Base Spacing Unit Control ---- */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
        Base Spacing Unit
      </Typography>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 3 }, '&:last-child': { pb: { xs: 2.5, sm: 3 } } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
              Base Unit
            </Typography>
            <Chip
              label={`${baseUnit}px`}
              size="small"
              color={baseUnit === DEFAULT_BASE_UNIT ? 'default' : 'primary'}
              sx={{ fontFamily: 'monospace', fontWeight: 600 }}
            />
            {baseUnit !== DEFAULT_BASE_UNIT && (
              <Tooltip title={`Reset to ${DEFAULT_BASE_UNIT}px`}>
                <IconButton
                  size="small"
                  onClick={() => setSpacing({ baseUnit: DEFAULT_BASE_UNIT })}
                >
                  <RestartAltRoundedIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Box sx={{ px: { xs: 1, sm: 2 } }}>
            <Slider
              value={baseUnit}
              onChange={(_, value) => setSpacing({ baseUnit: value as number })}
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
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Compact
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Default
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Spacious
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* ---- 2. Spacing Scale ---- */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
        Spacing Scale
      </Typography>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
          <Box sx={{ overflowX: 'auto' }}>
            <Stack spacing={1}>
              {spacingScale.map(({ label, value, px }, i) => {
                const barWidth = maxPx > 0 ? Math.max((px / maxPx) * 100, 0.5) : 0;
                const opacity = 0.35 + (i / (spacingScale.length - 1)) * 0.55;
                return (
                  <Box
                    key={label}
                    sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}
                  >
                    <Chip
                      label={value % 1 === 0 ? value : value}
                      size="small"
                      variant="outlined"
                      sx={{
                        width: 44,
                        fontFamily: 'monospace',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          height: 28,
                          width: `${barWidth}%`,
                          bgcolor: 'primary.main',
                          opacity,
                          borderRadius: 1,
                          transition: 'width 0.3s ease, opacity 0.2s ease',
                          minWidth: px > 0 ? 2 : 0,
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        width: 56,
                        textAlign: 'right',
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        fontVariantNumeric: 'tabular-nums',
                        color: 'text.secondary',
                        flexShrink: 0,
                      }}
                    >
                      {px}px
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* ---- 3. Grid System Visualization ---- */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
        Grid System
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {GRID_COLUMNS}-column grid using {baseUnit}px base unit &middot; gutter = 1 &times; base
      </Typography>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 }, '&:last-child': { pb: { xs: 2, sm: 3 } } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: `repeat(4, 1fr)`, sm: `repeat(${GRID_COLUMNS}, 1fr)` },
              gap: `${baseUnit}px`,
            }}
          >
            {Array.from({ length: GRID_COLUMNS }).map((_, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: 'primary.main',
                  opacity: 0.15,
                  borderRadius: 1,
                  height: { xs: 40, sm: 64 },
                  display: { xs: i < 4 ? 'flex' : 'none', sm: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'monospace',
                    fontSize: '0.65rem',
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                >
                  {i + 1}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: 2, display: 'flex', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: 0.5, bgcolor: 'primary.main', opacity: 0.15 }} />
              <Typography variant="caption" color="text.secondary">
                Column
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: 0.5, bgcolor: 'text.secondary', opacity: 0.3 }} />
              <Typography variant="caption" color="text.secondary">
                Gutter ({baseUnit}px)
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box sx={{ width: 16, height: 16, borderRadius: 0.5, bgcolor: 'grey.300' }} />
              <Typography variant="caption" color="text.secondary">
                Margin ({baseUnit}px each side)
              </Typography>
            </Box>
          </Box>

          {/* Content area with margins */}
          <Box sx={{ mt: 2.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              With outer margins
            </Typography>
            <Box
              sx={{
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 1.5,
                p: `${baseUnit}px`,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${GRID_COLUMNS}, 1fr)`,
                  gap: `${baseUnit}px`,
                }}
              >
                {Array.from({ length: GRID_COLUMNS }).map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      bgcolor: 'primary.main',
                      opacity: 0.3,
                      borderRadius: 0.5,
                      height: 32,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      {/* ---- 4. Usage Examples ---- */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5 }}>
        Usage Examples
      </Typography>

      {/* Code reference */}
      <Card variant="outlined" sx={{ mb: 2.5 }}>
        <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
            Function Reference
          </Typography>
          <Box
            component="pre"
            sx={{
              m: 0,
              p: { xs: 1.5, sm: 2 },
              bgcolor: 'action.hover',
              borderRadius: 1.5,
              fontFamily: 'monospace',
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              lineHeight: 1.8,
              overflowX: 'auto',
              whiteSpace: 'pre',
            }}
          >
{spacingScale.filter(s => s.value > 0).map(
  (s) => `spacing(${s.label.padStart(2)})  = ${String(s.px).padStart(3)}px`
).join('\n')}
          </Box>
        </CardContent>
      </Card>

      {/* Component Padding */}
      <Card variant="outlined" sx={{ mb: 2.5 }}>
        <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Component Padding
          </Typography>
          <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
            {[
              { label: 'Dense', value: 1 },
              { label: 'Normal', value: 2 },
              { label: 'Comfortable', value: 3 },
              { label: 'Spacious', value: 4 },
            ].map(({ label, value }) => (
              <Box key={label} sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 120,
                    height: 64,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    borderRadius: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    p: `${value * baseUnit}px`,
                  }}
                >
                  p: {value}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: 'block' }}>
                  {label} ({value * baseUnit}px)
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Section Margins */}
      <Card variant="outlined" sx={{ mb: 2.5 }}>
        <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Section Margins
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { label: 'Tight section', mb: 1 },
              { label: 'Standard section', mb: 2 },
              { label: 'Spacious section', mb: 3 },
            ].map(({ label, mb }) => (
              <Box key={label}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                  mb: {mb} ({mb * baseUnit}px)
                </Typography>
                <Box sx={{ mb: `${mb * baseUnit}px`, '&:last-child': { mb: 0 } }}>
                  <Box
                    sx={{
                      height: 36,
                      bgcolor: 'primary.main',
                      opacity: 0.25,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      px: 1.5,
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {label}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Element Gaps */}
      <Card variant="outlined" sx={{ mb: 2.5 }}>
        <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Element Gaps
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {[
              { label: 'Tight', gap: 1 },
              { label: 'Normal', gap: 2 },
              { label: 'Loose', gap: 3 },
            ].map(({ label, gap }) => (
              <Box key={label}>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75 }}>
                  gap: {gap} ({gap * baseUnit}px)
                </Typography>
                <Box sx={{ display: 'flex', gap: `${gap * baseUnit}px` }}>
                  {[0, 1, 2].map((n) => (
                    <Box
                      key={n}
                      sx={{
                        flex: 1,
                        height: 40,
                        bgcolor: 'primary.main',
                        opacity: 0.2,
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
                        {String.fromCharCode(65 + n)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Nested Insets */}
      <Card variant="outlined">
        <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Nested Insets
          </Typography>
          <Box
            sx={{
              p: `${2 * baseUnit}px`,
              bgcolor: 'action.hover',
              borderRadius: 1.5,
            }}
          >
            <Box
              sx={{
                p: `${2 * baseUnit}px`,
                bgcolor: 'primary.main',
                opacity: 0.1,
                borderRadius: 1,
              }}
            >
              <Box
                sx={{
                  p: `${2 * baseUnit}px`,
                  bgcolor: 'primary.main',
                  opacity: 0.2,
                  borderRadius: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  p: 2 → p: 2 → p: 2
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
