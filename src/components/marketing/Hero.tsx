import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <Box component="section" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            fontWeight: 800, 
            mb: 4,
            background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Design Systems,<br />Instantly Generated.
        </Typography>
        
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ mb: 6, maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
        >
          Build, visualize, and export a complete Material Design 3 token system in seconds. From 5 key colors to a fully robust CSS architecture.
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ justifyContent: 'center' }}>
          <Link href="/dashboard" passHref>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              endIcon={<ArrowRight />}
              sx={{ px: 4, py: 1.5, borderRadius: 8, textTransform: 'none', fontWeight: 600 }}
            >
              Open Layout Lab
            </Button>
          </Link>
          <Button 
            variant="outlined" 
            color="secondary" 
            size="large"
            sx={{ px: 4, py: 1.5, borderRadius: 8, textTransform: 'none', fontWeight: 600 }}
          >
            Read Documentation
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
