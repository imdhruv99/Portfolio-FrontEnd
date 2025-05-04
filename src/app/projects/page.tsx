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

    return (
        <div className="min-h-screen pt-8 pb-20 theme-transition">
            <Projects isDarkTheme={isDarkTheme} />
        </div>
    );
}
