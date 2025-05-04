'use client';

import {
    ThemeProvider as NextThemeProvider,
    ThemeProviderProps,
    useTheme,
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
    disableTransitionOnChange = false,
    themes = ['light', 'dark', 'system'],
}: ThemeProviderProps) {
    const [mounted, setMounted] = useState(false);

    // Handle transitions during theme changes
    useEffect(() => {
        // Add theme script if not already present
        if (typeof window !== 'undefined' && !document.getElementById('theme-script')) {
            const themeScript = document.createElement('script');
            themeScript.id = 'theme-script';
            themeScript.innerHTML = ThemeScript;
            document.head.insertBefore(themeScript, document.head.firstChild);
        }

        // Setup theme change handler
        const handleThemeChange = () => {
            // Temporarily disable transitions during theme change
            document.documentElement.classList.add('disable-transitions');

            // Re-enable transitions after theme change is complete
            setTimeout(() => {
                document.documentElement.classList.remove('disable-transitions');
            }, 50); // Short timeout to ensure theme is applied before transitions resume
        };

        // Create a custom event for theme changes
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
        // Return a minimal wrapper with theme-transition classes to prevent layout shift
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
            disableTransitionOnChange={true} // Always set to true and handle transitions manually
            themes={themes}
            onChangeStart={onThemeChange}
        >
            {children}
        </NextThemeProvider>
    );
}

// Optional: Create a hook to easily access theme
export function useThemeState() {
    const { theme, setTheme, themes, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return {
        theme: mounted ? theme : undefined,
        systemTheme,
        setTheme,
        themes,
        mounted
    };
}
