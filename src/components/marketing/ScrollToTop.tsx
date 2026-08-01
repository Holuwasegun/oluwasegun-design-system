'use client';

import React, { useState, useEffect } from 'react';
import { Fab, Zoom, Tooltip, useTheme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={isVisible}>
      <Tooltip title="Scroll to top" placement="left">
        <Fab
          color="primary"
          size="medium"
          aria-label="scroll back to top"
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: { xs: 24, md: 32 },
            right: { xs: 24, md: 32 },
            zIndex: 1200,
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            transition: 'transform 0.2s ease-in-out, background-color 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.05)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 12px 28px rgba(0, 0, 0, 0.6)'
                : '0 12px 28px rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          <KeyboardArrowUpIcon fontSize="medium" />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
