# Capacitor Cross-Platform Rules

These rules strictly govern the architecture of the Oluwasegun Design System to maintain compatibility across Web, iOS, and Android.

- **Capacitor Mobile Wrapper:** This is a cross-platform app utilizing Capacitor. Do NOT write Next.js server-side code (SSR), API routes relying on Node backends, or use `next/image` optimization. The app must compile strictly to a static export (`output: 'export'`).
- **Persistence:** All configurations and themes are saved on the user's device. For cross-platform persistence, you must use Capacitor's `@capacitor/preferences` inside Zustand's persist middleware, NOT standard `localStorage` (as iOS/Android WebViews may clear standard localStorage unpredictably).
