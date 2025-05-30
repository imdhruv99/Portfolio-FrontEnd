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
                    <header className="text-center mb-20 lg:mb-32">
                        <h1 className={`text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-tight ${colors.heroText} mb-8`}>
                            Experience
                        </h1>
                        <p className={`text-xl sm:text-2xl lg:text-3xl ${colors.subtext} font-light max-w-4xl mx-auto`}>
                            Building the future through innovative technology solutions
                        </p>
                    </header>

                    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 xl:gap-32">
                        <nav className="lg:w-1/3 xl:w-1/4">
                            <div className="space-y-6">
                                {experienceData.map((exp, index) => (
                                    <button
                                        key={exp.id}
                                        onClick={() => setActiveIndex(index)}
                                        className={`
                                            w-full text-left group transition-all duration-500
                                            ${index === activeIndex ? 'opacity-100' : 'opacity-40 hover:opacity-70'}
                                        `}
                                    >
                                        <div className="flex items-center gap-4 py-4">
                                            <div
                                                className={`w-1 h-12 transition-all duration-500 ${index === activeIndex ? '' : 'scale-y-50'
                                                    }`}
                                                style={{ backgroundColor: exp.color }}
                                            />
                                            <div className="flex-1">
                                                <h3 className={`text-lg sm:text-xl font-medium ${colors.text} mb-1`}>
                                                    {exp.company}
                                                </h3>
                                                <p className={`text-sm ${colors.subtext}`}>
                                                    {exp.period}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </nav>

                        <main className="lg:w-2/3 xl:w-3/4">
                            <div className="space-y-12">
                                <header className="border-b pb-8" style={{ borderColor: `${currentExperience.color}20` }}>
                                    <div className="flex items-center gap-6 mb-6">
                                        <div
                                            className="w-20 h-20 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: `${currentExperience.color}15` }}
                                        >
                                            <Icon
                                                icon="ph:building-office"
                                                className="w-10 h-10"
                                                style={{ color: currentExperience.color }}
                                            />
                                        </div>
                                        <div>
                                            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-light ${colors.text} mb-2`}>
                                                {currentExperience.company}
                                            </h2>
                                            <p className={`text-xl sm:text-2xl ${colors.subtext} font-light`}>
                                                {currentExperience.designation}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <Icon icon="ph:calendar" className={`w-5 h-5 ${colors.metaText}`} />
                                        <span className={`text-lg ${colors.metaText} font-light`}>
                                            {currentExperience.period}
                                        </span>
                                    </div>
                                </header>

                                <section>
                                    <h3 className={`text-2xl sm:text-3xl font-light ${colors.text} mb-8`}>
                                        Key Contributions
                                    </h3>
                                    <div className="space-y-6">
                                        {currentExperience.description.map((desc, index) => (
                                            <div key={index} className="flex gap-6">
                                                <div
                                                    className="w-2 h-2 rounded-full mt-3 flex-shrink-0"
                                                    style={{ backgroundColor: currentExperience.color }}
                                                />
                                                <p className={`text-lg sm:text-xl ${colors.descriptionText} leading-relaxed font-light`}>
                                                    {desc}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h3 className={`text-2xl sm:text-3xl font-light ${colors.text} mb-8 flex items-center gap-4`}>
                                        <Icon icon="ph:code" className="w-7 h-7" style={{ color: currentExperience.color }} />
                                        Technology Stack
                                    </h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                        {currentExperience.technologies.map((tech, index) => (
                                            <div
                                                key={index}
                                                className={`
                                                    px-4 py-3 text-center transition-all duration-300
                                                    hover:scale-105 cursor-default border rounded-lg
                                                    ${colors.techBadge}
                                                `}
                                            >
                                                <span className="text-sm font-medium">
                                                    {tech}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </main>
                    </div>

                    <footer className="mt-24 text-center">
                        <div className="flex justify-center gap-2">
                            {experienceData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`
                                        w-2 h-2 rounded-full transition-all duration-300
                                        ${index === activeIndex ? 'scale-125' : 'opacity-40 hover:opacity-70'}
                                    `}
                                    style={{ backgroundColor: experienceData[index].color }}
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
