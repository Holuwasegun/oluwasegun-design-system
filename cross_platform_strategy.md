# Cross-Platform Strategy: Oluwasegun Design System

This document outlines the exact technical strategy required to turn the current web-only Next.js Design System into a cross-functional platform (Web, iOS, and Android) from a single codebase.

Crucially, this approach **guarantees no breakage of the current codebase**, utilizes your existing React/Material UI components, and allows updates to automatically sync across all three platforms.

---

## 1. The Core Architecture: Capacitor vs. React Native

To achieve a single codebase without breaking your current web app, **Capacitor (by Ionic)** is the only viable solution.

### Why Capacitor?
React Native (or Expo) requires you to rewrite your UI using `<View>` and `<Text>` primitives instead of HTML/CSS. Since your app heavily relies on Material UI, `@emotion/react`, and web-specific layout math, moving to React Native would require entirely rewriting the application.

Capacitor acts as a native wrapper. It takes the Next.js static HTML/CSS/JS export (the `out` directory) and runs it inside a highly optimized native WebView on iOS and Android. 
- **Benefit:** You write code once in Next.js, and it runs exactly the same on Web, iOS, and Android.
- **Benefit:** Full access to Native APIs (Camera, Filesystem, Haptics) via JavaScript plugins if needed later.

---

## 2. Preparing Next.js for Mobile (Static Export)

Native mobile apps cannot run a Node.js server. Therefore, Next.js must be configured to output static files.

**Required Action (When Implementing):**
Modify `next.config.mjs` to enable static exports:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // ... other configs
};
export default nextConfig;
```
*Note on `next/image`:* If you use the standard Next.js `<Image />` component, it requires a server for optimization. You will need to set `unoptimized: true` in your next config, or use standard `<img>` tags for it to work in a native mobile app.

---

## 3. State Management & Persistence (Zustand on Mobile)

Currently, the app uses Zustand with the `persist` middleware, which saves token configurations to the browser's `localStorage`.

### The Problem
On iOS and Android, the OS can arbitrarily clear a WebView's `localStorage` if the device runs low on memory. If this happens, users will lose all their saved projects and tokens.

### The Solution
You must swap `localStorage` for Capacitor's Native Preferences API.
Zustand allows you to write custom storage engines. When implementing, you will create a custom storage adapter:

```javascript
import { Preferences } from '@capacitor/preferences';

export const capacitorStorage = {
  getItem: async (name) => {
    const { value } = await Preferences.get({ key: name });
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    await Preferences.set({ key: name, value: JSON.stringify(value) });
  },
  removeItem: async (name) => {
    await Preferences.remove({ key: name });
  },
};
```
You simply pass this engine into your existing `persist` configuration in `useThemeStore.ts`. This requires no changes to how your app *uses* state, it only changes *where* the state is physically saved.

---

## 4. Over-The-Air (OTA) Updates (Syncing across 3 platforms)

Your constraint states: *"once I make any update it will reflect in the 3 platforms."*

If you rely on the Apple App Store or Google Play Store for every CSS tweak or new feature, it will take days to get approval for updates.

### The Solution: Live Updates (Appflow / EAS Update)
Because the core of your app is JavaScript, HTML, and CSS, you can bypass the App Store review process for UI/Logic updates using **Over-The-Air (OTA) updates**.
1. **Web:** Standard Vercel deployment (instant).
2. **iOS & Android:** Use a service like **Ionic Appflow**. When you push code to GitHub, Appflow builds the new JS bundle and sends it directly to the users' installed mobile apps the next time they open it.
3. *Result:* You push a fix to `main`, Vercel updates the web, Appflow updates the mobile apps automatically.

---

## 5. Marketing Page Updates (Download Buttons)

To guide users to the native apps, the marketing page needs dynamic download buttons.

### Implementation Strategy
On `Hero.tsx` or `Footer.tsx`, add a row of download badges (SVG icons for "Download on the App Store" and "Get it on Google Play").

To make this seamless:
1. **Deep Linking (Universal Links):** Configure your web domain so that if a user opens the marketing site on an iPhone and already has the app installed, a smart banner prompts them to "Open in App."
2. **Conditional Rendering:** If the app is already running *inside* the native Capacitor shell (which you can detect via `Capacitor.isNativePlatform()`), you should hide the "Download" buttons, as the user is already using the app!

---

## Summary of Execution Steps (When Ready)

1. Run `npm install @capacitor/core @capacitor/ios @capacitor/android`
2. Run `npx cap init` to generate the capacitor config.
3. Update `next.config.mjs` to `output: 'export'`.
4. Update Zustand to use `@capacitor/preferences` instead of `localStorage`.
5. Run `npm run build` (generates the `/out` folder).
6. Run `npx cap add ios` and `npx cap add android`.
7. Run `npx cap sync` to copy the `/out` folder into the native projects.
8. Open Xcode / Android Studio to build and deploy to emulators/stores.
