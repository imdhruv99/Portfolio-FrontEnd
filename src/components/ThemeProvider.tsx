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
    let theme = localStorage.getItem('theme');

    // Default to 'dark' if not set
    if (!theme) {
      theme = 'dark';
    }

    // Apply theme immediately
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.add(theme);
  } catch (e) {
    // Fallback if localStorage not available
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
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
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={true}
            themes={['light', 'dark']}
            onChangeStart={onThemeChange}
        >
            {children}
        </NextThemeProvider>
    );
}
