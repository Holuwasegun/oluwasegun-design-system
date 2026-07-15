'use client';

import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
} from '@mui/material';

const shapeScale = [
  { name: 'None', value: 0, token: 'shape.none' },
  { name: 'Extra Small', value: 4, token: 'shape.extraSmall' },
  { name: 'Small', value: 8, token: 'shape.small' },
  { name: 'Medium', value: 12, token: 'shape.medium' },
  { name: 'Large', value: 16, token: 'shape.large' },
  { name: 'Extra Large', value: 24, token: 'shape.extraLarge' },
  { name: 'Full', value: 9999, token: 'shape.full' },
];

export default function RadiusPage() {
  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
        Border Radius
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Shape scale for corners
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        MD3 Shape Scale
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {shapeScale.map(({ name, value, token }) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={name}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 120,
                    height: 80,
                    bgcolor: 'primary.main',
                    opacity: 0.8,
                    borderRadius: value,
                    transition: 'border-radius 0.3s ease',
                  }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value === 9999 ? '9999px' : `${value}px`}
                </Typography>
                <Chip
                  label={token}
                  size="small"
                  variant="outlined"
                  sx={{ fontFamily: 'monospace', fontSize: 11 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Chips & Buttons
      </Typography>
      <Stack spacing={3} sx={{ mb: 4 }}>
        {shapeScale.map(({ name, value }) => (
          <Stack key={`btn-${name}`} direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ width: 120, color: 'text.secondary' }}>
              {name}
            </Typography>
            <Chip
              label="Chip"
              sx={{ borderRadius: value, bgcolor: 'primary.main', color: 'primary.contrastText' }}
            />
            <Chip
              label="Outlined"
              variant="outlined"
              sx={{ borderRadius: value, borderColor: 'primary.main', color: 'primary.main' }}
            />
            <Button
              variant="contained"
              sx={{ borderRadius: value, textTransform: 'none' }}
            >
              Button
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: value, textTransform: 'none' }}
            >
              Outlined
            </Button>
          </Stack>
        ))}
      </Stack>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Square Examples
      </Typography>
      <Grid container spacing={2}>
        {shapeScale.map(({ name, value }) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={`sq-${name}`}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: 'secondary.main',
                  borderRadius: value,
                  transition: 'border-radius 0.3s ease',
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {name}: {value === 9999 ? 'full' : `${value}px`}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
