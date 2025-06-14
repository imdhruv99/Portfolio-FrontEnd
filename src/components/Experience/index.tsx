'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';

import techIconMap from '@/constants/TechIconMap';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getExperienceData } from '@/constants/ExperienceData';
import NavigationDots from '../NavigationDots';

interface ExperienceItem {
    id: number;
    company: string;
    designation: string;
    period: string;
    description: string[];
    technologies: string[];
    image: string;
}

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const BentoCard = ({ children, className = '', style }: BentoCardProps) => {
    const { colors: theme } = useThemeColors();

    return (
        <div
            className={`
                ${theme.experienceBentoCard}
                ${theme.experienceBentoBorder}
                ${theme.experienceBentoHover}
                ${theme.experienceBentoShadow}
                backdrop-blur-md rounded-2xl
                transition-all duration-300
                ${className}
            `}
            style={style}
        >
            {children}
        </div>
    );
};

interface ExperienceGridProps {
    experience: ExperienceItem;
    index: number;
}

const ExperienceGrid = ({ experience }: ExperienceGridProps) => {
    const { colors: theme, isDarkTheme } = useThemeColors();

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-7xl mx-auto">
                {/* Mobile Layout */}
                <div className="lg:hidden space-y-4 h-[80vh] overflow-y-auto flex flex-col justify-start">
                    {/* Company Logo and Info */}
                    <div className="grid grid-cols-2 gap-4 h-32">
                        <BentoCard className="flex justify-center items-center relative">
                            <div className="relative w-full h-full">
                                <Image
                                    src={experience.image}
                                    alt="Company Logo"
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-4"
                                />
                            </div>
                        </BentoCard>

                        <BentoCard
                            className="flex flex-col justify-center items-center text-center"
                            style={{ background: `${theme.experienceCard}` }}
                        >
                            <h3 className={`text-sm font-medium ${theme.experienceText} mb-1`}>
                                {experience.company}
                            </h3>
                            <p className={`text-xs ${theme.experienceSubText}`}>{experience.period}</p>
                        </BentoCard>
                    </div>

                    {/* Coffee Mug */}
                    <div className="grid grid-cols-3 gap-4">
                        <BentoCard className="aspect-[4/3] flex justify-center items-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src='/images/coffee.png'
                                    alt="Design Element"
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-2"
                                />
                            </div>
                        </BentoCard>

                        {/* User with Laptop */}
                        <BentoCard className="aspect-[4/3] flex justify-center items-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src='/images/user_with_mac.png'
                                    alt="Design Element"
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-2"
                                />
                            </div>
                        </BentoCard>

                        {/* Mac Setup */}
                        <BentoCard className="aspect-[4/3] flex justify-center items-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src='/images/imac.png'
                                    alt="Design Element"
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-2"
                                />
                            </div>
                        </BentoCard>
                    </div>

                    {/* Designation */}
                    <BentoCard
                        className="h-25 flex items-center justify-center"
                        style={{ background: `${theme.experienceCard}` }}
                    >
                        <h1 className={`text-xl font-light ${theme.experienceText} text-center`}>
                            {experience.designation}
                        </h1>
                    </BentoCard>

                    {/* Tech Icons */}
                    <BentoCard
                        className="h-35 flex flex-col justify-center items-center"
                        style={{ background: `${theme.experienceCard}` }}
                    >
                        <div></div>
                        <div className="flex flex-wrap justify-center items-center gap-4">
                            {experience.technologies.map((tech, techIndex) => {
                                const iconName = isDarkTheme ? techIconMap[tech]?.dark : techIconMap[tech]?.light;
                                return iconName ? (
                                    <Icon key={techIndex} icon={iconName} className="w-8 h-8 md:w-10 md:h-10" />
                                ) : null;
                            })}
                        </div>
                    </BentoCard>

                    {/* Description */}
                    <BentoCard
                        className="min-h-[150px] overflow-y-auto custom-scrollbar p-6"
                    >
                        <div className="space-y-6">
                            {experience.description.map((desc, descIndex) => (
                                <div key={descIndex} className="relative group">
                                    <p className={`text-sm md:text-base ${theme.experienceDescriptionText} leading-relaxed tracking-wide transition-all duration-300 group-hover:opacity-90`}>
                                        <span className="mr-2 text-primary">✦</span>{desc}
                                    </p>
                                    <div
                                        className={`mt-3 h-px w-full transition-all duration-300 ${theme.experienceDescriptionDivider}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </BentoCard>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block">
                    <div className="grid grid-cols-14 grid-rows-10 gap-5 h-[80vh] min-h-[600px]">
                        {/* Company Logo Image */}
                        <BentoCard className="col-span-4 row-span-3 flex justify-center items-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src={experience.image}
                                    alt="Design Element"
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-10"
                                />
                            </div>
                        </BentoCard>

                        {/* Company Name and Period */}
                        <BentoCard
                            className="col-span-3 row-span-3 flex flex-col justify-center items-center text-center"
                            style={{ background: `${theme.experienceCard}` }}
                        >
                            <h3 className={`text-xl font-semibold ${theme.experienceText} mb-2`}>
                                {experience.company}
                            </h3>
                            <p className={`text-sm ${theme.experienceSubText}`}>{experience.period}</p>
                        </BentoCard>

                        {/* Mac Setup */}
                        <BentoCard
                            className="col-span-3 row-span-3 flex flex-col justify-center items-center text-center"
                            style={{ background: `${theme.experienceCard}` }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src='/images/imac.png'
                                    alt="Company Logo"
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-5"
                                />
                            </div>
                        </BentoCard>

                        {/* Icon */}
                        <BentoCard
                            className="col-span-4 row-span-4 flex flex-col justify-center items-center text-center"
                            style={{ background: `${theme.experienceCard}` }}
                        >
                            <div className="flex flex-wrap justify-center items-center gap-4">
                                {experience.technologies.map((tech, techIndex) => {
                                    const iconName = isDarkTheme ? techIconMap[tech]?.dark : techIconMap[tech]?.light;
                                    return iconName ? (
                                        <Icon key={techIndex} icon={iconName} className="w-10 h-10 md:w-12 md:h-12" />
                                    ) : null;
                                })}
                            </div>
                        </BentoCard>

                        {/* Coffee Mug */}
                        <BentoCard className="col-span-4 row-span-3 flex justify-center items-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src='/images/coffee.png'
                                    alt="Design Element"
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-2"
                                />
                            </div>
                        </BentoCard>

                        {/* Designation */}
                        <BentoCard
                            className="col-span-6 row-span-3 flex items-center justify-center relative overflow-hidden"
                            style={{ background: `${theme.experienceCard}` }}
                        >
                            <div className="relative z-10 text-center">
                                <h1 className={`text-4xl font-light ${theme.experienceText}`}>
                                    {experience.designation}
                                </h1>
                            </div>
                        </BentoCard>

                        {/* User with Laptop */}
                        <BentoCard className="col-span-4 row-span-6 flex justify-center items-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src='/images/user_with_mac.png'
                                    alt="Design Element"
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-5"
                                />
                            </div>
                        </BentoCard>

                        {/* Description */}
                        <BentoCard className="col-span-10 row-span-4 overflow-y-auto custom-scrollbar p-6">
                            <div className="space-y-6">
                                {experience.description.map((desc, descIndex) => (
                                    <div key={descIndex} className="relative group">
                                        <p
                                            className={`text-base ${theme.experienceDescriptionText} leading-relaxed tracking-wide transition-all duration-300 group-hover:opacity-90`}
                                        >
                                            <span className="mr-2 text-primary">✦</span>
                                            {desc}
                                        </p>
                                        <div
                                            className={`mt-3 h-px w-full transition-all duration-300 ${theme.experienceDescriptionDivider}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </BentoCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Experience = () => {
    const { colors, isDarkTheme, isLoading } = useThemeColors();

    // Memoize experience data to prevent recalculation on every render
    const experienceData = useMemo(() => getExperienceData(isDarkTheme), [isDarkTheme]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(false);

    // Fluid scrolling refs and state
    const scrollLocked = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const touchStartY = useRef(0);
    const touchEndY = useRef(0);

    // Memoize current experience to prevent unnecessary re-renders
    const displayExperience = useMemo(() => {
        return experienceData[activeIndex] || experienceData[0];
    }, [experienceData, activeIndex]);

    // Check mobile only once on mount and on resize
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle content visibility
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

    // Memoized animation function to prevent recreation on every render
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

    // Memoized scroll handler for desktop
    const handleScroll = useCallback((e: WheelEvent) => {
        if (scrollLocked.current || isMobile || Math.abs(e.deltaY) < 30) return;

        e.preventDefault();

        const direction = e.deltaY > 0 ? 'next' : 'prev';
        const newIndex = direction === 'next'
            ? (activeIndex + 1) % experienceData.length
            : (activeIndex - 1 + experienceData.length) % experienceData.length;

        animateExperienceChange(direction, newIndex);
    }, [isMobile, activeIndex, animateExperienceChange, experienceData.length]);

    // Mobile scroll handler for vertical scrolling
    const handleMobileScroll = useCallback((e: WheelEvent) => {
        if (scrollLocked.current || !isMobile || Math.abs(e.deltaY) < 50) return;

        e.preventDefault();

        const direction = e.deltaY > 0 ? 'next' : 'prev';
        const newIndex = direction === 'next'
            ? (activeIndex + 1) % experienceData.length
            : (activeIndex - 1 + experienceData.length) % experienceData.length;

        animateExperienceChange(direction, newIndex);
    }, [isMobile, activeIndex, animateExperienceChange, experienceData.length]);

    // Memoized touch handlers - support both horizontal and vertical swipes
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

    // Add wheel event listeners for both desktop and mobile
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
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Main content container with controlled visibility */}
            <div className={`relative z-10 ${isContentVisible ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}`}>
                <div
                    ref={experienceRef}
                    className="experience-section transition-opacity duration-300"
                >
                    <ExperienceGrid experience={displayExperience} index={activeIndex} />
                </div>
            </div>

            <NavigationDots
                currentIndex={activeIndex}
                total={experienceData.length}
                isDark={isDarkTheme}
                setCurrentProject={setActiveIndex}
                isMobile={isMobile}
                className="hidden lg:block"
            />

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: ${colors.experienceScrollbarTrack};
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: ${colors.experienceScrollbarThumb};
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: ${colors.experienceScrollbarThumbHover};
                }
            `}</style>
        </div>
    );
};

export default Experience;
