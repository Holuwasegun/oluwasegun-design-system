---
name: sync-design-tokens
description: Use this skill to keep the static `design-tokens.js` and `design-tokens.css` files synchronized with the project's logic whenever a token specification (like spacing multipliers or base typography) changes.
---

# Synchronize Design Tokens

Use this skill whenever you modify the base typography logic, update the spacing multipliers, or alter the color palette logic inside the UI. This ensures the static exported files align with the live React logic.

## Instructions

1. **Update `design-tokens.css`**:
   - Ensure you declare all CSS custom properties inside the `:root` pseudo-class (for Light Mode variables) and `[data-theme="dark"]` for Dark Mode variables.
   - Every single generated tone, spacing step, and typography clamp must have an accompanying CSS variable.
   - Example: `--color-primary: #6750A4;`
2. **Update `design-tokens.js`**:
   - The JS file must export a single, highly structured nested object named `designTokens`.
   - Organize the object by token category: `color`, `typography`, `spacing`, `elevation`, `motion`, `shape`.
   - Ensure the JSON structure exactly mirrors the CSS custom properties in logic and intent.

## Validation
- Do the hex codes in the `.js` file perfectly match the hex codes in the `.css` file?
- Are the font families consistent between both files?
- Confirm both files were successfully written and are valid syntax (no trailing commas in CSS, etc.).
