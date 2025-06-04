'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useEffect, useState, useRef, useCallback } from 'react';

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
    delay?: number;
    style?: React.CSSProperties;
    isDarkTheme: boolean;
}

const BentoCard = ({ children, className = '', style, isDarkTheme }: BentoCardProps) => {
    const baseBackground = isDarkTheme
        ? 'bg-[#1c1c1e]/70'
        : 'bg-white/60';

    const borderColor = isDarkTheme
        ? 'border border-[#2c2c2e]'
        : 'border border-[#e5e7eb]';

    const hoverStyle = isDarkTheme
        ? 'hover:bg-[#2a2a2c]/80 hover:border-[#3a3a3c]'
        : 'hover:bg-white/80 hover:border-[#d1d5db]';

    const shadowStyle = isDarkTheme
        ? 'shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
        : 'shadow-[0_4px_12px_rgba(0,0,0,0.08)]';

    return (
        <div
            className={`
                ${baseBackground}
                ${borderColor}
                ${hoverStyle}
                ${shadowStyle}
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

const ExperienceGrid = ({ experience, index }: ExperienceGridProps) => {
    const { colors, isDarkTheme } = useThemeColors();
    const baseDelay = index * 0.1;

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-7xl mx-auto">
                {/* Mobile Layout */}
                <div className="block lg:hidden space-y-4">
                    {/* Company Logo and Info */}
                    <div className="grid grid-cols-2 gap-4 h-32">
                        <BentoCard
                            className="flex justify-center items-center relative"
                            delay={baseDelay}
                            isDarkTheme={isDarkTheme}
                        >
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
                            delay={baseDelay + 0.1}
                            style={{ background: `${colors.card}` }}
                            isDarkTheme={isDarkTheme}
                        >
                            <h3 className={`text-sm font-semibold ${colors.text} mb-1`}>
                                {experience.company}
                            </h3>
                            <p className={`text-xs ${colors.subtext}`}>{experience.period}</p>
                        </BentoCard>
                    </div>

                    {/* Designation */}
                    <BentoCard
                        className="h-20 flex items-center justify-center"
                        delay={baseDelay + 0.2}
                        style={{ background: `${colors.card}` }}
                        isDarkTheme={isDarkTheme}
                    >
                        <h1 className={`text-xl font-light ${colors.text} text-center`}>
                            {experience.designation}
                        </h1>
                    </BentoCard>

                    {/* Tech Icons */}
                    <BentoCard
                        className="h-48 flex flex-col justify-center items-center"
                        delay={baseDelay + 0.3}
                        style={{ background: `${colors.card}` }}
                        isDarkTheme={isDarkTheme}
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
                        className="min-h-[200px] overflow-y-auto custom-scrollbar"
                        delay={baseDelay + 0.4}
                        isDarkTheme={isDarkTheme}
                    >
                        <div className="space-y-3">
                            {experience.description.map((desc, descIndex) => (
                                <div key={descIndex} className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-current opacity-50" />
                                    <p className={`text-sm ${colors.descriptionText} text-justify leading-relaxed`}>
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </BentoCard>

                    {/* Design placeholders - smaller on mobile */}
                    <div className="grid grid-cols-2 gap-4 h-24">
                        <BentoCard
                            className="flex justify-center items-center"
                            delay={baseDelay + 0.5}
                            isDarkTheme={isDarkTheme}
                        >
                            <div className="text-xs text-center opacity-50">Design Element</div>
                        </BentoCard>

                        <BentoCard
                            className="flex justify-center items-center"
                            delay={baseDelay + 0.6}
                            isDarkTheme={isDarkTheme}
                        >
                            <div className="text-xs text-center opacity-50">Design Element</div>
                        </BentoCard>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block">
                    <div className="grid grid-cols-14 grid-rows-10 gap-5 h-[80vh] min-h-[600px]">
                        {/* Company Logo Image */}
                        <BentoCard
                            className="col-span-4 row-span-3 flex justify-center items-center"
                            delay={baseDelay + 0.1}
                            isDarkTheme={isDarkTheme}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={experience.image}
                                    alt="Company Logo"
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-10"
                                />
                            </div>
                        </BentoCard>

                        {/* Company Name and Period */}
                        <BentoCard
                            className="col-span-3 row-span-3 flex flex-col justify-center items-center text-center"
                            delay={baseDelay}
                            style={{ background: `${colors.card}` }}
                            isDarkTheme={isDarkTheme}
                        >
                            <h3 className={`text-xl font-semibold ${colors.text} mb-2`}>
                                {experience.company}
                            </h3>
                            <p className={`text-sm ${colors.subtext}`}>{experience.period}</p>
                        </BentoCard>

                        {/* Design Element 1 */}
                        <BentoCard
                            className="col-span-3 row-span-3 flex flex-col justify-center items-center text-center"
                            delay={baseDelay}
                            style={{ background: `${colors.card}` }}
                            isDarkTheme={isDarkTheme}
                        >
                            <div>Just Design</div>
                        </BentoCard>

                        {/* Icon Cloud */}
                        <BentoCard
                            className="col-span-4 row-span-6 flex flex-col justify-center items-center text-center"
                            delay={baseDelay}
                            style={{ background: `${colors.card}` }}
                            isDarkTheme={isDarkTheme}
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

                        {/* Design Element 2 */}
                        <BentoCard
                            className="col-span-4 row-span-3 flex justify-center items-center"
                            delay={baseDelay + 0.1}
                            isDarkTheme={isDarkTheme}
                        >
                            <div>I will add some design here again</div>
                        </BentoCard>

                        {/* Designation */}
                        <BentoCard
                            className="col-span-6 row-span-3 flex items-center justify-center relative overflow-hidden"
                            delay={baseDelay + 0.3}
                            style={{ background: `${colors.card}` }}
                            isDarkTheme={isDarkTheme}
                        >
                            <div className="relative z-10 text-center">
                                <h1 className={`text-4xl font-light ${colors.text}`}>
                                    {experience.designation}
                                </h1>
                            </div>
                        </BentoCard>

                        {/* Description */}
                        <BentoCard
                            className="col-span-10 row-span-4 overflow-y-auto custom-scrollbar"
                            delay={baseDelay + 0.4}
                            isDarkTheme={isDarkTheme}
                        >
                            <div className="space-y-4">
                                {experience.description.map((desc, descIndex) => (
                                    <div key={descIndex} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" />
                                        <ul className="list-disc">
                                            <li className={`text-base ${colors.descriptionText} text-justify`}>
                                                {desc}
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </BentoCard>

                        {/* Design Element 3 */}
                        <BentoCard
                            className="col-span-4 row-span-4 flex justify-center items-center"
                            delay={baseDelay + 0.1}
                            isDarkTheme={isDarkTheme}
                        >
                            <div>I will add some design here again</div>
                        </BentoCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Experience = () => {
    const { colors, isDarkTheme } = useThemeColors();
    const experienceData = getExperienceData(isDarkTheme);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const isProgrammaticScroll = useRef(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const section = sectionRefs.current[activeIndex];
        if (section) {
            isProgrammaticScroll.current = true;
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth',
            });
            const timer = setTimeout(() => {
                isProgrammaticScroll.current = false;
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [activeIndex]);

    const handleScroll = useCallback(() => {
        if (isProgrammaticScroll.current) {
            return; // Ignore scroll events if we just programmatically scrolled
        }

        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let newActiveIndex = activeIndex;

        for (let i = 0; i < sectionRefs.current.length; i++) {
            const section = sectionRefs.current[i];
            if (section) {
                const rect = section.getBoundingClientRect();
                const sectionTop = window.scrollY + rect.top;
                const sectionBottom = sectionTop + rect.height;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    newActiveIndex = i;
                    break;
                }
            }
        }

        if (newActiveIndex !== activeIndex) {
            setActiveIndex(newActiveIndex);
        }
    }, [activeIndex]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div ref={containerRef} className="relative">
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full opacity-30"
                    style={{
                        backgroundColor: colors.floatingElement,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                />
            ))}

            {/* Experience Sections */}
            <div className="relative z-10">
                {experienceData.map((experience, index) => (
                    <div
                        key={experience.id}
                        ref={(el) => {
                            sectionRefs.current[index] = el;
                        }}
                        className={`experience-section transition-opacity duration-300 ${index === activeIndex ? 'opacity-100' : 'opacity-30 pointer-events-none'
                            }`}
                        data-index={index}
                    >
                        <ExperienceGrid experience={experience} index={index} />
                    </div>
                ))}
            </div>

            <NavigationDots
                currentIndex={activeIndex}
                total={experienceData.length}
                isDark={isDarkTheme}
                setCurrentProject={setActiveIndex}
                isMobile={isMobile}
            />

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.5);
                }
            `}</style>
        </div>
    );
};

export default Experience;
