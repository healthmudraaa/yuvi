// src/app/layout.tsx
import './globals.css';
import Script from 'next/script';
import { PopupProvider } from '../contexts/PopupContext';
import type { Metadata } from 'next';
import YuviShell from '../components/YuviShell'; // new client component

export const metadata: Metadata = {
  title: 'Yuvi - Enhanced Employee Insurance Coverage',
  description: 'Reduce your copay burden with Yuvi\'s additional insurance coverage on top of your employer-provided insurance.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          src="https://embed.tawk.to/62b3f9147b967b1179960fc5/1g67g9v4a"
          strategy="afterInteractive"
          charSet="UTF-8"
          crossOrigin="anonymous"
        />
        <PopupProvider>
          <YuviShell>{children}</YuviShell>
        </PopupProvider>
      </body>
    </html>
  );
}
