'use client';

import { useMemo, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Slider,
  TextField,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Divider,
  Stack,
  Autocomplete,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useThemeStore } from '@/store';
import {
  generateTypeScale,
  TYPOGRAPHY_SCALES,
  type TypeStyle,
} from '@/theme/scheme';

const LETTER_SPACING_DEFAULTS: Record<string, number> = {
  'Display Large': -0.25,
  'Display Medium': 0,
  'Display Small': 0,
  'Headline Large': 0,
  'Headline Medium': 0,
  'Headline Small': 0,
  'Title Large': 0,
  'Title Medium': 0.15,
  'Title Small': 0.1,
  'Body Large': 0.5,
  'Body Medium': 0.25,
  'Body Small': 0.4,
  'Label Large': 0.1,
  'Label Medium': 0.5,
  'Label Small': 0.5,
};

function TrackingControls({ styles }: { styles: TypeStyle[] }) {
  const { config, setTypography } = useThemeStore();
  const overrides = config.typography.letterSpacingOverrides ?? {};

  const handleChange = (styleName: string, value: number) => {
    setTypography({
      letterSpacingOverrides: { ...overrides, [styleName]: value },
    });
  };

  const handleReset = (styleName: string) => {
    const next = { ...overrides };
    delete next[styleName];
    setTypography({ letterSpacingOverrides: next });
  };

  const handleResetAll = () => {
    setTypography({ letterSpacingOverrides: {} });
  };

  const hasAnyOverride = Object.keys(overrides).length > 0;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: { xs: 2.5, md: 4 }, '&:last-child': { pb: { xs: 2.5, md: 4 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Letter Spacing (Tracking)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Override per-style letter spacing values in em units
            </Typography>
          </Box>
          {hasAnyOverride && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<RestartAltIcon />}
              onClick={handleResetAll}
              sx={{ textTransform: 'none' }}
            >
              Reset All
            </Button>
          )}
        </Box>

        <Stack spacing={2.5}>
          {styles.map((style) => {
            const defaultVal = LETTER_SPACING_DEFAULTS[style.name] ?? 0;
            const currentVal = overrides[style.name] ?? defaultVal;
            const isOverridden = style.name in overrides;

            return (
              <Box key={style.name}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={FAMILY_LABELS[style.family]}
                      size="small"
                      color={FAMILY_COLORS[style.family]}
                      variant="outlined"
                      sx={{ minWidth: 72, fontWeight: 500 }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                      {style.size}
                    </Typography>
                    {isOverridden && (
                      <Chip label="custom" size="small" color="warning" variant="filled" sx={{ height: 20, fontSize: 10 }} />
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums', minWidth: 60, textAlign: 'right' }}>
                      {currentVal.toFixed(2)}em
                    </Typography>
                    {isOverridden && (
                      <Button
                        size="small"
                        onClick={() => handleReset(style.name)}
                        sx={{ minWidth: 0, px: 1, textTransform: 'none' }}
                      >
                        Reset
                      </Button>
                    )}
                  </Box>
                </Box>
                <Slider
                  value={currentVal}
                  min={-0.5}
                  max={1.5}
                  step={0.01}
                  onChange={(_e, val) => handleChange(style.name, val as number)}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v.toFixed(2)}em`}
                  size="small"
                  sx={{ py: 0.5 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" color="text.secondary">-0.5em</Typography>
                  <Typography variant="caption" color="text.secondary">1.5em</Typography>
                </Box>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}

const PREVIEW_TEXT = 'The quick brown fox jumps over the lazy dog';

const SCALE_PRESETS = Object.entries(TYPOGRAPHY_SCALES).map(([key, v]) => ({
  key,
  label: v.label,
  value: v.value,
}));

const FAMILY_COLORS: Record<TypeStyle['family'], 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  display: 'primary',
  headline: 'secondary',
  title: 'info',
  body: 'success',
  label: 'warning',
};

const FAMILY_LABELS: Record<TypeStyle['family'], string> = {
  display: 'Display',
  headline: 'Headline',
  title: 'Title',
  body: 'Body',
  label: 'Label',
};

function ScaleControls() {
  const { config, setTypography } = useThemeStore();
  const { baseSize, scale } = config.typography;
  const [customScale, setCustomScale] = useState('');

  const matchedPreset = SCALE_PRESETS.find((p) => p.value === scale);

  const handlePresetChange = (_e: unknown, option: { key: string; label: string; value: number } | null) => {
    if (option) {
      setTypography({ scale: option.value });
      setCustomScale('');
    }
  };

  const handleCustomScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomScale(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setTypography({ scale: num });
    }
  };

  const handleReset = () => {
    setTypography({ baseSize: 14, scale: 1.25 });
    setCustomScale('');
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: { xs: 2.5, md: 4 }, '&:last-child': { pb: { xs: 2.5, md: 4 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Scale Generator
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
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' },
            gap: { xs: 3, md: 4 },
            alignItems: 'start',
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5, color: 'text.secondary' }}>
              Base Size
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', mb: 1 }}>
              {baseSize}px
            </Typography>
            <Slider
              value={baseSize}
              min={10}
              max={24}
              step={1}
              onChange={(_e, val) => setTypography({ baseSize: val as number })}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => `${v}px`}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">10px</Typography>
              <Typography variant="caption" color="text.secondary">24px</Typography>
            </Box>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5, color: 'text.secondary' }}>
              Scale Factor Preset
            </Typography>
            <Autocomplete
              options={SCALE_PRESETS}
              value={matchedPreset ?? null}
              onChange={handlePresetChange}
              getOptionLabel={(opt) => opt.label}
              isOptionEqualToValue={(opt, val) => opt.value === val.value}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select a scale..." size="small" />
              )}
              slotProps={{ paper: { sx: { maxHeight: 300 } } }}
            />
            <Typography variant="body2" sx={{ mt: 1, fontVariantNumeric: 'tabular-nums', color: 'text.secondary' }}>
              Current: <strong>{scale}</strong>x
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1.5, color: 'text.secondary' }}>
              Custom Scale Factor
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="e.g. 1.414"
              value={customScale}
              onChange={handleCustomScaleChange}
              slotProps={{ htmlInput: { type: 'number', min: '0.5', max: '3', step: '0.001' } }}
            />
            <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
              Enter any positive number to override the preset
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function ScaleTable({ styles }: { styles: TypeStyle[] }) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ display: { xs: 'none', md: 'block' } }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Style</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Preview</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Font Size</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Line Height</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Weight</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Letter Spacing</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {styles.map((style) => {
            const displaySize = Math.min(style.fontSize, 32);
            const rowHeight = Math.max(displaySize * 1.4, 48);
            return (
              <TableRow key={style.name} hover sx={{ height: rowHeight }}>
                <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={FAMILY_LABELS[style.family]}
                      size="small"
                      color={FAMILY_COLORS[style.family]}
                      variant="outlined"
                      sx={{ minWidth: 72, fontWeight: 500 }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                      {style.size}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ verticalAlign: 'middle', overflow: 'hidden' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontSize: displaySize,
                      fontWeight: style.fontWeight,
                      lineHeight: 1.4,
                      letterSpacing: `${style.letterSpacing}em`,
                      maxWidth: 360,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {PREVIEW_TEXT}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                    {style.fontSize.toFixed(1)}px
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                    {style.lineHeight}px
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {style.fontWeight}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                    {style.letterSpacing}em
                  </Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ScaleCards({ styles }: { styles: TypeStyle[] }) {
  return (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <Stack spacing={2}>
        {styles.map((style) => {
          const displaySize = Math.min(style.fontSize, 28);
          return (
            <Card key={style.name} variant="outlined">
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Chip
                    label={FAMILY_LABELS[style.family]}
                    size="small"
                    color={FAMILY_COLORS[style.family]}
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                    {style.size}
                  </Typography>
                </Box>
                <Typography
                  gutterBottom
                  noWrap
                  sx={{
                    fontSize: displaySize,
                    fontWeight: style.fontWeight,
                    lineHeight: 1.4,
                    letterSpacing: `${style.letterSpacing}em`,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {PREVIEW_TEXT}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1 }}>
                  <Chip label={`${style.fontSize.toFixed(1)}px`} size="small" variant="outlined" />
                  <Chip label={`${style.lineHeight}px lh`} size="small" variant="outlined" />
                  <Chip label={`w${style.fontWeight}`} size="small" variant="outlined" />
                  <Chip label={`${style.letterSpacing}em`} size="small" variant="outlined" />
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}

function LivePreview({ styles }: { styles: TypeStyle[] }) {
  const byName = useMemo(() => {
    const map = new Map<string, TypeStyle>();
    for (const s of styles) map.set(s.name, s);
    return map;
  }, [styles]);

  const displayLarge = byName.get('Display Large');
  const titleMedium = byName.get('Title Medium');
  const bodyLarge = byName.get('Body Large');
  const bodyMedium = byName.get('Body Medium');
  const labelLarge = byName.get('Label Large');
  const labelSmall = byName.get('Label Small');

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent sx={{ p: { xs: 2.5, md: 4 }, '&:last-child': { pb: { xs: 2.5, md: 4 } } }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Live Preview
        </Typography>

        <Box
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          <Box sx={{ bgcolor: 'grey.100', px: { xs: 2.5, md: 4 }, py: { xs: 3, md: 5 }, borderBottom: 1, borderColor: 'divider' }}>
            <Typography
              noWrap
              sx={{
                fontSize: { xs: Math.min(displayLarge?.fontSize ?? 57, 36), md: Math.min(displayLarge?.fontSize ?? 57, 57) },
                fontWeight: displayLarge?.fontWeight ?? 400,
                lineHeight: 1.2,
                letterSpacing: `${displayLarge?.letterSpacing ?? -0.25}em`,
                mb: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Typography Scale
            </Typography>
            <Typography
              noWrap
              sx={{
                fontSize: { xs: Math.min(titleMedium?.fontSize ?? 16, 18), md: titleMedium?.fontSize ?? 16 },
                fontWeight: titleMedium?.fontWeight ?? 500,
                lineHeight: 1.4,
                letterSpacing: `${titleMedium?.letterSpacing ?? 0.15}em`,
                color: 'text.secondary',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Material Design 3 · Type Scale Generator
            </Typography>
          </Box>

          <Box sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 2, md: 3 }, overflow: 'hidden' }}>
            <Typography
              sx={{
                fontSize: { xs: Math.min(bodyLarge?.fontSize ?? 16, 16), md: bodyLarge?.fontSize ?? 16 },
                fontWeight: bodyLarge?.fontWeight ?? 400,
                lineHeight: 1.6,
                letterSpacing: `${bodyLarge?.letterSpacing ?? 0.5}em`,
                mb: 2,
              }}
            >
              Material Design 3 provides a comprehensive type scale system that
              helps establish visual hierarchy and readability across your
              application. Each style is carefully crafted for specific use cases.
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: Math.min(bodyMedium?.fontSize ?? 14, 14), md: bodyMedium?.fontSize ?? 14 },
                fontWeight: bodyMedium?.fontWeight ?? 400,
                lineHeight: 1.6,
                letterSpacing: `${bodyMedium?.letterSpacing ?? 0.25}em`,
                color: 'text.secondary',
                mb: 3,
              }}
            >
              The type scale is generated using a modular scale algorithm that
              produces harmonious size relationships between different text levels.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {labelLarge && (
                <Chip
                  label="Design"
                  sx={{
                    fontSize: labelLarge.fontSize,
                    fontWeight: labelLarge.fontWeight,
                    letterSpacing: `${labelLarge.letterSpacing}em`,
                    height: 'auto',
                  }}
                />
              )}
              {labelLarge && (
                <Chip
                  label="Typography"
                  sx={{
                    fontSize: labelLarge.fontSize,
                    fontWeight: labelLarge.fontWeight,
                    letterSpacing: `${labelLarge.letterSpacing}em`,
                    height: 'auto',
                  }}
                />
              )}
              {labelLarge && (
                <Chip
                  label="Material"
                  sx={{
                    fontSize: labelLarge.fontSize,
                    fontWeight: labelLarge.fontWeight,
                    letterSpacing: `${labelLarge.letterSpacing}em`,
                    height: 'auto',
                  }}
                />
              )}
            </Box>

            {labelSmall && (
              <Typography
                sx={{
                  fontSize: labelSmall.fontSize,
                  fontWeight: labelSmall.fontWeight,
                  lineHeight: `${labelSmall.lineHeight / labelSmall.fontSize}`,
                  letterSpacing: `${labelSmall.letterSpacing}em`,
                  color: 'text.secondary',
                  mt: 2,
                }}
              >
                Generated with {TYPOGRAPHY_SCALES['major-third'].label} · Base 14px
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function TypographyPage() {
  const { config } = useThemeStore();

  const styles = useMemo(
    () => generateTypeScale(config.typography),
    [config.typography.baseSize, config.typography.scale, config.typography.letterSpacingOverrides]
  );

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Typography
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Material Design 3 type scale with live generator
      </Typography>

      <ScaleControls />

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Letter Spacing Overrides
      </Typography>
      <TrackingControls styles={styles} />

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Type Scale Preview
      </Typography>
      <Box sx={{ mb: 4 }}>
        <ScaleTable styles={styles} />
        <ScaleCards styles={styles} />
      </Box>

      <Divider sx={{ my: 4 }} />

      <LivePreview styles={styles} />
    </Box>
  );
}
