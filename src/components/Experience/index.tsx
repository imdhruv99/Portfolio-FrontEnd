'use client';

import { useState, useEffect } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';


const Experience = () => {
    const { colors: theme, isLoading } = useThemeColors();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${theme.background} transition-colors duration-500`}>
            {/* Hero Section */}
            <section className="relative w-full h-full flex items-center justify-center">
                <div
                    className={`text-9xl sm:text-[15rem] md:text-[20rem] lg:text-[25rem] font-extrabold select-none opacity-10 transition-colors duration-500 ${theme.text}`}
                    style={{ lineHeight: '1' }}
                >
                    Experience
                </div>
            </section>
        </div>
    );
};

export default Experience;
