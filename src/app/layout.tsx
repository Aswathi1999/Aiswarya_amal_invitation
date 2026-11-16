import type { Metadata, Viewport } from 'next';
import { wedding } from '@/config/wedding';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(wedding.siteUrl),
  title: `${wedding.names} | ${wedding.dateLabel}`,
  description: 'Together with our families, we invite you to celebrate our wedding. 09 January 2027, 11:30 AM IST. Two hearts. One beautiful beginning.',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'en_IN', title: `${wedding.names} — Wedding Invitation`, description: '09 January 2027 · 11:30 AM IST · With love and the blessings of our families.', url: wedding.siteUrl, siteName: wedding.names, images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Aiswarya & Amal Raj — 09 January 2027' }] },
  twitter: { card: 'summary_large_image', title: `${wedding.names} — Wedding Invitation`, images: ['/opengraph-image.png'] },
};
export const viewport: Viewport = { themeColor: '#FAF7F0', width: 'device-width', initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
