'use client';

import React from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "Is this tool completely free to use?",
      answer: "Yes — 100% free, forever. No credit card, no trial period, and no feature limits. The tool is open-source and free for both personal and commercial projects, now and in the future."
    },
    {
      question: "What is a Material Design 3 (MD3) palette?",
      answer: "MD3 introduces a tonal palette system where a single base color is mathematically interpolated into multiple distinct tones (from 0 to 100). This ensures accessible contrast ratios across light and dark modes organically."
    },
    {
      question: "Do I need to install any libraries to use the exported CSS?",
      answer: "No. The exported design tokens are plain, vanilla CSS variables. You can drop them into any project (React, Vue, plain HTML) without adding any external dependencies."
    },
    {
      question: "Can I use this for non-React projects?",
      answer: "Absolutely. While the generator is built in React, the output is standard CSS that works universally across any modern web technology stack."
    }
  ];

  return (
    <Box id="faq" component="section" sx={{ py: { xs: 10, md: 14 }, px: { xs: 2, sm: 3 }, bgcolor: 'background.default' }}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            letterSpacing: '-0.02em',
            mb: { xs: 5, md: 8 },
            color: 'text.primary',
          }}
        >
          Frequently Asked Questions
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              elevation={0}
              disableGutters
              sx={{
                bgcolor: 'background.paper',
                borderRadius: '16px !important',
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                transition: 'all 0.2s ease-in-out',
                '&:before': { display: 'none' },
                '&:hover': {
                  borderColor: 'primary.main',
                  boxShadow: (theme) =>
                    theme.palette.mode === 'dark'
                      ? '0 8px 24px rgba(0,0,0,0.4)'
                      : '0 8px 24px rgba(0,0,0,0.06)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown style={{ width: 20, height: 20 }} />}
                sx={{
                  px: { xs: 2.5, sm: 4 },
                  py: { xs: 1.5, sm: 2 },
                  '& .MuiAccordionSummary-content': { my: 1 },
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    transition: 'transform 0.2s ease-in-out',
                    color: 'primary.main',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: { xs: 2.5, sm: 4 },
                  pt: 2,
                  pb: { xs: 3, sm: 3.5 },
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75, fontSize: { xs: '0.925rem', sm: '1rem' } }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
