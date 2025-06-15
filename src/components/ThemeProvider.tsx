'use client';

import {
    ThemeProvider as NextThemeProvider,
    ThemeProviderProps,
} from 'next-themes';
import { useEffect, useState } from 'react';

// Script to be inserted in the head to prevent flash of incorrect theme
export const ThemeScript = `
(function() {
  try {
    // First try to get theme from localStorage
    let theme = localStorage.getItem('theme');

    // If theme is 'system' or not set, check system preference
    if (!theme || theme === 'system') {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    // Apply theme immediately to prevent flash
    document.documentElement.setAttribute('data-theme', theme);

    // Optional: Also add as a class for additional styling options
    document.documentElement.classList.add(theme);
  } catch (e) {
    // Fallback if localStorage is not available
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  }
})();
`;

export function ThemeProvider({
    children,
    attribute = 'data-theme',
    defaultTheme = 'system',
    enableSystem = true,
    themes = ['light', 'dark', 'system'],
}: ThemeProviderProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && !document.getElementById('theme-script')) {
            const themeScript = document.createElement('script');
            themeScript.id = 'theme-script';
            themeScript.innerHTML = ThemeScript;
            document.head.insertBefore(themeScript, document.head.firstChild);
        }

        const handleThemeChange = () => {
            document.documentElement.classList.add('disable-transitions');

            setTimeout(() => {
                document.documentElement.classList.remove('disable-transitions');
            }, 50);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('themeChange', handleThemeChange);
        }

        setMounted(true);

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('themeChange', handleThemeChange);
            }
        };
    }, []);

    // Handle theme change events
    const onThemeChange = () => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('themeChange'));
        }
    };

    if (!mounted) {
        return (
            <div className="theme-transition" style={{ visibility: 'hidden' }}>
                {children}
            </div>
        );
    }

    return (
        <NextThemeProvider
            attribute={attribute}
            defaultTheme={defaultTheme}
            enableSystem={enableSystem}
            disableTransitionOnChange={true}
            themes={themes}
            onChangeStart={onThemeChange}
        >
            {children}
        </NextThemeProvider>
    );
}
