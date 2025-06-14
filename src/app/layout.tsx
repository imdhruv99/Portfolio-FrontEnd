import './globals.css';

import type { Metadata } from 'next';

import { ThemeProvider, ThemeScript } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

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
                className={`theme-transition`}
            >
                <ThemeProvider
                    attribute="data-theme"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange={false}
                    themes={['light', 'dark', 'system']}
                >
                    {children}
                    <Navbar />
                </ThemeProvider>
            </body>
        </html>
    );
}
