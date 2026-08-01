import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeRegistry from './ThemeRegistry';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://oluwasegun-design-system.vercel.app'),
  title: 'Oluwasegun Design System',
  description: 'Material Design 3 tokens, scales, and components — all configurable and exportable',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Oluwasegun Design System',
    description: 'Material Design 3 tokens, scales, and components — all configurable and exportable.',
    url: 'https://oluwasegun-design-system.vercel.app/',
    siteName: 'Oluwasegun Design System',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oluwasegun Design System',
    description: 'Material Design 3 tokens, scales, and components — all configurable and exportable.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
