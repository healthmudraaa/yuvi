import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Yuvi - The Embedded Layer for Group Health Insurance',
  description: 'Yuvi plugs into any existing group health policy, lets employees stack add-ons, and waives the copay gap at claim time — via a single API.',
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