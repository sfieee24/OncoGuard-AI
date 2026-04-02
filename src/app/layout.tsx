
import type {Metadata} from 'next';
import './globals.css';
import { Disclaimer } from '@/components/Disclaimer';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  title: 'OncoGuard AI - Early Cancer Detection',
  description: 'AI-powered health risk assessment for breast and ovarian cancer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Disclaimer />
      </body>
    </html>
  );
}
