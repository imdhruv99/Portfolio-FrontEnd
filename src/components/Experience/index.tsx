'use client';

import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

import { useThemeColors } from '@/hooks/useThemeColors';
import experienceData from '@/constants/ExperienceData';

const Experience = () => {
    const { colors } = useThemeColors();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % experienceData.length);
        }, 12000);
        return () => clearInterval(interval);
    }, []);

    const currentExperience = experienceData[activeIndex];

    return (
        <div className={`min-h-screen ${colors.background} relative`}>
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 px-4 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-24">
                <div className="max-w-8xl mx-auto">
                    <header className="text-center mb-16 lg:mb-28">
                        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-thin tracking-tight ${colors.heroText} mb-6`}>
                            Experience
                        </h1>
                        <p className={`text-base sm:text-lg lg:text-xl ${colors.subtext} font-light max-w-3xl mx-auto`}>
                            A journey of building impactful solutions through code and creativity
                        </p>
                    </header>

                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 xl:gap-28">
                        <nav className="lg:w-1/3 xl:w-1/4">
                            <div className="space-y-4">
                                {experienceData.map((exp, index) => (
                                    <button
                                        key={exp.id}
                                        onClick={() => setActiveIndex(index)}
                                        className={`
                                            w-full text-left group transition-all duration-500
                                            ${index === activeIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
                                        `}
                                    >
                                        <div className="flex items-center gap-3 py-3">
                                            <div
                                                className={`w-1 h-10 transition-all duration-500 ${index === activeIndex ? '' : 'scale-y-50'}`}
                                                style={{ backgroundColor: colors.indexLine }}
                                            />
                                            <div className="flex-1">
                                                <h3 className={`text-base sm:text-lg font-medium ${colors.text} mb-1`}>
                                                    {exp.company}
                                                </h3>
                                                <p className={`text-xs sm:text-sm ${colors.subtext}`}>
                                                    {exp.period}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </nav>

                        <main className="lg:w-2/3 xl:w-3/4">
                            <div className="space-y-10">
                                <header
                                    className={`border-l-4 pl-5 pb-6 ${colors.border}`}
                                    style={{ borderColor: currentExperience.color }}
                                >
                                    <div className="flex items-center gap-5 mb-4">
                                        <div
                                            className="w-16 h-16 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                                        >
                                            <Icon
                                                icon="ph:building-office"
                                                className="w-8 h-8"
                                                style={{ color: colors.iconColor }}
                                            />
                                        </div>
                                        <div>
                                            <h2 className={`text-2xl sm:text-3xl font-light ${colors.text} mb-1`}>
                                                {currentExperience.company}
                                            </h2>
                                            <p className={`text-base sm:text-lg ${colors.subtext} font-light`}>
                                                {currentExperience.designation}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Icon icon="ph:calendar" className={`w-4 h-4 ${colors.metaText}`} />
                                        <span className={`text-sm ${colors.metaText} font-light`}>
                                            {currentExperience.period}
                                        </span>
                                    </div>
                                </header>

                                <section>
                                    <h3 className={`text-xl sm:text-2xl font-light ${colors.text} mb-6`}>
                                        Key Contributions
                                    </h3>
                                    <div className="space-y-4">
                                        {currentExperience.description.map((desc, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div
                                                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                                                    style={{ backgroundColor: currentExperience.color }}
                                                />
                                                <p className={`text-sm sm:text-base ${colors.descriptionText} leading-relaxed font-light`}>
                                                    {desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 className={`text-xl sm:text-2xl font-light ${colors.text} mb-6 flex items-center gap-3`}>
                                        <Icon icon="ph:code" className="w-5 h-5" style={{ color: colors.iconColor }} />
                                        Technology Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {currentExperience.technologies.map((tech, index) => (
                                            <span
                                                key={index}
                                                className={`
                                                    inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium
                                                    ${colors.techBadge}
                                                `}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </main>
                    </div>

                    <footer className="mt-20 text-center">
                        <div className="flex justify-center gap-2">
                            {experienceData.map((exp, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`
                                        w-2 h-2 rounded-full transition-all duration-300
                                        ${index === activeIndex ? 'scale-125' : 'opacity-40 hover:opacity-70'}
                                    `}
                                    style={{ backgroundColor: exp.color }}
                                />
                            ))}
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Experience;
