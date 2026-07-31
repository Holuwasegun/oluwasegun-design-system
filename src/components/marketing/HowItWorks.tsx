"use client";

import React, { useState } from 'react';
import { Box, Container, Typography, Stack, Paper, ButtonBase, useTheme } from '@mui/material';
import { ChevronRight } from 'lucide-react';

export default function HowItWorks() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Define Key Colors",
      description: "Input a single primary hex code and let the engine automatically generate a full light and dark tonal palette."
    },
    {
      title: "Tweak Tokens",
      description: "Visually adjust typography, spacing, elevation, and radius across a live, interactive UI playground."
    },
    {
      title: "Export & Ship",
      description: "Copy the generated CSS tokens and drop them directly into your codebase. No extra dependencies required."
    }
  ];

  return (
    <Box id="workflow" component="section" sx={{ py: { xs: 12, md: 16 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h2" sx={{ textAlign: 'center', fontWeight: 800, mb: 8 }}>
          Built for Speed
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 8, alignItems: 'center' }}>
          
          {/* Left Side: Stepper */}
          <Stack spacing={2} sx={{ width: { xs: '100%', md: '40%' } }}>
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <ButtonBase
                  key={index}
                  onClick={() => setActiveStep(index)}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    gap: 3,
                    p: 3,
                    borderRadius: 4,
                    transition: 'all 0.3s',
                    bgcolor: isActive ? 'surfaceContainer' : 'transparent',
                    border: '1px solid',
                    borderColor: isActive ? 'primary.main' : 'transparent',
                    boxShadow: isActive ? `0 8px 24px ${theme.palette.primary.main}1A` : 'none',
                    '&:hover': {
                      bgcolor: isActive ? 'surfaceContainer' : 'action.hover'
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: '50%', 
                      bgcolor: isActive ? 'primary.main' : 'action.disabledBackground', 
                      color: isActive ? 'primary.contrastText' : 'text.disabled',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      fontWeight: 800,
                      transition: 'all 0.3s'
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: isActive ? 'text.primary' : 'text.secondary' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" color={isActive ? 'text.secondary' : 'text.disabled'}>
                      {step.description}
                    </Typography>
                  </Box>
                  {isActive && (
                    <Box sx={{ display: { xs: 'none', sm: 'block' }, color: 'primary.main', mt: 1 }}>
                      <ChevronRight />
                    </Box>
                  )}
                </ButtonBase>
              );
            })}
          </Stack>

          {/* Right Side: Interactive Preview Window */}
          <Box sx={{ width: { xs: '100%', md: '60%' } }}>
            <Paper 
              elevation={24}
              sx={{ 
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                background: 'background.paper',
                aspectRatio: '4/3',
                position: 'relative'
              }}
            >
              {/* Fake Window Chrome */}
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main', opacity: 0.5 }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main', opacity: 0.5 }} />
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main', opacity: 0.5 }} />
                <Typography variant="caption" sx={{ ml: 2, color: 'text.disabled', fontWeight: 600 }}>Preview Window</Typography>
              </Box>
              
              {/* Preview Content based on state */}
              <Box sx={{ p: 4, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                
                {activeStep === 0 && (
                  <Box sx={{ textAlign: 'center', animation: 'fadeUp 0.5s ease-out' }}>
                    <Box sx={{ width: 120, height: 120, borderRadius: '50%', bgcolor: 'primary.main', mx: 'auto', mb: 3, boxShadow: `0 0 40px ${theme.palette.primary.main}80` }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>#006493</Typography>
                    <Typography variant="body2" color="text.secondary">Primary Key Color</Typography>
                  </Box>
                )}

                {activeStep === 1 && (
                  <Stack spacing={3} sx={{ width: '80%', animation: 'fadeUp 0.5s ease-out' }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Typography sx={{ width: 100, fontWeight: 600 }}>Base Size</Typography>
                      <Box sx={{ flexGrow: 1, height: 8, bgcolor: 'action.hover', borderRadius: 4, position: 'relative' }}>
                        <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '40%', bgcolor: 'primary.main', borderRadius: 4 }} />
                        <Box sx={{ position: 'absolute', left: '40%', top: '50%', transform: 'translate(-50%, -50%)', width: 20, height: 20, borderRadius: '50%', bgcolor: 'background.paper', border: '2px solid', borderColor: 'primary.main', boxShadow: 2 }} />
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Typography sx={{ width: 100, fontWeight: 600 }}>Scale Ratio</Typography>
                      <Box sx={{ flexGrow: 1, height: 8, bgcolor: 'action.hover', borderRadius: 4, position: 'relative' }}>
                        <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '60%', bgcolor: 'primary.main', borderRadius: 4 }} />
                        <Box sx={{ position: 'absolute', left: '60%', top: '50%', transform: 'translate(-50%, -50%)', width: 20, height: 20, borderRadius: '50%', bgcolor: 'background.paper', border: '2px solid', borderColor: 'primary.main', boxShadow: 2 }} />
                      </Box>
                    </Box>
                  </Stack>
                )}

                {activeStep === 2 && (
                  <Box sx={{ width: '100%', height: '100%', bgcolor: '#0d1117', color: '#c9d1d9', p: 3, borderRadius: 2, animation: 'fadeUp 0.5s ease-out' }}>
                     <Typography sx={{ fontFamily: 'monospace', fontSize: '0.85rem', whiteSpace: 'pre', color: '#8b949e' }}>
                      <span style={{ color: '#ff7b72' }}>:root</span> {'{'}
                      <br />  <span style={{ color: '#79c0ff' }}>--md-sys-color-primary</span>: <span style={{ color: '#a5d6ff' }}>#006493</span>;
                      <br />  <span style={{ color: '#79c0ff' }}>--md-sys-color-on-primary</span>: <span style={{ color: '#a5d6ff' }}>#ffffff</span>;
                      <br />  <span style={{ color: '#8b949e' }}>/* ... */</span>
                      <br />{'}'}
                    </Typography>
                  </Box>
                )}
                
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
