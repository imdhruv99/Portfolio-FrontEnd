'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Contact from '@/components/Contact';

export default function ContactPage() {
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
            <Contact isDarkTheme={isDarkTheme} />
        </div>
    );
}
