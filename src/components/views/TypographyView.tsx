'use client';

import { useMemo, useEffect, useRef, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import UploadIcon from '@mui/icons-material/Upload';
import { useThemeStore } from '@/store';
import {
  generateTypeScale,
  TYPOGRAPHY_SCALES,
  DEFAULT_FONT_WEIGHTS,
  type TypeStyle,
  type FontWeightsConfig,
  type CustomFontEntry,
} from '@/theme/scheme';
import {
  GOOGLE_FONTS,
  getGoogleFontUrl,
} from '@/theme/google-fonts';
import { registerCustomFont, unregisterCustomFont, hasCustomFont } from '@/lib/font-cache';

const DEFAULT_FONT = 'Inter';
const DEFAULT_DISPLAY_FONT = 'Playfair Display';
const DEFAULT_MONO_FONT = 'JetBrains Mono';

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      const base64 = data.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadGoogleFont(fontName: string, weights: number[]) {
  if (hasCustomFont(fontName)) return;
  const id = `gf-${fontName.replace(/ /g, '-')}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  link.href = getGoogleFontUrl(fontName, weights);
  document.head.appendChild(link);
}

function getFontWeights(fontName: string): number[] {
  const font = GOOGLE_FONTS.find((f) => f.name === fontName);
  return font?.weights ?? [400];
}

const SANS_FONTS = GOOGLE_FONTS.filter((f) => f.category === 'sans-serif');
const DISPLAY_FONTS = GOOGLE_FONTS.filter((f) => f.category === 'serif' || f.category === 'display');
const MONO_FONTS = GOOGLE_FONTS.filter((f) => f.category === 'monospace');

const FONT_SIZE_STEPS = [
  { key: 'XS', label: 'XS', styleName: 'Label Small' },
  { key: 'SM', label: 'SM', styleName: 'Body Small' },
  { key: 'BASE', label: 'BASE', styleName: 'Body Large' },
  { key: 'LG', label: 'LG', styleName: 'Title Medium' },
  { key: 'XL', label: 'XL', styleName: 'Title Large' },
  { key: '2XL', label: '2XL', styleName: 'Headline Small' },
  { key: '3XL', label: '3XL', styleName: 'Headline Medium' },
  { key: '4XL', label: '4XL', styleName: 'Headline Large' },
  { key: '5XL', label: '5XL', styleName: 'Display Small' },
  { key: '6XL', label: '6XL', styleName: 'Display Medium' },
  { key: '7XL', label: '7XL', styleName: 'Display Large' },
] as const;

const WEIGHT_FIELDS = [
  { key: 'light', label: 'LIGHT' },
  { key: 'regular', label: 'REGULAR' },
  { key: 'medium', label: 'MEDIUM' },
  { key: 'semibold', label: 'SEMIBOLD' },
  { key: 'bold', label: 'BOLD' },
  { key: 'extrabold', label: 'EXTRABOLD' },
] as const;

const SCALE_PRESETS = Object.entries(TYPOGRAPHY_SCALES).map(([key, v]) => ({
  key,
  label: v.label,
  value: v.value,
}));

function FontFamilyCard() {
  const { config, setTypography, setCustomFont } = useThemeStore();
  const sansFont = config.typography.fontFamily ?? DEFAULT_FONT;
  const displayFont = config.typography.displayFontFamily ?? DEFAULT_DISPLAY_FONT;
  const monoFont = config.typography.monoFontFamily ?? DEFAULT_MONO_FONT;
   const customFonts = useMemo(() => config.typography.customFonts ?? [], [config.typography.customFonts]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadGoogleFont(sansFont, getFontWeights(sansFont));
  }, [sansFont]);

  useEffect(() => {
    loadGoogleFont(displayFont, getFontWeights(displayFont));
  }, [displayFont]);

  useEffect(() => {
    loadGoogleFont(monoFont, getFontWeights(monoFont));
  }, [monoFont]);

  useEffect(() => {
    for (const f of customFonts) {
      if (!hasCustomFont(f.name)) {
        registerCustomFont(f.name, f.base64);
      }
    }
  }, [customFonts]);

  const handleChange = (role: 'fontFamily' | 'displayFontFamily' | 'monoFontFamily') => (
    e: { target: { value: string } }
  ) => {
    setTypography({ [role]: e.target.value });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!['ttf', 'otf', 'woff', 'woff2'].includes(ext)) {
      setUploadError('Please upload a .ttf, .otf, .woff, or .woff2 file.');
      e.target.value = '';
      return;
    }

    setUploadError(null);

    try {
      const fontName = file.name.replace(/\.[^.]+$/, '');
      const base64 = await fileToBase64(file);

      registerCustomFont(fontName, base64);

      const entry: CustomFontEntry = { name: fontName, base64 };
      setCustomFont(entry);

      setTypography({ fontFamily: fontName });
    } catch {
      setUploadError('Failed to process font file.');
    }

    e.target.value = '';
  };

  const handleRemoveCustomFont = (fontName: string) => {
    const font = customFonts.find((f) => f.name === fontName);
    if (font) {
      unregisterCustomFont(font.name);
    }
    const rest = customFonts.filter((f) => f.name !== fontName);
    setTypography({ customFonts: rest });

    if (sansFont === fontName) setTypography({ fontFamily: DEFAULT_FONT });
    if (displayFont === fontName) setTypography({ displayFontFamily: DEFAULT_DISPLAY_FONT });
    if (monoFont === fontName) setTypography({ monoFontFamily: DEFAULT_MONO_FONT });
  };

  const allFontOptions = (category: 'sans-serif' | 'serif' | 'display' | 'monospace') => {
    const base = category === 'monospace' ? MONO_FONTS : category === 'sans-serif' ? SANS_FONTS : DISPLAY_FONTS;
    return [...base, ...customFonts.map((f) => ({ name: f.name, category: 'custom' as const, weights: [400], isCustom: true }))];
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 1.5, sm: 2 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
            Font Families
          </Typography>
          <Tooltip title="Upload custom font (TTF/OTF/WOFF/WOFF2)">
            <span>
              <IconButton size="small" onClick={handleUploadClick} sx={{ p: 0.5 }}>
                <UploadIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
        <input
          type="file"
          ref={fileInputRef}
          accept=".ttf,.otf,.woff,.woff2"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {uploadError && (
          <Typography variant="caption" color="error" sx={{ display: 'block', mb: 1 }}>
            {uploadError}
          </Typography>
        )}
        {customFonts.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 0.5, sm: 1 }, mb: { xs: 1, sm: 2 } }}>
            {customFonts.map((f) => (
              <Box key={f.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.5, borderRadius: 1, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                <Typography variant="caption" sx={{ fontFamily: f.name, fontWeight: 600 }}>
                  {f.name}
                </Typography>
                <IconButton size="small" onClick={() => handleRemoveCustomFont(f.name)} sx={{ p: 0, minWidth: 'auto' }}>
                  <Typography variant="caption" color="error" sx={{ fontSize: '1rem' }}>
                    ×
                  </Typography>
                </IconButton>
              </Box>
            ))}
          </Box>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary', display: 'block', mb: 0.75 }}>
              SANS
            </Typography>
            <Select
              value={sansFont}
              onChange={handleChange('fontFamily')}
              size="small"
              fullWidth
              displayEmpty
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper' } }}
            >
              {allFontOptions('sans-serif').map((font) => (
                <MenuItem key={font.name} value={font.name} sx={{ fontFamily: font.name }}>
                  {font.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary', display: 'block', mb: 0.75 }}>
              DISPLAY
            </Typography>
            <Select
              value={displayFont}
              onChange={handleChange('displayFontFamily')}
              size="small"
              fullWidth
              displayEmpty
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper' } }}
            >
              {allFontOptions('serif').map((font) => (
                <MenuItem key={font.name} value={font.name} sx={{ fontFamily: font.name }}>
                  {font.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary', display: 'block', mb: 0.75 }}>
              MONO
            </Typography>
            <Select
              value={monoFont}
              onChange={handleChange('monoFontFamily')}
              size="small"
              fullWidth
              displayEmpty
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper' } }}
            >
              {allFontOptions('monospace').map((font) => (
                <MenuItem key={font.name} value={font.name} sx={{ fontFamily: font.name }}>
                  {font.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function ScaleGeneratorCard({ onGenerate }: { onGenerate: () => void }) {
  const { config, setTypography } = useThemeStore();
  const { baseSize, scale } = config.typography;

  const handleBaseSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 8 && val <= 48) {
      setTypography({ baseSize: val });
    }
  };

  const handleScaleChange = (e: { target: { value: string } }) => {
    const preset = SCALE_PRESETS.find((p) => p.key === e.target.value);
    if (preset) {
      setTypography({ scale: preset.value });
    }
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' }, mb: { xs: 1.5, sm: 2 } }}>
          Scale Generator
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary', display: 'block', mb: 0.75 }}>
              Base Size (PX)
            </Typography>
            <TextField
              type="number"
              value={baseSize}
              onChange={handleBaseSizeChange}
              slotProps={{
                htmlInput: { min: 8, max: 48, step: 1 },
                input: { endAdornment: <InputAdornment position="end">px</InputAdornment> },
              }}
              size="small"
              fullWidth
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper' } }}
            />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary', display: 'block', mb: 0.75 }}>
              Scale Factor
            </Typography>
            <Select
              value={SCALE_PRESETS.find((p) => p.value === scale)?.key ?? ''}
              onChange={handleScaleChange}
              size="small"
              fullWidth
              displayEmpty
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: 'background.paper' } }}
            >
              {SCALE_PRESETS.map((preset) => (
                <MenuItem key={preset.key} value={preset.key}>
                  {preset.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Button variant="contained" onClick={onGenerate} sx={{ textTransform: 'none', borderRadius: 2, py: 1 }}>
            Generate Typography Scale
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

function ManualFontSizesCard() {
  const { config, setTypography } = useThemeStore();
  const fontSizeOverrides = config.typography.fontSizeOverrides ?? {};
  const baseSize = config.typography.baseSize;
  const scale = config.typography.scale;

  const styles = useMemo(() => generateTypeScale(config.typography), [config.typography]);
  const styleMap = useMemo(() => {
    const map = new Map<string, TypeStyle>();
    for (const s of styles) map.set(s.name, s);
    return map;
  }, [styles]);

  const handleChange = (styleName: string, valueStr: string) => {
    const num = parseFloat(valueStr);
    if (!isNaN(num) && num > 0) {
      setTypography({
        fontSizeOverrides: {
          ...fontSizeOverrides,
          [styleName]: num,
        },
      });
    }
  };

  const handleReset = (styleName: string) => {
    const next = { ...fontSizeOverrides };
    delete next[styleName];
    setTypography({ fontSizeOverrides: next });
  };

  const handleResetAll = () => {
    setTypography({ fontSizeOverrides: {} });
  };

  const hasAnyOverride = Object.keys(fontSizeOverrides).length > 0;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 1.5, sm: 2 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
            Manual Font Sizes
          </Typography>
          {hasAnyOverride && (
            <IconButton size="small" onClick={handleResetAll} sx={{ p: 0.5 }}>
              <RestartAltIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 1.5, sm: 2 } }}>
          {FONT_SIZE_STEPS.map((step) => {
            const style = styleMap.get(step.styleName);
            const currentPx = fontSizeOverrides[step.styleName] ?? style?.fontSize ?? Math.round(baseSize * Math.pow(scale, 1) * 100) / 100;
            const isOverridden = step.styleName in fontSizeOverrides;

            return (
              <Box key={step.key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary' }}>
                    {step.label}
                  </Typography>
                  {isOverridden && (
                    <IconButton size="small" onClick={() => handleReset(step.styleName)} sx={{ p: 0.25, ml: 0.5 }}>
                      <RestartAltIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  )}
                </Box>
                <TextField
                  type="number"
                  value={currentPx}
                  onChange={(e) => handleChange(step.styleName, e.target.value)}
                  slotProps={{
                    htmlInput: { min: 1, max: 200, step: 1 },
                    input: { endAdornment: <InputAdornment position="end">px</InputAdornment> },
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
  );
}

function FontWeightsCard() {
  const { config, setTypography } = useThemeStore();
  const weights = config.typography.weights ?? DEFAULT_FONT_WEIGHTS;

  const handleChange = (key: keyof FontWeightsConfig, valueStr: string) => {
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

  const handleReset = () => {
    setTypography({ weights: { ...DEFAULT_FONT_WEIGHTS } });
  };

  const isCustomized = Object.keys(DEFAULT_FONT_WEIGHTS).some(
    (k) => weights[k as keyof FontWeightsConfig] !== DEFAULT_FONT_WEIGHTS[k as keyof FontWeightsConfig]
  );

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 1.5, sm: 2 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
            Font Weights
          </Typography>
          {isCustomized && (
            <IconButton size="small" onClick={handleReset} sx={{ p: 0.5 }}>
              <RestartAltIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: { xs: 1.5, sm: 2 } }}>
          {WEIGHT_FIELDS.map((field) => {
            const currentVal = weights[field.key] ?? DEFAULT_FONT_WEIGHTS[field.key];
            return (
              <Box key={field.key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary' }}>
                  {field.label}
                </Typography>
                <TextField
                  type="number"
                  value={currentVal}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  slotProps={{ htmlInput: { min: 100, max: 1000, step: 50 } }}
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
  );
}

function LetterSpacingOverridesCard() {
  const { config, setTypography } = useThemeStore();
  const letterSpacingOverrides = useMemo(() => config.typography.letterSpacingOverrides ?? {}, [config.typography.letterSpacingOverrides]);
  const styles = useMemo(() => generateTypeScale(config.typography), [config.typography]);
  const styleMap = useMemo(() => {
    const map = new Map<string, TypeStyle>();
    for (const s of styles) map.set(s.name, s);
    return map;
  }, [styles]);

  const handleChange = (styleName: string, valueStr: string) => {
    const num = parseFloat(valueStr);
    if (!isNaN(num)) {
      setTypography({
        letterSpacingOverrides: {
          ...letterSpacingOverrides,
          [styleName]: num,
        },
      });
    }
  };

  const handleReset = (styleName: string) => {
    const next = { ...letterSpacingOverrides };
    delete next[styleName];
    setTypography({ letterSpacingOverrides: next });
  };

  const handleResetAll = () => {
    setTypography({ letterSpacingOverrides: {} });
  };

  const hasAnyOverride = Object.keys(letterSpacingOverrides).length > 0;

  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
      <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 }, '&:last-child': { pb: { xs: 2, sm: 3, md: 4 } } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: { xs: 1.5, sm: 2 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
            Letter Spacing (Tracking) Overrides
          </Typography>
          {hasAnyOverride && (
            <IconButton size="small" onClick={handleResetAll} sx={{ p: 0.5 }}>
              <RestartAltIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2 } }}>
          {FONT_SIZE_STEPS.map((step) => {
            const style = styleMap.get(step.styleName);
            const currentEm = letterSpacingOverrides[step.styleName] ?? style?.letterSpacing ?? 0;
            const isOverridden = step.styleName in letterSpacingOverrides;

            return (
              <Box key={step.key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'text.secondary' }}>
                    {step.label} ({step.styleName})
                  </Typography>
                  {isOverridden && (
                    <IconButton size="small" onClick={() => handleReset(step.styleName)} sx={{ p: 0.25, ml: 0.5 }}>
                      <RestartAltIcon sx={{ fontSize: 14 }} />
                    </IconButton>
                  )}
                </Box>
                <TextField
                  type="number"
                  value={currentEm}
                  onChange={(e) => handleChange(step.styleName, e.target.value)}
                  slotProps={{
                    htmlInput: { min: -0.5, max: 0.5, step: 0.01 },
                    input: { endAdornment: <InputAdornment position="end">em</InputAdornment> },
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
  );
}

function AestheticSpecimen({ styles, sansFont, displayFont, monoFont }: { styles: TypeStyle[]; sansFont: string; displayFont: string; monoFont: string }) {
  const byName = useMemo(() => {
    const map = new Map<string, TypeStyle>();
    for (const s of styles) map.set(s.name, s);
    return map;
  }, [styles]);

  const displayLarge = byName.get('Display Large');
  const bodyLarge = byName.get('Body Large');
  const labelLarge = byName.get('Label Large');

  return (
    <Box sx={{ position: { lg: 'sticky' }, top: { lg: '88px' }, alignSelf: 'start' }}>
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.05rem', sm: '1.25rem' }, mb: { xs: 1.5, sm: 2 } }}>
        Aesthetic Specimen
      </Typography>
      <Card sx={{ borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <CardContent sx={{ p: { xs: 2.5, sm: 3.5, md: 4 }, '&:last-child': { pb: { xs: 2.5, sm: 3.5, md: 4 } } }}>
          <Typography variant="overline" sx={{ fontWeight: 700, letterSpacing: '0.15em', color: 'text.secondary', display: 'block', mb: { xs: 2, sm: 3 } }}>
            TYPOGRAPHY PREVIEW
          </Typography>

          <Typography
            sx={{
              fontFamily: `'${displayFont}', serif`,
              fontSize: { xs: '1.5rem', sm: '2rem', md: displayLarge?.fontSize ? `${displayLarge.fontSize}px` : '2.5rem' },
              fontWeight: displayLarge?.fontWeight ?? 700,
              lineHeight: 1.2,
              letterSpacing: `${displayLarge?.letterSpacing ?? -0.25}em`,
              mb: { xs: 1.5, sm: 2 },
            }}
          >
            Rhythm, hierarchy, and clarity—generated from a single source of truth.
          </Typography>

          <Typography
            sx={{
              fontFamily: `'${sansFont}', sans-serif`,
              fontSize: { xs: '0.875rem', sm: '1rem', md: bodyLarge?.fontSize ? `${bodyLarge.fontSize}px` : '1rem' },
              fontWeight: bodyLarge?.fontWeight ?? 400,
              lineHeight: 1.6,
              letterSpacing: `${bodyLarge?.letterSpacing ?? 0.5}em`,
              color: 'text.secondary',
              mb: { xs: 2, sm: 3 },
            }}
          >
            This specimen is live. Change the scale, swap the typefaces, or tweak weights—everything here updates instantly to reflect your current token state.
          </Typography>

          <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1.5 }, flexWrap: 'wrap' }}>
            <Button variant="contained" sx={{ textTransform: 'none', borderRadius: 2, px: { xs: 2, sm: 3 } }}>
              Primary Specimen
            </Button>
            <Button variant="outlined" sx={{ textTransform: 'none', borderRadius: 2, px: { xs: 2, sm: 3 } }}>
              Learn More
            </Button>
          </Box>

          <Box sx={{ mt: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 3 }, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ fontFamily: `'${monoFont}', monospace`, color: 'text.secondary', display: 'block', mb: 0.5 }}>
              Mono: {monoFont}
            </Typography>
            <Typography variant="caption" sx={{ fontFamily: `'${monoFont}', monospace`, color: 'text.disabled' }}>
              {labelLarge ? `Label Large · ${labelLarge.fontSize.toFixed(1)}px · w${labelLarge.fontWeight}` : ''}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function TypographyView() {
  const { config } = useThemeStore();
  const sansFont = config.typography.fontFamily ?? DEFAULT_FONT;
  const displayFont = config.typography.displayFontFamily ?? DEFAULT_DISPLAY_FONT;
  const monoFont = config.typography.monoFontFamily ?? DEFAULT_MONO_FONT;

  const styles = useMemo(() => generateTypeScale(config.typography), [config.typography]);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleFont(sansFont, getFontWeights(sansFont));
  }, [sansFont]);

  useEffect(() => {
    loadGoogleFont(displayFont, getFontWeights(displayFont));
  }, [displayFont]);

  useEffect(() => {
    loadGoogleFont(monoFont, getFontWeights(monoFont));
  }, [monoFont]);

  const handleGenerate = () => {
    previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2.5, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.35rem', sm: '2rem', md: '2.125rem' }, mb: 0.75 }}>
          Typography
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '0.85rem', sm: '1rem' } }}>
          Material Design 3 type scale with live input-driven generator and custom font support
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: { xs: 3, md: 4 }, alignItems: 'start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 3 } }}>
          <FontFamilyCard />
          <ScaleGeneratorCard onGenerate={handleGenerate} />
           <ManualFontSizesCard />
           <LetterSpacingOverridesCard />
           <FontWeightsCard />
        </Box>

        <Box ref={previewRef}>
          <AestheticSpecimen styles={styles} sansFont={sansFont} displayFont={displayFont} monoFont={monoFont} />
        </Box>
      </Box>
    </Box>
  );
}
