---
name: capacitor-build
description: Sync and build the Next.js static export into iOS and Android using Capacitor.
---

# Capacitor Build Skill

Use this skill when you need to sync the web application's codebase into the native iOS and Android environments.

## Prerequisites
- The project must be configured for a static export in `next.config.mjs` (`output: 'export'`).
- `@capacitor/core`, `@capacitor/ios`, and `@capacitor/android` must be installed.

## Workflow

1. **Build the Web App**
   First, compile the Next.js application into static HTML/JS/CSS.
   ```bash
   npm run build
   ```
   This will output the compiled assets into the `out/` directory.

2. **Sync to Capacitor**
   Sync the new web assets into the native iOS and Android projects.
   ```bash
   npx cap sync
   ```
   This copies the `out/` directory into the native WebViews and updates any native plugin dependencies.

3. **Open Native IDE (Optional)**
   If you need to compile the native app binaries or run simulators, you must open the respective IDEs:
   - For iOS: `npx cap open ios` (Opens Xcode)
   - For Android: `npx cap open android` (Opens Android Studio)

## Troubleshooting
- **Missing `out/` directory:** If `npx cap sync` fails saying it cannot find the web directory, ensure `npm run build` completed successfully and that Next.js is configured for static exports.
- **Plugin Errors:** If a Capacitor plugin is missing on the native side, run `npm install <plugin-name>` followed immediately by `npx cap sync` to register it natively.
