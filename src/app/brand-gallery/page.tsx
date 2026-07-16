'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box, Typography, Stack, IconButton, Tooltip, Chip, Divider,
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
  { id: 'colors', label: 'Colors', icon: <PaletteIcon sx={{ fontSize: 16 }} />, description: 'Color palette & swatches' },
  { id: 'typography', label: 'Typography', icon: <TypographyIcon sx={{ fontSize: 16 }} />, description: 'Type scale & families' },
  { id: 'icons', label: 'Icon Library', icon: <IconLibraryIcon sx={{ fontSize: 16 }} />, description: 'Searchable icon grid' },
  { id: 'spacing', label: 'Spacing & Elevation', icon: <SpacingIcon sx={{ fontSize: 16 }} />, description: 'Scale, shadows & radius' },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

const SIDEBAR_WIDTH = 240;

export default function BrandGalleryPage() {
  const config = useThemeStore((s) => s.config);
  const scheme = generateSchemeFromConfig(config);
  const [activeSection, setActiveSection] = useState<SectionId>('colors');
  const [presentMode, setPresentMode] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id as SectionId);
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: SectionId) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    const h = () => setPresentMode(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      {/* ── Left Sidebar ── */}
      <Box sx={{
        width: SIDEBAR_WIDTH, flexShrink: 0, position: 'sticky', top: 0,
        height: '100vh', display: 'flex', flexDirection: 'column',
        borderRight: '1px solid', borderColor: 'divider',
        bgcolor: 'background.paper',
      }}>
        {/* Brand + Back */}
        <Box sx={{ px: 2, py: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
            <Tooltip title="Back to dashboard">
              <IconButton
                component={Link}
                href="/dashboard"
                size="small"
                sx={{ '&:hover': { bgcolor: 'action.hover' } }}
              >
                <BackIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 11 }}>Dashboard</Typography>
          </Stack>
          <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center' }}>
            <Box sx={{
              width: 32, height: 32, borderRadius: 1.5,
              background: `linear-gradient(135deg, ${scheme.primary}, ${scheme.tertiary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: 11 }}>O</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: 13 }}>Brand Gallery</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: 10 }}>Style guide & assets</Typography>
            </Box>
          </Stack>
        </Box>

        {/* Navigation */}
        <Box sx={{ flex: 1, overflow: 'auto', py: 2, px: 1 }}>
          <Typography variant="caption" sx={{
            color: 'text.disabled', textTransform: 'uppercase', letterSpacing: '0.1em',
            fontWeight: 600, fontSize: 9.5, display: 'block', mb: 1, px: 1,
          }}>
            Sections
          </Typography>
          <Stack spacing={0.25}>
            {SECTIONS.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <Box
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  sx={{
                    px: 1.25, py: 1, borderRadius: 1.5, cursor: 'pointer',
                    transition: 'all 0.15s cubic-bezier(0.4,0,0.2,1)',
                    bgcolor: isActive ? `${scheme.primary}0D` : 'transparent',
                    position: 'relative',
                    '&:hover': { bgcolor: isActive ? `${scheme.primary}12` : 'action.hover' },
                  }}
                >
                  {isActive && (
                    <Box sx={{
                      position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                      width: 3, height: 16, borderRadius: '0 3px 3px 0',
                      bgcolor: scheme.primary,
                    }} />
                  )}
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Box sx={{ color: isActive ? scheme.primary : 'text.secondary', display: 'flex', transition: 'color 0.15s' }}>
                      {sec.icon}
                    </Box>
                    <Box>
                      <Typography variant="body2" sx={{
                        fontWeight: isActive ? 600 : 400, fontSize: 12.5,
                        color: isActive ? 'text.primary' : 'text.secondary',
                        lineHeight: 1.3, transition: 'color 0.15s',
                      }}>
                        {sec.label}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* Sidebar Footer */}
        <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip
              label={config.mode === 'light' ? 'Light' : 'Dark'}
              size="small"
              variant="outlined"
              sx={{ fontSize: 10, height: 20 }}
            />
            <Tooltip title={presentMode ? 'Exit presentation' : 'Presentation mode'}>
              <IconButton
                size="small"
                onClick={togglePresent}
                sx={{
                  width: 28, height: 28,
                  color: presentMode ? 'primary.main' : 'text.secondary',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                {presentMode ? <ExitPresentIcon sx={{ fontSize: 16 }} /> : <PresentIcon sx={{ fontSize: 16 }} />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Box>

      {/* ── Main Content ── */}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <Box sx={{
          px: 4, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid', borderColor: 'divider',
          position: 'sticky', top: 0, zIndex: 10,
          bgcolor: (t) => `${t.palette.background.paper}ee`,
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: 16 }}>
              {SECTIONS.find((s) => s.id === activeSection)?.label}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 12.5 }}>
              {SECTIONS.find((s) => s.id === activeSection)?.description}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: 'text.disabled', fontSize: 10 }}>
              {activeSection === 'icons' ? '150+ assets' : 'Live from design system'}
            </Typography>
          </Stack>
        </Box>

        {/* Sections */}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Box sx={{ maxWidth: 960, mx: 'auto', px: { xs: 3, md: 5 }, py: 5 }}>
            <Box id="colors" ref={(el: HTMLElement | null) => { sectionRefs.current['colors'] = el; }} sx={{ mb: 8, scrollMarginTop: 80 }}>
              <ColorPaletteSection />
            </Box>
            <Divider sx={{ mb: 8 }} />
            <Box id="typography" ref={(el: HTMLElement | null) => { sectionRefs.current['typography'] = el; }} sx={{ mb: 8, scrollMarginTop: 80 }}>
              <TypographySection />
            </Box>
            <Divider sx={{ mb: 8 }} />
            <Box id="icons" ref={(el: HTMLElement | null) => { sectionRefs.current['icons'] = el; }} sx={{ mb: 8, scrollMarginTop: 80 }}>
              <IconLibrarySection />
            </Box>
            <Divider sx={{ mb: 8 }} />
            <Box id="spacing" ref={(el: HTMLElement | null) => { sectionRefs.current['spacing'] = el; }} sx={{ mb: 8, scrollMarginTop: 80 }}>
              <SpacingElevationSection />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
