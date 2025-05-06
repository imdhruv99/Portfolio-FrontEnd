import './globals.css';

import type { Metadata } from 'next';
import { Cormorant_Garamond } from 'next/font/google';

import { ThemeProvider, ThemeScript } from '@/components/ThemeProvider';
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
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: ThemeScript
                    }}
                />
            </head>
            <body
                className={`${cormorantGaramond.variable} font-sans theme-transition`}
            >
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange={false} // We'll handle transitions manually
                    themes={['light', 'dark', 'system']}
                >
                    {children}
                    <Navbar />
                </ThemeProvider>
            </body>
        </html>
    );
}
