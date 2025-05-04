'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Projects from '@/components/Projects';

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

    return <Projects isDarkTheme={isDarkTheme} />;
}
