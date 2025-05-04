'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Experience from '@/components/Experience';

export default function ExperiencePage() {
    const { theme, resolvedTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);
    const isDarkTheme =
        theme === 'dark' || (theme === 'system' && resolvedTheme === 'dark');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return <Experience isDarkTheme={isDarkTheme} />;
}
