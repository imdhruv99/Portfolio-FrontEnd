'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { gsap } from 'gsap';

const Home = () => {
    const { colors: theme, isLoading, isDarkTheme } = useThemeColors();
    const [mounted, setMounted] = useState(false);
    const firstNameRef = useRef<HTMLDivElement>(null);
    const lastNameRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    useLayoutEffect(() => {
        if (!mounted || isLoading) return;

        const ctx = gsap.context(() => {
            const firstNameLetters = firstNameRef.current?.querySelectorAll('span');
            const lastNameLetters = lastNameRef.current?.querySelectorAll('span');

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            if (firstNameLetters) {
                tl.from(firstNameLetters, {
                    y: 100,
                    opacity: 0,
                    rotationX: -90,
                    stagger: 0.05,
                    duration: 1.2,
                });
            }

            if (lastNameLetters) {
                tl.from(lastNameLetters, {
                    y: 100,
                    opacity: 0,
                    rotationX: -90,
                    stagger: 0.05,
                    duration: 1.2,
                }, "<0.1");
            }

            if (quoteRef.current) {
                tl.from(quoteRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                }, "<0.5");
            }
        });

        return () => ctx.revert();
    }, [mounted, isLoading]);

    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: isDarkTheme ? '#1a1a1a' : '#f0f0f0' }}>
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    const firstName = "Dhruv";
    const lastName = "Prajapati";

    return (
        <div className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${theme.background} transition-colors duration-500`}>
            {/* Hero Section */}
            <section className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 lg:p-16">
                <div className="flex flex-col items-start">
                    <h1
                        ref={firstNameRef}
                        className={`
                            text-7xl xs:text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]
                            font-extrabold text-left select-none leading-none tracking-tight
                            relative z-10
                        `}
                        style={{
                            color: theme.heroText,
                        }}
                    >
                        {firstName.split('').map((char, index) => (
                            <span key={`firstName-${index}`} className="inline-block" style={{ width: char === ' ' ? '1ch' : 'auto' }}>
                                {char}
                            </span>
                        ))}
                    </h1>
                    <h1
                        ref={lastNameRef}
                        className={`
                            text-7xl xs:text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem]
                            font-extrabold text-left select-none leading-none tracking-tight
                            relative z-10 mt-2 xs:mt-4 sm:mt-6 md:mt-8 lg:mt-10
                            ml-16 xs:ml-20 sm:ml-24 md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56
                        `}
                        style={{
                            color: theme.heroText,
                        }}
                    >
                        {lastName.split('').map((char, index) => (
                            <span key={`lastName-${index}`} className="inline-block" style={{ width: char === ' ' ? '1ch' : 'auto' }}>
                                {char}
                            </span>
                        ))}
                    </h1>
                </div>
                <p
                    ref={quoteRef}
                    className={`
                        mt-8 sm:mt-12 text-base sm:text-lg md:text-xl lg:text-2xl
                        max-w-xl text-center font-medium opacity-80 z-10
                    `}
                    style={{ color: theme.subtext }}
                >
                    I don’t just ship code - I architect engines that hum through chaos and scale with silence.
                </p>
            </section>
        </div>
    );
};

export default Home;
