"use client";

import { useMemo, useRef } from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

function normalizeHex(hex: string): string {
  let val = hex.trim();
  if (!val.startsWith("#")) val = "#" + val;
  if (/^#[0-9A-F]{3}$/i.test(val)) {
    val = "#" + val[1] + val[1] + val[2] + val[2] + val[3] + val[3];
  }
  return val.toUpperCase();
}

function isValidHex(hex: string): boolean {
  let val = hex.trim();
  if (!val.startsWith("#")) val = "#" + val;
  return /^#([0-9A-F]{3}|[0-9A-F]{6})$/i.test(val);
}

export function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const norm = normalizeHex(isValidHex(hex) ? hex : "#000000");
  const r = parseInt(norm.slice(1, 3), 16) / 255;
  const g = parseInt(norm.slice(3, 5), 16) / 255;
  const b = parseInt(norm.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  const s = max === 0 ? 0 : d / max;
  return { h: Math.round(h * 360), s, v: max };
}

export function hsvToHex(h: number, s: number, v: number): string {
  const hue = ((h % 360) + 360) % 360;
  const c = v * s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (hue < 60) { r = c; g = x; }
  else if (hue < 120) { r = x; g = c; }
  else if (hue < 180) { g = c; b = x; }
  else if (hue < 240) { g = x; b = c; }
  else if (hue < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0").toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

const PRESET_SWATCHES = [
  "#000000", "#FFFFFF", "#9CA3AF", "#EF4444", "#F97316", "#F59E0B",
  "#10B981", "#14B8A6", "#3B82F6", "#6366F1", "#A855F7", "#EC4899",
];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export function CustomColorPicker({
  value,
  onChange,
  onDone,
  presets = PRESET_SWATCHES,
  height = 132,
}: {
  value: string;
  onChange: (hex: string) => void;
  onDone?: () => void;
  presets?: string[];
  height?: number;
}) {
  const theme = useTheme();
  const currentHex = normalizeHex(isValidHex(value) ? value : "#000000");
  const hsv = useMemo(() => hexToHsv(currentHex), [currentHex]);

  const svRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<"sv" | "hue" | null>(null);

  const isDark = theme.palette.mode === "dark";
  const shadowInset = isDark
    ? "inset 5px 5px 10px rgba(0,0,0,0.75), inset -5px -5px 10px rgba(255,255,255,0.05)"
    : "inset 5px 5px 10px rgba(0,0,0,0.15), inset -5px -5px 10px rgba(255,255,255,0.95)";

  const updateFromSv = (clientX: number, clientY: number) => {
    const el = svRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const s = clamp01((clientX - rect.left) / rect.width);
    const v = clamp01(1 - (clientY - rect.top) / rect.height);
    onChange(hsvToHex(hsv.h, s, v));
  };

  const updateFromHue = (clientX: number) => {
    const el = hueRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const h = Math.round(clamp01((clientX - rect.left) / rect.width) * 360);
    onChange(hsvToHex(h, hsv.s, hsv.v));
  };

  const svBackground = `linear-gradient(to top, #000000 0%, transparent 100%), linear-gradient(to right, #FFFFFF 0%, hsl(${hsv.h}, 100%, 50%) 100%)`;
  const hueBackground = "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)";

  return (
    <Box sx={{ width: "100%", userSelect: "none" }}>
      {/* Saturation / Value field */}
      <Box
        ref={svRef}
        onPointerDown={(e) => {
          e.preventDefault();
          draggingRef.current = "sv";
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          updateFromSv(e.clientX, e.clientY);
        }}
        onPointerMove={(e) => {
          if (draggingRef.current === "sv") updateFromSv(e.clientX, e.clientY);
        }}
        onPointerUp={() => { draggingRef.current = null; }}
        onPointerCancel={() => { draggingRef.current = null; }}
        sx={{
          position: "relative",
          height,
          borderRadius: 2.5,
          background: svBackground,
          cursor: "crosshair",
          touchAction: "none",
          boxShadow: shadowInset,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: `${hsv.s * 100}%`,
            top: `${(1 - hsv.v) * 100}%`,
            width: 16,
            height: 16,
            borderRadius: "50%",
            bgcolor: "#FFFFFF",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 0 1.5px rgba(0,0,0,0.35), 0 0 0 4px rgba(255,255,255,0.9), 0 2px 6px rgba(0,0,0,0.35)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* Hue slider */}
      <Box
        ref={hueRef}
        onPointerDown={(e) => {
          e.preventDefault();
          draggingRef.current = "hue";
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          updateFromHue(e.clientX);
        }}
        onPointerMove={(e) => {
          if (draggingRef.current === "hue") updateFromHue(e.clientX);
        }}
        onPointerUp={() => { draggingRef.current = null; }}
        onPointerCancel={() => { draggingRef.current = null; }}
        sx={{
          position: "relative",
          height: 18,
          mt: 1.5,
          borderRadius: 9,
          background: hueBackground,
          cursor: "pointer",
          touchAction: "none",
          boxShadow: shadowInset,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: `${(hsv.h / 360) * 100}%`,
            top: "50%",
            width: 16,
            height: 16,
            borderRadius: "50%",
            bgcolor: "#FFFFFF",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 0 1.5px rgba(0,0,0,0.35), 0 0 0 4px rgba(255,255,255,0.9), 0 2px 6px rgba(0,0,0,0.35)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* Preset swatches */}
      <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary", display: "block", mt: 1.75, mb: 0.75 }}>
        QUICK COLORS
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 0.75,
        }}
      >
        {presets.map((preset) => {
          const selected = preset.toLowerCase() === currentHex.toLowerCase();
          return (
            <Box
              key={preset}
              onClick={(e) => {
                e.stopPropagation();
                onChange(normalizeHex(preset));
              }}
              title={preset}
              role="button"
              aria-label={`Select color ${preset}`}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(normalizeHex(preset));
                }
              }}
              sx={{
                aspectRatio: "1",
                borderRadius: "50%",
                bgcolor: preset,
                cursor: "pointer",
                border: "2px solid",
                borderColor: selected ? "primary.main" : "background.paper",
                boxShadow: selected
                  ? `0 0 0 2px ${theme.palette.primary.main}, 0 2px 6px rgba(0,0,0,0.25)`
                  : "0 1px 3px rgba(0,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.12s ease, box-shadow 0.12s ease",
                "&:hover": { transform: "scale(1.12)" },
                "&:focus-visible": {
                  outline: "2px solid",
                  outlineColor: "primary.main",
                  outlineOffset: 2,
                },
              }}
            >
              {selected && (
                <CheckRoundedIcon
                  sx={{
                    fontSize: 12,
                    color: getSwatchCheckColor(preset),
                    filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))",
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* Footer: live readout + done */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 1.75,
          pt: 1.5,
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: 1.5,
              bgcolor: currentHex,
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          />
          <Typography sx={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.8125rem", letterSpacing: "0.05em" }}>
            {currentHex}
          </Typography>
        </Stack>
        {onDone && (
          <Button
            size="small"
            variant="contained"
            onClick={onDone}
            sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.75rem", borderRadius: 2, px: 2 }}
          >
            Done
          </Button>
        )}
      </Box>
    </Box>
  );
}

function getSwatchCheckColor(presetHex: string): string {
  const norm = normalizeHex(presetHex);
  const r = parseInt(norm.slice(1, 3), 16);
  const g = parseInt(norm.slice(3, 5), 16);
  const b = parseInt(norm.slice(5, 7), 16);
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum > 0.5 ? "#1D1B20" : "#FFFFFF";
}
