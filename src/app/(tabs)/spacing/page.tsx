'use client';

import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Divider,
  Stack,
  Chip,
} from '@mui/material';

const spacingValues = [
  { px: 0, token: 'spacing(0)' },
  { px: 4, token: 'spacing(0.5)' },
  { px: 8, token: 'spacing(1)' },
  { px: 12, token: 'spacing(1.5)' },
  { px: 16, token: 'spacing(2)' },
  { px: 24, token: 'spacing(3)' },
  { px: 32, token: 'spacing(4)' },
  { px: 40, token: 'spacing(5)' },
  { px: 48, token: 'spacing(6)' },
  { px: 56, token: 'spacing(7)' },
  { px: 64, token: 'spacing(8)' },
];

const rulerTicks = [0, 4, 8, 12, 16, 24, 32, 40, 48, 56, 64];

export default function SpacingPage() {
  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
        Spacing
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        8px grid system for consistent layouts
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Spacing Scale
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ overflowX: 'auto' }}>
            <Stack spacing={1.5} sx={{ minWidth: 600 }}>
              {spacingValues.map(({ px, token }) => (
                <Box key={px} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{ width: 48, textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}
                  >
                    {px}px
                  </Typography>
                  <Box
                    sx={{
                      height: 24,
                      width: `${Math.max(px, 2)}px`,
                      bgcolor: 'primary.main',
                      opacity: 0.75,
                      borderRadius: 1,
                      transition: 'width 0.3s ease',
                    }}
                  />
                  <Chip label={token} size="small" variant="outlined" sx={{ fontFamily: 'monospace', fontSize: 12 }} />
                </Box>
              ))}
            </Stack>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Ruler Visualization
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ position: 'relative', height: 80, overflowX: 'auto', minWidth: 700 }}>
            <Box
              sx={{
                position: 'absolute',
                top: 20,
                left: 0,
                right: 0,
                height: 2,
                bgcolor: 'text.primary',
              }}
            />
            {rulerTicks.map((tick) => (
              <Box
                key={tick}
                sx={{
                  position: 'absolute',
                  left: tick,
                  top: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: 1.5, height: tick % 16 === 0 ? 24 : 12, bgcolor: 'text.primary', mb: 0.5 }} />
                <Typography variant="caption" sx={{ fontSize: 10, color: 'text.secondary' }}>
                  {tick}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Visual Blocks
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {spacingValues.filter((s) => s.px > 0).map(({ px, token }) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={px}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {token}
                </Typography>
                <Box
                  sx={{
                    width: px,
                    height: px,
                    bgcolor: 'primary.main',
                    opacity: 0.6,
                    borderRadius: 1,
                  }}
                />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {px}px
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Usage Examples
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Padding — Tight
              </Typography>
              <Box
                sx={{
                  p: 1,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  borderRadius: 1,
                  fontSize: 12,
                }}
              >
                p: 1 (8px)
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Padding — Comfortable
              </Typography>
              <Box
                sx={{
                  p: 2,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  borderRadius: 1,
                  fontSize: 12,
                }}
              >
                p: 2 (16px)
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Padding — Spacious
              </Typography>
              <Box
                sx={{
                  p: 4,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  borderRadius: 1,
                  fontSize: 12,
                }}
              >
                p: 4 (32px)
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Margin — Bottom
              </Typography>
              <Box sx={{ mb: 3, p: 1, bgcolor: 'grey.200', borderRadius: 1, fontSize: 12 }}>
                mb: 3 (24px)
              </Box>
              <Box sx={{ p: 1, bgcolor: 'grey.300', borderRadius: 1, fontSize: 12 }}>
                Sibling
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Gap — Flex Layout
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>
                <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 1, fontSize: 11, flex: 1, textAlign: 'center' }}>
                  A
                </Box>
                <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 1, fontSize: 11, flex: 1, textAlign: 'center' }}>
                  B
                </Box>
                <Box sx={{ p: 1, bgcolor: 'primary.light', borderRadius: 1, fontSize: 11, flex: 1, textAlign: 'center' }}>
                  C
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Inset — Nested Element
              </Typography>
              <Box sx={{ p: 2, bgcolor: 'grey.200', borderRadius: 1 }}>
                <Box sx={{ p: 3, bgcolor: 'grey.400', color: 'white', borderRadius: 1, fontSize: 12, textAlign: 'center' }}>
                  p: 3 (24px)
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
