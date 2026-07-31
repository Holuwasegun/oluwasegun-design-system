"use client";

import { useMemo, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Divider,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Chip,
  Popover,
  Stack,
  InputAdornment,
  useTheme,
} from "@mui/material";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { useThemeStore } from "@/store";
import {
  generateSchemeFromConfig,
  DEFAULT_KEY_COLOR_NAMES,
  SCHEME_KEY_ORDER,
  type ColorScheme,
} from "@/theme/scheme";
import {
  generateTonalPalette,
  UI_TONE_LEVELS,
  type TonalPalette,
} from "@/theme/tonal-palette";
import { relativeLuminance } from "@/lib/token-utils";

// ---------- HSL Utilities ----------
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function normalizeHex(hex: string): string {
  let val = hex.trim();
  if (!val.startsWith("#")) val = "#" + val;
  if (/^#[0-9A-F]{3}$/i.test(val)) {
    val = "#" + val[1] + val[1] + val[2] + val[2] + val[3] + val[3];
  }
  return val.toUpperCase();
}

function isValidHex(hex: string): boolean {
  return /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hex.trim());
}

function calculateContrastRatio(hex: string): number {
  const norm = normalizeHex(isValidHex(hex) ? hex : "#000000");
  const r = parseInt(norm.slice(1, 3), 16) / 255;
  const g = parseInt(norm.slice(3, 5), 16) / 255;
  const b = parseInt(norm.slice(5, 7), 16) / 255;
  const toL = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const lum = 0.2126 * toL(r) + 0.7152 * toL(g) + 0.0722 * toL(b);
  const ratioWhite = 1.05 / (lum + 0.05);
  const ratioBlack = (lum + 0.05) / 0.05;
  return Math.max(ratioWhite, ratioBlack);
}

const SCHEME_GROUPS = [
  {
    label: "Primary",
    keys: ["primary", "onPrimary", "primaryContainer", "onPrimaryContainer"],
  },
  {
    label: "Secondary",
    keys: ["secondary", "onSecondary", "secondaryContainer", "onSecondaryContainer"],
  },
  {
    label: "Tertiary",
    keys: ["tertiary", "onTertiary", "tertiaryContainer", "onTertiaryContainer"],
  },
  {
    label: "Error",
    keys: ["error", "onError", "errorContainer", "onErrorContainer"],
  },
  {
    label: "Surface",
    keys: ["background", "onBackground", "surface", "onSurface", "surfaceVariant", "onSurfaceVariant"],
  },
  {
    label: "Surface Containers",
    keys: ["surfaceDim", "surfaceBright", "surfaceContainerLowest", "surfaceContainerLow", "surfaceContainer", "surfaceContainerHigh", "surfaceContainerHighest"],
  },
  {
    label: "Outline",
    keys: ["outline", "outlineVariant"],
  },
  {
    label: "Inverse",
    keys: ["inverseSurface", "inverseOnSurface", "inversePrimary"],
  },
];

function formatName(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

function getTextColor(bgHex: string): string {
  return relativeLuminance(bgHex) > 0.5 ? "#1D1B20" : "#FFFFFF";
}

// ---------- Senior UI Designed Color Adjust Popover ----------
function ColorAdjustPopover({
  open,
  anchorEl,
  onClose,
  title,
  subtitle,
  hex,
  onChange,
}: {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  title: string;
  subtitle?: string;
  hex: string;
  onChange?: (hex: string) => void;
}) {
  const theme = useTheme();
  const [format, setFormat] = useState<'rgb' | 'hsl'>('rgb');
  const [inputHex, setInputHex] = useState(hex);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputHex(hex);
  }, [hex]);

  const currentHex = isValidHex(inputHex) ? normalizeHex(inputHex) : hex;
  const rgb = useMemo(() => hexToRgb(currentHex), [currentHex]);
  const hsl = useMemo(() => hexToHsl(currentHex), [currentHex]);

  const handleRgbChange = (channel: 'r' | 'g' | 'b', val: number) => {
    if (!onChange) return;
    const newRgb = { ...rgb, [channel]: val };
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setInputHex(newHex);
    onChange(newHex);
  };

  const handleHslChange = (channel: 'h' | 's' | 'l', val: number) => {
    if (!onChange) return;
    const newHsl = { h: hsl.h, s: hsl.s, l: hsl.l, [channel]: val };
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l);
    setInputHex(newHex);
    onChange(newHex);
  };

  const handleHexInput = (raw: string) => {
    setInputHex(raw);
    let val = raw.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (isValidHex(val) && onChange) {
      const normalized = normalizeHex(val);
      onChange(normalized);
    }
  };

  const contrastRatio = useMemo(() => calculateContrastRatio(currentHex), [currentHex]);
  const contrastText = getTextColor(currentHex);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      transitionDuration={200}
      slotProps={{
        paper: {
          sx: {
            bgcolor: 'background.paper',
            borderRadius: 4,
            p: 2.5,
            mt: 1.5,
            width: { xs: 310, sm: 340 },
            maxWidth: 'calc(100vw - 32px)',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 20px 40px -10px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.08)'
              : '0 20px 40px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08)',
            overflow: 'visible',
          },
        },
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                bgcolor: currentHex,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                border: '2px solid',
                borderColor: 'background.paper',
                flexShrink: 0,
              }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2, color: 'text.primary' }}>
                {title}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                {subtitle || currentHex}
              </Typography>
            </Box>
          </Stack>
          <IconButton size="small" onClick={onClose} sx={{ color: 'text.secondary', p: 0.5 }}>
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        {/* Format Selector Toggle */}
        <Box sx={{ display: 'flex', bgcolor: 'action.hover', borderRadius: 2.5, p: 0.5, mb: 2 }}>
          <Button
            size="small"
            onClick={() => setFormat('rgb')}
            sx={{
              flex: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.75rem',
              py: 0.5,
              minWidth: 0,
              bgcolor: format === 'rgb' ? 'primary.main' : 'transparent',
              color: format === 'rgb' ? 'primary.contrastText' : 'text.secondary',
              boxShadow: format === 'rgb' ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
              '&:hover': {
                bgcolor: format === 'rgb' ? 'primary.main' : 'action.selected',
              },
            }}
          >
            RGB
          </Button>
          <Button
            size="small"
            onClick={() => setFormat('hsl')}
            sx={{
              flex: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.75rem',
              py: 0.5,
              minWidth: 0,
              bgcolor: format === 'hsl' ? 'primary.main' : 'transparent',
              color: format === 'hsl' ? 'primary.contrastText' : 'text.secondary',
              boxShadow: format === 'hsl' ? '0 2px 6px rgba(0,0,0,0.15)' : 'none',
              '&:hover': {
                bgcolor: format === 'hsl' ? 'primary.main' : 'action.selected',
              },
            }}
          >
            HSL
          </Button>
        </Box>

        {/* RGB Sliders */}
        {format === 'rgb' && [
          { key: 'r', label: 'R', color: '#EF4444', val: rgb.r, max: 255 },
          { key: 'g', label: 'G', color: '#10B981', val: rgb.g, max: 255 },
          { key: 'b', label: 'B', color: '#3B82F6', val: rgb.b, max: 255 },
        ].map((ch) => (
          <Box key={ch.key} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: 'text.secondary', width: 14, textTransform: 'uppercase', textAlign: 'center' }}
            >
              {ch.label}
            </Typography>
            <Slider
              size="small"
              value={ch.val}
              min={0}
              max={ch.max}
              onChange={(_, v) => handleRgbChange(ch.key as 'r' | 'g' | 'b', v as number)}
              sx={{
                flex: 1,
                color: ch.color,
                '& .MuiSlider-rail': {
                  opacity: 0.25,
                  bgcolor: ch.color,
                },
                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                  bgcolor: 'background.paper',
                  border: `2px solid ${ch.color}`,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                },
              }}
            />
            <TextField
              size="small"
              type="number"
              value={ch.val}
              onChange={(e) => {
                let n = parseInt(e.target.value, 10);
                if (isNaN(n)) n = 0;
                n = Math.max(0, Math.min(ch.max, n));
                handleRgbChange(ch.key as 'r' | 'g' | 'b', n);
              }}
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: ch.max,
                  style: {
                    padding: '4px 6px',
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                  },
                },
              }}
              sx={{
                width: 54,
                flexShrink: 0,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  '& fieldset': { borderColor: 'divider' },
                  '&:hover fieldset': { borderColor: 'primary.main' },
                },
              }}
            />
          </Box>
        ))}

        {/* HSL Sliders */}
        {format === 'hsl' && [
          { key: 'h', label: 'H', val: hsl.h, max: 360, bg: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' },
          { key: 's', label: 'S', val: hsl.s, max: 100, bg: `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))` },
          { key: 'l', label: 'L', val: hsl.l, max: 100, bg: `linear-gradient(to right, hsl(${hsl.h}, ${hsl.s}%, 0%), hsl(${hsl.h}, ${hsl.s}%, 50%), hsl(${hsl.h}, ${hsl.s}%, 100%))` },
        ].map((ch) => (
          <Box key={ch.key} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: 'text.secondary', width: 14, textTransform: 'uppercase', textAlign: 'center' }}
            >
              {ch.label}
            </Typography>
            <Slider
              size="small"
              value={ch.val}
              min={0}
              max={ch.max}
              onChange={(_, v) => handleHslChange(ch.key as 'h' | 's' | 'l', v as number)}
              sx={{
                flex: 1,
                '& .MuiSlider-track': { background: 'transparent' },
                '& .MuiSlider-rail': {
                  opacity: 1,
                  background: ch.bg,
                  height: 6,
                  borderRadius: 3,
                },
                '& .MuiSlider-thumb': {
                  width: 16,
                  height: 16,
                  bgcolor: 'background.paper',
                  border: '2px solid',
                  borderColor: 'primary.main',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                },
              }}
            />
            <TextField
              size="small"
              type="number"
              value={ch.val}
              onChange={(e) => {
                let n = parseInt(e.target.value, 10);
                if (isNaN(n)) n = 0;
                n = Math.max(0, Math.min(ch.max, n));
                handleHslChange(ch.key as 'h' | 's' | 'l', n);
              }}
              slotProps={{
                htmlInput: {
                  min: 0,
                  max: ch.max,
                  style: {
                    padding: '4px 6px',
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                  },
                },
              }}
              sx={{
                width: 54,
                flexShrink: 0,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'background.default',
                  '& fieldset': { borderColor: 'divider' },
                  '&:hover fieldset': { borderColor: 'primary.main' },
                },
              }}
            />
          </Box>
        ))}

        {/* Editable HEX Field & Copy Action */}
        <Box sx={{ mt: 1, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.75 }}>
            HEX COLOR CODE
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <TextField
              size="small"
              fullWidth
              value={inputHex}
              onChange={(e) => handleHexInput(e.target.value)}
              onBlur={() => setInputHex(currentHex)}
              error={!isValidHex(inputHex)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography sx={{ fontWeight: 800, color: 'primary.main', fontFamily: 'monospace', fontSize: '0.9rem' }}>#</Typography>
                    </InputAdornment>
                  ),
                  style: {
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em',
                  },
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2.5,
                  bgcolor: 'background.default',
                  '& fieldset': { borderColor: isValidHex(inputHex) ? 'divider' : 'error.main' },
                  '&:hover fieldset': { borderColor: 'primary.main' },
                },
              }}
            />
            <Tooltip title={copied ? 'Copied!' : 'Copy Hex'}>
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(currentHex);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                sx={{
                  bgcolor: 'background.default',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2.5,
                  p: 1,
                  flexShrink: 0,
                  '&:hover': { bgcolor: 'action.hover', borderColor: 'primary.main' },
                }}
              >
                {copied ? <CheckRoundedIcon sx={{ fontSize: 18, color: 'success.main' }} /> : <ContentCopyRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        {/* Contrast Preview Bar */}
        <Box
          sx={{
            mt: 1.5,
            p: 1.25,
            borderRadius: 2.5,
            bgcolor: currentHex,
            color: contrastText,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
            transition: 'background-color 0.2s',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.02em' }}>
            Contrast Preview
          </Typography>
          <Chip
            label={`${contrastRatio.toFixed(1)}:1 (${contrastRatio >= 4.5 ? 'WCAG AA' : contrastRatio >= 3.0 ? 'Large Text' : 'Low'})`}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 800,
              bgcolor: contrastText === '#FFFFFF' || contrastText === '#fff' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.4)',
              color: contrastText,
              backdropFilter: 'blur(4px)',
            }}
          />
        </Box>

        {/* Update Button */}
        <Button
          fullWidth
          variant="contained"
          size="small"
          onClick={() => {
            if (onChange) onChange(currentHex);
            onClose();
          }}
          sx={{
            mt: 2,
            borderRadius: 2.5,
            py: 1,
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '0.8125rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          Update Tone
        </Button>
      </Box>
    </Popover>
  );
}

// ---------- Tonal Palette Strip ----------
function TonalPaletteStrip({ label, palette, onRemove, isDefault, keyColorHex, onKeyColorChange }: {
  label: string;
  palette: TonalPalette;
  onRemove?: () => void;
  isDefault: boolean;
  keyColorHex?: string;
  onKeyColorChange?: (hex: string) => void;
}) {
  const [activeTone, setActiveTone] = useState<{ anchorEl: HTMLElement; tone: number; hex: string } | null>(null);

  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.9rem' }}>
          {label}
        </Typography>
        {onRemove && !isDefault && (
          <Button
            size="small"
            color="error"
            onClick={onRemove}
            startIcon={<DeleteOutlineRoundedIcon />}
            sx={{ textTransform: "none", minWidth: 0, fontSize: "0.75rem", px: 1 }}
          >
            Remove
          </Button>
        )}
      </Box>

      {/* Single Continuous Rounded Bounding Box containing Tonal Values 0 to 100 */}
      <Box
        sx={{
          display: "flex",
          borderRadius: "24px",
          overflow: "hidden",
          bgcolor: 'divider',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          width: '100%',
          height: { xs: 44, sm: 54 },
        }}
      >
        {UI_TONE_LEVELS.map((tone) => (
          <Box
            key={tone}
            sx={{
              flex: "1 1 0%",
              minWidth: 0,
              height: "100%",
              bgcolor: palette[tone],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.15s, z-index 0.15s, box-shadow 0.15s",
              "&:hover": {
                transform: "scaleY(1.12)",
                zIndex: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              },
            }}
            onClick={(e) => setActiveTone({ anchorEl: e.currentTarget, tone, hex: palette[tone] })}
          >
            <Tooltip
              title={
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, display: "block" }}>
                    Tone {tone}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
                    {palette[tone]}
                  </Typography>
                </Box>
              }
            >
              <Typography
                sx={{
                  color: getTextColor(palette[tone]),
                  fontWeight: tone === 40 || tone === 80 ? 800 : 500,
                  fontSize: { xs: "0.6rem", sm: "0.725rem" },
                  userSelect: "none",
                }}
              >
                {tone}
              </Typography>
            </Tooltip>
          </Box>
        ))}
      </Box>

      {/* Absolute-Positioned Editing Popover near Cursor */}
      <ColorAdjustPopover
        open={Boolean(activeTone)}
        anchorEl={activeTone?.anchorEl ?? null}
        onClose={() => setActiveTone(null)}
        title={`${label} — Tone ${activeTone?.tone ?? ''}`}
        subtitle={`Adjust Tone ${activeTone?.tone ?? ''}`}
        hex={activeTone?.hex ?? keyColorHex ?? palette[40]}
        onChange={onKeyColorChange}
      />
    </Box>
  );
}

// ---------- Key Color Picker ----------
function hexToRgb(hex: string) {
  const norm = normalizeHex(isValidHex(hex) ? hex : "#000000");
  const r = parseInt(norm.slice(1, 3), 16) || 0;
  const g = parseInt(norm.slice(3, 5), 16) || 0;
  const b = parseInt(norm.slice(5, 7), 16) || 0;
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function KeyColorPicker({ label, description, value, onChange, onRemove, isDefault, onRename, onColorClick }: {
  label: string;
  description: string;
  value: string;
  onChange: (hex: string) => void;
  onRemove?: () => void;
  isDefault: boolean;
  onRename?: (newKey: string) => void;
  onColorClick?: () => void;
}) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [renameMode, setRenameMode] = useState(false);
  const [renameValue, setRenameValue] = useState(label);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (renameMode) return;
    setAnchorEl(e.currentTarget);
    if (onColorClick) onColorClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card 
      variant="outlined" 
      sx={{ 
        height: "100%", 
        cursor: "pointer", 
        transition: "transform 0.15s, box-shadow 0.15s",
        "&:hover": { transform: "scale(1.02)", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              bgcolor: value,
              flexShrink: 0,
            }}
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            {renameMode ? (
              <Box
                component="input"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onBlur={() => {
                  const trimmed = renameValue.trim().replace(/\s+/g, "");
                  if (trimmed && trimmed !== label && onRename) onRename(trimmed);
                  setRenameMode(false);
                }}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter") {
                    (e.target as HTMLElement).blur();
                  }
                  if (e.key === "Escape") {
                    setRenameValue(label);
                    setRenameMode(false);
                  }
                }}
                autoFocus
                onClick={(e) => e.stopPropagation()}
                sx={{
                  width: '100%',
                  height: 28,
                  bgcolor: 'background.default',
                  borderRadius: 1,
                  textAlign: 'left',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'text.primary',
                  fontFamily: 'inherit',
                  outline: 'none',
                  border: 'none',
                  boxShadow: theme.palette.mode === 'dark'
                    ? 'inset 2px 2px 4px rgba(0,0,0,0.5), inset -2px -2px 4px rgba(255,255,255,0.03)'
                    : 'inset 2px 2px 4px rgba(0,0,0,0.1), inset -2px -2px 4px rgba(255,255,255,0.7)',
                  px: 1,
                }}
              />
            ) : (
              <>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {label}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                  {description}
                </Typography>
              </>
            )}
          </Box>
          {!isDefault && (
            <>
              {onRename && !renameMode && (
                <Button
                  size="small"
                  onClick={(e) => { e.stopPropagation(); setRenameValue(label); setRenameMode(true); }}
                  sx={{ textTransform: "none", minWidth: 0, flexShrink: 0, fontSize: "0.65rem", px: 0.75, mr: 0.5, color: 'text.secondary' }}
                >
                  Rename
                </Button>
              )}
              {onRemove && (
                <Button
                  size="small"
                  color="error"
                  onClick={(e) => { e.stopPropagation(); onRemove(); }}
                  startIcon={<DeleteOutlineRoundedIcon />}
                  sx={{ textTransform: "none", minWidth: 0, flexShrink: 0, fontSize: "0.7rem", px: 1 }}
                >
                  Delete
                </Button>
              )}
            </>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
          <Typography variant="caption" sx={{ fontFamily: "monospace", fontWeight: 600 }}>{value}</Typography>
        </Box>
      </CardContent>

      <ColorAdjustPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        title={label}
        subtitle={description || 'Key Color'}
        hex={value}
        onChange={onChange}
      />
    </Card>
  );
}

// ---------- Color Role Card ----------
function ColorRoleCard({ label, hex, onClick }: { label: string; hex: string; onClick?: () => void }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex", alignItems: "center", gap: 1, mb: 0.5,
        cursor: onClick ? "pointer" : "default",
        borderRadius: 1,
        p: 0.5,
        mx: -0.5,
        transition: "background-color 0.15s",
        "&:hover": onClick ? { bgcolor: "action.hover" } : {},
      }}
    >
      <Box
        sx={{
          width: 32, height: 32, borderRadius: 1, bgcolor: hex, flexShrink: 0,
        }}
      />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 600, display: "block", lineHeight: 1.2 }}>
          {formatName(label)}
        </Typography>
        <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.secondary", fontSize: "0.6875rem" }}>
          {hex}
        </Typography>
      </Box>
    </Box>
  );
}

// ---------- HSL Detail Dialog ----------
function HslDetailDialog({ open, hex, title, onClose, onChange }: {
  open: boolean;
  hex: string;
  title?: string;
  onClose: () => void;
  onChange: (hex: string) => void;
}) {
  const [inputHex, setInputHex] = useState(hex);
  const [format, setFormat] = useState<'rgb' | 'hsl'>('rgb');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputHex(hex);
  }, [hex]);

  const currentHex = isValidHex(inputHex) ? normalizeHex(inputHex) : hex;
  const rgb = useMemo(() => hexToRgb(currentHex), [currentHex]);
  const hsl = useMemo(() => hexToHsl(currentHex), [currentHex]);

  const handleRgbChange = (channel: 'r' | 'g' | 'b', val: number) => {
    const newRgb = { ...rgb, [channel]: val };
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    setInputHex(newHex);
    onChange(newHex);
  };

  const handleHslChange = (channel: 'h' | 's' | 'l', val: number) => {
    const newHsl = { h: hsl.h, s: hsl.s, l: hsl.l, [channel]: val };
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l);
    setInputHex(newHex);
    onChange(newHex);
  };

  const handleHexInput = (raw: string) => {
    setInputHex(raw);
    let val = raw.trim();
    if (!val.startsWith('#')) val = '#' + val;
    if (isValidHex(val)) {
      const normalized = normalizeHex(val);
      onChange(normalized);
    }
  };

  const contrastRatio = useMemo(() => calculateContrastRatio(currentHex), [currentHex]);
  const contrastText = getTextColor(currentHex);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            p: 1,
          },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", pb: 1 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 2,
              bgcolor: currentHex,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              border: '2px solid',
              borderColor: 'background.paper',
            }}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {title || 'Edit Color Role'}
          </Typography>
        </Stack>
        <IconButton size="small" onClick={onClose}>
          <CloseRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Format Selector Toggle */}
          <Box sx={{ display: 'flex', bgcolor: 'action.hover', borderRadius: 2.5, p: 0.5 }}>
            <Button
              size="small"
              onClick={() => setFormat('rgb')}
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.75rem',
                py: 0.5,
                bgcolor: format === 'rgb' ? 'primary.main' : 'transparent',
                color: format === 'rgb' ? 'primary.contrastText' : 'text.secondary',
              }}
            >
              RGB
            </Button>
            <Button
              size="small"
              onClick={() => setFormat('hsl')}
              sx={{
                flex: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.75rem',
                py: 0.5,
                bgcolor: format === 'hsl' ? 'primary.main' : 'transparent',
                color: format === 'hsl' ? 'primary.contrastText' : 'text.secondary',
              }}
            >
              HSL
            </Button>
          </Box>

          {/* RGB Sliders */}
          {format === 'rgb' && [
            { key: 'r', label: 'R', color: '#EF4444', val: rgb.r, max: 255 },
            { key: 'g', label: 'G', color: '#10B981', val: rgb.g, max: 255 },
            { key: 'b', label: 'B', color: '#3B82F6', val: rgb.b, max: 255 },
          ].map((ch) => (
            <Box key={ch.key} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', width: 14, textTransform: 'uppercase', textAlign: 'center' }}>
                {ch.label}
              </Typography>
              <Slider
                size="small"
                value={ch.val}
                min={0}
                max={ch.max}
                onChange={(_, v) => handleRgbChange(ch.key as 'r' | 'g' | 'b', v as number)}
                sx={{ flex: 1, color: ch.color }}
              />
              <TextField
                size="small"
                type="number"
                value={ch.val}
                onChange={(e) => {
                  let n = parseInt(e.target.value, 10);
                  if (isNaN(n)) n = 0;
                  n = Math.max(0, Math.min(ch.max, n));
                  handleRgbChange(ch.key as 'r' | 'g' | 'b', n);
                }}
                slotProps={{ htmlInput: { min: 0, max: ch.max, style: { padding: '4px 6px', textAlign: 'center', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.8125rem' } } }}
                sx={{ width: 54, flexShrink: 0 }}
              />
            </Box>
          ))}

          {/* HSL Sliders */}
          {format === 'hsl' && [
            { key: 'h', label: 'H', val: hsl.h, max: 360, bg: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)' },
            { key: 's', label: 'S', val: hsl.s, max: 100, bg: `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))` },
            { key: 'l', label: 'L', val: hsl.l, max: 100, bg: `linear-gradient(to right, hsl(${hsl.h}, ${hsl.s}%, 0%), hsl(${hsl.h}, ${hsl.s}%, 50%), hsl(${hsl.h}, ${hsl.s}%, 100%))` },
          ].map((ch) => (
            <Box key={ch.key} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', width: 14, textTransform: 'uppercase', textAlign: 'center' }}>
                {ch.label}
              </Typography>
              <Slider
                size="small"
                value={ch.val}
                min={0}
                max={ch.max}
                onChange={(_, v) => handleHslChange(ch.key as 'h' | 's' | 'l', v as number)}
                sx={{ flex: 1, '& .MuiSlider-rail': { opacity: 1, background: ch.bg } }}
              />
              <TextField
                size="small"
                type="number"
                value={ch.val}
                onChange={(e) => {
                  let n = parseInt(e.target.value, 10);
                  if (isNaN(n)) n = 0;
                  n = Math.max(0, Math.min(ch.max, n));
                  handleHslChange(ch.key as 'h' | 's' | 'l', n);
                }}
                slotProps={{ htmlInput: { min: 0, max: ch.max, style: { padding: '4px 6px', textAlign: 'center', fontFamily: 'monospace', fontWeight: 700, fontSize: '0.8125rem' } } }}
                sx={{ width: 54, flexShrink: 0 }}
              />
            </Box>
          ))}

          {/* Editable HEX Field */}
          <Box sx={{ mt: 1, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 0.75 }}>
              HEX COLOR CODE
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <TextField
                size="small"
                fullWidth
                value={inputHex}
                onChange={(e) => handleHexInput(e.target.value)}
                onBlur={() => setInputHex(currentHex)}
                error={!isValidHex(inputHex)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography sx={{ fontWeight: 800, color: 'primary.main', fontFamily: 'monospace', fontSize: '0.9rem' }}>#</Typography>
                      </InputAdornment>
                    ),
                    style: { fontFamily: 'monospace', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.05em' },
                  },
                }}
              />
              <Tooltip title={copied ? 'Copied!' : 'Copy Hex'}>
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(currentHex);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  }}
                  sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, p: 1 }}
                >
                  {copied ? <CheckRoundedIcon sx={{ fontSize: 18, color: 'success.main' }} /> : <ContentCopyRoundedIcon sx={{ fontSize: 18, color: 'text.secondary' }} />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          {/* Contrast Badge */}
          <Box
            sx={{
              p: 1.25,
              borderRadius: 2,
              bgcolor: currentHex,
              color: contrastText,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
              Contrast Ratio
            </Typography>
            <Chip
              label={`${contrastRatio.toFixed(1)}:1 (${contrastRatio >= 4.5 ? 'WCAG AA' : contrastRatio >= 3.0 ? 'Large Text' : 'Low'})`}
              size="small"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 800,
                bgcolor: contrastText === '#FFFFFF' || contrastText === '#fff' ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.4)',
                color: contrastText,
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 1.5 }}>
        <Button onClick={onClose} variant="contained" size="small" sx={{ textTransform: "none", borderRadius: 2, px: 2.5 }}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ---------- Add Key Color Dialog ----------
function AddKeyColorDialog({ open, onClose, onAdd }: {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, color: string) => void;
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#6750A4");

  const handleAdd = () => {
    const key = name.trim().replace(/\s+/g, "");
    if (!key) return;
    onAdd(key, color);
    setName("");
    setColor("#6750A4");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 600 }}>Add Key Color</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            label="Color name"
            placeholder="e.g. Brand Blue"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            fullWidth
            autoFocus
          />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value.toUpperCase())}
              style={{ width: 48, height: 48, padding: 0, cursor: "pointer", borderRadius: 6 }}
            />
            <TextField
              size="small"
              label="Hex value"
              value={color}
              onChange={(e) => {
                let val = e.target.value;
                if (!val.startsWith("#")) val = "#" + val;
                if (/^#[0-9A-F]{6}$/i.test(val)) setColor(val.toUpperCase());
              }}
              slotProps={{
                input: { style: { fontFamily: "monospace", textTransform: "uppercase" as const } },
              }}
              fullWidth
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAdd} disabled={!name.trim()}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ---------- Main Page ----------
export default function ColorPage() {
  const { config, setKeyColor, addKeyColor, removeKeyColor, renameKeyColor, resetConfig } = useThemeStore();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [hslDialog, setHslDialog] = useState<{ open: boolean; hex: string; label: string }>({
    open: false, hex: "#000000", label: "",
  });

  const scheme: ColorScheme = useMemo(() => generateSchemeFromConfig(config), [config]);

  const palettes = useMemo(() => {
    const result: Record<string, TonalPalette> = {};
    for (const [key, hex] of Object.entries(config.keyColors)) {
      result[key] = generateTonalPalette(hex);
    }
    return result;
  }, [config.keyColors]);

  const customKeys = useMemo(() => {
    return Object.keys(config.keyColors).filter((k) => !SCHEME_KEY_ORDER.includes(k));
  }, [config.keyColors]);

  const getKeyLabel = (key: string): string => DEFAULT_KEY_COLOR_NAMES[key] ?? formatName(key);
  const getKeyDescription = (key: string): string => {
    if (key === "primary") return "The primary brand color";
    if (key === "secondary") return "A secondary accent color";
    if (key === "tertiary") return "A third accent color";
    if (key === "neutral") return "Backgrounds, surfaces, containers";
    if (key === "neutralVariant") return "Surface variants, outlines";
    return "Custom key color";
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Color
        </Typography>
        <Tooltip title="Reset all colors to defaults">
          <IconButton onClick={resetConfig} size="small">
            <RestartAltRoundedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Material Design 3 color system — pick key colors and watch the full palette generate automatically
      </Typography>

      {/* Key Color Pickers */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Key Colors
        </Typography>
        <Button
          size="small"
          startIcon={<AddRoundedIcon />}
          onClick={() => setAddDialogOpen(true)}
          sx={{ textTransform: "none" }}
        >
          Add Key Color
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {SCHEME_KEY_ORDER.map((key) => (
          <Grid key={key} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <KeyColorPicker
              label={getKeyLabel(key)}
              description={getKeyDescription(key)}
              value={config.keyColors[key] ?? "#000000"}
              onChange={(hex) => setKeyColor(key, hex)}
              isDefault
            />
          </Grid>
        ))}
        {customKeys.map((key) => (
          <Grid key={key} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <KeyColorPicker
              label={getKeyLabel(key)}
              description={getKeyDescription(key)}
              value={config.keyColors[key]}
              onChange={(hex) => setKeyColor(key, hex)}
              onRemove={() => removeKeyColor(key)}
              onRename={(newKey) => {
                if (newKey !== key && !config.keyColors[newKey]) {
                  renameKeyColor(key, newKey);
                }
              }}
              isDefault={false}
            />
          </Grid>
        ))}
      </Grid>

      {/* Tonal Palettes */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Tonal Palettes
      </Typography>
      <Box sx={{ mb: 4 }}>
        {SCHEME_KEY_ORDER.map((key) => (
          <TonalPaletteStrip
            key={key}
            label={getKeyLabel(key)}
            palette={palettes[key]}
            keyColorHex={config.keyColors[key]}
            onKeyColorChange={(hex) => setKeyColor(key, hex)}
            isDefault
          />
        ))}
        {customKeys.map((key) => (
          <TonalPaletteStrip
            key={key}
            label={getKeyLabel(key)}
            palette={palettes[key]}
            keyColorHex={config.keyColors[key]}
            onKeyColorChange={(hex) => setKeyColor(key, hex)}
            onRemove={() => removeKeyColor(key)}
            isDefault={false}
          />
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Generated Color Scheme */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
        Generated Color Scheme ({config.mode})
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        All 30 color roles derived from your key colors using MD3 tonal mapping
      </Typography>

      <Grid container spacing={2}>
        {SCHEME_GROUPS.map((group) => (
          <Grid key={group.label} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                  {group.label}
                </Typography>
                {group.keys.map((key) => (
                  <ColorRoleCard
                    key={key}
                    label={key}
                    hex={scheme[key as keyof ColorScheme]}
                    onClick={() => setHslDialog({
                      open: true,
                      hex: scheme[key as keyof ColorScheme],
                      label: formatName(key),
                    })}
                  />
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add Key Color Dialog */}
      <AddKeyColorDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={(name, color) => addKeyColor(name, color)}
      />

      {/* HSL Detail Dialog */}
      <HslDetailDialog
        open={hslDialog.open}
        hex={hslDialog.hex}
        onClose={() => setHslDialog((s) => ({ ...s, open: false }))}
        onChange={(newHex) => setHslDialog((s) => ({ ...s, hex: newHex }))}
      />
    </Box>
  );
}
