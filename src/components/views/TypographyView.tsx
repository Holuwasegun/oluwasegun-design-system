'use client';

import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
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
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkIcon from '@mui/icons-material/Link';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useThemeStore } from '@/store';
import {
  generateTypeScale,
  TYPOGRAPHY_SCALES,
  DEFAULT_FONT_WEIGHTS,
  type TypeStyle,
  type FontWeightsConfig,
} from '@/theme/scheme';
import {
  GOOGLE_FONTS,
  FONT_CATEGORIES,
  type FontCategory,
  getGoogleFontUrl,
} from '@/theme/google-fonts';

const DEFAULT_FONT = 'Inter';

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

const SCALE_STEP_DEFINITIONS = [
  { key: '7XL', label: '7XL', defaultRem: 4.5, defaultPx: 72, desc: 'Ultra Display / Splash' },
  { key: '6XL', label: '6XL', defaultRem: 3.75, defaultPx: 60, desc: 'Hero Mega Titles' },
  { key: '5XL', label: '5XL', defaultRem: 3.0, defaultPx: 48, desc: 'Display Large' },
  { key: '4XL', label: '4XL', defaultRem: 2.25, defaultPx: 36, desc: 'Display Medium / H1' },
  { key: '3XL', label: '3XL', defaultRem: 1.875, defaultPx: 30, desc: 'Headline Large / H2' },
  { key: '2XL', label: '2XL', defaultRem: 1.5, defaultPx: 24, desc: 'Headline Medium / H3' },
  { key: 'XL', label: 'XL', defaultRem: 1.25, defaultPx: 20, desc: 'Title Large / Lead' },
  { key: 'LG', label: 'LG', defaultRem: 1.125, defaultPx: 18, desc: 'Title Medium / Body Lead' },
  { key: 'BASE', label: 'BASE', defaultRem: 1.0, defaultPx: 16, desc: 'Body Default' },
  { key: 'SM', label: 'SM', defaultRem: 0.875, defaultPx: 14, desc: 'Body Small / UI Text' },
  { key: 'XS', label: 'XS', defaultRem: 0.75, defaultPx: 12, desc: 'Caption / Badge / Label' },
];

const PRESET_SAMPLE_TEXTS = [
  { label: 'Headline', text: 'Build Next-Gen UI Design Systems' },
  { label: 'Pangram', text: 'The quick brown fox jumps over the lazy dog' },
  { label: 'Paragraph', text: 'Material Design 3 provides a comprehensive type scale system that helps establish visual hierarchy and readability across digital products.' },
  { label: 'Numbers & Symbols', text: '$1,234,567.89 · 0123456789 · @ # % & * ( ) + = /' },
];

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

// ==========================================
// 1. TOP PILL SWITCH (Typography | Preview)
// ==========================================
function TypographyTopNav({
  activeTab,
  onTabChange,
}: {
  activeTab: 'typography' | 'preview';
  onTabChange: (tab: 'typography' | 'preview') => void;
}) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        p: 0.5,
        borderRadius: 9999,
        bgcolor: 'action.hover',
        border: '1px solid',
        borderColor: 'divider',
        gap: 0.5,
        mb: { xs: 2.5, sm: 3.5 },
      }}
    >
      <Button
        size="small"
        onClick={() => onTabChange('typography')}
        startIcon={<TextFieldsIcon sx={{ fontSize: 18 }} />}
        sx={{
          borderRadius: 9999,
          px: { xs: 2, sm: 2.5 },
          py: 0.75,
          textTransform: 'none',
          fontWeight: 700,
          fontSize: { xs: '0.8125rem', sm: '0.875rem' },
          bgcolor: activeTab === 'typography' ? 'grey.900' : 'transparent',
          color: activeTab === 'typography' ? '#fff' : 'text.secondary',
          boxShadow: activeTab === 'typography' ? 1 : 0,
          '&:hover': {
            bgcolor: activeTab === 'typography' ? 'grey.800' : 'action.selected',
          },
        }}
      >
        Typography
      </Button>

      <Button
        size="small"
        onClick={() => onTabChange('preview')}
        startIcon={<VisibilityIcon sx={{ fontSize: 18 }} />}
        sx={{
          borderRadius: 9999,
          px: { xs: 2, sm: 2.5 },
          py: 0.75,
          textTransform: 'none',
          fontWeight: 700,
          fontSize: { xs: '0.8125rem', sm: '0.875rem' },
          bgcolor: activeTab === 'preview' ? 'grey.900' : 'transparent',
          color: activeTab === 'preview' ? '#fff' : 'text.secondary',
          boxShadow: activeTab === 'preview' ? 1 : 0,
          '&:hover': {
            bgcolor: activeTab === 'preview' ? 'grey.800' : 'action.selected',
          },
        }}
      >
        Preview
      </Button>
    </Box>
  );
}

// ==========================================
// 2. FONT CONTROLS
// ==========================================
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
    <Card sx={{ mb: { xs: 3, sm: 4 }, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 1.5, mb: { xs: 2, sm: 3 } }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
              Font Family
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select a Google Font or upload custom web font files (.woff2, .woff, .ttf, .otf)
            </Typography>
          </Box>
          {currentFont !== DEFAULT_FONT && (
            <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={handleReset} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Reset Font
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '280px 1fr' }, gap: { xs: 2, sm: 3 }, alignItems: 'start' }}>
          <Box
            sx={{
              bgcolor: 'background.default',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              p: { xs: 2, md: 3 },
              textAlign: 'center',
              minHeight: { xs: 120, sm: 150, md: 200 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontFamily: currentFontFamily, fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }, fontWeight: 700, mb: 1, lineHeight: 1.2, wordBreak: 'break-word' }}>
              Aa
            </Typography>
            <Typography sx={{ fontFamily: currentFontFamily, fontSize: '0.925rem', fontWeight: 700, color: 'text.primary', mb: 0.5, wordBreak: 'break-word' }}>
              {currentFont}
            </Typography>
            <Typography sx={{ fontFamily: currentFontFamily, fontSize: '0.75rem', color: 'text.secondary', wordBreak: 'break-word' }}>
              The quick brown fox jumps over the lazy dog
            </Typography>
          </Box>

          <Box>
            <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 0.75 }, mb: { xs: 1.5, sm: 2 }, flexWrap: 'wrap' }}>
              {FONT_CATEGORIES.map((cat) => (
                <Chip
                  key={cat}
                  label={cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  size="small"
                  onClick={() => setCategory(cat)}
                  color={category === cat ? 'primary' : 'default'}
                  variant={category === cat ? 'filled' : 'outlined'}
                  sx={{ textTransform: 'capitalize', fontWeight: 600, borderRadius: 2 }}
                />
              ))}
            </Box>

            <TextField
              fullWidth
              size="small"
              placeholder="Search fonts by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ mb: { xs: 1.5, sm: 2 }, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

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

            <Box sx={{ mt: { xs: 2, sm: 2.5 }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, alignItems: { xs: 'stretch', sm: 'center' } }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CloudUploadIcon />}
                onClick={() => fileInputRef.current?.click()}
                sx={{ textTransform: 'none', borderRadius: 2, py: 0.75 }}
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
                  placeholder="Font family name"
                  value={customFontName}
                  onChange={(e) => setCustomFontName(e.target.value)}
                  sx={{ flex: 1, minWidth: 120, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                <Tooltip title="Load font from URL">
                  <span>
                    <IconButton size="small" onClick={handleUrlUpload} disabled={!customFontName.trim()} sx={{ bgcolor: 'action.hover', borderRadius: 2, p: 1 }}>
                      <LinkIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ==========================================
// 3. SCALE GENERATOR (Direct Input Fields, NO Sliders!)
// ==========================================
const SCALE_PRESETS = Object.entries(TYPOGRAPHY_SCALES).map(([key, v]) => ({
  key,
  label: v.label,
  value: v.value,
}));

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

  const handleBaseSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 8 && val <= 48) {
      setTypography({ baseSize: val });
    }
  };

  const handleBaseSizeStep = (delta: number) => {
    const next = Math.max(8, Math.min(48, baseSize + delta));
    setTypography({ baseSize: next });
  };

  const handleReset = () => {
    setTypography({ baseSize: 14, scale: 1.25 });
    setCustomScale('');
  };

  return (
    <Card sx={{ mb: { xs: 3, sm: 4 }, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 1.5, mb: { xs: 2, sm: 3 } }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
              Scale Generator
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Configure base font size and geometric scale ratio via clean numeric inputs
            </Typography>
          </Box>
          {(baseSize !== 14 || scale !== 1.25) && (
            <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={handleReset} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Reset Scale
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1.2fr 1fr' }, gap: { xs: 2, sm: 2.5, md: 3 } }}>
          {/* Base Size Input Box */}
          <Box sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 2.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary', display: 'block', mb: 1 }}>
              Base Size
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                type="number"
                value={baseSize}
                onChange={handleBaseSizeChange}
                slotProps={{
                  htmlInput: { min: 8, max: 48, step: 1 },
                  input: {
                    endAdornment: <InputAdornment position="end">px</InputAdornment>,
                  },
                }}
                size="small"
                fullWidth
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper' } }}
              />
              <IconButton size="small" onClick={() => handleBaseSizeStep(-1)} sx={{ bgcolor: 'action.hover', borderRadius: 1.5 }}>
                <RemoveIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={() => handleBaseSizeStep(1)} sx={{ bgcolor: 'action.hover', borderRadius: 1.5 }}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Standard root font size (default: 14px)
            </Typography>
          </Box>

          {/* Scale Preset Input Box */}
          <Box sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 2.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary', display: 'block', mb: 1 }}>
              Scale Factor Preset
            </Typography>
            <Autocomplete
              options={SCALE_PRESETS}
              value={matchedPreset ?? null}
              onChange={handlePresetChange}
              getOptionLabel={(opt) => opt.label}
              isOptionEqualToValue={(opt, val) => opt.value === val.value}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select ratio preset..." size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper' } }} />
              )}
              slotProps={{ paper: { sx: { maxHeight: 300, borderRadius: 2 } } }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Active ratio: <strong>{scale}x</strong>
            </Typography>
          </Box>

          {/* Custom Scale Factor Input Box */}
          <Box sx={{ p: { xs: 2, sm: 2.5 }, borderRadius: 2.5, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', gridColumn: { xs: 'span 1', sm: 'span 2', md: 'span 1' } }}>
            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary', display: 'block', mb: 1 }}>
              Custom Scale Factor
            </Typography>
            <TextField
              fullWidth
              size="small"
              type="number"
              placeholder="e.g. 1.333"
              value={customScale || scale}
              onChange={handleCustomScaleChange}
              slotProps={{
                htmlInput: { min: 0.5, max: 3, step: 0.001 },
                input: {
                  endAdornment: <InputAdornment position="end">ratio</InputAdornment>,
                },
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper' } }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Type any custom geometric multiplier
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ==========================================
// 4. FONT SCALE SIZES (Step sizes: 7XL, 6XL, 5XL, 4XL, 3XL, etc. with clean input fields)
// ==========================================
function FontScaleSizes({
  baseSize,
  scale,
}: {
  baseSize: number;
  scale: number;
  fontFamily: string;
}) {
  const { config, setTypography } = useThemeStore();
  const fontSizeOverrides = config.typography.fontSizeOverrides ?? {};

  const handleStepSizeChange = (key: string, valueStr: string) => {
    let num = parseFloat(valueStr);
    if (valueStr.endsWith('rem')) {
      num = parseFloat(valueStr) * 16;
    }
    if (!isNaN(num) && num > 0) {
      setTypography({
        fontSizeOverrides: {
          ...fontSizeOverrides,
          [key]: num,
        },
      });
    }
  };

  const handleResetStep = (key: string) => {
    const next = { ...fontSizeOverrides };
    delete next[key];
    setTypography({ fontSizeOverrides: next });
  };

  const handleResetAllSteps = () => {
    setTypography({ fontSizeOverrides: {} });
  };

  const hasAnyStepOverride = Object.keys(fontSizeOverrides).length > 0;

  return (
    <Card sx={{ mb: { xs: 3, sm: 4 }, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 1.5, mb: { xs: 2, sm: 3 } }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
              Font Scale Sizes
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Input and customize font size values across the responsive type scale
            </Typography>
          </Box>
          {hasAnyStepOverride && (
            <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={handleResetAllSteps} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Reset Scale Sizes
            </Button>
          )}
        </Box>

        {/* 2-Column Responsive Grid as demonstrated in the user's reference mockup */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: { xs: 1.5, sm: 2, md: 2.5 },
          }}
        >
          {SCALE_STEP_DEFINITIONS.map((stepDef, idx) => {
            // Compute dynamic size based on step index from middle or use default rem
            const dynamicPx = Math.round(baseSize * Math.pow(scale, (SCALE_STEP_DEFINITIONS.length - 1 - idx) - 4) * 100) / 100;
            const currentPx = fontSizeOverrides[stepDef.key] ?? dynamicPx;
            const currentRem = (currentPx / 16).toFixed(currentPx % 16 === 0 ? 1 : 3).replace(/\.?0+$/, '') + 'rem';
            const isOverridden = stepDef.key in fontSizeOverrides;

            return (
              <Box
                key={stepDef.key}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2.5,
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: isOverridden ? 'primary.main' : 'divider',
                  transition: 'all 0.2s',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'text.secondary',
                    }}
                  >
                    {stepDef.label}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.disabled', fontSize: '0.75rem' }}>
                      {currentPx.toFixed(1)}px
                    </Typography>
                    {isOverridden && (
                      <IconButton size="small" onClick={() => handleResetStep(stepDef.key)} sx={{ p: 0.25 }}>
                        <RestartAltIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    )}
                  </Box>
                </Box>

                <TextField
                  fullWidth
                  size="small"
                  value={isOverridden ? `${(currentPx / 16).toFixed(3)}rem` : currentRem}
                  onChange={(e) => handleStepSizeChange(stepDef.key, e.target.value)}
                  placeholder={`${(dynamicPx / 16).toFixed(2)}rem`}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

// ==========================================
// 5. FONT WEIGHTS (Direct Input Fields, as in screenshot!)
// ==========================================
const WEIGHT_CONFIG_FIELDS: { key: keyof FontWeightsConfig; label: string; defaultVal: number }[] = [
  { key: 'light', label: 'LIGHT', defaultVal: 300 },
  { key: 'regular', label: 'REGULAR', defaultVal: 400 },
  { key: 'medium', label: 'MEDIUM', defaultVal: 500 },
  { key: 'semibold', label: 'SEMIBOLD', defaultVal: 600 },
  { key: 'bold', label: 'BOLD', defaultVal: 700 },
  { key: 'extrabold', label: 'EXTRABOLD', defaultVal: 800 },
];

function FontWeightsSection() {
  const { config, setTypography } = useThemeStore();
  const weights = config.typography.weights ?? DEFAULT_FONT_WEIGHTS;

  const handleWeightChange = (key: keyof FontWeightsConfig, valueStr: string) => {
    const num = parseInt(valueStr, 10);
    if (!isNaN(num) && num >= 100 && num <= 1000) {
      setTypography({
        weights: {
          ...weights,
          [key]: num,
        },
      });
    }
  };

  const handleResetWeights = () => {
    setTypography({ weights: { ...DEFAULT_FONT_WEIGHTS } });
  };

  const isCustomized = Object.keys(DEFAULT_FONT_WEIGHTS).some(
    (k) => weights[k as keyof FontWeightsConfig] !== DEFAULT_FONT_WEIGHTS[k as keyof FontWeightsConfig]
  );

  return (
    <Card sx={{ mb: { xs: 3, sm: 4 }, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 1.5, mb: { xs: 2, sm: 3 } }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
              Font Weights
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Set variable numeric font weights for light, regular, medium, semibold, bold, and extrabold
            </Typography>
          </Box>
          {isCustomized && (
            <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={handleResetWeights} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Reset Weights
            </Button>
          )}
        </Box>

        {/* 2-Column Responsive Grid matching the screenshot */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: { xs: 1.5, sm: 2, md: 2.5 },
          }}
        >
          {WEIGHT_CONFIG_FIELDS.map((wf) => {
            const currentVal = weights[wf.key] ?? wf.defaultVal;

            return (
              <Box
                key={wf.key}
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  borderRadius: 2.5,
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'text.secondary',
                    display: 'block',
                    mb: 0.75,
                  }}
                >
                  {wf.label}
                </Typography>

                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={currentVal}
                  onChange={(e) => handleWeightChange(wf.key, e.target.value)}
                  slotProps={{
                    htmlInput: { min: 100, max: 1000, step: 50 },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

// ==========================================
// 6. LETTER SPACING (TRACKING) (Direct Input Fields, NO Sliders!)
// ==========================================
function TrackingControls({ styles }: { styles: TypeStyle[] }) {
  const { config, setTypography } = useThemeStore();
  const overrides = config.typography.letterSpacingOverrides ?? {};

  const handleChange = (styleName: string, valueStr: string) => {
    const num = parseFloat(valueStr);
    if (!isNaN(num)) {
      setTypography({
        letterSpacingOverrides: { ...overrides, [styleName]: num },
      });
    }
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
    <Card sx={{ mb: { xs: 3, sm: 4 }, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 1.5, mb: { xs: 2, sm: 3 } }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
              Letter Spacing (Tracking)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Input custom letter spacing values in em units for each style level
            </Typography>
          </Box>
          {hasAnyOverride && (
            <Button variant="outlined" size="small" startIcon={<RestartAltIcon />} onClick={handleResetAll} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Reset All
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: { xs: 1.5, sm: 2 } }}>
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
                  borderColor: isOverridden ? 'primary.main' : 'divider',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, gap: 1, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip label={FAMILY_LABELS[style.family]} size="small" color={FAMILY_COLORS[style.family]} variant="outlined" sx={{ minWidth: 64, fontWeight: 600, fontSize: 10 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {style.name}
                    </Typography>
                    {isOverridden && <Chip label="custom" size="small" color="warning" variant="filled" sx={{ height: 18, fontSize: 9 }} />}
                  </Box>
                  {isOverridden && (
                    <Button size="small" onClick={() => handleReset(style.name)} sx={{ minWidth: 0, px: 1, py: 0.25, textTransform: 'none', fontSize: 11 }}>
                      Reset
                    </Button>
                  )}
                </Box>

                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  value={currentVal}
                  onChange={(e) => handleChange(style.name, e.target.value)}
                  slotProps={{
                    htmlInput: { min: -0.5, max: 1.5, step: 0.01 },
                    input: {
                      endAdornment: <InputAdornment position="end">em</InputAdornment>,
                    },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper', fontFamily: 'monospace' } }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

// ==========================================
// 7. TYPE SCALE TABLE & CARDS (Preview Mode)
// ==========================================
function ScaleTable({
  styles,
  fontFamily,
  onCopy,
}: {
  styles: TypeStyle[];
  fontFamily: string;
  onCopy: (text: string) => void;
}) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: 'action.hover' }}>
            <TableCell sx={{ fontWeight: 700 }}>Style</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Preview</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Font Size</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Line Height</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Weight</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="right">Tracking</TableCell>
            <TableCell sx={{ fontWeight: 700 }} align="center">Copy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {styles.map((style) => {
            const displaySize = Math.min(style.fontSize, 32);
            const rowHeight = Math.max(displaySize * 1.35, 48);
            const cssSnippet = `font-family: '${fontFamily}', sans-serif;\nfont-size: ${style.fontSize}px;\nfont-weight: ${style.fontWeight};\nline-height: ${style.lineHeight}px;\nletter-spacing: ${style.letterSpacing}em;`;

            return (
              <TableRow key={style.name} hover sx={{ height: rowHeight }}>
                <TableCell sx={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip label={FAMILY_LABELS[style.family]} size="small" color={FAMILY_COLORS[style.family]} variant="outlined" sx={{ minWidth: 70, fontWeight: 600, fontSize: 11 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                      {style.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ verticalAlign: 'middle', overflow: 'hidden' }}>
                  <Typography
                    noWrap
                    sx={{
                      fontFamily: `'${fontFamily}', sans-serif`,
                      fontSize: displaySize,
                      fontWeight: style.fontWeight,
                      lineHeight: 1.3,
                      letterSpacing: `${style.letterSpacing}em`,
                      maxWidth: 340,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    The quick brown fox jumps
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                    {style.fontSize.toFixed(1)}px
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                    {style.lineHeight}px
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>
                    {style.fontWeight}
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ verticalAlign: 'middle' }}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', fontVariantNumeric: 'tabular-nums' }}>
                    {style.letterSpacing}em
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'middle' }}>
                  <Tooltip title="Copy CSS Snippet">
                    <IconButton size="small" onClick={() => onCopy(cssSnippet)}>
                      <ContentCopyIcon fontSize="small" sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ScaleCards({
  styles,
  fontFamily,
  onCopy,
}: {
  styles: TypeStyle[];
  fontFamily: string;
  onCopy: (text: string) => void;
}) {
  return (
    <Stack spacing={{ xs: 1.5, sm: 2 }}>
      {styles.map((style) => {
        const displaySize = Math.min(style.fontSize, 26);
        const cssSnippet = `font-family: '${fontFamily}', sans-serif;\nfont-size: ${style.fontSize}px;\nfont-weight: ${style.fontWeight};\nline-height: ${style.lineHeight}px;\nletter-spacing: ${style.letterSpacing}em;`;

        return (
          <Card key={style.name} variant="outlined" sx={{ borderRadius: 2.5 }}>
            <CardContent sx={{ p: { xs: 1.75, sm: 2 }, '&:last-child': { pb: { xs: 1.75, sm: 2 } } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                  <Chip label={FAMILY_LABELS[style.family]} size="small" color={FAMILY_COLORS[style.family]} variant="outlined" sx={{ fontWeight: 600, fontSize: 10 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {style.name}
                  </Typography>
                </Stack>
                <IconButton size="small" onClick={() => onCopy(cssSnippet)} sx={{ p: 0.5 }}>
                  <ContentCopyIcon sx={{ fontSize: 16 }} />
                </IconButton>
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
                The quick brown fox jumps over lazy dog
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
  );
}

// ==========================================
// 8. LIVE INTERACTIVE SPECIMEN & UI PREVIEW
// ==========================================
function LiveShowcase({
  styles,
  fontFamily,
}: {
  styles: TypeStyle[];
  fontFamily: string;
}) {
  const [customText, setCustomText] = useState('The quick brown fox jumps over the lazy dog');
  const ff = `'${fontFamily}', sans-serif`;

  const byName = useMemo(() => {
    const map = new Map<string, TypeStyle>();
    for (const s of styles) map.set(s.name, s);
    return map;
  }, [styles]);

  const displayLarge = byName.get('Display Large');
  const headlineLarge = byName.get('Headline Large');
  const headlineMedium = byName.get('Headline Medium');
  const titleMedium = byName.get('Title Medium');
  const bodyLarge = byName.get('Body Large');
  const bodyMedium = byName.get('Body Medium');
  const bodySmall = byName.get('Body Small');
  const labelLarge = byName.get('Label Large');
  const labelSmall = byName.get('Label Small');

  return (
    <Box sx={{ mt: 2 }}>
      {/* Sample Text Playground */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
                Interactive Specimen Playground
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Type custom text to preview across your active font and scale tokens
              </Typography>
            </Box>
          </Box>

          <TextField
            fullWidth
            size="small"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Type sample text..."
            sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />

          <Box sx={{ display: 'flex', gap: 0.75, mb: 3, flexWrap: 'wrap' }}>
            {PRESET_SAMPLE_TEXTS.map((p) => (
              <Chip
                key={p.label}
                label={p.label}
                size="small"
                onClick={() => setCustomText(p.text)}
                variant={customText === p.text ? 'filled' : 'outlined'}
                color={customText === p.text ? 'primary' : 'default'}
                sx={{ borderRadius: 2, fontWeight: 600 }}
              />
            ))}
          </Box>

          {/* Render sample in key tiers */}
          <Stack spacing={3}>
            {styles.map((style) => (
              <Box key={style.name} sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Chip label={style.name} size="small" sx={{ fontSize: 10, height: 20, fontWeight: 700 }} />
                  <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                    {style.fontSize.toFixed(1)}px · w{style.fontWeight} · lh {style.lineHeight}px
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: ff,
                    fontSize: { xs: Math.min(style.fontSize, 28), md: style.fontSize },
                    fontWeight: style.fontWeight,
                    lineHeight: style.lineHeight / (style.fontSize || 16),
                    letterSpacing: `${style.letterSpacing}em`,
                    wordBreak: 'break-word',
                  }}
                >
                  {customText}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Real-World UI Mockup Showcase */}
      <Card sx={{ mb: { xs: 3, sm: 4 }, borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
            Real-World UI Preview
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.2fr 0.8fr' }, gap: { xs: 2, sm: 3 } }}>
            {/* Hero Mockup */}
            <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderRadius: 3, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
              <Chip
                label="DESIGN SYSTEM SPECIMEN"
                size="small"
                color="primary"
                sx={{
                  fontFamily: ff,
                  fontSize: labelSmall?.fontSize ? `${labelSmall.fontSize}px` : '0.75rem',
                  fontWeight: 700,
                  letterSpacing: `${labelSmall?.letterSpacing ?? 0.5}em`,
                  mb: 2,
                }}
              />
              <Typography
                sx={{
                  fontFamily: ff,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: `${displayLarge?.fontSize ?? 48}px` },
                  fontWeight: displayLarge?.fontWeight ?? 700,
                  lineHeight: 1.2,
                  letterSpacing: `${displayLarge?.letterSpacing ?? -0.25}em`,
                  mb: 1.5,
                }}
              >
                Precision Typography for Modern Apps
              </Typography>
              <Typography
                sx={{
                  fontFamily: ff,
                  fontSize: { xs: '0.875rem', sm: `${bodyLarge?.fontSize ?? 16}px` },
                  fontWeight: bodyLarge?.fontWeight ?? 400,
                  lineHeight: 1.6,
                  letterSpacing: `${bodyLarge?.letterSpacing ?? 0.5}em`,
                  color: 'text.secondary',
                  mb: 3,
                }}
              >
                Material Design 3 type scales ensure balanced hierarchy and rhythm across desktop, tablet, and mobile displays.
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: ff,
                    fontSize: labelLarge?.fontSize ? `${labelLarge.fontSize}px` : '0.875rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 3,
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    fontFamily: ff,
                    fontSize: labelLarge?.fontSize ? `${labelLarge.fontSize}px` : '0.875rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    borderRadius: 2,
                    px: 2.5,
                  }}
                >
                  Documentation
                </Button>
              </Stack>
            </Box>

            {/* Feature & Stats Card */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                <Typography
                  sx={{
                    fontFamily: ff,
                    fontSize: `${headlineMedium?.fontSize ?? 24}px`,
                    fontWeight: headlineMedium?.fontWeight ?? 700,
                    lineHeight: 1.3,
                    mb: 1,
                  }}
                >
                  Harmonious Proportions
                </Typography>
                <Typography
                  sx={{
                    fontFamily: ff,
                    fontSize: `${bodyMedium?.fontSize ?? 14}px`,
                    fontWeight: bodyMedium?.fontWeight ?? 400,
                    lineHeight: 1.6,
                    color: 'text.secondary',
                  }}
                >
                  Calculated from a single base unit with mathematical scaling ratios.
                </Typography>
              </Box>

              <Box sx={{ p: 2.5, borderRadius: 3, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                <Typography
                  sx={{
                    fontFamily: ff,
                    fontSize: `${headlineLarge?.fontSize ?? 32}px`,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    color: 'primary.main',
                    mb: 0.5,
                  }}
                >
                  99.9%
                </Typography>
                <Typography
                  sx={{
                    fontFamily: ff,
                    fontSize: `${titleMedium?.fontSize ?? 16}px`,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  WCAG Accessibility AA/AAA
                </Typography>
                <Typography
                  sx={{
                    fontFamily: ff,
                    fontSize: `${bodySmall?.fontSize ?? 12}px`,
                    fontWeight: 400,
                    color: 'text.secondary',
                  }}
                >
                  Tested against light and dark background contrast targets.
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

// ==========================================
// 9. MAIN TYPOGRAPHY VIEW
// ==========================================
export default function TypographyView() {
  const { config } = useThemeStore();
  const fontFamily = config.typography.fontFamily ?? DEFAULT_FONT;
  const [activeTab, setActiveTab] = useState<'typography' | 'preview'>('typography');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const styles = useMemo(
    () => generateTypeScale(config.typography),
    [config.typography]
  );

  useEffect(() => {
    const gf = GOOGLE_FONTS.find((f) => f.name === fontFamily);
    if (gf) loadGoogleFont(gf.name, gf.weights);
  }, [fontFamily]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setToastMessage('CSS tokens copied to clipboard!');
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2.5, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.35rem', sm: '2rem', md: '2.125rem' }, mb: 0.75 }}>
          Typography
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
          Material Design 3 type scale with live input-driven generator and custom font support
        </Typography>
      </Box>

      {/* Top Pill Navigation Tabs */}
      <TypographyTopNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'typography' ? (
        <>
          {/* Font Family Selection */}
          <FontControls />

          {/* Scale & Base Size Generator (Clean inputs, NO sliders) */}
          <ScaleControls />

          {/* Font Scale Sizes (7XL, 6XL, 5XL, 4XL, 3XL, etc. matching user screenshot) */}
          <FontScaleSizes baseSize={config.typography.baseSize} scale={config.typography.scale} fontFamily={fontFamily} />

          {/* Font Weights (Clean 2-column input fields matching user screenshot) */}
          <FontWeightsSection />

          {/* Letter Spacing (Tracking) (Direct numeric inputs, NO sliders) */}
          <TrackingControls styles={styles} />

          {/* Quick Preview Table */}
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
            Type Scale Preview
          </Typography>
          <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <ScaleTable styles={styles} fontFamily={fontFamily} onCopy={handleCopy} />
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <ScaleCards styles={styles} fontFamily={fontFamily} onCopy={handleCopy} />
            </Box>
          </Box>
        </>
      ) : (
        /* Preview Tab: Comprehensive Live Showcase & Specimen */
        <>
          <Box sx={{ display: { xs: 'none', md: 'block' }, mb: 3 }}>
            <ScaleTable styles={styles} fontFamily={fontFamily} onCopy={handleCopy} />
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 3 }}>
            <ScaleCards styles={styles} fontFamily={fontFamily} onCopy={handleCopy} />
          </Box>
          <LiveShowcase styles={styles} fontFamily={fontFamily} />
        </>
      )}

      <Snackbar
        open={Boolean(toastMessage)}
        autoHideDuration={3000}
        onClose={() => setToastMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setToastMessage(null)} severity="success" sx={{ width: '100%', borderRadius: 2 }} icon={<CheckIcon fontSize="inherit" />}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
