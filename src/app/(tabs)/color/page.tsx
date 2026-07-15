"use client";

import { useState, useMemo } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Popover,
  TextField,
  Chip,
  Alert,
  Button,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { tokens, TokenKey, hexToRgb } from "@/theme/tokens";
import { useThemeStore } from "@/store";

interface TokenGroup {
  label: string;
  keys: TokenKey[];
}

const groups: TokenGroup[] = [
  {
    label: "Key Colors",
    keys: [
      "primary",
      "onPrimary",
      "primaryContainer",
      "onPrimaryContainer",
      "secondary",
      "onSecondary",
      "secondaryContainer",
      "onSecondaryContainer",
      "tertiary",
      "onTertiary",
      "tertiaryContainer",
      "onTertiaryContainer",
      "error",
      "onError",
      "errorContainer",
      "onErrorContainer",
    ],
  },
  {
    label: "Surface & Background",
    keys: [
      "background",
      "onBackground",
      "surface",
      "onSurface",
      "surfaceVariant",
      "onSurfaceVariant",
      "surfaceDim",
      "surfaceBright",
      "surfaceContainerLowest",
      "surfaceContainerLow",
      "surfaceContainer",
      "surfaceContainerHigh",
      "surfaceContainerHighest",
    ],
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

function formatTokenName(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
}

interface ColorCardProps {
  tokenKey: TokenKey;
  hex: string;
  isOverridden: boolean;
  onOverride: (key: TokenKey, value: string) => void;
  onRemove: (key: TokenKey) => void;
}

function ColorCard({ tokenKey, hex, isOverridden, onOverride, onRemove }: ColorCardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [localHex, setLocalHex] = useState(hex);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    setLocalHex(hex);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value.toUpperCase();
    setLocalHex(newHex);
    onOverride(tokenKey, newHex);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("#")) val = "#" + val;
    setLocalHex(val.toUpperCase());
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      onOverride(tokenKey, val.toUpperCase());
    }
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderColor: isOverridden ? "warning.main" : "divider",
        borderWidth: isOverridden ? 2 : 1,
        transition: "border-color 0.2s",
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, wordBreak: "break-word" }}>
            {formatTokenName(tokenKey)}
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0, ml: 1 }}>
            <IconButton size="small" onClick={handleOpen} title="Override color">
              <WarningAmberRoundedIcon fontSize="small" color={isOverridden ? "warning" : "disabled"} />
            </IconButton>
            {isOverridden && (
              <IconButton size="small" onClick={() => onRemove(tokenKey)} title="Reset color">
                <RestartAltRoundedIcon fontSize="small" color="warning" />
              </IconButton>
            )}
          </Box>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace" }}>
          {hex}
        </Typography>

        <Box
          sx={{
            height: 80,
            borderRadius: 1.5,
            bgcolor: hex,
            mt: 1,
            border: "1px solid",
            borderColor: "divider",
          }}
        />

        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: "monospace", mt: 0.5, display: "block" }}>
          rgb({hexToRgb(hex)})
        </Typography>

        {isOverridden && (
          <Chip label="Overridden" size="small" color="warning" variant="outlined" sx={{ mt: 1, height: 20, fontSize: 11 }} />
        )}

        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1.5, minWidth: 200 }}>
            <Typography variant="subtitle2">{formatTokenName(tokenKey)}</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <input
                type="color"
                value={localHex}
                onChange={handleColorChange}
                style={{ width: 40, height: 40, border: "none", padding: 0, cursor: "pointer", borderRadius: 4 }}
              />
              <TextField
                size="small"
                value={localHex}
                onChange={handleHexInput}
                slotProps={{ input: { style: { fontFamily: "monospace", textTransform: "uppercase" as const } } }}
                fullWidth
              />
            </Box>
            {isOverridden && (
              <Button
                size="small"
                startIcon={<RestartAltRoundedIcon />}
                onClick={() => {
                  onRemove(tokenKey);
                  handleClose();
                }}
              >
                Reset to default
              </Button>
            )}
          </Box>
        </Popover>
      </CardContent>
    </Card>
  );
}

export default function ColorPage() {
  const { overrides, setOverride, removeOverride, resetOverrides, hasOverrides } = useThemeStore();

  const effectiveColors = useMemo(() => {
    const result: Record<string, string> = {};
    for (const key of Object.keys(tokens) as TokenKey[]) {
      result[key] = (overrides[key] as string) ?? tokens[key];
    }
    return result;
  }, [overrides]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Color
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Material Design 3 color tokens for the Matisse theme
      </Typography>

      {hasOverrides() && (
        <Alert
          severity="warning"
          action={
            <Button color="inherit" size="small" onClick={resetOverrides}>
              Reset All
            </Button>
          }
          sx={{ mb: 3 }}
        >
          You have custom color overrides
        </Alert>
      )}

      {groups.map((group) => (
        <Box key={group.label} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            {group.label}
          </Typography>
          <Grid container spacing={2}>
            {group.keys.map((key) => (
              <Grid key={key} size={{ xs: 12, sm: 6, md: 3 }}>
                <ColorCard
                  tokenKey={key}
                  hex={effectiveColors[key]}
                  isOverridden={key in overrides}
                  onOverride={(k, v) => setOverride(k, v)}
                  onRemove={(k) => removeOverride(k)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
