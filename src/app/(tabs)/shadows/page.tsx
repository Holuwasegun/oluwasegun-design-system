'use client';

import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material';

const shadowLevels: { level: number; shadow: string; label: string }[] = [
  { level: 0, shadow: 'none', label: 'none' },
  {
    level: 1,
    shadow: '0px 1px 2px rgba(0,0,0,0.3), 0px 1px 3px 1px rgba(0,0,0,0.15)',
    label: '0px 1px 2px + 1px 3px blur',
  },
  {
    level: 2,
    shadow: '0px 1px 2px rgba(0,0,0,0.3), 0px 2px 6px 2px rgba(0,0,0,0.15)',
    label: '0px 1px 2px + 2px 6px blur',
  },
  {
    level: 3,
    shadow: '0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px rgba(0,0,0,0.3)',
    label: '4px 8px 3px blur + 1px 3px',
  },
  {
    level: 4,
    shadow: '0px 6px 10px 4px rgba(0,0,0,0.15), 0px 2px 3px rgba(0,0,0,0.3)',
    label: '6px 10px 4px blur + 2px 3px',
  },
  {
    level: 5,
    shadow: '0px 8px 12px 6px rgba(0,0,0,0.15), 0px 4px 4px rgba(0,0,0,0.3)',
    label: '8px 12px 6px blur + 4px 4px',
  },
];

function generateGenericShadow(level: number): string {
  const spread = level - 2;
  const blur = 4 + level * 2;
  const y = level * 2;
  const opacityAmbient = 0.1 + level * 0.01;
  const opacityKey = 0.15 + level * 0.01;
  return `0px ${y}px ${blur}px ${spread}px rgba(0,0,0,${opacityAmbient.toFixed(2)}), 0px ${Math.floor(y / 2)}px ${Math.floor(blur / 3)}px rgba(0,0,0,${opacityKey.toFixed(2)})`;
}

const allLevels = shadowLevels.map((s) => s.level);

for (let i = 6; i <= 24; i++) {
  shadowLevels.push({
    level: i,
    shadow: generateGenericShadow(i),
    label: `generic increasing shadow`,
  });
}

export default function ShadowsPage() {
  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
        Shadows
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Material Design elevation shadow values
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        MD3 Shadow Tokens
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {shadowLevels.filter((s) => s.level <= 5).map(({ level, shadow, label }) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={level}>
            <Card
              sx={{
                height: 140,
                boxShadow: shadow,
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: shadowLevels[Math.min(level + 2, 24)].shadow,
                },
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {level}
                  </Typography>
                  <Chip label={`Level ${level}`} size="small" color="primary" variant="outlined" />
                </Stack>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', fontSize: 10, lineHeight: 1.4, wordBreak: 'break-all' }}>
                  {label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Extended Levels 6–24
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Increasing shadow intensity for deeper surfaces. Hover to preview a higher level.
      </Typography>
      <Grid container spacing={2}>
        {shadowLevels.filter((s) => s.level >= 6).map(({ level, shadow }) => (
          <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={level}>
            <Card
              sx={{
                height: 100,
                boxShadow: shadow,
                transition: 'box-shadow 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: shadowLevels[Math.min(level + 3, 24)].shadow,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', py: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {level}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Elevation
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
