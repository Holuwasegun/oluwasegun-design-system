import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ p: 4, textAlign: 'center', borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Oluwasegun Design System. All rights reserved.
      </Typography>
    </Box>
  );
}
