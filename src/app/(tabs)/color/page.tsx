"use client";

import { useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Chip,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { useThemeStore } from "@/store";
import { generateSchemeFromConfig, type ColorScheme } from "@/theme/scheme";
import {
  generateTonalPalette,
  generateNeutralPalette,
  UI_TONE_LEVELS,
  type TonalPalette,
} from "@/theme/tonal-palette";

const KEY_COLOR_FIELDS = [
  { key: "primary" as const, label: "Primary", description: "The primary brand color" },
  { key: "secondary" as const, label: "Secondary", description: "A secondary accent color" },
  { key: "tertiary" as const, label: "Tertiary", description: "A third accent color" },
  { key: "error" as const, label: "Error", description: "Error and destructive actions" },
];

const SCHEME_GROUPS = [
  {
    label: "Primary",
    keys: ["primary", "onPrimary", "primaryContainer", "onPrimaryContainer"] as const,
  },
  {
    label: "Secondary",
    keys: ["secondary", "onSecondary", "secondaryContainer", "onSecondaryContainer"] as const,
  },
  {
    label: "Tertiary",
    keys: ["tertiary", "onTertiary", "tertiaryContainer", "onTertiaryContainer"] as const,
  },
  {
    label: "Error",
    keys: ["error", "onError", "errorContainer", "onErrorContainer"] as const,
  },
  {
    label: "Surface",
    keys: [
      "background", "onBackground", "surface", "onSurface",
      "surfaceVariant", "onSurfaceVariant",
    ] as const,
  },
  {
    label: "Surface Containers",
    keys: [
      "surfaceDim", "surfaceBright",
      "surfaceContainerLowest", "surfaceContainerLow",
      "surfaceContainer", "surfaceContainerHigh", "surfaceContainerHighest",
    ] as const,
  },
  {
    label: "Outline",
    keys: ["outline", "outlineVariant"] as const,
  },
  {
    label: "Inverse",
    keys: ["inverseSurface", "inverseOnSurface", "inversePrimary"] as const,
  },
];

function formatTokenName(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

function hexToRgbStr(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}

function getTextColor(bgHex: string): string {
  const r = parseInt(bgHex.slice(1, 3), 16);
  const g = parseInt(bgHex.slice(3, 5), 16);
  const b = parseInt(bgHex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#1D1B20" : "#FFFFFF";
}

// ---------- Tonal Palette Strip ----------
function TonalPaletteStrip({
  label,
  palette,
}: {
  label: string;
  palette: TonalPalette;
}) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
        {label}
      </Typography>
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
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  Tone {tone}
                </Typography>
                <br />
                <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
                  {palette[tone]}
                </Typography>
              </Box>
            }
          >
            <Box
              sx={{
                flex: 1,
                height: 56,
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
                variant="caption"
                sx={{
                  color: getTextColor(palette[tone]),
                  fontWeight: tone === 40 || tone === 80 ? 700 : 400,
                  fontSize: "0.6rem",
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
function KeyColorPicker({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (hex: string) => void;
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
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              {label}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1.5 }}>
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            style={{
              width: 36,
              height: 36,
              border: "none",
              padding: 0,
              cursor: "pointer",
              borderRadius: 4,
            }}
          />
          <TextField
            size="small"
            value={value}
            onChange={(e) => {
              let val = e.target.value;
              if (!val.startsWith("#")) val = "#" + val;
              if (/^#[0-9A-F]{6}$/i.test(val)) {
                onChange(val.toUpperCase());
              }
            }}
            slotProps={{
              input: {
                style: {
                  fontFamily: "monospace",
                  textTransform: "uppercase" as const,
                  fontSize: "0.8rem",
                },
              },
            }}
            fullWidth
          />
        </Box>
      </CardContent>
    </Card>
  );
}

// ---------- Color Role Card ----------
function ColorRoleCard({
  label,
  hex,
}: {
  label: string;
  hex: string;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1,
          bgcolor: hex,
          border: "1px solid",
          borderColor: "divider",
          flexShrink: 0,
        }}
      />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="caption" sx={{ fontWeight: 600, display: "block", lineHeight: 1.2 }}>
          {formatTokenName(label)}
        </Typography>
        <Typography
          variant="caption"
          sx={{ fontFamily: "monospace", color: "text.secondary", fontSize: "0.65rem" }}
        >
          {hex}
        </Typography>
      </Box>
    </Box>
  );
}

// ---------- Main Page ----------
export default function ColorPage() {
  const { config, setKeyColor, resetConfig } = useThemeStore();

  const scheme: ColorScheme = useMemo(
    () => generateSchemeFromConfig(config),
    [config]
  );

  const primaryPalette = useMemo(
    () => generateTonalPalette(config.keyColors.primary),
    [config.keyColors.primary]
  );
  const secondaryPalette = useMemo(
    () => generateTonalPalette(config.keyColors.secondary),
    [config.keyColors.secondary]
  );
  const tertiaryPalette = useMemo(
    () => generateTonalPalette(config.keyColors.tertiary),
    [config.keyColors.tertiary]
  );
  const errorPalette = useMemo(
    () => generateTonalPalette(config.keyColors.error),
    [config.keyColors.error]
  );
  const neutralPalette = useMemo(() => generateNeutralPalette(), []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: "auto" }}>
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
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Key Colors
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {KEY_COLOR_FIELDS.map((field) => (
          <Grid key={field.key} size={{ xs: 12, sm: 6, md: 3 }}>
            <KeyColorPicker
              label={field.label}
              description={field.description}
              value={config.keyColors[field.key]}
              onChange={(hex) => setKeyColor(field.key, hex)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Tonal Palettes */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Tonal Palettes
      </Typography>
      <Box sx={{ mb: 4 }}>
        <TonalPaletteStrip label="Primary" palette={primaryPalette} />
        <TonalPaletteStrip label="Secondary" palette={secondaryPalette} />
        <TonalPaletteStrip label="Tertiary" palette={tertiaryPalette} />
        <TonalPaletteStrip label="Error" palette={errorPalette} />
        <TonalPaletteStrip label="Neutral" palette={neutralPalette} />
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Generated Color Scheme */}
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
        Generated Color Scheme ({config.mode})
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        All 30 color roles derived from your key colors using MD3 tonal mapping
      </Typography>

      <Grid container spacing={3}>
        {SCHEME_GROUPS.map((group) => (
          <Grid key={group.label} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1.5 }}>
                  {group.label}
                </Typography>
                {group.keys.map((key) => (
                  <ColorRoleCard key={key} label={key} hex={scheme[key]} />
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
