'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react'; // Although not directly used in this hero, keeping as per original
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';

import techIconMap from '@/constants/TechIconMap'; // Not used in hero, but keeping
import { useThemeColors } from '@/hooks/useThemeColors';
import { getExperienceData } from '@/constants/ExperienceData';
import NavigationDots from '../NavigationDots'; // Not used in hero, but keeping
import { fontClasses } from '@/config/fonts';

interface ExperienceItem {
    id: number;
    company: string;
    designation: string;
    period: string;
    description: string[];
    technologies: string[];
    image: string;
}

const ExperienceHeroSection = () => {
    const { colors: theme } = useThemeColors();

    const summaryText = "I have worked with companies as a Software Engineer, Software Architect, \
    and DevOps Engineer, contributing across the full product lifecycle. I’m passionate about building \
    innovative products that simplify and enhance everyday human life. I thrive in fast-paced environments \
    where technology drives meaningful impact."

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8">
            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-10 lg:py-0">
                {/* Left Section: Text Content */}
                <div className="flex flex-col justify-center text-center lg:text-left animate-fade-in-up">
                    <h1 className={`${fontClasses.classyVogue} text-6xl sm:text-7xl lg:text-8xl font-light ${theme.experienceText} mb-4 lg:mb-6 leading-tight`}>
                        Experience
                    </h1>
                    <p className={`${fontClasses.eireneSans} text-base sm:text-lg lg:text-xl ${theme.experienceSubText} max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in-up delay-200`}>
                        A journey through my professional growth and contributions across various technologies and industries.
                    </p>
                    <p className={`${fontClasses.eireneSans} text-base sm:text-lg lg:text-xl ${theme.experienceDescriptionText} max-w-2xl mx-auto lg:mx-0 mt-4 opacity-0 animate-fade-in-up delay-400`}>
                        {summaryText}
                    </p>
                </div>

                {/* Right Section: Image */}
                <div className="relative w-full aspect-square max-w-[min(80vw,40rem)] mx-auto lg:max-w-full lg:mx-0 flex items-center justify-center opacity-0 animate-fade-in-up delay-600">
                    <Image
                        src="/images/cubical.png"
                        alt="Experience Overview"
                        layout="fill"
                        objectFit="contain"
                        className="pointer-events-none select-none"
                    />
                </div>
            </div>

            {/* Animation styles */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(2rem); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }

                .delay-200 { animation-delay: 0.2s; }
                .delay-400 { animation-delay: 0.4s; }
                .delay-600 { animation-delay: 0.6s; }
            `}</style>
        </section>
    );
};

const Experience = () => {
    const { colors: theme, isDarkTheme, isLoading } = useThemeColors();

    // Memoize experience data to prevent recalculation on every render
    const experienceData = useMemo(() => getExperienceData(isDarkTheme), [isDarkTheme]);

    const [activeIndex, setActiveIndex] = useState(0); // Keeping for future sections
    const [isMobile, setIsMobile] = useState(false); // Keeping for future sections
    const [isContentVisible, setIsContentVisible] = useState(false); // Keeping for future sections

    // Fluid scrolling refs and state - Keeping for future sections
    const scrollLocked = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);

    // Memoize current experience to prevent unnecessary re-renders - Keeping for future sections
    const displayExperience = useMemo(() => {
        return experienceData[activeIndex] || experienceData[0];
    }, [experienceData, activeIndex]);

    // Check mobile only once on mount and on resize - Keeping for future sections
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle content visibility - Keeping for future sections
    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setIsContentVisible(true);
            }, 50);
            return () => clearTimeout(timer);
        } else {
            setIsContentVisible(false);
        }
    }, [isLoading]);

    // Memoized animation function to prevent recreation on every render - Keeping for future sections
    const animateExperienceChange = useCallback((direction: 'next' | 'prev', newIndex: number) => {
        if (scrollLocked.current || newIndex === activeIndex) return;
        scrollLocked.current = true;

        const experienceElement = experienceRef.current;
        if (!experienceElement) {
            scrollLocked.current = false;
            return;
        }

        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut', force3D: true },
            onComplete: () => {
                scrollLocked.current = false;
            },
        });

        if (direction === 'next') {
            tl.to(experienceElement, {
                y: '-=100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
            });
        } else {
            tl.to(experienceElement, {
                y: '+=100%',
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in',
            });
        }

        tl.add(() => {
            setActiveIndex(newIndex);
            gsap.set(experienceElement, {
                y: direction === 'next' ? '100%' : '-100%',
                opacity: 0,
            });
        });

        tl.to(experienceElement, {
            y: '0%',
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
        });
    }, [activeIndex]);

    // Memoized scroll handler for desktop - Keeping for future sections
    const handleScroll = useCallback((e: WheelEvent) => {
        if (scrollLocked.current || isMobile || Math.abs(e.deltaY) < 30) return;

        e.preventDefault();

        const direction = e.deltaY > 0 ? 'next' : 'prev';
        const newIndex = direction === 'next'
            ? (activeIndex + 1) % experienceData.length
            : (activeIndex - 1 + experienceData.length) % experienceData.length;

        animateExperienceChange(direction, newIndex);
    }, [isMobile, activeIndex, animateExperienceChange, experienceData.length]);

    // Mobile scroll handler for vertical scrolling - Keeping for future sections
    const handleMobileScroll = useCallback((e: WheelEvent) => {
        if (scrollLocked.current || !isMobile || Math.abs(e.deltaY) < 50) return;

        e.preventDefault();

        const direction = e.deltaY > 0 ? 'next' : 'prev';
        const newIndex = direction === 'next'
            ? (activeIndex + 1) % experienceData.length
            : (activeIndex - 1 + experienceData.length) % experienceData.length;

        animateExperienceChange(direction, newIndex);
    }, [isMobile, activeIndex, animateExperienceChange, experienceData.length]);

    // Memoized touch handlers - support both horizontal and vertical swipes - Keeping for future sections
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
        touchStartY.current = e.targetTouches[0].clientY;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
        touchEndY.current = e.targetTouches[0].clientY;
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (scrollLocked.current) return;

        const swipeDistanceX = touchStartX.current - touchEndX.current;
        const swipeDistanceY = touchStartY.current - touchEndY.current;

        // Check if it's a significant swipe
        const isHorizontalSwipe = Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) && Math.abs(swipeDistanceX) > 50;
        const isVerticalSwipe = Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX) && Math.abs(swipeDistanceY) > 50;

        if (isHorizontalSwipe || isVerticalSwipe) {
            let direction: 'next' | 'prev';

            if (isHorizontalSwipe) {
                // Horizontal swipe: left = next, right = prev
                direction = swipeDistanceX > 0 ? 'next' : 'prev';
            } else {
                // Vertical swipe: down = next, up = prev
                direction = swipeDistanceY > 0 ? 'next' : 'prev';
            }

            const newIndex = direction === 'next'
                ? (activeIndex + 1) % experienceData.length
                : (activeIndex - 1 + experienceData.length) % experienceData.length;

            animateExperienceChange(direction, newIndex);
        }
    }, [activeIndex, animateExperienceChange, experienceData.length]);

    // Add wheel event listeners for both desktop and mobile - Keeping for future sections
    useEffect(() => {
        if (isContentVisible) {
            if (isMobile) {
                // Mobile
                window.addEventListener('wheel', handleMobileScroll, { passive: false });
                return () => window.removeEventListener('wheel', handleMobileScroll);
            } else {
                // Desktop
                window.addEventListener('wheel', handleScroll, { passive: false });
                return () => window.removeEventListener('wheel', handleScroll);
            }
        }
    }, [handleScroll, handleMobileScroll, isMobile, isContentVisible]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${theme.background}`}
            onTouchStart={handleTouchStart} // Keeping for future sections
            onTouchMove={handleTouchMove}   // Keeping for future sections
            onTouchEnd={handleTouchEnd}     // Keeping for future sections
        >
            {/* Main content container with controlled visibility */}
            <div className={`relative z-10 ${isContentVisible ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}`}>
                {/* The hero section component */}
                <ExperienceHeroSection />
            </div>

            {/* NavigationDots and custom-scrollbar styles are removed as they are not relevant for the hero section
                and will be reintroduced when we implement the full experience scroll/sections. */}

            <style jsx>{`
                /* Basic responsive rem units for padding.
                   Tailwind's default rem conversion handles most cases,
                   but explicit values can be used here if needed for finer control. */
                .p-4 { padding: 1rem; }
                .sm\\:p-6 { padding: 1.5rem; }
                .lg\\:p-8 { padding: 2rem; }

                .py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
                .lg\\:py-0 { padding-top: 0rem; padding-bottom: 0rem; }

                .text-6xl { font-size: 3.75rem; } /* 60px */
                .sm\\:text-7xl { font-size: 4.5rem; } /* 72px */
                .lg\\:text-8xl { font-size: 6rem; } /* 96px */

                .text-base { font-size: 1rem; } /* 16px */
                .sm\\:text-lg { font-size: 1.125rem; } /* 18px */
                .lg\\:text-xl { font-size: 1.25rem; } /* 20px */
            `}</style>
        </div>
    );
};

export default Experience;
