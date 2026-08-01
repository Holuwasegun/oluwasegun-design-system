import React from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
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
    },
    {
      question: "Is this tool completely free to use?",
      answer: "Yes, this tool is open-source and entirely free to use for personal and commercial projects."
    }
  ];

  return (
    <Box id="faq" component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: 'surfaceContainerLowest' }}>
      <Container maxWidth="md">
        <Typography variant="h2" component="h2" sx={{ textAlign: 'center', fontWeight: 700, mb: 8 }}>
          Frequently Asked Questions
        </Typography>
        
        <Box>
          {faqs.map((faq, index) => (
            <Accordion 
              key={index} 
              elevation={0}
              disableGutters
              sx={{ 
                bgcolor: 'transparent',
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:before': { display: 'none' },
                py: 1
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown />}
                sx={{ px: 0, '& .MuiAccordionSummary-content': { my: 2 } }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pb: 4, pr: { xs: 2, sm: 8 } }}>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
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
