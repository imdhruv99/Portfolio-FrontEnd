'use client';

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { gsap } from 'gsap';
import DotBackground from '@/components/DotBackground';

const Home = () => {
    const { colors: theme, isLoading, isDarkTheme } = useThemeColors();
    const [mounted, setMounted] = useState(false);
    const firstNameRef = useRef<HTMLDivElement>(null);
    const lastNameRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLParagraphElement>(null);
    const heroSectionRef = useRef<HTMLDivElement>(null);
    const [heroDimensions, setHeroDimensions] = useState({ width: 0, height: 0 });
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Throttled resize handler
    const updateDimensions = useCallback(() => {
        if (heroSectionRef.current) {
            const { width, height } = heroSectionRef.current.getBoundingClientRect();
            const newWidth = Math.round(width);
            const newHeight = Math.round(height);

            // Only update if dimensions actually changed significantly
            setHeroDimensions(prev => {
                if (Math.abs(prev.width - newWidth) > 10 || Math.abs(prev.height - newHeight) > 10) {
                    return { width: newWidth, height: newHeight };
                }
                return prev;
            });
        }
    }, []);

    const throttledUpdateDimensions = useCallback(() => {
        if (resizeTimeoutRef.current) {
            clearTimeout(resizeTimeoutRef.current);
        }
        resizeTimeoutRef.current = setTimeout(updateDimensions, 100);
    }, [updateDimensions]);

    useLayoutEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (mounted && !isLoading) {
            timeoutId = setTimeout(updateDimensions, 50);
        }

        window.addEventListener('resize', throttledUpdateDimensions, { passive: true });

        return () => {
            window.removeEventListener('resize', throttledUpdateDimensions);
            if (timeoutId) clearTimeout(timeoutId);
            if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
        };
    }, [mounted, isLoading, throttledUpdateDimensions, updateDimensions]);

    useLayoutEffect(() => {
        if (!mounted || isLoading) return;

        const firstName = "Dhruv";
        const ctx = gsap.context(() => {
            const firstNameLetters = firstNameRef.current?.querySelectorAll('span');
            const lastNameLetters = lastNameRef.current?.querySelectorAll('span');

            const animationPresets = [
                { y: 100, opacity: 0, rotationX: -90 },
                { y: -100, opacity: 0, rotationX: 90 },
                { x: -100, opacity: 0, rotationY: -90 },
                { x: 100, opacity: 0, rotationY: 90 },
                { scale: 0, opacity: 0, rotation: 360 },
                { y: 50, x: -50, opacity: 0, rotation: -45 },
            ];

            const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

            if (firstNameLetters) {
                firstNameLetters.forEach((letter, i) => {
                    if (letter.textContent === ' ') return;

                    const preset = animationPresets[i % animationPresets.length];
                    tl.from(letter, {
                        ...preset,
                        duration: 1.2,
                        opacity: 0,
                    }, `start+=${i * 0.07}`);
                });
            }

            if (lastNameLetters) {
                lastNameLetters.forEach((letter, i) => {
                    if (letter.textContent === ' ') return;

                    const preset = animationPresets[(i + firstName.length) % animationPresets.length];
                    tl.from(letter, {
                        ...preset,
                        duration: 1.2,
                        opacity: 0,
                    }, `start+=${(firstName.length * 0.07) + (i * 0.07) + 0.1}`);
                });
            }

            if (quoteRef.current) {
                tl.from(quoteRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                }, ">-0.5");
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

    const dotColor = isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    const glowColor = isDarkTheme ? '#cfcfcf' : '#333333';

    return (
        <div className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden ${theme.background} transition-colors duration-500`}>
            <div
                ref={heroSectionRef}
                className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 lg:p-16"
            >
                {/* Only render when we have stable dimensions */}
                {heroDimensions.width > 100 && heroDimensions.height > 100 && (
                    <DotBackground
                        dotColor={dotColor}
                        glowColor={glowColor}
                        gridSize={2}
                        spacing={25}
                        fadeFactor={0.00008}
                        containerWidth={heroDimensions.width}
                        containerHeight={heroDimensions.height}
                    />
                )}

                <div className="flex flex-col items-start relative z-20">
                    <h1
                        ref={firstNameRef}
                        className="text-7xl xs:text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] font-extrabold text-left select-none leading-none tracking-tight relative z-10"
                        style={{ color: theme.heroText }}
                    >
                        {firstName.split('').map((char, index) => (
                            <span key={`firstName-${index}`} className="inline-block" style={{ width: char === ' ' ? '1ch' : 'auto' }}>
                                {char}
                            </span>
                        ))}
                    </h1>
                    <h1
                        ref={lastNameRef}
                        className="text-7xl xs:text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] font-extrabold text-left select-none leading-none tracking-tight relative z-10 mt-2 xs:mt-4 sm:mt-6 md:mt-8 lg:mt-10 ml-16 xs:ml-20 sm:ml-24 md:ml-32 lg:ml-40 xl:ml-48 2xl:ml-56"
                        style={{ color: theme.heroText }}
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
                    className="mt-8 sm:mt-12 text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl text-center font-medium opacity-80 z-10"
                    style={{ color: theme.subtext }}
                >
                    I don&apos;t just ship code - I architect engines that hum through chaos and scale with silence.
                </p>
            </div>
        </div>
    );
};

export default Home;
