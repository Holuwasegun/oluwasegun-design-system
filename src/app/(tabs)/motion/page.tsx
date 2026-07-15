'use client';

import { useState, useRef } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  Slider,
  Stack,
  Chip,
} from '@mui/material';

const durationTokens = [
  { name: 'Short1', ms: 50 },
  { name: 'Short2', ms: 100 },
  { name: 'Short3', ms: 150 },
  { name: 'Short4', ms: 200 },
  { name: 'Medium1', ms: 250 },
  { name: 'Medium2', ms: 300 },
  { name: 'Medium3', ms: 350 },
  { name: 'Medium4', ms: 400 },
  { name: 'Long1', ms: 450 },
  { name: 'Long2', ms: 500 },
  { name: 'Long3', ms: 550 },
  { name: 'Long4', ms: 600 },
  { name: 'ExtraLong1', ms: 700 },
  { name: 'ExtraLong2', ms: 800 },
  { name: 'ExtraLong3', ms: 900 },
  { name: 'ExtraLong4', ms: 1000 },
];

const easingTokens = [
  { name: 'Emphasized', value: 'cubic-bezier(0.2, 0, 0, 1)' },
  { name: 'EmphasizedDecelerate', value: 'cubic-bezier(0.05, 0.7, 0.1, 1)' },
  { name: 'EmphasizedAccelerate', value: 'cubic-bezier(0.3, 0, 0.8, 0.15)' },
  { name: 'Standard', value: 'cubic-bezier(0.2, 0, 0, 1)' },
  { name: 'StandardDecelerate', value: 'cubic-bezier(0, 0, 0, 1)' },
  { name: 'StandardAccelerate', value: 'cubic-bezier(0.3, 0, 1, 1)' },
];

export default function MotionPage() {
  const [animDuration, setAnimDuration] = useState(300);
  const [animEasing, setAnimEasing] = useState(easingTokens[0].value);
  const [boxPosition, setBoxPosition] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleAnimate = () => {
    setBoxPosition(0);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setBoxPosition((prev) => (prev === 0 ? 280 : 0));
      });
    });
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Motion
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Animation principles for Material Design 3
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Duration Tokens
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={1}>
            {durationTokens.map(({ name, ms }) => (
              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={name}>
                <Box
                  sx={{
                    p: 1.5,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {name}
                  </Typography>
                  <Chip label={`${ms}ms`} size="small" variant="outlined" sx={{ fontFamily: 'monospace', fontSize: 11 }} />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Easing Curves
      </Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack spacing={1.5}>
            {easingTokens.map(({ name, value }) => (
              <Box
                key={name}
                sx={{
                  p: 1.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 1,
                }}
              >
                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {name}
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: 10 }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Interactive Demo
      </Typography>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Box>
              <Typography variant="body2" gutterBottom>
                Duration: {animDuration}ms
              </Typography>
              <Slider
                value={animDuration}
                onChange={(_, v) => setAnimDuration(v as number)}
                min={50}
                max={1000}
                step={50}
                valueLabelDisplay="auto"
                valueLabelFormat={(v) => `${v}ms`}
              />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                Easing: {easingTokens.find((e) => e.value === animEasing)?.name}
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
                {easingTokens.map(({ name, value }) => (
                  <Chip
                    key={name}
                    label={name}
                    onClick={() => setAnimEasing(value)}
                    color={animEasing === value ? 'primary' : 'default'}
                    variant={animEasing === value ? 'filled' : 'outlined'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Stack>
            </Box>

            <Box
              sx={{
                height: 60,
                bgcolor: 'grey.100',
                borderRadius: 1,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box
                ref={boxRef}
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: 'primary.main',
                  borderRadius: 1,
                  position: 'absolute',
                  top: 0,
                  left: boxPosition,
                  transition: `left ${animDuration}ms ${animEasing}`,
                }}
              />
            </Box>

            <Button variant="contained" onClick={handleAnimate} sx={{ alignSelf: 'flex-start', textTransform: 'none' }}>
              Animate
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
