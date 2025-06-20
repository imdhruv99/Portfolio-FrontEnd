'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

import techIconMap from '@/constants/TechIconMap';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getExperienceData } from '@/constants/ExperienceData';
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

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8">
            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-10 lg:py-0">
                {/* Text Content */}
                <div className="flex flex-col justify-center text-center lg:text-left animate-fade-in-up">
                    <h1 className={`${fontClasses.classyVogue} text-6xl sm:text-7xl lg:text-8xl font-light ${theme.experienceText} mb-4 lg:mb-6 leading-tight`}>
                        Experience
                    </h1>
                    <p className={`${fontClasses.eireneSansBold} text-base sm:text-lg lg:text-xl ${theme.experienceSubText} max-w-2xl mx-auto lg:mx-0 opacity-0 animate-fade-in-up delay-200`}>
                        A journey through my professional growth and contributions across various technologies and industries.
                    </p>
                </div>

                {/* Image */}
                <div className="relative w-full aspect-square max-w-[min(80vw,40rem)] mx-auto lg:max-w-full lg:mx-0 flex items-center justify-center opacity-0 animate-fade-in-up delay-600">
                    <Image
                        src="/images/character.png"
                        alt="Experience Overview"
                        layout="fill"
                        objectFit="contain"
                        className="pointer-events-none select-none"
                    />
                </div>
            </div>

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

interface ExperienceListViewProps {
    experienceData: ExperienceItem[];
    activeExperienceId: number | null;
    setActiveExperienceId: (id: number | null) => void;
}

const ExperienceListView = ({ experienceData, activeExperienceId, setActiveExperienceId }: ExperienceListViewProps) => {
    const { colors: theme } = useThemeColors();
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]); // Ref to scroll to the expanded item

    const handleToggleCase = useCallback((id: number) => {
        if (activeExperienceId === id) {
            setActiveExperienceId(null); // Collapse if already active
        } else {
            setActiveExperienceId(id); // Expand new item
        }
    }, [activeExperienceId, setActiveExperienceId]);

    // Scroll to the active item when it expands/collapses
    useEffect(() => {
        if (activeExperienceId !== null) {
            const index = experienceData.findIndex(exp => exp.id === activeExperienceId);
            if (index !== -1 && itemRefs.current[index]) {
                const element = itemRefs.current[index];
                element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [activeExperienceId, experienceData]);


    return (
        <section className="relative w-full overflow-hidden">
            <div className="relative z-10 w-full">
                {experienceData.map((experience, index) => (
                    <div
                        key={experience.id}
                        ref={(el) => {
                            itemRefs.current[index] = el;
                        }}
                        className={`
                            group
                            border-b ${theme.experienceListItemBorder}
                            transition-colors duration-300 ease-in-out
                            ${activeExperienceId === experience.id ? 'bg-white/[0.05] dark:bg-black/[0.05]' : 'hover:bg-white/[0.03] dark:hover:bg-black/[0.03]'}
                            cursor-pointer
                        `}
                    >
                        <div
                            className="flex items-center justify-between py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8"
                            onClick={() => handleToggleCase(experience.id)}
                        >
                            {/* Image + Company Name Row */}
                            <div className="flex items-center space-x-4 flex-grow text-left">
                                <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-lg overflow-hidden border border-transparent group-hover:border-white/20 dark:group-hover:border-white/10 transition-colors duration-300">
                                    <Image
                                        src={experience.image}
                                        alt={`${experience.company} Logo`}
                                        layout="fill"
                                        objectFit="contain"
                                        className="p-1 sm:p-2 lg:p-3"
                                    />
                                </div>
                                <h2 className={`${fontClasses.classyVogue} text-2xl sm:text-3xl lg:text-4xl ${theme.projecHeroText} leading-tight`}>
                                    {experience.company}
                                </h2>
                            </div>

                            {/* View/Close Button */}
                            <button
                                className={`
                                    ${theme.projectLinkButton}
                                    ${fontClasses.eireneSansBold}
                                    px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm
                                    transition-all duration-300 ease-in-out
                                    flex items-center whitespace-nowrap
                                    hover:bg-opacity-80
                                `}
                                onClick={(e) => { e.stopPropagation(); handleToggleCase(experience.id); }}
                            >
                                {activeExperienceId === experience.id ? 'Close' : 'View'}
                                <Icon icon={activeExperienceId === experience.id ? "akar-icons:cross" : "akar-icons:arrow-right"} className="ml-1 w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                        </div>


                        {/* Expanded View, conditionally rendered */}
                        {activeExperienceId === experience.id && (
                            <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-4 animate-fade-in-down">
                                <ExpandedExperienceContent experience={experience} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <style jsx>{`
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-1rem); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fadeInDown 0.5s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

interface ExpandedExperienceContentProps {
    experience: ExperienceItem;
}

const ExpandedExperienceContent = ({ experience }: ExpandedExperienceContentProps) => {
    const { colors: theme, isDarkTheme } = useThemeColors();

    return (
        <div className="relative w-full max-w-7xl mx-auto">
            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Designation, Period, Technologies */}
                <div className="flex flex-col space-y-6">
                    <h3 className={`${fontClasses.classyVogue} text-3xl sm:text-4xl ${theme.experienceText}`}>
                        {experience.designation}
                    </h3>
                    <p className={`${fontClasses.eireneSans} text-lg sm:text-xl ${theme.experienceSubText}`}>
                        {experience.period}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
                        {experience.technologies.map((tech, techIndex) => {
                            const iconName = isDarkTheme ? techIconMap[tech]?.dark : techIconMap[tech]?.light;
                            return iconName ? (
                                <div key={techIndex} className="flex items-center space-x-2">
                                    <Icon icon={iconName} className={`w-8 h-8 sm:w-10 sm:h-10 ${theme.experienceTechIcon}`} />
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-6 overflow-y-auto custom-scrollbar-expanded max-h-[60vh] lg:max-h-[unset]">
                    {experience.description.map((desc, descIndex) => (
                        <div key={descIndex} className="relative group">
                            <p className={`${fontClasses.eireneSans} text-base sm:text-lg ${theme.experienceDescriptionText} leading-relaxed tracking-wide transition-all duration-300 group-hover:opacity-90`}>
                                <span className="mr-2 text-primary">✦</span>{desc}
                            </p>
                            {/* Horizontal line */}
                            <div className="mt-3 w-full px-8 max-w-4xl mx-auto">
                                <div
                                    className={`
                                    h-px w-full
                                    transition-all duration-300
                                    ${theme.experienceDescriptionDivider} opacity-30
                                    `}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Scrollbar Styles for the description */}
            <style jsx>{`
                .custom-scrollbar-expanded::-webkit-scrollbar {
                    width: 0.5rem; /* 8px */
                }
                .custom-scrollbar-expanded::-webkit-scrollbar-track {
                    background: ${theme.experienceScrollbarTrack};
                    border-radius: 0.25rem; /* 4px */
                }
                .custom-scrollbar-expanded::-webkit-scrollbar-thumb {
                    background: ${theme.experienceScrollbarThumb};
                    border-radius: 0.25rem; /* 4px */
                }
                .custom-scrollbar-expanded::-webkit-scrollbar-thumb:hover {
                    background: ${theme.experienceScrollbarThumbHover};
                }
            `}</style>
        </div>
    );
};


const Experience = () => {
    const { colors: theme, isLoading, isDarkTheme } = useThemeColors();

    const experienceData = useMemo(() => getExperienceData(isDarkTheme), [isDarkTheme]);

    // Use activeExperienceId to track which item is open
    const [activeExperienceId, setActiveExperienceId] = useState<number | null>(null);
    const [isContentVisible, setIsContentVisible] = useState(false);

    // Initial content visibility logic
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

    return (
        <div
            className={`relative overflow-hidden ${theme.background}`}
        >
            {/* Main content containe */}
            <div className={`relative z-10 ${isContentVisible ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}`}>
                {/* Hero Section */}
                <ExperienceHeroSection />

                {/* Experience List */}
                <ExperienceListView
                    experienceData={experienceData}
                    activeExperienceId={activeExperienceId}
                    setActiveExperienceId={setActiveExperienceId}
                />
            </div>
        </div>
    );
};

export default Experience;
