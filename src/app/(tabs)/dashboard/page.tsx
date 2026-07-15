"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Palette as PaletteIcon,
  TextFields as TextFieldsIcon,
  SpaceBar as SpaceBarIcon,
  Gradient as GradientIcon,
  Layers as LayersIcon,
  CropSquare as CropSquareIcon,
  Animation as AnimationIcon,
  Widgets as WidgetsIcon,
} from "@mui/icons-material";
import { useThemeStore, useProjectStore } from "@/store";
import { generateSchemeFromConfig, type ColorScheme } from "@/theme/scheme";
import { generateTonalPalette, generateNeutralPalette, UI_TONE_LEVELS } from "@/theme/tonal-palette";

const sections = [
  { label: "Color", icon: <PaletteIcon />, href: "/color", description: "Key colors, tonal palettes, color roles" },
  { label: "Typography", icon: <TextFieldsIcon />, href: "/typography", description: "Type scale generator, size & weight" },
  { label: "Spacing", icon: <SpaceBarIcon />, href: "/spacing", description: "Base unit, spacing scale, grid" },
  { label: "Shadows", icon: <GradientIcon />, href: "/shadows", description: "Shadow elevation tokens" },
  { label: "Elevation", icon: <LayersIcon />, href: "/elevation", description: "Elevation levels, hover demos" },
  { label: "Border Radius", icon: <CropSquareIcon />, href: "/radius", description: "Shape scale, radius tokens" },
  { label: "Motion", icon: <AnimationIcon />, href: "/motion", description: "Duration, easing, transitions" },
  { label: "Components", icon: <WidgetsIcon />, href: "/components", description: "Buttons, cards, alerts, fields" },
];

function MiniPalette({ colors }: { colors: string[] }) {
  return (
    <Box sx={{ display: "flex", borderRadius: 1.5, overflow: "hidden", height: 28, border: "1px solid", borderColor: "divider" }}>
      {colors.map((c, i) => (
        <Box key={i} sx={{ flex: 1, bgcolor: c }} />
      ))}
    </Box>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const { config, currentProjectId } = useThemeStore();
  const { projects } = useProjectStore();
  const currentProject = projects.find((p) => p.id === currentProjectId);

  const scheme: ColorScheme = useMemo(() => generateSchemeFromConfig(config), [config]);
  const primaryPalette = useMemo(() => generateTonalPalette(config.keyColors.primary), [config.keyColors.primary]);
  const neutralPalette = useMemo(() => generateNeutralPalette(), []);

  const keyColorCount = Object.keys(config.keyColors).length;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: "auto" }}>
      {/* Hero Header */}
      <Box
        sx={{
          mb: 5,
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: `linear-gradient(135deg, ${scheme.primary}08 0%, ${scheme.tertiary}08 50%, ${scheme.secondary}05 100%)`,
          border: `1px solid ${scheme.primary}15`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${scheme.primary}10 0%, transparent 70%)`,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5, letterSpacing: '-0.02em', fontSize: { xs: '1.375rem', md: '1.5rem' } }}>
            Oluwasegun Design System
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6, fontSize: { xs: '0.9375rem', md: '1rem' } }}>
            Material Design 3 tokens, scales, and components — all configurable and exportable
          </Typography>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {[
          { label: "Mode", value: config.mode === "light" ? "Light" : "Dark", color: scheme.primary },
          { label: "Key Colors", value: String(keyColorCount), color: scheme.secondary },
          { label: "Base Size", value: `${config.typography.baseSize}px`, color: scheme.tertiary },
          { label: "Scale", value: `${config.typography.scale}×`, color: scheme.primary },
          { label: "Base Unit", value: `${config.spacing.baseUnit}px`, color: scheme.secondary },
          { label: "Projects", value: String(projects.length), color: scheme.tertiary },
        ].map((stat) => (
          <Grid key={stat.label} size={{ xs: 6, sm: 4, md: 2 }}>
            <Card
              variant="outlined"
              sx={{
                height: "100%",
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.06)', transform: 'translateY(-1px)' },
              }}
            >
              <CardContent sx={{ p: 2, "&:last-child": { pb: 2 }, textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5, fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: { xs: '0.6875rem', md: '0.75rem' } }}>
                  {stat.label}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: stat.color, letterSpacing: '-0.01em' }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Color Preview */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              transition: 'box-shadow 0.2s ease',
              '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
            }}
          >
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <PaletteIcon sx={{ color: scheme.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Color Palette</Typography>
              </Box>
              <MiniPalette colors={UI_TONE_LEVELS.slice(0, 12).map((t) => primaryPalette[t])} />
              <Box sx={{ display: "flex", gap: 0.75, mt: 2, flexWrap: "wrap" }}>
                {["primary", "secondary", "tertiary", "neutral", "neutralVariant"].map((key) => (
                  <Chip
                    key={key}
                    label={key}
                    size="small"
                    sx={{ bgcolor: config.keyColors[key], color: "#fff", fontWeight: 600, fontSize: "0.625rem", height: 22 }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Typography Preview */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              transition: 'box-shadow 0.2s ease',
              '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
            }}
          >
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <TextFieldsIcon sx={{ color: scheme.secondary, fontSize: 20 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Type Scale</Typography>
                <Chip label={`${config.typography.scale}×`} size="small" sx={{ ml: "auto", fontWeight: 600, fontSize: '0.7rem' }} />
              </Box>
              <Typography sx={{ fontSize: config.typography.baseSize * Math.pow(config.typography.scale, 3), fontWeight: 700, lineHeight: 1.2, display: "block", letterSpacing: '-0.02em' }}>
                Display
              </Typography>
              <Typography sx={{ fontSize: config.typography.baseSize * Math.pow(config.typography.scale, 1), fontWeight: 500, lineHeight: 1.4, display: "block" }}>
                Title Medium
              </Typography>
              <Typography sx={{ fontSize: config.typography.baseSize, fontWeight: 400, lineHeight: 1.6, display: "block", color: "text.secondary" }}>
                Body — The quick brown fox jumps over the lazy dog
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Surface Colors */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              transition: 'box-shadow 0.2s ease',
              '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
            }}
          >
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <LayersIcon sx={{ color: scheme.tertiary, fontSize: 20 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Surface System</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 0.5, mb: 1 }}>
                {["surfaceContainerLowest", "surfaceContainerLow", "surfaceContainer", "surfaceContainerHigh", "surfaceContainerHighest"].map((key) => (
                  <Box key={key} sx={{ flex: 1, height: 44, bgcolor: scheme[key as keyof ColorScheme], borderRadius: 1.5, border: "1px solid", borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <Typography sx={{ fontSize: { xs: "0.5rem", sm: "0.5625rem" }, color: scheme.onSurface, textAlign: "center", px: 0.25, whiteSpace: "nowrap", fontWeight: 500 }}>
                      {key.replace("surfaceContainer", "SC")}
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {["primary", "secondary", "tertiary", "error"].map((key) => (
                  <Box key={key} sx={{ flex: 1, height: 36, bgcolor: scheme[key as keyof ColorScheme], borderRadius: 1.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography sx={{ fontSize: "0.625rem", color: scheme[`on${key.charAt(0).toUpperCase() + key.slice(1)}` as keyof ColorScheme] ?? "#fff", fontWeight: 600 }}>
                      {key}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Section Nav */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              transition: 'box-shadow 0.2s ease',
              '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
            }}
          >
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <WidgetsIcon sx={{ color: scheme.primary, fontSize: 20 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Sections</Typography>
              </Box>
              <Grid container spacing={1}>
                {sections.map((section) => (
                  <Grid key={section.href} size={{ xs: 6 }}>
                    <Box
                      onClick={() => router.push(section.href)}
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        cursor: "pointer",
                        border: "1px solid",
                        borderColor: "divider",
                        transition: "all 0.15s ease",
                        "&:hover": { borderColor: "primary.main", bgcolor: `${scheme.primary}08`, transform: 'translateY(-1px)' },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.25 }}>
                        <Avatar sx={{ width: 24, height: 24, bgcolor: "transparent", color: "text.secondary", '& svg': { fontSize: 16 } }}>
                          {section.icon}
                        </Avatar>
                        <Typography variant="caption" sx={{ fontWeight: 600, letterSpacing: '0.01em' }}>{section.label}</Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", fontSize: "0.6rem", lineHeight: 1.4 }}>
                        {section.description}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Current Project */}
      {currentProject && (
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={`Active: ${currentProject.name}`}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
          <Typography variant="caption" color="text.secondary">
            saved {new Date(currentProject.updatedAt).toLocaleDateString()}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
