"use client";

import { useMemo, useState } from "react";
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
} from "@mui/material";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useThemeStore } from "@/store";
import {
  generateSchemeFromConfig,
  DEFAULT_KEY_COLORS,
  DEFAULT_KEY_COLOR_NAMES,
  SCHEME_KEY_ORDER,
  type ColorScheme,
} from "@/theme/scheme";
import {
  generateTonalPalette,
  UI_TONE_LEVELS,
  type TonalPalette,
} from "@/theme/tonal-palette";

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
  const r = parseInt(bgHex.slice(1, 3), 16);
  const g = parseInt(bgHex.slice(3, 5), 16);
  const b = parseInt(bgHex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? "#1D1B20" : "#FFFFFF";
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
          <Tooltip title={`Remove ${label} key color`}>
            <IconButton size="small" onClick={onRemove} sx={{ ml: -0.5 }}>
              <DeleteOutlineRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
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
                flex: 1,
                height: { xs: 40, sm: 56 },
                bgcolor: palette[tone],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.15s",
                "&:hover": { transform: "scaleY(1.15)", zIndex: 1 },
              }}
            >
              <Typography
                sx={{
                  color: getTextColor(palette[tone]),
                  fontWeight: tone === 40 || tone === 80 ? 700 : 400,
                  fontSize: { xs: "0.5rem", sm: "0.6rem" },
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
function KeyColorPicker({ label, description, value, onChange, onRemove, isDefault }: {
  label: string;
  description: string;
  value: string;
  onChange: (hex: string) => void;
  onRemove?: () => void;
  isDefault: boolean;
}) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              bgcolor: value,
              border: "2px solid",
              borderColor: "divider",
              flexShrink: 0,
            }}
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {label}
              </Typography>
              {!isDefault && onRemove && (
                <IconButton size="small" onClick={onRemove} sx={{ ml: -0.5, p: 0 }}>
                  <DeleteOutlineRoundedIcon sx={{ fontSize: 14 }} />
                </IconButton>
              )}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
              {description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            style={{ width: 36, height: 36, border: "none", padding: 0, cursor: "pointer", borderRadius: 4 }}
          />
          <TextField
            size="small"
            value={value}
            onChange={(e) => {
              let val = e.target.value;
              if (!val.startsWith("#")) val = "#" + val;
              if (/^#[0-9A-F]{6}$/i.test(val)) onChange(val.toUpperCase());
            }}
            slotProps={{
              input: { style: { fontFamily: "monospace", textTransform: "uppercase" as const, fontSize: "0.8rem" } },
            }}
            fullWidth
          />
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------- Color Role Card ----------
function ColorRoleCard({ label, hex }: { label: string; hex: string }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 1,
          bgcolor: hex,
          border: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
      />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 600, display: "block", lineHeight: 1.2 }}>
          {formatName(label)}
        </Typography>
        <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.secondary", fontSize: "0.6rem" }}>
          {hex}
        </Typography>
      </Box>
    </Box>
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
              style={{ width: 48, height: 48, border: "none", padding: 0, cursor: "pointer", borderRadius: 6 }}
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
  const { config, setKeyColor, addKeyColor, removeKeyColor, resetConfig } = useThemeStore();
  const [addDialogOpen, setAddDialogOpen] = useState(false);

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
          <Grid key={key} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
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
          <Grid key={key} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <KeyColorPicker
              label={getKeyLabel(key)}
              description={getKeyDescription(key)}
              value={config.keyColors[key]}
              onChange={(hex) => setKeyColor(key, hex)}
              onRemove={() => removeKeyColor(key)}
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
                  <ColorRoleCard key={key} label={key} hex={scheme[key as keyof ColorScheme]} />
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
    </Box>
  );
}
