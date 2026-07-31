# Styling Architecture (Token Discipline)

Rules for writing CSS, generating UI, and applying styles.

## The Golden Rule: Token Discipline
1. **No Hardcoded Pixels**: Never use arbitrary pixel values like `15px` or `27px` for margins, padding, or gaps. You must strictly use the numeric spacing multipliers from the generated design tokens (e.g., `getSpacing("1.5")` or `--spacing-1-5`).
2. **No Arbitrary Hex Codes**: Never hardcode colors like `#ff0000` or `#ccc` in a UI component. Every single background, border, text, or shadow must reference a semantic Material Design 3 token (e.g., `var(--color-primary-container)` or `onSurfaceVariant`).

## CSS-in-JS and Emotion
1. **Dynamic Theming**: The `ThemeRegistry.tsx` injects the Zustand configuration into the MUI `ThemeProvider`. All components must read from this provider or the CSS Custom Properties outputted by the store.
2. **Avoid Inline Styles**: Do not use `style={{...}}` unless calculating a highly dynamic value (like the absolute position of a dragged element). For everything else, use Emotion's `sx` prop or styled components.

## Tailwind CSS
- Tailwind 4 is permitted for rapid scaffolding in development, but the final source of truth for all layout spacing and typography *must* rely on the design tokens derived from the configuration state.
