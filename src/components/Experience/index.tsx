'use client';

import gsap from 'gsap';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { useEffect, useState, useRef, useMemo } from 'react';

import techIconMap from '@/constants/TechIconMap';
import { useThemeColors } from '@/hooks/useThemeColors';
import { getExperienceData } from '@/constants/ExperienceData';
import { fontClasses } from '@/config/fonts';
import { scrambleText } from '@/utils/scramble';

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
    const headingRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;
        if (prefersReducedMotion) return;

        const tl = gsap.timeline({
            defaults: { ease: 'power3.out', duration: 1 },
        });

        tl.fromTo(
            headingRef.current,
            { y: 80, opacity: 0, rotateX: 45 },
            { y: 0, opacity: 1, rotateX: 0 },
        )
            .fromTo(
                paragraphRef.current,
                { opacity: 0, y: 40, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1 },
                '-=0.5',
            )
            .fromTo(
                imageRef.current,
                { opacity: 0, rotateY: 60, scale: 0.8 },
                { opacity: 1, rotateY: 0, scale: 1 },
                '-=0.6',
            );
    }, []);

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden p-4 sm:p-6 lg:p-8">
            <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-10 lg:py-0">
                <div className="flex flex-col justify-center text-center lg:text-left">
                    <h1
                        ref={headingRef}
                        className={`${fontClasses.classyVogue} text-5xl sm:text-6xl lg:text-7xl font-light ${theme.experienceText} mb-4 lg:mb-6 leading-tight`}
                    >
                        Experience
                    </h1>

                    <p
                        className={`${fontClasses.eireneSans} text-base sm:text-lg lg:text-xl ${theme.experienceSubText} max-w-xl mx-auto lg:mx-0 pt-5`}
                    >
                        A journey through my professional growth and
                        contributions across various technologies and
                        industries.
                    </p>
                    <p
                        className={`${fontClasses.eireneSans} text-base sm:text-lg lg:text-xl ${theme.experienceSubText} max-w-xl mx-auto lg:mx-0 pt-5`}
                    >
                        I’ve worked with a range of companies in roles such as
                        Software Engineer, DevOps Engineer, and Software
                        Architect.
                    </p>
                    <p
                        className={`${fontClasses.eireneSans} text-base sm:text-lg lg:text-xl ${theme.experienceSubText} max-w-xl mx-auto lg:mx-0 pt-3`}
                    >
                        My experience includes building scalable systems and
                        delivering reliable software solutions in diverse tech
                        stacks.
                    </p>
                </div>

                <div
                    ref={imageRef}
                    className="relative w-full aspect-square max-w-[min(80vw,40rem)] mx-auto lg:max-w-full lg:mx-0 flex items-center justify-center"
                >
                    <Image
                        src="/svgs/experience.svg"
                        alt="Experience Overview"
                        fill
                        className="object-contain pointer-events-none select-none"
                    />
                </div>
            </div>
        </section>
    );
};

interface ExperienceListViewProps {
    experienceData: ExperienceItem[];
    activeExperienceId: number | null;
    setActiveExperienceId: (id: number | null) => void;
}

const ExperienceListView = ({
    experienceData,
    activeExperienceId,
    setActiveExperienceId,
}: ExperienceListViewProps) => {
    const { colors: theme } = useThemeColors();
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const companyNameRefs = useRef<(HTMLHeadingElement | null)[]>([]);
    const timelines = useRef<(gsap.core.Tween | null)[]>([]);
    const animatedIndexes = useRef<Set<number>>(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = companyNameRefs.current.findIndex(
                            (el) => el === entry.target,
                        );
                        if (
                            index !== -1 &&
                            !animatedIndexes.current.has(index)
                        ) {
                            animatedIndexes.current.add(index);
                            const el = companyNameRefs.current[index];
                            if (!el) return;
                            if (timelines.current[index]) {
                                timelines.current[index]?.kill();
                                timelines.current[index] = null;
                            }
                            const originalText = el.textContent ?? '';
                            timelines.current[index] = scrambleText(
                                el,
                                originalText,
                            );
                        }
                    }
                });
            },
            { threshold: 0.5 },
        );

        const currentRefs = companyNameRefs.current;
        currentRefs.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            currentRefs.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    useEffect(() => {
        if (activeExperienceId !== null) {
            const index = experienceData.findIndex(
                (exp) => exp.id === activeExperienceId,
            );
            if (index !== -1 && itemRefs.current[index]) {
                itemRefs.current[index]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
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
                            el?.classList.add('scroll-offset');
                        }}
                        className={`
                            group
                            border-b ${theme.experienceListItemBorder}
                            transition-colors duration-300 ease-in-out
                            ${activeExperienceId === experience.id ? 'bg-white/[0.05] dark:bg-black/[0.05]' : 'hover:bg-white/[0.03] dark:hover:bg-black/[0.03]'}
                            cursor-pointer
                        `}
                        onClick={() => {
                            setActiveExperienceId(
                                activeExperienceId === experience.id
                                    ? null
                                    : experience.id,
                            );
                        }}
                    >
                        <div className="flex items-center justify-between py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8">
                            <div className="flex items-center space-x-4 flex-grow text-left">
                                <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 flex-shrink-0 rounded-lg overflow-hidden border border-transparent group-hover:border-white/20 dark:group-hover:border-white/10 transition-colors duration-300">
                                    <Image
                                        src={experience.image}
                                        alt={`${experience.company} Logo`}
                                        fill
                                        className="object-contain p-1 sm:p-2 lg:p-3"
                                    />
                                </div>
                                <h2
                                    id={`exp-heading-${experience.id}`}
                                    ref={(el) => {
                                        companyNameRefs.current[index] = el;
                                    }}
                                    className={`${fontClasses.classyVogue} text-2xl sm:text-3xl lg:text-4xl ${theme.projecHeroText} leading-tight`}
                                >
                                    {experience.company}
                                </h2>
                            </div>

                            <button
                                aria-expanded={
                                    activeExperienceId === experience.id
                                }
                                aria-controls={`exp-panel-${experience.id}`}
                                className={`
                                    ${theme.projectLinkButton}
                                    ${fontClasses.eireneSansBold}
                                    px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm
                                    transition-all duration-300 ease-in-out
                                    flex items-center whitespace-nowrap
                                    hover:bg-opacity-80
                                `}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveExperienceId(
                                        activeExperienceId === experience.id
                                            ? null
                                            : experience.id,
                                    );
                                }}
                            >
                                {activeExperienceId === experience.id
                                    ? 'Close'
                                    : 'View'}
                                <Icon
                                    icon={
                                        activeExperienceId === experience.id
                                            ? 'akar-icons:cross'
                                            : 'akar-icons:arrow-right'
                                    }
                                    className="ml-1 w-3 h-3 sm:w-4 sm:h-4"
                                />
                            </button>
                        </div>

                        <div
                            id={`exp-panel-${experience.id}`}
                            role="region"
                            aria-labelledby={`exp-heading-${experience.id}`}
                            style={{
                                transition: 'max-height 0.5s ease',
                                overflow: 'hidden',
                            }}
                            className={`transition-all duration-500 ${activeExperienceId === experience.id ? 'max-h-[1000px]' : 'max-h-0'}`}
                        >
                            {activeExperienceId === experience.id && (
                                <div className="px-4 sm:px-6 lg:px-8 pb-8 pt-4 animate-fade-in-down">
                                    <ExpandedExperienceContent
                                        experience={experience}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>
                {`
                    @keyframes fadeInDown {
                        from {
                            opacity: 0;
                            transform: translateY(-1rem);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    .animate-fade-in-down {
                        animation: fadeInDown 0.5s ease-out forwards;
                    }
                    .scroll-offset {
                        scroll-margin-top: 6rem;
                    }
                `}
            </style>
        </section>
    );
};

interface ExpandedExperienceContentProps {
    experience: ExperienceItem;
}

const ExpandedExperienceContent = ({
    experience,
}: ExpandedExperienceContentProps) => {
    const { colors: theme, isDarkTheme } = useThemeColors();

    return (
        <div className="relative w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col space-y-6">
                    <h3
                        className={`${fontClasses.classyVogue} text-2xl sm:text-2xl ${theme.experienceText}`}
                    >
                        {experience.designation}
                    </h3>
                    <p
                        className={`${fontClasses.eireneSans} text-lg sm:text-xl ${theme.experienceSubText}`}
                    >
                        {experience.period}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
                        {experience.technologies.map((tech, techIndex) => {
                            const iconName = isDarkTheme
                                ? techIconMap[tech]?.dark
                                : techIconMap[tech]?.light;
                            return iconName ? (
                                <div
                                    key={techIndex}
                                    className="flex items-center space-x-2"
                                >
                                    <Icon
                                        icon={iconName}
                                        className={`w-8 h-8 sm:w-10 sm:h-10 ${theme.experienceTechIcon}`}
                                    />
                                </div>
                            ) : null;
                        })}
                    </div>
                </div>

                <div className="space-y-6 overflow-y-auto custom-scrollbar-expanded max-h-[60vh] lg:max-h-[unset]">
                    {experience.description.map((desc, descIndex) => (
                        <div key={descIndex} className="relative group">
                            <p
                                className={`${fontClasses.eireneSans} text-base sm:text-lg ${theme.experienceDescriptionText} leading-relaxed tracking-wide transition-all duration-300 group-hover:opacity-90`}
                            >
                                <span className="mr-2 text-primary">✦</span>
                                {desc}
                            </p>
                            <div className="mt-3 w-full px-8 max-w-4xl mx-auto">
                                <div
                                    className={`h-px w-full transition-all duration-300 ${theme.experienceDescriptionDivider} opacity-30`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>
                {`
                    .custom-scrollbar-expanded::-webkit-scrollbar {
                        width: 0.5rem;
                    }
                    .custom-scrollbar-expanded::-webkit-scrollbar-track {
                        background: ${theme.experienceScrollbarTrack};
                        border-radius: 0.25rem;
                    }
                    .custom-scrollbar-expanded::-webkit-scrollbar-thumb {
                        background: ${theme.experienceScrollbarThumb};
                        border-radius: 0.25rem;
                    }
                    .custom-scrollbar-expanded::-webkit-scrollbar-thumb:hover {
                        background: ${theme.experienceScrollbarThumbHover};
                    }
                `}
            </style>
        </div>
    );
};

const Experience = () => {
    const { colors: theme, isLoading, isDarkTheme } = useThemeColors();
    const experienceData = useMemo(
        () => getExperienceData(isDarkTheme),
        [isDarkTheme],
    );

    const [activeExperienceId, setActiveExperienceId] = useState<number | null>(
        null,
    );
    const [isContentVisible, setIsContentVisible] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setIsContentVisible(true), 50);
            return () => clearTimeout(timer);
        } else {
            setIsContentVisible(false);
        }
    }, [isLoading]);

    return (
        <div className={`relative overflow-hidden ${theme.background}`}>
            <div
                className={`relative z-10 pb-16 ${isContentVisible ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}`}
            >
                <ExperienceHeroSection />
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
