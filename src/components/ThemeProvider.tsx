'use client';

import {
    ThemeProvider as NextThemeProvider,
    ThemeProviderProps,
} from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({
    children,
    attribute = 'data-theme',
    defaultTheme = 'system',
    enableSystem = true,
    disableTransitionOnChange = false,
    themes = ['light', 'dark', 'system'],
}: ThemeProviderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <NextThemeProvider
            attribute={attribute}
            defaultTheme={defaultTheme}
            enableSystem={enableSystem}
            disableTransitionOnChange={disableTransitionOnChange}
            themes={themes}
        >
            {children}
        </NextThemeProvider>
    );
}
