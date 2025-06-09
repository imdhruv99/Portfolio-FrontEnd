'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

import techIconMap from '@/constants/techIconMap';
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
    const { colors } = useThemeColors();

    return (
        <div
            className={`
                ${colors.experienceBentoCard}
                ${colors.experienceBentoBorder}
                ${colors.experienceBentoHover}
                ${colors.experienceBentoShadow}
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
    const { colors, isDarkTheme } = useThemeColors();

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
                            style={{ background: `${colors.card}` }}
                        >
                            <h3 className={`text-sm font-medium ${colors.text} mb-1`}>
                                {experience.company}
                            </h3>
                            <p className={`text-xs ${colors.subtext}`}>{experience.period}</p>
                        </BentoCard>
                    </div>

                    {/* Coffee Mug */}
                    <div className="grid grid-cols-3 gap-4">
                        <BentoCard className="aspect-[4/3] flex justify-center items-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src='/props/03.png'
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
                                    src='/props/02.png'
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
                                    src='/props/01.png'
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
                        style={{ background: `${colors.card}` }}
                    >
                        <h1 className={`text-xl font-light ${colors.text} text-center`}>
                            {experience.designation}
                        </h1>
                    </BentoCard>

                    {/* Tech Icons */}
                    <BentoCard
                        className="h-35 flex flex-col justify-center items-center"
                        style={{ background: `${colors.card}` }}
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
                                    <p className={`text-sm md:text-base ${colors.descriptionText} leading-relaxed tracking-wide transition-all duration-300 group-hover:opacity-90`}>
                                        <span className="mr-2 text-primary">✦</span>{desc}
                                    </p>
                                    <div
                                        className={`mt-3 h-px w-full transition-all duration-300 ${colors.experienceDescriptionDivider}`}
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
                            style={{ background: `${colors.card}` }}
                        >
                            <h3 className={`text-xl font-semibold ${colors.text} mb-2`}>
                                {experience.company}
                            </h3>
                            <p className={`text-sm ${colors.subtext}`}>{experience.period}</p>
                        </BentoCard>

                        {/* Mac Setup */}
                        <BentoCard
                            className="col-span-3 row-span-3 flex flex-col justify-center items-center text-center"
                            style={{ background: `${colors.card}` }}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src='/props/01.png'
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
                            style={{ background: `${colors.card}` }}
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
                                    src='/props/03.png'
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
                            style={{ background: `${colors.card}` }}
                        >
                            <div className="relative z-10 text-center">
                                <h1 className={`text-4xl font-light ${colors.text}`}>
                                    {experience.designation}
                                </h1>
                            </div>
                        </BentoCard>

                        {/* User with Laptop */}
                        <BentoCard className="col-span-4 row-span-6 flex justify-center items-center">
                            <div className="relative w-full h-full">
                                <Image
                                    src='/props/02.png'
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
                                            className={`text-base ${colors.descriptionText} leading-relaxed tracking-wide transition-all duration-300 group-hover:opacity-90`}
                                        >
                                            <span className="mr-2 text-primary">✦</span>
                                            {desc}
                                        </p>
                                        <div
                                            className={`mt-3 h-px w-full transition-all duration-300 ${colors.experienceDescriptionDivider}`}
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
    const experienceData = getExperienceData(isDarkTheme);
    const [activeIndex, setActiveIndex] = useState(0);
    const [displayExperience, setDisplayExperience] = useState(experienceData[0]);
    const [isMobile, setIsMobile] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(false);

    // Fluid scrolling refs and state
    const scrollLocked = useRef(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Update display experience when activeIndex changes
    useEffect(() => {
        setDisplayExperience(experienceData[activeIndex]);
    }, [activeIndex, experienceData]);

    // Effect to control content visibility
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

    // Fluid scroll animation function (similar to Projects)
    const animateExperienceChange = useCallback((direction: 'next' | 'prev', newIndex: number) => {
        if (scrollLocked.current) return;
        scrollLocked.current = true;

        const experienceElement = experienceRef.current;
        if (!experienceElement) {
            scrollLocked.current = false;
            return;
        }

        const tl = gsap.timeline({
            defaults: { ease: 'power2.inOut', force3D: true },
            onComplete: () => {
                setActiveIndex(newIndex);
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
            setDisplayExperience(experienceData[newIndex]);
            setTimeout(() => setActiveIndex(newIndex), 50);
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
    }, [experienceData]);

    // Wheel scroll handler (similar to Projects)
    const handleScroll = useCallback((e: WheelEvent) => {
        if (scrollLocked.current || isMobile || Math.abs(e.deltaY) < 30) return;

        e.preventDefault(); // Prevent default scroll behavior

        const direction = e.deltaY > 0 ? 'next' : 'prev';
        const newIndex = direction === 'next'
            ? (activeIndex + 1) % experienceData.length
            : (activeIndex - 1 + experienceData.length) % experienceData.length;

        animateExperienceChange(direction, newIndex);
    }, [isMobile, activeIndex, animateExperienceChange, experienceData.length]);

    // Touch handlers for mobile (similar to Projects)
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (scrollLocked.current) return;
        const swipeDistance = touchStartX.current - touchEndX.current;
        if (Math.abs(swipeDistance) > 50) {
            const direction = swipeDistance > 0 ? 'next' : 'prev';
            const newIndex = direction === 'next'
                ? (activeIndex + 1) % experienceData.length
                : (activeIndex - 1 + experienceData.length) % experienceData.length;

            animateExperienceChange(direction, newIndex);
        }
    };

    // Add wheel event listener
    useEffect(() => {
        if (!isMobile && isContentVisible) {
            window.addEventListener('wheel', handleScroll, { passive: false });
            return () => window.removeEventListener('wheel', handleScroll);
        }
    }, [handleScroll, isMobile, isContentVisible]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

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
