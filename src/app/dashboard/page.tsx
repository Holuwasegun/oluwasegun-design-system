"use client";

import { useAppStore } from "@/store";
import { Suspense } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { getGradientContrastTextColor } from "@/lib/token-utils";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

import DashboardHomeView from "@/components/views/DashboardHomeView";
import ColorView from "@/components/views/ColorView";
import TypographyView from "@/components/views/TypographyView";
import SpacingView from "@/components/views/SpacingView";
import ShadowsView from "@/components/views/ShadowsView";
import ElevationView from "@/components/views/ElevationView";
import RadiusView from "@/components/views/RadiusView";
import MotionView from "@/components/views/MotionView";
import ComponentsView from "@/components/views/ComponentsView";
import PreviewView from "@/components/views/PreviewView";
import ScreenPreviewView from "@/components/views/ScreenPreviewView";
import BrandGalleryView from "@/components/views/BrandGalleryView";

const TOPBAR_HEIGHT = 64;

function DashboardContent() {
  const { currentView } = useAppStore();
  const theme = useTheme();

  let ViewComponent = DashboardHomeView;
  let isFullScreenView = false;

  switch (currentView) {
    case "color": ViewComponent = ColorView; break;
    case "typography": ViewComponent = TypographyView; break;
    case "spacing": ViewComponent = SpacingView; break;
    case "shadows": ViewComponent = ShadowsView; break;
    case "elevation": ViewComponent = ElevationView; break;
    case "radius": ViewComponent = RadiusView; break;
    case "motion": ViewComponent = MotionView; break;
    case "components": ViewComponent = ComponentsView; break;
    case "preview": ViewComponent = PreviewView; break;
    case "screen-preview": 
      ViewComponent = ScreenPreviewView; 
      isFullScreenView = true;
      break;
    case "brand-gallery": 
      ViewComponent = BrandGalleryView; 
      isFullScreenView = true;
      break;
    case "home":
    default:
      ViewComponent = DashboardHomeView;
  }

  if (isFullScreenView) {
    return <ViewComponent />;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <TopBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: `${TOPBAR_HEIGHT}px`,
          transition: theme.transitions.create('margin-left', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ flex: 1 }}>
          <ViewComponent />
        </Box>

        <Box
          component="footer"
          sx={{
            mt: 8,
            bgcolor: `${theme.palette.background.paper}80`,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
        >
          <Box sx={{ px: { xs: 3, md: 6 }, py: 2.5, maxWidth: 1400, mx: 'auto' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: 1,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Typography sx={{ color: getGradientContrastTextColor(theme.palette.primary.main, theme.palette.secondary.main), fontWeight: 700, fontSize: '0.5625rem', lineHeight: 1 }}>O</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                  &copy; 2026 Oluwasegun. All rights reserved.
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'text.disabled', letterSpacing: '0.01em' }}>
                Built with Next.js, React, Material UI, Emotion, Zustand, TypeScript &amp; Tailwind CSS
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }} />}>
      <DashboardContent />
    </Suspense>
  );
}
