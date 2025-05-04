'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Education from '@/components/Education';

export default function EducationPage() {
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

    return <Education isDarkTheme={isDarkTheme} />;
}
