"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
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
  useTheme,
} from "@mui/material";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
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

// ---------- Tonal Palette Strip ----------
function TonalPaletteStrip({ label, palette, onRemove, isDefault }: {
  label: string;
  palette: TonalPalette;
  onRemove?: () => void;
  isDefault: boolean;
}) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.75 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        {onRemove && !isDefault && (
          <Button
            size="small"
            color="error"
            onClick={onRemove}
            startIcon={<DeleteOutlineRoundedIcon />}
            sx={{ textTransform: "none", minWidth: 0, fontSize: "0.7rem", px: 1 }}
          >
            Remove
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: { xs: "grid", sm: "flex" },
          gridTemplateColumns: { xs: "repeat(auto-fill, minmax(40px, 1fr))", sm: "none" },
          borderRadius: 2,
          overflow: { xs: "visible", sm: "auto" },
          gap: { xs: 0, sm: 0 },
          bgcolor: 'divider',
          "&::-webkit-scrollbar": { height: 4 },
          "&::-webkit-scrollbar-thumb": { bgcolor: "action.hover", borderRadius: 2 },
        }}
      >
        {UI_TONE_LEVELS.map((tone) => (
          <Tooltip
            key={tone}
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
            <Box
              sx={{
                flex: { xs: "auto", sm: "0 0 auto" },
                width: { xs: "auto", sm: 40 },
                height: { xs: 40, sm: 56 },
                bgcolor: palette[tone],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.15s",
                borderRadius: 0.5,
                "&:hover": { transform: "scaleY(1.15)", zIndex: 1 },
              }}
            >
              <Typography
                sx={{
                  color: getTextColor(palette[tone]),
                  fontWeight: tone === 40 || tone === 80 ? 700 : 400,
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  userSelect: "none",
                }}
              >
                {tone}
              </Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}

// ---------- Key Color Picker ----------
function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) || 0;
  const g = parseInt(hex.slice(3, 5), 16) || 0;
  const b = parseInt(hex.slice(5, 7), 16) || 0;
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
  const [localHex, setLocalHex] = useState<string | null>(null);

  const displayHex = localHex ?? value;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (renameMode) return;
    setAnchorEl(e.currentTarget);
    if (onColorClick) onColorClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setLocalHex(null);
  };

  const rgb = hexToRgb(value);
  const hsl = useMemo(() => hexToHsl(value), [value]);
  const [format, setFormat] = useState<'rgb' | 'hsl'>('rgb');

  const handleRgbChange = (color: 'r'|'g'|'b', val: number) => {
    const newRgb = { ...rgb, [color]: val };
    onChange(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const handleHslChange = (component: 'h'|'s'|'l', val: number) => {
    const newHsl = { h: hsl.h, s: hsl.s, l: hsl.l, [component]: val };
    onChange(hslToHex(newHsl.h, newHsl.s, newHsl.l));
  };

  const open = Boolean(anchorEl);

  const neumorphicInset = theme.palette.mode === 'dark' 
    ? "inset 3px 3px 6px rgba(0,0,0,0.5), inset -3px -3px 6px rgba(255,255,255,0.03)"
    : "inset 3px 3px 6px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.7)";

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

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        transitionDuration={300}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'background.paper',
              borderRadius: 3,
              p: 3,
              mt: 1,
              width: 300,
              boxShadow: theme.palette.mode === 'dark'
                ? "-6px -6px 14px rgba(255,255,255,0.03), 6px 6px 14px rgba(0,0,0,0.5)"
                : "-6px -6px 14px rgba(255,255,255,0.9), 6px 6px 14px rgba(0,0,0,0.15)",
            }
          }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 280 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', textAlign: 'center' }}>
            Adjust Color
          </Typography>

          <Box sx={{ display: "flex", gap: 0.5, bgcolor: 'background.default', borderRadius: 2, p: 0.5 }}>
            <Button
              size="small"
              variant={format === 'rgb' ? 'contained' : 'text'}
              onClick={() => setFormat('rgb')}
              sx={{ flex: 1, textTransform: 'none', fontSize: '0.75rem', minWidth: 0, fontWeight: 600 }}
            >
              RGB
            </Button>
            <Button
              size="small"
              variant={format === 'hsl' ? 'contained' : 'text'}
              onClick={() => setFormat('hsl')}
              sx={{ flex: 1, textTransform: 'none', fontSize: '0.75rem', minWidth: 0, fontWeight: 600 }}
            >
              HSL
            </Button>
          </Box>
          
          {format === 'rgb' && ['r', 'g', 'b'].map((color) => {
            const val = rgb[color as keyof typeof rgb];
            return (
              <Box key={color} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', width: 12, textTransform: 'uppercase' }}>
                  {color}
                </Typography>
                <Slider
                  size="small"
                  value={val}
                  min={0}
                  max={255}
                  onChange={(_, newValue) => handleRgbChange(color as 'r'|'g'|'b', newValue as number)}
                  sx={{
                    color: color === 'r' ? '#ff4d4d' : color === 'g' ? '#4dff4d' : '#4d4dff',
                    "& .MuiSlider-track": {
                       boxShadow: neumorphicInset,
                    },
                    "& .MuiSlider-rail": {
                       opacity: 1,
                       bgcolor: 'background.default',
                       boxShadow: neumorphicInset,
                    },
                    "& .MuiSlider-thumb": {
                       width: 16,
                       height: 16,
                       bgcolor: 'background.paper',
                       borderRadius: 4,
                       boxShadow: theme.palette.mode === 'dark'
                         ? '-6px -6px 14px rgba(255,255,255,0.03), 6px 6px 14px rgba(0,0,0,0.5)'
                         : '-6px -6px 14px #ffffff, 6px 6px 14px #babecc',
                       "&:hover, &.Mui-focusVisible": {
                         boxShadow: theme.palette.mode === 'dark'
                           ? '-6px -6px 14px rgba(255,255,255,0.03), 6px 6px 14px rgba(0,0,0,0.5)'
                           : '-6px -6px 14px #ffffff, 6px 6px 14px #babecc',
                       }
                    }
                  }}
                />
                <Box
                  component="input"
                  type="number"
                  value={val}
                  onChange={(e) => {
                    let v = parseInt(e.target.value) || 0;
                    v = Math.max(0, Math.min(255, v));
                    handleRgbChange(color as 'r'|'g'|'b', v);
                  }}
                  sx={{
                    width: 44,
                    height: 28,
                    bgcolor: 'background.default',
                    borderRadius: 1.5,
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'text.primary',
                    boxShadow: neumorphicInset,
                    outline: 'none',
                    "&:focus": {
                      boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.9)",
                    }
                  }}
                />
              </Box>
            );
          })}

          {format === 'hsl' && (
            <>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">Hue</Typography>
                  <Typography variant="caption" sx={{ fontFamily: "monospace" }}>{hsl.h}°</Typography>
                </Box>
                <Slider
                  size="small"
                  value={hsl.h}
                  min={0}
                  max={360}
                  onChange={(_, v) => handleHslChange('h', v as number)}
                  sx={{
                    "& .MuiSlider-track": { background: "transparent" },
                    "& .MuiSlider-rail": {
                      opacity: 1,
                      background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                    },
                  }}
                />
              </Box>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">Saturation</Typography>
                  <Typography variant="caption" sx={{ fontFamily: "monospace" }}>{hsl.s}%</Typography>
                </Box>
                <Slider
                  size="small"
                  value={hsl.s}
                  min={0}
                  max={100}
                  onChange={(_, v) => handleHslChange('s', v as number)}
                  sx={{
                    "& .MuiSlider-rail": {
                      opacity: 1,
                      background: `linear-gradient(to right, hsl(${hsl.h}, 0%, ${hsl.l}%), hsl(${hsl.h}, 100%, ${hsl.l}%))`,
                    },
                  }}
                />
              </Box>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">Lightness</Typography>
                  <Typography variant="caption" sx={{ fontFamily: "monospace" }}>{hsl.l}%</Typography>
                </Box>
                <Slider
                  size="small"
                  value={hsl.l}
                  min={0}
                  max={100}
                  onChange={(_, v) => handleHslChange('l', v as number)}
                  sx={{
                    "& .MuiSlider-rail": {
                      opacity: 1,
                      background: `linear-gradient(to right, hsl(${hsl.h}, ${hsl.s}%, 0%), hsl(${hsl.h}, ${hsl.s}%, 50%), hsl(${hsl.h}, ${hsl.s}%, 100%))`,
                    },
                  }}
                />
              </Box>
            </>
          )}
          
          <Box
            component="input"
            value={displayHex}
            onChange={(e) => {
              const raw = e.target.value;
              setLocalHex(raw);
              let val = raw;
              if (!val.startsWith("#")) val = "#" + val;
              if (/^#[0-9A-F]{6}$/i.test(val)) {
                onChange(val.toUpperCase());
                setLocalHex(null);
              }
            }}
            onBlur={() => setLocalHex(null)}
            sx={{
              width: '100%',
              height: 36,
              bgcolor: 'background.default',
              borderRadius: 2,
              textAlign: 'center',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'text.primary',
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              boxShadow: neumorphicInset,
              outline: 'none',
              "&:focus": {
                boxShadow: "inset 4px 4px 8px rgba(0,0,0,0.15), inset -4px -4px 8px rgba(255,255,255,0.9)",
              }
            }}
          />
        </Box>
      </Popover>
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
function HslDetailDialog({ open, hex, onClose, onChange }: {
  open: boolean;
  hex: string;
  onClose: () => void;
  onChange: (hex: string) => void;
}) {
  const hsl = hexToHsl(hex);
  const [localH, setLocalH] = useState(hsl.h);
  const [localS, setLocalS] = useState(hsl.s);
  const [localL] = useState(hsl.l);
  const [hexInput, setHexInput] = useState(hex);

  useEffect(() => {
    const hslNew = hexToHsl(hex);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalH(hslNew.h);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalS(hslNew.s);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHexInput(hex);
  }, [hex]);

  const updateFromHsl = useCallback((h: number, s: number, l: number) => {
    const newHex = hslToHex(h, s, l);
    setHexInput(newHex);
    onChange(newHex);
  }, [onChange]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1.5, fontWeight: 600 }}>
        <Box sx={{ width: 28, height: 28, borderRadius: 1, bgcolor: hex, }} />
        Edit Color
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Hex Input */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 1, display: "block" }}>HEX</Typography>
            <TextField
              size="small"
              value={hexInput}
              onChange={(e) => {
                let val = e.target.value;
                if (!val.startsWith("#")) val = "#" + val;
                setHexInput(val.toUpperCase());
                if (/^#[0-9A-F]{6}$/i.test(val)) {
                  const hslNew = hexToHsl(val);
                  setLocalH(hslNew.h);
                  setLocalS(hslNew.s);
                  onChange(val.toUpperCase());
                }
              }}
              fullWidth
              slotProps={{ input: { style: { fontFamily: "monospace", textTransform: "uppercase" as const } } }}
            />
          </Box>

          {/* HSL Sliders */}
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, display: "block" }}>HSL</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
              <Chip label={`hsl(${localH}, ${localS}%, ${localL}%)`} size="small" sx={{ fontFamily: "monospace", fontSize: "0.75rem" }} />
            </Box>

            {/* Hue */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Hue</Typography>
                <Typography variant="caption" sx={{ fontFamily: "monospace" }}>{localH}°</Typography>
              </Box>
              <Slider
                size="small"
                value={localH}
                min={0}
                max={360}
                onChange={(_, v) => {
                  const val = v as number;
                  setLocalH(val);
                  updateFromHsl(val, localS, localL);
                }}
                sx={{
                  "& .MuiSlider-track": { background: "transparent" },
                  "& .MuiSlider-rail": {
                    opacity: 1,
                    background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
                  },
                }}
              />
            </Box>

            {/* Saturation */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Saturation</Typography>
                <Typography variant="caption" sx={{ fontFamily: "monospace" }}>{localS}%</Typography>
              </Box>
              <Slider
                size="small"
                value={localS}
                min={0}
                max={100}
                onChange={(_, v) => {
                  const val = v as number;
                  setLocalS(val);
                  updateFromHsl(localH, val, localL);
                }}
                sx={{
                  "& .MuiSlider-rail": {
                    opacity: 1,
                    background: `linear-gradient(to right, hsl(${localH}, 0%, ${localL}%), hsl(${localH}, 100%, ${localL}%))`,
                  },
                }}
              />
            </Box>

            {/* Lightness */}
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Lightness</Typography>
                <Typography variant="caption" sx={{ fontFamily: "monospace" }}>{localL}%</Typography>
              </Box>
              <Slider
                size="small"
                value={localL}
                min={0}
                max={100}
                disabled
                sx={{
                  "& .MuiSlider-rail": {
                    opacity: 1,
                    background: `linear-gradient(to right, hsl(${localH}, ${localS}%, 0%), hsl(${localH}, ${localS}%, 50%), hsl(${localH}, ${localS}%, 100%))`,
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: -0.5 }}>
                Lightness is determined by the tonal palette
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
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
            isDefault
          />
        ))}
        {customKeys.map((key) => (
          <TonalPaletteStrip
            key={key}
            label={getKeyLabel(key)}
            palette={palettes[key]}
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
