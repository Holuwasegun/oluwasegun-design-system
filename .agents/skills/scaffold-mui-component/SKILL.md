---
name: scaffold-mui-component
description: Use this skill to correctly build a new user interface view or component for the Oluwasegun Design System that adheres strictly to the project's Emotion styling and token discipline rules.
---

# Scaffold MUI Component

Use this skill whenever you need to build a new screen, visual preview, or interactive element inside `src/components/`.

## Boilerplate Instructions

1. **Import Requirements**:
   - Import necessary layout primitives from MUI (`Box`, `Stack`, `Typography`).
   - Import the theme hook if pulling specific logic: `import { useTheme } from '@mui/material'`.
2. **Strict Emotion Styling**:
   - Do not use arbitrary CSS strings or inline React `style={{}}` attributes.
   - Use the MUI `sx` prop to pass styling logic.
   - **Crucial**: Pull colors directly from the MUI theme object. For example: `backgroundColor: 'primary.container', color: 'onPrimaryContainer'`.
3. **Spacing Discipline**:
   - For `gap`, `padding`, or `margin`, use numeric multipliers (e.g., `gap: 2`, `p: 4`). MUI will automatically multiply these by the system's base spacing unit (which is defined by the tokens).
4. **Fluid Typography**:
   - When rendering text, use the predefined MD3 variant names: `variant="displayLarge"`, `variant="bodyMedium"`, etc. Never manually hardcode `fontSize: '24px'`.

## Traps to Avoid
- Forgetting to import the component correctly in the parent view.
- Hardcoding a color like `bgcolor: '#000000'` instead of `bgcolor: 'background.default'`.
- Using raw HTML elements (`<div />`) instead of the MUI `Box` primitive, which loses access to the `sx` prop engine.
