# UI Component Guidelines

Rules for building new user interface views and components in the Oluwasegun Design System.

## Accessibility and Contrast
1. **WCAG Compliance**: Every time you define a text color on top of a background, ensure it meets at least AA compliance (4.5:1 relative luminance ratio). 
2. **Dark Mode Text**: In Dark Mode, `onBackground` and `onSurface` should map to very light tones (e.g., Tone 95 or 99) to ensure 15.2:1 WCAG AAA compliance. Do not use pure white if it causes harsh blooming; stick to off-whites derived from the base hue.

## Responsive Design
1. **Fluid Typography**: Never use static `px` or `rem` sizes for typography in responsive views. All typography must scale fluidly using CSS `clamp(min, preferred, max)` to ensure text fits gracefully on mobile devices without relying entirely on discrete media query breakpoints.
2. **Fluid Letter Spacing**: Letter spacing must also breathe responsibly. Display titles should use negative tracking on desktop but loosen slightly on mobile.
3. **Container Limits**: Ensure the Layout Lab components and screen preview components have sensible `maxWidth` properties so they do not stretch uncontrollably on ultra-wide monitors.

## Material Design 3 Semantics
Follow MD3 interaction states strictly.
- **Hover**: Overlay the text color at 8% opacity.
- **Focus**: Overlay the text color at 12% opacity.
- **Pressed**: Overlay the text color at 12% opacity.
