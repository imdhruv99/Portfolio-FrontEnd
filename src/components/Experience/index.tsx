'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
// Removed ScrollToPlugin import as it's not needed for in-place expansion

import techIconMap from '@/constants/TechIconMap';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getExperienceData } from '@/constants/ExperienceData';
// Removed NavigationDots as it's not used
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

// BentoCard is not used and is removed
/*
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
*/

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
                        src="/images/desktop.png" // Using desktop.png as discussed
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
    activeExperienceId: number | null; // Use activeExperienceId directly
    setActiveExperienceId: (id: number | null) => void; // Function to update active ID
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
                // Smooth scroll into view, adjust block to 'start' or 'center' as needed
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
                        ref={(el) => (itemRefs.current[index] = el)}
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
                            {/* Left Section: Company Name and Designation */}
                            <div className="flex flex-col flex-grow text-left">
                                <h2 className={`${fontClasses.classyVogue} text-2xl sm:text-3xl lg:text-4xl ${theme.projecHeroText} leading-tight mb-1`}>
                                    {experience.company}
                                </h2>
                            </div>

                            {/* Right Section: Thumbnail Image & View Case Button */}
                            <div className="flex flex-shrink-0 items-center space-x-4 sm:space-x-6">
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex-shrink-0 rounded-lg overflow-hidden border border-transparent group-hover:border-white/20 dark:group-hover:border-white/10 transition-colors duration-300">
                                    <Image
                                        src={experience.image}
                                        alt={`${experience.company} Logo`}
                                        layout="fill"
                                        objectFit="contain"
                                        className="p-1 sm:p-2 lg:p-3"
                                    />
                                </div>
                                <button
                                    className={`
                                        ${theme.projectLinkButton}
                                        ${fontClasses.eireneSansBold}
                                        px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base lg:text-lg
                                        transition-all duration-300 ease-in-out
                                        flex items-center whitespace-nowrap
                                        hover:bg-opacity-80
                                    `}
                                    onClick={(e) => { e.stopPropagation(); handleToggleCase(experience.id); }} // Ensure button also toggles
                                >
                                    {activeExperienceId === experience.id ? 'Close' : 'View'}
                                    <Icon icon={activeExperienceId === experience.id ? "akar-icons:cross" : "akar-icons:arrow-right"} className="ml-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                                </button>
                            </div>
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

// Renamed to ExpandedExperienceContent because it's no longer a full section
interface ExpandedExperienceContentProps {
    experience: ExperienceItem;
}

const ExpandedExperienceContent = ({ experience }: ExpandedExperienceContentProps) => {
    const { colors: theme, isDarkTheme } = useThemeColors();

    return (
        <div className="relative w-full max-w-7xl mx-auto">
            {/* Main Content Area (Two Columns for larger screens, stacked for smaller) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Left Column: Designation, Period, Technologies */}
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
                                    <span className={`${fontClasses.eireneSans} text-sm sm:text-base ${theme.experienceDescriptionText}`}>
                                        {tech}
                                    </span>
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>

                {/* Right Column: Description */}
                <div className="space-y-6 overflow-y-auto custom-scrollbar-expanded max-h-[60vh] lg:max-h-[unset]">
                    {experience.description.map((desc, descIndex) => (
                        <div key={descIndex} className="relative group">
                            <p className={`${fontClasses.eireneSans} text-base sm:text-lg ${theme.experienceDescriptionText} leading-relaxed tracking-wide transition-all duration-300 group-hover:opacity-90`}>
                                <span className="mr-2 text-primary">✦</span>{desc}
                            </p>
                            {/* Horizontal line: reduced width and opacity, with side padding */}
                            <div
                                className={`
                                    mt-3 h-px w-[calc(100%-4rem)] mx-auto
                                    transition-all duration-300
                                    ${theme.experienceDescriptionDivider} opacity-30
                                `}
                            />
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
    const { colors: theme, isLoading } = useThemeColors();

    // No need for isDarkTheme here, as it's passed down to useMemo and children components
    const experienceData = useMemo(() => getExperienceData(theme.isDark), [theme.isDark]);

    // Use activeExperienceId to track which item is open
    const [activeExperienceId, setActiveExperienceId] = useState<number | null>(null);
    const [isContentVisible, setIsContentVisible] = useState(false);

    // Initial content visibility logic (remains similar)
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
            {/* Main content container with controlled visibility */}
            <div className={`relative z-10 ${isContentVisible ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}`}>
                {/* Hero Section */}
                <ExperienceHeroSection />

                {/* Experience List View with in-place expansion */}
                <ExperienceListView
                    experienceData={experienceData}
                    activeExperienceId={activeExperienceId}
                    setActiveExperienceId={setActiveExperienceId}
                />
            </div>

            <style jsx>{`
                /* General responsive rem units */
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

                /* Styles specific to ExperienceListView */
                .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
                .px-4 { padding-left: 1rem; padding-right: 1rem; }
                .sm\\:py-8 { padding-top: 2rem; padding-bottom: 2rem; }
                .sm\\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
                .lg\\:py-10 { padding-top: 2.5rem; padding-bottom: 2.5rem; }
                .lg\\:px-8 { padding-left: 2rem; padding-right: 2rem; }

                /* Company name in list view */
                .text-2xl { font-size: 1.5rem; } /* 24px */
                .sm\\:text-3xl { font-size: 1.875rem; } /* 30px */
                .lg\\:text-4xl { font-size: 2.25rem; } /* 36px */

                .w-20 { width: 5rem; }
                .h-20 { height: 5rem; }
                .sm\\:w-24 { width: 6rem; }
                .sm\\:h-24 { height: 6rem; }
                .lg\\:w-28 { width: 7rem; }
                .lg\\:h-28 { height: 7rem; }

                /* Styles specific to ExpandedExperienceContent */
                .gap-8 { gap: 2rem; }
                .lg\\:gap-16 { gap: 4rem; }

                /* Adjusted text sizes in expanded view for better hierarchy */
                /* Company name will be large, Designation slightly smaller */
                .text-4xl { font-size: 2.25rem; }
                .sm\\:text-5xl { font-size: 3rem; }
                .lg\\:text-6xl { font-size: 3.75rem; }

                .text-sm { font-size: 0.875rem; }
                .sm\\:text-base { font-size: 1rem; }
                .lg\\:text-lg { font-size: 1.125rem; }

                .w-8 { width: 2rem; }
                .h-8 { height: 2rem; }
                .sm\\:w-10 { width: 2.5rem; }
                .sm\\:h-10 { height: 2.5rem; }
                /* Icon size for close/arrow in buttons */
                .w-4 { width: 1rem; }
                .h-4 { height: 1rem; }
                .sm\\:w-5 { width: 1.25rem; }
                .sm\\:h-5 { height: 1.25rem; }
                .lg\\:w-6 { width: 1.5rem; }
                .lg\\:h-6 { height: 1.5rem; }
            `}</style>
        </div>
    );
};

export default Experience;
