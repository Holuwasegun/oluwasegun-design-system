import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.oluwasegun.designsystem',
  appName: 'Oluwasegun Design System',
  webDir: 'out',
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
    },
  }
};

export default config;
