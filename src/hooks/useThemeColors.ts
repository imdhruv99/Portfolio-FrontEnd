import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { getTheme, type ThemeColors } from '@/config/theme';

export const useThemeColors = (): {
    colors: ThemeColors;
    isDarkTheme: boolean;
    isLoading: boolean;
} => {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = mounted ? (resolvedTheme || theme || 'light') : 'light';
    const isDarkTheme = currentTheme === 'dark';

    const colors = getTheme(currentTheme).colors;

    return {
        colors,
        isDarkTheme,
        isLoading: !mounted,
    };
};
