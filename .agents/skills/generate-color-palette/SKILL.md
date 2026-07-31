---
name: generate-color-palette
description: Use this skill to calculate and generate the 26-level Material Design 3 HSL tonal palette from a single base HEX color, and map them to semantic Light/Dark mode roles.
---

# Generate Color Palette

Use this skill when the user asks to add a new brand color, change an existing key color, or interpolate the full 30+ role MD3 color scheme.

## Instructions

1. **Convert HEX to HSL**: Convert the user's provided HEX base color to HSL (Hue, Saturation, Lightness).
2. **Preserve Hue and Saturation**: The generated palette maintains the base hue and adjusts saturation slightly depending on the lightness level to avoid muddy colors.
3. **Calculate the 26 Tones**:
   - Tones range from 0 (Pure Black) to 100 (Pure White).
   - Key tones to generate: 0, 10, 20, 30, 40 (usually the base), 50, 60, 70, 80, 90, 95, 98, 99, 100.
   - Adjust Lightness to match the tone value (e.g., Tone 10 is roughly L: 10%, Tone 90 is L: 90%).
4. **Map Semantic Roles (Light Mode)**:
   - Base Color (e.g., `primary`) -> Tone 40
   - Text on Base (`onPrimary`) -> Tone 100
   - Container (`primaryContainer`) -> Tone 90
   - Text on Container (`onPrimaryContainer`) -> Tone 10
5. **Map Semantic Roles (Dark Mode)**:
   - Base Color -> Tone 80
   - Text on Base -> Tone 20
   - Container -> Tone 30
   - Text on Container -> Tone 90

## Validation
- Ensure you have generated values for all tones (10 through 100).
- Confirm that the dark mode text (`onPrimary`) remains legible against the dark mode base (`primary` at Tone 80).
