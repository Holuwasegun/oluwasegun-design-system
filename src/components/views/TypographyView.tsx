'use client';

import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Slider,
  TextField,
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
  Tooltip,
  IconButton,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import { useThemeStore } from '@/store';
import {
  generateTypeScale,
  TYPOGRAPHY_SCALES,
  type TypeStyle,
} from '@/theme/scheme';
import {
  GOOGLE_FONTS,
  FONT_CATEGORIES,
  type FontCategory,
  getGoogleFontUrl,
} from '@/theme/google-fonts';

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

const DEFAULT_FONT = 'Inter';

function loadGoogleFont(fontName: string, weights: number[]) {
  const id = `gf-${fontName.replace(/ /g, '-')}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = getGoogleFontUrl(fontName, weights);
  document.head.appendChild(link);
}

function loadCustomFont(name: string, url: string) {
  const id = `custom-font-${name.replace(/ /g, '-')}`;
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = `@font-face { font-family: '${name}'; src: url('${url}'); font-display: swap; }`;
  document.head.appendChild(style);
}

// ---------- Font Controls ----------
function FontControls() {
  const { config, setTypography } = useThemeStore();
  const currentFont = config.typography.fontFamily ?? DEFAULT_FONT;
  const [category, setCategory] = useState<FontCategory>('all');
  const [search, setSearch] = useState('');
  const [customFontName, setCustomFontName] = useState('');
  const [customFonts, setCustomFonts] = useState<{ name: string; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFonts = useMemo(() => {
    let fonts = GOOGLE_FONTS;
    if (category !== 'all') {
      fonts = fonts.filter((f) => f.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      fonts = fonts.filter((f) => f.name.toLowerCase().includes(q));
    }
    return fonts;
  }, [category, search]);

  const fontOptions = useMemo(() => {
    const googleOpts = filteredFonts.map((f) => ({
      label: f.name,
      value: f.name,
      source: 'google' as const,
      category: f.category,
    }));
    const customOpts = customFonts.map((f) => ({
      label: `${f.name} (custom)`,
      value: f.name,
      source: 'custom' as const,
      category: 'custom' as const,
    }));
    return [...customOpts, ...googleOpts];
  }, [filteredFonts, customFonts]);

  const matchedOption = fontOptions.find((o) => o.value === currentFont) ?? null;

  const handleFontChange = useCallback((_e: unknown, option: { label: string; value: string } | null) => {
    if (option) {
      setTypography({ fontFamily: option.value });
      const gf = GOOGLE_FONTS.find((f) => f.name === option.value);
      if (gf) loadGoogleFont(gf.name, gf.weights);
    }
  }, [setTypography]);

  const handleCustomFontUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const name = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    const url = URL.createObjectURL(file);
    setCustomFonts((prev) => [...prev, { name, url }]);
    loadCustomFont(name, url);
    setTypography({ fontFamily: name });
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [setTypography]);

  const handleUrlUpload = useCallback(() => {
    if (!customFontName.trim()) return;
    const url = prompt('Enter the font file URL (.woff2, .woff, .ttf, .otf):');
    if (!url) return;
    setCustomFonts((prev) => [...prev, { name: customFontName.trim(), url }]);
    loadCustomFont(customFontName.trim(), url);
    setTypography({ fontFamily: customFontName.trim() });
    setCustomFontName('');
  }, [customFontName, setTypography]);

  const handleReset = () => setTypography({ fontFamily: DEFAULT_FONT });

  const currentFontFamily = `'${currentFont}', sans-serif`;

  return (
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 1.5, mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Font Family
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Choose from Google Fonts or upload your own font files
            </Typography>
          </Box>
          {currentFont !== DEFAULT_FONT && (
            <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={handleReset} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Reset
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '280px 1fr' }, gap: 3, alignItems: 'start' }}>
          {/* Left: Font preview */}
          <Box sx={{ bgcolor: 'grey.100', borderRadius: 3, p: { xs: 2.5, md: 3 }, textAlign: 'center', minHeight: { xs: 150, md: 200 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography sx={{ fontFamily: currentFontFamily, fontSize: { xs: '2rem', sm: '2.5rem' }, fontWeight: 700, mb: 1, lineHeight: 1.2, wordBreak: 'break-word' }}>
              Aa
            </Typography>
            <Typography sx={{ fontFamily: currentFontFamily, fontSize: '0.875rem', fontWeight: 600, color: 'text.secondary', mb: 0.5, wordBreak: 'break-word' }}>
              {currentFont}
            </Typography>
            <Typography sx={{ fontFamily: currentFontFamily, fontSize: '0.75rem', color: 'text.disabled', wordBreak: 'break-word' }}>
              The quick brown fox jumps over the lazy dog
            </Typography>
          </Box>

          {/* Right: Controls */}
          <Box>
            {/* Category filter chips */}
            <Box sx={{ display: 'flex', gap: 0.75, mb: 2, flexWrap: 'wrap' }}>
              {FONT_CATEGORIES.map((cat) => (
                <Chip
                  key={cat}
                  label={cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  size="small"
                  onClick={() => setCategory(cat)}
                  color={category === cat ? 'primary' : 'default'}
                  variant={category === cat ? 'filled' : 'outlined'}
                  sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                />
              ))}
            </Box>

            {/* Search */}
            <TextField
              fullWidth
              size="small"
              placeholder="Search fonts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            {/* Font selector */}
            <Autocomplete
              options={fontOptions}
              value={matchedOption}
              onChange={handleFontChange}
              getOptionLabel={(opt) => opt.label}
              isOptionEqualToValue={(opt, val) => opt.value === val.value}
              renderOption={(props, opt) => (
                <li {...props} key={opt.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Typography sx={{ fontFamily: `'${opt.value}', sans-serif` }}>{opt.label}</Typography>
                    <Chip label={opt.source === 'custom' ? 'custom' : opt.category} size="small" variant="outlined" sx={{ fontSize: 10, height: 20 }} />
                  </Box>
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select a font..." size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
              )}
              slotProps={{ paper: { sx: { maxHeight: 300, borderRadius: 2 } } }}
            />

            {/* Custom font upload */}
            <Box sx={{ mt: 2.5, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, alignItems: { xs: 'stretch', sm: 'center' } }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CloudUploadIcon />}
                onClick={() => fileInputRef.current?.click()}
                sx={{ textTransform: 'none', borderRadius: 2, width: { xs: '100%', sm: 'auto' }, py: 0.75 }}
              >
                Upload Font File
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".woff2,.woff,.ttf,.otf"
                onChange={handleCustomFontUpload}
                style={{ display: 'none' }}
              />
              <Typography variant="caption" color="text.disabled" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                or
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flex: 1 }}>
                <TextField
                  size="small"
                  placeholder="Font name"
                  value={customFontName}
                  onChange={(e) => setCustomFontName(e.target.value)}
                  sx={{ flex: 1, minWidth: 100, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <Tooltip title="Load font from URL">
                  <span>
                    <IconButton size="small" onClick={handleUrlUpload} disabled={!customFontName.trim()} sx={{ bgcolor: 'action.hover' }}>
                      <LinkIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Upload .woff2, .woff, .ttf, or .otf files, or load from a direct URL
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------- Letter Spacing ----------
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
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 1.5, mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Letter Spacing (Tracking)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Override per-style letter spacing values in em units
            </Typography>
          </Box>
          {hasAnyOverride && (
            <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={handleResetAll} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Reset All
            </Button>
          )}
        </Box>

        <Stack spacing={2}>
          {styles.map((style) => {
            const defaultVal = LETTER_SPACING_DEFAULTS[style.name] ?? 0;
            const currentVal = overrides[style.name] ?? defaultVal;
            const isOverridden = style.name in overrides;

            return (
              <Box
                key={style.name}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2.5,
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Chip label={FAMILY_LABELS[style.family]} size="small" color={FAMILY_COLORS[style.family]} variant="outlined" sx={{ minWidth: 64, fontWeight: 600, fontSize: 11 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>{style.name}</Typography>
                    {isOverridden && <Chip label="custom" size="small" color="warning" variant="filled" sx={{ height: 18, fontSize: 10 }} />}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums', fontWeight: 700, bgcolor: 'action.hover', px: 1, py: 0.25, borderRadius: 1 }}>
                      {currentVal.toFixed(2)}em
                    </Typography>
                    {isOverridden && (
                      <Button size="small" onClick={() => handleReset(style.name)} sx={{ minWidth: 0, px: 1, py: 0.25, textTransform: 'none', fontSize: 11 }}>
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
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>-0.5em</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>1.5em</Typography>
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

// ---------- Scale Controls ----------
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
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 1.5, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
            Scale Generator
          </Typography>
          <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={handleReset} sx={{ textTransform: 'none', borderRadius: 2 }}>
            Reset
          </Button>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: { xs: 2.5, sm: 3, md: 4 }, alignItems: 'start' }}>
          <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>Base Size</Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', mb: 1 }}>{baseSize}px</Typography>
            <Slider value={baseSize} min={10} max={24} step={1} onChange={(_e, val) => setTypography({ baseSize: val as number })} valueLabelDisplay="auto" valueLabelFormat={(v) => `${v}px`} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">10px</Typography>
              <Typography variant="caption" color="text.secondary">24px</Typography>
            </Box>
          </Box>

          <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>Scale Factor Preset</Typography>
            <Autocomplete options={SCALE_PRESETS} value={matchedPreset ?? null} onChange={handlePresetChange} getOptionLabel={(opt) => opt.label} isOptionEqualToValue={(opt, val) => opt.value === val.value} renderInput={(params) => <TextField {...params} placeholder="Select a scale..." size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />} slotProps={{ paper: { sx: { maxHeight: 300, borderRadius: 2 } } }} />
            <Typography variant="body2" sx={{ mt: 1, fontVariantNumeric: 'tabular-nums', color: 'text.secondary' }}>Current: <strong>{scale}</strong>x</Typography>
          </Box>

          <Box sx={{ p: 2, borderRadius: 2.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', gridColumn: { xs: 'span 1', sm: 'span 2', md: 'span 1' } }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1.5, color: 'text.secondary' }}>Custom Scale Factor</Typography>
            <TextField fullWidth size="small" placeholder="e.g. 1.414" value={customScale} onChange={handleCustomScaleChange} slotProps={{ htmlInput: { type: 'number', min: '0.5', max: '3', step: '0.001' } }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
            <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>Enter any positive number to override the preset</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------- Scale Table (Desktop) ----------
function ScaleTable({ styles, fontFamily }: { styles: TypeStyle[]; fontFamily: string }) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
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
                    <Chip label={FAMILY_LABELS[style.family]} size="small" color={FAMILY_COLORS[style.family]} variant="outlined" sx={{ minWidth: 72, fontWeight: 500 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>{style.size}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ verticalAlign: 'middle', overflow: 'hidden' }}>
                  <Typography noWrap sx={{ fontFamily: `'${fontFamily}', sans-serif`, fontSize: displaySize, fontWeight: style.fontWeight, lineHeight: 1.4, letterSpacing: `${style.letterSpacing}em`, maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {PREVIEW_TEXT}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>{style.fontSize.toFixed(1)}px</Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>{style.lineHeight}px</Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{style.fontWeight}</Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>{style.letterSpacing}em</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// ---------- Scale Cards (Mobile) ----------
function ScaleCards({ styles, fontFamily }: { styles: TypeStyle[]; fontFamily: string }) {
  return (
    <Box>
      <Stack spacing={2}>
        {styles.map((style) => {
          const displaySize = Math.min(style.fontSize, 24);
          return (
            <Card key={style.name} variant="outlined" sx={{ borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 2.5 }, '&:last-child': { pb: { xs: 2, sm: 2.5 } } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Chip label={FAMILY_LABELS[style.family]} size="small" color={FAMILY_COLORS[style.family]} variant="outlined" sx={{ fontWeight: 600, fontSize: 11 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'capitalize' }}>{style.name}</Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontWeight: 600 }}>
                    {style.fontSize.toFixed(1)}px / lh {style.lineHeight}px
                  </Typography>
                </Box>
                <Typography
                  noWrap
                  sx={{
                    fontFamily: `'${fontFamily}', sans-serif`,
                    fontSize: displaySize,
                    fontWeight: style.fontWeight,
                    lineHeight: 1.3,
                    letterSpacing: `${style.letterSpacing}em`,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    my: 1,
                  }}
                >
                  {PREVIEW_TEXT}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1.5 }}>
                  <Chip label={`Size: ${style.fontSize.toFixed(1)}px`} size="small" variant="outlined" sx={{ fontSize: 10, height: 22, fontFamily: 'monospace' }} />
                  <Chip label={`LH: ${style.lineHeight}px`} size="small" variant="outlined" sx={{ fontSize: 10, height: 22, fontFamily: 'monospace' }} />
                  <Chip label={`Weight: ${style.fontWeight}`} size="small" variant="outlined" sx={{ fontSize: 10, height: 22, fontFamily: 'monospace' }} />
                  <Chip label={`Tracking: ${style.letterSpacing}em`} size="small" variant="outlined" sx={{ fontSize: 10, height: 22, fontFamily: 'monospace' }} />
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}

// ---------- Live Preview ----------
function LivePreview({ styles, fontFamily }: { styles: TypeStyle[]; fontFamily: string }) {
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
  const ff = `'${fontFamily}', sans-serif`;

  return (
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
          Live Preview
        </Typography>

        <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ bgcolor: 'grey.100', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, sm: 4, md: 5 } }}>
            <Typography
              noWrap
              sx={{
                fontFamily: ff,
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: `${Math.min(displayLarge?.fontSize ?? 57, 57)}px` },
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
                fontFamily: ff,
                fontSize: { xs: '0.875rem', sm: '1rem', md: `${titleMedium?.fontSize ?? 16}px` },
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

          <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2.5, sm: 3 }, overflow: 'hidden' }}>
            <Typography sx={{ fontFamily: ff, fontSize: bodyLarge?.fontSize ?? 16, fontWeight: bodyLarge?.fontWeight ?? 400, lineHeight: 1.6, letterSpacing: `${bodyLarge?.letterSpacing ?? 0.5}em`, mb: 2 }}>
              Material Design 3 provides a comprehensive type scale system that helps establish visual hierarchy and readability across your application. Each style is carefully crafted for specific use cases.
            </Typography>
            <Typography sx={{ fontFamily: ff, fontSize: bodyMedium?.fontSize ?? 14, fontWeight: bodyMedium?.fontWeight ?? 400, lineHeight: 1.6, letterSpacing: `${bodyMedium?.letterSpacing ?? 0.25}em`, color: 'text.secondary', mb: 3 }}>
              The type scale is generated using a modular scale algorithm that produces harmonious size relationships between different text levels.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {labelLarge && ['Design', 'Typography', 'Material'].map((label) => (
                <Chip key={label} label={label} sx={{ fontFamily: ff, fontSize: labelLarge.fontSize, fontWeight: labelLarge.fontWeight, letterSpacing: `${labelLarge.letterSpacing}em`, height: 'auto' }} />
              ))}
            </Box>

            {labelSmall && (
              <Typography sx={{ fontFamily: ff, fontSize: labelSmall.fontSize, fontWeight: labelSmall.fontWeight, lineHeight: `${labelSmall.lineHeight / labelSmall.fontSize}`, letterSpacing: `${labelSmall.letterSpacing}em`, color: 'text.secondary', mt: 2 }}>
                Generated with {TYPOGRAPHY_SCALES['major-third'].label} · Base 14px
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------- Main Page ----------
export default function TypographyPage() {
  const { config } = useThemeStore();
  const fontFamily = config.typography.fontFamily ?? DEFAULT_FONT;

  const styles = useMemo(
    () => generateTypeScale(config.typography),
    [config.typography]
  );

  // Load the current font on mount
  useEffect(() => {
    const gf = GOOGLE_FONTS.find((f) => f.name === fontFamily);
    if (gf) loadGoogleFont(gf.name, gf.weights);
  }, [fontFamily]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}>
        Typography
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
        Material Design 3 type scale with live generator and custom font support
      </Typography>

      <FontControls />
      <ScaleControls />

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
        Letter Spacing Overrides
      </Typography>
      <TrackingControls styles={styles} />

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
        Type Scale Preview
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <ScaleTable styles={styles} fontFamily={fontFamily} />
        </Box>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <ScaleCards styles={styles} fontFamily={fontFamily} />
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      <LivePreview styles={styles} fontFamily={fontFamily} />
    </Box>
  );
}
