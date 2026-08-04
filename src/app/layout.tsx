import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import ThemeRegistry from './ThemeRegistry';
import CapgoInit from './CapgoInit';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DW5HFVCJP3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-DW5HFVCJP3');
          `}
        </Script>
      </head>
      <body>
        <CapgoInit />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
