'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getExperienceData } from '@/constants/ExperienceData';
import { TechIconCloud } from '../TechIconCloud';

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

const BentoCard = ({ children, className = '', style, isDarkTheme }: BentoCardProps) => (
    <div
        className={`backdrop-blur-xl bg-white/5 border ${isDarkTheme ? 'border-white/10' : 'border-gray-200'} rounded-3xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 ${className}`}
        style={style}
    >
        {children}
    </div>
);

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
                        <TechIconCloud technologies={experience.technologies} />
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

                {/* Desktop Layout - Original Grid */}
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
                            <TechIconCloud technologies={experience.technologies} />
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
    const containerRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for tracking active section
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-index') || '0');
                    setActiveIndex(index);
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('.experience-section');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            {/* Floating Particles */}
            <div
                className="fixed inset-0 transition-all duration-1000 pointer-events-none"
                style={{
                    background: `${colors.background}, radial-gradient(circle at 30% 20%, ${colors.pulseDot} 0%, transparent 50%), radial-gradient(circle at 70% 80%, ${colors.pulseDot} 0%, transparent 50%)`
                }}
            />

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
                        className="experience-section"
                        data-index={index}
                    >
                        <ExperienceGrid
                            experience={experience}
                            index={index}
                        />
                    </div>
                ))}
            </div>

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
