import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeRegistry from './ThemeRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Oluwasegun Design System',
  description: 'Material Design 3 design system for building consistent, beautiful user interfaces',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Oluwasegun Design System',
    description: 'Material Design 3 tokens, scales, and components — all configurable and exportable.',
    url: 'https://oluwasegun-design-system.vercel.app/',
    images: [
      {
        url: 'https://oluwasegun-design-system.vercel.app/favicon.svg',
        width: 512,
        height: 512,
        alt: 'Oluwasegun Design System',
      },
    ],
    siteName: 'Oluwasegun Design System',
    type: 'website',
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
