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
              ? '-8px -8px 20px rgba(255, 255, 255, 0.08), 8px 8px 20px rgba(0, 0, 0, 0.75)'
              : '-8px -8px 20px #ffffff, 8px 8px 20px rgba(0, 0, 0, 0.18)',
            transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s, box-shadow 0.25s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.06)',
              boxShadow: theme.palette.mode === 'dark'
                ? '-12px -12px 28px rgba(255, 255, 255, 0.12), 12px 12px 28px rgba(0, 0, 0, 0.85)'
                : '-12px -12px 28px #ffffff, 12px 12px 28px rgba(0, 0, 0, 0.25)',
            },
          }}
        >
          <KeyboardArrowUpIcon fontSize="medium" />
        </Fab>
      </Tooltip>
    </Zoom>
  );
}
