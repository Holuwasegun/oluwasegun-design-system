'use client';

import { useState } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Link as MuiLink, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';

export default function SignupPage() {
  const [showPw, setShowPw] = useState(false);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 420 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box sx={{ width: 48, height: 48, borderRadius: '12px', background: 'linear-gradient(135deg, #6750A4, #D0BCFF)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>O</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Create account</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Get started with your free account</Typography>
          </Box>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Full name" fullWidth placeholder="John Doe" />
            <TextField label="Email address" type="email" fullWidth placeholder="you@company.com" />
            <TextField
              label="Password"
              type={showPw ? 'text' : 'password'}
              fullWidth
              placeholder="Create a strong password"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPw(!showPw)} size="small">
                        {showPw ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button variant="contained" fullWidth size="large">Create account</Button>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2.5 }}>
            Already have an account?{' '}
            <MuiLink component={Link} href="/login" underline="hover" sx={{ fontWeight: 600 }}>Sign in</MuiLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
