'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';

import DotBackground from '@/components/DotBackground';
import { useThemeColors } from '@/hooks/useThemeColors';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const { colors: theme, isLoading, isDarkTheme } = useThemeColors();
    const [mounted, setMounted] = useState(false);
    const firstNameRef = useRef<HTMLDivElement>(null);
    const lastNameRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLParagraphElement>(null);
    const heroSectionRef = useRef<HTMLDivElement>(null);
    const [heroDimensions, setHeroDimensions] = useState({ width: 0, height: 0 });
    const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const aboutTextRef = useRef<HTMLHeadingElement>(null);
    const aboutSectionRef = useRef<HTMLDivElement>(null);
    const aboutHeadingRef = useRef<HTMLParagraphElement>(null);


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

    // About Me section animation
    useLayoutEffect(() => {
        if (!mounted || isLoading) return;

        const ctx = gsap.context(() => {
            if (aboutHeadingRef.current && aboutTextRef.current) {
                gsap.from([aboutHeadingRef.current, aboutTextRef.current], {
                    scrollTrigger: {
                        trigger: aboutSectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power3.out',
                });
            }
        }, aboutSectionRef);

        return () => ctx.revert();
    }, [mounted, isLoading]);


    useLayoutEffect(() => {
        if (!mounted || isLoading) return;

        const firstName = "Dhruv";
        const lastName = "Prajapati";
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

                const iIndex = lastName.toLowerCase().indexOf('i');
                if (iIndex !== -1 && lastNameLetters[iIndex]) {
                    const iSpan = lastNameLetters[iIndex];
                    tl.to(iSpan, {
                        rotationX: 180,
                        duration: 0.8,
                        ease: "power2.inOut",
                        repeat: -1,
                        yoyo: true,
                        repeatDelay: 3,
                    }, ">+1");
                }
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

    const highlightColor = isDarkTheme ? theme.highlightColor : theme.highlightColor;

    const wordsToHighlight = [
        "secure", "scalable", "cloud", "infrastructure", "artificial", "intelligent"
    ];


    // Function to split text and wrap highlight words
    const renderHighlightedText = (text: string, wordsToHighlight: string[]) => {
        const parts = text.split(/(\s+)/);
        return parts.map((part, index) => {
            const cleanPart = part.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
            if (wordsToHighlight.includes(cleanPart)) {
                return (
                    <span
                        key={index}
                        className="highlight-word inline-block"
                        style={{ color: highlightColor, transition: 'color 0.5s ease-in-out' }}
                    >
                        {part}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    const firstName = "Dhruv";
    const lastName = "Prajapati";

    const dotColor = isDarkTheme ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
    const glowColor = isDarkTheme ? '#cfcfcf' : '#333333';

    return (
        <div className={`w-full transition-colors duration-500 ${theme.background}`}>
            {/* Hero Section */}
            <section
                ref={heroSectionRef}
                className="relative w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 lg:p-16 overflow-hidden"
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

                <div className="flex flex-col items-start relative z-20 max-w-7xl mx-auto">
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
                        className="text-7xl xs:text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] 2xl:text-[16rem] font-extrabold text-left select-none leading-none tracking-tight relative z-10 mt-2 xs:mt-4 sm:mt-6 md:mt-8 lg:mt-10 ml-8 xs:ml-12 sm:ml-16 md:ml-24 lg:ml-32 xl:ml-40 2xl:ml-48"
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
                    className="mt-8 sm:mt-12 text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl text-center font-medium opacity-80 z-10 relative"
                    style={{ color: theme.subtext }}
                >
                    I don&apos;t just ship code - I architect engines that hum through chaos and scale with silence.
                </p>
            </section>

            {/* About Me Section */}
            <section
                ref={aboutSectionRef}
                className="relative w-full flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16 py-20 sm:py-32"
                style={{ backgroundColor: theme.background }}
            >
                <div className="w-full max-w-[100vw] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
                    <div className="flex flex-col items-start">
                        {/* Top horizontal line */}
                        <div className="mt-0 sm:mt-0 mb-30 sm:mb-6 w-full border-t border-gray-400 opacity-30"></div>

                        <div
                            ref={aboutHeadingRef}
                            className="text-lg sm:text-xl md:text-2xl font-semibold mb-5 mt-15 text-left"
                            style={{ color: theme.subtext }}
                        >
                            <div className="flex items-center justify-center space-x-4">
                                <span className="font-light text-5xl">{'{'}</span>
                                <span className="text-center justify-center">About Me</span>
                                <span className="font-light text-5xl">{'}'}</span>
                            </div>
                        </div>

                        <h2
                            ref={aboutTextRef}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-left mb-10"
                            style={{ color: theme.heroText }}
                        >
                            <span className="block">
                                {renderHighlightedText(
                                    "Experienced Software Engineer with a strong track record of building secure, scalable applications,",
                                    wordsToHighlight
                                )}
                            </span>
                            <span className="block">
                                {renderHighlightedText(
                                    "automating cloud infrastructure, and deploying Artificial Intelligent based data-driven solutions.",
                                    wordsToHighlight
                                )}
                            </span>
                        </h2>

                        {/* Bottom horizontal line */}
                        <div className="w-full border-b border-gray-400 opacity-30 sm:mt-12"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
