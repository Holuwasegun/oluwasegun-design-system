'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box, Typography, Stack, IconButton, Tooltip, Chip,
} from '@mui/material';
import {
  Palette as PaletteIcon,
  TextFields as TypographyIcon,
  Category as IconLibraryIcon,
  SpaceBar as SpacingIcon,
  Fullscreen as PresentIcon,
  FullscreenExit as ExitPresentIcon,
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { useThemeStore } from '@/store';
import { generateSchemeFromConfig } from '@/theme/scheme';
import ColorPaletteSection from '@/components/brand-gallery/ColorPaletteSection';
import TypographySection from '@/components/brand-gallery/TypographySection';
import IconLibrarySection from '@/components/brand-gallery/IconLibrarySection';
import SpacingElevationSection from '@/components/brand-gallery/SpacingElevationSection';

const SECTIONS = [
  { id: 'colors', label: 'Colors', icon: <PaletteIcon sx={{ fontSize: 18 }} /> },
  { id: 'typography', label: 'Typography', icon: <TypographyIcon sx={{ fontSize: 18 }} /> },
  { id: 'icons', label: 'Icons', icon: <IconLibraryIcon sx={{ fontSize: 18 }} /> },
  { id: 'spacing', label: 'Spacing & Elevation', icon: <SpacingIcon sx={{ fontSize: 18 }} /> },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

export default function BrandGalleryPage() {
  const config = useThemeStore((s) => s.config);
  const scheme = generateSchemeFromConfig(config);
  const [activeSection, setActiveSection] = useState<SectionId>('colors');
  const [presentMode, setPresentMode] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Intersection observer for active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: SectionId) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const togglePresent = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setPresentMode(true);
    } else {
      document.exitFullscreen?.();
      setPresentMode(false);
    }
  }, []);

  useEffect(() => {
    const handler = () => setPresentMode(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Keyboard shortcut: Escape to exit present mode
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && presentMode) {
        setPresentMode(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [presentMode]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sticky Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          bgcolor: (t) => `${t.palette.background.paper}ee`,
          transition: 'all 0.3s',
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 } }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', py: 1.5 }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Tooltip title="Back to dashboard">
                <IconButton component={Link} href="/dashboard" size="small">
                  <BackIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 1.5,
                    background: `linear-gradient(135deg, ${scheme.primary}, ${scheme.tertiary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 10 }}>O</Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>Brand Gallery</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>Visual style guide & asset library</Typography>
                </Box>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Chip
                label={config.mode === 'light' ? 'Light' : 'Dark'}
                size="small"
                variant="outlined"
                sx={{ fontSize: 10, height: 22 }}
              />
              <Tooltip title={presentMode ? 'Exit presentation' : 'Presentation mode (Fullscreen)'}>
                <IconButton onClick={togglePresent} size="small" sx={{ color: presentMode ? 'primary.main' : 'text.secondary' }}>
                  {presentMode ? <ExitPresentIcon fontSize="small" /> : <PresentIcon fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Section Tabs */}
          <Stack direction="row" spacing={0.5} sx={{ pb: 1, overflowX: 'auto', '&::-webkit-scrollbar': { display: 'none' } }}>
            {SECTIONS.map((sec) => (
              <Box
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.75,
                  px: 2,
                  py: 0.75,
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  bgcolor: activeSection === sec.id ? 'primary.main' : 'transparent',
                  color: activeSection === sec.id ? 'primary.contrastText' : 'text.secondary',
                  '&:hover': {
                    bgcolor: activeSection === sec.id ? 'primary.main' : 'action.hover',
                  },
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {sec.icon}
                <Typography variant="caption" sx={{ fontWeight: activeSection === sec.id ? 600 : 400, fontSize: '0.75rem' }}>
                  {sec.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Sections */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
        <Box id="colors" ref={(el: HTMLElement | null) => { sectionRefs.current['colors'] = el; }} sx={{ mb: 8, scrollMarginTop: 140 }}>
          <ColorPaletteSection />
        </Box>
        <Box id="typography" ref={(el: HTMLElement | null) => { sectionRefs.current['typography'] = el; }} sx={{ mb: 8, scrollMarginTop: 140 }}>
          <TypographySection />
        </Box>
        <Box id="icons" ref={(el: HTMLElement | null) => { sectionRefs.current['icons'] = el; }} sx={{ mb: 8, scrollMarginTop: 140 }}>
          <IconLibrarySection />
        </Box>
        <Box id="spacing" ref={(el: HTMLElement | null) => { sectionRefs.current['spacing'] = el; }} sx={{ mb: 8, scrollMarginTop: 140 }}>
          <SpacingElevationSection />
        </Box>
      </Box>
    </Box>
  );
}
