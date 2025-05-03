import './globals.css';
import '../components/Navbar/Navbar.css';

import type { Metadata } from 'next';
import { Cormorant_Garamond } from 'next/font/google';

import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Portfolio - Dhruv Prajapati',
  description: 'Portfolio of Dhruv Prajapati',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cormorantGaramond.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Navbar />
        </ThemeProvider>
      </body>
    </html>
  );
}
