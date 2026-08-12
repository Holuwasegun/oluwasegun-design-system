import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import ThemeRegistry from './ThemeRegistry';
import CapgoInit from './CapgoInit';

let fontClassName = '';
try {
  const inter = Inter({ subsets: ['latin'], display: 'swap' });
  fontClassName = inter.className;
} catch {
  fontClassName = 'font-sans';
}

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
    <html lang="en" className={fontClassName}>
      <head>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DW5HFVCJP3"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-DW5HFVCJP3');
            `,
          }}
        />
      </head>
      <body>
        <CapgoInit />
        <ThemeRegistry>{children}</ThemeRegistry>
        <GoogleAnalytics gaId="G-DW5HFVCJP3" />
      </body>
    </html>
  );
}
