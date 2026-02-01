import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BVCOE Research Management System',
  description: 'Academic research management for Bharati Vidyapeeth College of Engineering',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
