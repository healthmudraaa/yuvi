import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yuvi - Enhanced Employee Insurance Coverage',
  description: 'Reduce your copay burden with Yuvi\'s additional insurance coverage on top of your employer-provided insurance.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}