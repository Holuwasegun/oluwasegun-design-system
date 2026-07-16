'use client';

import { useState, useCallback, useRef } from 'react';
import {
  Box, Typography, Stack, TextField, Button, MenuItem, Snackbar, Alert,
  CircularProgress, IconButton, Chip, Divider, Tooltip, LinearProgress,
} from '@mui/material';
import {
  AutoAwesome as GenerateIcon,
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  FormatColorFill as ColorIcon,
  SwapHoriz as SwapIcon,
  ThumbUp as LikeIcon,
  ThumbDown as DislikeIcon,
  Download as DownloadIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useThemeStore } from '@/store';
import { generateSchemeFromConfig, generateTypeScale, generateSpacingScale } from '@/theme/scheme';

interface LayoutInput {
  heroImage?: string;
  primaryText: string;
  secondaryText: string;
  format: 'flyer-a5' | 'social-square' | 'banner-16x9';
  tokens: {
    colors: Record<string, string>;
    typography: { baseSize: number; scale: number; fontFamily?: string };
    spacing: { baseUnit: number };
  };
}

interface ColorUsage {
  background: string;
  text: string;
  accent: string;
  card: string;
}

interface LayoutSuggestion {
  id: string;
  name: string;
  description: string;
  layout: {
    type: string;
    heroPosition: string;
    textAlignment: string;
    colorUsage: ColorUsage;
    spacing: { padding: number; gap: number; borderRadius: number };
  };
}

interface GenerationResult {
  suggestions: LayoutSuggestion[];
  dimensions: { width: number; height: number; label: string };
  input: { primaryText: string; secondaryText: string; format: string; hasImage: boolean };
}

const FORMAT_OPTIONS = [
  { value: 'flyer-a5', label: 'Flyer (A5)', desc: '420 × 595px' },
  { value: 'social-square', label: 'Social Post (Square)', desc: '400 × 400px' },
  { value: 'banner-16x9', label: 'Banner (16:9)', desc: '640 × 360px' },
] as const;

const COLOR_KEYS = [
  { key: 'background', label: 'Background' },
  { key: 'text', label: 'Text' },
  { key: 'accent', label: 'Accent' },
  { key: 'card', label: 'Card' },
] as const;

const SCHEME_COLOR_OPTIONS = [
  'primary', 'onPrimary', 'primaryContainer', 'onPrimaryContainer',
  'secondary', 'onSecondary', 'secondaryContainer', 'onSecondaryContainer',
  'tertiary', 'onTertiary', 'tertiaryContainer', 'onTertiaryContainer',
  'error', 'onError', 'errorContainer', 'onErrorContainer',
  'background', 'onBackground', 'surface', 'onSurface',
  'surfaceVariant', 'onSurfaceVariant', 'outline', 'outlineVariant',
  'inverseSurface', 'inverseOnSurface', 'inversePrimary',
  'surfaceDim', 'surfaceBright', 'surfaceContainerLowest',
  'surfaceContainerLow', 'surfaceContainer', 'surfaceContainerHigh', 'surfaceContainerHighest',
];

function LayoutPreview({ suggestion, image, primaryText, secondaryText, dimensions }: {
  suggestion: LayoutSuggestion; image?: string; primaryText: string;
  secondaryText: string; dimensions: { width: number; height: number };
}) {
  const { layout } = suggestion;
  const { colorUsage, spacing } = layout;
  const scale = Math.min(1, 320 / dimensions.width);
  const w = dimensions.width * scale;
  const h = dimensions.height * scale;

  const fontFamily = "'Inter', -apple-system, sans-serif";

  if (layout.type === 'centered-hero') {
    return (
      <Box sx={{ width: w, height: h, bgcolor: colorUsage.background, borderRadius: spacing.borderRadius * scale, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid', borderColor: 'divider' }}>
        {image && layout.heroPosition === 'top' && (
          <Box sx={{ flex: 1, backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '40%' }} />
        )}
        <Box sx={{ p: spacing.padding * scale, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: spacing.gap * scale * 0.5, flex: 1, justifyContent: 'center' }}>
          <Typography sx={{ fontWeight: 700, fontSize: Math.max(10, 16 * scale), color: colorUsage.text, textAlign: 'center', fontFamily, lineHeight: 1.2, px: 1 }}>
            {primaryText}
          </Typography>
          {secondaryText && (
            <Typography sx={{ fontSize: Math.max(8, 11 * scale), color: colorUsage.accent, textAlign: 'center', fontFamily, opacity: 0.8 }}>
              {secondaryText}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  if (layout.type === 'split-horizontal') {
    return (
      <Box sx={{ width: w, height: h, bgcolor: colorUsage.background, borderRadius: spacing.borderRadius * scale, overflow: 'hidden', display: 'flex', border: '1px solid', borderColor: 'divider' }}>
        {image && layout.heroPosition === 'left' && (
          <Box sx={{ width: '45%', backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        )}
        <Box sx={{ flex: 1, p: spacing.padding * scale, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: spacing.gap * scale * 0.5, pl: image ? 2 : spacing.padding * scale }}>
          <Typography sx={{ fontWeight: 700, fontSize: Math.max(10, 14 * scale), color: colorUsage.text, fontFamily, lineHeight: 1.2 }}>
            {primaryText}
          </Typography>
          {secondaryText && (
            <Typography sx={{ fontSize: Math.max(8, 10 * scale), color: colorUsage.accent, fontFamily, opacity: 0.7 }}>
              {secondaryText}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  if (layout.type === 'split-vertical') {
    return (
      <Box sx={{ width: w, height: h, bgcolor: colorUsage.background, borderRadius: spacing.borderRadius * scale, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid', borderColor: 'divider' }}>
        {image && layout.heroPosition === 'top' && (
          <Box sx={{ height: '45%', backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        )}
        <Box sx={{ flex: 1, p: spacing.padding * scale, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: spacing.gap * scale * 0.5, bgcolor: colorUsage.card }}>
          <Typography sx={{ fontWeight: 700, fontSize: Math.max(10, 14 * scale), color: colorUsage.text, fontFamily, lineHeight: 1.2 }}>
            {primaryText}
          </Typography>
          {secondaryText && (
            <Typography sx={{ fontSize: Math.max(8, 10 * scale), color: colorUsage.accent, fontFamily, opacity: 0.7 }}>
              {secondaryText}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  if (layout.type === 'card-overlay') {
    return (
      <Box sx={{ width: w, height: h, bgcolor: colorUsage.background, borderRadius: spacing.borderRadius * scale, overflow: 'hidden', position: 'relative', border: '1px solid', borderColor: 'divider' }}>
        {image && (
          <Box sx={{ position: 'absolute', inset: 0, backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        )}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, bgcolor: colorUsage.card, p: spacing.padding * scale, display: 'flex', flexDirection: 'column', gap: spacing.gap * scale * 0.3, backdropFilter: 'blur(8px)' }}>
          <Typography sx={{ fontWeight: 700, fontSize: Math.max(10, 14 * scale), color: colorUsage.text, fontFamily, lineHeight: 1.2 }}>
            {primaryText}
          </Typography>
          {secondaryText && (
            <Typography sx={{ fontSize: Math.max(8, 10 * scale), color: colorUsage.accent, fontFamily, opacity: 0.8 }}>
              {secondaryText}
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  // minimalist
  return (
    <Box sx={{ width: w, height: h, bgcolor: colorUsage.background, borderRadius: spacing.borderRadius * scale, overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid', borderColor: 'divider' }}>
      {image && layout.heroPosition === 'top' && (
        <Box sx={{ height: '35%', backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}
      <Box sx={{ flex: 1, p: spacing.padding * scale, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end', gap: spacing.gap * scale * 0.5 }}>
        <Divider sx={{ width: 40 * scale, mb: spacing.gap * scale * 0.3, borderColor: colorUsage.accent }} />
        <Typography sx={{ fontWeight: 700, fontSize: Math.max(10, 14 * scale), color: colorUsage.text, fontFamily, lineHeight: 1.2, textAlign: 'right' }}>
          {primaryText}
        </Typography>
        {secondaryText && (
          <Typography sx={{ fontSize: Math.max(8, 10 * scale), color: colorUsage.accent, fontFamily, opacity: 0.7, textAlign: 'right' }}>
            {secondaryText}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default function LayoutLabSection() {
  const config = useThemeStore((s) => s.config);
  const scheme = generateSchemeFromConfig(config);

  const [primaryText, setPrimaryText] = useState('');
  const [secondaryText, setSecondaryText] = useState('');
  const [format, setFormat] = useState<'flyer-a5' | 'social-square' | 'banner-16x9'>('social-square');
  const [heroImage, setHeroImage] = useState<string | undefined>();
  const [heroImageName, setHeroImageName] = useState<string>('');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string>('');
  const [selectedLayout, setSelectedLayout] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'like' | 'dislike'>>({});
  const [tokenSwaps, setTokenSwaps] = useState<Record<string, Record<string, string>>>({});
  const [snack, setSnack] = useState<{ open: boolean; msg: string }>({ open: false, msg: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setHeroImage(reader.result as string);
      setHeroImageName(file.name);
    };
    reader.readAsDataURL(file);
  }, []);

  const removeImage = useCallback(() => {
    setHeroImage(undefined);
    setHeroImageName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!primaryText.trim()) {
      setError('Please enter a headline');
      return;
    }
    setGenerating(true);
    setError('');
    setResult(null);
    setSelectedLayout(null);

    try {
      const payload: LayoutInput = {
        primaryText: primaryText.trim(),
        secondaryText: secondaryText.trim(),
        format,
        heroImage,
        tokens: {
          colors: scheme as unknown as Record<string, string>,
          typography: config.typography,
          spacing: config.spacing,
        },
      };

      const res = await fetch('/api/generate-layout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to generate layouts');
      }

      const data: GenerationResult = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Layout generation is taking longer than expected. Please try again.');
    } finally {
      setGenerating(false);
    }
  }, [primaryText, secondaryText, format, heroImage, scheme, config]);

  const handleSwapColor = useCallback((layoutId: string, colorKey: string, newColor: string) => {
    setTokenSwaps((prev) => ({
      ...prev,
      [layoutId]: { ...(prev[layoutId] || {}), [colorKey]: newColor },
    }));
  }, []);

  const getEffectiveColors = useCallback((suggestion: LayoutSuggestion): ColorUsage => {
    const swaps = tokenSwaps[suggestion.id] || {};
    return {
      background: swaps.background || suggestion.layout.colorUsage.background,
      text: swaps.text || suggestion.layout.colorUsage.text,
      accent: swaps.accent || suggestion.layout.colorUsage.accent,
      card: swaps.card || suggestion.layout.colorUsage.card,
    };
  }, [tokenSwaps]);

  const handleFeedback = useCallback((layoutId: string, type: 'like' | 'dislike') => {
    setFeedback((prev) => ({
      ...prev,
      [layoutId]: prev[layoutId] === type ? undefined as any : type,
    }));
  }, []);

  const handleDownload = useCallback(async (suggestion: LayoutSuggestion) => {
    const el = document.getElementById(`layout-preview-${suggestion.id}`);
    if (!el) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(el, { scale: 3, useCORS: true, allowTaint: true } as any);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${suggestion.name.toLowerCase().replace(/\s+/g, '-')}.png`;
        a.click();
        URL.revokeObjectURL(url);
        setSnack({ open: true, msg: 'Downloaded as PNG' });
      }, 'image/png');
    } catch {
      setSnack({ open: true, msg: 'Download failed — try again' });
    }
  }, []);

  const getSwappedSuggestion = useCallback((suggestion: LayoutSuggestion): LayoutSuggestion => {
    const swaps = tokenSwaps[suggestion.id] || {};
    if (Object.keys(swaps).length === 0) return suggestion;
    return {
      ...suggestion,
      layout: {
        ...suggestion.layout,
        colorUsage: {
          background: swaps.background || suggestion.layout.colorUsage.background,
          text: swaps.text || suggestion.layout.colorUsage.text,
          accent: swaps.accent || suggestion.layout.colorUsage.accent,
          card: swaps.card || suggestion.layout.colorUsage.card,
        },
      },
    };
  }, [tokenSwaps]);

  const dims = FORMAT_OPTIONS.find((f) => f.value === format);
  const typeScale = generateTypeScale(config.typography);
  const spacingScale = generateSpacingScale(config.spacing.baseUnit);

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 0.5 }}>
        <GenerateIcon sx={{ fontSize: 20, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
          Layout Lab
        </Typography>
        <Chip label="Beta" size="small" color="primary" variant="outlined" sx={{ fontSize: 9, height: 20, fontWeight: 600 }} />
      </Stack>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, fontSize: 13 }}>
        Generate on-brand layout suggestions for marketing materials using your design tokens.
      </Typography>

      {/* Input Form */}
      <Box sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 3 }}>
        <Stack spacing={2.5}>
          {/* Image Upload */}
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.75, display: 'block' }}>
              Hero Image (optional)
            </Typography>
            {heroImage ? (
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Box sx={{ width: 56, height: 56, borderRadius: 1.5, backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid', borderColor: 'divider' }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="body2" sx={{ fontSize: 12, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{heroImageName}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 10 }}>Ready to use</Typography>
                </Box>
                <Tooltip title="Remove image">
                  <IconButton size="small" onClick={removeImage} sx={{ color: 'text.secondary' }}>
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            ) : (
              <Button
                variant="outlined"
                startIcon={<UploadIcon sx={{ fontSize: 16 }} />}
                onClick={() => fileInputRef.current?.click()}
                sx={{ textTransform: 'none', borderColor: 'divider', color: 'text.secondary', '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' }, py: 1.5 }}
                fullWidth
              >
                Upload image (JPG, PNG, SVG — max 5MB)
              </Button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleImageUpload} />
          </Box>

          {/* Text Inputs */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              label="Headline"
              placeholder="e.g. Summer Collection 2026"
              value={primaryText}
              onChange={(e) => setPrimaryText(e.target.value)}
              fullWidth
              size="small"
              slotProps={{ htmlInput: { maxLength: 80 } }}
              helperText={`${primaryText.length}/80`}
              sx={{ '& .MuiInputBase-root': { fontSize: 13 } }}
            />
            <TextField
              label="Subtitle (optional)"
              placeholder="e.g. Up to 50% off all items"
              value={secondaryText}
              onChange={(e) => setSecondaryText(e.target.value)}
              fullWidth
              size="small"
              slotProps={{ htmlInput: { maxLength: 120 } }}
              helperText={`${secondaryText.length}/120`}
              sx={{ '& .MuiInputBase-root': { fontSize: 13 } }}
            />
          </Stack>

          {/* Format & Generate */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: { sm: 'flex-end' } }}>
            <TextField
              label="Format"
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              select
              fullWidth
              size="small"
              sx={{ minWidth: 180, '& .MuiInputBase-root': { fontSize: 13 } }}
            >
              {FORMAT_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', width: '100%' }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontSize: 13 }}>{opt.label}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 10 }}>{opt.desc}</Typography>
                    </Box>
                  </Stack>
                </MenuItem>
              ))}
            </TextField>
            <Button
              variant="contained"
              startIcon={generating ? <CircularProgress size={16} sx={{ color: 'inherit' }} /> : <GenerateIcon sx={{ fontSize: 18 }} />}
              onClick={handleGenerate}
              disabled={generating || !primaryText.trim()}
              sx={{ textTransform: 'none', fontWeight: 600, px: 3, py: 1.05, minHeight: 40, whiteSpace: 'nowrap' }}
            >
              {generating ? 'Generating...' : 'Generate Layouts'}
            </Button>
          </Stack>

          {generating && <LinearProgress sx={{ borderRadius: 1 }} />}
        </Stack>
      </Box>

      {/* Error */}
      {error && (
        <Alert severity="error" onClose={() => setError('')} sx={{ mb: 3, fontSize: 13 }}>
          {error}
        </Alert>
      )}

      {/* Results */}
      {result && (
        <Box>
          <Stack direction="row" sx={{ alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: 14 }}>
              {result.suggestions.length} layouts generated
            </Typography>
            <Chip label={result.dimensions.label} size="small" variant="outlined" sx={{ fontSize: 10, height: 20 }} />
          </Stack>

          <Stack spacing={3}>
            {result.suggestions.map((suggestion) => {
              const swapped = getSwappedSuggestion(suggestion);
              const isSelected = selectedLayout === suggestion.id;
              const fb = feedback[suggestion.id];
              const hasSwaps = Object.keys(tokenSwaps[suggestion.id] || {}).length > 0;

              return (
                <Box
                  key={suggestion.id}
                  sx={{
                    border: '1px solid', borderColor: isSelected ? 'primary.main' : 'divider',
                    borderRadius: 2, overflow: 'hidden', transition: 'all 0.2s',
                    '&:hover': { borderColor: 'primary.main', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
                    cursor: 'pointer',
                  }}
                  onClick={() => setSelectedLayout(isSelected ? null : suggestion.id)}
                >
                  {/* Preview */}
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Box id={`layout-preview-${suggestion.id}`}>
                      <LayoutPreview
                        suggestion={swapped}
                        image={heroImage}
                        primaryText={primaryText}
                        secondaryText={secondaryText}
                        dimensions={result.dimensions}
                      />
                    </Box>
                  </Box>

                  {/* Info bar */}
                  <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 13 }}>{suggestion.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 11 }}>{suggestion.description}</Typography>
                    </Box>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                      <Tooltip title={fb === 'like' ? 'Unlike' : 'Like this layout'}>
                        <IconButton
                          size="small"
                          onClick={(e) => { e.stopPropagation(); handleFeedback(suggestion.id, 'like'); }}
                          sx={{ color: fb === 'like' ? 'success.main' : 'text.secondary', '&:hover': { bgcolor: 'action.hover' } }}
                        >
                          <LikeIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={fb === 'dislike' ? 'Remove feedback' : 'Dislike this layout'}>
                        <IconButton
                          size="small"
                          onClick={(e) => { e.stopPropagation(); handleFeedback(suggestion.id, 'dislike'); }}
                          sx={{ color: fb === 'dislike' ? 'error.main' : 'text.secondary', '&:hover': { bgcolor: 'action.hover' } }}
                        >
                          <DislikeIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Download as PNG">
                        <IconButton
                          size="small"
                          onClick={(e) => { e.stopPropagation(); handleDownload(swapped); }}
                          sx={{ color: 'text.secondary', '&:hover': { bgcolor: 'action.hover', color: 'primary.main' } }}
                        >
                          <DownloadIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>

                  {/* Token Swap Panel */}
                  {isSelected && (
                    <Box sx={{ px: 2, py: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'grey.50' }}>
                      <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5, mb: 1.5 }}>
                        <SwapIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Swap Colors
                        </Typography>
                        {hasSwaps && (
                          <Tooltip title="Reset all color swaps for this layout">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setTokenSwaps((prev) => { const n = { ...prev }; delete n[suggestion.id]; return n; });
                              }}
                              sx={{ ml: 'auto', width: 24, height: 24 }}
                            >
                              <DeleteIcon sx={{ fontSize: 12 }} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Stack>
                      <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', gap: 1 }}>
                        {COLOR_KEYS.map(({ key, label }) => {
                          const currentColor = getEffectiveColors(suggestion)[key as keyof ColorUsage];
                          return (
                            <Box key={key} sx={{ minWidth: 120 }}>
                              <Typography variant="caption" sx={{ fontSize: 10, color: 'text.secondary', fontWeight: 500, mb: 0.25, display: 'block' }}>{label}</Typography>
                              <TextField
                                size="small"
                                select
                                value={tokenSwaps[suggestion.id]?.[key] || currentColor}
                                onChange={(e) => { e.stopPropagation(); handleSwapColor(suggestion.id, key, e.target.value); }}
                                onClick={(e) => e.stopPropagation()}
                                fullWidth
                                sx={{ fontSize: 11, '& .MuiInputBase-root': { fontSize: 11, height: 32 }, '& .MuiSelect-select': { py: 0.25 } }}
                              >
                                {SCHEME_COLOR_OPTIONS.map((c) => (
                                  <MenuItem key={c} value={scheme[c as keyof typeof scheme] || currentColor}>
                                    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
                                      <Box sx={{ width: 14, height: 14, borderRadius: 0.5, bgcolor: scheme[c as keyof typeof scheme] || '#ccc', border: '1px solid', borderColor: 'divider', flexShrink: 0 }} />
                                      <Typography sx={{ fontSize: 11 }}>{c}</Typography>
                                    </Stack>
                                  </MenuItem>
                                ))}
                              </TextField>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Stack>
        </Box>
      )}

      {/* Empty state */}
      {!result && !generating && !error && (
        <Box sx={{ py: 6, textAlign: 'center' }}>
          <Box sx={{
            width: 64, height: 64, borderRadius: 3, mx: 'auto', mb: 2,
            bgcolor: 'action.hover', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <GenerateIcon sx={{ fontSize: 28, color: 'text.disabled' }} />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500, mb: 0.5 }}>
            Enter your content and generate layouts
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            Your active design tokens (colors, typography, spacing) will be applied automatically
          </Typography>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar open={snack.open} autoHideDuration={2000} onClose={() => setSnack({ open: false, msg: '' })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" sx={{ fontSize: 13 }}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
}
