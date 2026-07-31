import React from 'react';
import { Box, Container, Typography, Stack, Paper } from '@mui/material';

export default function HowItWorks() {
  const steps = [
    {
      title: "1. Define Key Colors",
      description: "Input a single primary hex code and let the engine automatically generate a full light and dark tonal palette."
    },
    {
      title: "2. Tweak Tokens",
      description: "Visually adjust typography, spacing, elevation, and radius across a live, interactive UI playground."
    },
    {
      title: "3. Export & Ship",
      description: "Copy the generated CSS tokens and drop them directly into your codebase. No extra dependencies required."
    }
  ];

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h2" sx={{ textAlign: 'center', fontWeight: 700, mb: 8 }}>
          How it Works
        </Typography>
        
        <Stack spacing={4}>
          {steps.map((step, index) => (
            <Paper 
              key={index} 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 4, 
                bgcolor: 'surfaceContainer', 
                border: '1px solid', 
                borderColor: 'divider',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Box 
                sx={{ 
                  width: 64, 
                  height: 64, 
                  borderRadius: '50%', 
                  bgcolor: 'primary.main', 
                  color: 'primary.contrastText',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '1.5rem',
                  fontWeight: 800
                }}
              >
                {index + 1}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{step.title}</Typography>
                <Typography variant="body1" color="text.secondary">{step.description}</Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
