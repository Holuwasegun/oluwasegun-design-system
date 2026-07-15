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
  useMediaQuery,
  useTheme,
  Autocomplete,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useThemeStore } from '@/store';
import {
  generateTypeScale,
  TYPOGRAPHY_SCALES,
  type TypeStyle,
} from '@/theme/scheme';

const PREVIEW_TEXT = 'The quick brown fox jumps over the lazy dog';

const SCALE_PRESETS = Object.entries(TYPOGRAPHY_SCALES).map(([key, v]) => ({
  key,
  label: v.label,
  value: v.value,
}));

const FAMILY_COLORS: Record<TypeStyle['family'], string> = {
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
          {styles.map((style) => (
            <TableRow key={style.name} hover>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={FAMILY_LABELS[style.family]}
                    size="small"
                    color={FAMILY_COLORS[style.family] as 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                    variant="outlined"
                    sx={{ minWidth: 72, fontWeight: 500 }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                    {style.size}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography
                  noWrap
                  sx={{
                    fontSize: Math.min(style.fontSize, 36),
                    fontWeight: style.fontWeight,
                    lineHeight: 1.3,
                    letterSpacing: `${style.letterSpacing}em`,
                    maxWidth: 360,
                  }}
                >
                  {PREVIEW_TEXT}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                  {style.fontSize.toFixed(1)}px
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                  {style.lineHeight}px
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                  {style.fontWeight}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                  {style.letterSpacing}em
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ScaleCards({ styles }: { styles: TypeStyle[] }) {
  return (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <Stack spacing={2}>
        {styles.map((style) => (
          <Card key={style.name} variant="outlined">
            <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Chip
                  label={FAMILY_LABELS[style.family]}
                  size="small"
                  color={FAMILY_COLORS[style.family] as 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'}
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                  {style.size}
                </Typography>
              </Box>
              <Typography
                gutterBottom
                sx={{
                  fontSize: style.fontSize,
                  fontWeight: style.fontWeight,
                  lineHeight: `${style.lineHeight / style.fontSize}`,
                  letterSpacing: `${style.letterSpacing}em`,
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
        ))}
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
              sx={{
                fontSize: displayLarge?.fontSize ?? 57,
                fontWeight: displayLarge?.fontWeight ?? 400,
                lineHeight: `${(displayLarge?.lineHeight ?? 64) / (displayLarge?.fontSize ?? 57)}`,
                letterSpacing: `${displayLarge?.letterSpacing ?? -0.25}em`,
                mb: 2,
              }}
            >
              Typography Scale
            </Typography>
            <Typography
              sx={{
                fontSize: titleMedium?.fontSize ?? 16,
                fontWeight: titleMedium?.fontWeight ?? 500,
                lineHeight: `${(titleMedium?.lineHeight ?? 24) / (titleMedium?.fontSize ?? 16)}`,
                letterSpacing: `${titleMedium?.letterSpacing ?? 0.15}em`,
                color: 'text.secondary',
              }}
            >
              Material Design 3 · Type Scale Generator
            </Typography>
          </Box>

          <Box sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 2, md: 3 } }}>
            <Typography
              sx={{
                fontSize: bodyLarge?.fontSize ?? 16,
                fontWeight: bodyLarge?.fontWeight ?? 400,
                lineHeight: `${(bodyLarge?.lineHeight ?? 24) / (bodyLarge?.fontSize ?? 16)}`,
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
                fontSize: bodyMedium?.fontSize ?? 14,
                fontWeight: bodyMedium?.fontWeight ?? 400,
                lineHeight: `${(bodyMedium?.lineHeight ?? 20) / (bodyMedium?.fontSize ?? 14)}`,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { config } = useThemeStore();

  const styles = useMemo(
    () => generateTypeScale(config.typography),
    [config.typography.baseSize, config.typography.scale]
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
