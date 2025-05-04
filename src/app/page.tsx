'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Home from '@/components/Home';

export default function ProjectsPage() {
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

    return <Home isDarkTheme={isDarkTheme} />;
}
