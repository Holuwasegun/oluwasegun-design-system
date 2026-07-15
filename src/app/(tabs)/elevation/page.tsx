'use client';

import { useState } from 'react';
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material';

const elevationLevels = [
  {
    level: 0,
    label: 'Resting Surface',
    description: 'No shadow — base layer (background)',
    shadow: 'none',
  },
  {
    level: 1,
    label: 'Resting Component',
    description: 'Cards at rest, bottom sheets',
    shadow: '0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)',
  },
  {
    level: 2,
    label: 'Resting Component',
    description: 'FAB, snackbar',
    shadow: '0px 1px 2px rgba(0,0,0,0.3), 0px 2px 6px 2px rgba(0,0,0,0.15)',
  },
  {
    level: 3,
    label: 'Resting Component',
    description: 'Menus, side sheets, cards',
    shadow: '0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px rgba(0,0,0,0.3)',
  },
  {
    level: 4,
    label: 'Resting Component',
    description: 'Dialogs, pickers',
    shadow: '0px 6px 10px 4px rgba(0,0,0,0.15), 0px 2px 3px rgba(0,0,0,0.3)',
  },
  {
    level: 5,
    label: 'Highest Surface',
    description: 'Navigation drawer, banner',
    shadow: '0px 8px 12px 6px rgba(0,0,0,0.15), 0px 4px 4px rgba(0,0,0,0.3)',
  },
];

const liftedShadows: Record<number, string> = {
  0: '0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)',
  1: '0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px rgba(0,0,0,0.3)',
  2: '0px 6px 10px 4px rgba(0,0,0,0.15), 0px 2px 3px rgba(0,0,0,0.3)',
  3: '0px 8px 12px 6px rgba(0,0,0,0.15), 0px 4px 4px rgba(0,0,0,0.3)',
  4: '0px 8px 12px 6px rgba(0,0,0,0.15), 0px 4px 4px rgba(0,0,0,0.3)',
  5: '0px 8px 12px 6px rgba(0,0,0,0.15), 0px 4px 4px rgba(0,0,0,0.3)',
};

export default function ElevationPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Elevation
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        How elevation maps to surfaces and components
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Elevation Levels
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {elevationLevels.map(({ level, label, description, shadow }) => {
          const isHovered = hoveredCard === `level-${level}`;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={level}>
              <Card
                onMouseEnter={() => setHoveredCard(`level-${level}`)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  height: 180,
                  boxShadow: isHovered ? liftedShadows[level] : shadow,
                  transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
                  cursor: 'pointer',
                  border: isHovered ? '1px solid' : '1px solid transparent',
                  borderColor: isHovered ? 'primary.main' : 'transparent',
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <Box>
                    <Typography variant="h2" color="primary.main" sx={{ fontWeight: 700 }}>
                      {level}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 0.5 }}>
                      {label}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Interactive Demo — Hover to Lift
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Hover over any card below to see it transition from its resting elevation to a lifted state.
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {elevationLevels.map(({ level, shadow }) => {
          const isHovered = hoveredCard === `demo-${level}`;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`demo-${level}`}>
              <Card
                onMouseEnter={() => setHoveredCard(`demo-${level}`)}
                onMouseLeave={() => setHoveredCard(null)}
                sx={{
                  height: 120,
                  boxShadow: shadow,
                  transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
                  cursor: 'pointer',
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography variant="body1" color="text.secondary">
                    Level {level}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Before / After Comparison
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Side-by-side view: component at rest vs. component lifted to a higher elevation.
      </Typography>
      <Grid container spacing={4}>
        {elevationLevels.filter((_, i) => i < 5).map(({ level, label, shadow }) => (
          <Grid size={{ xs: 12, sm: 6 }} key={`compare-${level}`}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'stretch' }}>
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 3,
                  boxShadow: shadow,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography variant="caption" color="text.secondary" gutterBottom>
                  At Rest
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Level {level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {label}
                </Typography>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: 3,
                  boxShadow: liftedShadows[level],
                  transform: 'translateY(-2px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography variant="caption" color="primary.main" gutterBottom sx={{ fontWeight: 600 }}>
                  Lifted
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Level {level + 1}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Elevated state
                </Typography>
              </Paper>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
